# CHANGELOG - 2026-01-25_0249

## 배치 정보

- **배치 ID**: 2026-01-25_0249
- **처리일**: 2026-01-25
- **유형**: 정리 배치 (이전 배치 누락 사항 처리)

---

## 변경 요약

| 도메인 | 작업   | 파일                              | 설명                                     |
| ------ | ------ | --------------------------------- | ---------------------------------------- |
| admin  | UPDATE | `specs/api/admin/users-role.md`   | Dead Link 수정 (admin-logs → audit-logs) |
| admin  | UPDATE | `specs/api/admin/users-status.md` | Dead Link 수정 (admin-logs → audit-logs) |

---

## 상세 변경 내역

### admin 도메인 (API)

#### [UPDATE] users-role.md

- **프론트매터**: `related.db` 경로 수정
    - `specs/db/admin/admin-logs.md` → `specs/db/admin/audit-logs.md`
- **구현 로직**: `admin_logs` → `audit_logs` 테이블명 수정
- **관련 스펙**: `../db/admin-logs.md` → `../db/audit-logs.md`

#### [UPDATE] users-status.md

- **프론트매터**: `related.db` 경로 수정
    - `specs/db/admin/admin-logs.md` → `specs/db/admin/audit-logs.md`
- **구현 로직**: `admin_logs` → `audit_logs` 테이블명 수정
- **관련 스펙**: `../db/admin-logs.md` → `../db/audit-logs.md`

---

## ⚠️ 수동 정리 필요

> [!CAUTION]
> 아래 파일들은 터미널 명령 실패로 삭제되지 않았습니다. 수동 삭제가 필요합니다.

| 파일                                     | 상태      | 이유                             |
| ---------------------------------------- | --------- | -------------------------------- |
| `specs/db/admin/admin-logs.md`           | 삭제 필요 | `audit-logs.md`로 대체됨         |
| `specs/db/notification/device-tokens.md` | 삭제 필요 | `auth/device-tokens.md`로 이관됨 |

---

## 다음 단계

1. 위 파일들 수동 삭제
2. `/prd-validate`로 정리 완료 확인
