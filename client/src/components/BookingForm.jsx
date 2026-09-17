import { useState } from 'react';
import { CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';
import { api } from '../services/api.js';
import { useServices } from '../hooks/useServices.js';
import { AREAS } from '../data/areas.js';

const EMPTY = {
  name: '', phone: '', whatsapp: '', service: '',
  preferredDate: '', preferredTime: '', address: '', message: ''
};

const TIME_SLOTS = ['Morning (8 am – 12 pm)', 'Afternoon (12 pm – 4 pm)', 'Evening (4 pm – 8 pm)', 'Any time'];

const field = 'w-full rounded-xl2 border border-navy/12 bg-white px-4 py-3 text-navy placeholder:text-navy/35 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/25';
const labelCls = 'mb-1.5 block text-sm font-semibold text-navy';

export default function BookingForm({ defaultService = '', compact = false }) {
  const { services } = useServices();
  const [form, setForm] = useState({ ...EMPTY, service: defaultService });
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', message: '' });
    try {
      const { message } = await api.post('/bookings', form);
      setStatus({ state: 'success', message });
      setForm({ ...EMPTY, service: defaultService });
    } catch (err) {
      setStatus({ state: 'error', message: err.message });
    }
  };

  if (status.state === 'success') {
    return (
      <div className="card flex flex-col items-start gap-3 p-8">
        <CheckCircle2 className="h-9 w-9 text-teal" aria-hidden="true" />
        <h3>Request sent</h3>
        <p className="text-slateink">{status.message}</p>
        <button type="button" onClick={() => setStatus({ state: 'idle', message: '' })} className="btn-ghost mt-2">
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`card p-6 sm:p-8 ${compact ? '' : ''}`} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>Your name</label>
          <input id="name" name="name" value={form.name} onChange={update} required autoComplete="name" className={field} placeholder="Full name" />
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>Phone number</label>
          <input id="phone" name="phone" type="tel" value={form.phone} onChange={update} required autoComplete="tel" inputMode="tel" className={field} placeholder="10-digit mobile number" />
        </div>
        <div>
          <label htmlFor="whatsapp" className={labelCls}>WhatsApp number <span className="font-normal text-slateink">(optional)</span></label>
          <input id="whatsapp" name="whatsapp" type="tel" value={form.whatsapp} onChange={update} inputMode="tel" className={field} placeholder="If different from above" />
        </div>
        <div>
          <label htmlFor="service" className={labelCls}>Service required</label>
          <select id="service" name="service" value={form.service} onChange={update} required className={field}>
            <option value="">Choose a service</option>
            {services.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
            <option value="Other / not sure">Other or not sure</option>
          </select>
        </div>
        <div>
          <label htmlFor="preferredDate" className={labelCls}>Preferred date</label>
          <input id="preferredDate" name="preferredDate" type="date" value={form.preferredDate} onChange={update} min={new Date().toISOString().split('T')[0]} className={field} />
        </div>
        <div>
          <label htmlFor="preferredTime" className={labelCls}>Preferred time</label>
          <select id="preferredTime" name="preferredTime" value={form.preferredTime} onChange={update} className={field}>
            <option value="">Choose a time</option>
            {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="address" className={labelCls}>Address or area</label>
          <input id="address" name="address" value={form.address} onChange={update} required list="area-list" className={field} placeholder="House or flat, locality, city" />
          <datalist id="area-list">
            {AREAS.map((a) => <option key={a.slug} value={a.name} />)}
          </datalist>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelCls}>Anything else we should know <span className="font-normal text-slateink">(optional)</span></label>
          <textarea id="message" name="message" rows={4} value={form.message} onChange={update} className={field} placeholder="Number of rooms, bathrooms, problem areas, or anything specific" />
        </div>
      </div>

      {status.state === 'error' && (
        <p role="alert" className="mt-4 flex items-start gap-2 rounded-xl2 bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /> {status.message}
        </p>
      )}

      <button type="submit" disabled={status.state === 'loading'} className="btn-teal mt-6 w-full sm:w-auto disabled:opacity-70">
        {status.state === 'loading'
          ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending</>
          : <><Send className="h-4 w-4" aria-hidden="true" /> Request cleaning service</>}
      </button>
      <p className="mt-3 text-sm text-slateink">We call you back to confirm the visit and discuss what the job needs.</p>
    </form>
  );
}
