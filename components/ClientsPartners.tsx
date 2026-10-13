'use client';

import { motion } from 'framer-motion';
import styles from './ClientsPartners.module.css';

type ClientsPartnersProps = {
  photos: string[];
  logoSrc: string;
};

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' as const } },
};

export default function ClientsPartners({ photos, logoSrc }: ClientsPartnersProps) {
  const photoLoop = [...photos, ...photos];
  const logoLoop = Array.from({ length: 24 }, (_, index) => index);

  return (
    <section id="clients" className={`section section-soft ${styles.section}`}>
      <div className="mx-auto max-w-[1400px]">
        <div className={styles.layout}>
          <motion.div
            className={styles.copy}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={reveal}
          >
            <p className="eyebrow">05 / Trusted partners</p>
            <h2 className="display-title mt-5 max-w-md text-4xl font-bold uppercase leading-[0.95] tracking-[-0.06em] sm:text-6xl">
              Our clients<br /><span>and partners.</span>
            </h2>
            <p className="mt-7 max-w-sm text-sm leading-7 text-black/60">
              From villa compounds to industrial yards across Sharjah, we build lasting relationships with property owners, contractors and design teams who care about clean metalwork.
            </p>
          </motion.div>

          <div className={styles.photoTrack} aria-label="Partner project images">
            <div className={styles.photoRail}>
              {photoLoop.map((src, index) => (
                <div key={`photo-${index}`} className={styles.photo}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" draggable={false} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.logoBand} aria-label="Partner logos">
        <div className={styles.logoRail}>
          {logoLoop.map((index) => (
            <div key={`logo-${index}`} className={styles.logoItem}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoSrc} alt="YSF Welding" draggable={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
