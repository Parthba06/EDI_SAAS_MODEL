import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.4,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom'
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  // Split text into words
  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="inline-block word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef?.current || window;

    const wordElements = el.querySelectorAll<HTMLElement>('.word');

    const pinTrigger = ScrollTrigger.create({
      trigger: el,
      scroller,
      start: 'top center',
      end: `+=140%`,
      pin: true,
      anticipatePin: 1,
      scrub: 0.6
    });

    gsap.fromTo(
      el,
      { transformOrigin: '0% 50%', rotate: baseRotation },
      {
        ease: 'none',
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top center',
          end: pinTrigger.end,
          scrub: 1
        }
      }
    );

    gsap.fromTo(
      wordElements,
      { opacity: Math.max(baseOpacity, 0.85), willChange: 'opacity' },
      {
        ease: 'power1.out',
        opacity: 1,
        stagger: 0.04,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top center',
          end: pinTrigger.end,
          scrub: 1
        }
      }
    );

    if (enableBlur) {
      gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: 'none',
          filter: 'blur(0px)',
          stagger: 0.08,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top center',
            end: pinTrigger.end,
            scrub: 1
          }
        }
      );
    }

    return () => {
      pinTrigger.kill();
      ScrollTrigger.getAll()
        .filter(trigger => trigger.trigger === el)
        .forEach(trigger => trigger.kill());
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength
  ]);

  return (
    <h2 ref={containerRef} className={`my-5 !text-black !dark:text-black ${containerClassName}`}>
      <p
        className={`
          text-[clamp(1.6rem,4vw,3rem)]
          leading-[1.5]
          font-semibold
          !text-black !dark:text-black
          ${textClassName}
        `}
      >
        {splitText}
      </p>
    </h2>
  );
};

export default ScrollReveal;
