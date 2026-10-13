'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] max-sm:right-5 ${
        visible ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
      }`}
      style={{ bottom: 'calc(max(1.25rem, env(safe-area-inset-bottom, 0px)) + 3.5rem + 0.75rem)' }}
    >
      <ArrowUp size={18} strokeWidth={2.2} />
    </button>
  );
}
