---
name: Invoice Web MVP 프로젝트 스펙
description: 노션 기반 견적서 웹 조회 및 PDF 다운로드 MVP 프로젝트 기술 스펙
type: project
---

# Invoice Web MVP - 프로젝트 스펙

## 핵심 특성

**기술 스택**

- Frontend: Next.js 15.5.3, React 19, TypeScript 5, TailwindCSS v4, shadcn/ui
- Backend: Next.js API Routes, Server Actions
- Authentication: JWT + Cookies (토큰 기반)
- PDF: jsPDF + html2canvas 또는 puppeteer
- Forms: React Hook Form + Zod

**데이터 소스**

- Phase 1: 더미 데이터 (JSON)
- Phase 2+: Notion API 연동

## MVP 필수 기능

### P0 (Critical)

1. 견적서 조회 페이지 - 노션 기반 데이터 웹 표시
2. PDF 다운로드 - 클릭으로 PDF 생성 및 다운로드
3. 기본 인증 - 토큰 기반 접근 제어

### P1 (High)

1. 반응형 디자인 - 데스크톱/모바일 지원
2. 에러 처리 - 사용자 친화적 오류 메시지

## 핵심 고려사항

1. **공통모듈 우선**: API 클라이언트, 유틸리티, 타입 정의 등 먼저 구현
2. **사용자 입력 검증**: 모든 입력에 Zod 검증 추가
3. **E2E 테스트**: Playwright를 활용한 주요 플로우 테스트
4. **점진적 개발**: MVP부터 차례대로 구현

## 예상 개발 기간

- 전체: 약 10일 (MVP 완성)
- Phase 1 (기본 기능): Day 1-8
- Phase 1 (배포/최적화): Day 9-10

## 주요 마일스톤

- M1: 개발 환경 구성 (Day 1)
- M2: 기본 페이지 완성 (Day 3)
- M3: API & 데이터 연동 (Day 6)
- M4: PDF 기능 완성 (Day 8)
- M5: 보안 & 배포 (Day 10)
