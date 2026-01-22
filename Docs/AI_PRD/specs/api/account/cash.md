---
type: api
phase: P1
category: account
method: PUT
endpoint: /api/accounts/{accountId}/cash
auth: required
related:
  db:
    - specs/db/account/account-cash-entries.md
  ui: []
---

# PUT /api/accounts/{accountId}/cash

## 개요

계좌 현금 잔고 수정

### Request

- **URL**: `/api/accounts/{accountId}/cash`
- **Method**: `PUT`
- **Auth**: Bearer Token 필수

### Request Body

```json
{
  "currency": "KRW",
  "amount": 5000000
}
```

### Response (200)

```json
{
  "accountId": 1,
  "currency": "KRW",
  "amount": 5000000,
  "updatedAt": "2026-01-15T12:00:00Z"
}
```

### 에러

| 코드 | 상황 | 메시지 |
|------|------|--------|
| 400 | 금액 음수 | "금액은 0 이상이어야 합니다" |
| 401 | 인증 실패 | "로그인이 필요합니다" |
| 403 | 권한 없음 | "접근 권한이 없습니다" |
| 404 | 계좌 없음 | "계좌를 찾을 수 없습니다" |

## 관련 스펙

- DB: `specs/db/account/account-cash-entries.md`
