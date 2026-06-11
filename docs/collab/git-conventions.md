# Git 컨벤션 (두 에이전트 공통)

두 AI 에이전트(Claude · Backend Agent)는 이 규칙을 따른다.

## 신원
- 이 레포는 **개인 신원**으로만 커밋한다: `Yeonwoo Kim <ppupy1200@gmail.com>`.
- 회사 계정(`*@pntbiz.com`) 금지. 작업 전 `git config user.email` 확인.
- 커밋은 **사용자 본인의 작업으로 기록**한다. **AI 공동저자(Co-Authored-By) 트레일러를 넣지 않는다.**

## 브랜치
- `main`: 항상 빌드 가능한 상태. 초기 베이스라인을 제외하고 직접 커밋하지 않는다.
- 작업 브랜치: `<type>/<scope>-<short-desc>` (kebab-case)
  - 프론트(Claude): `feat/web-*`, `fix/web-*` 등 — 예: `feat/web-hero`
  - 백엔드(Agent): `feat/backend-*`, `fix/backend-*` 등 — 예: `feat/backend-guestbook`
- main에서 분기. 작업 완료 후 사용자 검토 → 머지.

## 커밋 메시지 (Conventional Commits)
- 형식: `<type>(<scope>): <설명>`
- **type:** feat · fix · docs · style · refactor · test · chore · build · ci · perf — **타입 접두사는 영문 유지**
- **scope(선택):** web · backend · docs · infra
- **설명·본문은 한글로 작성.** 제목 72자 이내, 마침표 없음. 본문(선택)에 무엇/왜.
- 예:
  - `feat(web): 히어로 섹션과 성과 지표 스트립 추가`
  - `feat(backend): 방명록 목록·작성 API를 JPA로 구현`
  - `docs(collab): git 컨벤션 추가`

## 병렬 작업 규칙 (충돌 방지)
- **코드는 충돌 없음:** `web/`(프론트)와 `backend/`(백엔드)는 디렉터리가 분리되어, 서로 다른 브랜치에서 **동시에** 작업해도 코드가 겹치지 않는다.
- **유일한 공유 영역은 `docs/collab/*`:**
  - 각자 자기 inbox 파일에 **append** 위주로 쓴다.
  - `status.md`는 작게·자주 갱신. 충돌 나면 양쪽 내용을 모두 보존해 병합.
- 머지 순서는 보통 무관(독립적). 필요 시 사용자가 조율.
