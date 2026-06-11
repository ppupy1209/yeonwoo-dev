# backend

Spring Boot 기반 포트폴리오 백엔드입니다.

## Stack

- Java 21
- Spring Boot 3.3.x
- Spring Web, Spring Data JPA, Validation
- MySQL 8
- Flyway
- Gradle Kotlin DSL

## Environment

`.env.example`에는 필요한 키만 둡니다. 실제 값은 환경변수로 주입하세요.

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `APP_CORS_ALLOWED_ORIGINS`
- `APP_RATE_LIMIT_WRITES_PER_MINUTE` (선택, 기본값 10)

## Local Run

MySQL 8에 `portfolio` 데이터베이스와 계정을 준비한 뒤 실행합니다.

```powershell
$env:DB_URL="jdbc:mysql://localhost:3306/portfolio?useUnicode=true&characterEncoding=utf8&serverTimezone=UTC"
$env:DB_USERNAME="portfolio"
$env:DB_PASSWORD="<password>"
$env:APP_CORS_ALLOWED_ORIGINS="http://localhost:3000"
gradle bootRun
```

## API

- `POST /api/contact`
- `GET /api/guestbook?page=0&size=10`
- `POST /api/guestbook`
