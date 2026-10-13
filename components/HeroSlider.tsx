'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
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

// Slider Revolution 6.3.6 `3dcurtain-vertical` (rs6.min.js c===18):
// masterspeed h=2000, slots=7 (TR[11]), ease power1.inOut
// duration = h/slots/1000, delay = e*(h/slots/2000)
// next:  from {opacity:0, rotationY:90, transformPerspective:600, transformOrigin:"center left"}
//        to   {opacity:1, rotationY:0}
// active: from {opacity:1, rotationY:0, transformOrigin:"center right"}
//         to   {opacity:0, rotationY:110}
const COLUMNS = 7;
const MASTER_MS = 2000;
const LEAF_S = MASTER_MS / COLUMNS / 1000;
const STAGGER_S = MASTER_MS / COLUMNS / 2000;
const TRANSITION_MS = Math.round((LEAF_S + (COLUMNS - 1) * STAGGER_S) * 1000) + 80;
const EASE = 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'; // power1.inOut

type Curtain = {
  from: number;
  to: number;
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

function CurtainPanels({
  slides,
  curtain,
  stageSize,
}: {
  slides: HeroSlide[];
  curtain: Curtain;
  stageSize: { w: number; h: number };
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { w: stageW, h: stageH } = stageSize;
  const slotW = stageW / COLUMNS;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || stageW <= 0) return;

    const animations: Animation[] = [];
    const outs = root.querySelectorAll<HTMLElement>('[data-slot="out"]');
    const inns = root.querySelectorAll<HTMLElement>('[data-slot="in"]');

    inns.forEach((el, e) => {
      el.style.transformOrigin = 'center left';
      animations.push(
        el.animate(
          [
            { opacity: 0, transform: 'perspective(600px) rotateY(90deg)' },
            { opacity: 1, transform: 'perspective(600px) rotateY(0deg)' },
          ],
          {
            duration: LEAF_S * 1000,
            delay: e * STAGGER_S * 1000,
            easing: EASE,
            fill: 'both',
          },
        ),
      );
    });

    outs.forEach((el, e) => {
      el.style.transformOrigin = 'center right';
      animations.push(
        el.animate(
          [
            { opacity: 1, transform: 'perspective(600px) rotateY(0deg)' },
            { opacity: 0, transform: 'perspective(600px) rotateY(110deg)' },
          ],
          {
            duration: LEAF_S * 1000,
            delay: e * STAGGER_S * 1000,
            easing: EASE,
            fill: 'both',
          },
        ),
      );
    });

    return () => {
      animations.forEach((a) => a.cancel());
    };
  }, [curtain.from, curtain.to, stageW]);

  if (stageW <= 0 || stageH <= 0) return null;

  const renderLayer = (kind: 'in' | 'out', slideIndex: number) => (
    <div className={kind === 'in' ? styles.layerIn : styles.layerOut}>
      {Array.from({ length: COLUMNS }, (_, index) => (
        <div
          key={`${kind}-${slideIndex}-${index}`}
          className={styles.slot}
          style={{
            left: index * slotW,
            width: slotW + 1.5,
            height: stageH,
          }}
        >
          <div data-slot={kind} className={kind === 'in' ? styles.slotIn : styles.slotOut}>
            <div
              className={styles.slice}
              style={{
                width: stageW,
                height: stageH,
                left: -index * slotW,
                backgroundImage: `url("${slides[slideIndex].image}")`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div ref={rootRef} className={styles.panels} aria-hidden="true">
      {renderLayer('in', curtain.to)}
      {renderLayer('out', curtain.from)}
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
        <span className={styles.previewImage} style={{ backgroundImage: `url("${slide.image}")` }} />
        <span className={styles.previewTitle}>{slide.title}</span>
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
  const [stageSize, setStageSize] = useState({ w: 0, h: 0 });
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
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
    (to: number, _direction: 1 | -1) => {
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
      setCurtain({ from, to: dest });
      clearTimer();
      timerRef.current = window.setTimeout(() => {
        timerRef.current = null;
        setSettled(dest);
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
    const node = stageRef.current;
    if (!node) return;

    const measure = () => {
      const rect = node.getBoundingClientRect();
      setStageSize({ w: Math.round(rect.width), h: Math.round(rect.height) });
    };

    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    ro?.observe(node);
    window.addEventListener('resize', measure);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', measure);
    };
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
      const progress = Math.min(1, Math.max(0, -rect.top / height));
      if (progress <= 0) {
        clear();
        return;
      }
      node.setAttribute('data-blur', 'true');
      node.style.setProperty('--scroll-blur', `${progress * 12}px`);
      node.style.setProperty('--scroll-opacity', `${1 - progress * 0.6}`);
      node.style.setProperty('--scroll-shift', `${progress * -20}px`);
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
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
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

  const slide = slides[settled];
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
      <div ref={stageRef} className={styles.stage}>
        {slides.map((item, index) => (
          <Image
            key={`${item.image}-${index}`}
            src={item.image}
            alt=""
            fill
            sizes="100vw"
            priority={index === 0}
            className={`${styles.baseImage} ${!curtain && index === settled ? styles.baseVisible : ''}`}
          />
        ))}
        {curtain ? <CurtainPanels slides={slides} curtain={curtain} stageSize={stageSize} /> : null}
      </div>

      {!curtain ? (
        <div className={styles.copy} key={settled}>
          {slide.eyebrow ? <p className={styles.kicker}>{slide.eyebrow}</p> : null}
          <h2 className={styles.title}>{slide.title}</h2>
          <p className={styles.lead}>{slide.text}</p>
          {slide.ctaLabel && slide.ctaHref ? (
            <a className={`btn btn-primary ${styles.cta}`} href={slide.ctaHref}>
              {slide.ctaLabel}
            </a>
          ) : null}
        </div>
      ) : null}

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
