# 아키텍처 & 인프라 설계

> 작성 예정 — Phase 1 후반 (배포 단계)

## 예정 내용
- **호스팅:** S3 + CloudFront (정적) vs Amplify Hosting — 비교 후 확정
- **CI/CD:** GitHub Actions (빌드 → 배포)
- **도메인 / TLS:** Route 53 + ACM (선택)
- **(Phase 2) AI 백엔드:** Lambda + API Gateway, 비밀값은 SSM / Secrets Manager
- **비용 추정**

## 사이트 자체 아키텍처 다이어그램
프로젝트별 아키텍처 다이어그램은 포트폴리오 콘텐츠의 일부로 `web/` 내에서 관리한다(이 문서는 사이트 운영 인프라용).
