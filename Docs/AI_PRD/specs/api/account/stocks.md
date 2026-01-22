---
type: api
phase: P1
category: account
method: POST/PUT/DELETE
endpoint: /api/accounts/{accountId}/stocks
auth: required
related:
  db:
    - specs/db/account/account-stock-entries.md
  ui: []
---

# /api/accounts/{accountId}/stocks

## 개요

계좌 내 종목 수동 입력 관리

---

## POST - 종목 추가

### Request

- **URL**: `/api/accounts/{accountId}/stocks`
- **Method**: `POST`

### Request Body

```json
{
  "ticker": "005930",
  "quantity": 100,
  "avgPrice": 75000
}
```

### Response (201)

```json
{
  "id": 1,
  "ticker": "005930",
  "quantity": 100,
  "avgPrice": 75000,
  "createdAt": "2026-01-15T12:00:00Z"
}
```

---

## PUT - 종목 수정

### Request

- **URL**: `/api/accounts/{accountId}/stocks/{stockId}`
- **Method**: `PUT`

### Request Body

```json
{
  "quantity": 150,
  "avgPrice": 74000
}
```

---

## DELETE - 종목 삭제

### Request

- **URL**: `/api/accounts/{accountId}/stocks/{stockId}`
- **Method**: `DELETE`

### Response (200)

```json
{
  "message": "삭제되었습니다"
}
```

## 관련 스펙

- DB: `specs/db/account/account-stock-entries.md`
