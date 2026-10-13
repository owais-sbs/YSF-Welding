'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
import Image from 'next/image';
import styles from './HeroSlider.module.css';

export type HeroSlide = {
  image: string;
  eyebrow?: string;
  title: string;
  text: string;
  ctaLabel?: string;
  ctaHref?: string;
};

type HeroSliderProps = {
  slides: HeroSlide[];
  interval?: number;
};

const COLUMNS = 7;
const LEAF_MS = 860;
const STAGGER_MS = 70;
const TRANSITION_MS = LEAF_MS + (COLUMNS - 1) * STAGGER_MS + 80;

type Curtain = {
  from: number;
  to: number;
  direction: 1 | -1;
};

function mod(index: number, count: number) {
  return ((index % count) + count) % count;
}

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  const path = direction === 'left' ? 'M14.5 5.5 L8 12 L14.5 18.5' : 'M9.5 5.5 L16 12 L9.5 18.5';

  return (
    <svg className={styles.chevron} width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={path} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SliceImage({ src, index }: { src: string; index: number }) {
  return (
    // Transient curtain slices share the slide URL already requested by next/image.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      draggable={false}
      decoding="async"
      className={styles.sliceImage}
      style={{ width: `${COLUMNS * 100}%`, left: `${-index * 100}%` }}
    />
  );
}

function CurtainPanels({ slides, curtain }: { slides: HeroSlide[]; curtain: Curtain }) {
  const directionName = curtain.direction === 1 ? 'next' : 'prev';

  return (
    <div className={styles.panels} data-direction={directionName} aria-hidden="true">
      {Array.from({ length: COLUMNS }, (_, index) => {
        const order = curtain.direction === 1 ? index : COLUMNS - 1 - index;
        const style = {
          left: `${(index / COLUMNS) * 100}%`,
          width: `calc(${100 / COLUMNS}% + 1px)`,
          '--delay': `${order * STAGGER_MS}ms`,
          '--leaf': `${LEAF_MS}ms`,
        } as CSSProperties;

        return (
          <div key={index} className={styles.column} style={style}>
            <div className={styles.leafIn}>
              <SliceImage src={slides[curtain.to].image} index={index} />
            </div>
            <div className={styles.leafOut}>
              <SliceImage src={slides[curtain.from].image} index={index} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ArrowButton({
  direction,
  label,
  slide,
  onClick,
}: {
  direction: 'left' | 'right';
  label: string;
  slide: HeroSlide;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`${styles.arrow} ${direction === 'left' ? styles.navPrev : styles.navNext}`}
      aria-label={label}
      onClick={onClick}
    >
      <Chevron direction={direction} />
      <span className={styles.preview}>
        <span className={styles.previewMotion}>
          <span className={styles.previewCard}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={slide.image} alt="" className={styles.previewImage} draggable={false} />
            <span className={styles.previewCaption}>
              <span className={styles.previewTitle}>{slide.title}</span>
            </span>
          </span>
        </span>
      </span>
    </button>
  );
}

export default function HeroSlider({ slides, interval = 6000 }: HeroSliderProps) {
  const [settled, setSettled] = useState(0);
  const [shown, setShown] = useState(0);
  const [curtain, setCurtain] = useState<Curtain | null>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [motionReady, setMotionReady] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const busy = useRef(false);
  const timerRef = useRef<number | null>(null);
  const settledRef = useRef(0);
  const reducedRef = useRef(false);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const goToRef = useRef<(to: number, direction: 1 | -1) => void>(() => {});

  const count = slides.length;
  const paused = hovered || focused || curtain !== null;
  settledRef.current = settled;
  reducedRef.current = reducedMotion;

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const goTo = useCallback(
    (to: number, direction: 1 | -1) => {
      if (count < 2 || busy.current) return;
      const dest = mod(to, count);
      const from = settledRef.current;
      if (dest === from) return;

      setShown(dest);

      if (reducedRef.current) {
        setSettled(dest);
        return;
      }

      busy.current = true;
      setCurtain({ from, to: dest, direction });
      setSettled(dest);
      clearTimer();
      timerRef.current = window.setTimeout(() => {
        timerRef.current = null;
        busy.current = false;
        setCurtain(null);
      }, TRANSITION_MS);
    },
    [count],
  );

  goToRef.current = goTo;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    setMotionReady(true);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!reducedMotion) return;
    clearTimer();
    busy.current = false;
    setCurtain(null);
  }, [reducedMotion]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const clear = () => {
      node.removeAttribute('data-blur');
      node.style.removeProperty('--scroll-blur');
      node.style.removeProperty('--scroll-opacity');
      node.style.removeProperty('--scroll-shift');
    };

    if (!motionReady || reducedMotion) {
      clear();
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const height = rect.height || 1;
      const progress = Math.min(1, Math.max(0, -rect.top) / height);
      if (progress <= 0) {
        clear();
        return;
      }
      node.setAttribute('data-blur', 'true');
      node.style.setProperty('--scroll-blur', `${(progress * 12).toFixed(2)}px`);
      node.style.setProperty('--scroll-opacity', (1 - progress * 0.6).toFixed(3));
      node.style.setProperty('--scroll-shift', `${(progress * -20).toFixed(2)}px`);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      clear();
    };
  }, [motionReady, reducedMotion]);

  useEffect(() => () => clearTimer(), []);

  useEffect(() => {
    if (!motionReady || reducedMotion || paused || count < 2 || interval <= 0) return;
    const id = window.setInterval(() => {
      goToRef.current(settledRef.current + 1, 1);
    }, interval);
    return () => window.clearInterval(id);
  }, [motionReady, reducedMotion, paused, count, interval, settled]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const root = rootRef.current;
      const active = document.activeElement;
      if (!root || !active || !root.contains(active)) return;
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      if (event.key === 'ArrowRight') goToRef.current(settledRef.current + 1, 1);
      else goToRef.current(settledRef.current - 1, -1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const onPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    const target = event.target as HTMLElement;
    if (target.closest('a, button')) return;
    pointerRef.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    const start = pointerRef.current;
    pointerRef.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) goTo(settled + 1, 1);
    else goTo(settled - 1, -1);
  };

  if (count === 0) return null;

  const slide = slides[shown];
  const previous = slides[mod(shown - 1, count)];
  const next = slides[mod(shown + 1, count)];

  return (
    <section
      ref={rootRef}
      className={styles.slider}
      data-reduced={reducedMotion ? 'true' : 'false'}
      style={{ '--slide-interval': `${interval}ms` } as CSSProperties}
      aria-roledescription="carousel"
      aria-label="Featured"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        pointerRef.current = null;
      }}
    >
      <div className={styles.stage}>
        {slides.map((item, index) => (
          <Image
            key={`${item.image}-${index}`}
            src={item.image}
            alt=""
            fill
            sizes="100vw"
            priority={index === 0}
            className={`${styles.baseImage} ${index === settled ? styles.baseVisible : ''}`}
          />
        ))}
        {curtain ? <CurtainPanels slides={slides} curtain={curtain} /> : null}
      </div>

      <div className={styles.copy} key={shown}>
        {slide.eyebrow ? <p className={styles.kicker}>{slide.eyebrow}</p> : null}
        <h2 className={styles.title}>{slide.title}</h2>
        <p className={styles.lead}>{slide.text}</p>
        {slide.ctaLabel && slide.ctaHref ? (
          <a className={`btn btn-primary ${styles.cta}`} href={slide.ctaHref}>
            {slide.ctaLabel}
          </a>
        ) : null}
      </div>

      {count > 1 ? (
        <>
          <ArrowButton direction="left" label="Previous slide" slide={previous} onClick={() => goTo(shown - 1, -1)} />
          <ArrowButton direction="right" label="Next slide" slide={next} onClick={() => goTo(shown + 1, 1)} />
          <div className={styles.dots}>
            {slides.map((item, index) => (
              <button
                key={`${item.title}-${index}`}
                type="button"
                className={`${styles.dot} ${index === shown ? styles.dotActive : ''}`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === shown ? 'true' : undefined}
                onClick={() => goTo(index, index > shown ? 1 : -1)}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
