'use client';

import { useState } from 'react';
import { Facebook, Instagram, Mail, Menu, Phone, X } from 'lucide-react';
import styles from './Header.module.css';

const PHONE_DISPLAY = '+971 50 000 0000';
const PHONE_TEL = '+971500000000';
const EMAIL = 'info@ysfwelding.ae';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
] as const;

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`${styles.logo} ${light ? styles.logoLight : ''}`}>
      <span className="ysf-mark" aria-hidden="true">
        <span>Y</span>
        <i />
        <b />
      </span>
      <span className={styles.logoText}>
        <span className={styles.logoName}>YSF</span>
        <span className={styles.logoSub}>Welding</span>
      </span>
    </span>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.utility}>
        <div className={styles.utilityInner}>
          <div className={styles.utilityLeft}>
            <a href={`tel:${PHONE_TEL}`}>
              <Phone size={13} aria-hidden="true" />
              {PHONE_DISPLAY}
            </a>
            <a className={styles.emailLink} href={`mailto:${EMAIL}`}>
              <Mail size={13} aria-hidden="true" />
              {EMAIL}
            </a>
          </div>
          <div className={styles.socials}>
            <a
              className={styles.social}
              href="https://www.instagram.com/ysf.welding/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={15} />
            </a>
            <a
              className={styles.social}
              href="https://www.facebook.com/ysf.welding/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <Facebook size={15} />
            </a>
          </div>
        </div>
      </div>

      <nav className={styles.nav} aria-label="Main navigation">
        <a href="#home" aria-label="YSF Welding home">
          <Logo />
        </a>
        <div className={styles.links}>
          {links.map((item) => (
            <a key={item.href} className={styles.link} href={item.href}>
              {item.label}
            </a>
          ))}
          <a className="btn btn-outline" href="#contact">
            Contact
          </a>
        </div>
        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open ? (
        <div className={styles.mobile} id="mobile-nav">
          {links.map((item) => (
            <a key={item.href} className={styles.link} href={item.href} onClick={close}>
              {item.label}
            </a>
          ))}
          <a className="btn btn-outline" href="#contact" onClick={close}>
            Contact
          </a>
        </div>
      ) : null}
    </header>
  );
}
