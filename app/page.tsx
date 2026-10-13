'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  Star,
  X,
  Wrench,
} from 'lucide-react';
import Header, { Logo } from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';

const images = {
  hero: 'https://images.pexels.com/photos/5846282/pexels-photo-5846282.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1800',
  weld: 'https://images.pexels.com/photos/5272077/pexels-photo-5272077.jpeg?auto=compress&cs=tinysrgb&h=1000&w=1400',
  workshop: 'https://images.pexels.com/photos/10395742/pexels-photo-10395742.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
  gate: 'https://images.pexels.com/photos/12225928/pexels-photo-12225928.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
  villa: 'https://images.pexels.com/photos/12122335/pexels-photo-12122335.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
  redGate: 'https://images.pexels.com/photos/16580841/pexels-photo-16580841.png?auto=compress&cs=tinysrgb&h=900&w=1200',
  house: 'https://images.pexels.com/photos/15267020/pexels-photo-15267020.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
  /** Metal boundary / slatted screen — matches fences & screens work */
  fence: 'https://images.pexels.com/photos/12122335/pexels-photo-12122335.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
  /** Stair & balcony metal handrails */
  railing: 'https://images.pexels.com/photos/12884282/pexels-photo-12884282.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
  /** Aluminium / metal-framed glass doors */
  glassDoor: 'https://images.pexels.com/photos/12709862/pexels-photo-12709862.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
  /** Outdoor pergola / shade structure (same family as project gallery) */
  pergola: 'https://images.pexels.com/photos/15267020/pexels-photo-15267020.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
  /** Metal storage sheds */
  shed: 'https://images.pexels.com/photos/28674473/pexels-photo-28674473.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
  /** Steel mezzanine platform & industrial stairs */
  mezzanine: 'https://images.pexels.com/photos/15301649/pexels-photo-15301649.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
};

const services = [
  { number: '01', title: 'Gates', copy: 'Statement entrances engineered for security and style.', icon: ShieldCheck, image: images.gate, imagePosition: 'center' },
  { number: '02', title: 'Fences', copy: 'Clean-lined boundaries built for UAE conditions.', icon: Ruler, image: images.fence, imagePosition: 'center' },
  { number: '03', title: 'Railings', copy: 'Safe, seamless details for stairs, balconies and terraces.', icon: ArrowUpRight, image: images.railing, imagePosition: 'center 40%' },
  { number: '04', title: 'Glass Doors', copy: 'Precision aluminium frames with a quiet, modern finish.', icon: Sparkles, image: images.glassDoor, imagePosition: 'center 35%' },
  { number: '05', title: 'Pergolas', copy: 'Architectural shade structures made for outdoor living.', icon: Wrench, image: images.pergola, imagePosition: 'center' },
  { number: '06', title: 'Sheds', copy: 'Practical storage solutions that look part of the property.', icon: Ruler, image: images.shed, imagePosition: 'center' },
  { number: '07', title: 'Mezzanines', copy: 'Make every metre count with strong elevated platforms.', icon: ArrowUpRight, image: images.mezzanine, imagePosition: 'center' },
  { number: '08', title: 'Custom Works', copy: 'Your sketch, our steel. Built with exacting care.', icon: Sparkles, image: images.workshop, imagePosition: 'center' },
];

const projects = [
  { image: images.gate, type: 'Villa gate', title: 'The Al Zahia Residence' },
  { image: images.villa, type: 'Aluminium works', title: 'Sajaa Slatted Screen' },
  { image: images.redGate, type: 'Steel fabrication', title: 'The Bold Entry' },
  { image: images.house, type: 'Outdoor structure', title: 'Terrace Pergola' },
  { image: images.workshop, type: 'Workshop detail', title: 'Precision in the making' },
  { image: images.weld, type: 'Custom steel', title: 'Made to stand strong' },
];

const reviews = [
  { name: 'Mohammed A.', place: 'Al Zahia, Sharjah', text: 'YSF delivered our villa gate exactly as imagined. The finish is excellent and the installation team was precise, clean and professional.', initials: 'MA' },
  { name: 'Sarah K.', place: 'Al Sajaa, Sharjah', text: 'From the first measurement to the final weld, everything felt organised. Our pergola has completely changed the way we use our terrace.', initials: 'SK' },
  { name: 'Faisal R.', place: 'Muwaileh, Sharjah', text: 'Fast response, clear pricing and strong workmanship. The aluminium screens look sharp and feel built to last.', initials: 'FR' },
];

const CONTACT = {
  phoneDisplay: '+971 50 000 0000',
  phoneTel: '+971500000000',
  whatsApp: '971500000000',
  email: 'info@ysfwelding.ae',
  location: 'Sharjah, UAE',
};

const heroSlides = [
  {
    image: images.hero,
    eyebrow: 'Steel / Aluminium / Craft',
    title: 'Built for the bold.',
    text: 'Precision steel and aluminium fabrication for homes, businesses and ambitious spaces across Sharjah.',
    ctaLabel: 'Get a free quote',
    ctaHref: '#contact',
  },
  {
    image: images.gate,
    eyebrow: 'Gates & entrances',
    title: 'Statement entries, engineered.',
    text: 'Custom villa gates measured on site and finished in our Sharjah workshop.',
    ctaLabel: 'View projects',
    ctaHref: '#projects',
  },
  {
    image: images.weld,
    eyebrow: 'Made in Sharjah',
    title: 'Strong work. Sharp finish.',
    text: 'From the first sketch to the final weld, every joint is clean and built to last.',
    ctaLabel: 'Meet the team',
    ctaHref: '#about',
  },
];

const reveal = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' as const } } };

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[number] | null>(null);
  const [reviewIndex, setReviewIndex] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const nextReview = () => setReviewIndex((index) => (index + 1) % reviews.length);
  const previousReview = () => setReviewIndex((index) => (index - 1 + reviews.length) % reviews.length);

  return (
    <main className="overflow-hidden bg-white text-[var(--color-text)]">
      <Header />

      <div id="home">
        <h1 className="sr-only">YSF Welding — steel fabrication in Sharjah</h1>
        <HeroSlider slides={heroSlides} interval={6000} />
      </div>

      <section id="intro" className="section"><div className="mx-auto grid max-w-[1400px] items-center gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24"><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={reveal}><p className="eyebrow">01 / Made in Sharjah</p><h2 className="display-title mt-5 max-w-xl text-5xl font-bold uppercase leading-[0.92] tracking-[-0.06em] sm:text-7xl">Metalwork with <span>intent.</span></h2><p className="mt-8 max-w-md text-base leading-8 text-black/60">AL YANUF Steel Fabrication & Welding LLC is where strong materials meet sharp thinking. From a first sketch to the final installation, we make metalwork that earns its place.</p><a href="#about" className="mt-8 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest underline decoration-[var(--color-accent)] decoration-2 underline-offset-8">Meet the team <ArrowRight size={15} /></a></motion.div><motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.8 }} className="relative min-h-[410px] bg-[var(--color-bg-soft)] p-5 sm:min-h-[560px] lg:min-h-[540px]"><div className="absolute -left-5 top-12 z-10 bg-[var(--color-accent)] px-4 py-3 text-[10px] font-bold text-[var(--color-text)] uppercase tracking-widest [writing-mode:vertical-rl]">Built to last</div><img src={images.gate} alt="Custom wrought iron villa gate" className="h-full w-full object-cover grayscale transition duration-700 hover:grayscale-0" /><div className="absolute -bottom-5 -right-5 bg-black px-5 py-4 text-white"><div className="text-2xl font-bold">12+</div><div className="text-[9px] uppercase tracking-widest text-white/60">Years of craft</div></div></motion.div></div></section>

      <section id="services" className="section section-soft"><div className="mx-auto max-w-[1400px]"><motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} className="flex flex-col justify-between gap-6 border-b border-black/15 pb-8 sm:flex-row sm:items-end"><div><p className="eyebrow">02 / What we do</p><h2 className="display-title mt-5 text-5xl font-bold uppercase leading-none tracking-[-0.06em] sm:text-7xl">The right<br /><span>angle.</span></h2></div><p className="max-w-xs text-sm leading-7 text-black/55">One team for the details that make a property feel finished.</p></motion.div><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { delay: index * 0.05, duration: 0.5 } },
                }}
                className="service-card group flex flex-col overflow-hidden bg-white shadow-[0_8px_30px_rgba(0,0,0,.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,.08)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image}
                    alt={`${service.title} — YSF Welding`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    style={{ objectPosition: service.imagePosition }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                  <span className="absolute left-4 top-4 rounded bg-black/50 px-2 py-1 text-[10px] font-bold tracking-wider text-white backdrop-blur-sm">
                    {service.number}
                  </span>
                  <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[var(--color-accent)] shadow-sm">
                    <Icon size={20} strokeWidth={1.5} />
                  </span>
                  <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold uppercase tracking-tight text-white sm:text-2xl">
                    {service.title}
                  </h3>
                </div>
                <p className="flex-1 p-4 text-sm leading-6 text-black/55 sm:p-5">{service.copy}</p>
              </motion.article>
            );
          })}
        </div></div></section>

      <section id="about" className="section"><div className="mx-auto grid max-w-[1400px] items-stretch gap-0 lg:grid-cols-2"><motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative min-h-[480px] overflow-hidden"><img src={images.weld} alt="Welder producing a bright weld" className="h-full w-full object-cover grayscale" /><div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" /><div className="absolute bottom-7 left-7 text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">Measured. Welded. Delivered.</div></motion.div><motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="relative flex min-h-[480px] flex-col justify-end border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-8 text-[var(--color-text)] sm:p-12 lg:-ml-8 lg:mt-16"><div className="absolute right-8 top-8 text-8xl font-bold leading-none tracking-[-0.12em] opacity-20">YSF</div><p className="eyebrow text-black/60">03 / The YSF standard</p><h2 className="mt-5 max-w-md text-5xl font-bold uppercase leading-[0.88] tracking-[-0.06em] sm:text-7xl">Strong work.<br />Sharp finish.</h2><p className="mt-8 max-w-sm text-sm leading-7 text-black/70">We combine proven fabrication methods with a design eye. Every cut is considered, every joint is clean, every project is made to live in the real world.</p><div className="mt-8 flex flex-wrap gap-3 text-[10px] font-bold uppercase tracking-widest"><span className="border border-black/30 px-3 py-2">Site measured</span><span className="border border-black/30 px-3 py-2">Built in-house</span></div></motion.div></div></section>

      <section id="projects" className="section section-soft"><div className="mx-auto max-w-[1400px]"><div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end"><div><p className="eyebrow">04 / Selected work</p><h2 className="display-title mt-5 text-5xl font-bold uppercase leading-none tracking-[-0.06em] sm:text-7xl">Proof in<br /><span>the detail.</span></h2></div><div className="flex w-full flex-wrap gap-2 sm:w-auto"><a href="https://www.instagram.com/ysf.welding/" target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-2 border border-black/20 px-4 py-3 text-[10px] font-bold uppercase tracking-widest transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] sm:flex-none"><Instagram size={14} /> Instagram</a><a href="https://www.facebook.com/ysf.welding/" target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-2 border border-black/20 px-4 py-3 text-[10px] font-bold uppercase tracking-widest transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] sm:flex-none"><Facebook size={14} /> Facebook</a></div></div><div className="mt-12 grid auto-rows-[190px] grid-cols-2 gap-3 sm:auto-rows-[230px] lg:grid-cols-4">{projects.map((project, index) => <motion.button key={project.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} onClick={() => setSelectedProject(project)} className={`project-card group relative overflow-hidden text-left ${index === 0 ? 'col-span-2 row-span-2' : index === 3 ? 'col-span-2' : ''}`}><img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" /><div className="absolute bottom-5 left-5 text-white"><div className="text-[9px] font-bold uppercase tracking-[0.2em] ">{project.type}</div><div className="mt-1 text-lg font-bold uppercase">{project.title}</div></div><div className="absolute right-4 top-4 rounded-full bg-white p-2 opacity-0 transition group-hover:opacity-100"><ArrowUpRight size={15} /></div></motion.button>)}</div></div></section>

      <section className="section"><div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-10 sm:grid-cols-4">{[['120+', 'Projects completed'], ['96%', 'Repeat clients'], ['12+', 'Years of experience'], ['04', 'Emirates served']].map(([number, label], index) => <motion.div key={label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="border-l border-black/25 pl-4 sm:pl-6"><div className="text-4xl font-bold tracking-[-0.07em] text-[var(--color-accent)] sm:text-5xl">{number}</div><div className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-black/60">{label}</div></motion.div>)}</div></section>

      <section id="reviews" className="section section-soft"><div className="mx-auto max-w-[1400px]"><div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">05 / People trust us</p><h2 className="display-title mt-5 text-5xl font-bold uppercase tracking-[-0.06em] sm:text-7xl">Built on<br /><span>good words.</span></h2></div><div className="flex shrink-0 gap-2"><button type="button" onClick={previousReview} className="rounded-full border border-black/20 p-3 transition hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-text)]" aria-label="Previous review"><ChevronLeft size={18} /></button><button type="button" onClick={nextReview} className="rounded-full border border-black/20 p-3 transition hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-text)]" aria-label="Next review"><ChevronRight size={18} /></button></div></div><div className="mt-12 grid gap-4 lg:grid-cols-3">{reviews.map((review, index) => <motion.article key={review.name} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`review-card ${index === reviewIndex ? 'active-review bg-[var(--color-accent)] text-[var(--color-text)]' : 'bg-white'} p-7 transition sm:p-9`}><div className="flex items-center justify-between"><div className={`flex h-11 w-11 items-center justify-center rounded-full text-xs font-bold ${index === reviewIndex ? 'bg-white text-[var(--color-text)]' : 'bg-[var(--color-bg-soft)]'}`}>{review.initials}</div><div className="flex gap-1 ">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={13} fill="currentColor" />)}</div></div><p className="mt-8 min-h-[120px] text-base leading-7">“{review.text}”</p><div className="mt-6 border-t border-black/15 pt-5"><div className="text-xs font-bold uppercase tracking-wider">{review.name}</div><div className="mt-1 text-[10px] uppercase tracking-widest opacity-50">{review.place}</div></div></motion.article>)}</div><div className="mt-10 flex items-center justify-between border-t border-black/15 pt-5"><div className="flex gap-2">{reviews.map((review, index) => <button key={review.name} onClick={() => setReviewIndex(index)} className={`h-1.5 transition-all ${index === reviewIndex ? 'w-10 bg-[var(--color-accent)]' : 'w-5 bg-[var(--color-border)]'}`} aria-label={`Show review ${index + 1}`} />)}</div><div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-black/50"><span>Google <b className="text-[var(--color-accent)]">4.9</b></span><span>Facebook <b className="text-[var(--color-accent)]">5.0</b></span></div></div></div></section>

      <section className="section relative overflow-hidden"><div className="absolute -right-20 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full border-[70px] border-[var(--color-accent)] opacity-25" /><div className="relative mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-10 lg:flex-row lg:items-end"><div><p className="eyebrow">06 / Start a project</p><h2 className="mt-5 max-w-3xl text-5xl font-bold uppercase leading-[0.9] tracking-[-0.07em] sm:text-7xl lg:text-8xl">Need custom<br /><span>steel work?</span></h2></div><div className="flex flex-wrap gap-3"><a href={`tel:${CONTACT.phoneTel}`} className="btn btn-primary">Call the workshop <Phone size={14} className="ml-3 inline" /></a><a href={`https://wa.me/${CONTACT.whatsApp}`} target="_blank" rel="noreferrer" className="btn btn-outline">WhatsApp us <MessageCircle size={14} className="ml-3 inline" /></a></div></div></section>

      <section id="contact" className="section section-soft"><div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[0.85fr_1.15fr]"><div><p className="eyebrow">07 / Let&apos;s talk</p><h2 className="display-title mt-5 text-5xl font-bold uppercase leading-[0.9] tracking-[-0.06em] sm:text-7xl">Bring us<br /><span>the brief.</span></h2><p className="mt-8 max-w-sm text-sm leading-7 text-black/60">Tell us what you&apos;re building and we&apos;ll help you shape the right solution. Site visits and measurements are available across Sharjah.</p><div className="mt-10 space-y-5 text-sm"><div className="flex gap-4"><MapPin className="mt-1 text-[var(--color-accent)]" size={18} /><span>Emirates Industrial City, Al Sajaa,<br />Sharjah, United Arab Emirates</span></div><div className="flex gap-4"><Phone className="text-[var(--color-accent)]" size={18} /><span><a href={`tel:${CONTACT.phoneTel}`} className="font-semibold transition hover:text-[var(--color-accent)]">{CONTACT.phoneDisplay}</a><br /><small className="text-black/45">Phone / WhatsApp</small></span></div><div className="flex gap-4"><Mail className="text-[var(--color-accent)]" size={18} /><span><a href={`mailto:${CONTACT.email}`} className="font-semibold transition hover:text-[var(--color-accent)]">{CONTACT.email}</a></span></div><div className="flex gap-4"><Clock3 className="text-[var(--color-accent)]" size={18} /><span>Saturday – Thursday<br /><small className="text-black/45">08:00 – 18:00</small></span></div></div></div><div className="grid gap-8 lg:grid-cols-2"><form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="space-y-5"><div className="grid gap-5 sm:grid-cols-2"><label className="field-label">Your name<input required type="text" placeholder="Full name" /></label><label className="field-label">Phone number<input required type="tel" placeholder="+971" /></label></div><label className="field-label">I&apos;m interested in<select defaultValue=""><option value="" disabled>Select a service</option><option>Gates & fences</option><option>Railings</option><option>Pergola</option><option>Custom fabrication</option></select></label><label className="field-label">Tell us about the project<textarea required rows={5} placeholder="A few words about what you need..." /></label><button type="submit" className="btn btn-primary">{submitted ? <><Check size={15} className="mr-2 inline" /> Message received</> : <>Send enquiry <ArrowRight size={15} className="ml-4 inline" /></>}</button></form><div className="hidden min-h-[430px] bg-[var(--color-bg-soft)] p-2 sm:block"><iframe title="Map showing Al Sajaa, Sharjah" src="https://www.google.com/maps?q=Al+Sajaa+Sharjah+UAE&output=embed" className="h-full w-full grayscale" loading="lazy" /></div></div></div></section>

      <footer className="border-t-[3px] border-[var(--color-accent)] bg-[var(--color-ink)] px-5 py-12 text-white lg:px-12"><div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-10 sm:flex-row sm:items-end"><div><Logo light /><p className="mt-6 max-w-xs text-xs leading-6 text-white/45">AL YANUF Steel Fabrication & Welding LLC<br />Strong ideas, precisely made in Sharjah.</p></div><div className="flex flex-col gap-5 sm:items-end"><div className="flex gap-5 text-[10px] font-bold uppercase tracking-widest text-white/60"><a href="#services" className="transition hover:text-[var(--color-accent)]">Services</a><a href="#projects" className="transition hover:text-[var(--color-accent)]">Projects</a><a href="#contact" className="transition hover:text-[var(--color-accent)]">Contact</a></div><div className="flex gap-3"><a href="https://www.instagram.com/ysf.welding/" target="_blank" rel="noreferrer" className="rounded-full border border-white/40 p-3 transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]" aria-label="Instagram"><Instagram size={15} /></a><a href="https://www.facebook.com/ysf.welding/" target="_blank" rel="noreferrer" className="rounded-full border border-white/40 p-3 transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]" aria-label="Facebook"><Facebook size={15} /></a></div></div></div><div className="mx-auto mt-12 flex max-w-[1400px] justify-between border-t border-white/10 pt-5 text-[9px] uppercase tracking-widest text-white/35"><span>© 2025 YSF Welding</span><span>Built to stand strong</span></div></footer>

      <a href={`https://wa.me/${CONTACT.whatsApp}`} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-text)] shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition hover:scale-110 hover:bg-[var(--color-accent-hover)] max-sm:bottom-[max(1.25rem,env(safe-area-inset-bottom))]" aria-label="Chat on WhatsApp"><MessageCircle size={24} /></a>

      {selectedProject && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-5" role="dialog" aria-modal="true" aria-label={selectedProject.title} onClick={() => setSelectedProject(null)}><button className="absolute right-5 top-5 rounded-full border border-white/30 p-3 text-white" onClick={() => setSelectedProject(null)} aria-label="Close project"><X size={20} /></button><div className="max-h-[85vh] max-w-5xl" onClick={(event) => event.stopPropagation()}><img src={selectedProject.image} alt={selectedProject.title} className="max-h-[75vh] w-auto object-contain" /><div className="mt-4 flex items-center justify-between text-white"><div><div className="text-[10px] font-bold uppercase tracking-widest ">{selectedProject.type}</div><div className="mt-1 text-2xl font-bold uppercase">{selectedProject.title}</div></div><ArrowUpRight className="text-white" /></div></div></div>}
    </main>
  );
}
