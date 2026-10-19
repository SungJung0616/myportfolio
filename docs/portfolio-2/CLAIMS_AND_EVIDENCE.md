# P2-03 — Claims and Evidence

2026-10-15 · 리서치/설계만. 앱 기준 9b03cb171c97f2024ed03d9cf505cf5182e2db99. 외부 저장소는 아래 커밋을 읽기 전용으로 조사했다. 운영 접속, 확장 설치, 실제 선택/시트 쓰기, 테스트 재실행은 하지 않았다.

## 분류와 출처

- **Source-code verified (S):** 특정 코드 경로가 존재함을 확인. 실운영 성공/성능의 증거가 아니다.
- **User-reported operational outcome (U):** 이번 P2-03 사용자 요청의 현장 관찰. 원본 로그/독립 감사는 없음.
- **Calculated from user-reported values (C):** U의 산술 결과. 원자료의 신뢰도는 높아지지 않는다.
- **Proposed (P):** 앞으로 만들 UX/데모/설계 또는 설명적 해석.
- **Unverified (V):** 자료 미확인, 라이선스/운영/검증 여부 불명.

문서에 쓰인 테스트 결과는 S 중에서도 **저장소 기록 확인**이며 이번 실행 결과가 아니다. 사용자 진술과 저장소 테스트 제한이 다르면 어느 한쪽을 삭제하지 않는다.

### 고정 소스 인덱스

Label Helper 기준 `366313474c373a47bbea5a30cfe4cac5767d855a`:

- [A1 README](https://github.com/SungJung0616/acrossb-label-helper/blob/366313474c373a47bbea5a30cfe4cac5767d855a/README.md)
- [A2 configure.cjs](https://github.com/SungJung0616/acrossb-label-helper/blob/366313474c373a47bbea5a30cfe4cac5767d855a/configure.cjs), [manifest](https://github.com/SungJung0616/acrossb-label-helper/blob/366313474c373a47bbea5a30cfe4cac5767d855a/src/manifest.json), [package](https://github.com/SungJung0616/acrossb-label-helper/blob/366313474c373a47bbea5a30cfe4cac5767d855a/package.json)
- [A3 core.js](https://github.com/SungJung0616/acrossb-label-helper/blob/366313474c373a47bbea5a30cfe4cac5767d855a/src/core.js), [extractor.js](https://github.com/SungJung0616/acrossb-label-helper/blob/366313474c373a47bbea5a30cfe4cac5767d855a/src/extractor.js)
- [A4 background.js](https://github.com/SungJung0616/acrossb-label-helper/blob/366313474c373a47bbea5a30cfe4cac5767d855a/src/background.js), [sheets-writer.js](https://github.com/SungJung0616/acrossb-label-helper/blob/366313474c373a47bbea5a30cfe4cac5767d855a/src/sheets-writer.js)
- [A5 work-instructions.js](https://github.com/SungJung0616/acrossb-label-helper/blob/366313474c373a47bbea5a30cfe4cac5767d855a/src/work-instructions.js), [i18n.js](https://github.com/SungJung0616/acrossb-label-helper/blob/366313474c373a47bbea5a30cfe4cac5767d855a/src/i18n.js), [content.js](https://github.com/SungJung0616/acrossb-label-helper/blob/366313474c373a47bbea5a30cfe4cac5767d855a/src/content.js), [popup.js](https://github.com/SungJung0616/acrossb-label-helper/blob/366313474c373a47bbea5a30cfe4cac5767d855a/src/popup.js)

QR Helper 기준 `e495791afa1b23b834585e6894a03a2b90dc8982`:

- [B1 README](https://github.com/SungJung0616/acrossb-flow-qr-helper/blob/e495791afa1b23b834585e6894a03a2b90dc8982/README.md), [manifest](https://github.com/SungJung0616/acrossb-flow-qr-helper/blob/e495791afa1b23b834585e6894a03a2b90dc8982/manifest.json)
- [B2 core.js](https://github.com/SungJung0616/acrossb-flow-qr-helper/blob/e495791afa1b23b834585e6894a03a2b90dc8982/core.js), [panel.js](https://github.com/SungJung0616/acrossb-flow-qr-helper/blob/e495791afa1b23b834585e6894a03a2b90dc8982/panel.js)
- [B3 TEST-REPORT](https://github.com/SungJung0616/acrossb-flow-qr-helper/blob/e495791afa1b23b834585e6894a03a2b90dc8982/TEST-REPORT.md), [tests.js](https://github.com/SungJung0616/acrossb-flow-qr-helper/blob/e495791afa1b23b834585e6894a03a2b90dc8982/tests.js), [qr-format.test.cjs](https://github.com/SungJung0616/acrossb-flow-qr-helper/blob/e495791afa1b23b834585e6894a03a2b90dc8982/qr-format.test.cjs)
- [B4 demo.html](https://github.com/SungJung0616/acrossb-flow-qr-helper/blob/e495791afa1b23b834585e6894a03a2b90dc8982/demo.html), [demo.js](https://github.com/SungJung0616/acrossb-flow-qr-helper/blob/e495791afa1b23b834585e6894a03a2b90dc8982/demo.js), [QR formula](https://github.com/SungJung0616/acrossb-flow-qr-helper/blob/e495791afa1b23b834585e6894a03a2b90dc8982/docs/label-qr-formula.md)

A의 설치/guide/popup HTML/i18n 및 B의 tests.html도 확인. 두 저장소의 전체 파일 트리를 확인했으며 LICENSE 파일은 발견되지 않았다. 공개 열람 가능과 재배포 허가는 다르므로 라이선스/소유권 확인 전 코드를 포트폴리오에 복사하지 않는다. 이번에는 설명과 소스 링크만 작성했다.

## A — 코드와 주장 매트릭스

| ID / 분류 | 근거 | 허용 문구 / 제한 |
| --- | --- | --- |
| A-S1 / S | A2 MV3, configure | “A configurable Chrome/Edge extension.” v0.1.14 기반 공개판, 설정 생성은 Node 18+, 의존성 설치 불필요. Chrome 최소 120. Edge 실제 검증은 별도 |
| A-S2 / S | A3 readSelection/buildPlan | “Reads rendered, selected JOB_READY batches and prepares label inputs.” 표시된 체크 행만 읽음. source URL/탭과 SKU·수량 텍스트 확인 |
| A-S3 / S | A3 writes, A4 writer | “Enters six label inputs through browser keyboard and mouse interaction.” Sheets API/OAuth 동기화 아님. B2/B4/A4/A8/A12/A6 입력, 병합 영역 포함 |
| A-S4 / S | A4 assertTarget/go/write | 문서·gid·활성 탭, 편집 UI, 대화상자, 허용 셀/문자열 길이·선두 =/+/@ 검사. 최종 저장값/QR 검증이나 트랜잭션 rollback으로 표현 금지 |
| A-S5 / S | A3 first + reduce | 여러 행의 주문 수 합산, 날짜/SKU/channel은 첫 행. 날짜·SKU·carrier 동등성/100주문 한도 검증 없음. 안전한 임의 다중 배치 병합으로 표현 금지 |
| A-S6 / S | A4 run, A5 | 입력 후 작업지시서 toolbar 클릭 시도. 실제 인쇄/출고 확인 안 함. `expectedPlan`/`readPlan` 인자는 함수 안에서 재검증에 쓰이지 않음. “opens the work-instruction action” 정도만 |
| A-S7 / S | A5 i18n/content/popup | 한국어·영어·스페인어 UI, local language/session status. 모든 원문 오류가 완벽 번역되는 것은 아님; 미번역 오류는 일반 메시지로 fallback |
| A-U1 / U | 사용자 P2-03 | “Frontline associates, including Spanish-speaking staff, could take on more of the preparation workflow.” 관리자 완전 불필요/직원별 숙련도 측정 주장 금지 |
| A-U2 / U | 사용자 P2-03 | “Sung reports approximately 15 → 1–2 batch data-entry errors per approximately 150 batches.” 오류 건수이며 오류가 난 고유 배치 수가 아님 |
| A-C1 / C | A-U2 | (15−2)/15=86.7%, (15−1)/15=93.3%. “~90% Fewer Data Entry Errors”에는 바로 옆에 U 표시 및 원값 필수 |
| A-V1 / V | A1 + 파일 트리 | 공개판 live warehouse/Sheet 미검증. 테스트 파일/CI/보고서 미발견. 운영판과 공개판 동일성·실사용 버전·측정기간·표본·집계 방법 미확인 |

입력: DOM batch code/SKU strings/order count/carrier. 출력: 6개 sheet 입력 동작 및 상태 알림, 선택적 지시서 toolbar 클릭. 최종 라벨·QR·인쇄는 별도 시트 수식/사람의 검수 경계다. 실행 중 다른 사용자 writer와 경합 방지는 전역 lock이 아니며 `running`은 해당 worker의 재진입 방지다. 부분 쓰기 후 실패 가능, undo 없음.

## B — 코드와 주장 매트릭스

| ID / 분류 | 근거 | 허용 문구 / 제한 |
| --- | --- | --- |
| B-S1 / S | B1/B2 | MV3 content scripts core+panel. 별도 서버/네트워크 호출·storage 권한 없음. 로그인은 기존 웹사이트가 담당 |
| B-S2 / S | parseQR/parseCode | `MM-DD_N` / `MM_DD_N`, trailing CR/LF, 양의 1–12자리 배치. 월/일/번호 비교; QR에 연도가 없어 여러 연도에서 중복이면 차단 |
| B-S3 / S | inspect/match | 허용 페이지/탭, 목록 헤더·전체 수·DOM 구조·visible/disabled/mixed 검사. 정확히 한 행 필요. 현재 한국어 UI 구조 의존, 모든 언어 지원 주장 금지 |
| B-S4 / S | Engine.run | 기본 dry=true; 220ms 후 목록 signature와 row/checkbox identity 재검사. 실제 모드와 날짜 기준 확인 후 native checkbox click. 150ms 후 선택 결과·다른 행 상태 확인 |
| B-S5 / S | owned/undoCode | helper가 소유한 동일 checkbox에만 undo. 새 DOM/새로고침은 취소 제한. 외부 이벤트를 완전 제어/자동 복구한다고 주장 금지 |
| B-S6 / S | panel | 입력창 Enter 또는 버튼, 연속 key repeat 억제, 동시 요청 재스캔, route 변경 시 dry reset, 로그는 탭 메모리. 날짜 확인 체크는 기본 true이므로 매번 강제 명시 확인을 받는다고 표현 금지 |
| B-S7 / S | B3 저장소 기록 | “Repository report: 19 fake-DOM tests passed (2026-09-25).” 운영 React 실제 선택·USB scanner·Edge 설치 미검증. 09-28 report의 Node 2개 통과/구문 검사와 브라우저 재실행 차단을 함께 표시 |
| B-U1 / U | 사용자 P2-03 | “Sung reports approximately 20 → 5 minutes for a representative batch identification and verification task.” 모든 배치/전체 출고 시간으로 일반화 금지 |
| B-C1 / C | B-U1 | (20−5)/20=75% less time, 20/5=4× as fast. 기본은 75%와 원값만; 4×를 중복 과장하지 않음 |
| B-V1 / V | B3 vs U | 운영 성과를 보고한 버전·장치·작업량과 공개 테스트 버전 관계 Unknown. 사용자 보고를 부정하지 않되 공개 코드의 운영 검증으로 승격하지 않음 |

입력: QR 텍스트+이미 렌더된 전체 작업 목록. 출력: dry-run 일치 결과 또는 검증된 1행 checkbox 상태 및 메모리 로그. 완료/제출·재고 대사 기능 없음. 체크박스의 사이트 side effect는 도구가 통제하지 못한다.

## 테스트 증거 수준

A는 배포용 source만 확인, 테스트 스위트/동작 demo 없음. B는 테스트 정의 19개, 독립 parser test 2개와 local fixture demo 있음. 보고서 최초 19 pass는 후속 수정 전체의 새 브라우저 실행 증거가 아니다. 이번 조사에서 테스트를 실행하지 않았으므로 “we verified 19 passing tests today” 금지. 운영 속도/오류 수치는 테스트가 아니라 U이다.

## 공개 안전성 및 통합 오해

- B의 manifest/core/README/demo adapter에는 운영 호스트가 존재한다. 공개 repo에 있어도 이 문서/포트폴리오에 복제하지 않는다. 내부 행 수/실제 고객사·SKU·식별자 캡처도 사용하지 않는다.
- B의 local demo는 localhost 외 호스트에서 실행을 거부한다. 운영 호스트 문자열을 가짜 URL provider로 사용하는 adapter이므로 그대로 임베드하지 않는다.
- QR 생성 수식은 별도 Google Sheets 기능이며 QuickChart에 날짜/배치 payload를 보낸다. 확장 스캔 로직의 local-only와 전체 QR 생성 워크플로의 network-free를 혼동하지 않는다.
- A의 다중 batch B4 값은 여러 번호 문자열이다. B 문서의 단일 번호 QR 수식은 이를 거부한다. 두 도구를 자동으로 연결된 단일 제품처럼 묘사하지 않는다.
- public-safe simulation은 P이며 현재 구현된 데모가 아니다. 실제 계정·host·Sheet ID·실제 주문·인물·스캐너 권한 없이 fixture만 사용한다.

## 공개 수치의 최소 표기

Label: “Batch Data Entry Errors” / “~15 → 1–2 per ~150 batches” / “~90% fewer” / “User-reported operational observation; not independently audited.”

QR: “Batch Identification & Verification Time” / “~20 min → ~5 min” / “75% less time” / “Calculated from a user-reported representative task; not an audited benchmark.”

정확한 표본 기간, 동일 작업량/작업자 비교, 오류 중복 집계, 운영 release, 소유권·협업 범위, 이름·회사명 공개 허가, 코드 재사용 라이선스는 승인 전 질문 목록. “zero errors”, “inventory accuracy improved”, “automatic printing”, “autonomous warehouse”, “production-tested public edition”은 현재 금지.
