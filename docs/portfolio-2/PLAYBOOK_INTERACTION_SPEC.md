# P2-03 — Interaction and Technical Spec

2026-10-15 · 전체 Proposed, 구현 승인 전. [스토리보드](TACTICS_BOARD_STORYBOARD.md), [근거](CLAIMS_AND_EVIDENCE.md).

## 미술 계획과 brief 대조

기존 warm ivory #f4f0e7, ink #34243f, purple #68418b, pale purple #e8dfed, muted gold #f1e3bd 유지. Segoe UI/sans-serif 그대로, 본문 16–18px, heading 28–40px, court label 최소 14px 목표. 신규 폰트/라이브러리 없음. text-left/court-right의 coaching spread; 별도 대시보드 widget 그리드나 KPI 카드 행을 만들지 않는다. 농구 형태는 데이터 전달의 순서만 설명하고 일반 본문은 편집적으로 읽히게 한다. 초기 검토에서 “여러 탭+KPI 카드” 대신 **사례 선택 2개+한 장면+한 문장**으로 제한했다.

## Option B 채택 제안 / Option A 보류

기존 Three.js 공간과 p=.83을 배경으로 native dialog 기반 독립 SVG/HTML board. world renderer나 3D 선수/공 추가 안 함. SVG는 같은 읽기 화면에서 텍스트/조작/반응형을 관리하고 테스트하기 쉽다. 반면 native Three.js 선수/route는 camera occlusion, raycast, label 가독성, 모바일 GPU 부담, 접근성 동등 대체가 추가되므로 P2-03 범위 밖.

## 기존 통합 지점 (Observed)

- `navigation.js`: 9 destinations와 `window.navigatePortfolio`, hash를 replaceState, p=.83 Playbook, .88 Results. 새 목적지/scroll engine 금지.
- `project-space.js`: geometry와 Film Room 생성, boardFace/score picking 및 `createPlaybookStory()` 계약. board click은 `open(0)`, score click은 `open(2)`.
- `playbook-story.js`: `#project-dialog`/`#project-body`, controls와 score evidence 버튼. 현재 Coupang 단일 case.
- `exterior.js`: `projectSpace.dialog.open`이면 진행 보간 정지. existing return `{dialog,open}` 계약을 보존해야 함.
- `navigation-data.js`: workHtml/7 archive/skills snapshot. `ui.js`는 archive 타입 prefix와 DOM 순서에 의존.
- `ui.js`: 모든 dialog의 open animation/focus 보강. 새 board animation과 충돌하지 않도록 한 책임으로 제한.

## 제안 모듈 (모두 미생성)

`playbook-cases.js`: case metadata/claims/steps, `tactics-board.js`: SVG 및 controls, `tactics-board.css`: .p2-tactics scope, `playbook-router.js`: 기존 dialog와 Work links adapter, `built-projects.js`: 상세 데이터/render. 기존 파일 내 geometry는 건드리지 않는다. 대형 store/GSAP/React 도입 안 함.

데이터 계약 예시:

```text
Case { id, title, evidenceIds, stages[], metric {label,before,after,unit,classification,footnote}, projectId }
Step { id, stage, heading, annotation, sourceIds[], players[], routes[], ball, branch, textAlternative }
Player { id, role:'person'|'system'|'data', label, shortLabel, positionDesktop:[x,y], positionMobile:[x,y] }
Route { id, from, to, points[], kind:'manual'|'browser-input'|'validated'|'blocked', evidenceIds[] }
State { caseId, stepId, branch:'normal'|'ambiguous', phase:'idle'|'moving'|'settled', reducedMotion, generation }
```

상태 소유자는 board 하나. source claims와 runtime state 분리. localStorage에 직원/scan payload 저장하지 않음. 전역은 기존 navigation bridge만 이용. URL 제안 `?play=label&step=prepare#playbook`, Work detail `?project=label#work`; 기존 archive query 보존. 현재 초기 hash 복원/뒤로가기 지원이 충분하지 않으므로 새 query가 동작한다고 가정하지 말고 adapter에서 최초 load와 popstate를 별도 검증. 실제 구현 승인 시 history 동작 범위 명시.

## 전환과 조작

Step 선택 → 이전 animation cancel → 선택 상태/설명 즉시 업데이트 → player movement 0–200ms → dashed route draw 120–450ms → ball travel 250–750ms → 750–850ms settled. 총 850ms 후보; 실제 step 없는 장식 이동 금지. 위험/차단 분기는 공이 gate에서 정지한다. CSS/SVG transform과 stroke-dashoffset, 짧은 WAAPI 또는 단일 rAF만. 종료 후 loop 없음. 숫자는 fade가 아닌 고정값 reveal 가능, count-up 금지.

- Next Play/Previous는 범위 끝에서 disabled. 모든 direct step은 처음부터 접근 가능; 애니메이션을 끝까지 봐야 내용이 열리는 강제 게이트 금지.
- 빠른 클릭은 새 generation이 이전 completion을 무효화. Next를 여러 번 눌러도 stale state가 annotation을 덮지 못함.
- Replay는 현재 step만 재생. 명확한 “Restart case”는 전체 초기화.
- Project switching은 해당 사례 첫 stage로 reset, 실행 중 animation 취소. 두 도구 사이 데이터가 실제 전달되는 pass 애니메이션 금지.
- Pause motion은 현재 transition을 최종 읽기 상태로 끝냄. reduced-motion 변경을 실시간 감지하여 즉시 settled.
- dialog 밖 이동/close/route change 시 모든 animation/timer 정리. 자동 audio 없음.

## 반응형

```text
1440: [case / story 38%] [court + legend 62%]
      [stage nav]       [Previous | Next Play | Replay]
768:  [case choice + short story]
      [court + short legend]
      [stage + controls] [evidence disclosure]
390:  [case selector] [heading + 2-line annotation]
      [portrait court: max 4 numbered markers]
      [HTML role legend] [Previous | Next Play]
      [Replay / step selector] [evidence]
```

1440 max panel width 약 1180, 768 margin24, 390 margin16. SVG desktop viewBox 0 0 100 70, 모바일 0 0 60 100. 좌표는 별도 배열, desktop를 축소하지 않는다. 모바일 라벨은 SVG에 1–4만, 전체 role은 HTML legend로. 모든 행이 viewport 내 고정돼야 한다고 가정하지 않고 dialog body scroll 제공. controls는 바닥에 sticky하되 마지막 본문을 덮지 않게 padding/scroll-margin 확보. 기존 오른쪽 nav는 모달 때 inert로 처리되는 native dialog 특성 확인.

## 접근성

native buttons/fieldset/legend; project toggle aria-pressed, 단계 목록 ordered list+현재 step aria-current. 키보드 Tab/Shift-Tab, Enter/Space, Escape close 및 trigger로 focus 복귀. Arrow/Home/End는 step selector에 focus 있을 때만 동작, page 전체 key capture 금지. 터치 target 44px 이상. 색 외에 route type text/dash/stop icon 사용. contrast 본문4.5:1, 큰 제목3:1을 실제 측정. SVG title/desc와 별도 ordered text transcript 제공; 장식 공/선은 aria-hidden, 중복 낭독 방지. aria-live polite는 step 완료 요약 1회만, 프레임별 위치 방송 금지.

No-animation fallback: 같은 final positions/routes/annotation/metric을 즉시 표시. JS 실패 시 프로젝트 요약+정적 단계 transcript+GitHub 링크를 HTML에 남길 설계; JS 주입만으로 전체 설명을 구성하지 않음.

## 기존 Scoreboard와 혼동 방지

`open(2)`를 단순 새 case의 세 번째 stage로 치환하면 현재 Coupang 3D score click에 새 수치가 나타나는 버그가 된다. adapter는 source='legacy-score'일 때 기존 Coupang 근거를 보존하고 board source일 때 신규 2-case board를 연다. 기존 physical board의 Coupang texture와 새 주제도 불일치한다. P2-03B 전승인 질문: geometry는 고정하되 board texture 제목을 중립 “THE PLAYBOOK / Small Tools. Measurable Impact.”로 바꿀지, 아니면 명시적 HTML “Explore two new plays” 트리거만 추가할지. 승인 없이 texture 수정 안 함.

## 성능 및 보안

Three scene은 이미 약700 draw calls 규모의 기존 부담이 있다(이전 QA 관찰, 새 benchmark 아님). SVG 선수 4개/활성 route 1–3개, requestAnimationFrame은 transition 동안만; frame마다 DOM layout 측정 금지. 새 continuous render loop/observer 전체 문서 감시는 피한다. offscreen/dialog close 정리, hidden tab pause. renderer 중지 같은 engine 수정은 별도 승인 필요.

CSP 'self' 유지, 외부 iframe/QR service/animation CDN 불필요. innerHTML로 사용자 QR을 넣지 말고 textContent. Synthetic demo는 pure fixture adapter로 격리하고 live host/Sheet/browser extension API를 bundle하지 않는다. 코드 재사용 허가 전 새 portfolio simulation 로직은 독립 작성할 것을 제안.
