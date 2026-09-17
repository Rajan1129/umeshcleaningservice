import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, MessageCircle, CalendarCheck, Phone, ShieldCheck } from 'lucide-react';
import SmartImage from '../ui/SmartImage.jsx';
import { BUSINESS, whatsappLink } from '../../utils/constants.js';
import { IMAGES } from '../../utils/images.js';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-mist to-white">
      <div className="container-x grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-xl"
        >
          <p className="eyebrow">
            <MapPin className="h-4 w-4" aria-hidden="true" /> Serving Jalandhar &amp; nearby areas
          </p>

          <h1 className="mt-4">Professional Cleaning Services in Jalandhar</h1>

          <p className="lede mt-5">
            Reliable home, office and deep cleaning services in Jalandhar. Book professional cleaners
            for a cleaner, healthier and fresher space.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary">
              <CalendarCheck className="h-[1.1em] w-[1.1em]" aria-hidden="true" /> Book a cleaning service
            </Link>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              <MessageCircle className="h-[1.1em] w-[1.1em]" aria-hidden="true" /> WhatsApp us
            </a>
            <a href={BUSINESS.phoneHref} className="btn-call">
              <Phone className="h-[1.1em] w-[1.1em]" aria-hidden="true" /> Call {BUSINESS.phoneDisplay}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-navy/8 pt-6 text-sm">
            <span className="flex items-center gap-1.5 font-semibold text-navy">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
              {BUSINESS.rating}/5 on Google
            </span>
            <span className="text-slateink">{BUSINESS.reviewCount} Google reviews</span>
            <span className="text-slateink">Home · Office · Deep cleaning</span>
          </div>
        </motion.div>

        <div className="relative">
          <SmartImage
            src={IMAGES.hero}
            alt="Professional cleaner deep cleaning a home in Jalandhar"
            label="Hero photo: your team at work on a real job in Jalandhar"
            ratio="aspect-[4/3] sm:aspect-[5/4]"
            className="shadow-lift ring-1 ring-navy/10"
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
          <div className="absolute -bottom-4 -left-4 hidden sm:flex items-center gap-3 rounded-xl2 bg-white/95 p-3.5 shadow-lift ring-1 ring-navy/8 backdrop-blur">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-green-50 text-green-600">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </span>
            <div className="text-left">
              <p className="font-display text-sm font-bold text-navy">100% Quality Checked</p>
              <p className="text-xs text-slateink">Verified Cleaners in Jalandhar</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
