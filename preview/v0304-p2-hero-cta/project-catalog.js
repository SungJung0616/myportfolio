import {archive} from './navigation-data.js';

// Shared public catalog for Film Lab and Work. Archive records remain in place.
// Evidence: docs/portfolio-2/{PROJECT_CATALOG_DRAFT,CLAIMS_AND_EVIDENCE}.md,
// src/components/*CaseStudy.js, MyProjects.js, and the existing preview modules.
// FIX 09B reuses the source audit and verifies Market against its public repository.
// Notion evidence may inform a sanitized summary without exposing internal documents.
const caseStudy=slug=>({label:'Case study',url:`https://sj-personalportfolio.netlify.app/case-studies/${slug}`});
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
  statusNote:'Public implementation reviewed. Its equivalence to the version used for reported operational observations is unverified.',
  description:'Find one matching batch, validate it, and select it deliberately.',
  problem:'Manual batch searches required staff to identify the intended row and verify the selection.',
  technologies:['JavaScript','Chrome Manifest V3','QR text parsing','DOM validation'],featured:true,group:'featured',visibility:screening,
  role:'The implementation and reported workflow are documented; the exact individual contribution and collaboration scope remain to be confirmed.',
  approach:['Parse the QR identifier and inspect the displayed work list.','Require exactly one valid match; stop on ambiguity or an incomplete list.','Preview with dry-run by default, then require a deliberate live selection.'],
  implementedScope:['QR identifier parsing and visible-list validation.','Dry-run by default; stop for ambiguous or incomplete matches.','Explicit live selection of a validated row with limited undo.'],
  validation:'Source and historical parser/fake-DOM test records reviewed, not rerun. Physical scanners and operational release equivalence remain unverified.',
  limitations:'Selects a validated checkbox; it does not submit work, adjust inventory, or complete fulfillment. Physical-scanner and operational behavior are not established by fake-DOM test records. This is a separate product from Label Helper.',
  evidence:'Public source, parser tests, and historical fake-DOM test records. Reported timing is not an audited benchmark or a claim about every batch.',
  evidenceType:['Public source','Repository test records','User-reported operational observation'],evidenceRefs:[github('acrossb-flow-qr-helper')],
  results:{label:'Batch identification and verification time',before:'~20 min',after:'~5 min',note:'User-reported representative task; not independently audited.'},
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
 id:'google-sheets-automation',title:'Google Sheets Automation',type:'Operational workflow · Resume-reported implementation',category:'professional',status:'Prototype',group:'related',visibility:professional,demoCandidate:true,
 description:'Organize operational communications and daily summaries with a bounded Gmail, Google Sheets, and Apps Script workflow.',
 problem:'Operational communications and inbound/outbound information need to become usable daily records.',
 role:'AI-assisted workflow implementation is reported in the career record. Detailed authorship and current implementation version still require confirmation.',
 technologies:['Gmail','Google Sheets','Google Apps Script'],
 implementedScope:['Communication classification and inbound/outbound records reported in the career record.','Daily operational summaries reported in the career record.'],
 approach:[],validation:'Resume-reported implementation; no version-matched public source, sanitized demonstration, or independent runtime check is available.',
 statusNote:'Conservative prototype classification pending implementation evidence. No operational impact metric is claimed.',
 limitations:'This record is distinct from Label Helper browser entry and GPS THE DOT application development. API architecture, unattended behavior, and deployment scope are not established.',
 evidence:'A verified career-record entry describes the bounded workflow. Internal correspondence and Sheets content are withheld.',
 evidenceType:['Career record'],evidenceRefs:[{label:'Career record reviewed; internal operational materials withheld'}],links:[],
 nextMilestone:'Confirm the exact workflow version and provide a sanitized recording using fictional records.',
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
  links:[item.link&&{label:'GitHub',url:item.link},item.liveLink&&{label:'Visit project',url:item.liveLink},item.caseStudy&&{label:'Case study',url:`https://sj-personalportfolio.netlify.app${item.caseStudy}`}].filter(Boolean),
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
export const filmProjects=[...new Set([...readyDemos,'sungflix','dice','coupang','label','qr','portfolio','memorial','simon-game','hand-battle'])].map(getProject);
projects.forEach(p=>{p.visibility={...p.visibility,work:true,film:filmProjects.includes(p)};});
