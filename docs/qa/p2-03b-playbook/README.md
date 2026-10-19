# P2-03B Static Playbook QA

2026-10-15. 격리된 정적 prototype 검수. 앱 통합·애니메이션·배포 없음.

## 증거 공개 범위

Local QA evidence — retained privately; not included in the public repository. 공개 baseline에는 이 README와 `results.json`만 포함한다. 아래 캡처와 runner 파일명은 로컬에 보관된 과거 증거를 식별하며, 공개 다운로드나 현재 검증 완료를 뜻하지 않는다.

## 결과

실제 설치된 Chrome을 Playwright로 실행했다. 1440×960 / 768×1024 / 390×844 각각 Label/QR × 3단계, 총 18개 조합을 확인하고 full-page PNG를 저장했다. PNG는 지정 viewport에서 촬영했으며 세로 스크롤 전체를 포함하므로 파일 높이는 viewport보다 길다.

- 18/18: 가로 overflow 없음, stage heading 표시, desktop/모바일 별도 SVG viewBox 확인.
- 18/18: 실행 중 animation 0개. 선수와 공 이동 애니메이션은 구현하지 않음.
- 3/3 viewport: keyboard Enter로 Next, 직접 stage 선택, case 변경 시 첫 단계 복귀, 마지막 Next disabled, reduced-motion에서 animation 0개.
- Tablet/mobile: Playwright touch tap으로 stage 전환 성공. 실제 iOS/Android 기기 검증은 하지 않음.
- JavaScript/console errors 0, failed requests 0, 외부 요청 0. 소스 링크는 사용자 클릭 링크이며 자동 호출하지 않음.
- Label Design: human review 유지. QR Design: dry-run과 ambiguous-match stop 설명 확인.
- Impact: 사용자 보고 각주와 ~90% / 75% 표시 확인. 오류 건수와 고유 오류 배치 수를 구분.
- `node --check` 통과. 기존 tracked diff와 staged diff는 비어 있음. 새 prototype만 독립적으로 로드되어 기존 앱의 import/script/CSS에 영향 없음.

화면을 직접 열어 검토한 대표 캡처: desktop-label-2, tablet-label-2, mobile-qr-2, mobile-label-3. 나머지는 자동 capture·layout 검사. 전체 접근성 감사, 실제 보조기술, live warehouse, 확장 동작, 기존 경기장 전체 runtime 회귀는 이번 정적 범위에서 실행하지 않음.

## 과거 실행 환경

검수 당시 로컬 runner `check.cjs`는 Node, `require('playwright')`, 설치된 Chrome channel로 임시 localhost 서버, 캡처, 결과 JSON을 생성했다. 이 runner는 로컬 아카이브에만 보관되며 공개 checkout에는 포함되지 않는다. 현재 prototype의 회귀 테스트 실행 안내가 아니며, 당시 신규 dependency/package 변경은 없었다.

당시 정적 후보는 `preview/p2-03b-playbook`을 localhost에서 제공하고 `?case=label&stage=0` 또는 `?case=qr&stage=1`로 열었다. stage는 0–2였다. 같은 디렉터리의 현재 prototype에는 이후 interaction과 세 번째 사례가 추가되어, 이 과거 실행 환경을 현재 검증 절차로 해석하지 않는다.

## 당시 생성 파일 목록 — 24개

역사적 생성 목록을 보존한다. 아래 QA 캡처와 `check.cjs`는 공개 baseline에 포함되지 않으며 로컬 아카이브에서만 확인할 수 있다.

Prototype:

1. `preview/p2-03b-playbook/index.html`
2. `preview/p2-03b-playbook/prototype.css`
3. `preview/p2-03b-playbook/prototype.js`

QA (모두 `docs/qa/p2-03b-playbook/`):

4. `check.cjs`
5. `results.json`
6. `README.md`
7. `desktop-label-1.png`
8. `desktop-label-2.png`
9. `desktop-label-3.png`
10. `desktop-qr-1.png`
11. `desktop-qr-2.png`
12. `desktop-qr-3.png`
13. `tablet-label-1.png`
14. `tablet-label-2.png`
15. `tablet-label-3.png`
16. `tablet-qr-1.png`
17. `tablet-qr-2.png`
18. `tablet-qr-3.png`
19. `mobile-label-1.png`
20. `mobile-label-2.png`
21. `mobile-label-3.png`
22. `mobile-qr-1.png`
23. `mobile-qr-2.png`
24. `mobile-qr-3.png`

이전부터 존재한 미추적 P2-03A 문서와 hosted-hero QA는 이번 생성 파일이 아니다. 변경하지 않았다.

## P2-03C 전 추천

1. QR의 ambiguous branch는 현재 정적인 중단 callout이다. 다음 단계에서 검증 gate에서 공이 정지하고 두 후보 경로를 보여주는 수동 substep으로 확장한다.
2. 현재 각 stage는 완성된 정지 장면이다. Design의 추출→입력→검수 / 파싱→검증→dry-run→명시적 선택을 substep으로 나눈 후 600–1000ms 전환을 검토한다.
3. 모바일에서 전체 내용을 읽으려면 세로 스크롤이 필요하다. 통합 dialog에서는 controls의 sticky 배치와 본문 가림을 검수한다.
4. 기존 물리 Coupang board/scoreboard와 새 두 사례의 진입 관계를 확정한다. 기존 `open(2)`를 새 QR impact로 치환하지 않는다.
5. 구현·운영 소유권, 측정 기간, 공개 증거는 아직 추가 확인이 필요하다. 현재 각주를 유지하고 실제 도입 회고를 임의로 추가하지 않는다.

frontend-design skill은 승인 팔레트와 한 장의 coaching spread, 조용한 controls, 별도 모바일 좌표 선택에 반영했다. 외부 저장소 코드는 복사하지 않았다.
