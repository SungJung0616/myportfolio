# P2-03A — Things I've Built Catalog Draft

상태: 제안 / 문서만 작성. 2026-10-15. 사실 분류와 소스 고정 리비전은 [CLAIMS_AND_EVIDENCE.md](CLAIMS_AND_EVIDENCE.md)를 따른다. 운영 성과는 사용자 보고이며 독립 검증되지 않았다.

## 역할과 배치

Playbook은 판단 과정을, `Things I've Built`는 구현물·기술·한계를 보여준다. 기존 Work 목적지 안의 하위 갤러리로 시작하는 안을 추천한다. 새 내비게이션 목적지나 React 라우터는 만들지 않는다. 상세 내용은 같은 Work 안의 접근 가능한 확장 영역으로 제안하며, 정확한 앵커는 구현 승인 후 정한다.

카드에는 제목 / 한 문장 / 기술 3개 / 상태 / `Explore the build`만 둔다. 상세에는 아래 9개 공통 항목과 GitHub·관련 Playbook 링크를 제공한다. 완료된 코드와 운영 결과, 향후 개선을 별도 표시한다. 저장소 소유자 정보만으로 단독 개발·기획·배포 소유권을 추정하지 않는다.

## A. AcrossB Label Helper

- Public summary: **“Reduce repetitive batch entry while keeping final label review with people.”**
- Identity: multilingual workflow assistance; 반복 입력과 숙련 관리자 의존을 줄이는 도구.
- Technology: JavaScript, Chrome Manifest V3, DOM extraction, Chrome debugger input events, Google Sheets browser UI. API 동기화가 아니다.
- Public source: https://github.com/SungJung0616/acrossb-label-helper
- Proposed link back: Playbook에서 Label Helper의 첫 단계를 명시적으로 선택한다. 단순 `#playbook`만으로 사례 선택을 보장하지 않는다.

| Detail heading | 근거 기반 초안 / 공개 조건 |
| --- | --- |
| The Problem | Managers repeatedly transferred batch details into a label worksheet. 사용자 업무 설명에 근거. |
| Why It Mattered | Repetitive entry created opportunities for mistakes and made delegation harder. 언어·신입 온보딩 영향은 사용자 보고로 표시. |
| My Role | **Pending owner confirmation.** 정확한 설계·코딩·운영 도입·협업 범위 확인 전 단독 소유권 문장 금지. |
| My Approach | Select displayed batches → extract and organize fields → enter allowed template cells → human review. 실제 사용자 인터뷰·도입 순서 및 대안 선택 이유는 추가 확인 필요. |
| Tools & Technical Decisions | Configurable origin and sheet; UI-based entry rather than a Sheets API integration; Korean, English and Spanish UI. 이 선택의 사업상 이유는 코드만으로 입증되지 않음. |
| Challenges & Exceptions | DOM/template changes, multi-batch compatibility, partial writes, no final saved-value readback. |
| Outcome | “~90% Fewer Data Entry Errors”; “~15 → 1–2 errors per approximately 150 batches.” 사용자 보고·계산 근거를 함께 표시. |
| Evidence | 공개 source와 README; 운영 오류 원장·기간·공개 승인된 전후 화면은 미확보. |
| Lessons Learned | 제안 질문: 어떤 입력을 표준화했고 어떤 검수를 사람에게 남겼는가? 실제 회고 답변을 받기 전 경험담으로 서술하지 않음. |

### 구현과 한계

`configure.cjs`가 로컬 설정과 배포 폴더를 만든다. 콘텐츠 추출 → `core.js` 계획 → background 조정 → `sheets-writer.js`의 제한된 셀 입력 순서다. B2/B4/A4/A8/A12/A6을 다루며, 여러 배치의 수량 합계와 번호 결합은 지원하지만 SKU·날짜·운송사 호환성을 모두 검증하지 않는다. 첫 행의 일부 필드를 대표로 사용한다.

대상 시트·활성 탭·허용 셀·입력 길이·수식 시작 문자를 확인하는 보호 장치가 있으나 최종 저장값 확인이나 롤백은 없다. 선택적 작업지시 버튼 클릭은 인쇄 완료가 아니다. 공개판의 실제 창고·시트 검증 및 별도 자동 테스트는 확인되지 않았다. Edge 실기 검증도 Unknown.

### 안전한 데모 제안

허구 배치와 합성 SKU로 로컬 HTML 워크시트를 구성한다. 실제 시트나 확장 권한을 요구하지 않는다. “Simulation — fictional data, no live warehouse connection.”을 상시 표시한다. 단일 배치 기본 시나리오부터 시작하고 다중 배치 제한을 별도 설명한다. 생성된 출력은 데모 출력이지 실제 운영 결과물이 아니다. 공개 코드 재사용 전 라이선스 확인이 필요하다.

## B. AcrossB Flow QR Helper

- Public summary: **“Find one matching batch, validate it, and select it deliberately.”**
- Identity: guarded identification; 속도보다 선택 전 검증이 핵심.
- Technology: JavaScript, Chrome Manifest V3, DOM validation, QR text parsing, local browser UI.
- Public source: https://github.com/SungJung0616/acrossb-flow-qr-helper
- Proposed link back: Playbook QR Helper의 첫 단계 선택.

| Detail heading | 근거 기반 초안 / 공개 조건 |
| --- | --- |
| The Problem | Staff manually searched for batch records and checked the intended selection. 사용자 업무 설명. |
| Why It Mattered | Choosing the wrong row is an operational risk; inventory accuracy improvement is not established. |
| My Role | **Pending owner confirmation.** 저장소 소유와 전체 운영 책임을 동일시하지 않음. |
| My Approach | Parse identifier → validate the displayed list → require exactly one match → preview by default → deliberate selection. |
| Tools & Technical Decisions | Fail closed for ambiguity or incomplete lists; controlled checkbox click; restricted undo. 구현 확인과 선택 이유에 대한 사용자 회고는 구분. |
| Challenges & Exceptions | Yearless QR ambiguity, DOM changes, partial lists, already selected rows, changed row identity. |
| Outcome | “75% Less Time Finding the Right Batch”; “~20 min → ~5 min.” 대표 식별·검증 작업의 사용자 보고, 독립 벤치마크 아님. |
| Evidence | Source; historical fake-DOM report (19 passes); later parser tests. 운영 체크박스·물리 스캐너 완료 검증 아님. |
| Lessons Learned | 코드가 보여주는 경계: ambiguous data should stop selection. 실제 도입 과정의 교훈은 확인 후 작성. |

### 구현과 한계

`core.js`가 파싱·페이지/목록 검증·단일 일치·안정성 확인·선택/undo를 담당하고 `panel.js`가 입력과 모드를 제공한다. 기본 dry-run은 클릭하지 않는다. 실제 모드는 재확인 후 체크박스를 클릭한다. 실행한 선택만 제한적으로 되돌린다. 작업 완료·제출·재고 조정은 수행하지 않는다. 패널 날짜 확인은 기본 체크되어 있으므로 매번 새 확인을 강제한다고 설명하지 않는다.

확장은 별도 서버를 사용하지 않지만 별도 Google Sheets QR 공식은 외부 QuickChart에 payload를 보낸다. 따라서 전체 QR 생성 과정이 오프라인이라는 표현은 금지한다. 기존 demo는 로컬 호스트 전용이며 운영 호스트 문자열도 포함하므로 그대로 공개 Preview에 복사하지 않는다. 테스트를 이번 조사에서 다시 실행하지 않았다.

### 안전한 데모 제안

운영 URL 없는 합성 행 3개와 허구 QR 텍스트로 구성한다. 기본 dry-run → 하나 일치 → 명시적 선택, 그리고 중복/미일치 시 중단을 비교한다. 스캐너 하드웨어 없이 텍스트 입력으로 설명 가능하다. 실제 extension 동작 테스트가 아니라 시뮬레이션으로 표시한다. 실제 코드 이전은 라이선스·호스트 제거 검토 후 별도 승인.

## 기존 카탈로그 보존과 확장

현재 정적 Preview의 `navigation-data.js`는 React 원본과 자동 동기화되지 않는 스냅샷이다. 다음 항목이 존재한다는 것과 외부 데모가 현재 정상이라는 것은 별개다.

| 기존 항목 | 유지할 분류/역할 | 후속 처리 |
| --- | --- | --- |
| Eternights QA | 전문 QA 경험 / Work | 프로젝트 소유권 과장 없이 기존 범위 보존 |
| GPS automation / 3PL | 운영 개선 / Work | Coupang 기존 시간 지표를 두 새 사례에 전용하지 않음 |
| LAYRD | 기존 Work 내용 | 공개 증거·현재 상태 재확인 후 추가 |
| Market Intelligence Lab | 진행 중 | 완료로 변경하지 않음 |
| Remembering Young Hoon | 개인 프로젝트, AI-assisted | 기존 표기와 자료 유지 |
| What's in Your Fridge | 팀 프로젝트 | 개인 단독 작업으로 변경 금지 |
| SJ Shopping Mall / Task Manager | 개인 full-stack 학습 | 상용 운영 결과로 소개 금지 |
| SungFlix / City Weather / Dice Game | frontend 학습 | 기존 분류·링크 보존, 작동 여부 후속 검사 |

첫 구현은 새 두 상세만 추가하고 나머지는 보존한다. 이후 Professional / Independent / Team / Learning 및 In progress 상태를 데이터 필드로 분리하는 안을 제안한다. 현재 `ui.js`의 타입 접두사·DOM 인덱스 의존 필터에 새 카드를 무심코 삽입하면 분류가 어긋날 수 있다. 데이터 구조 변경은 별도 승인 대상이다. Film Room의 두 프로젝트와 미디어는 이번 범위에서 변경하지 않는다.

## 공개 전 조건

두 저장소에 명시적 LICENSE 파일을 확인하지 못했다. 공개 열람은 코드 재배포 허락과 다르다. 최초 문서에서는 링크·설명만 사용하고, 복제할 경우 권리자 허락 또는 라이선스 확인을 선행한다. 회사명 공개 범위·개인 역할·측정 기간·오류 정의·비교 조건·익명화된 증거 공개 승인을 확보한다. A의 다중 배치 출력과 B의 단일 QR 입력을 직결된 파이프라인으로 표현하지 않는다.
