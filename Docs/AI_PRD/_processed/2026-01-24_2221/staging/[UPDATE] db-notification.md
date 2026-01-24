---
type: staging
domain: notification
title: 알림 설정 및 디바이스 토큰 동기화
---

## 📋 작업 요약

| 항목                                                                       | 작업   | 설명                                                                          |
| -------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------- |
| [device-tokens.md](specs/db/notification/device-tokens.md)                 | DELETE | `sk_p1.dbml`에 정의되어 있으나, `auth` 도메인에서 생성될 예정이므로 중복 제거 |
| [notification-settings.md](specs/db/notification/notification-settings.md) | SKIP   | DBML과 일치 (변경 없음)                                                       |
| [notification-types.md](specs/db/notification/notification-types.md)       | SKIP   | DBML과 일치 (변경 없음)                                                       |
| [notifications.md](specs/db/notification/notifications.md)                 | SKIP   | DBML과 일치 (변경 없음)                                                       |

## 🔍 AI 분석 및 제안

1. **`device_tokens` 중복 제거**:
    - `sk_p1.dbml`에 정의된 `device_tokens`는 DB 구조상 명확하지만, 문서화 관점에서는 도메인을 선택해야 합니다.
    - 앞선 **auth 도메인 작업**에서 `device_tokens`를 `auth` 폴더(`specs/db/auth/device-tokens.md`)에 신규 생성하도록 제안했습니다.
    - 따라서 기존 `specs/db/notification/device-tokens.md`는 **삭제**하고 `auth` 쪽으로 일원화하는 것이 정리상 깔끔합니다. (기기 관리는 인증/계정 영역에 더 가깝기 때문)

2. **나머지 테이블**:
    - `notifications`, `notification_types`, `notification_settings`는 DBML과 기존 스펙이 일치하므로 변경할 필요가 없습니다.

## 📝 변경 상세

### [DELETE] specs/db/notification/device-tokens.md

`auth` 도메인으로 이관하므로 삭제합니다.

## 🔍 확인 필요 사항

### 1. device_tokens 도메인 이동 확정

- [x] 동의: `auth`에서 관리하고 여기서는 삭제 ✅
