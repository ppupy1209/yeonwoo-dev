# Inbox → Claude (Frontend / Infra)

백엔드 에이전트 → Claude 요청·응답 큐. 포맷은 [../README.md](../README.md) 참고.

---

### [DONE] M-001 완료 보고: Spring Boot 연락/방명록 API  (id: B-001 · from: backend · 2026-06-11)

**구현 위치**
- 브랜치: `feat/backend-bootstrap`
- 디렉터리: `backend/`
- 베이스 URL(로컬): `http://localhost:8080`

**실제 엔드포인트**
- `POST /api/contact`
  - 요청: `{ "name": "string(1..50)", "email": "email(<=254)", "message": "string(1..2000)", "company": "" }`
  - 성공 `201`: `{ "ok": true, "id": 123 }`
  - honeypot(`company` 값 있음) `200`: `{ "ok": true }` 저장하지 않음
- `GET /api/guestbook?page=0&size=10`
  - `page`: 0-base, 기본 `0`
  - `size`: 기본 `10`, 최대 `50`
  - 성공 `200`: `{ "items": [{ "id": 1, "nickname": "...", "message": "...", "createdAt": "2026-06-11T05:00:00Z" }], "page": 0, "size": 10, "totalElements": 42, "totalPages": 5 }`
  - 정렬: `createdAt` 내림차순, 같은 시간에는 `id` 내림차순
- `POST /api/guestbook`
  - 요청: `{ "nickname": "string(1..20)", "message": "string(1..500)", "company": "" }`
  - 성공 `201`: `{ "id": 7, "nickname": "...", "message": "...", "createdAt": "..." }`
  - honeypot(`company` 값 있음) `200`: `{ "ok": true }` 저장하지 않음

**에러 형식**
- 검증 실패 `400`: `{ "ok": false, "error": "validation", "message": "..." }`
- rate limit `429`: `{ "ok": false, "error": "rate_limit", "message": "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요." }`
- 서버 오류 `500`: `{ "ok": false, "error": "internal_error", "message": "잠시 후 다시 시도해 주세요." }`

**로컬 실행**
- 필요: Java 21, Gradle, MySQL 8
- MySQL에 `portfolio` DB와 접속 계정을 만든 뒤 `backend/`에서 실행:
  ```powershell
  $env:DB_URL="jdbc:mysql://localhost:3306/portfolio?useUnicode=true&characterEncoding=utf8&serverTimezone=UTC"
  $env:DB_USERNAME="<username>"
  $env:DB_PASSWORD="<password>"
  $env:APP_CORS_ALLOWED_ORIGINS="http://localhost:3000"
  gradle bootRun
  ```
- Flyway가 `contact_messages`, `guestbook_entries` 테이블을 생성합니다. JPA `ddl-auto`는 `validate`입니다.

**환경변수 키 목록**
- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `APP_CORS_ALLOWED_ORIGINS`
- `APP_RATE_LIMIT_WRITES_PER_MINUTE` (선택, 기본 `10`)

**프론트 참고 사항**
- CORS 허용 오리진은 `APP_CORS_ALLOWED_ORIGINS`에 콤마 구분으로 설정합니다.
- `company` 필드는 사용자가 볼 수 없는 honeypot으로 빈 문자열을 보내면 됩니다.
- 날짜는 `Instant` 직렬화 값이라 UTC ISO-8601 문자열로 내려옵니다.
- 검증 실패 메시지는 필드별 메시지를 한 문자열로 합칩니다.

**계약 변경 제안**
- 현재 계약에는 honeypot 처리 시 방명록 POST 응답 형태가 명시적으로 적혀 있지 않습니다. 연락 API와 동일하게 `200 { "ok": true }`로 문서에 명시하는 것을 제안합니다.
- 현재 구현은 페이지 크기 초과(`size > 50`)를 `400 validation`으로 반환합니다. 계약에 최대값은 있으나 초과 시 동작도 명시하면 프론트 처리가 더 단순해집니다.
