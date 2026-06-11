# 의사결정 로그 (ADR)

형식: ID · 날짜 · 상태 · 결정 / 이유

## ADR-001 · 2026-06-11 · accepted
**노션 → 자체 사이트 + AWS 배포.**
사이트 자체가 실력 증명이 되고, 커스텀 기능(추후 AI)과 운영 경험을 얻을 수 있다.

## ADR-002 · 2026-06-11 · accepted
**모노레포 구조** (`web/` 프론트, `backend/` 백엔드, `docs/` 협업·설계).
두 AI 에이전트가 한 레포에서 `docs/collab`을 통해 소통한다.

## ADR-003 · 2026-06-11 · accepted
**디자인: A+B 하이브리드.**
에디토리얼 가독성 + 성과 지표 카드. 강점인 수치(90→60 등)를 첫 화면에 노출.

## ADR-004 · 2026-06-11 · accepted
**프론트 스택: Next.js + TypeScript + Tailwind + App Router + src-dir.**
정적 생성과 추후 AI API 통합이 모두 쉽고, S3+CloudFront/Amplify 배포에 적합.

## ADR-005 · 2026-06-11 · accepted
**콘텐츠: MDX 파일.**
Git 버전관리, 빌드 단순, DB 불필요. 프로젝트·글을 마크다운으로 관리.

## ADR-006 · 2026-06-11 · accepted
**AI "Ask" 챗봇은 Phase 2로 연기.**
우선 정적 포트폴리오를 완성·배포하고 AI는 그 다음.

## ADR-007 · 2026-06-11 · accepted
**역할 분담.**
Claude = 프론트/디자인/인프라/설계/리뷰. Backend Agent = 백엔드 구현.

## ADR-008 · 2026-06-11 · accepted
**백엔드 스택: Java 21 + Spring Boot 3.x + Spring Data JPA + MySQL 8 (Gradle).**
사용자 본인 경험·면접 어필과 일치. 마이그레이션은 Flyway.

## ADR-009 · 2026-06-11 · accepted
**백엔드 스코프(Phase 1): 연락 폼 + 방명록.**
JPA CRUD·페이징·검증을 실제로 보여줄 최소 기능. 로직 복잡도는 낮게.

## ADR-010 · 2026-06-11 · deferred (보류)
**가성비 호스팅(Lightsail $5 + MySQL 안)은 나중에 결정.**
사용자가 호스팅 결정을 뒤로 미룸. 백엔드 코드는 호스팅과 무관하게 진행. 배포 단계 진입 시 재논의.

## ADR-011 · 2026-06-11 · accepted
**Git 컨벤션: Conventional Commits + 브랜치 네이밍(`<type>/<scope>-<desc>`), 개인 신원 커밋, AI 공동저자 미표기.**
두 에이전트가 동일 규칙을 따르고, web/ · backend/ 디렉터리 분리 + 별도 브랜치로 병렬 작업해 충돌을 피한다. 상세: [git-conventions.md](git-conventions.md).
