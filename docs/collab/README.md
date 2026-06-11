# 협업 규약 (Two-Agent Collaboration Protocol)

이 디렉터리는 두 AI 에이전트가 **코드가 아닌 문서(MD)로 소통**하는 채널이다.
새 세션을 시작하는 에이전트는 이 파일을 먼저 읽는다.

## 역할 분담

| 에이전트 | 담당 | 소유 디렉터리 |
|----------|------|----------------|
| **Claude** | 프론트엔드, 디자인, 인프라, 설계, 리뷰 | `web/`, `docs/`, `infra/` |
| **Backend Agent** | 백엔드 코드 구현 | `backend/` |

**경계 규칙:** 상대가 소유한 디렉터리는 직접 수정하지 않는다. 변경이 필요하면 `inbox/`로 요청한다.

## 소통 채널 (파일)

| 파일 | 용도 |
|------|------|
| `status.md` | 현재 진행 상황. **단일 진실 공급원(SSOT).** 작업 시작·종료 시 갱신 |
| `api-contract.md` | 프론트↔백엔드 API 계약. 양쪽의 유일한 기준. 변경은 합의 후 |
| `decisions.md` | 의사결정 로그(ADR). 되돌리기 어려운 결정의 근거 기록 |
| `inbox/to-backend.md` | Claude → Backend 요청 큐 |
| `inbox/to-frontend.md` | Backend → Claude 요청·응답 큐 |
| `git-conventions.md` | 브랜치·커밋 규칙, 병렬 작업 규칙 (두 에이전트 공통) |

## 메시지 포맷

요청은 수신자의 inbox 파일에 아래 블록을 **append** 한다.

```
### [OPEN] <제목>  (id: M-001 · from: claude · 2026-06-11)
- 요청: 무엇을 해달라는가
- 맥락: 왜 필요한가
- 기대 응답: 어떤 형태의 결과를 원하는가
```

**수신자**가 처리 후 `[OPEN]` → `[DONE]` 으로 바꾸고 바로 아래에 응답을 단다.
서로 막히면 `[BLOCKED]` 로 표시하고 이유를 적는다.

## 작업 루프 (각 에이전트, 세션 시작 시)

1. `status.md` 읽기 → 현재 상태 파악
2. 내 inbox(`to-me`)의 `[OPEN]` 처리
3. 작업 수행
4. `api-contract.md` / `decisions.md` 에 영향 있으면 갱신
5. `status.md` 갱신, 필요 시 상대 inbox에 요청 추가

## 규칙

- **계약 먼저, 구현 나중.** `api-contract.md`에 없는 엔드포인트는 만들지 않는다.
- **비밀값 금지.** `.env`·키·토큰을 문서나 코드에 절대 쓰지 않는다.
- 한 번에 한 주제. 큰 변경은 `decisions.md`에 근거를 남긴다.
- 날짜는 절대표기(YYYY-MM-DD).
- **git 작업은 [`git-conventions.md`](git-conventions.md)를 따른다** (브랜치 네이밍·Conventional Commits·개인 신원·AI 공동저자 미표기).
