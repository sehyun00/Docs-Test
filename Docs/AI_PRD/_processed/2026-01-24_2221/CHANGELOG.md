# CHANGELOG - 2026-01-24_2221

## 배치 정보

- **배치 ID**: 2026-01-24_2221
- **처리일**: 2026-01-25
- **원본 소스**: `_inbox/sk_p1.dbml`

---

## 변경 요약

| 도메인       | 작업   | 파일                                        | 설명                                              |
| ------------ | ------ | ------------------------------------------- | ------------------------------------------------- |
| admin        | NEW    | `specs/db/admin/audit-logs.md`              | 감사 로그 테이블 신규 생성                        |
| admin        | DELETE | `specs/db/admin/admin-logs.md`              | audit_logs로 대체되어 삭제                        |
| account      | UPDATE | `specs/db/account/accounts.md`              | `account_number_iv` 컬럼 추가                     |
| auth         | NEW    | `specs/db/auth/device-tokens.md`            | 디바이스 토큰 테이블 신규 (notification에서 이관) |
| notification | DELETE | `specs/db/notification/device-tokens.md`    | auth 도메인으로 이관                              |
| portfolio    | UPDATE | `specs/db/portfolio/portfolio-snapshots.md` | JSON → TEXT (JSON) 타입 변경                      |

---

## 상세 변경 내역

### admin 도메인

#### [NEW] audit-logs.md

- 기존 `admin_logs` 테이블을 대체하는 범용 감사 로그 테이블
- DBML `audit_logs` 정의 기반
- `reason` 컬럼 추가 (사용자 DBML 수정 반영)
- 관련: `specs/db/auth/users.md`

#### [DELETE] admin-logs.md

- `audit_logs`로 통합되어 삭제
- 컬럼 매핑:
    - `target_type` → `entity_type`
    - `target_id` → `entity_id`
    - `before_value` → `old_value`

---

### account 도메인

#### [UPDATE] accounts.md

- **추가된 컬럼**: `account_number_iv VARCHAR(255) NOT NULL`
- 용도: AES-256 암호화된 계좌번호 복호화용 IV

---

### auth 도메인

#### [NEW] device-tokens.md

- FCM/APNS 푸시 알림용 디바이스 토큰 관리
- notification 도메인에서 auth 도메인으로 이관 (사용자 기기 관리 성격)
- 관련: `specs/db/auth/users.md`, `specs/api/notification/fcm-token.md`

#### settings.md

- `investment_type` 컬럼 유지 (사용자가 DBML에 해당 컬럼 추가)

---

### notification 도메인

#### [DELETE] device-tokens.md

- auth 도메인으로 이관되어 삭제
- 중복 제거 목적

---

### portfolio 도메인

#### [UPDATE] portfolio-snapshots.md

- **변경된 컬럼 타입**:
    - `stock_entries`: JSON → TEXT (JSON)
    - `cash_entries`: JSON → TEXT (JSON)
    - `exchange_rates`: JSON → TEXT (JSON)
- DBML 정의(`text`)에 맞춤, 의미상 JSON임을 명시

---

## 연관 파일 업데이트

| 파일                                  | 변경 내용                                                               |
| ------------------------------------- | ----------------------------------------------------------------------- |
| `specs/INDEX.md`                      | auth에 device-tokens 추가, notification에서 제거, admin-logs→audit-logs |
| `specs/db/auth/users.md`              | related에 audit-logs, device-tokens 추가                                |
| `specs/api/notification/fcm-token.md` | related db 경로 notification→auth 변경                                  |

---

## 미결 사항

없음

---

## 다음 단계

1. `/prd-sync-tasks` 실행하여 태스크 파일 동기화
2. DBML 파일(`TEST/DBML/sk_p1.dbml`, `sk_p2.dbml`) 최종 정리
    - `audit_logs.reason` 컬럼이 추가됨
    - `settings.investment_type` 컬럼이 추가됨
