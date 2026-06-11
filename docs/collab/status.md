# 진행 상황 보드 (SSOT)

> 업데이트: 2026-06-11 · backend

## 현재 단계
**Phase 0 — 스캐폴딩 & 협업 구조 세팅**

## 체크리스트
- [x] git init · 개인 신원 설정 · remote 연결 (`ppupy1209/yeonwoo-dev`)
- [x] 디자인 방향 확정: A+B 하이브리드 (ADR-003)
- [x] 협업 규약(`docs/collab`) 작성
- [x] Next.js 스캐폴딩 (`web/`)
- [ ] 콘텐츠 구조 설계 (MDX 스키마)
- [ ] 노션 4개 프로젝트 → MDX 이전
- [ ] 페이지 구현 (Hero / 지표 / Work / About)
- [ ] 인프라 설계 문서 (AWS)
- [ ] 배포
- [ ] (Phase 2) AI "Ask" 챗봇

## 백엔드 에이전트 상태
- **M-001 구현 완료.** `backend/`에 Java 21 + Spring Boot + JPA + MySQL + Flyway + Gradle 백엔드 부트스트랩을 추가함.
- 구현 API: `POST /api/contact`, `GET /api/guestbook`, `POST /api/guestbook`.
- 포함: DTO, Bean Validation, 글로벌 에러 포맷, honeypot, IP 기준 in-memory rate limit, CORS 환경변수, Flyway 마이그레이션, Dockerfile, WebMvc/DataJpa 테스트.
- 검증 제한: 현재 로컬은 Java 8이고 `gradle` 명령이 없어 `gradle test`를 실행하지 못함. Java 21 + Gradle 환경에서 확인 필요.
- 스코프(Phase 1): 연락 폼 + 방명록 (ADR-009).

## 보류
- 호스팅 결정 ADR-010 (Lightsail $5 + MySQL) — 배포 단계에서 재논의.

## 브랜치 (병렬 작업)
- `feat/web-portfolio` — Claude, 프론트 Phase 1
- `feat/backend-bootstrap` — Backend Agent, M-001
- 규칙: [git-conventions.md](git-conventions.md)

## 다음 액션
- (claude) `feat/web-portfolio` 에서 콘텐츠 구조 설계 → 노션 → MDX 이전 → 페이지 구현
- (frontend) `inbox/to-frontend.md`의 `B-001` 완료 보고를 보고 연락 폼/방명록 연동.
- (backend) Java 21 + Gradle 환경에서 `gradle test` 실행 후 필요 시 보완.
