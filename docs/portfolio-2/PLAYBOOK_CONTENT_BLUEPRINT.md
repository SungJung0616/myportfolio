# P2-03 — Playbook Content Blueprint

2026-10-15 · P2-03A 제안, 구현 아님. 사실 분류와 고정 링크는 [CLAIMS_AND_EVIDENCE.md](CLAIMS_AND_EVIDENCE.md). 기존 Hero/카메라/Film Room/운영 앱 보존.

## 경험의 핵심

“Small Tools. Measurable Impact.”를 Playbook의 편집 제목으로 제안한다. “Make the Next Play Easier.”는 두 도구를 묶는 철학이다. 농구공은 데이터 전달, 선수는 실제 역할/컴포넌트다. 슛 성공이 아니라 **검수 가능한 전달**이 장면의 완성이다. 공이 움직인다고 실데이터가 처리되는 것처럼 표현하지 않는다.

두 사례는 독립적이다. A는 숙련자 의존 입력을 더 쉽게 위임하는 이야기, B는 빠른 탐색에 보수적 선택 조건을 붙이는 이야기다. 동일한 카드를 제목만 바꿔 복제하지 않는다.

## 최종 IA 제안

기존 Hero CTA → Playbook stop p=.83 → 짧은 사례 선택/설명 → “Explore this play” → SVG/HTML coaching-board dialog.

1. 프로젝트 선택: “Label Helper” / “QR Helper” (수동 전환).
2. 세 상위 stage: “Spot the Friction” / “Design the Play” / “Measure the Impact”.
3. stage 안에는 1~4개의 작은 step. 한 번에 핵심 문장 하나, court 하나, 다음 행동 하나.
4. “Previous”, “Next Play”, “Replay”, “Read the project”, “Back to the court”.
5. 근거는 접을 수 있는 “Evidence & limits”, 상세는 Work의 Things I've Built로 연결.

기존 Coupang 사례는 삭제하지 않고 Work에 보존한다. 이번 두 확장의 성과를 기존 ~3h→~30m에 합치지 않는다. 현 3D Scoreboard는 Coupang 전용이므로 새 사례의 완료 CTA가 그 화면으로 이동하면 잘못된 결과가 보인다. P2-03에서는 **SVG board 안의 사례별 impact panel**을 먼저 사용하고, 기존 Results destination은 그대로 둔다. 3D scoreboard 내용 연동은 별도 승인 항목이다.

## A — AcrossB Label Helper

### Stage 1: Spot the Friction (사용자 보고)

Title: “Make label preparation easier to hand off.”

Copy: “Experienced managers repeatedly typed batch details into a label worksheet. Each transfer created another chance for an error.”

Annotation: “Repeated typing. Expert-dependent handoffs.”

시각: 동일한 가짜 batch data가 worksheet로 수동 전달. 오류 아이콘은 실제 빈도를 시뮬레이션하지 않고 “Illustrative friction” 라벨. 국적/언어별 능력 우열을 암시하는 캐릭터는 쓰지 않는다.

### Stage 2: Design the Play (코드 S + 판단 표현 P)

1. “Start with the batches the associate selects.” — 표시된 JOB_READY 체크 행만.
2. “Prepare the label inputs from the displayed data.” — code/count/SKU 입력 계획. 단일 batch를 기본 스토리로 하여 다중 호환성 검증을 암시하지 않음.
3. “Enter the values through the browser—not a Sheets API.” — browser keyboard/mouse route. 날짜·번호·channel·count·SKU input 표시.
4. “Keep the final label check with people.” — “Input actions finished” 표시 후 associate로 공을 넘김. 저장/QR이 검증됐다는 green check 금지.

Decision line: “Reduce repeated typing. Keep people in control of the label.”

Evidence note: “The public configurable edition has not been independently validated against a live warehouse or sheet.”

확인 가능한 선택 근거: 별도 API 연동 대신 이미 사용하는 browser UI에 입력하는 구조, 언어 선택으로 접근성 개선. 당시 API를 선택하지 않은 정확한 조직적 이유/권한 정책은 Unknown이므로 단정하지 않는다.

### Stage 3: Measure the Impact (U/C)

Headline: “~90% Fewer Data Entry Errors”

Metric: “Batch Data Entry Errors”

Values: “~15 → 1–2 errors per ~150 batches”

Copy: “Sung reports fewer typing mistakes and easier delegation to frontline associates, including Spanish-speaking staff.”

Footnote: “User-reported operational observation. Reduction calculated as 86.7%–93.3%; not independently audited.”

Human boundary: “Review the completed label before printing.”

CTA: “Read the Label Helper project”. 입력 오류 수가 고유 오류 배치 수와 같다고 해석하지 않도록 상세에 설명.

## B — AcrossB Flow QR Helper

### Stage 1: Spot the Friction (U)

Title: “Find the right batch before taking the next step.”

Copy: “Staff searched for batch numbers and checked the work record manually. The task needed speed—and care.”

Annotation: “Find the batch. Verify the record.”

같은 번호/다른 날짜 fixture 2개를 보여줘 단순 검색만으로 부족한 이유를 드러낸다. 실제 재고 손실 사건을 만들어내지 않는다.

### Stage 2: Design the Play (S)

1. “Read the batch identifier.” — QR typed/scanned text. 월·일·배치; QR에 연도 없음.
2. “Require one exact match in a complete, stable list.” — row count/structure/date-number match, 재검사 후 단일성.
3. “Preview first. Select only in live mode.” — dry-run은 checkbox 미변경. 사람의 모드 선택을 별도 작은 control로 표현.
4. “Stop when the match is unclear.” — 복수 일치/목록 불완전 분기를 반드시 한 번 볼 수 있게 한다. “Nothing selected. Review the list.”

Decision line: “Make matching faster without guessing which row is right.”

Boundary: “The helper selects a row. It does not complete the job.”

### Stage 3: Measure the Impact (U/C)

Headline: “75% Less Time Finding the Right Batch”

Metric: “Batch Identification & Verification Time”

Values: “~20 min → ~5 min”

Footnote: “Calculated from Sung’s user-reported representative task. Not an independently audited benchmark.”

Evidence note: “Repository report: 19 fake-DOM tests passed. Live operational checkbox behavior and physical scanners were not validated in that report.”

CTA: “Read the QR Helper project”. 결과의 원인은 QR만이 아니라 식별/확인 workflow이므로 scanner hardware throughput으로 해석 금지.

## 공통 copy와 콘텐츠 원칙

- Board badge: “Workflow illustration · not a live warehouse action”.
- Optional sandbox badge: “Simulation · fictional data · no live accounts”.
- “View source”, “Evidence & limits”, “How this was measured”.
- 기술 작동 사실과 실사용 성과를 색상뿐 아니라 텍스트 badge로 분리.
- 수치를 autoplay count-up 하지 않음. 사용자가 마지막 step을 선택하면 고정값이 나타남.
- 내 역할은 “Workflow analysis and practical browser tooling”로 제안하되 단독 저작/협업·AI-assisted 범위는 승인 전 확인. README의 코드 존재만으로 sole ownership을 주장하지 않는다.
- Listen & Observe → Find the Bottleneck → Start Small → Test & Learn → Connect & Scale은 해석 렌즈로 사용. 당시 인터뷰/파일럿/무중단 rollout을 했다고 임의로 추가하지 않는다.
