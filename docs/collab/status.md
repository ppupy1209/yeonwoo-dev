# 진행 상황 보드 (SSOT)

> 업데이트: 2026-06-11 · claude

## 현재 단계
**Phase 1 — 백엔드 통합 완료 · 프론트 구현 시작**

## 체크리스트
- [x] git init · 개인 신원 설정 · remote 연결 (`ppupy1209/yeonwoo-dev`)
- [x] 디자인 방향 확정: A+B 하이브리드 (ADR-003)
- [x] 협업 규약(`docs/collab`) 작성
- [x] Next.js 스캐폴딩 (`web/`)
- [x] 백엔드 M-001 (연락/방명록 API) 구현 + 리뷰 + main 통합
- [x] API 계약 동기화 (엔드포인트 `implemented`, 제안 2건 반영 ADR-012)
- [ ] 콘텐츠 구조 설계 (MDX 스키마) ← claude 진행 중
- [ ] 노션 4개 프로젝트 → MDX 이전
- [ ] 페이지 구현 (Hero / 지표 / Work / About)
- [ ] 연락 폼 · 방명록 UI ↔ 백엔드 연동
- [ ] 백엔드 빌드/테스트 검증 (JDK 21 + Gradle 환경)
- [ ] 인프라 설계 문서 (AWS)
- [ ] 배포
- [ ] (Phase 2) AI "Ask" 챗봇

## 백엔드 상태
- **M-001 완료 · main 통합됨** (`702266c`). API: `POST /api/contact`, `GET/POST /api/guestbook`.
- 리뷰 양호. 후속 개선 `M-002`를 `inbox/to-backend.md`에 비차단으로 기록.
- 미검증: 로컬이 Java 8 + Gradle 없음 → `gradle test` 미실행. JDK 21 + Gradle 환경에서 확인 필요.

## 보류
- 호스팅 결정 ADR-010 (Lightsail $5 + MySQL) — 배포 단계에서 재논의.

## 브랜치
- `main` — 통합 본선 (스캐폴딩 + 협업문서 + 백엔드 M-001)
- `feat/web-portfolio` — Claude, 프론트 Phase 1 (main 기준 갱신)
- `feat/backend-bootstrap` — 병합 완료
- 규칙: [git-conventions.md](git-conventions.md)

## 다음 액션
- (claude) `feat/web-portfolio`에서 콘텐츠 구조 설계 → 노션 4개 → MDX 이전 → 페이지 구현. 연락/방명록 UI는 계약대로 구현 후, 백엔드 실행 가능 시점에 연동.
- (backend, 비차단) JDK 21 + Gradle 환경에서 `gradle test` 실행, `M-002` 후속 개선.
