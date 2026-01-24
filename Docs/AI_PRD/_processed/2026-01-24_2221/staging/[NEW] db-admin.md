---
type: staging
domain: admin
title: audit_logs 도입 및 admin_logs 대체
---

## 📋 작업 요약

| 항목                                                | 작업   | 설명                                    |
| --------------------------------------------------- | ------ | --------------------------------------- |
| [audit-logs.md](specs/db/admin/audit-logs.md)       | NEW    | `sk_p1.dbml`의 `audit_logs` 테이블 반영 |
| [admin-logs.md](specs/db/admin/admin-logs.md)       | DELETE | `audit_logs`로 대체 (중복 제거)         |
| [announcements.md](specs/db/admin/announcements.md) | SKIP   | DBML과 스펙 일치 (변경 없음)            |

## 🔍 AI 분석 및 제안

1. **`audit_logs` vs `admin_logs`**:
    - `sk_p1.dbml`에 정의된 `audit_logs`는 `admin_logs`와 역할이 유사하지만, 더 범용적입니다 (시스템/사용자 행위 모두 추적 가능).
    - 기존 `admin_logs`의 `admin_user_id`는 UUID로 되어 있으나, 현재 `users.id`는 `Integer`입니다. `audit_logs`의 `user_id` (integer)가 현재 `users` 테이블 스키마와 일치합니다.
    - 따라서 `admin_logs`를 제거하고 `audit_logs`로 통합하는 것을 제안합니다.

2. **데이터 컬럼 매핑**:
    - `target_type` → `entity_type`
    - `target_id` → `entity_id`
    - `before_value` → `old_value`
    - `reason` 컬럼은 `audit_logs`에 없습니다. (필요 시 JSON `new_value`에 포함하거나 컬럼 추가 필요)

3. **`announcements`**:
    - DBML과 기존 스펙이 대동소이하므로 변경하지 않습니다.

## 📝 변경 상세

### [NEW] specs/db/admin/audit-logs.md

```markdown
---
type: db
phase: P1
table: audit_logs
related:
    db:
        - auth/users.md
    api: []
---

# audit_logs 테이블

## 개요

보안 감사 및 중요 데이터 변경 로그 (기존 admin_logs 대체)

## 스키마

(DBML 내용 반영)
```

### [DELETE] specs/db/admin/admin-logs.md

## 🔍 확인 필요 사항

### 1. admin_logs.reason 컬럼 처리

기존 `admin_logs`에는 관리자의 변경 사유(`reason`)를 적는 컬럼이 있었습니다. DBML의 `audit_logs`에는 이 컬럼이 없습니다.

- [x] 추가: `audit_logs` 테이블에 `reason` 컬럼 추가 (DBML 수정됨)
