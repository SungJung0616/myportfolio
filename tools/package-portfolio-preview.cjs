// Deploy Preview packaging only. Canonical source and the production build stay untouched.
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const hero = path.join(root, 'preview/v0304-p2-hero-cta');
const playbook = path.join(root, 'preview/p2-03b-playbook');
const output = path.join(root, '.netlify/portfolio-2-preview');
const checkOnly = process.argv.includes('--check');

// Explicit runtime allowlist: no QA captures, development notes, or disabled demo video.
const heroFiles = [
  '_headers', 'index.html', 'review.html', 'robots.txt', 'THREE-LICENSE.txt',
  'arena-court.js', 'BufferGeometryUtils.js', 'career-data.js',
  'career-gallery.css', 'career-gallery.js', 'career-walk.js', 'contact.css',
  'dice-poster.png', 'exterior-lighting.js', 'exterior.css', 'exterior.js',
  'film-data.js', 'film-entrance.js', 'film.css', 'film.js', 'GLTFLoader.js',
  'hero.css', 'hero.js', 'interactive-playbook.css', 'interactive-playbook.js',
  'layrd-easter-egg.css', 'layrd-easter-egg.js', 'layrd-wordmark.jpg',
  'navigation-data.js', 'navigation.css', 'navigation.js', 'project-catalog.js',
  'project-media.js', 'project-showcase.css', 'project-showcase.js', 'project-space.js',
  'RoundedBoxGeometry.js', 'SkeletonUtils.js', 'spatial-data.js', 'stack-data.js',
  'stack-table.css', 'stack-table.js', 'sung-miniature-v1.glb', 'sungflix-poster.png',
  'three.core.js', 'three.module.js', 'ui.css', 'ui.js', 'weather.css', 'weather.js', 'weather-effects.js',
  'welcome-intro.css', 'welcome-intro.js',
  'project-images/fridge.png', 'project-images/hand-battle.png',
  'project-images/portfolio-2.jpg', 'project-images/remembering-young-hoon.jpg',
  'project-images/shopping.png', 'project-images/simon-game.png',
  'project-images/tasks.png', 'project-images/weather-app.png',
];
const playbookFiles = ['index.html', 'prototype.css', 'prototype.js', 'coupang.js', 'interaction.js'];
const files = [
  ...heroFiles.map(file => ({source: path.join(hero, file), target: file})),
  ...playbookFiles.map(file => ({source: path.join(playbook, file), target: `p2-03b-playbook/${file}`})),
];
const targets = new Set(files.map(file => file.target));
let totalBytes = 0;

function requireTarget(reference, base) {
  const url = new URL(reference, `https://preview.invalid/${base}`);
  if (url.origin !== 'https://preview.invalid') return;
  const target = decodeURIComponent(url.pathname.slice(1)) + (url.pathname.endsWith('/') ? 'index.html' : '');
  if (!targets.has(target)) throw new Error(`Unpackaged runtime dependency: ${base} -> ${reference}`);
}

for (const file of files) {
  const stat = fs.lstatSync(file.source);
  if (!stat.isFile() || stat.isSymbolicLink()) throw new Error(`Not a regular source file: ${file.target}`);
  totalBytes += stat.size;
  if (file.target.endsWith('.js')) {
    const text = fs.readFileSync(file.source, 'utf8');
    for (const match of text.matchAll(/\b(?:from\s*|import\s*)['"](\.{1,2}\/[^'"]+)['"]/g)) {
      requireTarget(match[1], file.target);
    }
  }
  if (file.target.endsWith('.html')) {
    const text = fs.readFileSync(file.source, 'utf8');
    for (const match of text.matchAll(/<(?:script|link)\b[^>]*\b(?:src|href)=["']([^"']+)["']/g)) {
      if (!match[1].startsWith('data:')) requireTarget(match[1], file.target);
    }
  }
}

// The existing iframe remains valid when the Hero is published at the site root.
const integration = fs.readFileSync(path.join(hero, 'interactive-playbook.js'), 'utf8');
const iframe = integration.match(/frame\.src\s*=\s*['"]([^'"]+)['"]/);
if (!iframe) throw new Error('Playbook iframe source could not be verified.');
requireTarget(iframe[1], 'index.html');

if (!checkOnly) {
  // Clean only this generated preview. Unknown files or redirected paths require review.
  const parent = path.join(root, '.netlify');
  const canonicalParent = path.join(fs.realpathSync(root), '.netlify');
  if (path.relative(root, output) !== path.join('.netlify', 'portfolio-2-preview')) {
    throw new Error('Unexpected preview output path.');
  }
  if (fs.existsSync(parent)) {
    const stat = fs.lstatSync(parent);
    if (!stat.isDirectory() || stat.isSymbolicLink() || fs.realpathSync(parent) !== canonicalParent) {
      throw new Error('Preview parent must be an ordinary directory inside this workspace.');
    }
  }
  const directories = new Set(['']);
  for (const target of targets) {
    for (let dir = path.posix.dirname(target); dir !== '.'; dir = path.posix.dirname(dir)) directories.add(dir);
  }
  function inspectOutput(relative = '') {
    const entry = path.join(output, relative);
    const stat = fs.lstatSync(entry);
    if (stat.isSymbolicLink()) throw new Error(`Refusing redirected preview output: ${relative || '.'}`);
    if (stat.isDirectory() && directories.has(relative)) {
      for (const name of fs.readdirSync(entry)) inspectOutput(relative ? `${relative}/${name}` : name);
    } else if (!stat.isFile() || !targets.has(relative)) {
      throw new Error(`Unrecognized preview output; retained for review: ${relative || '.'}`);
    }
  }
  if (fs.existsSync(output)) {
    inspectOutput();
    if (fs.realpathSync(output) !== path.join(canonicalParent, 'portfolio-2-preview')) {
      throw new Error('Preview output resolves outside its designated build directory.');
    }
    const canonicalOutput = fs.realpathSync(output);
    if (files.some(file => {
      const source = fs.realpathSync(file.source);
      return source === canonicalOutput || source.startsWith(canonicalOutput + path.sep);
    })) throw new Error('A canonical source resolves inside the generated preview output.');
    // Unlink generated files before copying; never overwrite possible external hard links.
    fs.rmSync(output, {recursive: true});
  }
  fs.mkdirSync(output, {recursive: true});
  for (const file of files) {
    const destination = path.join(output, file.target);
    fs.mkdirSync(path.dirname(destination), {recursive: true});
    fs.copyFileSync(file.source, destination, fs.constants.COPYFILE_EXCL);
  }
}
console.log(`${checkOnly ? 'Validated' : 'Packaged'} ${files.length} runtime files (${totalBytes} bytes).`);
console.log('Publish directory: .netlify/portfolio-2-preview');
console.log(`Playbook URL: ${new URL(iframe[1], 'https://preview.invalid/').pathname}`);
