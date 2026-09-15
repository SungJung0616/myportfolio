from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether, ListFlowable, ListItem

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'resume' / 'Sung_Jung_Resume.pdf'
NAVY, GREEN, GRAY = colors.HexColor('#162A3B'), colors.HexColor('#197E4C'), colors.HexColor('#4E5860')
styles = getSampleStyleSheet()
body = ParagraphStyle('Body', parent=styles['BodyText'], fontName='Helvetica', fontSize=10.1, leading=12.7, spaceAfter=3, textColor=colors.HexColor('#1D2329'))
summary = ParagraphStyle('Summary', parent=body, fontSize=10.2, leading=13, spaceAfter=3)
section = ParagraphStyle('Section', parent=body, fontName='Helvetica-Bold', fontSize=12, leading=14, textColor=NAVY, spaceBefore=7, spaceAfter=4, keepWithNext=True)
role_style = ParagraphStyle('Role', parent=body, fontName='Helvetica-Bold', fontSize=10.5, leading=12.8, textColor=NAVY, spaceBefore=4, spaceAfter=2, keepWithNext=True)
bullet_style = ParagraphStyle('Bullet', parent=body, fontSize=9.8, leading=12.1, leftIndent=12, firstLineIndent=0, spaceAfter=1.5)
contact = ParagraphStyle('Contact', parent=body, alignment=TA_CENTER, fontSize=9.4, leading=11.5, spaceAfter=4)
link = '#197E4C'

def sec(text): return Paragraph(text.upper(), section)
def bullets(items):
    return ListFlowable([ListItem(Paragraph(x, bullet_style), leftIndent=0) for x in items], bulletType='bullet', bulletFontName='Helvetica', bulletFontSize=6, leftIndent=12, bulletOffsetY=2, spaceAfter=1)
def role(title, company, location, dates, items):
    return KeepTogether([Paragraph(f'<b>{title}</b> <font color="#4E5860">| {company} | {location} | {dates}</font>', role_style), bullets(items)])
def footer(canvas, doc):
    canvas.saveState(); canvas.setFont('Helvetica', 7.8); canvas.setFillColor(GRAY)
    canvas.drawCentredString(letter[0]/2, .27*inch, f'Sung Jung | Operations Systems, Quality Engineering & Workflow Automation | {doc.page}')
    canvas.restoreState()

story = [
    Paragraph('<font color="#162A3B"><b>SUNG JUNG</b></font>', ParagraphStyle('Name', parent=body, alignment=TA_CENTER, fontName='Helvetica-Bold', fontSize=23, leading=25, spaceAfter=0)),
    Paragraph('<font color="#197E4C"><b>OPERATIONS SYSTEMS | QUALITY ENGINEERING | WORKFLOW AUTOMATION</b></font>', ParagraphStyle('Tag', parent=contact, fontSize=10.8, leading=13, spaceAfter=1)),
    Paragraph(f'Gardena, CA | 949-300-1641 | sungjung0616@gmail.com | <a color="{link}" href="https://www.linkedin.com/in/sungjung0616/">LinkedIn</a> | <a color="{link}" href="https://github.com/SungJung0616">GitHub</a> | <a color="{link}" href="https://sj-personalportfolio.netlify.app/">Portfolio</a>', contact),
    sec('Professional Summary'),
    Paragraph('Operations systems and quality professional who improves high-volume business workflows through structured validation, practical automation, and cross-functional delivery. Experience spans 3PL operations, marketplace data transformation, PlayStation release QA, and independently delivered cloud applications. Reduced a recurring shipping-data workflow from about three hours to 30 minutes and a regression cycle from about eight hours to four while preserving human review and coverage.', summary),
    sec('Core Skills'),
    Paragraph('<b>Operations &amp; Delivery:</b> 3PL workflows, account coordination, process improvement, stakeholder communication, work instructions, exception management<br/><b>Quality &amp; Data:</b> Manual and regression testing, release validation, test cases, defect reporting, data validation, reconciliation, result review<br/><b>Automation &amp; Systems:</b> Python, JavaScript, Google Apps Script, Excel, Google Sheets, Extensiv WMS, Workpad OMS, Shopify, ECOUNT ERP (basic)<br/><b>Development:</b> React, Node.js, HTML, CSS, Git/GitHub, SQL (basic), PostgreSQL, AWS configuration, Selenium projects, Unity Test Framework use', body),
    sec('Professional Experience'),
    role('Operations Manager - Account & Warehouse Operations', 'GPS Logix', 'Compton, CA', '2024 - Present', [
        'Helped establish a new 3PL operation, including account-specific locations, picking and packing flows, work instructions, and daily execution across Extensiv WMS and Workpad OMS.',
        'Designed an Excel-based SKU batching workflow to reduce picking travel, translated the operational requirement, and partnered with the AcrossB development team until automated SKU separation was added to Workpad.',
        'Support an operation that grew from approximately 3,000-3,500 daily orders at launch to about 11,000 typical daily orders across roughly 10 client accounts; coordinate a high-volume account and surface inventory and order risks.',
        'Implemented an AI-assisted Gmail, Google Sheets, and Apps Script workflow that classifies account communications, records inbound and outbound information, and distributes a daily operational summary.',
        'Built a scanner-based returns workflow that uses tracking and lot inputs to populate SKU and expiration data, reducing repetitive manual entry.'
    ]),
    role('QA Engineer', 'Studio Sai', 'Remote from South Korea', 'Dec 2021 - May 2024', [
        'Supported development and PlayStation release quality for <i>Eternights</i> through gameplay, functional, regression, localization, and release-focused testing.',
        'Authored reproducible defect reports, validated fixes, reviewed results, and collaborated with developers to identify regressions and clarify expected behavior.',
        'Reduced a recurring regression workflow from approximately eight hours to four by using developer-provided save states and checkpoints while preserving validation coverage.',
        'Used Unity Test Framework features in the existing environment for UI-focused automated validation alongside manual and regression testing.'
    ]),
    PageBreak(), sec('Professional Experience Continued'),
    role('Database Manager', 'GPS Logix', 'Carson, CA', 'Jun 2016 - Nov 2021', [
        'Analyzed a recurring Coupang order workflow and built Python/openpyxl automation to map, normalize, validate, and prepare marketplace data for the GPS shipping-system upload format.',
        'Reduced approximate daily preparation time from three hours to 30 minutes while retaining human review and final system-upload control.',
        'Validated customs and contact fields, normalized postal and product data, handled options and bundle quantities, and separated incomplete or suspicious records for manual review.',
        'Identified recurring address and customs-document risks and helped strengthen pre-shipment validation requirements before international shipping.'
    ]),
    role('Owner - Operations & Systems (Part-time)', 'LAYRD', 'Los Angeles, CA', 'Jul 2025 - Present', [
        'Own and co-operate a Shopify-based home and tableware business, with responsibility for storefront systems, fulfillment support, shipping labels, returns, financial records, and business administration.',
        'Configure and troubleshoot the custom domain, storefront connections, shipping setup, and customer-facing functionality; share fulfillment and take primary ownership of returns processing.',
        'Maintain transaction and expense records for CPA review and independently completed the LAYRD trademark process through registration using AI-assisted research.',
        'Support local sales through consignment at CLAEDO in ROW DTLA and a display, consignment, and customer-pickup partnership with Baking Room.'
    ]),
    sec('Selected Projects'),
    Paragraph(f'<b>Remembering Young Hoon - Independent Cloud Project:</b> Planned and delivered a bilingual memorial archive with reviewed submissions, role-based administration, private media storage, and asynchronous AWS image processing. Independently owned feature decisions, AWS setup, validation, and deployment using AI-assisted development. <a color="{link}" href="https://sj-personalportfolio.netlify.app/case-studies/remembering-young-hoon">Case Study</a>', body),
    Paragraph(f'<b>Coupang Order Automation:</b> Python/openpyxl pipeline for mapping marketplace orders, validating critical fields, flagging exceptions, and generating upload-ready shipping data. <a color="{link}" href="https://github.com/SungJung0616">GitHub</a>', body),
    Paragraph(f'<b>Career Portfolio and Case Studies:</b> React and Three.js portfolio documenting verified QA, automation, operations, and end-to-end project ownership. <a color="{link}" href="https://sj-personalportfolio.netlify.app/">Portfolio</a>', body),
    sec('Education & Certifications'),
    Paragraph('<b>Education:</b> B.S. in Computer Science, California State University, Northridge<br/><b>Certifications:</b> ISTQB Certified Tester - Foundation Level; ISTQB Agile Tester; Microsoft Office Specialist', body)
]

OUT.parent.mkdir(parents=True, exist_ok=True)
SimpleDocTemplate(str(OUT), pagesize=letter, rightMargin=.58*inch, leftMargin=.58*inch, topMargin=.45*inch, bottomMargin=.48*inch, title='Sung Jung Resume', author='Sung Jung').build(story, onFirstPage=footer, onLaterPages=footer)
print(OUT)
