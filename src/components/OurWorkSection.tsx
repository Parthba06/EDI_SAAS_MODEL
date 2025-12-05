"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OurWorkSection: React.FC = () => {

  const videoContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = videoContainerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        container,
        { scale: 0.75 },
        {
          scale: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 90%",
            end: "top 10%",
            scrub: 1.5,
          },
        }
      );
    }, videoContainerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="our-work-section"
      className="w-full bg-[#0A0F24] text-white border-t border-white/10 py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="w-full text-center">
          <p className="mb-3 text-[0.75rem] font-medium tracking-[0.15em] uppercase text-white/70">
            OUR WORK
          </p>
          <h2 className="mb-3 text-[clamp(2.5rem,5vw,3.5rem)] font-normal leading-[1.2] tracking-[-0.02em] text-white">
            From deep data to viral culture
          </h2>
          <p className="mb-8 font-['Playfair_Display',Georgia,serif] italic text-[clamp(1.8rem,4vw,2.8rem)] text-[#0E5EFF]">
            and beyond
          </p>
        </div>

        <div
          id="our-work-video-container"
          ref={videoContainerRef}
          className="mx-auto mt-8 flex max-w-[1200px] justify-center overflow-hidden rounded-xl"
        >
          <video
            src="https://cdn.dribbble.com/userupload/11982205/file/original-7c4a0a4970d5edb078f5a3bcf31c9190.mov"
            loop
            muted
            playsInline
            autoPlay
            preload="auto"
            className="block h-auto w-full rounded-xl"
          />
        </div>

        {/* New creative work cards section */}
        <section className="mt-24 w-full text-left">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <p className="mb-2 text-[0.75rem] font-medium tracking-[0.18em] uppercase text-white/70">
              EASY & HASSLE-FREE
            </p>
            <h3 className="text-[clamp(2.5rem,4.6vw,3.4rem)] leading-[1.18] font-semibold tracking-[-0.02em] text-white">
              Every type of creative work you&apos;ll <br />
                ever need,
              <span className="font-['Playfair_Display',Georgia,serif] italic font-normal text-[#0E5EFF]"> and more</span>
            </h3>
          </div>

          <div className="relative mt-10">
            <div className="scroll-wrapper relative w-screen overflow-hidden left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
              <style>{`
                @keyframes ourWorkScroll {
                  from { transform: translateX(0); }
                  to { transform: translateX(-50%); }
                }

                #our-work-section .scroll-track {
                  display: flex;
                  gap: 24px;
                  animation: ourWorkScroll 16s linear infinite;
                }

                #our-work-section .scroll-wrapper:hover .scroll-track {
                  animation-play-state: paused;
                }

                #our-work-section .scroll-card {
                  width: calc(25% - 20px);
                  flex-shrink: 0;
                  position: relative;
                }

                #our-work-section .scroll-card img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  border-radius: 26px;
                  transition: transform 0.4s ease, box-shadow 0.4s ease, border-radius 0.4s ease;
                }

                #our-work-section .scroll-card:hover img {
                  transform: scale(1.08);
                  box-shadow: 0px 22px 55px rgba(0, 0, 0, 0.28);
                  border-radius: 26px;
                }

                #our-work-section .scroll-card .label {
                  font-size: 26px;
                  font-weight: 600;
                  color: white;
                  position: absolute;
                  top: 20px;
                  left: 20px;
                  z-index: 2;
                }
              `}</style>

              <div className="scroll-track">
                {[
                  { labelItalic: 'Ad', labelRest: 'Creative', img: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg' },
                  { labelItalic: 'Social Media', labelRest: 'Creative', img: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg' },
                  { labelItalic: 'Trend', labelRest: 'Analyzer', img: 'https://images.pexels.com/photos/6802046/pexels-photo-6802046.jpeg' },
                  { labelItalic: 'Reddit', labelRest: 'Insights', img: 'https://images.pexels.com/photos/5711950/pexels-photo-5711950.jpeg' },
                  { labelItalic: 'AI', labelRest: 'Creativity', img: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg' },
                ]
                  .concat([
                    { labelItalic: 'Ad', labelRest: 'Creative', img: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg' },
                    { labelItalic: 'Social Media', labelRest: 'Creative', img: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg' },
                    { labelItalic: 'Trend', labelRest: 'Analyzer', img: 'https://images.pexels.com/photos/6802046/pexels-photo-6802046.jpeg' },
                    { labelItalic: 'Reddit', labelRest: 'Insights', img: 'https://images.pexels.com/photos/5711950/pexels-photo-5711950.jpeg' },
                    { labelItalic: 'AI', labelRest: 'Creativity', img: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg' },
                  ])
                  .concat([
                    { labelItalic: 'Ad', labelRest: 'Creative', img: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg' },
                    { labelItalic: 'Social Media', labelRest: 'Creative', img: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg' },
                    { labelItalic: 'Trend', labelRest: 'Analyzer', img: 'https://images.pexels.com/photos/6802046/pexels-photo-6802046.jpeg' },
                    { labelItalic: 'Reddit', labelRest: 'Insights', img: 'https://images.pexels.com/photos/5711950/pexels-photo-5711950.jpeg' },
                    { labelItalic: 'AI', labelRest: 'Creativity', img: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg' },
                  ])
                  .map((card, idx) => (
                    <div
                      key={idx}
                      className="scroll-card h-[600px]"
                    >
                      <div className="label font-['Playfair_Display',Georgia,serif] italic">
                        {card.labelItalic} <span className="not-italic font-semibold">{card.labelRest}</span>
                      </div>

                      <img
                        src={card.img}
                        alt={`${card.labelItalic} ${card.labelRest}`}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Feature text blocks below cards */}
          <div className="mx-auto mt-24 max-w-7xl px-4 md:px-8 pb-16">
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-20">
              <div className="flex flex-col gap-3 text-sm text-[#111827]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#c7d2fe] to-[#e0ecff] text-[18px] font-semibold text-[#1f2937]">
                  CS
                </div>
                <h4 className="text-[1.05rem] font-semibold text-[#111827]">Connect Social Platforms</h4>
                <p className="mt-1 text-[0.9rem] text-[#4b5563]">
                  One-tap connect for Instagram, YouTube, and X with secure read-only analytics.
                </p>
              </div>

              <div className="flex flex-col gap-3 text-sm text-[#111827]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#bbf7d0] to-[#e0f7f2] text-[18px] font-semibold text-[#1f2937]">
                  SG
                </div>
                <h4 className="text-[1.05rem] font-semibold text-[#111827]">Smart Guidance</h4>
                <p className="mt-1 text-[0.9rem] text-[#4b5563]">
                  Easy-to-understand suggestions that tell creators exactly what to do next.
                </p>
              </div>

              <div className="flex flex-col gap-3 text-sm text-[#111827]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#facc15] to-[#fde68a] text-[18px] font-semibold text-[#1f2937]">
                  TE
                </div>
                <h4 className="text-[1.05rem] font-semibold text-[#111827]">Trend Engine</h4>
                <p className="mt-1 text-[0.9rem] text-[#4b5563]">
                  Detects reels and sounds gaining momentum before they go viral.
                </p>
              </div>
            </div>
            <p className="mt-20 text-center text-[0.75rem] tracking-[0.18em] uppercase text-[#9ca3af]">
              * Read-only connections — your content is never posted or edited by the platform.
            </p>
            <div className="mt-6 h-px w-full border-t border-[#e5e7eb]" />
          </div>
        </section>
      </div>
    </section>
  );
};

export default OurWorkSection;
