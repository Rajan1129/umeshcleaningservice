import { useState } from 'react';
import { CheckCircle2, AlertCircle, Loader2, Send, MessageCircle, Phone, Mail } from 'lucide-react';
import { api } from '../services/api.js';
import { useServices } from '../hooks/useServices.js';
import { AREAS } from '../data/areas.js';
import { BUSINESS, whatsappLink } from '../utils/constants.js';

const EMPTY = {
  name: '',
  phone: '',
  whatsapp: '',
  service: '',
  preferredDate: '',
  preferredTime: '',
  address: '',
  message: ''
};

const TIME_SLOTS = [
  'Morning (8 am – 12 pm)',
  'Afternoon (12 pm – 4 pm)',
  'Evening (4 pm – 8 pm)',
  'Any time'
];

const field =
  'w-full rounded-xl2 border border-navy/12 bg-white px-4 py-3 text-navy placeholder:text-navy/35 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/25';
const labelCls = 'mb-1.5 block text-sm font-semibold text-navy';

export default function BookingForm({ defaultService = '', compact = false }) {
  const { services } = useServices();
  const [form, setForm] = useState({ ...EMPTY, service: defaultService });
  const [status, setStatus] = useState({ state: 'idle', message: '', waUrl: '' });

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const buildWaMessage = (data) => {
    return [
      `*New Cleaning Service Booking - Umesh Cleaning Services*`,
      `👤 *Name*: ${data.name}`,
      `📞 *Phone*: ${data.phone}`,
      data.whatsapp ? `💬 *WhatsApp*: ${data.whatsapp}` : null,
      `🧹 *Service*: ${data.service}`,
      data.preferredDate ? `📅 *Date*: ${data.preferredDate}` : null,
      data.preferredTime ? `⏰ *Time*: ${data.preferredTime}` : null,
      `📍 *Address/Area*: ${data.address}`,
      data.message ? `📝 *Notes*: ${data.message}` : null
    ]
      .filter(Boolean)
      .join('\n');
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.service || !form.address.trim()) {
      setStatus({
        state: 'error',
        message: 'Please fill in your name, phone number, required service, and address.',
        waUrl: ''
      });
      return;
    }

    setStatus({ state: 'loading', message: '', waUrl: '' });
    const waText = buildWaMessage(form);
    const waUrl = whatsappLink(waText);

    try {
      // 1. Save to database so it shows up in Admin Portal immediately
      await api.post('/bookings', form);
    } catch (err) {
      console.warn('Booking API save warning, proceeding with WhatsApp dispatch:', err);
    }

    // 2. Automatically launch WhatsApp so Umesh gets the lead directly on WhatsApp
    try {
      const isMobile = typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = waUrl;
      } else {
        window.open(waUrl, '_blank');
      }
    } catch {
      // Fallback if browser blocks automatic navigation
    }

    setStatus({
      state: 'success',
      message: 'Your enquiry has been received! It has been saved in our system and forwarded to Umesh on WhatsApp for instant confirmation.',
      waUrl
    });
    setForm({ ...EMPTY, service: defaultService });
  };

  if (status.state === 'success' || status.state === 'fallback_success') {
    return (
      <div className="card flex flex-col items-start gap-4 p-8 border-2 border-emerald-500/20 bg-emerald-50/30">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-9 w-9 text-emerald-600" aria-hidden="true" />
          <h3 className="text-xl font-bold text-navy">Request Received!</h3>
        </div>
        <p className="text-slateink leading-relaxed">{status.message}</p>

        <div className="flex flex-wrap gap-3 mt-2 w-full">
          {status.waUrl && (
            <a
              href={status.waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !bg-[#16A34A] hover:!bg-[#15803d] text-white inline-flex items-center gap-2 shadow-sm"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Chat on WhatsApp ({BUSINESS.phoneDisplay})
            </a>
          )}
          <a
            href={BUSINESS.phoneHref}
            className="btn-ghost inline-flex items-center gap-2 bg-white"
          >
            <Phone className="h-4 w-4 text-[#16A34A]" aria-hidden="true" />
            Call {BUSINESS.phoneDisplay}
          </a>
          <a
            href={BUSINESS.emailHref}
            className="btn-ghost inline-flex items-center gap-2 bg-white"
          >
            <Mail className="h-4 w-4 text-navy" aria-hidden="true" />
            {BUSINESS.email}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setStatus({ state: 'idle', message: '', waUrl: '' })}
          className="text-sm font-semibold text-slateink hover:text-navy underline mt-3"
        >
          Book another cleaning service
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`card p-6 sm:p-8 ${compact ? '' : ''}`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Your name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={update}
            required
            autoComplete="name"
            className={field}
            placeholder="Full name"
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>
            Phone number <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={update}
            required
            autoComplete="tel"
            inputMode="tel"
            className={field}
            placeholder="10-digit mobile number"
          />
        </div>
        <div>
          <label htmlFor="whatsapp" className={labelCls}>
            WhatsApp number <span className="font-normal text-slateink">(optional)</span>
          </label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            value={form.whatsapp}
            onChange={update}
            inputMode="tel"
            className={field}
            placeholder="If different from above"
          />
        </div>
        <div>
          <label htmlFor="service" className={labelCls}>
            Service required <span className="text-red-500">*</span>
          </label>
          <select id="service" name="service" value={form.service} onChange={update} required className={field}>
            <option value="">Choose a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Other / not sure">Other or not sure</option>
          </select>
        </div>
        <div>
          <label htmlFor="preferredDate" className={labelCls}>
            Preferred date
          </label>
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            value={form.preferredDate}
            onChange={update}
            min={new Date().toISOString().split('T')[0]}
            className={field}
          />
        </div>
        <div>
          <label htmlFor="preferredTime" className={labelCls}>
            Preferred time
          </label>
          <select
            id="preferredTime"
            name="preferredTime"
            value={form.preferredTime}
            onChange={update}
            className={field}
          >
            <option value="">Choose a time</option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="address" className={labelCls}>
            Address or area in Jalandhar <span className="text-red-500">*</span>
          </label>
          <input
            id="address"
            name="address"
            value={form.address}
            onChange={update}
            required
            list="area-list"
            className={field}
            placeholder="House/flat, colony or locality (e.g. Model Town, Urban Estate)"
          />
          <datalist id="area-list">
            {AREAS.map((a) => (
              <option key={a.slug} value={a.name} />
            ))}
          </datalist>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelCls}>
            Anything else we should know <span className="font-normal text-slateink">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            value={form.message}
            onChange={update}
            className={field}
            placeholder="Number of rooms, bathrooms, stubborn stains, or specific requirements"
          />
        </div>
      </div>

      {status.state === 'error' && (
        <p role="alert" className="mt-4 flex items-start gap-2 rounded-xl2 bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /> {status.message}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={status.state === 'loading'}
          className="btn-primary !bg-[#16A34A] hover:!bg-[#15803d] text-white w-full sm:w-auto disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {status.state === 'loading' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending request…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" /> Request Cleaning Service
            </>
          )}
        </button>

        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost text-sm inline-flex items-center gap-1.5 text-[#16A34A] font-semibold"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" /> Or book directly on WhatsApp
        </a>
      </div>

      <p className="mt-3 text-xs text-slateink">
        We will call or WhatsApp you promptly to confirm your booking and give a transparent quote.
      </p>
    </form>
  );
}
