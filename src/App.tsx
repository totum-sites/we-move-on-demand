import { useEffect, lazy, Suspense } from 'react';
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { Footer } from './sections/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';
import './App.css';

const Services = lazy(() => import('./sections/Services').then(m => ({ default: m.Services })));
const About = lazy(() => import('./sections/About').then(m => ({ default: m.About })));
const Testimonials = lazy(() => import('./sections/Testimonials').then(m => ({ default: m.Testimonials })));
const RealMoves = lazy(() => import('./sections/RealMoves').then(m => ({ default: m.RealMoves })));
const FAQ = lazy(() => import('./sections/FAQ').then(m => ({ default: m.FAQ })));
const FreeEstimate = lazy(() => import('./sections/FreeEstimate').then(m => ({ default: m.FreeEstimate })));

function App() {
  useEffect(() => {
    document.title = 'We Move On Demand - Top Moving Services in Florida';
  }, []);

  return (
    <div className="min-h-screen bg-[#F3F3F1]">
      <Header />
      <main>
        <Hero />
        <ErrorBoundary>
          <Suspense fallback={<div className="h-24 bg-white" role="status" aria-live="polite"><span className="sr-only">Carregando serviços...</span></div>}>
            <Services />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<div className="h-24 bg-[#F3F3F1]" role="status" aria-live="polite"><span className="sr-only">Carregando sobre...</span></div>}>
            <About />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<div className="h-24 bg-white" role="status" aria-live="polite"><span className="sr-only">Carregando depoimentos...</span></div>}>
            <Testimonials />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<div className="h-24 bg-white" role="status" aria-live="polite"><span className="sr-only">Carregando galeria...</span></div>}>
            <RealMoves />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<div className="h-24 bg-[#F3F3F1]" role="status" aria-live="polite"><span className="sr-only">Carregando perguntas frequentes...</span></div>}>
            <FAQ />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<div className="h-24 bg-white" role="status" aria-live="polite"><span className="sr-only">Carregando formulário...</span></div>}>
            <FreeEstimate />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}

export default App;
