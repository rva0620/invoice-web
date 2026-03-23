import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Container } from '@/components/layout/container'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Container>
          <section className="space-y-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight">
                Invoice Web MVP
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                노션의 견적서를 웹에서 확인하고 PDF로 다운로드받으세요
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <a
                  href="/invoices"
                  className="inline-flex items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-sm font-medium text-white hover:bg-blue-700"
                >
                  견적서 조회
                </a>
              </div>
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
