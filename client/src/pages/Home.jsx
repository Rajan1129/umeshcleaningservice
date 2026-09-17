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
      <GalleryPreview />
      <FaqSection faqs={HOME_FAQS} title="Frequently asked questions" subtitle="Common questions from customers in Jalandhar before they book." />
      <FinalCta />
    </>
  );
}
