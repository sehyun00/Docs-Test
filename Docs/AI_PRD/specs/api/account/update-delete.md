---
type: api
phase: P1
category: account
method: PUT/DELETE
endpoint: /api/accounts/{accountId}
auth: required
related:
  db:
    - specs/db/account/accounts.md
  ui: []
---

# PUT/DELETE /api/accounts/{accountId}

## 개요

계좌 수정 및 삭제

---

## PUT - 계좌 수정

### Request

- **URL**: `/api/accounts/{accountId}`
- **Method**: `PUT`
- **Auth**: Bearer Token 필수

### Request Body

```json
{
  "brokerageName": "삼성증권",
  "accountNumber": "12345678-56789012"
}
```

### Response (200)

```json
{
  "id": 1,
  "brokerageName": "삼성증권",
  "accountNumber": "****-****-9012",
  "isConnected": false,
  "updatedAt": "2026-01-15T12:00:00Z"
}
```

---

## DELETE - 계좌 삭제

### Request

- **URL**: `/api/accounts/{accountId}`
- **Method**: `DELETE`
- **Auth**: Bearer Token 필수

### Response (200)

```json
{
  "message": "삭제되었습니다"
}
```

### 에러 (공통)

| 코드 | 상황 | 메시지 |
|------|------|--------|
| 401 | 인증 실패 | "로그인이 필요합니다" |
| 403 | 권한 없음 | "접근 권한이 없습니다" |
| 404 | 계좌 없음 | "계좌를 찾을 수 없습니다" |

## 관련 스펙

- DB: `specs/db/account/accounts.md`
