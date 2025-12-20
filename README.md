# Datepicker API Server

AI 기반 데이트 코스 추천 및 관리 플랫폼의 백엔드 API 서버입니다.

## 프로젝트 개요

이 프로젝트는 NestJS 기반의 REST API 서버로, Perplexity AI를 활용하여 지역, 예산, 관심사를 기반으로 개인화된 데이트 코스를 생성합니다. 사용자는 코스를 검색하고, 북마크하고, 공유할 수 있습니다.

## 주요 기능

- **AI 기반 코스 생성**: Perplexity API를 활용한 맞춤형 데이트 코스 추천
- **Google OAuth 인증**: 간편한 소셜 로그인
- **북마크 시스템**: 마음에 드는 코스 저장
- **조회수 추적**: 사용자별 중복 방지 조회수 카운팅
- **코스 공유**: 인증 없이 특정 코스 공유 가능
- **Swagger API 문서**: 자동 생성된 API 문서

## 기술 스택

### 프레임워크 및 언어
- **NestJS** 11.0.1 - 모던 Node.js 프레임워크
- **TypeScript** 5.7.3 - 타입 안전성

### 데이터베이스 및 ORM
- **PostgreSQL** - 메인 데이터베이스
- **Prisma** 7.1.0 - ORM
- **Prisma Accelerate** - 커넥션 풀링/캐싱
- **Supabase** - 관리형 PostgreSQL

### 인증
- **Passport.js** - HTTP Bearer Token 전략
- **Google OAuth** - Google ID 토큰 인증

### 외부 서비스
- **Perplexity AI API** - AI 코스 생성
- **Axios** 4.0.1 - HTTP 클라이언트

### 검증 및 문서화
- **class-validator** - DTO 유효성 검사
- **class-transformer** - 데이터 변환
- **Swagger/OpenAPI** - API 문서 자동 생성

### 개발 도구
- **Jest** - 테스트 프레임워크
- **ESLint** - 코드 린팅
- **Prettier** - 코드 포맷팅

## 프로젝트 구조

```
src/
├── main.ts                          # 애플리케이션 진입점
├── app.module.ts                    # 루트 모듈
├── app.controller.ts                # 메모리 상태 API
├── @types/                          # TypeScript 타입 정의
│   ├── index.d.ts
│   ├── perplexity.d.ts
│   └── passport/
├── common/                          # 공통 유틸리티
│   ├── guard.ts                     # Bearer 인증 가드
│   ├── strategy.ts                  # Passport 전략
│   └── public.decorator.ts          # Public 데코레이터
└── modules/                         # 기능별 모듈
    ├── auth/                        # 인증 모듈
    │   ├── auth.controller.ts
    │   ├── auth.service.ts
    │   └── dtos/
    ├── users/                       # 사용자 모듈
    │   ├── users.controller.ts
    │   ├── users.service.ts
    │   └── dtos/
    └── date-courses/                # 데이트 코스 모듈
        ├── date-courses.controller.ts
        ├── date-courses.service.ts
        └── dtos/

libs/
└── prisma/src/                      # Prisma 모듈
    ├── prisma.service.ts
    └── generated/

prisma/
├── schema.prisma                    # 데이터베이스 스키마
└── migrations/                      # 마이그레이션 파일
```

## 데이터베이스 스키마

### 주요 모델

- **User**: 사용자 정보 (이메일, 이름, 지역, 관심사, 예산)
- **Account**: 소셜 로그인 계정 (Google, Kakao, Naver)
- **Token**: Bearer 인증 토큰
- **Course**: 데이트 코스 (제목, 설명, 지역, 예산, 조회수)
- **Place**: 코스 내 장소 (순서, 장소명, 설명, 링크)
- **Bookmark**: 사용자의 북마크
- **ViewLog**: 조회 기록 (사용자당 1회)

## API 엔드포인트

### 인증 (POST)

- `POST /auth/google/login` - Google OAuth 로그인/회원가입
  - 입력: Google ID 토큰 + 사용자 ID
  - 출력: 인증 토큰 + 사용자 프로필

### 사용자 (Bearer 토큰 필요)

- `GET /users/me` - 현재 사용자 프로필 조회
- `PUT /users/me` - 사용자 프로필 업데이트

### 데이트 코스

**Public (인증 불필요)**
- `GET /date-courses/:id/share` - 코스 공유/조회

**Protected (Bearer 토큰 필요)**
- `GET /date-courses` - 코스 목록 조회 (정렬, 페이지네이션)
- `GET /date-courses/bookmarks` - 북마크한 코스 조회
- `POST /date-courses` - AI 기반 코스 생성
- `POST /date-courses/:id/views` - 조회수 증가
- `POST /date-courses/:id/bookmark` - 북마크 추가/제거

### 기타

- `GET /` - 서버 메모리 상태 조회
- `GET /api-docs` - Swagger API 문서

## 환경 변수 설정

`.env` 파일에 다음 변수를 설정하세요:

```env
DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=YOUR_API_KEY"
DIRECT_URL="postgresql://user:password@host:port/database"
PERPLEXITY_API_KEY="your-perplexity-api-key"
PORT=3000
```

## 설치 및 실행

### 설치

```bash
npm install
```

### Prisma 클라이언트 생성

```bash
npx prisma generate
```

### 데이터베이스 마이그레이션

```bash
npx prisma migrate deploy
```

### 개발 모드 실행

```bash
npm run start:dev
```

### 프로덕션 빌드

```bash
npm run build
npm run start
```

### 테스트

```bash
# 유닛 테스트
npm run test

# E2E 테스트
npm run test:e2e

# 커버리지
npm run test:cov
```

## AI 코스 생성 프로세스

1. 사용자가 지역, 예산(만원 단위), 관심사, 선택적으로 날씨 정보 입력
2. 시스템이 Perplexity AI를 위한 상세 프롬프트 생성
3. Perplexity API(sonar 모델)가 코스 추천 생성
4. AI가 실제 존재하고 검증된 장소만 필터링 (SNS 트렌딩 우선)
5. 3-5개 장소와 설명, 링크가 포함된 구조화된 JSON 반환
6. 데이터베이스에 코스와 장소 저장

### AI 프롬프트 전략

- SNS 트렌딩 장소 우선 (Instagram, 소셜 미디어)
- 다중 출처 검증 요구
- 신뢰할 수 없는 결과 필터링
- 필요시 인근 지역으로 검색 확장
- 가짜/존재하지 않는 장소 방지
- 문제가 있는 도메인 제외 (예: trip.com)

## 인증 및 보안

### 인증 방식

1. **Google OAuth**: Google ID 토큰을 통한 사용자 인증
2. **Bearer Token**: 데이터베이스에 저장된 랜덤 hex 토큰으로 세션 유지
3. **Passport HTTP Bearer**: 모든 보호된 라우트에서 토큰 검증

### CORS 설정

- 허용 도메인:
  - `http://localhost:5173` (개발)
  - `https://date-picker-share-web.vercel.app` (프로덕션)
- Credentials: 활성화
- 메서드: GET, POST, PUT, PATCH, DELETE

## 배포

이 프로젝트는 Vercel에 배포되어 있습니다.

### 빌드 프로세스

1. Pre-build: `prisma generate`
2. NestJS 컴파일
3. Vercel 자동 배포

## API 문서

서버 실행 후 다음 URL에서 Swagger 문서를 확인할 수 있습니다:

```
http://localhost:3000/api-docs
```

## 프론트엔드

- 프로덕션: `https://date-picker-share-web.vercel.app`
- 개발: `http://localhost:5173` (Vite)

