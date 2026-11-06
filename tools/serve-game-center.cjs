'use strict';
// Local-only preview server, including the real function handler. No credentials served.
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const {handler}=require('../netlify/functions/game-center.js');
const root=path.resolve(__dirname,'../.netlify/portfolio-2-preview');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2','.glb':'model/gltf-binary','.pdf':'application/pdf','.webm':'video/webm'};
http.createServer(async(req,res)=>{try{const u=new URL(req.url,'http://127.0.0.1');if(u.pathname==='/.netlify/functions/game-center'){const r=await handler({httpMethod:req.method,queryStringParameters:Object.fromEntries(u.searchParams)});res.writeHead(r.statusCode,r.headers);res.end(r.body);return;}const file=path.resolve(root,'.'+decodeURIComponent(u.pathname)+(u.pathname.endsWith('/')?'index.html':''));if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end();return;}res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});fs.createReadStream(file).pipe(res);}catch{res.writeHead(500);res.end();}}).listen(6511,'127.0.0.1',()=>console.log('Local Game Center preview: http://127.0.0.1:6511'));
