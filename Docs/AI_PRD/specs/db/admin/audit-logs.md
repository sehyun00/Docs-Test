---
type: db
phase: P1
table: audit_logs
related:
    db:
        - specs/db/auth/users.md
    api:
        - specs/api/admin/users-role.md
        - specs/api/admin/users-status.md
---

# audit_logs 테이블

## 개요

보안 감사 및 중요 데이터 변경 로그 (기존 admin_logs 대체)

> [!NOTE]
> 이 테이블은 `admin_logs` 테이블을 대체합니다. 사용자/시스템 행위 모두 추적 가능한 범용 감사 로그입니다.

## 스키마

```sql
CREATE TABLE audit_logs (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  user_id INTEGER,
  action ENUM('LOGIN', 'LOGOUT', 'CREATE', 'UPDATE', 'DELETE', 'VIEW', 'EXPORT') NOT NULL,
  entity_type VARCHAR(100) NOT NULL,
  entity_id INTEGER,
  old_value TEXT,
  new_value TEXT,
  reason TEXT,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_audit_logs_user_id (user_id),
  INDEX idx_audit_logs_action (action),
  INDEX idx_audit_logs_entity (entity_type, entity_id),
  INDEX idx_audit_logs_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

## 컬럼 상세

| 컬럼        | 타입         | 필수 | 설명                            | Phase |
| ----------- | ------------ | ---- | ------------------------------- | ----- |
| id          | INTEGER      | Y    | PK, AUTO_INCREMENT              | P1    |
| user_id     | INTEGER      | N    | FK → users.id (NULL이면 시스템) | P1    |
| action      | ENUM         | Y    | 행위 유형                       | P1    |
| entity_type | VARCHAR(100) | Y    | 대상 테이블명                   | P1    |
| entity_id   | INTEGER      | N    | 대상 레코드 ID                  | P1    |
| old_value   | TEXT         | N    | 변경 전 값 (JSON)               | P1    |
| new_value   | TEXT         | N    | 변경 후 값 (JSON)               | P1    |
| reason      | TEXT         | N    | 변경 사유                       | P1    |
| ip_address  | VARCHAR(45)  | N    | 접속 IP 주소                    | P1    |
| user_agent  | TEXT         | N    | 앱/브라우저 정보                | P1    |
| created_at  | TIMESTAMP    | Y    | 기록 시각                       | P1    |

## Action 유형

| action | 설명             |
| ------ | ---------------- |
| LOGIN  | 로그인           |
| LOGOUT | 로그아웃         |
| CREATE | 생성             |
| UPDATE | 수정             |
| DELETE | 삭제             |
| VIEW   | 조회 (민감 정보) |
| EXPORT | 내보내기         |

## 예시 데이터

```json
{
    "id": 1,
    "user_id": 123,
    "action": "UPDATE",
    "entity_type": "users",
    "entity_id": 456,
    "old_value": "{\"is_suspended\": false}",
    "new_value": "{\"is_suspended\": true}",
    "reason": "이용약관 위반",
    "ip_address": "192.168.1.1",
    "user_agent": "Mozilla/5.0...",
    "created_at": "2026-01-25T02:30:00Z"
}
```

## 관련 스펙

- DB: `specs/db/auth/users.md`
- API: `specs/api/admin/users-role.md`
- API: `specs/api/admin/users-status.md`
