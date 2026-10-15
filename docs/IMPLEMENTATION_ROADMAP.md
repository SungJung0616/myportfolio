# Portfolio 2.0 — Implementation Roadmap

2026-10-15 · **계획만 / 코드 변경 승인 대기**

제품 결정: [PORTFOLIO_VISION.md](PORTFOLIO_VISION.md). 표현 원칙: [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md). 상세 Blueprint와 전체 Audit은 로컬 보존 자료로 이 최소 공개 패키지에서는 제외한다. 이 로드맵은 계획 당시 기록이며 이후 Hero CTA 구현 증거는 docs/qa/hero에 있다.

## 1. Confirmed — 보존과 승인 경계

이번 작업은 위 문서 3개 신규 생성만 한다. 기존 파일, AGENTS.md, 운영 React 앱, 승인 Preview, geometry/camera, 캐릭터 실험, Film Room media/interaction, CareerOS 사실은 수정하지 않는다. build·deploy·push·commit도 하지 않는다.

이후 구현은 별도 승인 후 새 sibling Preview 후보에서만 진행한다. 기존 폴더를 active source라고 간주해 덮어쓰지 않는다. draft 배포도 해당 단계 승인이 필요하며 production 반영은 이 로드맵 범위 밖이다. 전체 프레임워크 교체·데이터 통합 리팩터링은 자동 승인되지 않는다.

## 2. Observed — 구현 기준과 매핑

기준 후보 `preview/v0304-playbook-story/`는 standalone ES modules/Three.js이며 React `src/`와 별개다. 아래 파일은 후보 안의 상대 경로다.

| 비전 역할 | 현재 파일/컴포넌트 | 향후 범위 |
| --- | --- | --- |
| Who I Am | `hero.js/css` | HTML 문구/편집 위계. `applyHero` 카메라 보존 |
| What Shaped My Thinking | `career-data.js`, `exterior.js` 패널 | 기존 사실+확인된 회고. 패널 geometry 유지 |
| How I Solve Problems | `playbook-story.js/css`, `project-data.js`, `project-space.js` | 짧은 한 사례 전후 표현 |
| What Changed | `project-space.js`, `playbook-story.js` | 같은 사례명·근사치·검수 유지·Work 연결 |
| Solutions in Action | `film.js/css`, `film-data.js` | 현행 미디어/재생 보존, 정확한 분류 |
| Work / Archive / Stack / Contact | `navigation.js/css`, `navigation-data.js`, `ui.js/css` | editorial HTML과 사례 링크, 기존 필터/복사 유지 |
| 기존 사례 사실 | `src/components/Work.js`, `GPSOrderAutomation.js`, `GPSOperationsCaseStudy.js`, 기타 사례 | 참조용. 운영 소스 수정은 별도 승인 |
| 보호 대상 | `spatial-data.js`, `exterior.js` scene/rail, 캐릭터/미디어, weather/lighting | 형상·좌표·카메라 동작·자산 변경 없음 |

최신 `docs/v03.04/playbook-three-frame.html`은 시안이지 구현된 경기장 상태가 아니다. 운영 배포와 로컬 commit 일치 여부는 Unknown이다.

## 3. 현재 구현과의 충돌

| Observed gap | Proposed 대응 |
| --- | --- |
| Hero는 “I turn complex operations into practical systems.” | 새 핵심 문구로 교체할 후보만 제작 |
| Order Prep 사례 제목은 숫자를 먼저 강조 | 문제·영향·판단을 먼저, 숫자는 범위 있는 결과로 |
| Playbook 탭/단계/근거가 복잡하고 같은 사례의 Scoreboard 연결 약함 | 기존 3컷 방향을 단일 수동 이야기로 연결 |
| 현재 Work의 GPS 카드가 과거 데이터 업무와 현재 물류 역할을 묶음 | 사례 ID/기간/상태를 분리해 end-to-end 완료 오인 방지 |
| Film Room의 2개 학습 프로젝트와 전문 업무 사례는 별개 | 학습 분류 유지. 없는 전문 업무 실행 증거를 만들지 않음 |
| Preview 데이터는 React snapshot, 자동 동기화 없음 | 새 후보에서 확인된 내용만 편집. 전면 공통화는 별도 제안 |
| Hero 문구와 camera, 판 텍스처와 film geometry가 같은 파일에 있음 | 수정 블록 제한, 보호 코드 비교와 실제 camera pose 검사 |
| 혼합 언어·여러 CSS override | 범위별 영어 inventory와 scoped 스타일 검수 |
| 오래된 문서마다 “latest/current” 표현 존재 | 날짜/후보 경로 확인. 새 문서를 계획으로 읽고 과거 상태를 삭제하지 않음 |

## 4. 증거 확보 목록 — 구현과 분리

| 항목 | 현재 재사용 가능 | Open / Unknown |
| --- | --- | --- |
| 주문 준비 | 기존 사례의 매핑·검증·예외·사람 검수 설명 | 실제 전후 샘플, 실행 로그, 도구 선택 이유, 최초 도입 범위 |
| 시간 결과 | 기록된 근사치 ~3h → ~30m | 측정 기간·표본·작업량·포함 범위의 상세 기록 |
| 창고 점진 개선 | Excel grouping/작업지시/AcrossB 협업 기록 | 현재 진행 중인 연결 단계와 미래 계획, 기준일 |
| 사람/협업 | QA 개발자 협업, AcrossB 역할 경계 | 인터뷰·교육·합의·인수인계의 구체 사례 |
| 공개 자료 | 기존 공개 링크와 설명 | 공개 코드가 당시 운영 버전과 어떤 관계인지, 샘플 공개 허가 |

회사 데이터·내부 스크린샷·고객 정보·credentials는 수집한 그대로 공개하지 않는다. synthetic sample은 별도 승인 후 illustrative로 표시할 수 있지만 실증 자료로 계산하지 않는다. 3PL 처리량을 주문 자동화 단독 성과로 연결하지 않는다. CareerOS 원문은 이번 작업에서 새로 검증하거나 변경하지 않았다.

## 5. Proposed — 승인 기반 순서

| 단계 | 산출물 | 통과 조건 |
| --- | --- | --- |
| 0 현재 | 비전/디자인/로드맵 문서 | 사용자 검토. 코드 변경 없음 |
| 1 콘텐츠 정렬 | 주문 준비 1개 사례의 9항목 초안, claim/source/status 표 | 근거 없는 판단·역할·결과 제외; 공개 범위 확인 |
| 2 첫 구현 후보 | 새 sibling의 Hero 정적 문구 + 한 Work 사례 editorial 요약 | geometry/카메라/Film 보존, desktop/390px 읽기 확인 |
| 3 이야기 연결 | Before/After → 기존 Results → 해당 Work | 동일 사례 ID, 사람 검수 유지, focus/복귀 정상 |
| 4 점진 확장 | Career Walk/Stack/Contact, 다음 사례 한 개씩 | 각 사례 상태·협업·근거 승인 후 반영 |
| 5 회귀 검수 | 영어 UI, keyboard/reduced motion, 실제 캡처·짧은 영상 | 기존 동선/미디어/날씨/일반 콘텐츠 기능 보존 |
| 6 별도 배포 승인 | 명시적 allowlist의 새로운 draft Preview | 승인 snapshot/production 그대로, 민감 정보 제외 |

완료 여부는 새로 구현한 범위에만 적용한다. 음성/립싱크/Realtime, 추가 캐릭터·공 물리, 새로운 경기장 공간, 전체 archive 미디어 제작은 이번 서사 변경에 포함하지 않는다.

## 6. Proposed first implementation task

**P2-01 — Isolated Editorial Entry** (아직 시작하지 않음)

선행 조건: 이 문서 세트와 Gate 1의 한 사례 콘텐츠 승인.

- 새로운 sibling 후보를 만들고 기준 폴더·보호 자산의 hash를 기록한다.
- Hero에 지정된 headline/philosophy/description을 적용한다. 카메라 위치·FOV·scroll weight는 유지한다.
- 하단 Work의 주문 준비 사례에 문제·역할·사람 검수·근사치·근거 한계를 담은 읽기 쉬운 요약을 연결한다. 9개 항목의 미확인 사실은 창작하지 않는다.
- 기존 nav 목적지/기능을 유지하고 정확한 사례 anchor의 동작과 focus를 확인한다.
- 이 단계에서는 Playbook 상태 머신, Scoreboard 디자인, 다른 사례, Film Room을 수정하지 않는다.
- 로컬 캡처로 검수한다. 별도 요청 없이 배포하지 않는다.

검증: desktop/390px, keyboard, reduced motion, Hero 이후 기존 동선, Film Room 선택·재생·복귀, 보호 파일 비교. 같은 파일의 문구만 바뀌면 scene/camera 코드 블록과 runtime pose를 비교한다. 기존 테스트 도구의 기본 출력 경로가 승인 snapshot을 덮어쓰지 않도록 새 검수 폴더를 사용한다.

## 7. 검토 기록과 현재 중단 지점

기존 AGENTS.md, 감사, Blueprint, v2/v03.04 설계 기록, career-walk 설계, 실제 React routes/주문·3PL 사례와 Preview Hero/navigation 스타일을 대조했다. 기존 문서 세트와 요청한 세 파일의 중복을 확인한 뒤 신규 생성했다. 기존 사실·문서를 새로 덮어쓰지 않았다.

제품 방향은 사용자 지정으로 Confirmed, 상세 typography/데이터 모델/구현 단계는 Proposed다. 과거 Blueprint는 자세한 근거 지도이며, 이 로드맵이 더 작은 첫 구현 범위를 제안한다. 아직 UI에 적용됐다는 의미는 아니다.

**여기서 중단한다. 다음 작업은 사용자 승인 후에만 진행한다.**
