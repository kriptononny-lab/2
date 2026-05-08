'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

function Counter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { const el = ref.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.4 }); obs.observe(el); return () => obs.disconnect(); }, [started]);
  useEffect(() => { if (!started) return; const d = 1800, s = performance.now(); function step(n: number) { const t = Math.min((n - s) / d, 1); setCount(Math.floor(target * (1 - Math.pow(1 - t, 3)))); if (t < 1) requestAnimationFrame(step); else setCount(target); } requestAnimationFrame(step); }, [started, target]);
  return (<div ref={ref} className="text-center"><div className="font-heading text-[2.6rem] font-medium text-[#1F4D3F] leading-none mb-1.5">{count}<small className="text-[0.4em] text-[#B89043] ml-0.5">{suffix}</small></div><div className="text-[0.75rem] tracking-[0.16em] uppercase text-[#4A524D] font-medium">{label}</div></div>);
}

function Eyebrow({ children, center }: { children: string; center?: boolean }) {
  return (<div className={`inline-flex items-center gap-3 text-[0.72rem] font-medium tracking-[0.24em] uppercase text-[#1F4D3F] mb-6 ${center ? 'justify-center' : ''}`}><span className="w-7 h-px bg-[#B89043]" />{children}</div>);
}

export default function V2Page() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const switchLocale = (l: string) => { const s = pathname.split('/'); s[1] = l; router.push(s.join('/')); };
  useEffect(() => { const h = (e: KeyboardEvent) => { if (e.key === 'Escape') setModalOpen(false); }; document.addEventListener('keydown', h); return () => document.removeEventListener('keydown', h); }, []);

  const navItems = [{ label: t('nav.benefits'), href: '#about' }, { label: t('nav.services'), href: '#services' }, { label: t('nav.pricing'), href: '#pricing' }, { label: t('nav.reviews'), href: '#reviews' }, { label: t('nav.contact'), href: '#contact' }];
  const advItems = t.raw('advantages.items') as Array<{ title: string; desc: string }>;
  const svcItems = t.raw('services.items') as Array<{ title: string; cta: string }>;
  const svcDescs = t.raw('services.descriptions') as string[];
  const svcPhotos = [
    'https://images.unsplash.com/photo-1758523670991-ee93bc48d81d?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1741655262435-4890ab9918fa?w=800&q=80&auto=format&fit=crop',
    'https://plus.unsplash.com/premium_photo-1682088423985-9eb51e3160f9?w=800&q=80&auto=format&fit=crop',
    'https://plus.unsplash.com/premium_photo-1682088432727-ecbc08381a63?w=800&q=80&auto=format&fit=crop',
  ];
  const priceItems = t.raw('pricing.items') as Array<{ people: string; price: string; unit: string }>;
  const revItems = t.raw('reviews.items') as Array<{ name: string; location: string; text: string; tag: string }>;
  const cities = t.raw('map.cities') as string[];

  return (
    <div>
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#FAF7F2]/92 backdrop-blur-xl border-b border-[#E2DDD3]">
        <div className="max-w-[1240px] mx-auto px-8 flex items-center justify-between h-[84px]">
          <a href="#" className="flex items-center gap-3.5">
            <img src="/logo.png" alt="KC" className="h-14" />
            <div className="flex flex-col leading-tight"><span className="font-heading text-[1.4rem] font-semibold tracking-wider">KingdomCars</span><span className="text-[0.65rem] font-medium tracking-[0.24em] uppercase text-[#1F4D3F] mt-0.5">Transport · Warszawa</span></div>
          </a>
          <nav className="hidden lg:flex items-center gap-9">
            {navItems.map((n, i) => (<a key={i} href={n.href} className="text-[0.82rem] font-medium tracking-wider uppercase text-[#4A524D] hover:text-[#1F4D3F] transition-colors">{n.label}</a>))}
            <div className="flex items-center gap-0.5 ml-3 border border-[#E2DDD3] rounded overflow-hidden">
              {['pl', 'ru'].map(l => (<button key={l} onClick={() => switchLocale(l)} className={`px-3 py-1.5 text-xs font-semibold uppercase transition-all ${locale === l ? 'bg-[#1F4D3F] text-white' : 'text-[#4A524D]'}`}>{l}</button>))}
            </div>
            <button onClick={() => setModalOpen(true)} className="ml-3 px-5 py-2.5 bg-[#1F4D3F] text-white text-[0.75rem] font-medium uppercase tracking-wider rounded-sm hover:bg-[#163B30] hover:-translate-y-0.5 transition-all inline-flex items-center gap-2">{t('nav.cta')} →</button>
          </nav>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-2xl">☰</button>
        </div>
        {mobileOpen && (<div className="lg:hidden bg-[#F2EDE5] border-t border-[#E2DDD3] px-8 py-6 flex flex-col gap-4">{navItems.map((n, i) => <a key={i} href={n.href} onClick={() => setMobileOpen(false)} className="text-sm font-medium uppercase tracking-wider text-[#4A524D]">{n.label}</a>)}<div className="flex gap-2 mt-2">{['pl', 'ru'].map(l => <button key={l} onClick={() => switchLocale(l)} className={`px-4 py-2 text-xs font-semibold uppercase rounded ${locale === l ? 'bg-[#1F4D3F] text-white' : 'border border-[#E2DDD3]'}`}>{l}</button>)}</div></div>)}
      </header>

      {/* HERO */}
      <section className="py-20 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-[-200px] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(31,77,63,0.04),transparent_70%)] pointer-events-none" />
        <div className="max-w-[1240px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-20 items-center">
          <div>
            <Eyebrow>{t('hero.badge')}</Eyebrow>
            <h1 className="font-heading text-[clamp(2.8rem,5.5vw,4.6rem)] font-bold leading-[1.18] tracking-tight mb-7">{t('hero.title1')}<br />{t('hero.title2')} <em className="text-[#1F4D3F] not-italic font-bold">{t('hero.titleHighlight')}</em></h1>
            <p className="text-lg text-[#4A524D] max-w-[460px] mb-10 leading-relaxed">{t('hero.description')}</p>
            <div className="flex gap-4 flex-wrap">
              <button onClick={() => setModalOpen(true)} className="px-8 py-4 bg-[#1F4D3F] text-white text-[0.85rem] font-medium uppercase tracking-wider rounded-sm hover:bg-[#163B30] hover:-translate-y-0.5 transition-all inline-flex items-center gap-2.5">{t('hero.ctaButton')} →</button>
              <a href="#services" className="px-8 py-4 text-[#1A1F1C] border border-[#1A1F1C] text-[0.85rem] font-medium uppercase tracking-wider rounded-sm hover:bg-[#1A1F1C] hover:text-white transition-all">{t('hero.servicesButton')}</a>
            </div>
          </div>
          <div className="relative" style={{ aspectRatio: '4/5' }}>
            <div className="relative w-full h-full bg-[#F2EDE5] border border-[#E2DDD3] overflow-hidden">
              <div className="absolute inset-3 border border-[#D4B97A]/40 pointer-events-none z-10" />
              <div className="w-full h-full relative">
                <img src="https://images.unsplash.com/photo-1588894123111-01fc7864f37c?w=1400&q=80&auto=format&fit=crop" alt="KingdomCars" className="w-full h-full object-cover" style={{ filter: 'contrast(1.02) saturate(0.92)' }} />
                <div className="absolute inset-0 bg-gradient-to-br from-[#1F4D3F]/[0.04] to-[#B89043]/[0.06]" />
                <span className="absolute top-4 left-6 font-heading text-[7rem] font-extrabold text-white/45 leading-none tracking-tighter pointer-events-none" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>01</span>
                <span className="absolute top-[18px] left-[18px] w-7 h-7 border-t-2 border-l-2 border-[#B89043]" />
                <span className="absolute top-[18px] right-[18px] w-7 h-7 border-t-2 border-r-2 border-[#B89043]" />
                <span className="absolute bottom-[18px] left-[18px] w-7 h-7 border-b-2 border-l-2 border-[#B89043]" />
                <span className="absolute bottom-[18px] right-[18px] w-7 h-7 border-b-2 border-r-2 border-[#B89043]" />
                <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-4"><span className="w-12 h-px bg-[#B89043]" /><span className="text-[0.7rem] tracking-[0.2em] uppercase text-[#8A8F8A] font-medium">ESTABLISHED 2019</span><span className="w-12 h-px bg-[#B89043]" /></div>
              </div>
            </div>
            <div className="absolute right-[-16px] bottom-8 bg-[#1F4D3F] text-white p-6 max-w-[240px] z-20">
              <div className="text-[0.7rem] tracking-[0.2em] uppercase text-[#D4B97A] mb-1.5 font-medium">{t('about.signatureTitle')}</div>
              <div className="font-heading text-[1.4rem] leading-tight font-medium">{t('about.eyebrow')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="py-14 bg-[#F2EDE5] border-y border-[#E2DDD3]">
        <div className="max-w-[1240px] mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <Counter target={3200} suffix="+" label={t('counters.clients')} />
          <Counter target={5} suffix="+" label={t('counters.years')} />
          <Counter target={127} suffix="+" label="Google Reviews" />
          <Counter target={24} suffix="/7" label={t('counters.available')} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28">
        <div className="max-w-[1240px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <Eyebrow>{t('about.eyebrow')}</Eyebrow>
            <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.18] tracking-tight mb-7">{t('about.title')}</h2>
            <p className="text-base text-[#4A524D] mb-4 leading-relaxed">{t('about.p1')}</p>
            <p className="text-base text-[#4A524D] leading-relaxed">{t('about.p2')}</p>
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#E2DDD3]"><div><div className="font-heading text-lg font-semibold">{t('about.signature')}</div><div className="text-xs text-[#8A8F8A] tracking-wider uppercase">{t('about.signatureTitle')}</div></div></div>
          </div>
          <div className="relative bg-[#E5EDE9] overflow-hidden" style={{ aspectRatio: '5/6' }}>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 border-2 border-[#B89043] z-0" />
            <div className="w-full h-full relative z-10 overflow-hidden">
              <img src="https://plus.unsplash.com/premium_photo-1682088436727-0b27d5d230c7?w=1000&q=80&auto=format&fit=crop" alt="Team" className="w-full h-full object-cover" style={{ filter: 'contrast(1.02) saturate(0.92)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="py-28 bg-[#F2EDE5]">
        <div className="max-w-[1240px] mx-auto px-8">
          <div className="text-center mb-16"><Eyebrow center>{t('advantages.sectionTitle')}</Eyebrow><h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-semibold">{t('advantages.sectionTitle')}</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E2DDD3]">
            {advItems.map((item, i) => (<div key={i} className="bg-[#F2EDE5] p-12 hover:bg-white transition-colors"><div className="font-heading text-[0.95rem] text-[#B89043] tracking-[0.2em] mb-6">{String(i + 1).padStart(2, '0')} / {String(advItems.length).padStart(2, '0')}</div><h4 className="font-heading text-2xl font-medium mb-3.5 leading-tight">{item.title}</h4><p className="text-[0.92rem] text-[#4A524D] leading-relaxed">{item.desc}</p></div>))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-28">
        <div className="max-w-[1240px] mx-auto px-8">
          <div className="mb-16"><Eyebrow>{t('services.sectionTitle')}</Eyebrow><h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-semibold">{t('services.sectionTitle')}</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {svcItems.map((svc, i) => (<div key={i} className="bg-white border border-[#E2DDD3] grid grid-cols-1 sm:grid-cols-[1fr_1.2fr] hover:border-[#1F4D3F] hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(31,77,63,0.08)] transition-all overflow-hidden"><div className="bg-[#E5EDE9] relative min-h-[200px] overflow-hidden"><img src={svcPhotos[i]} alt={svc.title} className="w-full h-full object-cover absolute inset-0" loading="lazy" style={{ filter: 'contrast(1.02) saturate(0.92)' }} /></div><div className="p-8 flex flex-col gap-4"><div className="font-heading text-[0.85rem] text-[#B89043] tracking-[0.2em]">{String(i + 1).padStart(2, '0')} / {String(svcItems.length).padStart(2, '0')}</div><h3 className="font-heading text-[1.4rem] font-bold leading-tight">{svc.title}</h3><p className="text-[0.88rem] text-[#4A524D] leading-relaxed flex-1">{svcDescs[i]}</p><button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-2 text-[0.85rem] font-medium text-[#1F4D3F] border-b border-[#B89043] pb-1 hover:gap-3.5 transition-all w-fit">{svc.cta} →</button></div></div>))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-28 bg-[#1F4D3F] text-white relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 border border-[#D4B97A]/10 rounded-full pointer-events-none" />
        <div className="max-w-[1240px] mx-auto px-8 relative z-10">
          <div className="text-center mb-16"><div className="inline-flex items-center gap-3 text-[0.72rem] font-medium tracking-[0.24em] uppercase text-[#D4B97A] mb-6"><span className="w-7 h-px bg-[#D4B97A]" />{t('pricing.sectionTitle')}</div><h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-semibold text-white">{t('pricing.sectionTitle')}</h2></div>
          <div className="max-w-[720px] mx-auto bg-white/[0.04] border border-[#D4B97A]/20">
            {priceItems.map((p, i) => (<div key={i} className={`grid grid-cols-[1fr_auto] sm:grid-cols-[80px_1fr_auto] gap-4 sm:gap-8 items-center px-6 sm:px-10 py-7 hover:bg-[#D4B97A]/5 transition-colors ${i < priceItems.length - 1 ? 'border-b border-[#D4B97A]/15' : ''}`}><div className="hidden sm:block text-[#D4B97A]"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg></div><div className="font-heading text-[1.4rem] font-medium">{p.people}</div><div className="font-heading text-3xl font-medium text-[#D4B97A]">{p.price}<small className="text-lg text-white/50 ml-1"> {p.unit}</small></div></div>))}
          </div>
          <p className="text-center mt-8 text-sm text-white/60 italic">{t('pricing.note')}</p>
        </div>
      </section>

      {/* MAP */}
      <section className="py-28">
        <div className="max-w-[1240px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-20 items-center">
          <div>
            <Eyebrow>{t('map.sectionLabel')}</Eyebrow>
            <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.18] tracking-tight mb-6">{t('map.title1')} <em className="text-[#1F4D3F] not-italic font-bold">{t('map.titleHighlight')}</em></h2>
            <p className="text-base text-[#4A524D] mb-7 leading-relaxed">{t('map.description')}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-3">{cities.map((c, i) => (<span key={i} className="font-heading text-base relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:rounded-full before:bg-[#B89043]">{c}</span>))}</div>
          </div>
          <div className="bg-[#E5EDE9] border border-[#E2DDD3] p-8" style={{ aspectRatio: '5/4' }}>
            <svg viewBox="0 0 500 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <path d="M180,40 L220,35 L260,30 L300,28 L340,32 L370,40 L400,60 L420,80 L430,110 L440,140 L430,180 L420,220 L400,250 L380,280 L360,310 L340,340 L310,360 L280,370 L250,380 L220,375 L190,360 L160,340 L140,310 L120,280 L110,250 L100,220 L95,190 L100,160 L110,130 L120,100 L140,70 L160,50 Z" fill="#1F4D3F" fillOpacity="0.08" stroke="#1F4D3F" strokeWidth="1.5" strokeOpacity="0.3" />
              {[{cx:270,cy:170,n:'Warszawa'},{cx:290,cy:310,n:'Kraków'},{cx:340,cy:90,n:'Gdańsk'},{cx:190,cy:210,n:'Wrocław'},{cx:210,cy:110,n:'Poznań'},{cx:240,cy:200,n:'Łódź'},{cx:250,cy:300,n:'Katowice'},{cx:350,cy:240,n:'Lublin'}].map((c,i)=>(<g key={i}><circle cx={c.cx} cy={c.cy} r="4" fill="#1F4D3F" opacity="0.7"/><text x={c.cx+8} y={c.cy+4} fill="#4A524D" fontSize="10" fontFamily="Roboto Slab">{c.n}</text></g>))}
            </svg>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#F2EDE5]">
        <div className="max-w-[1240px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-20 items-center">
          <div><Eyebrow>{t('nav.contact')}</Eyebrow><h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.18] tracking-tight mb-5">{t('cta.title')}</h2><p className="text-base text-[#4A524D] mb-9 max-w-[480px]">{t('cta.subtitle')}</p></div>
          <div className="bg-white border border-[#E2DDD3] p-10 flex flex-col gap-4">
            <div className="font-heading text-[1.4rem] font-medium mb-2">{t('cta.title').split('?')[0]}?</div>
            <input type="text" placeholder={t('cta.namePlaceholder')} className="py-4 px-4 border border-[#E2DDD3] bg-[#FAF7F2] text-sm focus:outline-none focus:border-[#1F4D3F] focus:bg-white transition-all" />
            <input type="tel" placeholder={t('cta.phonePlaceholder')} className="py-4 px-4 border border-[#E2DDD3] bg-[#FAF7F2] text-sm focus:outline-none focus:border-[#1F4D3F] focus:bg-white transition-all" />
            <label className="flex items-start gap-2.5 text-xs text-[#4A524D] cursor-pointer"><input type="checkbox" className="accent-[#1F4D3F] w-4 h-4 mt-0.5" />{t('cta.consent')}</label>
            <button onClick={() => alert(t('cta.thanks'))} className="mt-2 py-4 bg-[#1F4D3F] text-white text-[0.85rem] font-medium uppercase tracking-wider hover:bg-[#163B30] transition-all">{t('cta.submit')} →</button>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-28">
        <div className="max-w-[1240px] mx-auto px-8">
          <div className="flex flex-wrap justify-between items-end gap-10 mb-16"><div><Eyebrow>{t('reviews.sectionTitle')}</Eyebrow><h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-semibold">{t('reviews.sectionTitle')}</h2></div><div className="text-right"><div className="text-[#B89043] tracking-[4px] text-base mb-1">★★★★★</div><div className="font-heading text-[1.4rem] font-medium">4.9<small className="text-[0.7em] text-[#8A8F8A] font-normal"> / 5 · 127+</small></div></div></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E2DDD3]">
            {revItems.map((r, i) => (<div key={i} className="bg-[#FAF7F2] p-10 hover:bg-white transition-colors flex flex-col"><div className="font-heading text-xl font-semibold leading-snug mb-6 relative pl-8 tracking-tight"><span className="absolute left-0 -top-2 text-5xl text-[#B89043] leading-none">&ldquo;</span>{r.text.split('.')[0]}.</div><p className="text-[0.9rem] text-[#4A524D] leading-relaxed mb-7 flex-1">{r.text}</p><div className="flex items-center gap-3.5 pt-5 border-t border-[#E2DDD3]"><div className="w-11 h-11 rounded-full bg-[#E5EDE9] text-[#1F4D3F] flex items-center justify-center font-heading font-semibold text-xl">{r.name[0]}</div><div><div className="font-semibold text-[0.92rem]">{r.name}</div><div className="text-xs text-[#8A8F8A]">{r.location}</div></div></div></div>))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28 bg-[#F2EDE5]">
        <div className="max-w-[1240px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
          <div>
            <Eyebrow>{t('contact.sectionTitle')}</Eyebrow><h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-semibold mb-8">{t('contact.sectionTitle')}</h2>
            {[{label:'Telefon',value:t('contact.phone'),link:`tel:${t('contact.phone').replace(/\s/g,'')}`},{label:'Email',value:t('contact.email'),link:`mailto:${t('contact.email')}`},{label:'Adres',value:t('contact.address')},{label:'Godziny',value:t('contact.hours')}].map((c,i)=>(<div key={i} className={`py-5 ${i<3?'border-b border-[#E2DDD3]':''}`}><div className="text-[0.7rem] tracking-[0.2em] uppercase text-[#B89043] font-medium mb-1">{c.label}</div>{c.link?<a href={c.link} className="font-heading text-lg font-medium text-[#1F4D3F] hover:text-[#B89043] transition-colors">{c.value}</a>:<div className="font-heading text-lg font-medium">{c.value}</div>}</div>))}
          </div>
          <div className="w-full border border-[#E2DDD3] overflow-hidden bg-white" style={{aspectRatio:'4/3'}}><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.8!2d20.99!3d52.23!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDEzJzQ4LjAiTiAyMcKwMDAnMDAuMCJF!5e0!3m2!1spl!2spl!4v1" className="w-full h-full border-0 grayscale-[0.4] contrast-[0.95]" allowFullScreen loading="lazy" /></div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 pb-8 bg-[#163B30] text-white">
        <div className="max-w-[1240px] mx-auto px-8 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-16 mb-12">
          <div><div className="flex items-center gap-3 mb-4"><img src="/logo.png" alt="KC" className="h-16 brightness-0 invert opacity-90" /><span className="font-heading text-2xl font-semibold">KingdomCars</span></div><p className="text-sm text-white/65 leading-relaxed max-w-[320px]">{t('footer.tagline')}</p></div>
          <div><h5 className="text-[0.72rem] tracking-[0.2em] uppercase text-[#D4B97A] font-medium mb-4">{t('nav.services')}</h5><ul className="space-y-2.5">{svcItems.map((s,i)=><li key={i}><a href="#services" className="text-sm text-white/75 hover:text-[#D4B97A] transition-colors">{s.title}</a></li>)}</ul></div>
          <div><h5 className="text-[0.72rem] tracking-[0.2em] uppercase text-[#D4B97A] font-medium mb-4">{t('nav.contact')}</h5><ul className="space-y-2.5"><li><a href={`tel:${t('contact.phone').replace(/\s/g,'')}`} className="text-sm text-white/75 hover:text-[#D4B97A] transition-colors">{t('contact.phone')}</a></li><li><a href={`mailto:${t('contact.email')}`} className="text-sm text-white/75 hover:text-[#D4B97A] transition-colors">{t('contact.email')}</a></li></ul></div>
        </div>
        <div className="max-w-[1240px] mx-auto px-8 pt-6 border-t border-white/[0.08] text-xs text-white/50">{t('footer.copyright')}</div>
      </footer>

      {/* MODAL */}
      {modalOpen && (<div className="fixed inset-0 z-[200] bg-[#1A1F1C]/60 backdrop-blur-md flex items-center justify-center" onClick={(e)=>{if(e.target===e.currentTarget)setModalOpen(false);}}>
        <div className="bg-white p-12 w-[480px] max-w-[92vw] relative" style={{animation:'fadeUp 0.3s ease-out'}}>
          <button onClick={()=>setModalOpen(false)} className="absolute top-4 right-5 text-2xl text-[#8A8F8A] hover:text-[#1A1F1C]">×</button>
          <div className="text-[0.7rem] tracking-[0.24em] uppercase text-[#B89043] font-medium mb-2">Formularz</div>
          <h3 className="font-heading text-3xl font-medium mb-7">{t('cta.title').split('?')[0]}?</h3>
          <div className="flex flex-col gap-3.5">
            <input type="text" placeholder={t('cta.namePlaceholder')} className="py-3.5 px-4 border border-[#E2DDD3] bg-[#FAF7F2] text-sm focus:outline-none focus:border-[#1F4D3F] focus:bg-white transition-all" />
            <input type="tel" placeholder={t('cta.phonePlaceholder')} className="py-3.5 px-4 border border-[#E2DDD3] bg-[#FAF7F2] text-sm focus:outline-none focus:border-[#1F4D3F] focus:bg-white transition-all" />
            <label className="flex items-start gap-2.5 text-xs text-[#4A524D] cursor-pointer"><input type="checkbox" className="accent-[#1F4D3F] w-4 h-4 mt-0.5" />{t('cta.consent')}</label>
            <button onClick={()=>{alert(t('cta.thanks'));setModalOpen(false);}} className="mt-2 py-4 bg-[#1F4D3F] text-white text-[0.85rem] font-medium uppercase tracking-wider hover:bg-[#163B30] transition-all">{t('cta.submit')} →</button>
          </div>
        </div>
      </div>)}
    </div>
  );
}
