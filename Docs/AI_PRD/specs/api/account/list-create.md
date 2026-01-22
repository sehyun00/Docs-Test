---
type: api
phase: P1
category: account
method: GET/POST
endpoint: /api/accounts
auth: required
related:
  db:
    - specs/db/account/accounts.md
  ui:
    - specs/ui/account/list.md
---

# GET/POST /api/accounts

## 개요

계좌 목록 조회 및 생성

---

## GET - 목록 조회

### Request

- **URL**: `/api/accounts`
- **Method**: `GET`
- **Auth**: Bearer Token 필수

### Response (200)

```json
{
  "accounts": [
    {
      "id": 1,
      "brokerageName": "한국투자증권",
      "accountNumber": "****-****-1234",
      "isConnected": false,
      "createdAt": "2026-01-01T00:00:00Z"
    }
  ]
}
```

---

## POST - 계좌 생성

### Request Body

```json
{
  "brokerageName": "한국투자증권",
  "accountNumber": "12345678-01234567"
}
```

### Response (201)

```json
{
  "id": 1,
  "brokerageName": "한국투자증권",
  "accountNumber": "****-****-1234",
  "isConnected": false,
  "createdAt": "2026-01-01T00:00:00Z"
}
```

### 에러

| 코드 | 상황 | 메시지 |
|------|------|--------|
| 400 | 필수값 누락 | "증권사 이름을 입력해주세요" |
| 401 | 인증 실패 | "로그인이 필요합니다" |

## 관련 스펙

- DB: `specs/db/account/accounts.md`
- UI: `specs/ui/account/list.md`
