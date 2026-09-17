import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout.jsx';
import Home from '../pages/Home.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

// Public pages below the fold of the first visit, and the whole admin panel,
// are code-split so the home page ships the smallest possible bundle.
const About = lazy(() => import('../pages/About.jsx'));
const Services = lazy(() => import('../pages/Services.jsx'));
const ServiceDetail = lazy(() => import('../pages/ServiceDetail.jsx'));
const AreaPage = lazy(() => import('../pages/AreaPage.jsx'));
const Gallery = lazy(() => import('../pages/Gallery.jsx'));
const BeforeAfter = lazy(() => import('../pages/BeforeAfter.jsx'));
const Reviews = lazy(() => import('../pages/Reviews.jsx'));
const Faq = lazy(() => import('../pages/Faq.jsx'));
const Contact = lazy(() => import('../pages/Contact.jsx'));
const NotFound = lazy(() => import('../pages/NotFound.jsx'));

const AdminLayout = lazy(() => import('../layouts/AdminLayout.jsx'));
const Login = lazy(() => import('../pages/admin/Login.jsx'));
const Dashboard = lazy(() => import('../pages/admin/Dashboard.jsx'));
const Bookings = lazy(() => import('../pages/admin/Bookings.jsx'));
const BookingDetail = lazy(() => import('../pages/admin/BookingDetail.jsx'));
const ServicesAdmin = lazy(() => import('../pages/admin/ServicesAdmin.jsx'));
const GalleryAdmin = lazy(() => import('../pages/admin/GalleryAdmin.jsx'));
const BeforeAfterAdmin = lazy(() => import('../pages/admin/BeforeAfterAdmin.jsx'));
const ReviewsAdmin = lazy(() => import('../pages/admin/ReviewsAdmin.jsx'));

const Loading = () => <div className="grid min-h-[50vh] place-items-center text-slateink">Loading…</div>;

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="cleaning-services-in-:areaSlug" element={<AreaPage />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="before-after" element={<BeforeAfter />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="faq" element={<Faq />} />
          <Route path="contact" element={<Contact />} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="bookings/:id" element={<BookingDetail />} />
          <Route path="services" element={<ServicesAdmin />} />
          <Route path="gallery" element={<GalleryAdmin />} />
          <Route path="before-after" element={<BeforeAfterAdmin />} />
          <Route path="reviews" element={<ReviewsAdmin />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
