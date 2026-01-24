---
type: staging
domain: account
title: 계좌 암호화 필드 및 스키마 동기화
---

## 📋 작업 요약

| 항목                                                                  | 작업     | 설명                                      |
| --------------------------------------------------------------------- | -------- | ----------------------------------------- |
| [accounts.md](specs/db/account/accounts.md)                           | UPDATE   | `account_number_iv` 컬럼 추가 (DBML 반영) |
| [account-stock-entries.md](specs/db/account/account-stock-entries.md) | QUESTION | `group_name` 컬럼명 확인 필요             |

## 🔍 AI 분석 및 제안

1. **`accounts` 테이블**:
    - `sk_p1.dbml`에서 `account_number` 암호화를 위한 `account_number_iv` 필드가 정의되어 있습니다.
    - 기존 `accounts.md` 스펙 문서에는 이 필드가 누락되어 있어 추가가 필요합니다.
    - API 레벨에서는 `accountNumber`를 평문으로 받고 내부에서 암호화하므로, API 스펙 변경은 불필요합니다.

2. **`account_stock_entries` 테이블**:
    - `sk_p1.dbml`에서는 컬럼명을 `group`으로 정의하고 있으나, `group`은 SQL 예약어입니다.
    - 기존 스펙(`account-stock-entries.md`)은 `group_name`을 사용 중입니다.
    - 예약어 충돌 방지를 위해 `group_name` 유지를 권장하나 사용자 확인이 필요합니다.

## 📝 변경 상세

### [MODIFY] specs/db/account/accounts.md

`account_number_iv` 컬럼을 추가합니다.

```sql
  account_number VARCHAR(255),
+ account_number_iv VARCHAR(255) NOT NULL COMMENT '복호화용 IV',
```

컬럼 상세 테이블에도 추가:

| 컬럼              | 타입         | 필수 | 설명        | Phase |
| ----------------- | ------------ | ---- | ----------- | ----- |
| account_number_iv | VARCHAR(255) | Y    | 복호화용 IV | P1    |

### [MODIFY] specs/db/account/account-stock-entries.md

(사용자 선택에 따라 변경 여부 결정)

## 🔍 확인 필요 사항

### 1. account_stock_entries.group 컬럼명

`sk_p1.dbml`에는 `group`으로 되어 있으나, 이는 SQL 예약어입니다. 기존 스펙인 `group_name`을 유지할까요?

- [x] 유지: `group_name` 사용 (권장, 예약어 회피)
