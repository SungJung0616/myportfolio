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
    summary:'Made recurring regression checks more efficient while preserving validation coverage.',
    lines:['Quality through','every release.'],
    detail:'Supported Eternights development and PlayStation release QA through gameplay, functional, regression and localization testing. Wrote reproducible defect reports, validated fixes and collaborated with developers.',
    result:'Recurring regression workflow: approximately 8 hours → 4 hours, using developer-provided save states and checkpoints. Unity Test Framework use was within the existing environment.',
    steps:['Reproduce','Validate fix','Regression'],
    note:'Release QA · Workflow diagram'
  },
  {
    // Current title confirmed directly by Sung on 2026-10-16.
    id:'operations', period:'2024 – Present', company:'GPS Logix', role:'Senior Operations Manager',
    summary:'Connected warehouse workflows, system requirements and daily operational execution.',
    lines:['From warehouse','to workflow.'],
    detail:'Helped establish a new 3PL operation with account-specific locations, picking and packing flows, and work instructions. Designed an Excel-based SKU batching workflow and partnered with the AcrossB development team until automated SKU separation was added to Workpad.',
    result:'Operations scope includes Extensiv WMS and Workpad OMS. This describes operational requirements and collaboration, not sole software ownership or API integration.',
    steps:['Observe flow','Define change','Work with team'],
    note:'Operations systems · Workflow diagram'
  }
];
