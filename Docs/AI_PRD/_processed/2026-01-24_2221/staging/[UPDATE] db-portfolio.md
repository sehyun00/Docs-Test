---
type: staging
domain: portfolio
title: 포트폴리오 스냅샷 및 종목 필드 동기화
---

## 📋 작업 요약

| 항목                                                                        | 작업   | 설명                                                          |
| --------------------------------------------------------------------------- | ------ | ------------------------------------------------------------- |
| [portfolio-snapshots.md](specs/db/portfolio/portfolio-snapshots.md)         | UPDATE | JSON 컬럼 타입을 Text로 변경 (DBML 반영)                      |
| [portfolio-stock-entries.md](specs/db/portfolio/portfolio-stock-entries.md) | UPDATE | `group_name` 컬럼명을 `group` 또는 `group_name`으로 확정 필요 |
| [portfolios.md](specs/db/portfolio/portfolios.md)                           | SKIP   | DBML과 일치 (변경 없음)                                       |
| [portfolio-cash-entries.md](specs/db/portfolio/portfolio-cash-entries.md)   | SKIP   | DBML과 일치 (변경 없음)                                       |

## 🔍 AI 분석 및 제안

1. **`portfolio_snapshots` JSON vs Text**:
    - `sk_p1.dbml`에서는 `stock_entries`, `cash_entries`, `exchange_rates`가 `text` 타입으로 정의되어 있습니다.
    - 기존 스펙은 `JSON` 타입을 사용 중입니다.
    - MySQL/MariaDB 등에서는 `JSON` 타입이 `TEXT`의 일종이거나 별도 타입일 수 있으나, DBML 표기를 따르려면 `text`로 변경하는 것이 맞습니다. 하지만 실제 구현체(MySQL 5.7+)에서는 `JSON` 타입을 권장하므로, **타입 명시만 `Text (JSON)` 형태로 수정**하는 것을 제안합니다.

2. **`portfolio_stock_entries.group_name`**:
    - `account_stock_entries`와 마찬가지로 DBML은 `group` 예약어를 사용하고, 스펙은 `group_name`을 사용합니다.
    - **account 도메인과 일관성**을 유지하기 위해 `group_name`을 유지하는 방향으로 제안합니다.

## 📝 변경 상세

### [MODIFY] specs/db/portfolio/portfolio-snapshots.md

DBML 타입 정의(`text`)에 맞춰 컬럼 타입을 수정하되, 의미상 JSON임을 명시합니다.

```markdown
| stock_entries | TEXT (JSON) | N | 종목별 상태 | P1 |
| cash_entries | TEXT (JSON) | N | 통화별 현금 | P1 |
| exchange_rates | TEXT (JSON) | N | 환율 정보 | P1 |
```

### [MODIFY] specs/db/portfolio/portfolio-stock-entries.md

(사용자 확인 항목)

## 🔍 확인 필요 사항

### 1. portfolio_stock_entries.group 컬럼명

- [x] 유지: `group_name` 사용 (Account와 통일) ✅
