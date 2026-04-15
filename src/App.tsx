import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MainPage } from './pages/MainPage';
import { CompanyPage } from './pages/CompanyPage';
import { ServicePage } from './pages/ServicePage';
import { InquiryPage } from './pages/InquiryPage';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  return (
    <HelmetProvider>
      <Router basename="/windhompage2/">
        <ScrollToTop />
        <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-black selection:text-white">
          <Header />
          <main className="flex-grow pt-16 md:pt-20">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/company" element={<CompanyPage />} />
              <Route path="/service" element={<ServicePage />} />
              <Route path="/inquiry" element={<InquiryPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}
