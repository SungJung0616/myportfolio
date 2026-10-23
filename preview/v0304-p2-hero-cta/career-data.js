// Public-safe editorial summaries of CareerOS MASTER_RESUME.md (2026-09-15).
// Diagrams are explanatory, not employer screenshots or confidential system designs.
export const career = [
  {
    id:'data', period:'Jun 2016 – Nov 2021', company:'GPS Logix', role:'Database Manager',
    summary:'Turned repetitive shipping-data preparation into a reviewed automation workflow.',
    lines:['Shipping data,','ready for review.'],
    detail:'Built a Python/openpyxl workflow to map, normalize and validate marketplace orders before shipping-system upload. Incomplete or suspicious records were separated for manual review.',
    result:'Approximate daily preparation: 3 hours → 30 minutes. Human review and final upload control remained in place.',
    steps:['Order data','Validation','Human review'],
    note:'Python / openpyxl · Workflow diagram'
  },
  {
    id:'quality', period:'Dec 2021 – May 2024', company:'Studio Sai', role:'QA Engineer',
    summary:'Clarified expected behavior and verified fixes through targeted regression testing.',
    lines:['Quality through','every release.'],
    detail:'Supported Eternights development and PlayStation release QA through functional, gameplay, regression and localization testing. Wrote reproducible defect reports, clarified expected behavior with developers and verified fixes.',
    result:'A particular recurring regression workflow: approximately 8 hours → 4 hours using developer-provided save states and checkpoints. Used Unity Test Framework within the existing environment.',
    steps:['Reproduce','Validate fix','Regression'],
    note:'Release QA · Workflow diagram'
  },
  {
    // Current title confirmed directly by Sung on 2026-10-16.
    id:'operations', period:'2024 – Present', company:'GPS Logix', role:'Senior Operations Manager',
    summary:'Connected warehouse workflows, system requirements and daily operational execution.',
    lines:['From warehouse','to workflow.'],
    detail:'Translated warehouse constraints into operational requirements, work instructions and system handoffs across Extensiv WMS and Workpad OMS. Coordinated with stakeholders and developers. A customer-led Workpad update improved SKU grouping; my AI-assisted improvements addressed remaining information transfer, including Korean/English retrieval and shortcut/mouse usability.',
    result:'Broader warehouse volume: approximately 10,000 daily orders. Estimated documentation and label-printing time: 180–200 → about 150 minutes per day across broader workflow improvements. Operators verify shipment information before release.',
    steps:['Observe flow','Define change','Work with team'],
    note:'Operations systems · Workflow diagram'
  }
];
