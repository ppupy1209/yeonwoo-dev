# 콘텐츠 모델

`web/content/`는 사이트 콘텐츠의 소스다. (DB 아님 — Git으로 버전관리, ADR-005)

## projects/*.mdx
프로젝트 케이스 스터디. frontmatter(메타) + 본문(MDX).

frontmatter:
- `title` — 제목
- `slug` — URL 경로 (`/work/<slug>`)
- `order` — 정렬 순서
- `summary` — 한 줄 요약 (카드·목록용)
- `role` — 역할
- `stack` — 기술 스택 배열 (태그)
- `metric` — 대표 성과 `{ label, before, after }` (지표 뱃지·스트립용)

본문 구조: **개요 → 문제 → 해결 → 결과.** 아키텍처 다이어그램 컴포넌트는 추후 본문에 삽입.
