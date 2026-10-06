'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDown,
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
  Menu,
  MessageCircle,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  Star,
  X,
  Wrench,
} from 'lucide-react';

const images = {
  hero: 'https://images.pexels.com/photos/5846282/pexels-photo-5846282.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1800',
  weld: 'https://images.pexels.com/photos/5272077/pexels-photo-5272077.jpeg?auto=compress&cs=tinysrgb&h=1000&w=1400',
  workshop: 'https://images.pexels.com/photos/10395742/pexels-photo-10395742.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
  gate: 'https://images.pexels.com/photos/12225928/pexels-photo-12225928.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
  villa: 'https://images.pexels.com/photos/12122335/pexels-photo-12122335.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
  redGate: 'https://images.pexels.com/photos/16580841/pexels-photo-16580841.png?auto=compress&cs=tinysrgb&h=900&w=1200',
  house: 'https://images.pexels.com/photos/15267020/pexels-photo-15267020.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
};

const services = [
  { number: '01', title: 'Gates', copy: 'Statement entrances engineered for security and style.', icon: ShieldCheck },
  { number: '02', title: 'Fences', copy: 'Clean-lined boundaries built for UAE conditions.', icon: Ruler },
  { number: '03', title: 'Railings', copy: 'Safe, seamless details for stairs, balconies and terraces.', icon: ArrowUpRight },
  { number: '04', title: 'Glass Doors', copy: 'Precision aluminium frames with a quiet, modern finish.', icon: Sparkles },
  { number: '05', title: 'Pergolas', copy: 'Architectural shade structures made for outdoor living.', icon: Wrench },
  { number: '06', title: 'Sheds', copy: 'Practical storage solutions that look part of the property.', icon: Ruler },
  { number: '07', title: 'Mezzanines', copy: 'Make every metre count with strong elevated platforms.', icon: ArrowUpRight },
  { number: '08', title: 'Custom Works', copy: 'Your sketch, our steel. Built with exacting care.', icon: Sparkles },
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

const navLinks = ['Home', 'Services', 'Projects', 'About', 'Reviews', 'Contact'] as const;

const reveal = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' as const } } };

function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${light ? 'text-white' : 'text-black'}`}>
      <div className="ysf-mark" aria-hidden="true"><span>Y</span><i /><b /></div>
      <div className="leading-none"><div className="font-black tracking-[0.28em] text-[13px]">YSF</div><div className="mt-1 text-[9px] font-semibold tracking-[0.22em] opacity-60">WELDING</div></div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [topbarOpen, setTopbarOpen] = useState(true);
  const [selectedProject, setSelectedProject] = useState<typeof projects[number] | null>(null);
  const [reviewIndex, setReviewIndex] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem('ysf-topbar-dismissed') === '1') setTopbarOpen(false);
    } catch {
      /* ignore */
    }
  }, []);

  const dismissTopbar = () => {
    setTopbarOpen(false);
    try {
      localStorage.setItem('ysf-topbar-dismissed', '1');
    } catch {
      /* ignore */
    }
  };

  const nextReview = () => setReviewIndex((index) => (index + 1) % reviews.length);
  const previousReview = () => setReviewIndex((index) => (index - 1 + reviews.length) % reviews.length);

  return (
    <main className="overflow-hidden bg-white text-[#0a0a0a]">
      <header className="sticky top-0 z-40 w-full bg-white shadow-sm">
        {topbarOpen && (
          <div className="topbar border-b border-black/8 bg-[#fafafa]">
            <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
              <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-0">
                <a
                  href={`tel:${CONTACT.phoneTel}`}
                  className="topbar-link flex items-center gap-2 border-black/10 pr-0 sm:border-r sm:pr-5 sm:mr-5"
                >
                  <Phone size={13} className="shrink-0 text-[#ff7a00]" />
                  <span>{CONTACT.phoneDisplay}</span>
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="topbar-link flex items-center gap-2 border-black/10 pr-0 sm:border-r sm:pr-5 sm:mr-5"
                >
                  <Mail size={13} className="shrink-0 text-[#ff7a00]" />
                  <span className="truncate">{CONTACT.email}</span>
                </a>
                <span className="topbar-link flex items-center gap-2">
                  <MapPin size={13} className="shrink-0 text-[#ff7a00]" />
                  <span>{CONTACT.location}</span>
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                <a
                  href="https://www.instagram.com/ysf.welding/"
                  target="_blank"
                  rel="noreferrer"
                  className="topbar-link hidden items-center gap-2 transition hover:text-[#ff7a00] sm:flex"
                >
                  <Instagram size={13} className="text-[#ff7a00]" />
                  @ysf.welding
                </a>
                <button
                  type="button"
                  onClick={dismissTopbar}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-black/15 text-black/70 transition hover:border-[#ff7a00] hover:bg-[#ff7a00] hover:text-black"
                  aria-label="Close contact bar"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        <nav className="border-b-4 border-[#ff7a00] bg-white/95 backdrop-blur-md" aria-label="Main navigation">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 lg:px-8 lg:py-5">
            <a href="#home" aria-label="YSF Welding home">
              <Logo />
            </a>
            <div className="hidden items-center gap-0.5 lg:flex">
              {navLinks.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="nav-tab px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-black transition hover:text-[#ff7a00]"
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="hidden items-center gap-2 lg:flex">
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="hidden items-center gap-2 pr-2 text-[10px] font-bold uppercase tracking-widest text-black xl:flex"
              >
                <Phone size={14} className="text-[#ff7a00]" />
                {CONTACT.phoneDisplay}
              </a>
              <a
                href="#contact"
                className="skew-button bg-[#ff7a00] px-5 py-3 text-[10px] font-black uppercase tracking-[0.12em] text-black transition hover:bg-black hover:text-white"
              >
                Get a quote <ArrowUpRight size={14} className="ml-2 inline" />
              </a>
              <a
                href={`https://wa.me/${CONTACT.whatsApp}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-black/20 p-3 text-black transition hover:border-[#ff7a00] hover:text-[#ff7a00]"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
            </div>
            <button
              className="rounded-full border border-black/20 p-3 text-black lg:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          {menuOpen && (
            <div className="border-t border-black/8 px-5 pb-4 lg:hidden">
              <div className="rounded-2xl bg-[#f2f2f0] p-2">
                {navLinks.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-4 py-3 text-xs font-black uppercase tracking-widest text-black transition hover:bg-[#ff7a00]"
                  >
                    {item}
                  </a>
                ))}
                <a
                  href={`tel:${CONTACT.phoneTel}`}
                  className="mt-1 flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-bold text-black"
                >
                  <Phone size={14} className="text-[#ff7a00]" />
                  {CONTACT.phoneDisplay}
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>

      <section id="home" className="relative flex min-h-[720px] items-end bg-[#111] px-5 pb-16 pt-28 text-white lg:min-h-[860px] lg:px-12 lg:pb-24 lg:pt-32">
        <img src={images.hero} alt="Welder working with sparks in a dark workshop" className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="hero-overlay absolute inset-0" />
        <div className="spark spark-one" />
        <div className="spark spark-two" />
        <div className="spark spark-three" />
        <div className="relative z-10 mx-auto w-full max-w-[1400px]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={reveal}
            className="mb-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.35em] text-[#ff7a00] sm:mb-8"
          >
            <span className="h-0.5 w-12 bg-[#ff7a00]" />
            Steel / Aluminium / Craft
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, scale: 0.96, y: 36 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="hero-title hero-title-display max-w-[min(100%,920px)]"
          >
            <span className="hero-line hero-line-accent block">YSF</span>
            <span className="hero-line hero-line-light block">WELDING</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="hero-kicker mt-4 max-w-lg text-sm font-semibold uppercase tracking-[0.2em] text-white/90 sm:mt-6 sm:text-base"
          >
            Sharjah&apos;s precision metal workshop
          </motion.p>
          <div className="mt-10 flex flex-col justify-between gap-8 border-t border-[#ff7a00]/40 pt-8 sm:flex-row sm:items-end">
            <p className="max-w-md text-sm leading-7 text-white/80 sm:text-[15px]">
              Built for the bold. Precision steel and aluminium fabrication for homes, businesses and ambitious spaces across Sharjah.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#contact"
                className="skew-button bg-[#ff7a00] px-6 py-4 text-[11px] font-black uppercase tracking-widest text-black transition hover:bg-white"
              >
                Get a free quote <ArrowRight size={15} className="ml-5 inline" />
              </a>
              <a
                href="#projects"
                className="skew-button border border-white/60 px-6 py-4 text-[11px] font-black uppercase tracking-widest text-white transition hover:border-[#ff7a00] hover:text-[#ff7a00]"
              >
                View projects
              </a>
            </div>
          </div>
        </div>
        <a
          href="#intro"
          className="absolute bottom-8 right-8 hidden items-center gap-3 text-[9px] font-bold uppercase tracking-[0.25em] text-white/60 lg:flex"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30">
            <ArrowDown size={14} />
          </span>
          Scroll to explore
        </a>
      </section>

      <section id="intro" className="relative px-5 py-24 lg:px-12 lg:py-36"><div className="mx-auto grid max-w-[1400px] items-center gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24"><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={reveal}><p className="eyebrow">01 / Made in Sharjah</p><h2 className="display-title mt-5 max-w-xl text-5xl font-black uppercase leading-[0.92] tracking-[-0.06em] sm:text-7xl">Metalwork with <span className="text-[#ff7a00]">intent.</span></h2><p className="mt-8 max-w-md text-base leading-8 text-black/60">AL YANUF Steel Fabrication & Welding LLC is where strong materials meet sharp thinking. From a first sketch to the final installation, we make metalwork that earns its place.</p><a href="#about" className="mt-8 inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest underline decoration-[#ff7a00] decoration-2 underline-offset-8">Meet the team <ArrowRight size={15} /></a></motion.div><motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.8 }} className="relative min-h-[410px] bg-[#f1f1ef] p-5 sm:min-h-[560px] lg:min-h-[540px]"><div className="absolute -left-5 top-12 z-10 bg-[#ff7a00] px-4 py-3 text-[10px] font-black uppercase tracking-widest [writing-mode:vertical-rl]">Built to last</div><img src={images.gate} alt="Custom wrought iron villa gate" className="h-full w-full object-cover grayscale transition duration-700 hover:grayscale-0" /><div className="absolute -bottom-5 -right-5 bg-black px-5 py-4 text-white"><div className="text-2xl font-black">12+</div><div className="text-[9px] uppercase tracking-widest text-white/60">Years of craft</div></div></motion.div></div></section>

      <section id="services" className="bg-[#f2f2f0] px-5 py-24 lg:px-12 lg:py-32"><div className="mx-auto max-w-[1400px]"><motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} className="flex flex-col justify-between gap-6 border-b border-black/15 pb-8 sm:flex-row sm:items-end"><div><p className="eyebrow">02 / What we do</p><h2 className="display-title mt-5 text-5xl font-black uppercase leading-none tracking-[-0.06em] sm:text-7xl">The right<br /><span className="text-[#ff7a00]">angle.</span></h2></div><p className="max-w-xs text-sm leading-7 text-black/55">One team for the details that make a property feel finished.</p></motion.div><div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{services.map((service, index) => { const Icon = service.icon; return <motion.div key={service.title} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { delay: index * 0.05, duration: 0.5 } } }} className="service-card group relative min-h-[245px] overflow-hidden bg-white p-6 transition duration-300 hover:-translate-y-2 hover:bg-[#ff7a00]"><div className="flex items-start justify-between"><span className="text-[11px] font-bold text-black/35 group-hover:text-black/60">{service.number}</span><Icon size={24} strokeWidth={1.5} className="text-[#ff7a00] transition group-hover:text-black" /></div><div className="absolute bottom-6 left-6 right-6"><h3 className="text-2xl font-black uppercase tracking-tight">{service.title}</h3><p className="mt-2 max-w-[220px] text-sm leading-6 text-black/50 transition group-hover:text-black/75">{service.copy}</p></div><span className="absolute -right-8 -top-8 h-24 w-24 rounded-full border-[14px] border-black/5 transition group-hover:border-black/10" /></motion.div> })}</div></div></section>

      <section id="about" className="relative bg-black px-5 py-24 text-white lg:px-12 lg:py-32"><div className="mx-auto grid max-w-[1400px] items-stretch gap-0 lg:grid-cols-2"><motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative min-h-[480px] overflow-hidden"><img src={images.weld} alt="Welder producing a bright weld" className="h-full w-full object-cover grayscale" /><div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" /><div className="absolute bottom-7 left-7 text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">Measured. Welded. Delivered.</div></motion.div><motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="stripe-panel relative flex min-h-[480px] flex-col justify-end bg-[#ff7a00] p-8 text-black sm:p-12 lg:-ml-8 lg:mt-16"><div className="absolute right-8 top-8 text-8xl font-black leading-none tracking-[-0.12em] opacity-20">YSF</div><p className="eyebrow text-black/60">03 / The YSF standard</p><h2 className="mt-5 max-w-md text-5xl font-black uppercase leading-[0.88] tracking-[-0.06em] sm:text-7xl">Strong work.<br />Sharp finish.</h2><p className="mt-8 max-w-sm text-sm leading-7 text-black/70">We combine proven fabrication methods with a design eye. Every cut is considered, every joint is clean, every project is made to live in the real world.</p><div className="mt-8 flex flex-wrap gap-3 text-[10px] font-black uppercase tracking-widest"><span className="border border-black/30 px-3 py-2">Site measured</span><span className="border border-black/30 px-3 py-2">Built in-house</span></div></motion.div></div></section>

      <section id="projects" className="px-5 py-24 lg:px-12 lg:py-36"><div className="mx-auto max-w-[1400px]"><div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end"><div><p className="eyebrow">04 / Selected work</p><h2 className="display-title mt-5 text-5xl font-black uppercase leading-none tracking-[-0.06em] sm:text-7xl">Proof in<br /><span className="text-[#ff7a00]">the detail.</span></h2></div><div className="flex gap-2"><a href="https://www.instagram.com/ysf.welding/" target="_blank" rel="noreferrer" className="flex items-center gap-2 border border-black/20 px-4 py-3 text-[10px] font-black uppercase tracking-widest transition hover:border-[#ff7a00] hover:text-[#ff7a00]"><Instagram size={14} /> Instagram</a><a href="https://www.facebook.com/ysf.welding/" target="_blank" rel="noreferrer" className="flex items-center gap-2 border border-black/20 px-4 py-3 text-[10px] font-black uppercase tracking-widest transition hover:border-[#ff7a00] hover:text-[#ff7a00]"><Facebook size={14} /> Facebook</a></div></div><div className="mt-12 grid auto-rows-[190px] grid-cols-2 gap-3 sm:auto-rows-[230px] lg:grid-cols-4">{projects.map((project, index) => <motion.button key={project.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} onClick={() => setSelectedProject(project)} className={`project-card group relative overflow-hidden text-left ${index === 0 ? 'col-span-2 row-span-2' : index === 3 ? 'col-span-2' : ''}`}><img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" /><div className="absolute bottom-5 left-5 text-white"><div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#ff7a00]">{project.type}</div><div className="mt-1 text-lg font-black uppercase">{project.title}</div></div><div className="absolute right-4 top-4 rounded-full bg-white p-2 opacity-0 transition group-hover:opacity-100"><ArrowUpRight size={15} /></div></motion.button>)}</div></div></section>

      <section className="bg-[#ff7a00] px-5 py-12 lg:px-12"><div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-10 sm:grid-cols-4">{[['120+', 'Projects completed'], ['96%', 'Repeat clients'], ['12+', 'Years of experience'], ['04', 'Emirates served']].map(([number, label], index) => <motion.div key={label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="border-l border-black/25 pl-4 sm:pl-6"><div className="text-4xl font-black tracking-[-0.07em] sm:text-5xl">{number}</div><div className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-black/60">{label}</div></motion.div>)}</div></section>

      <section id="reviews" className="bg-[#f2f2f0] px-5 py-24 lg:px-12 lg:py-32"><div className="mx-auto max-w-[1400px]"><div className="flex items-end justify-between"><div><p className="eyebrow">05 / People trust us</p><h2 className="display-title mt-5 text-5xl font-black uppercase tracking-[-0.06em] sm:text-7xl">Built on<br /><span className="text-[#ff7a00]">good words.</span></h2></div><div className="hidden gap-2 sm:flex"><button onClick={previousReview} className="rounded-full border border-black/20 p-3 transition hover:bg-black hover:text-white" aria-label="Previous review"><ChevronLeft size={18} /></button><button onClick={nextReview} className="rounded-full border border-black/20 p-3 transition hover:bg-black hover:text-white" aria-label="Next review"><ChevronRight size={18} /></button></div></div><div className="mt-12 grid gap-4 lg:grid-cols-3">{reviews.map((review, index) => <motion.article key={review.name} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`review-card ${index === reviewIndex ? 'active-review stripe-panel bg-[#ff7a00]' : 'bg-white'} p-7 transition sm:p-9`}><div className="flex items-center justify-between"><div className={`flex h-11 w-11 items-center justify-center rounded-full text-xs font-black ${index === reviewIndex ? 'bg-black text-white' : 'bg-[#f2f2f0]'}`}>{review.initials}</div><div className="flex gap-1 text-[#ff7a00]">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={13} fill="currentColor" />)}</div></div><p className="mt-8 min-h-[120px] text-base leading-7">“{review.text}”</p><div className="mt-6 border-t border-black/15 pt-5"><div className="text-xs font-black uppercase tracking-wider">{review.name}</div><div className="mt-1 text-[10px] uppercase tracking-widest opacity-50">{review.place}</div></div></motion.article>)}</div><div className="mt-10 flex items-center justify-between border-t border-black/15 pt-5"><div className="flex gap-2">{reviews.map((review, index) => <button key={review.name} onClick={() => setReviewIndex(index)} className={`h-1.5 transition-all ${index === reviewIndex ? 'w-10 bg-[#ff7a00]' : 'w-5 bg-black/20'}`} aria-label={`Show review ${index + 1}`} />)}</div><div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-black/50"><span>Google <b className="text-black">4.9</b></span><span>Facebook <b className="text-black">5.0</b></span></div></div></div></section>

      <section className="relative overflow-hidden bg-black px-5 py-24 text-white lg:px-12 lg:py-28"><div className="absolute -right-20 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full border-[70px] border-[#ff7a00]/20" /><div className="relative mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-10 lg:flex-row lg:items-end"><div><p className="eyebrow text-[#ff7a00]">06 / Start a project</p><h2 className="mt-5 max-w-3xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] sm:text-7xl lg:text-8xl">Need custom<br /><span className="text-[#ff7a00]">steel work?</span></h2></div><div className="flex flex-wrap gap-3"><a href={`tel:${CONTACT.phoneTel}`} className="skew-button bg-[#ff7a00] px-6 py-4 text-[10px] font-black uppercase tracking-widest text-black">Call the workshop <Phone size={14} className="ml-3 inline" /></a><a href={`https://wa.me/${CONTACT.whatsApp}`} target="_blank" rel="noreferrer" className="skew-button border border-white/30 px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white transition hover:border-[#ff7a00] hover:text-[#ff7a00]">WhatsApp us <MessageCircle size={14} className="ml-3 inline" /></a></div></div></section>

      <section id="contact" className="px-5 py-24 lg:px-12 lg:py-36"><div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[0.85fr_1.15fr]"><div><p className="eyebrow">07 / Let&apos;s talk</p><h2 className="display-title mt-5 text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-7xl">Bring us<br /><span className="text-[#ff7a00]">the brief.</span></h2><p className="mt-8 max-w-sm text-sm leading-7 text-black/60">Tell us what you&apos;re building and we&apos;ll help you shape the right solution. Site visits and measurements are available across Sharjah.</p><div className="mt-10 space-y-5 text-sm"><div className="flex gap-4"><MapPin className="mt-1 text-[#ff7a00]" size={18} /><span>Emirates Industrial City, Al Sajaa,<br />Sharjah, United Arab Emirates</span></div><div className="flex gap-4"><Phone className="text-[#ff7a00]" size={18} /><span><a href={`tel:${CONTACT.phoneTel}`} className="font-semibold transition hover:text-[#ff7a00]">{CONTACT.phoneDisplay}</a><br /><small className="text-black/45">Phone / WhatsApp</small></span></div><div className="flex gap-4"><Mail className="text-[#ff7a00]" size={18} /><span><a href={`mailto:${CONTACT.email}`} className="font-semibold transition hover:text-[#ff7a00]">{CONTACT.email}</a></span></div><div className="flex gap-4"><Clock3 className="text-[#ff7a00]" size={18} /><span>Saturday – Thursday<br /><small className="text-black/45">08:00 – 18:00</small></span></div></div></div><div className="grid gap-8 lg:grid-cols-2"><form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="space-y-5"><div className="grid gap-5 sm:grid-cols-2"><label className="field-label">Your name<input required type="text" placeholder="Full name" /></label><label className="field-label">Phone number<input required type="tel" placeholder="+971" /></label></div><label className="field-label">I&apos;m interested in<select defaultValue=""><option value="" disabled>Select a service</option><option>Gates & fences</option><option>Railings</option><option>Pergola</option><option>Custom fabrication</option></select></label><label className="field-label">Tell us about the project<textarea required rows={5} placeholder="A few words about what you need..." /></label><button type="submit" className="skew-button w-full bg-[#ff7a00] px-6 py-4 text-[10px] font-black uppercase tracking-widest text-black transition hover:bg-black hover:text-white">{submitted ? <><Check size={15} className="mr-2 inline" /> Message received</> : <>Send enquiry <ArrowRight size={15} className="ml-4 inline" /></>}</button></form><div className="hidden min-h-[430px] bg-[#f2f2f0] p-2 sm:block"><iframe title="Map showing Al Sajaa, Sharjah" src="https://www.google.com/maps?q=Al+Sajaa+Sharjah+UAE&output=embed" className="h-full w-full grayscale" loading="lazy" /></div></div></div></section>

      <footer className="bg-[#0a0a0a] px-5 py-12 text-white lg:px-12"><div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-10 sm:flex-row sm:items-end"><div><Logo light /><p className="mt-6 max-w-xs text-xs leading-6 text-white/45">AL YANUF Steel Fabrication & Welding LLC<br />Strong ideas, precisely made in Sharjah.</p></div><div className="flex flex-col gap-5 sm:items-end"><div className="flex gap-5 text-[10px] font-bold uppercase tracking-widest text-white/60"><a href="#services" className="transition hover:text-[#ff7a00]">Services</a><a href="#projects" className="transition hover:text-[#ff7a00]">Projects</a><a href="#contact" className="transition hover:text-[#ff7a00]">Contact</a></div><div className="flex gap-3"><a href="https://www.instagram.com/ysf.welding/" target="_blank" rel="noreferrer" className="rounded-full border border-white/20 p-3 transition hover:border-[#ff7a00] hover:text-[#ff7a00]" aria-label="Instagram"><Instagram size={15} /></a><a href="https://www.facebook.com/ysf.welding/" target="_blank" rel="noreferrer" className="rounded-full border border-white/20 p-3 transition hover:border-[#ff7a00] hover:text-[#ff7a00]" aria-label="Facebook"><Facebook size={15} /></a></div></div></div><div className="mx-auto mt-12 flex max-w-[1400px] justify-between border-t border-white/10 pt-5 text-[9px] uppercase tracking-widest text-white/35"><span>© 2025 YSF Welding</span><span>Built to stand strong</span></div></footer>

      <a href={`https://wa.me/${CONTACT.whatsApp}`} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#ff7a00] text-black shadow-[0_10px_30px_rgba(255,122,0,0.35)] transition hover:scale-110" aria-label="Chat on WhatsApp"><MessageCircle size={24} /></a>

      {selectedProject && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-5" role="dialog" aria-modal="true" aria-label={selectedProject.title} onClick={() => setSelectedProject(null)}><button className="absolute right-5 top-5 rounded-full border border-white/30 p-3 text-white" onClick={() => setSelectedProject(null)} aria-label="Close project"><X size={20} /></button><div className="max-h-[85vh] max-w-5xl" onClick={(event) => event.stopPropagation()}><img src={selectedProject.image} alt={selectedProject.title} className="max-h-[75vh] w-auto object-contain" /><div className="mt-4 flex items-center justify-between text-white"><div><div className="text-[10px] font-bold uppercase tracking-widest text-[#ff7a00]">{selectedProject.type}</div><div className="mt-1 text-2xl font-black uppercase">{selectedProject.title}</div></div><ArrowUpRight className="text-[#ff7a00]" /></div></div></div>}
    </main>
  );
}
