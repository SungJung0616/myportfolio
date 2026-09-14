import React from 'react';
import { Link } from 'react-router-dom';

const repository = 'https://github.com/SungJung0616/father-memorial-site';

const MemorialCaseStudy = () => (
  <article className="case-study-page">
    <header className="case-study-hero">
      <Link className="back-link" to="/">&larr; Selected work</Link>
      <p className="eyebrow">Remembering Young Hoon</p>
      <h1>Preserving memories.<br /><span>Building trust into the system.</span></h1>
      <p className="case-study-lede">A bilingual living archive created in memory of my father, where family, friends, and colleagues can share stories while retaining control over what becomes public.</p>
      <div className="hero-actions"><a className="button primary" href="https://father-memorial-test.netlify.app/" target="_blank" rel="noreferrer">Visit the archive</a><a className="button secondary" href={repository} target="_blank" rel="noreferrer">View GitHub</a></div>
      <dl className="case-facts"><div><dt>Role</dt><dd>Independent project owner</dd></div><div><dt>Delivery</dt><dd>AI-assisted development</dd></div><div><dt>Application</dt><dd>Next.js · React · TypeScript</dd></div><div><dt>Infrastructure</dt><dd>Netlify · AWS</dd></div></dl>
    </header>

    <section className="case-story compact-story"><aside><p className="eyebrow">Why it exists</p></aside><div><h2>A memorial should be more than a static biography.</h2><p>I wanted a place where people could contribute their own memories in Korean or English. That meant designing not only the public website, but also submission, consent, review, privacy, and long-term media handling.</p><p>The central requirement was simple: a submitted memory must not become public without an explicit review decision.</p></div></section>

    <section className="workflow-panel"><p className="eyebrow">Contribution workflow</p><div className="workflow-steps"><span>Submit</span><i>&rarr;</i><span>Preserve consent</span><i>&rarr;</i><span>Review</span><i>&rarr;</i><span>Choose visibility</span><i>&rarr;</i><span>Publish</span></div><p className="pipeline-note">Text-only contributions are supported. Pending and family-only records remain outside public responses.</p></section>

    <section className="case-story action-section"><aside><p className="eyebrow">Implemented system</p></aside><div><h2>A public experience backed by operational controls.</h2><div className="step-list"><div><span>01</span><h3>Bilingual contribution experience</h3><p>Korean and English interfaces support memory submission, optional photos, public lists, detail views, and persistent hearts.</p></div><div><span>02</span><h3>Authenticated administration</h3><p>Cognito authentication and server-side role checks protect review, publication, member management, and recoverable trash workflows.</p></div><div><span>03</span><h3>Privacy-aware data lifecycle</h3><p>Original submission consent is retained separately from current visibility. Public responses exclude private contributor names, contact details, and consent records; restored posts return to family-only visibility.</p></div><div><span>04</span><h3>Asynchronous image processing</h3><p>Private S3 storage, SQS, and a Python Lambda generate WebP display images and thumbnails. Derivatives remove EXIF/GPS metadata while originals are preserved. Failures retain an original-image fallback and support queue retries.</p></div></div></div></section>

    <section className="case-story"><aside><p className="eyebrow">What I owned</p></aside><div><h2>From the first requirements to AWS setup and deployment.</h2><p>I independently planned the project, defined the features and user workflows, and owned AWS setup and deployment from beginning to end. I used AI-assisted development throughout delivery, rather than claiming every line of code was manually written by me.</p><p>My responsibility was turning a personal purpose into a working system with explicit boundaries for contribution, approval, access, and media handling.</p></div></section>

    <section className="case-story scope-section"><aside><p className="eyebrow">Verification</p><p className="aside-note">Recorded release checks, not a claim of large-scale usage.</p></aside><div><h2>Verify the workflow, not only the appearance.</h2><div className="decision-grid"><article><h3>Submission and privacy</h3><p>Release QA records successful text and photo submissions, unpublished-record exclusion, and 401 responses from unauthenticated admin requests.</p></article><article><h3>Regression checks</h3><p>The documented release snapshot reports 13 passing regression tests, successful type checking and production build, and 37 successful public signed-image reads.</p></article><article><h3>Recovery and consistency</h3><p>Tests cover text preservation and post-management behavior. Reaction updates use DynamoDB transactions to handle duplicate and concurrent requests.</p></article><article><h3>Known limits</h3><p>Mobile checks used a 390px preview, not a physical phone. The release was marked ready with minor issues, rather than described as flawless.</p></article></div><a className="text-link" href={`${repository}/blob/codex/memorial-site/docs/17-PUBLIC-LAUNCH-QA.md`} target="_blank" rel="noreferrer">Read the release QA record ↗</a></div></section>

    <section className="case-story"><aside><p className="eyebrow">Current boundaries</p></aside><div><h2>Keep delivered features separate from future ideas.</h2><p>AI photo classification, face recognition, CloudFront delivery, and a full legacy-image backfill remain future work, not completed features. The current focus is a reliable contribution and review experience with private storage and recoverable content management.</p><a className="text-link" href={`${repository}/blob/codex/memorial-site/docs/CURRENT-STATUS.md`} target="_blank" rel="noreferrer">Review implementation status ↗</a></div></section>
    <section className="case-next"><p className="eyebrow">Explore another workflow</p><h2>Operational data prepared for reliable downstream delivery.</h2><Link className="button primary" to="/case-studies/gps-order-automation">Read the GPS automation case study</Link></section>
  </article>
);

export default MemorialCaseStudy;
