# 📋 Invoice Web MVP

노션에 입력한 견적서를 웹에서 직접 조회하고 PDF로 다운로드받을 수 있는 웹 애플리케이션입니다.

## 🚀 주요 기능

- 🌐 **웹 기반 견적서 조회** - 노션 데이터를 자동으로 웹에 표시
- 📥 **PDF 다운로드** - 버튼 클릭으로 즉시 PDF 생성 및 다운로드
- 🔒 **보안 접근 제어** - 토큰 기반 인증으로 권한 관리

## 🛠️ 기술 스택

- **Framework**: Next.js 15.5.3 (App Router + Turbopack)
- **Runtime**: React 19.1.0 + TypeScript 5
- **Styling**: TailwindCSS v4 + shadcn/ui (new-york style)
- **Forms**: React Hook Form + Zod
- **UI Components**: Radix UI + Lucide Icons
- **Development**: ESLint + Prettier + Husky

## 📚 개발 가이드

프로젝트 구조 및 개발 규칙은 다음 문서를 참조하세요:

- **📋 프로젝트 요구사항**: `docs/prd.md`
- **🗺️ 프로젝트 구조**: `docs/guides/project-structure.md`
- **🎨 스타일링 가이드**: `docs/guides/styling-guide.md`
- **🧩 컴포넌트 패턴**: `docs/guides/component-patterns.md`
- **⚡ Next.js 15.5.3 가이드**: `docs/guides/nextjs-15.md`
- **📝 폼 처리 가이드**: `docs/guides/forms-react-hook-form.md`
- **🔧 개발 지침**: `CLAUDE.md`

## ⚡ 자주 사용하는 명령어

```bash
# 개발 서버 실행 (Turbopack)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 시작
npm start

# 모든 검사 통합 실행 (권장)
npm run check-all

# TypeScript 타입 검사
npm run typecheck

# ESLint 검사 및 수정
npm run lint:fix

# Prettier 포맷팅
npm run format

# 새 shadcn/ui 컴포넌트 추가
npx shadcn@latest add button
```

## 📁 프로젝트 구조

```
invoice-web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # 루트 레이아웃
│   │   ├── page.tsx            # 홈페이지
│   │   ├── invoices/           # 견적서 페이지
│   │   ├── api/                # API 라우트
│   │   └── globals.css         # 전역 스타일
│   ├── components/             # React 컴포넌트
│   │   ├── ui/                 # shadcn/ui 컴포넌트
│   │   ├── layout/             # 레이아웃 컴포넌트
│   │   ├── navigation/         # 네비게이션 컴포넌트
│   │   └── providers/          # Context Provider
│   └── lib/                    # 유틸리티 함수
├── public/                     # 정적 파일
├── docs/                       # 프로젝트 문서
│   ├── prd.md                  # 제품 요구사항 문서
│   └── guides/                 # 개발 가이드
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── components.json             # shadcn/ui 설정
├── eslint.config.mjs
├── .prettierrc
├── CLAUDE.md                   # Claude Code 개발 지침
└── README.md
```

## 🚦 개발 시작하기

### 1단계: 의존성 설치

```bash
npm install
```

### 2단계: 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

### 3단계: 코드 수정

`src/app/page.tsx` 및 `src/components/`에서 파일을 편집하세요.

### 4단계: 검사 및 빌드

```bash
# 모든 검사 실행
npm run check-all

# 프로덕션 빌드
npm run build
```

## 📋 개발 체크리스트

### Phase 1: MVP (2주)

- [ ] 견적서 조회 페이지 구현
- [ ] API 라우트 구현
- [ ] PDF 다운로드 기능
- [ ] 기본 인증/권한 관리
- [ ] 테스트 및 버그 수정
- [ ] 프로덕션 배포

**마일스톤**:
- M1: 개발 환경 구성
- M2: 기본 페이지 완성
- M3: API & 데이터 연동
- M4: PDF 기능 완성
- M5: 보안 & 배포

### Phase 2: 개선 (1주)

- [ ] 노션 API 실제 연동
- [ ] 권한 관리 강화
- [ ] 분석 기능 추가
- [ ] 성능 최적화

### Phase 3: 최적화 (1주)

- [ ] SEO 개선
- [ ] 접근성(A11y) 개선
- [ ] 보안 감사
- [ ] 운영 매뉴얼 작성

## ✅ 작업 완료 체크리스트

프로젝트 완료 전에 다음을 확인하세요:

```bash
# 1. 모든 검사 통과
npm run check-all

# 2. 빌드 성공
npm run build

# 3. 로컬 테스트
npm run dev
```

## 📞 지원

문제 또는 질문이 있으시면:

1. `docs/` 폴더의 개발 가이드 참조
2. 프로젝트 리더에게 문의

## 📄 라이선스

MIT License - 자유롭게 사용할 수 있습니다.

---

**최종 업데이트**: 2026-03-23
**프로젝트 상태**: 🔄 개발 중
