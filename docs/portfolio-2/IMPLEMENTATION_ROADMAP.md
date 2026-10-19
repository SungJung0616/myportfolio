# P2-03 — Approval-gated Implementation Roadmap

2026-10-15 / 제안. 현재 완료 범위는 P2-03A 조사와 문서 6종뿐이다. 앱 수정·commit·push·배포는 승인되지 않았다.

## 기준과 보존

격리 worktree `myportfolio-p2-collab`, branch `feature/portfolio-2-hybrid-editorial`, 기준 HEAD `9b03cb171c97f2024ed03d9cf505cf5182e2db99`. 활성 정적 후보는 `preview/v0304-p2-hero-cta/`; production React의 `src/`가 아니다. 기존 Draft PR #1과 승인 Preview는 그대로 둔다.

Hero 문구/CTA/레이아웃, 경기장 geometry, 캐릭터, camera rail·9개 목적지, 경력 터널, Film Room 미디어·행동, 날씨, React와 dependencies, Netlify/CSP는 변경 범위 밖이다. 이전 QA의 미추적 파일도 보존한다.

## 문서 관계

- [CLAIMS_AND_EVIDENCE.md](CLAIMS_AND_EVIDENCE.md): 사실·관찰·계산·미검증 경계, 원본 소스.
- [PLAYBOOK_CONTENT_BLUEPRINT.md](PLAYBOOK_CONTENT_BLUEPRINT.md): 영어 공개 문구와 이야기.
- [PLAYBOOK_INTERACTION_SPEC.md](PLAYBOOK_INTERACTION_SPEC.md): 상태·controls·통합 계약.
- [TACTICS_BOARD_STORYBOARD.md](TACTICS_BOARD_STORYBOARD.md): 각 선수/공의 의미와 위치.
- [PROJECT_CATALOG_DRAFT.md](PROJECT_CATALOG_DRAFT.md): 기술 갤러리와 상세 콘텐츠.

## 단계별 승인

| Milestone | 다음 승인 후 허용할 범위 | 예상 파일 / 완료 조건 |
| --- | --- | --- |
| P2-03A — 현재 | 조사·설계 | 이 폴더 문서 6종; 앱 변경 없음. 공개 주장과 통합 충돌을 사용자 검토. |
| P2-03B — 제안 | 정적 responsive 후보만 | 별도 후보의 `tactics-board.html/css`, `tactics-data.js` 등 신규 파일. 2사례×3단계 정지 화면, 1440/768/390 캡처. 기존 destination 연결 및 애니메이션 전 승인. |
| P2-03C — 제안 | 독립 SVG interaction 및 승인된 Playbook 연결 | 신규 `tactics-board.js`, `tactics-data.js`, scoped CSS; 최소 `playbook-story.js` entry adapter. 버튼/직접 단계/프로젝트 교체/축소 모션/텍스트 대안. geometry와 rail 수정 없이 `.dialog.open` 계약 보존. |
| P2-03D — 제안 | Work 내 Things I've Built 두 항목과 상세 | 신규 catalog module, 승인된 `navigation-data.js` 연결; 필요 시 `ui.js` 필터의 데이터 의존 수정. 원래 Archive 분류·프로젝트·Film Room은 유지. |
| P2-03E — 제안 | 통합 QA 및 승인된 hosted verification | tests/QA 문서·캡처·짧은 영상. 배포는 별도 명시적 승인 후만. PR commit/push도 자동 수행하지 않음. |

각 milestone은 결과 확인 후 다음 단계로 넘어간다. B가 승인되었다고 C–E까지 일괄 실행하지 않는다. 새 폴더명·패키징 방법은 구현 시 확정하되 승인 스냅샷 덮어쓰기를 피한다.

## 통합 전에 해결할 충돌

1. `project-space.js`가 board/score/Film Room geometry를 함께 소유한다. 기존 board click `open(0)`, score click `open(2)`를 새 사례 index로 오해하면 QR 결과로 잘못 연결된다. 의미 있는 adapter action으로 분리하는 최소 변경안을 검토한다. Film Room 코드는 변경하지 않는다.
2. 물리 board texture와 scoreboard는 기존 Coupang 사례다. A/B 새 자료와 섞지 않는다. P2-03B는 독립 SVG 후보; 통합 전 중립적인 entry 문구/texture 교체 허용 여부 또는 기존 사례 병존 방식을 결정한다. geometry 변경은 필요하지 않다.
3. `exterior.js`는 `projectSpace.dialog.open`을 사용해 이동 상태를 제어한다. 새 overlay가 이 계약을 무시하면 읽는 중 카메라가 움직인다. close·Escape·focus return과 기존 freeze 동작을 검사한다.
4. `navigation.js`의 기존 `window.navigatePortfolio`를 사용한다. 새 스크롤 엔진이나 camera position 변경은 금지한다. 프로젝트/단계 deep link는 초기 복원까지 테스트하기 전 지원한다고 선언하지 않는다.
5. `ui.js`의 광범위 dialog 처리와 타입/DOM순서 기반 Archive filter가 충돌할 수 있다. scoped selector와 소규모 adapter를 우선하고, 전면 refactor는 별도 제안한다.
6. 글로벌 CSS에 새 `button`, `svg`, `dialog` 규칙을 추가하지 않는다. `.p2-tactics` 아래 스타일과 state만 격리한다.

## 사실·자료 의존성

- 공개 사용 가능한 회사명·업무명·개인 역할 확정. CareerOS의 기존 경력 사실은 수정하지 않는다.
- A/B 성과는 사용자 보고다. 관찰 기간, 비교 조건, 오류 집계 방식, 책임 범위는 Unknown이며 Evidence에 공개한다.
- 코드로 구현은 확인되나 선택 이유·협업·점진 도입 과정은 사용자 답변을 받아야 한다. 회고를 만들어 쓰지 않는다.
- 두 public repo에 명시적 LICENSE가 확인되지 않았다. 공개 링크/분석과 코드 복제 권한을 구분한다. simulation은 독립 구현을 우선하고 재사용은 허락 확인 후.
- 운영 host·실제 SKU·직원/고객·시트 ID·비공개 화면을 옮기지 않는다. 기존 QR local demo를 Netlify에 그대로 올리지 않는다.
- Label 다중 배치 B4 문자열과 QR 단일 batch 공식은 호환되지 않을 수 있다. 두 도구의 end-to-end 연결은 구현 완료로 표현하지 않는다.

## 검증 계획 — 아직 실행하지 않음

### 콘텐츠

두 사례에 input/output·인간 역할·한계·성과 분류·근거 링크가 있는지 검사한다. 금지 문구: zero errors, inventory accuracy gain, automatic printing, autonomous warehouse, completed job. 역사적 테스트 결과를 이번 실행 결과로 표시하지 않는다.

### 브라우저와 접근성

1440×960, 768×1024, 390×844에서 각 사례 모든 stage를 확인한다. Playbook 진입→선택→Next/Previous/Replay→직접 단계→사례 교체→Work 상세→복귀를 검사한다. Enter/Space, tab 순서, Escape, visible focus, focus return, touch target, 200% zoom, reduced-motion 및 애니메이션 없는 텍스트 대안을 확인한다. 실기 iOS/Android 미실행 시 따로 표기한다.

### 회귀

기존 12 camera samples와 9 destinations를 기준 데이터와 비교한다. Hero 두 CTA, 모바일 메뉴, Film Room 진입/복귀, 날씨 failure fallback, 가로 overflow, console·network errors를 확인한다. geometry/rail/character 파일 hash와 git diff를 검사한다. 외부 날씨 실패와 새 코드 오류를 구분한다.

### 성능

새 라이브러리 없이 CSS/SVG/소규모 JS로 구현한다. 화면 밖일 때 반복 RAF/타이머가 없어야 한다. step 교체·close에서 animation cancel/cleanup을 검사한다. 기존 draw call 수를 새 목표치로 오해하지 않고 같은 장치·뷰포트·씬에서 전후 frame time과 long task를 비교한다. Three.js 장면이 원래 무거운 환경에서 원인 분리 없이 개선/악화를 주장하지 않는다.

### 보안·공개 검수

새 파일 allowlist, 운영 URL·토큰·local path·실제 주문 데이터 검색, 의존성/라이선스 기록, CSP 유지, synthetic data 표시를 확인한다. 캡처와 영상도 개인정보 검토 후 공개한다. build/test/deploy 성공은 각각 실제 실행 결과로만 보고한다.

## 다음 승인 요청

권장 다음 작업은 **P2-03B 정적 2사례×3단계 responsive 시안**이다. 라이브 앱 교체 없이 문구·선수 역할·인간 검수·모호한 매칭 중단을 먼저 검토한다. 기존 Coupang 물리 scoreboard 처리, 기본 사례, 공개 브랜드명/소유권 표현, 코드 재사용 권한은 C/D 이전에 확정한다.
