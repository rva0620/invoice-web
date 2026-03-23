# 🤖 Invoice Web MVP - AI 개발 표준 가이드

**문서 버전**: 1.0.0
**최종 업데이트**: 2026-03-23
**적용 범위**: AI Agent를 위한 프로젝트 개발 규칙

---

## 📋 1. 프로젝트 개요

### 프로젝트 정보

- **프로젝트명**: Invoice Web MVP
- **목적**: Notion에 저장된 견적서를 웹에서 조회 및 PDF 다운로드
- **기술 스택**: Next.js 15.5.3 + React 19 + TypeScript + TailwindCSS + shadcn/ui
- **개발 방식**: 8 Phase 로드맵 기반 (Phase 1-8)
- **상태**: Phase 1 완료, Phase 2-3 진행 중

### 핵심 기술

- **Framework**: Next.js 15.5.3 (App Router + Turbopack)
- **Runtime**: React 19.1.0 + TypeScript 5
- **UI**: TailwindCSS v4 + shadcn/ui (new-york)
- **폼**: React Hook Form + Zod
- **인증**: JWT (HttpOnly cookies)
- **API**: Notion API (@notionhq/client)
- **PDF**: jsPDF (또는 puppeteer)

---

## 📁 2. 디렉토리 구조 & 파일 생성 규칙

### 표준 디렉토리 구조

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # 백엔드 API 라우트
│   │   └── [동적 라우트]/route.ts
│   ├── (auth)/            # 그룹핑: 인증 관련
│   ├── (public)/          # 그룹핑: 공개 페이지
│   ├── page.tsx           # 메인 페이지
│   ├── layout.tsx         # 루트 레이아웃
│   └── globals.css        # 전역 스타일
├── components/            # React 컴포넌트
│   ├── ui/               # shadcn/ui 컴포넌트 (생성금지: 추가 시 npx shadcn add)
│   ├── layout/           # 레이아웃 컴포넌트
│   ├── navigation/       # 네비게이션 컴포넌트
│   ├── providers/        # Context/Provider
│   └── index.ts          # 내보내기 (export * from './...')
├── lib/
│   ├── schemas/          # Zod 검증 스키마
│   ├── utils/            # 유틸리티 함수
│   ├── constants.ts      # 상수 정의
│   ├── env.ts            # 환경 변수 검증
│   └── middleware/       # 미들웨어 함수
├── types/                # TypeScript 타입 정의
│   ├── index.ts          # 주요 타입 내보내기
│   ├── invoice.ts        # 견적서 관련 타입
│   └── auth.ts           # 인증 관련 타입
├── hooks/                # Custom React Hooks (Phase 2+)
├── actions/              # Server Actions (Phase 4+)
├── tests/                # 테스트 파일 (Phase 7+)
└── config/               # 설정 파일
```

### 파일 생성 규칙

- ✅ **허용**: Phase 로드맵에서 명시된 파일만 생성
- ✅ **허용**: 컴포넌트 추가 시 해당 폴더에 `index.ts` 자동 생성/업데이트
- ❌ **금지**: `src/` 외부에 새 파일 생성
- ❌ **금지**: 사용자 승인 없이 `package.json` 수정
- ❌ **금지**: 기존 설정 파일(`tsconfig.json`, `next.config.ts` 등) 수정 금지 (요청 시에만)

---

## 🏷️ 3. 명명 규칙

### 변수 & 함수

- **스타일**: `camelCase`
- **형식**: `const variableName`, `function functionName()`
- **매개변수 접두사**: underscore (`_`) 사용 (예: `_id`, `_data`)
- **예시**:
  ```typescript
  const invoiceList = []
  function formatInvoiceDate(_date: Date) {
    return _date.toLocaleDateString('ko-KR')
  }
  ```

### 컴포넌트 (React)

- **스타일**: `PascalCase`
- **파일명**: 컴포넌트명과 동일 (예: `Button.tsx`)
- **폴더명**: `camelCase` (예: `src/components/invoiceCard/`)
- **내보내기**: 항상 `export default` 또는 named export
- **예시**:
  ```typescript
  // src/components/invoiceCard/InvoiceCard.tsx
  export default function InvoiceCard(_props: InvoiceCardProps) {
    return <div>...</div>;
  }
  ```

### 타입 & 인터페이스

- **스타일**: `PascalCase`
- **접미사**: 선택적으로 `Type` 또는 `Props` 접미사 사용
- **파일명**: `types.ts` 또는 `src/types/[도메인].ts`
- **예시**:

  ```typescript
  type InvoiceType = {
    id: string
    title: string
  }

  interface InvoiceCardProps {
    invoice: InvoiceType
  }
  ```

### 파일명

- **컴포넌트**: `PascalCase.tsx` (예: `Button.tsx`)
- **유틸리티**: `camelCase.ts` (예: `formatDate.ts`)
- **상수**: `UPPER_SNAKE_CASE` (값 정의 시) 또는 `camelCase.ts` (파일명)
- **테스트**: `[name].test.ts` 또는 `[name].spec.ts`

---

## 🎨 4. 코딩 스타일

### 들여쓰기 & 포매팅

- **들여쓰기**: 2칸 (스페이스)
- **줄 길이**: 80-100자 권장 (Prettier 자동 처리)
- **세미콜론**: 필수 (TypeScript/JavaScript 표준)
- **쉼표**: 마지막 항목에도 쉼표 (Prettier trailing comma 설정)

### 주석 규칙

- **언어**: 한국어 (코드 내 주석은 반드시 한국어)
- **스타일**: `// 주석` (한 줄) 또는 `/* 주석 */` (여러 줄)
- **위치**: 코드 위에 작성
- **규칙**: 로직이 불명확한 경우만 작성 (자명한 코드는 주석 불필요)
- **예시**:
  ```typescript
  // 견적서를 PDF 형식으로 변환
  function convertInvoiceToPDF(_invoice: Invoice) {
    // PDF 생성 로직
    return pdf
  }
  ```

### Import 순서

```typescript
// 1. 외부 라이브러리
import React from 'react'
import { useForm } from 'react-hook-form'

// 2. Next.js 및 관련 라이브러리
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// 3. 내부 컴포넌트 (@ 경로 사용)
import { Button } from '@/components/ui/button'
import { InvoiceCard } from '@/components/invoiceCard'

// 4. 내부 유틸리티 & 타입
import { formatDate } from '@/lib/utils'
import type { Invoice } from '@/types'

// 5. 스타일 (CSS/Tailwind)
import styles from './Component.module.css'
```

### 함수 길이 제한

- **최대 40줄**: 한 함수는 40줄을 초과하지 않음
- **초과 시**: 작은 함수로 분리
- **예시**:

  ```typescript
  // ❌ 나쁜 예 (40줄 초과)
  function handleSubmit() {
    // 40줄 이상의 로직
  }

  // ✅ 좋은 예 (분리)
  function validateFormData(_data: unknown) {
    // 검증 로직만
  }

  function handleSubmit(_data: FormData) {
    const isValid = validateFormData(_data)
    if (!isValid) return
    // 제출 로직
  }
  ```

### 타입 정의

- **타입 우선**: 가능한 한 타입 정의 후 사용
- **any 금지**: 타입을 명시하지 못하면 `unknown` 또는 제네릭 사용
- **추론 활용**: 단순한 경우 타입 추론 허용
- **예시**:

  ```typescript
  // ❌ 금지
  const data: any = {}

  // ✅ 허용
  interface InvoiceData {
    id: string
    title: string
  }
  const data: InvoiceData = { id: '1', title: 'Invoice' }
  ```

---

## ⚡ 5. Next.js App Router 사용 규칙

### 페이지 구조

- **파일**: `src/app/[path]/page.tsx`
- **메타데이터**: `src/app/[path]/layout.tsx` 또는 `page.tsx` 내 `metadata` export
- **동적 라우트**: `[id]`, `[...slug]` 폴더 사용
- **그룹핑**: `(groupName)/` 폴더로 라우트 구조화

### API 라우트

- **파일**: `src/app/api/[route]/route.ts`
- **내보내기**: `export async function GET/POST/PUT/DELETE()`
- **응답**: `Response` 객체 반환
- **미들웨어 배치**: `src/lib/middleware/` 또는 `src/app/middleware.ts`
- **예시**:

  ```typescript
  // src/app/api/invoices/route.ts
  export async function GET() {
    // 견적서 목록 조회
    return Response.json({ invoices: [] })
  }

  export async function POST(_req: Request) {
    // 견적서 생성
    return Response.json({ success: true })
  }
  ```

### Server Actions (Phase 5+)

- **위치**: `src/actions/` 폴더
- **지정**: 파일 최상단에 `'use server'` 지시어 작성
- **명명**: `action` 접미사 (예: `createInvoiceAction`)
- **타입**: 항상 인자와 반환값 타입 정의
- **예시**:

  ```typescript
  // src/actions/invoice.ts
  'use server'

  export async function createInvoiceAction(_data: CreateInvoiceInput) {
    // 서버 액션 로직
    return { success: true }
  }
  ```

### 동적 렌더링 vs 정적 렌더링

- **기본**: 정적 생성 (static) - 빌드 시점
- **동적 필요**: `import { revalidatePath } from 'next/cache'`
- **캐시 비활성화**: `export const revalidate = 0` (필요 시만)

---

## 🔷 6. TypeScript & 타입 정의

### 타입 정의 위치

- **글로벌 타입**: `src/types/` 폴더
  - `src/types/index.ts` - 주요 타입 내보내기
  - `src/types/invoice.ts` - 견적서 관련
  - `src/types/auth.ts` - 인증 관련
- **로컬 타입**: 컴포넌트 파일 내 정의 (한 파일에서만 사용)
- **Props 타입**: `ComponentNameProps` 또는 `ComponentNameType`

### tsconfig.json 규칙

- **strict mode**: 반드시 활성화 (`"strict": true`)
- **경로 별칭**: `@/*`로 `src/` 참조
- **수정 금지**: 사용자 승인 없이 tsconfig 수정 금지

### 제네릭 활용

- **API 응답 래핑**:
  ```typescript
  interface ApiResponse<T> {
    success: boolean
    data?: T
    error?: string
  }
  ```

---

## 🧩 7. React 컴포넌트 패턴 & shadcn/ui

### 컴포넌트 구조

```typescript
// src/components/invoiceCard/InvoiceCard.tsx
'use client'; // 필요 시만

import { Button } from '@/components/ui/button';
import type { Invoice } from '@/types';

interface InvoiceCardProps {
  invoice: Invoice;
  onView?: (_id: string) => void;
}

export default function InvoiceCard({ invoice, onView }: InvoiceCardProps) {
  return (
    <div className="...">
      {/* JSX */}
    </div>
  );
}
```

### shadcn/ui 규칙

- **위치**: `src/components/ui/` (수정 금지)
- **추가**: `npx shadcn@latest add [component-name]`
- **재사용**: 커스텀 컴포넌트는 `src/components/[feature]/` 에 배치
- **임포트**: `from '@/components/ui/[component]'`
- **금지**: `src/components/ui/` 아래에 새 파일 직접 생성

### 클라이언트 컴포넌트

- **지시어**: `'use client'` 필요 시만 최상단에 작성
- **위치**: 상태 관리 또는 이벤트 처리가 필요한 컴포넌트
- **우선**: 가능한 한 서버 컴포넌트 사용

### 스타일링

- **방식**: TailwindCSS (utility classes)
- **클래스명**: `className="..."` 사용
- **병합**: `clsx()` 또는 `tailwind-merge` 활용
- **CSS-in-JS 금지**: 별도 CSS 파일은 필요할 때만

---

## 📡 8. API 라우트 & 데이터 호출

### API 라우트 구조

```typescript
// src/app/api/invoices/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const { id } = await params

  // 인증 확인
  const token = _req.headers.get('authorization')
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 데이터 조회
  const invoice = await fetchInvoice(id)
  return NextResponse.json(invoice)
}
```

### 데이터 호출 위치

- **서버 컴포넌트**: 직접 데이터 조회 (async)
- **클라이언트 컴포넌트**: Server Actions 또는 API 라우트 호출
- **캐싱**: `revalidateTag()` 또는 `revalidatePath()` 활용

### 에러 처리

- **API 라우트**: `NextResponse.json({ error }, { status })`
- **클라이언트**: try-catch + 사용자 친화적 메시지
- **로깅**: 프로덕션 에러는 로깅 (Phase 7+)

---

## 📝 9. 폼 처리 (React Hook Form + Zod)

### Zod 스키마

- **위치**: `src/lib/schemas/[domain].ts`
- **명명**: `[Domain]Schema` (예: `InvoiceSchema`)
- **타입 추출**: `z.infer<typeof InvoiceSchema>`
- **예시**:

  ```typescript
  // src/lib/schemas/invoice.ts
  import { z } from 'zod'

  export const InvoiceSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(1, '제목은 필수입니다'),
    amount: z.number().positive('금액은 양수여야 합니다'),
  })

  export type InvoiceFormData = z.infer<typeof InvoiceSchema>
  ```

### 폼 컴포넌트

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InvoiceSchema, type InvoiceFormData } from '@/lib/schemas/invoice';
import { Button } from '@/components/ui/button';

export default function InvoiceForm() {
  const form = useForm<InvoiceFormData>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: { title: '', amount: 0 },
  });

  async function onSubmit(_data: InvoiceFormData) {
    // Server Action 호출
    await createInvoiceAction(_data);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* 폼 필드 */}
      <Button type="submit">제출</Button>
    </form>
  );
}
```

---

## 🔐 10. 환경 변수 & 설정

### 환경 변수 위치

- **개발**: `.env.local` (git 무시)
- **예시**: `.env.example`
- **검증**: `src/lib/env.ts` (Zod 사용)

### 필수 환경 변수

```
NOTION_API_KEY=...           # Notion API 키
NOTION_DATABASE_ID=...       # 견적서 데이터베이스 ID
JWT_SECRET=...               # JWT 서명 시크릿
NEXT_PUBLIC_APP_URL=...      # 앱 URL (클라이언트)
```

### 환경 변수 접근

```typescript
// src/lib/env.ts
import { z } from 'zod'

const envSchema = z.object({
  NOTION_API_KEY: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  // ...
})

export const env = envSchema.parse(process.env)
```

---

## 🔄 11. 다중 파일 조정 규칙

### 컴포넌트 추가 시 (필수)

1. `src/components/[folder]/Component.tsx` 생성
2. `src/components/[folder]/index.ts` 생성/업데이트
   ```typescript
   export { default as Component } from './Component'
   export type { ComponentProps } from './Component'
   ```
3. 부모 폴더 `index.ts` 업데이트 (필요 시)

### 타입 추가 시 (필수)

1. `src/types/[domain].ts` 또는 `src/types/index.ts`에 정의
2. 해당 타입을 사용하는 모든 파일에 import 추가

### Zod 스키마 추가 시 (필수)

1. `src/lib/schemas/[domain].ts` 생성
2. `src/lib/schemas/index.ts` 업데이트
   ```typescript
   export * from './invoice'
   export * from './auth'
   ```

### API 라우트 추가 시 (필수)

1. `src/app/api/[route]/route.ts` 생성
2. GET/POST/PUT/DELETE 함수 명시

---

## ❌ 12. 금지 행동 (Prohibited Actions)

### 절대 금지

- ❌ `package.json` 무단 수정
- ❌ `tsconfig.json`, `next.config.ts` 수정 (승인 필요)
- ❌ `src/` 외부에 파일 생성
- ❌ `src/components/ui/` 아래 새 파일 생성 (shadcn add 사용)
- ❌ TypeScript strict mode 비활성화
- ❌ 개발 의존성 (`devDependencies`) 추가
- ❌ `.env` 파일을 git에 커밋
- ❌ 기존 API 라우트 구조 변경 (요청 시만)

### 신중한 행동 (사용자 확인 후)

- 🟡 새로운 라이브러리 추가 (의존성)
- 🟡 데이터베이스 스키마 변경
- 🟡 인증 로직 수정
- 🟡 CI/CD 파이프라인 수정

### 권장 사항

- ✅ 기존 컴포넌트 재사용
- ✅ 타입 안전성 우선 (strict mode)
- ✅ 한국어 주석 작성
- ✅ 작은 함수 작성 (40줄 이내)
- ✅ 에러 처리 항상 포함

---

## 🧪 13. 테스트 작성 (Phase 7+)

### 테스트 위치

- **단위 테스트**: `src/tests/[domain].test.ts`
- **E2E 테스트**: `playwright.config.ts` 기준

### 테스트 작성 규칙

```typescript
// src/tests/invoice.test.ts
import { describe, it, expect } from 'vitest'
import { formatInvoiceDate } from '@/lib/utils'

describe('Invoice Utils', () => {
  it('should format date correctly', () => {
    const date = new Date('2026-03-23')
    const result = formatInvoiceDate(date)
    expect(result).toBe('2026년 3월 23일')
  })
})
```

### 커버리지 목표

- **최소**: 80% 이상
- **명령어**: `npm run test` (단위), `npm run test:e2e` (E2E)

---

## 📝 14. 커밋 메시지 규칙

### 형식

```
<type>: <subject>

<body>
<footer>
```

### Type 규칙

- `feat`: 새 기능
- `fix`: 버그 수정
- `refactor`: 구조 개선 (기능 변화 없음)
- `style`: 코드 스타일 (들여쓰기, 주석 등)
- `docs`: 문서 추가/수정
- `chore`: 빌드, 의존성 관리
- `test`: 테스트 추가/수정

### 작성 규칙

- **언어**: 한국어
- **시제**: 명령형 (동사+명사)
- **길이**: 제목 50자 이내, 본문 72자 이내
- **예시**:

  ```
  feat: 견적서 PDF 다운로드 기능 추가

  - Notion API에서 데이터 조회
  - jsPDF로 PDF 생성
  - 한글 폰트 지원

  Closes #123
  ```

---

## 🎯 15. AI 의사결정 우선순위

### 파일 수정 우선순위

1. **Type 정의** - `src/types/` 먼저 정의
2. **스키마/검증** - `src/lib/schemas/` 정의
3. **유틸리티** - `src/lib/utils/` 구현
4. **컴포넌트** - `src/components/` 구현
5. **API/액션** - `src/app/api/`, `src/actions/` 구현

### 다중 파일 조정 체크리스트

- [ ] 새 타입 추가 시 `src/types/index.ts` 업데이트
- [ ] 새 스키마 추가 시 `src/lib/schemas/index.ts` 업데이트
- [ ] 새 컴포넌트 추가 시 폴더별 `index.ts` 업데이트
- [ ] 새 API 라우트 추가 시 라우트 문서 업데이트
- [ ] 환경 변수 추가 시 `.env.example` 업데이트

---

## 📞 16. 문제 해결 가이드

### 타입 에러 발생 시

1. `src/types/` 에서 타입 정의 확인
2. `tsconfig.json` strict mode 확인
3. 모든 함수 매개변수에 타입 명시

### 빌드 실패 시

1. `npm run typecheck` 실행
2. `npm run lint` 로 ESLint 확인
3. `npm run format:check` 로 포매팅 확인

### API 호출 실패 시

1. 환경 변수 (`.env.local`) 확인
2. API 라우트 경로 확인
3. 인증 토큰 확인 (Authorization 헤더)

---

## 🚀 17. 개발 명령어

```bash
# 개발 서버
npm run dev           # Turbopack 활성화

# 검사 및 포매팅
npm run lint          # ESLint 실행
npm run lint:fix      # ESLint 자동 수정
npm run format        # Prettier 포매팅
npm run typecheck     # TypeScript 검사
npm run check-all     # 모든 검사 통합

# 빌드
npm run build         # 프로덕션 빌드

# 테스트
npm run test          # Vitest 단위 테스트
npm run test:e2e      # Playwright E2E 테스트

# UI 컴포넌트
npx shadcn@latest add [component]  # 컴포넌트 추가
```

---

**이 문서는 AI Agent의 정확하고 일관된 개발을 위한 규칙입니다.**
**모든 규칙을 따라 Invoice Web MVP 프로젝트를 성공적으로 진행하세요.**
