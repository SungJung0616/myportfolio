# P2-03A — Tactics Board Storyboard

상태: 설계 제안, 실행 화면이 아님. 동작은 업무를 설명하는 metaphor이며 실제 처리 데모가 아니다. 근거는 [CLAIMS_AND_EVIDENCE.md](CLAIMS_AND_EVIDENCE.md), 컨트롤은 [PLAYBOOK_INTERACTION_SPEC.md](PLAYBOOK_INTERACTION_SPEC.md) 참조.

## 공통 장면 규칙

English heading: **Small Tools. Measurable Impact.**

단계: **Spot the Friction → Design the Play → Measure the Impact**. 프로젝트를 바꿔도 같은 3단계 문법을 사용한다. 각 substep은 사용자가 Next Play로 진행한다. 긴 연속 자동재생은 없다. `Process illustration — not a live demo.`를 계속 표시한다.

좌표는 SVG 보드 안의 백분율 `(x,y)`이다. 데스크톱은 100×60 비율, 모바일은 60×100 비율의 별도 위치 데이터를 사용한다. 아래 좌표는 두 레이아웃 각각의 정규화 값이지 화면 픽셀이 아니다. 레이블은 HTML 범례로도 제공하여 작은 코트 안에 긴 설명을 넣지 않는다. 실선은 완료된 이동, 점선은 해당 단계의 데이터 경로, 정지 표식과 텍스트는 차단을 표시한다.

## A — Label Helper

공 = **Batch details**. 같은 입력을 준비하는 업무이며 최종 검수자는 사라지지 않는다.

| Marker | 역할 | Desktop Before → After | Mobile Before → After |
| --- | --- | --- | --- |
| A1 | Selected batch data | (12,40) → (12,40) | (25,12) → (25,12) |
| A2 | Manager / associate doing entry or review | (45,40) → (82,70) | (50,38) → (70,82) |
| A3 | Label worksheet | (82,40) → (82,40) | (50,65) → (50,65) |
| A4 | Label Helper | hidden → (45,40) | hidden → (50,38) |

A2의 표시는 Before `Manual entry`, After `Human review`로 바뀐다. 이는 동일 인물이 모든 업무를 수행했다는 인사 기록이 아니라 업무 역할의 재배치이다. 관리자에서 associate로 역할 확장이 가능해졌다는 설명은 사용자 보고로 구분한다. 모든 stage에서 역할 범례가 함께 바뀐다.

| Frame / 사용자 행동 | 선수·공·경로 | Annotation / 의미 |
| --- | --- | --- |
| A0 — 첫 화면 | A1→A2→A3 점선, 공 A1. 선수는 정지 | “The same details. Re-entered by hand.” |
| A1 — Next Play | A1→A2→A3를 하나의 필드 전달 예시로 이동. A2에 입력 표시 | “Repeated entry depended on experienced staff.” 사용자 보고. 실수 횟수를 공 애니메이션 개수로 재현하지 않음. |
| A2 — Design the Play | A2가 검수 위치로 이동, A4가 가운데 등장. 공을 A1로 되돌리는 것은 비교 리셋으로 명시 | “Let the helper handle repetitive entry.” |
| A3 — Next Play | A1→A4, 추출 및 계획 범례 | “Read selected batches and prepare template fields.” |
| A4 — Next Play | A4→A3, 브라우저 입력 표시 | “Enter the worksheet through browser controls.” Sheets API/동기화 아이콘 금지. |
| A5 — Next Play | A3→A2, 검수에서 공 정지 | “Keep final label review with people.” 자동 저장 검증·자동 인쇄 완료 표시 금지. |
| A6 — Measure the Impact | 마지막 상태를 유지하고 결과판 공개, 공 슛/득점 없음 | 아래 고정 지표 및 관찰 출처. |

결과판 영어:

> BATCH DATA ENTRY ERRORS\
> ~15 → 1–2\
> Per approximately 150 batches\
> ~90% fewer data-entry errors\
> User-reported operational observation. Not independently audited.

“Easier delegation and onboarding”은 작은 사용자 보고 설명이다. 오류 수와 오류 있는 배치 수는 동일하지 않다. 86.7–93.3% 계산 범위는 Evidence에서 제공한다. 최종 saved output 확인이 없는 구현 경계도 상세에서 유지한다.

## B — Flow QR Helper

공 = **Batch identifier**. QR 생성은 이 확장 바깥이므로 QR 출발점 앞에 자동 생성 선수를 추가하지 않는다.

| Marker | 역할 | Desktop Before → After | Mobile Before → After |
| --- | --- | --- | --- |
| B1 | QR / batch identifier | (12,40) → (12,40) | (25,10) → (25,10) |
| B2 | Staff searching / authorizing selection | (40,65) → (65,75) | (30,40) → (25,76) |
| B3 | Displayed work rows / exact target | (85,40) → (85,40) | (70,65) → (70,65) |
| B4 | QR Helper parser | hidden → (36,40) | hidden → (35,32) |
| B5 | Matching & validation | hidden → (62,40) | hidden → (65,48) |

B5는 별도 서버가 아니라 같은 확장의 논리 단계다. B3의 행 카드는 `Fictional row`로 표시하고 실제 운영 식별자·호스트를 쓰지 않는다.

| Frame / 사용자 행동 | 선수·공·경로 | Annotation / 의미 |
| --- | --- | --- |
| B0 — 첫 화면 | B2와 3개 작은 행 카드 사이 탐색 경로, 공 B2 | “Find the batch. Check the selection.” |
| B1 — Next Play | B2가 후보 사이를 짧게 살펴보고 목표에 정지. 잘못 선택하는 장면 없음 | “Manual searching took time.” 사용자 보고. |
| B2 — Design the Play | B4/B5 등장, B2는 승인 위치로 이동, 공 B1 | “Validate before selecting.” |
| B3 — Next Play | B1→B4→B5, 문법과 목록 체크 | “Parse the identifier. Check the displayed list.” |
| B4 — Next Play | B5→B3 점선만, 공은 B5 유지 | “Exactly one match. Dry run: no selection.” 자동 체크 금지. |
| B5 — Next Play | B2의 명시적 `Selection mode` 표시 후 B5→B3, 체크 하나 | “Select deliberately after validation.” 실제 시스템 요청 없이 설명만 수행. |
| B6 — Inspect safeguard (선택) | B5에서 두 후보로 짧은 점선 후 정지, 체크 없음 | “More than one match? Stop.” 미일치·불완전 목록도 정지 사유로 텍스트 제공. |
| B7 — Measure the Impact | 성공 예시의 종료 상태와 결과판, 완료/재고 조정 표시 없음 | 아래 지표, 해당 업무 범위를 명시. |

결과판 영어:

> BATCH IDENTIFICATION & VERIFICATION\
> ~20 MIN → ~5 MIN\
> 75% less time on a representative task\
> Validation before selection\
> User-reported operational observation. Not independently audited.

4×는 소요시간 비율이지 처리량 검증이 아니다. 혼동 방지를 위해 대표 화면에는 75%만 사용한다. “Job complete”, “Inventory reconciled”는 사용하지 않는다. Undo는 상세에서 제한 조건과 함께 설명하고 주 흐름을 늘리지 않는다.

## 한 전환의 타이밍

총 850ms 제안: 0–200ms 역할 위치 이동 → 200–350ms 현재 점선 표시 → 350–750ms 해당 경로로 공 이동 → 750–850ms 도착 강조. 설명 제목은 시작 때 갱신하고 결과 문장은 완료 때 확정한다. 여러 경유지를 갖는 단계는 같은 총시간을 과도하게 분할하지 말고 substep으로 나눈다. 보조 선수는 의미 있는 역할 변경 때만 움직인다.

빠른 Next는 진행 중 효과를 취소하고 요청한 논리 상태에 즉시 정착시킨다. Previous는 역방향 업무 실행을 표현하지 않고 이전 설명 상태로 복원한다. Replay는 현재 substep만 반복한다. reduced-motion/no-animation은 동일 최종 위치·경로·텍스트를 즉시 표시한다. 결과 숫자는 카운트업 없이 고정값이며 결과판만 짧게 나타난다.

## 3개 화면 크기

- 1440px: 좌측 설명 약 38%, 우측 코트 약 62%; 단계와 controls는 한눈에 확인.
- 768px: 설명 → 코트 → controls로 겹침 없는 compact stack. 본문을 억지로 두 열에 유지하지 않음.
- 390px: 세로 코트와 짧은 역할 번호, HTML 범례, 최소 44px 컨트롤. 핵심 설명 먼저, 근거는 펼치기. 가로 넘침 금지.

키보드/스크린리더에는 선수 좌표 대신 “Selected data moves to the helper; the worksheet still needs human review.” 같은 동등한 단계 설명을 제공한다. 모든 정보는 텍스트 전환만으로도 이해 가능해야 한다.

## 기존 경기장과의 경계

현재 3D 물리 전광판의 Coupang ~3h→~30m와 위 두 결과는 다른 사례다. 새 SVG 결과판을 먼저 사용하며, 기존 전광판에 두 도구의 성과를 임의 치환하지 않는다. 기존 `See the result` 이동/클릭 계약과 사례 구분은 구현 전 승인 항목이다. 새 코트·선수 모델·카메라·캐릭터 애니메이션은 만들지 않는다.
