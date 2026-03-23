# 🗺️ Invoice Web MVP - 개발 로드맵

**버전**: 1.0.0
**작성일**: 2026-03-23
**상태**: 진행 중 🔄

---

## 📌 프로젝트 개요

Invoice Web MVP는 노션에 입력된 견적서를 클라이언트가 웹에서 직접 조회하고 PDF로 다운로드받을 수 있는 웹 애플리케이션입니다. Next.js 15.5.3과 React 19 기반의 모던 웹 스택으로 구축되며, 토큰 기반 인증을 통해 보안을 강화합니다.

**주요 목표**:

- 견적서 공유 프로세스 자동화 (70% 시간 단축)
- 클라이언트 온디맨드 PDF 다운로드 제공
- 안전한 접근 제어 및 권한 관리

**예상 일정**: 10일 (MVP 완성)
**팀 규모**: 소규모 (1-2명)
**성공 기준**: 모든 P0 기능 완성 + 성능 SLA 달성 + 보안 검사 통과

---

## 🎯 크리티컬 패스

```
Phase 1: 프로젝트 구조 설정 (Day 1)
    ↓
Phase 2: 공통 모듈 구현 (Day 2)
    ↓
Phase 3: 기능 구현 - UI (Day 3-4) ─────────────────┐
    ↓                                              │
Phase 4: 기능 구현 - 데이터/API + Notion 연동 (Day 5-6) │ (병렬 가능)
    ↓                                              │
Phase 5: 기능 구현 - 인증 (Day 6-7) ◄──────────────┘
    ↓
Phase 6: 기능 구현 - PDF (Day 7-8)
    ↓
Phase 7: 통합 테스트 & 최적화 (Day 8-9)
    ↓
Phase 8: 배포 & 마무리 (Day 9-10)
```

**병렬 처리 가능 작업**:

- Phase 3 (UI)과 Phase 4 (API 설계) - Day 3-5 병렬 진행 가능
- Phase 7에서 E2E 테스트와 성능 최적화 동시 진행

---

## 📋 Phase 별 상세 계획

---

### Phase 1: 프로젝트 구조 설정

**우선순위**: P0 | **기간**: 1일 (Day 1)

#### 목표

- 프로젝트 초기화 및 폴더 구조 완성
- 개발 환경 및 도구 설정
- 환경 변수 및 CI/CD 기초 구성

#### 작업 항목

| #   | 작업                                                     | 우선순위 | 예상 시간 | 담당 | 상태 |
| --- | -------------------------------------------------------- | -------- | --------- | ---- | ---- |
| 1.1 | Next.js 프로젝트 초기화 및 의존성 설치                   | P0       | 30분      | Dev  | -    |
| 1.2 | TailwindCSS & shadcn/ui 컴포넌트 설정                    | P0       | 45분      | Dev  | -    |
| 1.3 | TypeScript 설정 및 ESLint/Prettier 구성                  | P0       | 45분      | Dev  | -    |
| 1.4 | 프로젝트 폴더 구조 생성 (app/components/lib/types/tests) | P0       | 30분      | Dev  | -    |
| 1.5 | 환경 변수 파일 구성 (.env.local, .env.example)           | P0       | 30분      | Dev  | -    |
| 1.6 | Git 저장소 설정 및 branch strategy 수립                  | P1       | 30분      | Dev  | -    |
| 1.7 | Husky + lint-staged pre-commit 훅 설정                   | P1       | 30분      | Dev  | -    |

#### 선행 조건

- Node.js 18+ 설치
- Git 설정 완료

#### 산출물

- 실행 가능한 Next.js 개발 서버 (`npm run dev`)
- `.eslintrc.json`, `.prettierrc` 설정 완료
- `.env.local`, `.env.example` (NOTION_API_KEY, NOTION_DATABASE_ID, JWT_SECRET 포함)
- `src/` 폴더 골격 (app, components, lib, types, tests)

#### 성공 기준 (Definition of Done)

- [ ] `npm run dev` 실행 후 로컬 개발 서버 정상 작동
- [ ] `npm run check-all` 통과 (빈 프로젝트 기준)
- [ ] Git 초기 커밋 완료
- [ ] 환경 변수 스켈레톤 확인

---

### Phase 2: 공통 모듈 구현

**우선순위**: P0 | **기간**: 1일 (Day 2)

#### 목표

- 공통 TypeScript 타입 및 Zod 스키마 정의
- 유틸리티 함수 및 상수 구현
- API 클라이언트 기초 완성
- 단위 테스트 환경 설정

#### 작업 항목

| #   | 작업                                                                    | 우선순위 | 예상 시간 | 담당 | 상태 |
| --- | ----------------------------------------------------------------------- | -------- | --------- | ---- | ---- |
| 2.1 | 공통 TypeScript 타입 정의 (Invoice, InvoiceItem, Token, CompanyInfo 등) | P0       | 1시간     | Dev  | -    |
| 2.2 | Zod 검증 스키마 작성 (invoiceSchema, tokenSchema, apiResponseSchema)    | P0       | 1시간     | Dev  | -    |
| 2.3 | 유틸리티 함수 작성 (포맷팅: 금액/날짜, 검증, 헬퍼)                      | P0       | 1시간     | Dev  | -    |
| 2.4 | 상수 정의 (API_ROUTES, ERROR_MESSAGES, PDF_CONFIG 등)                   | P0       | 30분      | Dev  | -    |
| 2.5 | HTTP API 클라이언트 기초 구현 (fetch wrapper, 에러 처리)                | P0       | 45분      | Dev  | -    |
| 2.6 | Notion API 클라이언트 기초 구현 (인증, 기본 요청 구조)                  | P0       | 1시간     | Dev  | -    |
| 2.7 | Vitest/Jest 단위 테스트 환경 설정                                       | P1       | 30분      | Dev  | -    |
| 2.8 | 공통 모듈 단위 테스트 작성 (유틸리티 함수, Zod 스키마)                  | P1       | 1시간     | Dev  | -    |

#### 선행 조건

- Phase 1 완료 (프로젝트 초기화, 폴더 구조)

#### 산출물

- `src/types/invoice.ts` - Invoice, InvoiceItem, CompanyInfo, AccessToken 인터페이스
- `src/types/auth.ts` - 인증 관련 타입
- `src/types/api.ts` - API 응답 타입 (ApiResponse, ApiError)
- `src/lib/schemas/invoice.ts` - Zod 스키마
- `src/lib/schemas/auth.ts` - 토큰 검증 스키마
- `src/lib/utils.ts` - 공통 유틸 (formatCurrency, formatDate, cn 등)
- `src/lib/constants.ts` - 상수
- `src/lib/api-client.ts` - HTTP 클라이언트
- `src/lib/notion/client.ts` - Notion API 클라이언트 기초
- `src/tests/unit/utils.test.ts` - 유틸 단위 테스트
- `src/tests/unit/schemas.test.ts` - Zod 스키마 테스트

#### 성공 기준 (Definition of Done)

- [ ] 모든 타입 TypeScript 컴파일 오류 없음
- [ ] Zod 스키마 유효성 검사 정상 작동
- [ ] 단위 테스트 통과 (커버리지 기준 수립)
- [ ] `npm run check-all` 통과

---

### Phase 3: 기능 구현 - UI

**우선순위**: P0 | **기간**: 2일 (Day 3-4)

#### 목표

- 랜딩 페이지(홈) 완성
- 견적서 상세 페이지 UI 구현
- 공통 레이아웃 및 컴포넌트 개발

#### 작업 항목

| #    | 작업                                                | 우선순위 | 예상 시간 | 담당 | 상태 |
| ---- | --------------------------------------------------- | -------- | --------- | ---- | ---- |
| 3.1  | 루트 레이아웃 & 글로벌 스타일 설정                  | P0       | 45분      | UI   | -    |
| 3.2  | Header & Footer 컴포넌트 구현                       | P0       | 1시간     | UI   | -    |
| 3.3  | 홈 페이지(랜딩) UI 작성 (더미 데이터 기반)          | P0       | 1.5시간   | UI   | -    |
| 3.4  | 견적서 상세 페이지 레이아웃 구현                    | P0       | 2시간     | UI   | -    |
| 3.5  | InvoiceCard 컴포넌트 작성                           | P0       | 1시간     | UI   | -    |
| 3.6  | InvoiceTable 컴포넌트 작성 (항목, 소계, 세금, 합계) | P0       | 1.5시간   | UI   | -    |
| 3.7  | Loading Skeleton 컴포넌트 구현                      | P1       | 1시간     | UI   | -    |
| 3.8  | 에러 페이지 UI (error.tsx, not-found.tsx)           | P1       | 1시간     | UI   | -    |
| 3.9  | 반응형 디자인 적용 (모바일/태블릿/데스크톱)         | P1       | 1.5시간   | UI   | -    |
| 3.10 | 색상 팔레트 및 타이포그래피 시스템 정리             | P1       | 45분      | UI   | -    |

#### 선행 조건

- Phase 1 완료 (프로젝트 초기화)
- Phase 2 완료 (공통 타입, 유틸리티)
- shadcn/ui 컴포넌트 설정 완료

#### 산출물

- `src/components/layout/header.tsx`
- `src/components/layout/footer.tsx`
- `src/components/layout/container.tsx`
- `src/app/page.tsx` - 홈 페이지
- `src/app/invoices/[invoiceId]/page.tsx` - 상세 페이지
- `src/components/invoice/invoice-card.tsx`
- `src/components/invoice/invoice-table.tsx`
- `src/components/shared/loading-skeleton.tsx`
- 반응형 스타일 적용

#### 성공 기준 (Definition of Done)

- [ ] 홈 페이지 UI 완성 (더미 데이터 표시)
- [ ] 견적서 상세 페이지 UI 완성
- [ ] 모든 주요 컴포넌트 독립적으로 작동
- [ ] 모바일/태블릿/데스크톱 반응형 확인
- [ ] `npm run check-all` 통과 (린트, 타입 체크)

---

### Phase 4: 기능 구현 - 데이터/API (Notion API 연동 포함)

**우선순위**: P0 | **기간**: 2일 (Day 5-6)

#### 목표

- 더미 데이터 기반 API 라우트 구현
- Notion API 클라이언트 실제 연동
- 페이지와 API 연동 (데이터 소스 선택 기능)
- 로딩/에러 상태 관리

#### 작업 항목

| #    | 작업                                                             | 우선순위 | 예상 시간 | 담당 | 상태 |
| ---- | ---------------------------------------------------------------- | -------- | --------- | ---- | ---- |
| 4.1  | 더미 데이터셋 구성 (mock-invoices.json)                          | P0       | 1시간     | Dev  | -    |
| 4.2  | 견적서 목록 조회 API 라우트 (`GET /api/invoices`)                | P0       | 1시간     | Dev  | -    |
| 4.3  | 견적서 상세 조회 API (`GET /api/invoices/:id`)                   | P0       | 1시간     | Dev  | -    |
| 4.4  | **[신규] Notion API 연동 - 데이터베이스 조회 구현**              | P0       | 2시간     | Dev  | -    |
| 4.5  | **[신규] Notion 데이터 → Invoice 타입 변환 로직**                | P0       | 1.5시간   | Dev  | -    |
| 4.6  | **[신규] API 라우트에 Notion 데이터 소스 연결**                  | P0       | 1시간     | Dev  | -    |
| 4.7  | **[신규] 더미 → Notion 데이터 소스 전환 플래그 (USE_MOCK_DATA)** | P0       | 30분      | Dev  | -    |
| 4.8  | 로딩 상태 구현 (React Suspense + Skeleton)                       | P1       | 1시간     | Dev  | -    |
| 4.9  | 에러 바운더리 구현                                               | P1       | 1시간     | Dev  | -    |
| 4.10 | API 응답 캐싱 전략 수립 및 적용 (Next.js cache/revalidate)       | P1       | 1시간     | Dev  | -    |
| 4.11 | API 라우트 단위 테스트 작성                                      | P1       | 1시간     | Dev  | -    |

#### 선행 조건

- Phase 1 완료 (프로젝트 초기화)
- Phase 2 완료 (공통 타입, Notion 클라이언트 기초)
- Phase 3 완료 (UI 컴포넌트)

#### 산출물

- `src/data/mock-invoices.json` - 더미 데이터
- `src/app/api/invoices/route.ts` - 목록 조회
- `src/app/api/invoices/[id]/route.ts` - 상세 조회
- `src/lib/notion/invoice-fetcher.ts` - Notion DB 조회
- `src/lib/notion/data-transformer.ts` - Notion → Invoice 변환
- `src/lib/notion/client.ts` 완성 (기초 → 실제 연동)
- `src/components/shared/error-boundary.tsx`
- `src/app/error.tsx` - 에러 페이지
- `src/tests/unit/notion-transformer.test.ts` - Notion 변환 로직 테스트
- `src/tests/unit/api-routes.test.ts` - API 라우트 테스트

#### 성공 기준 (Definition of Done)

- [ ] 더미 데이터 API 정상 작동 (응답 < 500ms)
- [ ] Notion API 연동 성공 (실제 데이터 조회 확인)
- [ ] USE_MOCK_DATA=false 시 Notion 데이터 표시 확인
- [ ] 캐싱 정책 적용 완료
- [ ] API 라우트 단위 테스트 통과
- [ ] 로딩/에러 상태 UI 표시 확인

---

### Phase 5: 기능 구현 - 인증

**우선순위**: P0 | **기간**: 1.5일 (Day 6-7)

#### 목표

- 토큰 기반 인증 시스템 구현
- 비밀번호 인증 로직 (선택)
- 권한 검증 미들웨어 구현

#### 작업 항목

| #   | 작업                                            | 우선순위 | 예상 시간 | 담당 | 상태 |
| --- | ----------------------------------------------- | -------- | --------- | ---- | ---- |
| 5.1 | JWT 토큰 생성 & 검증 로직 구현                  | P0       | 1.5시간   | Dev  | -    |
| 5.2 | 토큰 저장소 관리 (cookies 기반, HttpOnly)       | P0       | 1시간     | Dev  | -    |
| 5.3 | Next.js 인증 미들웨어 구현 (middleware.ts)      | P0       | 1.5시간   | Dev  | -    |
| 5.4 | 접근 권한 검증 로직 (invoiceId ↔ token 매핑)    | P0       | 1시간     | Dev  | -    |
| 5.5 | 인증 실패 페이지 UI (unauthorized)              | P0       | 1시간     | UI   | -    |
| 5.6 | 비밀번호 인증 폼 구현 (선택)                    | P1       | 1.5시간   | UI   | -    |
| 5.7 | Rate Limiting 기본 설정                         | P1       | 1시간     | Dev  | -    |
| 5.8 | CORS 설정 및 보안 헤더 추가                     | P1       | 45분      | Dev  | -    |
| 5.9 | 인증 로직 단위 테스트 작성 (JWT 생성/검증/만료) | P1       | 1시간     | Dev  | -    |

#### 선행 조건

- Phase 1 완료 (프로젝트 초기화)
- Phase 2 완료 (공통 타입, 유틸리티)
- Phase 4 완료 (API 구현)

#### 산출물

- `src/lib/auth/jwt.ts` - JWT 로직
- `src/lib/auth/tokens.ts` - 토큰 관리
- `src/middleware.ts` - Next.js 미들웨어
- `src/lib/auth/verify-access.ts` - 권한 검증
- `src/app/auth/unauthorized/page.tsx` - 접근 거부 페이지
- `src/app/auth/login/page.tsx` - 로그인 페이지 (선택)
- API 라우트 보안 적용

#### 성공 기준 (Definition of Done)

- [ ] JWT 토큰 생성 및 검증 완료
- [ ] 미들웨어가 인증 체크 후 리다이렉트 확인
- [ ] 유효한 토큰으로 접근 가능 확인
- [ ] 무효한 토큰 또는 만료된 토큰 거부 확인
- [ ] CORS 및 보안 헤더 설정 완료
- [ ] 로그인 실패 시 적절한 에러 메시지 표시

---

### Phase 6: 기능 구현 - PDF

**우선순위**: P0 | **기간**: 1.5일 (Day 7-8)

#### 목표

- PDF 생성 라이브러리 선정 및 설정
- PDF 다운로드 API 구현
- 클라이언트 다운로드 기능 완성

#### 작업 항목

| #   | 작업                                                   | 우선순위 | 예상 시간 | 담당 | 상태 |
| --- | ------------------------------------------------------ | -------- | --------- | ---- | ---- |
| 6.1 | PDF 라이브러리 평가 및 선정 (jsPDF vs puppeteer)       | P0       | 1시간     | Dev  | -    |
| 6.2 | PDF 생성 유틸리티 함수 작성                            | P0       | 2시간     | Dev  | -    |
| 6.3 | PDF 레이아웃 템플릿 구현 (PRD 4.2.2 사양 준수)         | P0       | 1.5시간   | Dev  | -    |
| 6.4 | PDF 다운로드 API 라우트 (`POST /api/invoices/:id/pdf`) | P0       | 1.5시간   | Dev  | -    |
| 6.5 | PDFDownloadButton 컴포넌트 구현                        | P0       | 1시간     | UI   | -    |
| 6.6 | 다운로드 로딩 상태 & 에러 처리 UI                      | P0       | 1시간     | UI   | -    |
| 6.7 | 한글 폰트 지원 설정 (Noto Sans KR 임베딩)              | P1       | 45분      | Dev  | -    |
| 6.8 | PDF 파일명 규칙 적용 (invoice*{id}*{yyyyMMdd}.pdf)     | P1       | 30분      | Dev  | -    |
| 6.9 | PDF 생성 단위 테스트 작성 (파일 크기, 구조 검증)       | P1       | 1시간     | Dev  | -    |

#### 선행 조건

- Phase 1 완료 (프로젝트 초기화)
- Phase 2 완료 (공통 타입)
- Phase 4 완료 (API 구조)
- Phase 5 완료 (인증)

#### 산출물

- `src/lib/pdf/pdf-generator.ts` - PDF 생성 유틸리티
- `src/lib/pdf/templates.ts` - PDF 레이아웃 템플릿
- `src/lib/pdf/fonts.ts` - 한글 폰트 설정
- `src/app/api/invoices/[id]/pdf/route.ts` - PDF 다운로드 API 라우트
- `src/components/invoice/pdf-download-button.tsx` - PDF 다운로드 버튼
- `src/tests/unit/pdf-generator.test.ts` - PDF 생성 단위 테스트

#### 성공 기준 (Definition of Done)

- [ ] PDF 생성 단위 테스트 통과
- [ ] PDF 다운로드 API 응답 시간 < 5초
- [ ] 한글 정상 렌더링 확인
- [ ] 파일 크기 < 2MB 확인
- [ ] 파일명 규칙 준수 확인
- [ ] 다운로드 버튼 클릭 시 PDF 자동 다운로드 동작

---

### Phase 7: 통합 테스트 & 최적화

**우선순위**: P1 | **기간**: 1.5일 (Day 8-9)

#### 목표

- E2E 테스트 작성 (주요 사용자 플로우)
- 단위 테스트 최종 실행 및 통합
- 성능 최적화
- 보안 검사 및 수정

#### 작업 항목

| #    | 작업                                              | 우선순위 | 예상 시간 | 담당 | 상태 |
| ---- | ------------------------------------------------- | -------- | --------- | ---- | ---- |
| 7.1  | Playwright E2E 테스트 환경 설정                   | P1       | 1시간     | QA   | -    |
| 7.2  | 견적서 조회 E2E 테스트 (홈 → 상세 페이지 플로우)  | P1       | 1.5시간   | QA   | -    |
| 7.3  | 인증 & 권한 E2E 테스트 (토큰 유효/무효 케이스)    | P1       | 1.5시간   | QA   | -    |
| 7.4  | PDF 다운로드 E2E 테스트                           | P1       | 1시간     | QA   | -    |
| 7.5  | 전체 단위 테스트 최종 실행 & 커버리지 리포트 생성 | P1       | 1시간     | Dev  | -    |
| 7.6  | 성능 측정 (Core Web Vitals, API 응답 시간)        | P1       | 1시간     | Dev  | -    |
| 7.7  | 이미지 최적화 (Next.js Image 컴포넌트)            | P1       | 1시간     | Dev  | -    |
| 7.8  | 코드 분할 및 동적 import 적용                     | P1       | 45분      | Dev  | -    |
| 7.9  | 보안 취약점 점검 (OWASP Top 10 체크리스트)        | P1       | 1시간     | Dev  | -    |
| 7.10 | 에러 로깅 기초 구성                               | P1       | 1시간     | Dev  | -    |

#### 선행 조건

- Phase 2-6 완료 (모든 기능 구현)

#### 산출물

- `tests/e2e/invoice-flow.spec.ts` - 견적서 조회/인증/PDF 다운로드 E2E 테스트
- `tests/e2e/auth-flow.spec.ts` - 인증 플로우 E2E 테스트
- `tests/e2e/pdf-download.spec.ts` - PDF 다운로드 E2E 테스트
- 단위 테스트 커버리지 리포트 (목표: > 80%)
- 성능 측정 리포트
- 보안 체크리스트 완성본

#### 성공 기준 (Definition of Done)

- [ ] E2E 테스트 100% 통과
- [ ] 단위 테스트 커버리지 > 80%
- [ ] LCP < 2.5초, FID < 100ms, CLS < 0.1
- [ ] API 응답 < 500ms, PDF 생성 < 5초
- [ ] `npm run check-all` 모두 통과

---

### Phase 8: 배포 & 마무리

**우선순위**: P0 | **기간**: 1일 (Day 9-10)

#### 목표

- 프로덕션 배포 준비
- 배포 후 모니터링 및 검증
- 문서화 완료

#### 작업 항목

| #   | 작업                              | 우선순위 | 예상 시간 | 담당   | 상태 |
| --- | --------------------------------- | -------- | --------- | ------ | ---- |
| 8.1 | 프로덕션 환경 변수 설정           | P0       | 30분      | DevOps | -    |
| 8.2 | 빌드 및 배포 스크립트 작성        | P0       | 1시간     | DevOps | -    |
| 8.3 | 호스팅 플랫폼 배포 (Vercel 권장)  | P0       | 1시간     | DevOps | -    |
| 8.4 | 배포 후 smoke test 실행           | P0       | 45분      | QA     | -    |
| 8.5 | 에러 로그 및 성능 모니터링 확인   | P1       | 30분      | Dev    | -    |
| 8.6 | API 문서 작성                     | P1       | 1.5시간   | Doc    | -    |
| 8.7 | 사용자 가이드 및 운영 매뉴얼 작성 | P1       | 1시간     | Doc    | -    |
| 8.8 | 배포 후 버그 패치 & 최적화        | P1       | 진행 중   | Dev    | -    |

#### 선행 조건

- Phase 1-7 완료 (모든 기능, 테스트, 최적화)

#### 산출물

- `.env.production` - 프로덕션 환경 변수
- 배포 스크립트
- `docs/API.md` - API 문서
- `docs/USER-GUIDE.md` - 사용자 가이드
- `docs/OPERATIONS.md` - 운영 매뉴얼
- 프로덕션 URL

#### 성공 기준 (Definition of Done)

- [ ] 프로덕션 배포 완료
- [ ] 프로덕션 환경에서 모든 기능 정상 작동
- [ ] 성능 메트릭 SLA 달성
- [ ] 에러율 < 0.1%
- [ ] 모니터링 대시보드 구성
- [ ] API 문서 완성
- [ ] 사용자 가이드 완성

---

## ⏱️ 마일스톤 타임라인

```
┌─────────────────────────────────────────────────────────────┐
│ M1: 프로젝트 구조 설정 (Day 1)                                │
│ ✓ 개발 환경, 폴더 구조, 환경 변수 스켈레톤                    │
├─────────────────────────────────────────────────────────────┤
│ M2: 공통 모듈 완성 (Day 2)                                    │
│ ✓ 타입 정의, Zod 스키마, 유틸, Notion 클라이언트 기초        │
├─────────────────────────────────────────────────────────────┤
│ M3: UI 구현 완성 (Day 4)                                      │
│ ✓ 홈 페이지, 상세 페이지, 컴포넌트, 반응형                    │
├─────────────────────────────────────────────────────────────┤
│ M4: 데이터 연동 완성 (Day 6)                                  │
│ ✓ API 라우트, Notion API 연동, 더미↔실제 전환 플래그         │
├─────────────────────────────────────────────────────────────┤
│ M5: 인증 & PDF 완성 (Day 8)                                   │
│ ✓ JWT 인증, 미들웨어, PDF 생성/다운로드                      │
├─────────────────────────────────────────────────────────────┤
│ M6: 테스트 & 최적화 완성 (Day 9)                              │
│ ✓ E2E 테스트, 단위테스트 80%+, Core Web Vitals               │
├─────────────────────────────────────────────────────────────┤
│ M7: 배포 완료 (Day 10)                                        │
│ ✓ 프로덕션 배포, 문서화, 모니터링                             │
└─────────────────────────────────────────────────────────────┘
```

### 주요 체크포인트

| 마일스톤 | 일시   | 검증 항목                               | 담당   |
| -------- | ------ | --------------------------------------- | ------ |
| M1 완료  | Day 1  | `npm run dev` 정상, 환경 변수 설정 완료 | Dev    |
| M2 완료  | Day 2  | 타입 정의, Zod 스키마, 단위 테스트 환경 | Dev    |
| M3 완료  | Day 4  | 모든 페이지 UI 렌더링, 반응형 확인      | UI     |
| M4 완료  | Day 6  | API 호출 성공, Notion 데이터 표시 확인  | Dev    |
| M5 완료  | Day 8  | 인증 작동, PDF 다운로드 성공            | Dev    |
| M6 완료  | Day 9  | E2E 테스트 통과, 성능 SLA 달성          | QA     |
| M7 완료  | Day 10 | 프로덕션 배포, 모든 기능 정상           | DevOps |

---

## 🚨 위험 요소 & 완화 전략

### 기술적 위험

#### 1. PDF 라이브러리 선택 위험

**위험**: jsPDF vs puppeteer 중 선택 미루기로 인한 일정 지연
**완화 전략**:

- Day 1에 두 라이브러리 비교 평가 (30분)
- jsPDF: 가볍고 빠름 (권장) → Phase 1 MVP 사용
- puppeteer: 정확한 렌더링 → Phase 2 고급 기능

#### 2. 한글 폰트 렌더링 문제

**위험**: PDF에서 한글이 깨지거나 표시 안 됨
**완화 전략**:

- Phase 5에 폰트 지원 테스트 포함 (45분)
- Noto Sans KR 사전 로드
- 폰트 인코딩 검증 로직 추가

#### 3. Notion API 연동 복잡성

**위험**: Notion API 연동 시 데이터 변환 오류, 레이트 제한, 네트워크 문제
**완화 전략**:

- Phase 2: Notion 클라이언트 기초 구현 (인증, 요청 구조)
- Phase 4: 실제 Notion API 연동 (2시간) + 데이터 변환 로직 (1.5시간)
- USE_MOCK_DATA 플래그로 더미 ↔ 실제 데이터 전환 가능
- 별도 샌드박스 환경에서 사전 테스트

#### 4. 성능 저하

**위험**: PDF 생성이 오래 걸려 사용자 경험 악화
**완화 전략**:

- 비동기 처리 (Server Actions)
- 로딩 인디케이터 표시
- 캐싱 전략 (생성된 PDF 임시 저장)
- 성능 측정 (Day 6에 Core Web Vitals 확인)

### 운영적 위험

#### 1. 일정 지연

**위험**: 예상보다 개발이 길어져 Day 10 배포 미달
**완화 전략**:

- 매일 진도 체크 (데일리 standup)
- P0 기능 우선 완성
- 필요시 P1 기능은 Phase 2로 연기

#### 2. 리소스 부족

**위험**: 팀원이 다른 업무로 분산되어 개발 중단
**완화 전략**:

- 역할 분담 명확화 (UI 담당, Dev 담당)
- 병렬 처리 가능 작업 극대화
- 문서화로 온보딩 시간 단축

#### 3. 요구사항 변경

**위험**: 개발 중 비즈니스 요구사항이 바뀜
**완화 전략**:

- Phase 1은 고정 (변경 불허)
- Phase 2+에 대한 요구사항만 유연 대응
- 변경사항은 로드맵에 문서화

---

## 📊 기술 의존성 매트릭스

```
Phase 1: 프로젝트 구조 설정
    ↓
Phase 2: 공통 모듈 구현 (타입/유틸/Notion클라이언트 기초)
    ↓
Phase 3: UI 구현 ─────────────────────────┐
    ↓                                     │
Phase 4: 데이터/API (Notion API 연동) ←─┤ (병렬 가능)
    ↓                                     │
Phase 5: 인증 구현 ◄─────────────────────┘
    ↓
Phase 6: PDF 구현
    ↓
Phase 7: 통합 테스트 & 최적화 (E2E + 단위테스트 통합 + 성능)
    ↓
Phase 8: 배포 & 마무리
```

**핵심 의존성**:

- Phase 2 완료 → Phase 3, 4 시작 가능 (타입/스키마 필요)
- Phase 3 최소 완성 → Phase 4 API 연동 시작 (UI 구조 필요)
- Phase 4 완료 → Phase 5 시작 (API 구조 필요)
- Phase 5 완료 → Phase 6 시작 (인증 미들웨어 필요)
- Phase 3-6 모두 완료 → Phase 7 시작

**병렬 처리 가능**:

- Phase 3 (UI) ↔ Phase 4 (API 설계) - Day 3-5 동시 진행 가능
- Phase 7에서 E2E 테스트와 성능 최적화 동시 진행

---

## ✅ 성공 기준 & 배포 체크리스트

### 기술적 성공 기준

```
성능 (SLA)
├─ 홈 페이지 로딩 시간: < 2초
├─ 상세 페이지 로딩 시간: < 3초
├─ PDF 생성 시간: < 5초
├─ API 응답 시간: < 500ms
├─ Core Web Vitals 달성
│  ├─ LCP: < 2.5초
│  ├─ FID: < 100ms
│  └─ CLS: < 0.1

기능 (P0)
├─ 견적서 조회: ✓ 완성
├─ PDF 다운로드: ✓ 완성
├─ 토큰 기반 인증: ✓ 완성

보안
├─ OWASP Top 10 검사: ✓ 통과
├─ SQL Injection 방지: ✓ 구현
├─ XSS 방지: ✓ 구현
├─ CSRF 토큰: ✓ 구현

테스트
├─ E2E 테스트 통과율: 100%
├─ 단위 테스트 커버리지: > 80%
├─ 모든 린트 검사: ✓ 통과
└─ 타입 체크: ✓ 에러 없음
```

### 배포 전 체크리스트

```
Pre-Deployment (Day 9)
├─ [ ] 로컬 개발 환경에서 모든 테스트 통과
├─ [ ] npm run build 성공
├─ [ ] npm run check-all 성공
├─ [ ] E2E 테스트 100% 통과
├─ [ ] 보안 검사 완료
├─ [ ] 성능 메트릭 확인
├─ [ ] 환경 변수 설정 완료
├─ [ ] 배포 스크립트 준비
└─ [ ] 롤백 계획 수립

Deployment (Day 9-10)
├─ [ ] 프로덕션 빌드
├─ [ ] 호스팅 플랫폼 배포
├─ [ ] DNS 설정 (필요시)
└─ [ ] SSL 인증서 확인

Post-Deployment (Day 10)
├─ [ ] 프로덕션 URL 접근 확인
├─ [ ] 홈 페이지 렌더링 확인
├─ [ ] 견적서 조회 기능 테스트
├─ [ ] 인증 기능 테스트
├─ [ ] PDF 다운로드 테스트
├─ [ ] 에러 로그 모니터링
├─ [ ] 성능 메트릭 확인
└─ [ ] 버그 픽스 준비
```

---

## 📚 참고 자료 & 문서

### 개발 가이드

- [Next.js 15.5.3 전문 가이드](./guides/nextjs-15.md)
- [React Hook Form 폼 처리 가이드](./guides/forms-react-hook-form.md)
- [컴포넌트 패턴](./guides/component-patterns.md)
- [스타일링 가이드](./guides/styling-guide.md)
- [프로젝트 구조](./guides/project-structure.md)

### 외부 문서

- [Next.js 공식 문서](https://nextjs.org/docs)
- [React 19 문서](https://react.dev/)
- [Notion API 문서](https://developers.notion.com/)
- [shadcn/ui 컴포넌트 라이브러리](https://ui.shadcn.com/)
- [TailwindCSS v4 문서](https://tailwindcss.com/)
- [Playwright 테스트 가이드](https://playwright.dev/)

---

## 🔄 로드맵 관리 & 업데이트

### 주간 검토 (매주)

- [ ] 마일스톤 진도 확인
- [ ] 막힌 부분 해결 (blocker)
- [ ] 일정 조정 (필요시)
- [ ] 위험 요소 재검토

### 변경 추적

- **버전 관리**: 이 문서는 `docs/ROADMAP.md`에서 관리됨
- **변경 기록**: Git commit에 기록
- **승인 프로세스**: 주요 변경은 팀 리뷰 후 반영

### 상태 범례

- `- (공백)`: 대기 중
- `🔄 진행 중`: 현재 작업 중
- `✓ 완료`: 완료됨
- `⚠️ 지연`: 예상 일정 초과

---

## 📞 연락처 & 소통

| 역할            | 담당자 | 연락처 |
| --------------- | ------ | ------ |
| 프로젝트 매니저 | TBD    | -      |
| Frontend 개발   | TBD    | -      |
| Backend 개발    | TBD    | -      |
| QA / 테스트     | TBD    | -      |
| DevOps / 배포   | TBD    | -      |

---

**마지막 업데이트**: 2026-03-23
**다음 검토일**: 2026-03-24 (Day 2)
