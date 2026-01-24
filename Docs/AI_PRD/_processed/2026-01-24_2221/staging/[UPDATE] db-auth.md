---
type: staging
domain: auth
title: 사용자 및 디바이스 토큰 스키마 동기화
---

## 📋 작업 요약

| 항목                                               | 작업   | 설명                                            |
| -------------------------------------------------- | ------ | ----------------------------------------------- |
| [device-tokens.md](specs/db/auth/device-tokens.md) | NEW    | `sk_p1.dbml`의 `device_tokens` 테이블 신규 생성 |
| [settings.md](specs/db/auth/settings.md)           | UPDATE | `investment_type` 컬럼 유지 (DBML 수정됨)       |
| [users.md](specs/db/auth/users.md)                 | SKIP   | DBML과 스펙 일치 (변경 없음)                    |
| [user-consents.md](specs/db/auth/user-consents.md) | SKIP   | DBML과 스펙 일치 (변경 없음)                    |
| [token-vault.md](specs/db/auth/token-vault.md)     | SKIP   | DBML과 스펙 일치 (변경 없음)                    |

## 🔍 AI 분석 및 제안

1. **`device_tokens` 테이블 신규 생성**:
    - `sk_p1.dbml`에 정의된 푸시 알림용 디바이스 토큰 테이블입니다.
    - 기존 `notification` 도메인이 아닌 `auth` 도메인(사용자 인증/기기 관리)에 배치하는 것이 적절해 보입니다. (FK가 `users.id` 참조)

2. **`settings` 테이블 동기화**:
    - 사용자가 DBML에 `investment_type` 컬럼을 추가하여 기존 스펙과 일치시켰습니다.

## 📝 변경 상세

### [NEW] specs/db/auth/device-tokens.md

생성 완료 (notification 도메인에서 이관)

## 🔍 확인 필요 사항

### 1. settings.investment_type 제거

- [x] 유지: DBML에 누락된 것이므로 DBML 수정 필요 (기능 유지) ✅ 사용자가 DBML 수정함

### 2. device_tokens 도메인 위치

- [x] auth: 사용자 기기 관리 성격이 강함 (권장) ✅
