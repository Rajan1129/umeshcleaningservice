import Seo from '../components/Seo.jsx';
import Hero from '../components/home/Hero.jsx';
import TrustBar from '../components/home/TrustBar.jsx';
import ServicesSection from '../components/home/ServicesSection.jsx';
import DeepCleaningSection from '../components/home/DeepCleaningSection.jsx';
import BeforeAfterSection from '../components/home/BeforeAfterSection.jsx';
import WhyChooseUs from '../components/home/WhyChooseUs.jsx';
import HowItWorks from '../components/home/HowItWorks.jsx';
import ServiceAreas from '../components/home/ServiceAreas.jsx';
import ReviewsSection from '../components/home/ReviewsSection.jsx';
import GalleryPreview from '../components/home/GalleryPreview.jsx';
import FaqSection from '../components/home/FaqSection.jsx';
import FinalCta from '../components/home/FinalCta.jsx';
import BookingForm from '../components/BookingForm.jsx';
import { HOME_FAQS } from '../data/faqs.js';
import { localBusinessSchema, faqSchema } from '../utils/seo.js';

export default function Home() {
  return (
    <>
      <Seo
        title="Cleaning Services in Jalandhar | Umesh Cleaning Services"
        description="Professional home, deep, sofa, kitchen, bathroom and office cleaning in Jalandhar and nearby areas. Rated 4.8/5 on Google. Call 07828900308 for a free quote."
        path="/"
        schemas={[localBusinessSchema(), faqSchema(HOME_FAQS)]}
      />
      <Hero />
      <TrustBar />
      <ServicesSection />
      <DeepCleaningSection />
      <BeforeAfterSection limit={6} />
      <WhyChooseUs />
      <HowItWorks />
      <ServiceAreas />
      <ReviewsSection />

      {/* Booking Form Section on Home Page */}
      <section className="section bg-mist/60 py-12 sm:py-16">
        <div className="container-x">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <p className="eyebrow">Quick &amp; Hassle-Free</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-navy">Book a Cleaning Service in Jalandhar</h2>
            <p className="text-slateink mt-2 text-sm sm:text-base">
              Share what needs cleaning. Your enquiry is recorded instantly in our system and forwarded to Umesh on WhatsApp for prompt scheduling.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <BookingForm />
          </div>
        </div>
      </section>

      <GalleryPreview />
      <FaqSection faqs={HOME_FAQS} title="Frequently asked questions" subtitle="Common questions from customers in Jalandhar before they book." />
      <FinalCta />
    </>
  );
}
