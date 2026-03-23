# 🤖 Invoice Web MVP - Claude Code 개발 지침

## 📌 프로젝트 개요

**Invoice Web MVP**는 노션에 입력된 견적서를 클라이언트가 웹에서 직접 조회하고 PDF로 다운로드받을 수 있는 웹 애플리케이션입니다.

**참고 문서**:

- 📋 **프로젝트 요구사항**: `@/docs/PRD.md`
- 🗺️ **개발 로드맵**: `@/docs/ROADMAP.md` (8 Phase, 10일 일정)

### 🎯 핵심 목표

- 견적서 공유 프로세스 자동화 (70% 시간 단축)
- 클라이언트 온디맨드 PDF 다운로드 제공
- 안전한 토큰 기반 접근 제어 및 권한 관리
- 성능 SLA 달성 (LCP < 2.5s, API 응답 < 500ms, PDF 생성 < 5s)

## 🛠️ 핵심 기술 스택

- **Framework**: Next.js 15.5.3 (App Router + Turbopack)
- **Runtime**: React 19.1.0 + TypeScript 5
- **Styling**: TailwindCSS v4 + shadcn/ui (new-york style)
- **Forms**: React Hook Form + Zod + Server Actions
- **UI Components**: Radix UI + Lucide Icons
- **Authentication**: JWT 토큰 기반 (HttpOnly cookies)
- **External API**: Notion API (`@notionhq/client`)
- **PDF Generation**: jsPDF (또는 puppeteer)
- **Testing**: Playwright (E2E) + Vitest (단위 테스트)
- **Development**: ESLint + Prettier + Husky + lint-staged

## 📚 개발 가이드

### 로드맵 & 요구사항

- **🗺️ 개발 로드맵**: `@/docs/ROADMAP.md` - 8개 Phase (구조 → 공통모듈 → 기능 → 테스트 → 배포)
- **📋 상세 요구사항**: `@/docs/PRD.md` - Invoice Web MVP 사양서

### 개발 참고 자료

- **📁 프로젝트 구조**: `@/docs/guides/project-structure.md`
- **🎨 스타일링 가이드**: `@/docs/guides/styling-guide.md`
- **🧩 컴포넌트 패턴**: `@/docs/guides/component-patterns.md`
- **⚡ Next.js 15.5.3 전문 가이드**: `@/docs/guides/nextjs-15.md`
- **📝 폼 처리 완전 가이드**: `@/docs/guides/forms-react-hook-form.md`

## ⚡ 자주 사용하는 명령어

```bash
# 개발
npm run dev         # 개발 서버 실행 (Turbopack)
npm run build       # 프로덕션 빌드
npm run check-all   # 모든 검사 통합 실행 (ESLint, TypeScript, Prettier)

# 테스트
npm run test        # Vitest 단위 테스트
npm run test:e2e    # Playwright E2E 테스트

# UI 컴포넌트
npx shadcn@latest add button    # 새 컴포넌트 추가
```

## 🔄 개발 프로세스 (로드맵 기반)

### Phase 구조 (총 10일)

1. **Phase 1**: 프로젝트 구조 설정 (Day 1)
2. **Phase 2**: 공통 모듈 구현 - 타입, Zod 스키마, 유틸리티 (Day 2)
3. **Phase 3**: 기능 구현 - UI 페이지 & 컴포넌트 (Day 3-4)
4. **Phase 4**: 기능 구현 - 데이터/API + **Notion API 연동** (Day 5-6)
5. **Phase 5**: 기능 구현 - 인증 (JWT, 미들웨어) (Day 6-7)
6. **Phase 6**: 기능 구현 - PDF 생성/다운로드 (Day 7-8)
7. **Phase 7**: 통합 테스트 & 최적화 (E2E + 단위테스트 80%+) (Day 8-9)
8. **Phase 8**: 배포 & 마무리 (Vercel) (Day 9-10)

### 핵심 기능 (P0)

- ✅ 견적서 조회 페이지 (노션 데이터 기반)
- ✅ PDF 다운로드 (A4, 한글 폰트 지원, < 2MB)
- ✅ 토큰 기반 인증 (JWT, HttpOnly cookies)
- ✅ 반응형 디자인 (데스크톱/모바일/태블릿)
- ✅ 에러 처리 (사용자 친화적 메시지)

### Notion API 연동

- Phase 2: Notion 클라이언트 기초 (@notionhq/client 설정)
- Phase 4: 실제 Notion API 연동 (데이터베이스 조회, 데이터 변환)
- 더미 데이터 ↔ Notion 전환 플래그 (USE_MOCK_DATA 환경변수)

## ✅ 작업 완료 체크리스트

```bash
# 개발 완료 확인
npm run check-all       # 모든 검사 통과
npm run build           # 빌드 성공
npm run test            # 단위 테스트 통과 (커버리지 > 80%)
npm run test:e2e        # E2E 테스트 통과

# 배포 전 확인 (Phase 7-8)
# - 성능 메트릭 달성 (LCP < 2.5s, API < 500ms, PDF < 5s)
# - OWASP Top 10 보안 검사 완료
# - 환경 변수 설정 완료 (.env.production)
```

## 📊 성공 기준

### 기능 (P0 완성)

- 노션 데이터 웹 표시 ✓
- PDF 다운로드 ✓
- 토큰 인증 ✓

### 성능 (SLA)

- 홈 페이지 로딩: < 2초
- 상세 페이지 로딩: < 3초
- PDF 생성: < 5초
- API 응답: < 500ms
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1

### 테스트

- E2E 테스트: 100% 통과
- 단위 테스트: 커버리지 > 80%
- ESLint/TypeScript: 에러 없음

## 💡 개발 팁

참고 문서를 먼저 확인하세요:

- **새 기능 추가**: `@/docs/ROADMAP.md`의 해당 Phase 참고
- **API 연동**: Phase 4 Notion API 연동 항목 확인
- **테스트 작성**: Phase 2,4,5,6,7 단위 테스트 항목 참고
- **배포**: Phase 8 배포 & 마무리 항목 확인
