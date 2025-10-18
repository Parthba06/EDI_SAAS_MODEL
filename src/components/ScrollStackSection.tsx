import { useLayoutEffect, useRef } from 'react';
import Lenis from 'lenis';

const ScrollStackSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const lenisRef = useRef(null);
  const animationFrameRef = useRef(null);

  const calculateProgress = (scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  };

  const parsePercentage = (value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  };

  const getScrollData = () => {
    const scroller = sectionRef.current;
    return {
      scrollTop: scroller ? scroller.scrollTop : 0,
      containerHeight: scroller ? scroller.clientHeight : window.innerHeight,
      scrollContainer: scroller,
    };
  };

  const getElementOffset = (element) => {
    if (!sectionRef.current || !element) return 0;
    return element.getBoundingClientRect().top + sectionRef.current.scrollTop;
  };

  const updateCardTransforms = () => {
    if (!cardsRef.current.length) return;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage('20%', containerHeight);
    const scaleEndPositionPx = parsePercentage('10%', containerHeight);
    const itemScale = 0.025;
    const itemStackDistance = 30;
    const baseScale = 0.9;

    const endElement = sectionRef.current?.querySelector('.scroll-stack-end');
    const endElementTop = endElement ? getElementOffset(endElement) : scrollTop + containerHeight;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = getElementOffset(card);
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const transform = `translate3d(0, ${Math.round(translateY * 100) / 100}px, 0) scale(${Math.round(scale * 1000) / 1000})`;
      card.style.transform = transform;
    });
  };

  const handleScroll = () => {
    updateCardTransforms();
  };

  const setupLenis = () => {
    const scroller = sectionRef.current;
    if (!scroller) return;

    const lenis = new Lenis({
      wrapper: scroller,
      content: scroller,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      gestureOrientation: 'vertical',
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
    });

    lenis.on('scroll', handleScroll);

    const raf = (time) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    lenisRef.current = lenis;
    return lenis;
  };

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    // Collect card refs
    cardsRef.current = Array.from(sectionRef.current.querySelectorAll('.scroll-stack-card'));

    if (!cardsRef.current.length) {
      console.warn('No cards found in cardsRef');
      return;
    }

    // Set initial styles
    cardsRef.current.forEach((card, i) => {
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
    });

    const lenis = setupLenis();
    updateCardTransforms();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      cardsRef.current = [];
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full h-screen relative overflow-y-auto overflow-x-hidden"
      style={{
        backgroundColor: '#EAEAEA',
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <div className="scroll-stack-inner w-full px-6 md:px-10 lg:px-16 pt-[20vh] pb-[20vh]">
        <div className="relative">
          {[
            {
              img: 'https://picsum.photos/id/1018/1200/500',
              title: 'Instagram Analytics',
              subtitle: 'Track engagement, reach, and growth',
            },
            {
              img: 'https://picsum.photos/id/1015/1200/500',
              title: 'Content Performance',
              subtitle: 'See what resonates with your audience',
            },
            {
              img: 'https://picsum.photos/id/1016/1200/500',
              title: 'Audience Insights',
              subtitle: 'Understand your followers better',
            },
          ].map((card, index) => (
            <div
              key={index}
              className="scroll-stack-card w-full h-[500px] mb-8 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] bg-white overflow-hidden"
              style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
            >
              <img src={card.img} alt={`Instagram post ${index + 1}`} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                <h2 className="text-4xl md:text-5xl font-bold mb-2 text-white">{card.title}</h2>
                <p className="text-lg md:text-xl text-white/90">{card.subtitle}</p>
              </div>
            </div>
          ))}
          <div className="scroll-stack-end w-full h-px" />
        </div>
      </div>
    </section>
  );
};

export default ScrollStackSection;