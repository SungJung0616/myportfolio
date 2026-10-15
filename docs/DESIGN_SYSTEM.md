# Portfolio 2.0 — Hybrid Editorial Design System

2026-10-15 · Documentation only · UI 적용 없음

상태 용어는 [PORTFOLIO_VISION.md](PORTFOLIO_VISION.md)의 Confirmed / Observed / Proposed / Open을 따른다. 제품 목적은 그 문서에서, 일정과 승인 경계는 [IMPLEMENTATION_ROADMAP.md](IMPLEMENTATION_ROADMAP.md)에서 관리한다. 이 문서는 새 CSS 패키지나 이미 구현된 token system을 뜻하지 않는다.

## Confirmed — 미술과 편집의 분업

**Portfolio 2.0 — Hybrid Editorial**

- 기존 몰입형 카툰 농구 경기장과 geometry, 조명 환경, 캐릭터, camera rail을 보존한다.
- 정돈된 타이포그래피, 여백, 사례 이야기와 기술 도식으로 전문성을 보여준다.
- 공간의 귀여움은 유지하되 읽기 UI를 장난감처럼 꾸미지 않는다.
- 효과보다 이해·탐색·접근성을 우선한다. 콘텐츠를 보기 위해 긴 연출을 기다리게 하지 않는다.
- 긴 설명은 HTML로 제공한다. 3D 면의 작은 글씨에 근거 전체를 넣지 않는다.

## Observed — 현재 스타일과 적용 지점

기준 구현은 `preview/v0304-playbook-story/`이다. `hero.css`, `navigation.css`, `playbook-story.css`, `film.css`, `ui.css`, `exterior.css`가 누적 적용된다. `hero.js`는 제목뿐 아니라 첫 구간 카메라도 소유한다.

Preview는 Segoe UI/Arial 계열과 시간 표시용 monospace를 사용한다. 운영 React 앱의 `src/App.css`, `CourtV2.css`, `PlayerDashboard.css`에는 DM Sans/Space Grotesk 및 역사적 override가 있다. 두 환경을 하나의 통합 디자인 시스템으로 구현한 상태가 아니다.

기존 감사에서 확인된 Preview palette 후보: ink `#34243f`, purple `#68418b`, ivory `#f8f5ee`, pale purple `#e8dfed`, border `#d5c8df`, review gold `#f1e3bd`. 이 값들은 기존 표현의 참고값이며 새 전역 token으로 배포되지 않았다. 배경별 실제 contrast는 구현 시 검증해야 한다.

## Proposed — 편집 기준 (구현 전 검수)

| 항목 | 제안 | 경계 |
| --- | --- | --- |
| 제목 | 명확한 sans-serif, headline이 먼저 읽히는 위계 | 신규 폰트 설치/교체는 미확정. 우선 현행 family 활용 |
| 본문 | 16–18px, line-height 약 1.5–1.7, 읽기 폭 약 60–75ch | 시작값이며 승인된 수치 아님. 모바일/zoom 검수 후 결정 |
| 메타데이터 | 역할·기간·상태·측정 범위를 짧게 구분 | 너무 작은 uppercase 글씨로 근거를 숨기지 않음 |
| 여백 | 8px 기반 spacing 후보, 큰 섹션 구분과 작은 관련 정보 묶기 | 경기장 치수/스크롤 길이를 바꾸는 기준 아님 |
| 색상 | ivory 읽기 면 + purple 핵심 행동 + 제한된 gold 강조 | 자동화/사람 구분은 텍스트·기호도 함께 제공 |
| 컴포넌트 | 한 장면에 주 행동 하나, 보조 링크는 낮은 위계 | 기존 Film Room controls/interaction은 보존 |
| 상태 | Completed / In progress / Planned와 날짜·범위 | 색만으로 상태를 구분하지 않음. Unknown을 완료로 보이지 않게 함 |
| 도식 | 동일 입력·출력으로 중간 변경만 비교 | 설명용과 실제 실행을 명시적으로 구분 |

## 섹션별 표현 규칙

- **Hero — Confirmed:** 새 headline, philosophy, supporting statement. **Proposed:** 기존 왼쪽 HTML 영역에서 위계를 잡고 camera 값은 고정. 문구가 길면 글자/줄바꿈을 검수하며 장면을 이동시키지 않는다.
- **Career Walk — Confirmed:** 경험이 사고방식에 준 영향. 기존 액자/클릭 상세 유지. **Proposed:** 패널은 한 문장, 구체 협업·배움은 상세 본문에 둔다. 새 회고는 사실 확인 후 작성.
- **Playbook — Proposed:** 기존 3컷 시안 기반 짧은 전후 이야기. 반복 작업은 자동화, 확인 필요 항목은 사람에게 남는 모습. 5단계 철학을 5개 추가 탭으로 만들지 않는다.
- **Scoreboard — Confirmed:** 무엇이 달라졌는지 보여주는 결과. **Proposed:** 같은 사례명, 근사치, Daily preparation time, Final review retained. 근거는 Work로 연결. geometry를 유지하며 텍스처/HTML 정보만 편집.
- **Film Room — Confirmed:** 기존 포스터·스크린·재생·복귀 보존. 미디어 종류와 프로젝트 상태를 정확히 표시한다. 새로운 자동화 demo가 있는 것처럼 연출하지 않는다.
- **Work — Confirmed:** 9개 사례 항목 포함. **Proposed:** 문제와 역할 요약 → 접근과 결정 → 결과/증거 → 배움의 읽기 흐름. 9개 동일 상자 대신 editorial 계층 사용.
- **Stack — Proposed:** 문제/사용 목적/관련 사례를 도구와 연결. 사용 사실과 선택 이유를 구분하고 근거 없는 숙련도 점수는 넣지 않는다.
- **Contact — Confirmed:** 협업 중심. 기존 연락처·링크 유지. 채용 가능 일정이나 업무 범위를 추측하지 않는다.

## Confirmed 유지 원칙 / Proposed 검수 기준

기존 공개 UI 영어 통일 방향을 유지하고 내부 개발 문서는 한국어로 작성 가능하다. 짧고 자연스러운 문구를 사용하며 canvas, DOM, aria, 오류·날씨 안내도 검수 대상으로 잡는다. 현재는 혼합 언어가 남아 있다.

모션은 이해를 보조한다. 사용자 선택으로 이야기 단계가 바뀌며, 효과 때문에 읽기가 지연되지 않아야 한다. 기존 reduced-motion, 직접 이동 메뉴, keyboard focus, 미디어 사용자 재생 정책을 보존한다. 전환 길이와 easing은 아직 미확정이며 새 애니메이션 라이브러리는 필요성이 확인되지 않았다.

검수 제안: 일반 본문 contrast 4.5:1, 큰 글자 3:1을 목표로 측정; 보이는 focus; 약 44px 조작 영역; 390px/desktop와 200% zoom에서 잘림·가로 넘침 확인. 이는 완료된 접근성 인증이 아니다. 모바일은 읽기 순서와 기존 카메라 동선을 유지하며 화면에 모든 설명을 동시에 압축하지 않는다.

## Open / 금지하는 해석

- 최종 editorial font pairing, 정확한 type scale, spacing/token 이름은 승인 전이다.
- 새 미술 방향을 핑계로 카툰 경기장을 실사/네온/미니게임 HUD로 바꾸지 않는다.
- 역사적 `PORTFOLIO-V2.md`의 어두운 scoreboard 스타일이나 폐기된 cinematic 방향을 전체 사이트에 다시 적용하지 않는다.
- 기존 CSS에 전역 `button/nav/footer` override를 추가하지 않는다. 향후 후보에서 scoped 스타일로 검수하는 방식을 제안한다.
- 현재 viewport·성능·접근성 전체 검증은 이번 문서 작업에서 수행하지 않았다.
