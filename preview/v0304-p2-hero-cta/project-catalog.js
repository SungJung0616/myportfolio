import {archive} from './navigation-data.js';

// Shared public catalog for Film Lab and Work. Archive records remain in place.
// Evidence: docs/portfolio-2/{PROJECT_CATALOG_DRAFT,CLAIMS_AND_EVIDENCE}.md,
// src/components/*CaseStudy.js, MyProjects.js, and the existing preview modules.
// FIX 09B reuses the source audit and verifies Market against its public repository.
// Notion evidence may inform a sanitized summary without exposing internal documents.
const caseStudy=slug=>({label:'Archived case study',url:`https://sungjung-portfolio-v1.netlify.app/case-studies/${slug}`});
const github=repo=>({label:'GitHub',url:`https://github.com/SungJung0616/${repo}`});
const defaults={poster:null,video:null,mediaNote:'Text-led overview, not a product screenshot or demo.',featured:false,role:'',approach:[],implementedScope:[],validation:'',limitations:'',evidence:'',evidenceType:[],evidenceRefs:[],repositoryUrl:null,demoUrl:null,nextMilestone:'',results:null,group:'archive'};
const professional={film:false,work:true,personal:false};
const personal={film:false,work:true,personal:true};
const screening={...professional,film:true};
const record=data=>{
 const item={...defaults,demoVideo:null,posterImage:null,demoCaption:'Sanitized user recording not yet provided.',demoDuration:null,evidenceStatus:'awaiting-user-recording',demoCandidate:false,projectJourney:[],...data};
 item.posterImage??=item.poster;
 item.summary=item.description;
 item.repositoryUrl??=item.links?.find(link=>link.label==='GitHub')?.url??null;
 item.demoUrl??=item.links?.find(link=>['Visit project','Visit store'].includes(link.label))?.url??null;
 item.validation||=item.statusNote||'Implementation and live usage have not been revalidated.';
 return item;
};

const professionalProjects=[
 record({
  id:'coupang',title:'Coupang Order Preparation Automation',type:'Professional work · Historical automation',category:'professional',status:'Completed',
  statusNote:'Completed historical workflow implementation; final review and upload remained human-controlled.',
  description:'Prepare marketplace orders for shipping with Python transformations and a visible human review step.',
  problem:'Daily order preparation required repetitive cleanup, format conversion, and checks before upload.',
  technologies:['Python','openpyxl'],featured:true,group:'featured',visibility:screening,
  role:'Workflow analysis and Python/openpyxl implementation during the GPS Logix Database Manager role.',
  approach:['Map order fields to the shipping format.','Normalize and validate data; flag records that need attention.','Prepare the output file for final human review and upload.'],
  implementedScope:['Historical order-field transformation and output preparation.','Validation and exception flagging before final human review and upload.'],
  validation:'Historical workflow and approximate time change are user-reported. No independent benchmark or version-matched public implementation has been established.',
  limitations:'This describes order preparation, not autonomous fulfillment or the total time to ship orders. The public Selenium repository has not been established as the same Python/openpyxl implementation.',
  evidence:'Career records and the order-automation case study support the historical work story. The public Selenium repository is a separate implementation record, not direct proof of the reported impact.',
  evidenceType:['Career record','User-reported operational outcome','Separate public source record'],
  evidenceRefs:[caseStudy('gps-order-automation'),{label:'Separate Selenium source — relationship to this workflow unconfirmed',url:'https://github.com/SungJung0616/AutomationCoupangOrder'}],
  repositoryUrl:'https://github.com/SungJung0616/AutomationCoupangOrder',
  results:{label:'Daily order preparation time',before:'~3 hr',after:'~30 min',note:'User-reported historical estimate. Final review retained.'},
  links:[caseStudy('gps-order-automation')]
 }),
 record({
  id:'label',title:'AcrossB Label Helper',type:'Professional workflow · Browser extension',category:'professional',status:'Prototype',demoCandidate:true,
  statusNote:'Public implementation reviewed. Its equivalence to the version used for reported operational observations is unverified.',
  description:'Reduce repetitive batch entry while keeping final label review with people.',
  problem:'Repeatedly transferring batch details into a label worksheet created opportunities for input errors.',
  technologies:['JavaScript','Chrome Manifest V3','Browser DOM'],featured:true,group:'featured',visibility:screening,
  role:'The implementation and reported workflow are documented; the exact individual contribution and collaboration scope remain to be confirmed.',
  approach:['Read the selected, displayed batches.','Organize the fields and enter the permitted worksheet cells through the browser UI.','Keep final label and output review with people.'],
  implementedScope:['Read selected, rendered batch details.','Plan and enter permitted worksheet cells through browser interaction.','Retain human review of the final label and output.'],
  validation:'Public source reviewed. Live worksheet validation, operational release equivalence, and measurement conditions remain unverified.',
  limitations:'Uses browser interaction, not a Google Sheets API integration. Partial writes can occur; final saved-value readback and rollback are not established. Label Helper and QR Helper are separate tools.',
  evidence:'Public source and documented code review. Operational observations are user-reported; measurement period, counting method, and public/operational version equivalence are unverified.',
  evidenceType:['Public source','User-reported operational observation'],evidenceRefs:[github('acrossb-label-helper')],
  results:{label:'Batch data-entry errors per ~150 batches',before:'~15',after:'~1–2',note:'User-reported operational observation; not independently audited.'},
  links:[github('acrossb-label-helper')]
 }),
 record({
  id:'qr',title:'AcrossB Flow QR Helper',type:'Professional workflow · Browser extension',category:'professional',status:'Prototype',demoCandidate:true,
  statusNote:'Owner-provided recording shows the operational helper selecting rows. Exact equivalence to the public source version remains unverified.',
  description:'Find one matching batch, validate it, and select it deliberately.',
  problem:'Manual batch searches required staff to identify the intended row and verify the selection.',
  technologies:['JavaScript','Chrome Manifest V3','QR text parsing','DOM validation'],featured:true,group:'featured',visibility:screening,
  role:'Designed the date-and-batch QR handoff and built the helper for the warehouse workflow, as confirmed by the owner. Detailed code authorship and collaboration scope are not independently verified.',
  approach:['Print a date-and-batch QR on the packing cover for the shipping team.','Read the identifier and validate the work list before selecting a matching row.','Keep quantity reconciliation and the final work-completion action with the operator.'],
  implementedScope:['QR identifier parsing and visible-list validation.','Dry-run by default; stop for ambiguous or incomplete matches.','Explicit live selection of a validated row with limited undo.'],
  validation:'Owner recording shows a partial-list warning and subsequent row-selection confirmations. Physical scanner hardware, undo behavior and equivalence to the public source version are not independently verified.',
  limitations:'The helper selects rows; the operator compares cover quantities with overall quantities and clicks work completion. WMS batch linkage is owner-reported, not demonstrated end-to-end here. No automatic ship-out is claimed. Separate from Label Helper.',
  evidence:'Public source, historical test records and a cropped, redacted owner recording. The video demonstrates UI behavior, not the reported daily time saving.',
  evidenceType:['Public source','Repository test records','User-reported operational observation'],evidenceRefs:[github('acrossb-flow-qr-helper')],
  results:null,
  demoVideo:'project-demos/qr-review.webm',posterImage:'project-demos/qr-review.jpg',demoDuration:18,
  demoCaption:'Real owner recording, cropped and opaquely redacted. Row selection only; quantity checks and work completion remain manual. Prepared for local publication review.',evidenceStatus:'sanitized-user-recording',
  projectJourney:[{title:'Packing-to-shipping handoff',description:'Owner-reported: date-and-batch QR codes on packing covers replaced visual batch lookup.'},{title:'Observed helper behavior',description:'The supplied recording shows list-validation warnings and successful row selection. It does not show automatic fulfillment.'}],
  links:[github('acrossb-flow-qr-helper')]
 }),
 record({
  id:'return-scan',title:'Return Scan',type:'Operational workflow · Prototype',category:'professional',status:'Prototype',group:'featured',featured:true,visibility:professional,demoCandidate:true,
  statusNote:'Source implementation exists; deployment and operational adoption are not established.',
  description:'Guide return intake through scanning, status classification, and a final confirmation step.',
  problem:'Return intake needs a clear path from identifiers to reviewed item details before submission.',
  technologies:['React','JavaScript','Vite','ZXing'],role:'Implementation is present in Sung’s repository; exact individual contribution and operational ownership remain to be confirmed.',
  approach:['Capture tracking and item identifiers.','Classify the item status and review the collected details.','Prepare the confirmed record for submission.'],
  implementedScope:['Return scanning and staged intake UI.','Status classification and confirmation UI.','Submission structure for the reviewed record.'],
  validation:'Repository code reviewed. Live submission success, scanner-device behavior, and production use have not been independently established.',
  limitations:'No successful deployment, productivity metric, or end-to-end operational integration is claimed.',
  evidence:'Public repository source supports the prototype scope, not proof of warehouse adoption.',
  evidenceType:['Public source'],evidenceRefs:[github('return-scan')],links:[github('return-scan')],
  nextMilestone:'Validate a sanitized intake-to-submission run and document the actual usage boundary.'
 }),
 record({
  id:'eternights',title:'Eternights — Release QA',type:'Professional work · Studio Sai',category:'professional',status:'Completed',
  statusNote:'Completed QA contribution, December 2021–May 2024; not sole ownership of the game or release.',
  description:'Make regression paths repeatable while supporting development and PlayStation release validation.',
  problem:'Reaching later test scenarios repeatedly consumed time that could be spent validating fixes.',
  technologies:['Unity Test Framework','Manual testing','Regression testing'],group:'related',visibility:professional,
  role:'QA Engineer: manual and regression testing, defect reporting, and UI-focused validation in the existing development environment.',
  approach:['Use developer-provided save states and checkpoints.','Repeat targeted manual and UI-focused checks.','Report reproducible findings and verify subsequent fixes.'],
  implementedScope:['Manual and regression testing within the development environment.','Reproducible defect reporting and fix validation using existing checkpoints.'],
  limitations:'No claim of owning the complete automation framework, CI integration, or overall release process.',
  evidence:'Existing Eternights case study and career records. The cycle estimate is a reported workflow observation.',
  evidenceType:['Career record','Case study','Reported workflow observation'],evidenceRefs:[caseStudy('eternights-qa')],
  results:{label:'Reported regression cycle',before:'~8 hr',after:'~4 hr',note:'Approximate reported cycle; reduced repeat traversal, not required coverage.'},
  links:[caseStudy('eternights-qa')]
 }),
 record({
  id:'gps-3pl',title:'GPS Logix — 3PL Workflow Design',type:'Professional work · Operations',category:'professional',status:'In Progress',
  statusNote:'Ongoing operations and incremental improvement; not a completed end-to-end automation system.',
  description:'Connect warehouse tools, working procedures, and people as fulfillment needs grow.',
  problem:'Chronological order processing created avoidable picking travel and unclear batch handoffs.',
  technologies:['Excel','Extensiv WMS','Workpad OMS'],group:'related',visibility:professional,
  role:'Senior Operations Manager: warehouse workflow design, account coordination, and operational requirements.',
  approach:['Validate SKU grouping through Excel-based batches.','Standardize work instructions for floor staff.','Translate observed constraints into requirements with the AcrossB development team.'],
  implementedScope:['Excel-based batching and operational procedures.','Cross-functional requirements and workflow coordination.'],
  limitations:'AcrossB developed Workpad. Warehouse throughput reflects the broader team, not one person; no custom WMS API ownership is claimed.',
  evidence:'Existing GPS 3PL case study and career records. Current title was confirmed by Sung; client and sensitive incident details are excluded.',
  evidenceType:['Career record','Case study'],evidenceRefs:[caseStudy('gps-3pl-operations')],
  links:[caseStudy('gps-3pl-operations')]
 }),
 record({
  id:'layrd',title:'LAYRD — Operations & Systems',type:'Professional work · Independent business',category:'professional',status:'In Progress',
  statusNote:'Ongoing business operations and systems support.',
  description:'Support the systems around a Shopify storefront, from fulfillment and returns to financial records.',
  problem:'A working customer experience depends on reliable handoffs beyond the storefront.',
  technologies:['Shopify','UPS shipping workflows'],group:'related',visibility:professional,
  role:'Owner working with an operating partner; focused on storefront systems, shipping labels, returns, records, and administration.',
  approach:['Configure and troubleshoot storefront systems.','Support fulfillment and own shipping-label and returns workflows.','Maintain financial records and administrative documentation.'],
  implementedScope:['Storefront systems support.','Shipping-label, returns, financial-record, and administrative workflows.'],
  limitations:'Product sourcing, inventory, brand content, advertising, and customer communication are partner-led. No revenue or growth metric is claimed.',
  evidence:'Existing LAYRD operations case study, with a defined collaboration boundary.',
  evidenceType:['Case study'],evidenceRefs:[caseStudy('layrd-operations')],
  links:[caseStudy('layrd-operations'),{label:'Visit store',url:'https://layrd-shop.com/'}]
 })
];

// A distinct resume-reported workflow, not Label Helper or the newer GPS THE DOT app.
professionalProjects.push(record({
 id:'google-sheets-automation',title:'Google Sheets Packing Cover Automation',type:'Operational workflow · Packing preparation',category:'professional',status:'Prototype',group:'related',visibility:professional,demoCandidate:true,
 description:'Prepare packing covers with SKU quantities, box guidance and a date-and-batch QR for the shipping handoff.',
 problem:'Packers needed an accurate cover for each batch. Repeatedly copying SKU quantities and checking label details created manual work and opportunities for error.',
 role:'Built the packing-cover workflow and automated SKU-combination box guidance with Apps Script, as confirmed by the owner. Detailed code authorship and collaboration scope are not independently verified.',
 technologies:['Google Sheets','Google Apps Script'],
 implementedScope:['Packing covers contain SKU quantities and the last four digits of shipment labels, as described by the owner.','Apps Script supplies box guidance for SKU combinations, reducing repeated copy-and-paste.','Printed date-and-batch QR codes prepare the handoff to the QR selection helper.'],
 approach:['Bring batch information into the packing-cover worksheet.','Use SKU combinations for box guidance; resolve unknown combinations manually.','Print the cover and QR, then reconcile quantities before manually completing work in the shipping workflow.'],
 validation:'The owner recording shows worksheet updates and box-size exception handling. The full source and data-transfer mechanism were not inspected. Script-running/completion messages occur in the original, outside this shortened public-review excerpt.',
 statusNote:'Operational use is owner-reported. The redacted recording illustrates the worksheet, not end-to-end correctness or a measured speed improvement.',
 limitations:'PDF compatibility is an owner-reported constraint; its exact scope needs clarification. Only the last four shipment-label digits are recorded. Gmail classification and daily-summary behavior are not demonstrated by this recording and are not claimed here. Separate from Label Helper and GPS THE DOT.',
 evidence:'Owner workflow clarification and real recording. All operational values and QR payloads are masked in the local review copy; original recordings remain private.',
 evidenceType:['Owner-provided recording','Owner workflow clarification'],evidenceRefs:[{label:'Private source recording reviewed; public-review copy is cropped and redacted'}],links:[],
 demoVideo:'project-demos/packing-review.webm',posterImage:'project-demos/packing-review.jpg',demoDuration:10,
 demoCaption:'Real owner recording with operational fields masked. Packing-cover excerpt; explanatory captions include owner-reported architecture. Prepared for local publication review.',evidenceStatus:'sanitized-user-recording',
 projectJourney:[{title:'Repeated packing preparation',description:'Owner-reported: covers were assembled for packers with SKU quantities and shipment-label suffixes.'},{title:'Structured packing cover',description:'Apps Script box guidance and a date-and-batch QR connect preparation to the shipping helper. Full end-to-end execution is not independently verified.'}],
 nextMilestone:'Approve the redacted local demo and clarify the PDF compatibility constraint before publication.',
}));

const newPersonalProjects=[
 record({
  id:'gps-the-dot',title:'GPS THE DOT',type:'Operations research · Incremental development',category:'personal',status:'In Progress',group:'building',visibility:personal,
  statusNote:'Controlled prototype development; application-level Google integration verification remains outstanding.',
  description:'Connect operational information while making verification and deliberate actions part of the workflow.',
  problem:'Operational information arrives through disconnected messages, attachments, and working documents.',
  technologies:[],role:'Product and workflow direction are documented; precise implementation and collaboration ownership remain to be confirmed.',
  approach:['Bring relevant operational information into a reviewable workflow.','Preview proposed actions before a user-triggered run.','Verify each integration boundary before expanding automation.'],
  implementedScope:['Operational dashboard, task detail, history, and evidence views documented.','OAuth and restricted test-sheet action code documented.','Preview-first, user-triggered execution with verification guards.'],
  validation:'Available development documentation reports synthetic tests. App login, real-account reads, attachment compatibility, and app-triggered write/readback still require validation.',
  limitations:'Earlier connector-based test writes are not proof of the app’s Google integration. No unattended or completed end-to-end warehouse automation is claimed.',
  evidence:'Sanitized summary of the available development record. Internal document links and operational identifiers are intentionally withheld.',
  evidenceType:['Available development documentation','Reported synthetic test records'],
  evidenceRefs:[{label:'Development record reviewed — internal details withheld'}],links:[],
  nextMilestone:'Validate app sign-in and a permitted test read/write with readback before expanding the workflow.'
 }),
 record({
  id:'market',title:'Market Intelligence Lab',type:'Independent research · AI-assisted development',category:'personal',status:'In Progress',group:'building',visibility:personal,
  statusNote:'Active implementation with local evidence views; the full market interpretation system remains in development.',
  description:'Build an evidence-based market research platform with traceable data and explainable uncertainty.',
  problem:'Market signals are fragmented across providers and difficult to compare without losing their context.',
  technologies:['Python','Streamlit','Plotly','httpx'],
  role:'Product direction, research questions, data-quality requirements, and acceptance criteria, supported by AI-assisted development.',
  approach:['Collect and validate evidence from FRED, Tiingo, and Coinbase.','Store traceable local artifacts and inspect them in evidence views.','Develop explicit calculations and rule-based explanations while keeping uncertainty visible.'],
  implementedScope:['Market-data collection, validation, and local artifact storage.','Streamlit and Plotly evidence views.','Deterministic inflation calculations, explanations, and refresh orchestration.'],
  validation:'Public implementation and repository test files reviewed. Provider connectivity, scheduled execution, and tests were not rerun during this portfolio update.',
  limitations:'Not a stock-price predictor, recommendation engine, or trading bot. An inflation module does not establish a completed composite market score or AI analysis system. Provider data is not redistributed here.',
  evidence:'Public source contains collection, storage, Streamlit views, and deterministic inflation modules. Older broad roadmap language is not treated as shipped scope; a labor module was not present in the current public tree.',
  evidenceType:['Public source','Repository test definitions'],evidenceRefs:[github('market-intelligence-lab')],
  nextMilestone:'Validate evidence freshness and missing-data behavior before defining broader comparison and regime inputs.',
  links:[github('market-intelligence-lab'),caseStudy('market-intelligence-lab')]
 }),
 record({
  id:'unreallab',title:'UnrealLab — Cinematic Game Concept',type:'Independent concept exploration',category:'learning',status:'Concept / Exploration',group:'learning',visibility:personal,
  statusNote:'Direction exploration. No playable game or finished prototype has been verified.',
  description:'Explore a third-person cinematic fantasy adventure about beliefs, choices, and an imperfect world.',
  problem:'Explore how conflicting perspectives and meaningful consequences can shape narrative-driven gameplay.',
  technologies:[],role:'Concept and creative-direction exploration.',
  approach:['Explore conflicting human beliefs and perspectives.','Consider choices with meaningful consequences.','Develop the direction of an evolving, imperfect world.'],
  limitations:'No playable build, production pipeline, implemented gameplay, or technology usage is claimed.',
  evidence:'Concept scope and status supplied by Sung. The referenced Notion page could not be accessed in this review.',
  validation:'User-supplied direction only. No playable build or implemented gameplay has been verified.',
  evidenceType:['User-supplied concept'],evidenceRefs:[{label:'Concept direction supplied by Sung'}],
  nextMilestone:'Define a small testable gameplay slice; a playable build is not yet evidenced.',
  links:[]
 }),
 record({
  id:'portfolio',title:'Basketball Portfolio 2.0',type:'Independent portfolio · AI-assisted development',category:'personal',status:'In Progress',group:'building',visibility:{...personal,film:true},
  posterImage:'project-images/portfolio-2.jpg',evidenceStatus:'local-browser-screenshot',
  demoCaption:'Actual local Portfolio 2.0 screenshot · October 18, 2026. Shows the current preview, not a deployed production release.',
  statusNote:'Working local candidate; further refinement and review are ongoing.',
  description:'Use a basketball arena to connect professional experience, problem-solving stories, and working projects.',
  problem:'Show how practical work connects people and systems without making visitors decode a conventional resume.',
  technologies:['Three.js','JavaScript','HTML','CSS'],
  role:'Portfolio direction, content decisions, and iterative review, with AI-assisted implementation.',
  approach:['Navigate a shared Three.js arena through a camera rail.','Open Career Gallery and interactive Playbook experiences.','Connect spatial discovery to readable editorial project details.'],
  implementedScope:['Shared Three.js arena and camera-driven navigation.','Career Gallery and interactive three-case Playbook.','Film Lab and editorial project discovery.'],
  validation:'Features are present in this working candidate. Local changes may not be present in the public branch or deployed site.',
  limitations:'This is an evolving candidate. The current local implementation may extend beyond the published repository snapshot.',
  evidence:'Current preview modules implement the arena, camera-driven navigation, Career Gallery, and interactive project experiences.',
  evidenceType:['Current local implementation','Public repository'],evidenceRefs:[github('myportfolio')],
  nextMilestone:'Review project evidence, responsive readability, and the handoff between spatial and editorial experiences.',
  links:[github('myportfolio')]
 })
];

const learningProjects=[
 record({
  id:'raiders',title:'Raiders',type:'Game Prototype · C++',category:'learning',status:'Prototype',group:'learning',visibility:personal,
  description:'Explore a small dungeon game through character, enemy, combat, and item systems.',
  problem:'Practice connecting player actions, enemy behavior, and game objects into a playable loop.',
  technologies:['C++'],role:'Game-prototype source is present in Sung’s repository; exact individual and collaborative scope is not established.',
  implementedScope:['Character and enemy source.','Combat and item-related source.'],
  validation:'Source and a referenced gameplay-video link were found. The build and video were not independently replayed in this update.',
  statusNote:'Game prototype; not presented as a shipped commercial game.',
  limitations:'Repository scope does not establish a complete game, current build reproducibility, or sole authorship.',
  evidence:'C++ source and a gameplay-video reference in the repository README.',
  evidenceType:['Public source','Referenced gameplay footage'],evidenceRefs:[github('Raiders')],links:[github('Raiders')]
 }),
 record({
  id:'hacker-news-qa',title:'Hacker News QA Exercise',type:'QA learning exercise',category:'learning',status:'Learning Exercise',group:'learning',visibility:personal,
  description:'Retrieve Hacker News articles and check their chronological order with Playwright.',
  problem:'Practice translating a concrete browser-validation requirement into a repeatable check.',
  technologies:['JavaScript','Playwright'],role:'Repository-based QA exercise; not a production QA platform.',
  implementedScope:['Browser-driven article retrieval.','Chronological-order checks in the exercise code.'],
  validation:'Actual exercise source reviewed; live-site test behavior was not rerun for this portfolio.',
  statusNote:'Learning exercise with source evidence, not a deployed service.',
  limitations:'No professional client delivery, continuous monitoring, or current passing run is claimed.',
  evidence:'Public exercise implementation; assignment text is not treated as proof of execution.',
  evidenceType:['Public source'],evidenceRefs:[github('sortHackerNewsArticles')],links:[github('sortHackerNewsArticles')]
 }),
 record({
  id:'hand-battle',title:'Hand Battle',type:'React game experiment',category:'learning',status:'Learning Exercise',group:'learning',visibility:personal,
  description:'Practice interactive game state through a small rock-paper-scissors interface.',
  problem:'Connect player choices, outcome feedback, and score state in a focused React exercise.',
  technologies:['React','JavaScript','CSS'],role:'Frontend learning project.',
  implementedScope:['Player-choice and round-result UI.','Score and reset behavior described in the repository.'],
  validation:'Repository and documented preview reference reviewed; current hosted behavior was not revalidated.',
  statusNote:'Learning experiment; no commercial or usage outcome is claimed.',
  limitations:'A documented demo link is not proof of present availability. No new external demo is exposed without a fresh check.',
  evidence:'Public React project and repository documentation.',
  evidenceType:['Public source','Repository documentation'],evidenceRefs:[github('handbattle')],links:[github('handbattle')]
 }),
 record({
  id:'simon-game',title:'Simon Game',type:'React game experiment',category:'learning',status:'Learning Exercise',group:'learning',visibility:personal,
  description:'Explore sequence memory, input feedback, and game state in React.',
  problem:'Coordinate a growing color sequence with a player’s repeated input.',
  technologies:['React','JavaScript'],role:'Frontend learning project.',
  implementedScope:['Color-sequence memory game UI.','Round and score state described in the repository.'],
  validation:'Repository and documented preview reference reviewed; current hosted behavior was not revalidated.',
  statusNote:'Learning experiment, not a production gaming service.',
  limitations:'No active-user, performance, or commercial outcome is claimed. The documented external demo was not rechecked.',
  evidence:'Public React project and repository documentation.',
  evidenceType:['Public source','Repository documentation'],evidenceRefs:[github('simongameapp')],links:[github('simongameapp')]
 }),
 record({
  id:'csharp-turn-based',title:'C# Turn-based Mini Game',type:'C# game-logic exercise',category:'learning',status:'Learning Exercise',group:'learning',visibility:personal,
  description:'Practice character, enemy, and turn-based game logic in C#.',
  problem:'Structure interactions and state changes in a small turn-based program.',
  technologies:['C#'],role:'Game-logic learning exercise.',
  implementedScope:['Character and enemy classes.','Turn-based game-logic source.'],
  validation:'Source structure reviewed; the application was not built or run in this portfolio update.',
  statusNote:'Learning exercise with source, not a verified downloadable game.',
  limitations:'No Unity implementation, playable distribution, or production-readiness claim is made.',
  evidence:'Public solution and C# source files.',
  evidenceType:['Public source'],evidenceRefs:[github('turnbase_minigame_project')],links:[github('turnbase_minigame_project')]
 }),
 record({
  id:'shelterian',title:'ShelterianApp',type:'React notes exercise',category:'learning',status:'Learning Exercise',group:'learning',visibility:personal,
  description:'A small React application for adding and removing notes.',
  problem:'Practice basic input and list-state interactions.',
  technologies:['React','JavaScript','Vite'],role:'Frontend learning exercise.',
  implementedScope:['Add notes.','Remove notes from the displayed list.'],
  validation:'Application source reviewed; persistence and deployed behavior are not established.',
  statusNote:'Basic notes exercise; the repository name does not describe a shelter-management product.',
  limitations:'Not an animal-shelter platform; no unsupported domain features or operational usage are implied.',
  evidence:'React application source, rather than an inference from the repository name.',
  evidenceType:['Public source'],evidenceRefs:[github('shelterianApp')],links:[github('shelterianApp')]
 }),
 record({
  id:'sungstation',title:'SungStation',type:'Early order-and-shipping prototype',category:'learning',status:'Prototype',group:'learning',visibility:personal,
  description:'Explore an order-and-shipping backend, with only part of the route structure implemented.',
  problem:'Explore how order and shipping tasks could be organized in a dedicated service.',
  technologies:['JavaScript','Node.js','Express'],role:'Repository prototype; exact contribution scope remains to be confirmed.',
  implementedScope:['Server structure and some order-related implementation.','Route placeholders for further shipping workflows.'],
  validation:'Source reviewed. Several label, rate, and upload route files are empty; no live shipping integration was validated.',
  statusNote:'Incomplete early prototype; README feature descriptions exceed the implemented route scope.',
  limitations:'Not a finished logistics platform. Working label purchase, rate comparison, production deployment, and live shipping integration are not established.',
  evidence:'Public server/order source plus empty route files that define the current limitation.',
  evidenceType:['Public source','Incomplete implementation'],evidenceRefs:[github('sungstation')],links:[github('sungstation')],
  nextMilestone:'Implement and test one bounded workflow before describing broader shipping functionality.'
 })
];

// Reuse existing public descriptions and links; do not rewrite or move Archive.
const legacyOverrides={
 'Remembering Young Hoon':{
  id:'memorial',category:'personal',status:'Completed',group:'related',visibility:personal,
  posterImage:'project-images/remembering-young-hoon.jpg',evidenceStatus:'public-site-screenshot',
  demoCaption:'Actual public landing-page screenshot · October 18, 2026. Guest submissions and administration are not included; this is not a full workflow validation.',
  statusNote:'Deployed project with recorded release checks; the live service was not re-tested in this review.',
  problem:'Let people contribute memories while keeping consent, review, privacy, and publication decisions explicit.',
  technologies:['Next.js','React','TypeScript','AWS'],role:'Independent project owner from requirements and workflow decisions through AWS setup and deployment, using AI-assisted development.',
  approach:['Accept bilingual memory contributions and preserve consent.','Review submissions through authenticated, role-based administration.','Process private media asynchronously and control public visibility.'],
  implementedScope:['Bilingual submissions, consent, and review controls.','Role-based administration and private-media processing.','AWS setup and deployment recorded in the existing case study.'],
  limitations:'No claim of large-scale usage. AI photo classification, face recognition, and full legacy-image backfill remain future work.',
  evidence:'Existing memorial case study documents implemented features, deployment, release QA, and ownership boundaries.',
  evidenceType:['Case study','Recorded release checks'],evidenceRefs:[caseStudy('remembering-young-hoon'),github('father-memorial-site')]
 },
 'SungFlix':{
  id:'sungflix',category:'learning',status:'Prototype',group:'learning',visibility:{...personal,film:true},
  problem:'Practice presenting external movie data through a responsive discovery interface.',technologies:['React','External APIs'],
  role:'Frontend learning project.',approach:['Browse movie information.','Render external API data in a responsive React interface.'],
  implementedScope:['React movie-discovery UI with external API data.','Responsive browsing interface shown in the bundled demo capture.'],
  poster:'sungflix-poster.png',video:'sungflix-demo.webm',mediaNote:'Actual public-demo UI capture · October 12, 2026 · 8 seconds · silent. Not a movie or trailer.',
  demoVideo:null,demoDuration:null,evidenceStatus:'existing-capture-not-user-provided',
  demoCaption:'Existing project screenshot from a browser-captured public demo. The earlier recording is preserved but not enabled under the user-provided-video policy.',
  limitations:'A learning interface, not a commercial streaming service. External demo availability has not been rechecked.',
  evidence:'Existing portfolio record and bundled recording of the public demo.',
  evidenceType:['Existing portfolio record','Actual demo capture'],evidenceRefs:[github('netflix-demo'),{label:'Bundled public-demo recording · October 12, 2026'}]
 },
 'Dice Game':{
  id:'dice',category:'learning',status:'Prototype',group:'learning',visibility:{...personal,film:true},
  problem:'Practice React state, player interaction, and replay behavior in a small game.',technologies:['React'],role:'Frontend learning project.',
  approach:['Present a two-player game.','Update game state through interaction.','Allow a new round through the replay flow.'],
  implementedScope:['Two-player React game interface.','Game-state and replay interactions recorded in the existing project description.'],
  poster:'dice-poster.png',mediaNote:'Existing portfolio project image. No demo video is available.',
  demoCaption:'Existing portfolio project image. No user-provided recording is available.',
  limitations:'A learning experiment; no usage or commercial outcome is claimed.',evidence:'Existing portfolio record and project image.',
  evidenceType:['Existing portfolio record','Existing project image'],evidenceRefs:[github('diceGame')]
 },
 "What's in Your Fridge":{id:'fridge',problem:'Connect recipe discovery with ingredient shopping.',technologies:[],role:'Group full-stack project; precise individual contribution is not specified in the existing catalog.',implementedScope:['Recipe discovery and ingredient-shopping workflow in the existing portfolio record.']},
 'SJ Shopping Mall':{id:'shopping',problem:'Practice an apparel browsing and purchase workflow.',technologies:[],role:'Individual full-stack learning project.',implementedScope:['Apparel browsing and purchase workflow in the existing portfolio record.']},
 'Task Manager':{id:'tasks',problem:'Practice authenticated task creation, editing, deletion, and filtering.',technologies:[],role:'Individual full-stack project.',implementedScope:['Authenticated task creation, editing, deletion, and filtering in the existing portfolio record.']},
 'City Weather':{
  id:'weather-app',title:'Weather App → Portfolio Integration',category:'learning',group:'learning',status:'Prototype',visibility:personal,demoCandidate:true,
  type:'Learning progression · Applied portfolio feature',
  description:'From a standalone weather experiment to a weather-aware portfolio exterior, with explicit unavailable-data states.',
  problem:'Make external weather information useful without presenting missing or simulated conditions as live data.',
  technologies:['React','JavaScript','OpenWeather','Open-Meteo','Three.js'],
  role:'Standalone frontend learning project, followed by portfolio direction and iterative review with AI-assisted implementation.',
  implementedScope:['Standalone React city search, browser-location input, and current-condition displays using OpenWeather.','Separate Gardena weather integration using Open-Meteo, without visitor location or an API key.','Exterior day/night, clouds, rain, and lighting; indoor baseline retained.','Unavailable-data labels, timestamp checks, and explicitly marked weather preview presets.'],
  validation:'Both source implementations were inspected. Current live API availability and original app behavior were not re-tested for this journey.',
  statusNote:'Two source-verified implementations connected by a user-described learning progression; not a verified code migration.',
  approach:['Practice weather requests and user-facing states in a standalone app.','Apply the experience to one fixed portfolio location and an exterior-only atmosphere.','Keep live estimates, manual previews, and approximate time fallback distinguishable.'],
  limitations:'No direct code reuse or shared architecture is established. Providers and UI architecture differ. Original-app error handling and displayed-unit accuracy have not been certified. Local-time fallback is approximate, not astronomical sunrise/sunset.',
  evidence:'Public City Weather source and the current local portfolio weather modules were compared. The learning connection was supplied by Sung; implementation claims are limited to inspected code.',
  evidenceType:['Public source','Current local implementation','User-described learning progression'],
  evidenceRefs:[github('cityweatherapp'),{label:'Current portfolio: weather, exterior-lighting, and navigation modules inspected'}],
  nextMilestone:'Add a sanitized recording of live estimates, manual preview modes, and unavailable-data handling.',
  projectJourney:[
   {title:'The original task',state:'verified-implementation',description:'Show current weather for a searched city or the browser location in a standalone application.'},
   {title:'Start with a standalone experiment',state:'verified-implementation',description:'React, city search, and browser location bring OpenWeather current conditions into a small application.'},
   {title:'Carry the learning forward',state:'user-described-learning',description:'Apply experience with external data and user-facing weather states to Portfolio 2.0. The two implementations were built separately.'},
   {title:'Integrate with the portfolio',state:'verified-implementation',description:'A separate Open-Meteo module supplies Gardena conditions for the header and exterior. Interior lighting keeps its baseline.'},
   {title:'Make uncertainty visible',state:'verified-implementation',description:'Validate timestamps, label unavailable data and preview modes, and disclose the approximate local day/night fallback.'},
   {title:'Record the behavior',state:'planned-evidence',description:'Provide a sanitized user recording. This is a future evidence step, not a completed demo.'},
  ],
 }
};

const legacyProjects=archive.map(item=>{
 const extra=legacyOverrides[item.title];
 return record({
  id:extra.id,title:item.title,type:item.type,category:'archive',status:'Prototype',description:item.description,
  statusNote:'Existing portfolio record; live deployment not rechecked.',
  visibility:{film:false,work:false,personal:false},
  limitations:'No additional implementation, ownership, or outcome claims are inferred from the catalog entry.',
  evidence:'Existing portfolio project record.',
  evidenceType:['Existing portfolio record'],evidenceRefs:[item.link&&{label:'Existing project source',url:item.link}].filter(Boolean),
  links:[item.link&&{label:'GitHub',url:item.link},extra.id==='fridge'?{label:'Coming Soon',url:null}:item.liveLink&&{label:'Visit project',url:item.liveLink},item.caseStudy&&{label:'Archived case study',url:`https://sungjung-portfolio-v1.netlify.app${item.caseStudy}`}].filter(Boolean),
  ...extra
 });
});

export const projects=[...professionalProjects,...newPersonalProjects,...learningProjects,...legacyProjects];
// Authentic project UI images only. Provenance is kept beside the bundled assets.
const screenshotPreviews={
 'simon-game':['simon-game.png','Screenshot published in the Simon Game repository README. Historical UI, not a new runtime verification.'],
 'hand-battle':['hand-battle.png','Screenshot published in the Hand Battle repository README. Historical UI, not a new runtime verification.'],
 fridge:['fridge.png','Existing portfolio screenshot of the recipe-discovery interface. Current live behavior has not been revalidated.'],
 shopping:['shopping.png','Existing portfolio screenshot of the public product catalog. No customer or checkout information is shown.'],
 tasks:['tasks.png','Existing portfolio screenshot of the sign-in screen. No credentials are included; authenticated functionality is not demonstrated here.'],
 'weather-app':['weather-app.png','Historical standalone City Weather screenshot. Displayed weather is not live; the Portfolio integration is a separate implementation.'],
};
projects.forEach(project=>{
 const preview=screenshotPreviews[project.id];
 if(preview){project.posterImage='project-images/'+preview[0];project.demoCaption=preview[1];}
});
export const getProject=id=>projects.find(project=>project.id===id);
// One session selection shared by the immersive and editorial views.
// RC1: related operational tools, not an asserted technical integration.
export const featuredAutomationIds=['google-sheets-automation','label','qr'];
export const featuredWorkIds=['google-sheets-automation','qr','eternights','coupang'];
export const automationContext='Across broader daily documentation and label printing, estimated time decreased from 180–200 minutes to about 150 minutes per day: roughly 30–50 minutes saved. This operational estimate covers several workflow improvements, not the performance of any one tool. The broader warehouse receives approximately 10,000 daily orders; this is not an individual tool capacity.';
const journalBase='https://github.com/SungJung0616/myportfolio/blob/30805a89fa6007db7a23f8f104f58a7174354a12/docs/portfolio-2/engineering-journal/';
const journalRefs=[{label:'Portfolio engineering: shared evidence and media policy (FIX 09; not an automation-tool test)',url:journalBase+'FIX-09.md'},{label:'Portfolio engineering: selection synchronization and STEP 03B packaging (not warehouse validation)',url:journalBase+'FIX-10.md#step-03b--film-viewing-interval-and-preview-packaging'}];
const stories={
 'google-sheets-automation':{
  previous:'Prepare a batch, print its shipment labels, and repeatedly copy SKU quantities and label suffixes into a cover for packers.',
  demonstrated:'The private source shows worksheet updates, box guidance and script status. The approved excerpt keeps only the redacted worksheet. Hidden values and end-to-end correctness cannot be checked from that excerpt.',
  flow:{Input:'Batch information, SKU quantities and shipment-label suffixes.',Processing:'Packing-cover preparation and owner-reported Apps Script box guidance. Parsing sources and algorithms are not verified.',Output:'A packing cover with box guidance and date/batch QR information; printing is not guaranteed by this demonstration.','Human verification':'Check SKU quantities, correct unknown box sizes, and review the cover, label suffixes and QR before use.'},
  human:'The operator confirms the batch, SKU quantities, box choice and printed cover. PDF compatibility is an owner-reported constraint whose exact scope remains unverified.',
  outcome:'Less repeated preparation is owner-reported; no separate measured saving is attributed to this tool. See the broader daily workflow context above.'
 },
 label:{
  previous:'Managers transferred selected batch information into the label worksheet by hand, then reviewed the cover before printing.',
  demonstrated:'The public source prepares writes to designated Sheets cells through browser interaction. The original packing recording includes this wider workflow, but the current heavily cropped excerpt is not a legible standalone demonstration of the extension.',
  flow:{Input:'Selected, rendered batch rows and their displayed fields.',Processing:'Validate the target and prepare permitted cell writes through browser interaction, not the Sheets API.',Output:'Worksheet input actions and status feedback; not a verified saved or printed label.','Human verification':'Confirm compatible batch selection, inspect final saved values, and review cover, shipment labels and QR before printing.'},
  human:'Do not assume partial writes roll back. Inspect and correct the worksheet after errors; final save and print success require human review.',
  outcome:'Historical owner-reported error reduction is shown below with its original uncertainty. No independent benchmark or zero-error guarantee exists.'
 },
 qr:{
  previous:'Locate batch numbers visually in the work list and compare the intended batch and quantities before completing work.',
  demonstrated:'The source recording shows a partial-list warning and later selection confirmations. The redacted excerpt preserves selection indicators, not readable live identifiers or a physical scanner test.',
  flow:{Input:'Date/batch QR text and the displayed work list.',Processing:'The reviewed public version validates the list and exact match; dry-run previews a match without selecting. Operational behavior is recorded separately and version equivalence is unverified.',Output:'A match result or a selected row and activity feedback, not automatic fulfillment.','Human verification':'Confirm the batch and reconcile cover quantities with overall quantities, then explicitly click work completion.'},
  human:'The helper selects rows only. The operator owns quantity reconciliation and final completion. WMS batch linkage is owner-reported, not verified end-to-end here.',
  outcome:'The recording supports row-selection assistance, not a QR-only time-saving metric. The broader daily workflow observation is reported once above.'
 }
};
for(const id of featuredAutomationIds){
 const project=projects.find(p=>p.id===id);project.caseStudy=stories[id];
 project.role=id==='google-sheets-automation'?'Defined the packing-cover requirements and built the owner-described Apps Script box guidance with AI-assisted development. Detailed authorship and the full script implementation are not independently verified.':'Defined the operational problem, workflow requirements, decisions and human acceptance checks, with AI-assisted development. Exact individual code authorship and public/operational release equivalence are not independently verified.';
 project.evidenceRefs=[...(project.evidenceRefs||[]),...journalRefs];
 project.projectJourney?.forEach(step=>{step.state=step.title==='Observed helper behavior'?'recording-observed':'owner-reported';});
 if(id==='google-sheets-automation')project.demoCaption='Batch information → cover preparation → worksheet output → human cover and QR review. Real redacted excerpt; hidden values are not validated.';
 if(id==='qr')project.demoCaption='Date/batch identifier → list validation → row selection → human quantity check and completion. Real redacted excerpt, not automatic ship-out.';
}
const qrProject=projects.find(p=>p.id==='qr');qrProject.results=null;
const labelProject=projects.find(p=>p.id==='label');
labelProject.results.note='Historical owner report per approximately 150 batches. Measurement period, methodology and version equivalence are unverified; not independently benchmarked.';
labelProject.statusNote='Public-source browser input workflow; operational/public version equivalence is unverified. Final saved values and print output remain human checks.';
// Keep the intended representative order in Film as well as Work without new IDs.

// Approved owner-confirmed positioning. IDs, source links and media paths stay intact.
const packing=getProject('google-sheets-automation');
Object.assign(packing,{
 title:'Batch Preparation & Packing Cover Workflow',
 description:'Improve the information handoff from batch preparation to physical packing.',
 problem:'At approximately 10,000 daily orders across the warehouse, batch processing kept packing stations manageable. Handwritten instructions evolved into structured covers, but repeated information transfer into Google Sheets remained.',
 role:'I defined the operational problem and requirements, coordinated workflow changes, and used AI-assisted development to improve information transfer and usability.',
 approach:['Use structured covers for operational identification, SKU quantities, box preparation and QR information.','Improve repeated transfer into Google Sheets; address Korean/English retrieval inconsistencies with AI assistance.','Refine on-screen clicks into a keyboard shortcut mapped to a programmable Logitech mouse button.','Keep shipment verification and batch release with operators.'],
 validation:'The approved redacted recording shows worksheet behavior. Operators verify shipment information before release; the excerpt does not establish hidden-value correctness or physical packing accuracy.',
 limitations:'A customer-led Workpad update improved SKU grouping. Packing Cover, Label Helper and QR Helper are related operational improvements, not one integrated software product. PDF compatibility remains a documented constraint.',
 evidence:'Owner-confirmed operational experience, the approved redacted recording and existing project references.',
 statusNote:'Operational improvement with AI-assisted implementation and human release checks.',
 nextMilestone:'Document the exact PDF compatibility constraint and a sanitized Korean/English retrieval regression example.'
});
Object.assign(packing.caseStudy,{
 previous:'Handwritten instructions developed into structured batch covers. Repeated transfer into Google Sheets remained after a customer-led Workpad grouping improvement.',
 demonstrated:'The approved excerpt shows the redacted worksheet. It illustrates interface behavior; hidden shipment values and physical packing are outside the demonstration.',
 human:'Operators check shipment information, SKU quantities, box guidance and cover details before releasing batches to packing.',
 outcome:'Estimated broader documentation and label-printing time fell from 180–200 to about 150 minutes daily. The 30–50-minute saving spans several improvements and is not attributed to this tool alone.'
});
packing.caseStudy.flow.Processing='AI-assisted information-transfer improvements and Apps Script box guidance; a shortcut and programmable mouse button reduce repeated interaction.';
packing.caseStudy.flow['Human verification']=packing.caseStudy.human;
packing.projectJourney=[{title:'Structured batch covers',state:'owner-reported',description:'Handwritten instructions evolved into covers for operational identification, SKU quantities, box preparation and QR information.'},{title:'Information-transfer improvements',state:'owner-reported',description:'AI-assisted improvements addressed remaining transfer work, Korean/English retrieval, keyboard shortcuts and programmable mouse input.'}];
Object.assign(getProject('label'),{
 role:'I defined the repetitive data-entry problem and acceptance checks, using AI-assisted development for browser-based worksheet input.',
 validation:'Public-source review describes browser-driven cell entry. Final saved values and print output require operator review.',
 limitations:'A separate browser helper within the broader workflow. Partial writes may need manual correction; final save and printing stay human-controlled.',
 statusNote:'Browser-based worksheet input with final human review.'
});
Object.assign(getProject('qr'),{
 role:'I defined the date-and-batch handoff, validation rules and human controls, using AI-assisted development.',
 validation:'The recording shows list-validation feedback and row selection. Public parser and fake-DOM test records are separate evidence; a physical-scanner test is not included.',
 limitations:'Row selection is assisted. Operators reconcile quantities and complete the work. WMS batch linkage is operational context, not an end-to-end integration demonstrated here.',
 statusNote:'Validation and row-selection assistance; final completion remains human-controlled.'
});
getProject('qr').caseStudy.flow.Processing='The reviewed public version requires a complete list and one exact match, with dry-run before deliberate live selection. The recording shows operational UI behavior; exact release equivalence is still to be documented.';
getProject('qr').caseStudy.outcome='The recording demonstrates row-selection assistance. No tool-specific time-saving metric is assigned.';
getProject('label').caseStudy.outcome='Historical error counts are operational observations, not a zero-error guarantee.';
getProject('label').results.note='Historical observation per approximately 150 batches. The counting method and period were not recorded; final review remains necessary.';
Object.assign(getProject('eternights'),{
 role:'QA Engineer: reproduced defects, clarified expected behavior with developers, performed targeted regression checks and verified fixes.',
 limitations:'Developer-provided save states and checkpoints supported my testing within the existing environment.',
 statusNote:'Studio Sai QA contribution, December 2021–May 2024.',
 validation:'Reproducible defect reports, fix verification and targeted regression testing within the existing development environment.'
});
getProject('eternights').results.note='Approximate time for a particular recurring workflow using developer-provided save states and checkpoints; not the entire QA process or a claim of identical total coverage.';
Object.assign(getProject('gps-3pl'),{
 role:'Senior Operations Manager: operational requirements, work instructions, account coordination and system handoffs.',
 description:'Translate warehouse constraints into requirements and practical workflow improvements.',
 approach:['Define operational requirements and work instructions.','Coordinate with account stakeholders and the AcrossB development team.','Improve remaining documentation and information-transfer bottlenecks after a customer-led Workpad SKU-grouping update.'],
 limitations:'AcrossB developed Workpad; the SKU-grouping update was customer-led. Approximately 10,000 daily orders describes the warehouse, not an individual automation capacity.'
});
// Keep uncertainty specific and actionable rather than implying an external audit.
for(const p of projects){
 for(const key of ['role','validation','evidence','limitations','statusNote']){
  p[key]=p[key].replaceAll('not independently verified','not covered by the available source or demonstration').replaceAll('not independently audited','estimated from operational experience').replaceAll('not independently benchmarked','an operational estimate, not a controlled benchmark');
 }
 p.summary=p.description;
}

let selectedProjectId=null;
export const getSelectedProject=()=>getProject(selectedProjectId);
export function selectProject(id,origin){
 if(!getProject(id)||selectedProjectId===id)return;
 selectedProjectId=id;
 if(typeof window!=='undefined')window.dispatchEvent(new CustomEvent('portfolio:project-selected',{detail:{id,origin}}));
}
// Production slots only: empty until an actual sanitized user recording is reviewed.
// Each slot resolves to the same project used by Work and Film, never a second catalog.
export const demoCandidates=['qr','google-sheets-automation','label','return-scan','weather-app'].map(getProject);
// One scrollable selector: adding a project does not displace existing selections.
// Screenshots and reviewed demos resolve to the same records used by Work.
const readyDemos=demoCandidates.filter(p=>p.demoVideo&&p.evidenceStatus==='sanitized-user-recording').map(p=>p.id);
export const filmProjects=[...new Set([...featuredAutomationIds,...readyDemos,'sungflix','dice','coupang','label','qr','portfolio','memorial','simon-game','hand-battle'])].map(getProject);
projects.forEach(p=>{p.visibility={...p.visibility,work:true,film:filmProjects.includes(p)};});
