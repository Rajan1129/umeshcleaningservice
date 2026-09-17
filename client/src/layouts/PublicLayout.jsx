import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import MobileCtaBar from '../components/MobileCtaBar.jsx';
import ScrollToTop from '../components/ScrollToTop.jsx';

export default function PublicLayout() {
  return (
    <>
      <ScrollToTop />
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <Navbar />
      <main id="main"><Outlet /></main>
      <Footer />
      <MobileCtaBar />
    </>
  );
}
