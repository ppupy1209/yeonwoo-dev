# API 계약 (Frontend ↔ Backend)

- base URL: TBD (배포 후 확정. 로컬은 `http://localhost:8080`)
- 형식: REST / JSON (UTF-8)
- 인증: 없음 (공개 엔드포인트). 쓰기 엔드포인트는 rate limit + honeypot로 남용 방지.
- CORS: 프론트 오리진만 허용 (환경변수 `APP_CORS_ALLOWED_ORIGINS`).
- 에러 공통 형식: `{ "ok": false, "error": "<code>", "message": "<사람이 읽는 설명>" }`

이 문서는 프론트와 백엔드의 **유일한 기준**이다. 엔드포인트를 추가·변경하려면 먼저 여기서 합의한다.

## 상태 범례
`proposed`(제안) → `agreed`(합의) → `implemented`(구현) → `live`(배포)

---

## Endpoints

### POST `/api/contact` — 연락 폼 전송
- **status:** agreed · **impl owner:** backend · Phase 1
- 요청:
  ```json
  { "name": "string(1..50)", "email": "email", "message": "string(1..2000)", "company": "" }
  ```
  - `company` 는 **honeypot**(봇 유인용 숨김 필드). 값이 차 있으면 봇으로 간주해 `200 {ok:true}` 로 조용히 무시(스팸 저장 안 함).
- 응답 `201`: `{ "ok": true, "id": 123 }`
- 응답 `400`: `{ "ok": false, "error": "validation", "message": "..." }`
- 응답 `429`: rate limit 초과 (IP 기준)
- 비고: JPA 엔티티 `ContactMessage(id, name, email, message, createdAt, ip)` 저장. 메일 발송(SES)은 Phase 1 후반 옵션.

### GET `/api/guestbook` — 방명록 목록 (페이징)
- **status:** agreed · **impl owner:** backend · Phase 1
- 쿼리: `page`(0-base, 기본 0), `size`(기본 10, 최대 50)
- 응답 `200`:
  ```json
  {
    "items": [ { "id": 1, "nickname": "string", "message": "string", "createdAt": "2026-06-11T05:00:00Z" } ],
    "page": 0, "size": 10, "totalElements": 42, "totalPages": 5
  }
  ```
- 정렬: `createdAt` 내림차순.

### POST `/api/guestbook` — 방명록 작성
- **status:** agreed · **impl owner:** backend · Phase 1
- 요청:
  ```json
  { "nickname": "string(1..20)", "message": "string(1..500)", "company": "" }
  ```
  - `company` honeypot 동일 규칙.
- 응답 `201`: `{ "id": 7, "nickname": "...", "message": "...", "createdAt": "..." }`
- 응답 `400` / `429`: 위와 동일 규칙.
- 비고: JPA 엔티티 `GuestbookEntry(id, nickname, message, createdAt, ip)`.

### POST `/api/chat` — Ask AI (RAG 챗봇)
- **status:** proposed (보류) · **Phase 2**
- 비고: 이력서·프로젝트 기반 RAG. 상세 계약은 Phase 2 설계 시 확정.
