# 처리 내역 - 2026-01-21_2244

## 원본 파일

- `[VALIDATE] 2026-01-21 portfolio.md`
- `[VALIDATE] 2026-01-21 stock.md`
- `[VALIDATE] 2026-01-21 rebalancing.md`
- `[VALIDATE] 2026-01-20 account.md`
- 기타 커뮤니티, 인증, 알림, 관리자 도메인 검증 파일

---

## 처리된 도메인

| 도메인               | staging 파일                        | 생성/수정된 스펙 |
| -------------------- | ----------------------------------- | ---------------- |
| admin                | [UPDATE] admin.md                   | 1개 수정         |
| auth                 | [UPDATE] auth.md                    | 4개 수정         |
| community-article    | [UPDATE] community-article.md       | 1개 수정         |
| community-feed       | [UPDATE] community-feed.md          | 4개 수정         |
| community-moderation | [OK] community-moderation.md        | 검증 통과        |
| community-ranking    | [UPDATE] community-ranking.md       | 1개 수정         |
| community-search     | [OK] community-search.md            | 검증 통과        |
| community-social     | [UPDATE] community-social.md        | 5개 수정         |
| db-account           | [UPDATE] db-account.md              | 8개 생성/수정    |
| log                  | [UPDATE] log.md                     | 4개 수정         |
| notification         | [UPDATE] notification.md            | 5개 수정         |
| portfolio-copy       | [UPDATE] portfolio-copy.md          | 2개 수정         |
| portfolio-core       | [UPDATE] portfolio-core.md          | 5개 수정         |
| portfolio-snapshot   | [UPDATE] portfolio-snapshot.md      | 5개 수정         |
| portfolio-ui         | [UPDATE] portfolio-ui.md            | 3개 생성/수정    |
| rebalancing          | [UPDATE] rebalancing.md             | 2개 수정         |
| stock                | [UPDATE] stock.md                   | 4개 생성/수정    |

---

## 생성된 스펙

| 파일                               | 타입 | 작업 |
| ---------------------------------- | ---- | ---- |
| specs/api/account/list-create.md   | API  | NEW  |
| specs/api/account/update-delete.md | API  | NEW  |
| specs/api/account/stocks.md        | API  | NEW  |
| specs/api/account/cash.md          | API  | NEW  |
| specs/ui/account/list.md           | UI   | NEW  |
| specs/ui/account/create.md         | UI   | NEW  |
| specs/ui/stock/search.md           | UI   | NEW  |
| specs/ui/portfolio/create.md       | UI   | NEW  |

---

## 업데이트된 스펙 (주요)

| 파일                               | 변경 내용                          |
| ---------------------------------- | ---------------------------------- |
| specs/db/auth/users.md             | accounts.md 역참조 추가            |
| specs/db/account/accounts.md       | 경로 수정 + API 연결               |
| specs/db/portfolio/portfolios.md   | 경로 수정 + 하위 엔트리 참조 수정  |
| specs/db/portfolio/portfolio-*     | 경로 수정 (stock/cash entries)     |
| specs/api/portfolio/*.md           | Dead Link 수정, 경로 통일          |
| specs/api/stock/*.md               | Dead Link 수정, 경로 통일          |
| specs/api/rebalancing/calculate.md | Dead Link 수정, 경로 통일          |
| specs/ui/portfolio/*.md            | 경로 수정                          |
| specs/ui/rebalancing/check.md      | 경로 수정                          |

---

## 주요 수정 사항 요약

### 1. 경로 표기 통일

- 모든 `related` 경로를 `specs/` 절대경로 형식으로 통일
- 상대경로(`../../`, `../`) → 절대경로(`specs/db/...`, `specs/api/...`)

### 2. Dead Link 수정

- 존재하지 않는 파일 참조 제거 또는 수정
- API/UI 스펙 간 양방향 연결 복구

### 3. 누락 스펙 생성

- account 도메인: API 4개, UI 2개 신규 생성
- stock 도메인: UI 1개 신규 생성 (search.md)
- portfolio-ui 도메인: UI 1개 신규 생성 (create.md)

### 4. 역참조 추가

- users.md에 accounts.md 역참조 추가
- 양방향 참조 관계 복원

---

## 처리 시각

- 시작: 2026-01-21 22:44
- 완료: 2026-01-22 22:52
