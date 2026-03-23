# 📋 Invoice Web MVP - Product Requirements Document

**버전**: 1.0.0
**작성일**: 2026-03-23
**상태**: 🔄 진행 중

---

## 📌 Executive Summary

Invoice Web는 노션에 입력된 견적서를 클라이언트가 웹에서 직접 조회하고 PDF로 다운로드받을 수 있는 웹 애플리케이션입니다. 기업의 견적서 관리 프로세스를 간소화하고 클라이언트 만족도를 높이는 것을 목표로 합니다.

**핵심 기능**:
- 🌐 웹 기반 견적서 조회
- 📥 PDF 다운로드
- 🔒 기본 보안 및 권한 관리

---

## 1️⃣ 프로젝트 개요

### 1.1 프로젝트명 & 정의

| 항목 | 설명 |
|------|------|
| **프로젝트명** | Invoice Web MVP |
| **약칭** | Invoice-Web |
| **구분** | Web Application (B2B/B2C) |
| **주요 목표** | 견적서 공유 및 다운로드 자동화 |
| **대상 사용자** | 기업 담당자, 클라이언트 |
| **예상 사용자 규모** | 월 100-500 PV |

### 1.2 배경 & 필요성

**문제점**:
- 노션에 작성된 견적서를 클라이언트에게 공유하기 번거로움
- PDF 형식으로 변환하는 추가 작업 필요
- 버전 관리 및 추적 어려움

**해결책**:
- 노션 데이터를 자동으로 웹에 표시
- 버튼 클릭으로 즉시 PDF 다운로드
- 보안이 강화된 접근 제어

---

## 2️⃣ 목표 & 스코프

### 2.1 비즈니스 목표

| 목표 | 메트릭 | 목표값 |
|------|--------|--------|
| 운영 효율화 | 견적서 공유 시간 단축 | 70% 감소 |
| 사용자 만족도 | 클라이언트 만족도 | 4.5/5.0 이상 |
| 시스템 안정성 | 가용성 | 99.9% |
| 성능 | 페이지 로딩 시간 | 3초 이내 |

### 2.2 MVP Scope (필수 기능)

#### ✅ Scope IN (Phase 1)

| 기능 | 설명 | 우선순위 |
|------|------|---------|
| 견적서 조회 페이지 | 노션 데이터 기반 웹 표시 | P0 |
| PDF 다운로드 | 클릭으로 PDF 생성 및 다운로드 | P0 |
| 기본 인증 | 토큰 기반 접근 제어 | P0 |
| 반응형 디자인 | 데스크톱/모바일 지원 | P1 |
| 에러 처리 | 사용자 친화적 오류 메시지 | P1 |

#### ❌ Scope OUT (Phase 2+)

- 실시간 협업 기능
- 온라인 결제 연동
- 이메일 자동 발송
- 다국어 지원
- 고급 분석

---

## 3️⃣ 사용자 정의 & 시나리오

### 3.1 주요 사용자 Persona

#### Persona 1: 영업 담당자 (Kim, 35세)
- **역할**: 견적서 작성 및 관리
- **목표**: 빠르게 견적서 생성 및 공유
- **Pain Point**: 매번 PDF로 변환하는 번거로움
- **기대값**: 자동화된 공유 프로세스

#### Persona 2: 클라이언트 (Lee, 42세)
- **역할**: 견적서 검토
- **목표**: 언제든 견적서 확인 및 저장
- **Pain Point**: 이메일로 받은 PDF 파일 관리 어려움
- **기대값**: 편한 웹 접근, 즉시 다운로드

### 3.2 사용자 시나리오

#### 시나리오 1: 견적서 조회 및 다운로드

```
1. 클라이언트가 공유받은 URL 접속 (예: invoice.example.com/quotations/ABC123)
2. 인증 화면에서 비밀번호 입력
3. 견적서 상세 페이지 로드 (프로젝트명, 금액, 항목, 유효기간 등)
4. "PDF 다운로드" 버튼 클릭
5. invoice_ABC123_20260323.pdf 파일 다운로드 완료
6. 로컬 PC/모바일에서 PDF 열람
```

**예상 소요 시간**: 30초

#### 시나리오 2: 견적서 업데이트 확인

```
1. 영업 담당자가 노션에서 견적서 정보 수정
2. 시스템이 자동으로 웹 데이터 동기화 (캐시 갱신)
3. 클라이언트가 웹을 새로고침
4. 최신 견적서 정보 확인
5. 다시 PDF 다운로드
```

**동기화 시간**: 최대 5분

#### 시나리오 3: 권한 없는 접근 시도

```
1. 공격자가 URL을 추측해 다른 견적서 접속 시도
2. 시스템이 접근 권한 확인
3. 권한 없음 메시지 표시
4. 접속 시도 로그 기록
```

---

## 4️⃣ 기능 명세서

### 4.1 견적서 조회 페이지

**기능**: 노션 데이터를 웹 페이지에 표시하는 기능

#### 4.1.1 기본 정보 표시

```typescript
// 표시될 필드
{
  id: string;              // 견적서 ID
  invoiceNumber: string;   // 견적서 번호 (예: QT-2024-001)
  clientName: string;      // 고객사 이름
  projectName: string;     // 프로젝트명
  description: string;     // 설명
  issuedDate: Date;        // 발행일
  validUntil: Date;        // 유효기간
  totalAmount: number;     // 총 금액 (원 단위)
  currency: string;        // 통화 (기본값: KRW)
  items: InvoiceItem[];    // 청구 항목 배열
  notes: string;           // 특수 사항/비고
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
}
```

#### 4.1.2 표시 레이아웃

| 섹션 | 내용 | 높이 |
|------|------|------|
| Header | 로고, 네비게이션 | 60px |
| 상단 정보 | 고객사명, 프로젝트명, 발행일 | 120px |
| 청구 항목 테이블 | 항목별 금액 정렬 | Dynamic |
| 요약 정보 | 소계, 세금, 총 금액 | 150px |
| 특수 사항 | 비고, 유효기간, 조건 | Dynamic |
| Footer | 기업 정보, 연락처 | 80px |

#### 4.1.3 상호작용

- **새로고침**: F5 또는 새로고침 버튼 → 최신 데이터 로드
- **PDF 다운로드**: "다운로드" 버튼 → PDF 생성 시작
- **복사**: 견적서 URL 복사 기능
- **인쇄**: 브라우저 인쇄 기능 (최적화됨)

### 4.2 PDF 다운로드 기능

**기능**: 견적서를 PDF로 생성하고 다운로드하는 기능

#### 4.2.1 PDF 생성 사양

| 항목 | 사양 |
|------|------|
| **페이지 크기** | A4 (210 × 297mm) |
| **여백** | 상하좌우 20mm |
| **폰트** | Noto Sans KR (기본), Arial (영문) |
| **색상 모드** | RGB (웹), CMYK (인쇄) |
| **파일명 형식** | invoice_{invoiceId}_{yyyyMMdd}.pdf |
| **파일 크기** | < 2MB |
| **생성 시간** | < 5초 |

#### 4.2.2 PDF 콘텐츠 레이아웃

```
┌─────────────────────────────────┐
│  [Logo]      회사명             │ (40mm)
├─────────────────────────────────┤
│  견적서 / QUOTATION             │ (20mm)
├─────────────────────────────────┤
│  견적서번호: QT-2024-001        │
│  발행일: 2026-03-23             │
│  유효기간: 2026-04-23           │ (30mm)
├─────────────────────────────────┤
│  고객사: ABC Corp.              │
│  담당자: Kim John               │
│  부서: 영업팀                    │ (25mm)
├─────────────────────────────────┤
│  항목      단가      수량    금액 │
│  ─────────────────────────────  │
│  [테이블 내용]                  │ (Dynamic)
│  ─────────────────────────────  │
│  소계         10,000,000 원      │
│  세금 (10%)    1,000,000 원      │
│  합계         11,000,000 원      │ (40mm)
├─────────────────────────────────┤
│  특수 사항:                     │
│  [비고 내용]                    │ (Dynamic)
├─────────────────────────────────┤
│  회사 정보                       │
│  주소: 서울시 강남구...          │ (30mm)
│  전화: 02-1234-5678             │
│  이메일: info@example.com        │
└─────────────────────────────────┘
```

#### 4.2.3 다운로드 프로세스

```
사용자 클릭
    ↓
[PDF 생성 시작] → 로딩 인디케이터 표시
    ↓
백엔드: 견적서 데이터 조회
    ↓
PDF 엔진: HTML → PDF 변환
    ↓
파일 생성 완료
    ↓
[브라우저 다운로드] → 자동 다운로드 또는 링크 제공
```

### 4.3 인증 & 권한 관리

**기능**: 견적서 접근 제어 및 보안

#### 4.3.1 인증 방식

**1차 MVP**: 토큰 기반 단순 인증

```
접근 URL: /invoices/{invoiceId}?token={accessToken}

또는

비밀번호 인증 (쿠키 저장)
- 비밀번호 입력 → 세션 생성 → 쿠키 저장
```

#### 4.3.2 권한 검증 로직

```typescript
// 접근 권한 확인
function checkAccess(invoiceId: string, token: string): boolean {
  // 1. 토큰 유효성 검증
  if (!isValidToken(token)) return false;

  // 2. 토큰에 연결된 invoiceId 확인
  const tokenInvoiceId = decodeToken(token).invoiceId;
  if (tokenInvoiceId !== invoiceId) return false;

  // 3. 토큰 만료시간 확인
  if (isTokenExpired(token)) return false;

  return true;
}
```

#### 4.3.3 권한 매트릭스

| 사용자 유형 | 조회 | 다운로드 | 수정 | 삭제 |
|-----------|------|--------|------|------|
| 미인증 | ❌ | ❌ | ❌ | ❌ |
| 클라이언트 (토큰) | ✅ | ✅ | ❌ | ❌ |
| 영업 담당자 | ✅ | ✅ | ✅ | ⚠️ |
| 관리자 | ✅ | ✅ | ✅ | ✅ |

---

## 5️⃣ 기술 스택

### 5.1 Frontend

| 레이어 | 기술 | 버전 |
|--------|------|------|
| **Framework** | Next.js | 15.5.3 |
| **Runtime** | React | 19.1.0 |
| **Language** | TypeScript | 5.x |
| **Styling** | TailwindCSS | v4 |
| **UI Components** | shadcn/ui | latest |
| **Icons** | Lucide Icons | latest |
| **Form** | React Hook Form | 7.x |
| **Validation** | Zod | latest |
| **PDF** | jsPDF + html2canvas | OR puppeteer |

### 5.2 Backend

| 레이어 | 기술 | 용도 |
|--------|------|------|
| **API** | Next.js API Routes | RESTful API |
| **Server Actions** | Next.js Server Actions | Form 처리 |
| **Database** | TBD (Notion API 1차) | 데이터 저장소 |
| **Auth** | JWT + Cookies | 토큰 기반 인증 |
| **Caching** | Redis (선택) | 성능 최적화 |

### 5.3 외부 연동

| 서비스 | 용도 | 상태 |
|--------|------|------|
| **Notion API** | 견적서 데이터 소스 | Phase 1 |
| **Node.js PDF Library** | PDF 생성 | Phase 1 |
| **AWS S3** (선택) | PDF 저장 | Phase 2 |
| **Sendgrid** (선택) | 이메일 발송 | Phase 2 |

---

## 6️⃣ 데이터 모델

### 6.1 데이터 스키마

#### Invoice (견적서)

```typescript
interface Invoice {
  // 기본 정보
  id: string;                          // UUID
  invoiceNumber: string;               // 견적서 번호 (예: QT-2024-001)
  status: 'draft' | 'sent' | 'accepted' | 'rejected';

  // 일자
  issuedDate: Date;                    // 발행일
  validUntil: Date;                    // 유효기간 만료일

  // 고객 정보
  clientId: string;                    // 고객 ID
  clientName: string;                  // 고객사명
  clientEmail: string;                 // 고객 이메일
  clientPhone: string;                 // 고객 전화
  clientAddress: string;               // 고객 주소

  // 프로젝트 정보
  projectName: string;                 // 프로젝트명
  projectDescription: string;          // 설명

  // 금액 정보
  items: InvoiceItem[];                // 청구 항목 배열
  subtotal: number;                    // 소계 (세금 제외)
  taxRate: number;                     // 세율 (0.1 = 10%)
  taxAmount: number;                   // 세금액
  totalAmount: number;                 // 합계
  currency: string;                    // 통화 (예: KRW, USD)
  paymentTerms: string;                // 결제 조건

  // 추가 정보
  notes: string;                       // 특수 사항/비고
  companyInfo: CompanyInfo;            // 회사 정보

  // 메타데이터
  createdAt: Date;                     // 생성일
  updatedAt: Date;                     // 수정일
  createdBy: string;                   // 작성자
  accessToken?: string;                // 클라이언트 접근 토큰
}
```

#### InvoiceItem (청구 항목)

```typescript
interface InvoiceItem {
  id: string;                          // 항목 ID
  description: string;                 // 항목 설명
  quantity: number;                    // 수량
  unitPrice: number;                   // 단가
  amount: number;                      // 금액 (quantity × unitPrice)
  unit: string;                        // 단위 (예: 개, 회, 식)
  order: number;                       // 정렬 순서
}
```

#### CompanyInfo (회사 정보)

```typescript
interface CompanyInfo {
  name: string;                        // 회사명
  logo: string;                        // 로고 URL
  address: string;                     // 주소
  phone: string;                       // 전화
  email: string;                       // 이메일
  website: string;                     // 웹사이트
  registrationNumber: string;          // 사업자등록번호
  taxId: string;                       // 세금번호
}
```

#### AccessToken (접근 토큰)

```typescript
interface AccessToken {
  token: string;                       // JWT 토큰
  invoiceId: string;                   // 연결된 견적서 ID
  clientEmail: string;                 // 클라이언트 이메일
  expiresAt: Date;                     // 만료일시
  createdAt: Date;                     // 생성일시
  isRevoked: boolean;                  // 취소 여부
}
```

### 6.2 데이터 흐름

```
┌─────────────────────────────────────────────┐
│         Notion Database                     │
│    (노션에서 관리되는 견적서 데이터)         │
└────────────────┬────────────────────────────┘
                 │ (Notion API)
                 ↓
        ┌─────────────────────┐
        │   Next.js Server    │
        │  - Fetch from API   │
        │  - Cache (Redis)    │
        │  - Transform Data   │
        └──────────┬──────────┘
                   │
        ┌──────────┴──────────┐
        ↓                     ↓
    ┌─────────────┐    ┌─────────────┐
    │  Web Page   │    │  PDF File   │
    │  (React)    │    │  (jsPDF)    │
    └─────────────┘    └─────────────┘
```

---

## 7️⃣ API 설계서

### 7.1 REST API Endpoints

#### 7.1.1 조회 API

**GET** `/api/invoices/:invoiceId`

```
목적: 특정 견적서 조회

파라미터:
  - invoiceId (path): 견적서 ID
  - token (query): 접근 토큰

응답:
  Status 200:
  {
    "success": true,
    "data": { ...Invoice Object }
  }

  Status 401:
  {
    "success": false,
    "error": "Unauthorized"
  }

  Status 404:
  {
    "success": false,
    "error": "Invoice not found"
  }

예시:
GET /api/invoices/INV-2024-001?token=eyJhbGc...
```

#### 7.1.2 PDF 생성 API

**POST** `/api/invoices/:invoiceId/pdf`

```
목적: PDF 파일 생성 및 다운로드

파라미터:
  - invoiceId (path): 견적서 ID
  - token (body): 접근 토큰

요청 본문:
{
  "token": "eyJhbGc...",
  "format": "a4",           // 페이지 크기
  "colorMode": "rgb"       // rgb | cmyk
}

응답:
  Status 200:
  {
    "success": true,
    "downloadUrl": "/downloads/invoice_INV-2024-001_20260323.pdf"
  }

  Status 202: (백그라운드 생성)
  {
    "success": true,
    "jobId": "job-uuid-xxx",
    "message": "PDF generation in progress"
  }

예시:
POST /api/invoices/INV-2024-001/pdf
Content-Type: application/json

{
  "token": "eyJhbGc...",
  "format": "a4"
}
```

#### 7.1.3 다운로드 API

**GET** `/api/downloads/:fileId`

```
목적: 생성된 PDF 파일 다운로드

파라미터:
  - fileId (path): 파일 ID

응답:
  Status 200: Binary PDF file

  Status 404:
  {
    "success": false,
    "error": "File not found"
  }

헤더:
  Content-Type: application/pdf
  Content-Disposition: attachment; filename="invoice.pdf"
```

#### 7.1.4 토큰 검증 API

**POST** `/api/auth/verify`

```
목적: 접근 토큰 유효성 검증

요청 본문:
{
  "token": "eyJhbGc...",
  "invoiceId": "INV-2024-001"
}

응답:
  Status 200:
  {
    "valid": true,
    "invoiceId": "INV-2024-001",
    "expiresAt": "2026-04-23T23:59:59Z"
  }

  Status 401:
  {
    "valid": false,
    "reason": "Token expired"
  }
```

### 7.2 API 오류 처리

| 에러 코드 | HTTP 상태 | 설명 | 해결책 |
|---------|----------|------|-------|
| `INVALID_TOKEN` | 401 | 토큰이 유효하지 않음 | 새로운 토큰으로 재시도 |
| `TOKEN_EXPIRED` | 401 | 토큰 만료됨 | 만료된 토큰으로 재접근 |
| `INVOICE_NOT_FOUND` | 404 | 견적서를 찾을 수 없음 | invoiceId 확인 |
| `ACCESS_DENIED` | 403 | 접근 권한 없음 | 관리자에게 문의 |
| `NOTION_API_ERROR` | 500 | 노션 API 연동 실패 | 잠시 후 재시도 |
| `PDF_GENERATION_FAILED` | 500 | PDF 생성 실패 | 고객지원팀 문의 |

### 7.3 Rate Limiting

```
- 클라이언트당: 10 requests/minute
- PDF 생성: 5 requests/minute
- 전체: 1000 requests/minute (서버)

초과 시 응답:
Status 429: Too Many Requests
{
  "error": "Rate limit exceeded",
  "retryAfter": 60
}
```

---

## 8️⃣ UI/UX 컴포넌트

### 8.1 페이지 구조

#### Home/Landing Page (`/`)

```
┌────────────────────────────────┐
│        Header Component        │
├────────────────────────────────┤
│                                │
│   Welcome Section              │
│   - 서비스 설명               │
│   - CTA 버튼 (견적서 조회)    │
│                                │
│   기능 설명                    │
│   - 아이콘 + 텍스트           │
│                                │
├────────────────────────────────┤
│        Footer Component        │
└────────────────────────────────┘
```

#### Invoice Detail Page (`/invoices/:invoiceId`)

```
┌────────────────────────────────┐
│        Header Component        │
├────────────────────────────────┤
│  [← Back]                      │
│                                │
│  Invoice Card                  │
│  ┌──────────────────────────┐ │
│  │ 고객사: ABC Corp.       │ │
│  │ 프로젝트: Website Dev   │ │
│  │ 금액: 10,000,000 원    │ │
│  │                         │ │
│  │ [PDF 다운로드] [인쇄]  │ │
│  └──────────────────────────┘ │
│                                │
│  상세 정보 (테이블)            │
│  ┌──────────────────────────┐ │
│  │ 항목    | 단가 | 수량 | 금액 │
│  ├──────────────────────────┤ │
│  │ ...                      │ │
│  │ 합계          10,000,000│ │
│  └──────────────────────────┘ │
│                                │
├────────────────────────────────┤
│        Footer Component        │
└────────────────────────────────┘
```

### 8.2 주요 컴포넌트

#### 8.2.1 InvoiceCard Component

```tsx
<InvoiceCard
  invoice={invoiceData}
  onDownloadPDF={handleDownload}
  onPrint={handlePrint}
  isLoading={isPdfGenerating}
/>

// 표시 항목
- 고객사명
- 프로젝트명
- 발행일 / 유효기간
- 총 금액 (강조)
- 상태 배지 (Draft, Sent 등)
- 액션 버튼 (다운로드, 인쇄, 공유)
```

#### 8.2.2 InvoiceTable Component

```tsx
<InvoiceTable
  items={invoiceItems}
  currency="KRW"
  showTotal={true}
/>

// 컬럼
- 항목 설명
- 단가
- 수량
- 금액 (자동 계산)

// 하단
- 소계
- 세금 (10%)
- 합계 (강조)
```

#### 8.2.3 PDFDownloadButton Component

```tsx
<PDFDownloadButton
  invoiceId={invoiceId}
  isLoading={isGenerating}
  disabled={!hasAccess}
  variant="default"
/>

// 상태
- Idle: "PDF 다운로드"
- Loading: "생성 중..." + 로딩 스피너
- Success: "다운로드 완료" → 자동 초기화
- Error: "재시도" (버튼 변경)
```

#### 8.2.4 LoadingState Component

```tsx
<LoadingSkeleton
  type="invoice"
  count={1}
  animate={true}
/>

// 표시
- Header 스켈레톤
- 텍스트 블록 스켈레톤
- 테이블 행 스켈레톤
- 2초 지속 → 실제 콘텐츠
```

### 8.3 디자인 시스템

#### 색상 팔레트

| 용도 | 색상 | Hex |
|------|------|-----|
| Primary | 파란색 | #3B82F6 |
| Success | 초록색 | #10B981 |
| Warning | 주황색 | #F59E0B |
| Danger | 빨간색 | #EF4444 |
| Neutral | 회색 | #6B7280 |
| Background | 흰색 | #FFFFFF |

#### 타이포그래피

| 용도 | 크기 | 굵기 | 줄높이 |
|------|------|------|--------|
| H1 | 32px | 700 | 1.2 |
| H2 | 24px | 700 | 1.3 |
| H3 | 18px | 600 | 1.4 |
| Body | 14px | 400 | 1.5 |
| Small | 12px | 400 | 1.4 |

---

## 9️⃣ 보안 요구사항

### 9.1 인증 & 인가

#### 인증 방식

```
1. URL 토큰 방식 (MVP)
   - /invoices/{invoiceId}?token={accessToken}
   - 토큰은 JWT 형식
   - 만료시간: 7일 (설정 가능)

2. 비밀번호 방식 (선택)
   - 초기 인증: 비밀번호 입력
   - 세션: HttpOnly 쿠키에 저장
   - 만료시간: 30분

실제 구현 흐름:
┌─────────────────┐
│ 사용자 접근     │
└────────┬────────┘
         │
         ↓
┌─────────────────────────┐
│ 토큰/세션 확인          │
│ (validateToken)         │
└────────┬────────────────┘
         │
    ┌────┴────┐
    │          │
   유효      만료/무효
    │          │
    ↓          ↓
┌────────┐  ┌──────────┐
│데이터  │  │재인증    │
│표시    │  │요청      │
└────────┘  └──────────┘
```

#### 토큰 페이로드

```json
{
  "iss": "invoice-web",
  "aud": "client",
  "sub": "invoiceId",
  "invoice_id": "INV-2024-001",
  "client_email": "client@example.com",
  "iat": 1711219200,
  "exp": 1711824000,
  "jti": "unique-token-id"
}
```

### 9.2 데이터 보호

| 보안 기준 | 요구사항 | 구현 방법 |
|---------|---------|---------|
| 전송 보안 | HTTPS only | SSL/TLS 인증서 |
| 저장 보안 | 민감 정보 암호화 | AES-256 |
| 접근 제어 | 권한 검증 | JWT 검증 |
| 감사 로그 | 모든 접근 기록 | CloudWatch/로그 시스템 |
| Rate Limiting | API 남용 방지 | 분당 10회 제한 |

### 9.3 SQL Injection & XSS 방지

```typescript
// ✅ 안전한 쿼리 (parameterized)
const invoice = await db.query(
  'SELECT * FROM invoices WHERE id = $1',
  [invoiceId]
);

// ✅ XSS 방지 (React의 자동 이스케이프)
<div>{invoice.clientName}</div>  // 자동 이스케이프

// ❌ 위험한 방법 (피할 것)
<div dangerouslySetInnerHTML={{__html: invoiceData}} />
```

### 9.4 CORS 설정

```typescript
// api/middleware.ts
const allowedOrigins = [
  'https://example.com',
  'https://app.example.com'
];

if (!allowedOrigins.includes(origin)) {
  return res.status(403).json({ error: 'CORS policy violation' });
}
```

---

## 🔟 성능 요구사항

### 10.1 응답 시간 SLA

| 작업 | 목표 | 허용 범위 |
|------|------|---------|
| 페이지 로드 | < 3초 | 3-5초 (주의) |
| API 응답 | < 1초 | 1-2초 (주의) |
| PDF 생성 | < 5초 | 5-10초 (주의) |
| 캐시 히트 | < 500ms | - |

### 10.2 최적화 전략

#### Frontend 최적화

```
- 이미지 최적화 (Next.js Image)
- 코드 분할 (dynamic import)
- 스켈레톤 로딩 (로딩 경험 개선)
- 캐싱 (브라우저 캐시)
```

#### Backend 최적화

```
- Notion API 응답 캐싱 (Redis, 5분)
- PDF 생성 비동기 처리
- 데이터베이스 인덱싱
- CDN 활용 (정적 파일)
```

#### 모니터링

```
- Core Web Vitals 추적
- API 응답 시간 모니터링
- 에러율 모니터링
- 사용자 행동 분석
```

---

## 1️⃣1️⃣ 마일스톤 & 일정

### 11.1 개발 일정

```
┌─────────────────────────────────────────────────────────┐
│ Phase 1: MVP (2주)                                      │
├─────────────────────────────────────────────────────────┤
│ Week 1                                                  │
│  ├─ 프로젝트 셋업 & 구조 설정              (1d)        │
│  ├─ 페이지/컴포넌트 구현                  (3d)        │
│  └─ API 라우트 구현                       (2d)        │
│                                                         │
│ Week 2                                                  │
│  ├─ PDF 생성 기능 구현                    (2d)        │
│  ├─ 인증/권한 로직                        (2d)        │
│  ├─ 테스트 & 버그 수정                    (2d)        │
│  └─ 배포 준비                             (1d)        │
│                                                         │
│ 산출물: 웹 UI + PDF 다운로드 + 기본 보안                │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Phase 2: 개선 (1주)                                     │
├─────────────────────────────────────────────────────────┤
│  ├─ 노션 API 실제 연동                    (2d)        │
│  ├─ 권한 관리 강화                        (2d)        │
│  ├─ 분석 기능 추가                        (1d)        │
│  └─ 성능 최적화                           (2d)        │
│                                                         │
│ 산출물: 실시간 데이터 동기화, 고급 권한 관리             │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Phase 3: 최적화 (1주)                                   │
├─────────────────────────────────────────────────────────┤
│  ├─ SEO 개선                              (1d)        │
│  ├─ 접근성(A11y) 개선                     (1d)        │
│  ├─ 보안 감사 & 개선                      (2d)        │
│  └─ 문서화 & 운영 매뉴얼                  (1d)        │
│                                                         │
│ 산출물: 프로덕션 준비 완료, 운영 메뉴얼                 │
└─────────────────────────────────────────────────────────┘
```

### 11.2 마일스톤 체크리스트

#### M1: 개발 환경 구성 (Day 1)
- [ ] Next.js 프로젝트 초기 설정
- [ ] Git 저장소 설정
- [ ] 개발 가이드 문서 작성
- [ ] 팀원 온보딩

#### M2: 기본 페이지 완성 (Day 3)
- [ ] 홈 페이지 UI 구현
- [ ] 견적서 상세 페이지 UI 구현
- [ ] 컴포넌트 기본 구조 완성

#### M3: API & 데이터 연동 (Day 6)
- [ ] 더미 데이터 API 구현
- [ ] 페이지와 API 연동 완료
- [ ] 로딩/에러 상태 처리

#### M4: PDF 기능 완성 (Day 8)
- [ ] PDF 라이브러리 선정 및 설정
- [ ] PDF 생성 기능 구현
- [ ] 다운로드 기능 테스트 완료

#### M5: 보안 & 배포 (Day 10)
- [ ] 인증/권한 로직 완성
- [ ] 보안 테스트 완료
- [ ] 프로덕션 배포 완료

---

## 1️⃣2️⃣ 테스트 계획

### 12.1 테스트 전략

| 테스트 유형 | 범위 | 우선순위 |
|-----------|------|---------|
| Unit Test | 유틸리티 함수, 헬퍼 함수 | P1 |
| Integration Test | API + 데이터베이스 | P1 |
| E2E Test | 사용자 시나리오 | P2 |
| Performance Test | 로딩 시간, PDF 생성 | P2 |
| Security Test | 인증, SQL injection, XSS | P0 |

### 12.2 테스트 케이스

#### 12.2.1 견적서 조회 테스트

```gherkin
Feature: 견적서 조회

  Scenario: 유효한 토큰으로 견적서 조회
    Given 유효한 invoiceId와 토큰이 있다
    When /invoices/{invoiceId}?token=xxx에 접근한다
    Then 견적서 정보가 표시된다
    And 상태 코드 200이 반환된다

  Scenario: 무효한 토큰으로 접근 시도
    Given 만료된 토큰이 있다
    When /invoices/{invoiceId}?token=expired에 접근한다
    Then "인증 오류" 메시지가 표시된다
    And 상태 코드 401이 반환된다

  Scenario: 토큰 없이 직접 접근 시도
    When /invoices/{invoiceId}에 토큰 없이 접근한다
    Then 로그인 페이지로 리다이렉트된다
```

#### 12.2.2 PDF 다운로드 테스트

```gherkin
Feature: PDF 다운로드

  Scenario: 정상적인 PDF 다운로드
    Given 유효한 견적서 데이터가 있다
    When "PDF 다운로드" 버튼을 클릭한다
    Then PDF 파일이 생성된다
    And 브라우저 다운로드가 시작된다
    And 파일 이름이 "invoice_{id}_{date}.pdf" 형식이다

  Scenario: PDF 생성 중 에러
    Given PDF 생성 중 오류가 발생한다
    When "PDF 다운로드" 버튼을 클릭한다
    Then "PDF 생성에 실패했습니다" 메시지가 표시된다
    And "재시도" 버튼이 활성화된다
```

#### 12.2.3 보안 테스트

```gherkin
Feature: 보안

  Scenario: SQL Injection 방지
    When invoiceId에 "' OR '1'='1" 입력
    Then 안전하게 처리되고 조회되지 않는다

  Scenario: XSS 방지
    When 클라이언트명에 "<script>alert('xss')</script>" 입력
    When 견적서를 표시할 때
    Then 스크립트가 실행되지 않는다
    And 텍스트로만 표시된다

  Scenario: CSRF 방지
    When 다른 사이트에서 POST 요청을 시도한다
    Then CSRF 토큰 검증 실패
    And 요청이 거부된다
```

### 12.3 테스트 도구 & 환경

| 도구 | 용도 |
|------|------|
| **Jest** | Unit 테스트 |
| **React Testing Library** | 컴포넌트 테스트 |
| **Playwright** | E2E 테스트 |
| **Postman** | API 테스트 |
| **OWASP ZAP** | 보안 테스트 |

---

## 1️⃣3️⃣ 배포 전략

### 13.1 배포 환경

| 환경 | 용도 | 배포 방식 |
|------|------|---------|
| **Development** | 개발 및 테스트 | 자동 (main push) |
| **Staging** | 사전 검증 | 수동 태그 생성 |
| **Production** | 실제 사용 | 수동 승인 후 배포 |

### 13.2 배포 파이프라인

```
┌──────────────────────────────────────────┐
│ 1. 로컬 개발 & 커밋                      │
└────────────┬─────────────────────────────┘
             │
             ↓
┌──────────────────────────────────────────┐
│ 2. GitHub Push                           │
│    ├─ Pre-commit hooks 실행             │
│    └─ 린트, 포맷 확인                   │
└────────────┬─────────────────────────────┘
             │
             ↓
┌──────────────────────────────────────────┐
│ 3. GitHub Actions 자동화                 │
│    ├─ 코드 린트                          │
│    ├─ 단위 테스트                        │
│    ├─ 빌드 검증                         │
│    └─ 성공 → 자동 배포                  │
└────────────┬─────────────────────────────┘
             │
             ↓
┌──────────────────────────────────────────┐
│ 4. 배포 (Vercel/AWS)                     │
│    ├─ 프리뷰 배포 (자동)                │
│    ├─ Staging 배포 (자동)               │
│    └─ Production 배포 (수동 승인)       │
└────────────┬─────────────────────────────┘
             │
             ↓
┌──────────────────────────────────────────┐
│ 5. 모니터링 & 롤백                       │
│    ├─ 에러율 모니터링                    │
│    ├─ 성능 메트릭 확인                   │
│    └─ 문제 시 자동 롤백                 │
└──────────────────────────────────────────┘
```

### 13.3 배포 체크리스트

#### Pre-Deployment

```
배포 전 확인사항:
- [ ] 모든 테스트 통과 (npm run test)
- [ ] 빌드 성공 (npm run build)
- [ ] Staging 환경에서 검증 완료
- [ ] 보안 검사 통과 (npm run check-all)
- [ ] 성능 메트릭 확인 (Core Web Vitals)
- [ ] 배포 노트 작성
- [ ] 롤백 계획 수립
```

#### Post-Deployment

```
배포 후 확인사항:
- [ ] 프로덕션 환경 접속 확인
- [ ] 주요 기능 동작 확인
- [ ] 에러 로그 모니터링 (첫 1시간)
- [ ] 응답 시간 모니터링
- [ ] 사용자 피드백 수집
```

### 13.4 배포 도구 & 호스팅

| 구분 | 선택지 | 추천 |
|------|--------|------|
| **호스팅** | Vercel / AWS / Azure | Vercel (Next.js 최적화) |
| **CI/CD** | GitHub Actions / GitLab CI | GitHub Actions |
| **Database** | PostgreSQL / MongoDB | Notion API (1차) |
| **모니터링** | Sentry / DataDog | Sentry (에러 추적) |
| **로깅** | CloudWatch / ELK | CloudWatch (AWS 사용 시) |

---

## 1️⃣4️⃣ 위험 요소 & 완화 방안

### 14.1 기술적 위험

| 위험 | 영향도 | 확률 | 완화 방안 |
|------|--------|------|---------|
| 노션 API 정지 | 높음 | 낮음 | 폴백 데이터 소스 준비, 모니터링 |
| PDF 생성 성능 저하 | 중간 | 중간 | 비동기 처리, 캐싱 전략 |
| 보안 취약점 발견 | 높음 | 중간 | 정기 보안 감사, 버그 바운티 |
| 데이터 손실 | 높음 | 낮음 | 자동 백업, 재해 복구 계획 |

### 14.2 운영적 위험

| 위험 | 영향도 | 확률 | 완화 방안 |
|------|--------|------|---------|
| 트래픽 급증 | 중간 | 낮음 | 자동 스케일링, Load Balancing |
| 스토리지 부족 | 낮음 | 낮음 | S3 연동, 자동 정리 정책 |
| 팀 인력 부족 | 높음 | 낮음 | 문서화, 자동화 스크립트 |

### 14.3 완화 전략

#### 노션 API 연동 위험 완화

```
Phase 1 (MVP): 더미 데이터 사용
  ↓
Phase 2: 노션 API 테스트 (sandbox)
  ↓
Phase 3: 프로덕션 연동 (circuit breaker 포함)
  ↓
Fallback: 동기화된 로컬 데이터베이스 유지
```

#### 성능 저하 완화

```
모니터링 → 임계값 초과 → 자동 알림
  ↓
분석 및 병목 지점 파악
  ↓
최적화 (캐싱, 비동기 처리)
  ↓
성능 재평가 및 배포
```

---

## 1️⃣5️⃣ 성공 기준 & KPI

### 15.1 기술적 성공 기준

| 지표 | 목표 | 측정 방법 |
|------|------|---------|
| 페이지 로드 시간 | < 3초 | Google PageSpeed Insights |
| PDF 생성 시간 | < 5초 | 성능 테스트 |
| API 응답 시간 | < 1초 (평균) | CloudWatch 메트릭 |
| 가용성 | 99.9% | 모니터링 대시보드 |
| 에러율 | < 0.1% | Sentry 대시보드 |

### 15.2 비즈니스 KPI

| KPI | 목표 | 측정 기간 |
|------|------|---------|
| 월간 활성 사용자 (MAU) | 100+ | 월 단위 |
| PDF 다운로드 수 | 500+ | 월 단위 |
| 사용자 만족도 | 4.5/5.0+ | 분기 단위 |
| 시스템 운영 시간 | 98%+ | 월 단위 |

### 15.3 런칭 체크리스트

```
기술:
- [ ] 모든 테스트 통과
- [ ] 성능 메트릭 달성
- [ ] 보안 검사 통과

운영:
- [ ] 배포 프로세스 확인
- [ ] 모니터링 시스템 구성
- [ ] 온콜(On-call) 일정 수립

문서화:
- [ ] 사용자 가이드 완성
- [ ] 운영 매뉴얼 완성
- [ ] API 문서 완성

마케팅:
- [ ] 런칭 공지
- [ ] 고객 교육 완료
- [ ] 피드백 수집 체계 구성
```

---

## 📚 부록

### A. 용어 정의

| 용어 | 정의 |
|------|------|
| **Invoice** | 견적서, 청구서 (본 문서에서는 견적서) |
| **Token** | 접근 권한을 나타내는 JWT 토큰 |
| **Notion API** | 노션 데이터베이스에 접근하는 API |
| **MVP** | Minimum Viable Product (최소 기능 제품) |
| **P0/P1/P2** | 우선순위 (P0=높음, P2=낮음) |
| **SLA** | Service Level Agreement (서비스 수준 약정) |

### B. 참고 자료

- [Next.js 공식 문서](https://nextjs.org/)
- [React 18 업그레이드 가이드](https://react.dev/)
- [Notion API 문서](https://developers.notion.com/)
- [shadcn/ui 컴포넌트 라이브러리](https://ui.shadcn.com/)
- [TailwindCSS 문서](https://tailwindcss.com/)
- [OWASP Top 10](https://owasp.org/Top10/)

### C. 관련 문서

- 📗 `CLAUDE.md` - 프로젝트 기술 스택 정의
- 📗 `docs/guides/project-structure.md` - 프로젝트 폴더 구조
- 📗 `docs/guides/component-patterns.md` - 컴포넌트 작성 패턴
- 📗 `docs/ROADMAP.md` - 개발 로드맵

---

## 최종 서명

| 역할 | 이름 | 서명 | 날짜 |
|------|------|------|------|
| **PM** | TBD | | 2026-03-23 |
| **개발 리드** | TBD | | 2026-03-23 |
| **QA 리드** | TBD | | 2026-03-23 |

---

**문서 히스토리**

| 버전 | 날짜 | 변경사항 |
|------|------|---------|
| 1.0 | 2026-03-23 | 초기 문서 작성 |

**상태**: 🔄 검토 중 → (승인 대기)

---

**다음 단계**:
1. 팀원 검토 및 피드백
2. PRD 승인
3. 기술 스펙 작성
4. 개발 시작
