# Portfolio 2.0 — Product Vision

2026-10-15 · America/Los_Angeles · Documentation only

## 문서 역할과 상태

- **Confirmed:** 이번 사용자 요청으로 확정된 제품 방향. 구현 완료를 뜻하지 않는다.
- **Observed:** 현재 코드/기록에서 확인한 상태. 외부 사업 성과의 독립 검증과 다르다.
- **Proposed:** 향후 검토·승인할 편집/구현 방식.
- **Open / Unknown:** 자료 또는 결정이 부족한 항목.

이 문서는 제품 목적과 콘텐츠 원칙을 담당한다. 표현 기준은 [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md), 단계·승인 기준은 [IMPLEMENTATION_ROADMAP.md](IMPLEMENTATION_ROADMAP.md)에 둔다. 상세 Blueprint와 전체 Audit은 로컬 보존 자료이며 이 최소 공개 패키지에는 포함하지 않는다. 원본 문서는 보존한다.

새 문서 세트는 앞으로의 Portfolio 2.0 방향을 정리한다. 과거 문서의 영화적/캐릭터 중심 실험을 재개하라는 뜻이 아니며 AGENTS.md를 수정하거나 사실 검증 규칙을 대체하지 않는다. Portfolio 2.0은 제품 방향 이름이다. 과거 `PORTFOLIO-V2.md`의 Career Scoreboard 릴리스와 동일한 버전으로 취급하지 않는다.

## Confirmed — 목적과 핵심 문구

Sung Jung이 문제를 발견하고, 사람과 업무를 이해하며, 협업을 통해 실용적인 개선을 만드는 방식을 보여주는 포트폴리오다. 단순한 개발 기술 목록이나 농구 인터랙티브 사이트가 아니다.

**I Make Complex Work Feel Simple.**

**Make the Next Play Easier.**

“I find friction, connect people and systems, and build practical solutions that make everyday work easier.”

농구 경기장은 팀워크·문제 해결·소통·다른 사람의 다음 행동을 쉽게 만드는 기회를 상징한다. 3D는 관심을 끌고, 읽기 쉬운 편집 콘텐츠와 근거가 전문성을 증명한다. 기존 professional 70 / personality 30 원칙과 양립한다.

## Confirmed — 문제 해결 프레임

1. **Listen & Observe:** 영향을 받는 사람과 실제 업무를 이해한다.
2. **Find the Bottleneck:** 반복·혼선·대기·예외가 모이는 지점을 찾는다.
3. **Start Small:** 현장에서 검증할 수 있는 작은 개선으로 시작한다.
4. **Test & Learn:** 출력과 실제 사용을 확인하고 예외를 배운다.
5. **Connect & Scale:** 사람·도구·업무 사이 연결을 점진적으로 확장한다.

자동화 자체가 목표는 아니다. 동료의 반복 업무와 혼선을 줄이는 것이 목표다. 이 프레임은 새 자기소개 원칙이며 모든 과거 사례가 동일한 순서로 수행됐다는 증거는 아니다. 인터뷰·파일럿·무중단 도입·교육·성공률을 확인 없이 추가하지 않는다.

창고 개선은 작은 변경과 실제 운영 검증을 연결하는 점진적 활동으로 표현한다. 계획 중인 end-to-end 자동화가 이미 완료됐다고 표현하지 않는다. 과거 Coupang 파일 준비 자동화와 현재 3PL/SKU 개선은 관련 경험이지만 **서로 다른 역할·기간·시스템 범위**다.

## Confirmed — 기존 공간의 서사 역할

| 기존 섹션 | 서사 역할 | 방문자가 이해할 내용 |
| --- | --- | --- |
| Hero | Who I Am | 복잡한 일을 사람에게 쉽게 만드는 실용적 문제 해결자 |
| Career Walk | What Shaped My Thinking | 운영·QA·협업 경험이 사고방식에 준 영향 |
| Playbook | How I Solve Problems | 무엇을 관찰하고 왜 그 변경을 선택했는가 |
| Scoreboard | What Changed | 무엇의 결과인지, 범위와 조건은 무엇인가 |
| Film Room | Solutions in Action | 실제 결과물의 동작과 현재 완성 범위 |
| Work | Problems I've Solved / Things I've Built | 문제·역할·판단·검증·배움을 깊게 읽기 |
| Stack | Tools I Chose and Why | 도구를 어떤 문제에 어떤 범위로 사용했는가 |
| Contact | Let's Make the Next Play Easier | 협업과 다음 기회 |

기존 Archive와 필터/작업 유형도 보존한다. 위 문구는 서사 역할이며 현재 메뉴를 모두 긴 문장으로 바꾸라는 지시가 아니다. 9개 navigation 목적지와 기존 scene 순서는 유지한다.

## Confirmed — 사례 콘텐츠 계약

각 사례는 The Problem / Why It Mattered / My Role / My Approach / Tools & Technical Decisions / Challenges & Exceptions / Outcome / Evidence / Lessons Learned를 포함한다. 하나의 큰 요약과 단계별 본문으로 묶을 수 있으며 9개 탭을 의무적으로 만들지 않는다.

각 주장의 상태를 구분한다:

- **Verified result:** 확인된 출처·범위·기준일을 가진 결과. 단순히 기존 사이트에 쓰여 있다는 이유만으로 검증 완료로 승격하지 않는다.
- **Ongoing initiative:** 이미 작동하는 부분과 진행 중인 개선을 분리한다.
- **Future plan:** 계획만 존재. 성과·완료 표시를 붙이지 않는다.
- **Unknown:** 자료 미확인. 단정 대신 검수 목록으로 관리한다.

기록된 ~3h → ~30m 같은 값은 근사치와 측정 대상을 보존한다. 팀의 처리량을 개인의 단독 성과로 바꾸지 않는다. 공개 예제 코드·설명용 도식·실제 실행 영상·측정 기록은 서로 다른 증거다.

## Observed — 재사용할 근거와 한계

- `GPSOrderAutomation.js`: 수작업 분석, Python/openpyxl 변환·검증, 예외 분리, 기존 프로세스 대비 테스트, 사람의 최종 검수. 현재 설명은 결과 숫자를 제목으로 앞세운다.
- `GPSOperationsCaseStudy.js`: Excel SKU grouping → 작업지시 양식 → 현장 요구 정의 → AcrossB 개발팀 협업. Workpad 구현 소유권과 팀 물류 성과 경계를 명시한다.
- `EternightsCaseStudy.js`: 개발자 제공 checkpoint, 재현 보고, 수정 검증. QA 경험은 새 비전에서도 축소하지 않는다.
- `LayrdCaseStudy.js`, `MemorialCaseStudy.js`: 파트너 분담 또는 AI-assisted delivery를 보존한다.
- `MarketIntelligenceCaseStudy.js`: In progress 상태를 유지한다.
- 현재 Film Room의 SungFlix/Dice는 학습 프로젝트다. 주문 자동화의 실행 증거로 제시하지 않는다.

## Open — 확인할 정보

사례별 도구 선택 이유, 구체적 관찰·협의 방법, 처음 도입한 범위, 운영 중단 방지 방법, 실제 테스트/측정 자료, 공개 가능한 샘플, 최신 진행 상태와 후속 계획의 경계가 필요하다. CareerOS 사실은 이번에 새로 수정하거나 재검증하지 않았다. 사용자 제공 제품 철학과 개별 사업 사실의 증거는 구분한다.

## Proposed — 성공 판정

방문자가 한 사례를 본 뒤 문제·영향받는 사람·Sung의 역할·선택 이유·남겨 둔 사람의 판단·결과를 자기 말로 설명할 수 있는지 검수한다. 특정 전환율·채용 효과 목표는 근거가 없어 설정하지 않았다. 구현 승인과 사용자 검수 전에는 이 비전이 적용됐다고 보고하지 않는다.
