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
    <section id="our-work-section" className="w-full bg-[#f5f8f1] text-black py-[120px]">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="w-full text-center">
          <p className="mb-3 text-[0.75rem] font-medium tracking-[0.15em] uppercase text-[#4a4a4a]">
            OUR WORK
          </p>
          <h2 className="mb-3 text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-[#0c1d17]">
            From high tech to high fashion
          </h2>
          <p className="mb-8 font-['Playfair_Display',Georgia,serif] italic text-[clamp(1.8rem,4vw,2.8rem)] text-[#0c1d17]">
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
          <div className="mx-auto max-w-[1200px] px-5">
            <p className="mb-2 text-[0.75rem] font-medium tracking-[0.18em] uppercase text-[#4b4f4a]">
              EASY & HASSLE-FREE
            </p>
            <h3 className="text-[clamp(2.5rem,4.6vw,3.4rem)] leading-[1.18] font-semibold tracking-[-0.02em] text-[#0c1d17]">
              Every type of creative work you&apos;ll <br />
                ever need,
              <span className="font-['Playfair_Display',Georgia,serif] italic font-normal"> and more</span>
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
                  animation: ourWorkScroll 36s linear infinite;
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
                  border-radius: 18px;
                  transition: transform 0.4s ease, box-shadow 0.4s ease, border-radius 0.4s ease;
                }

                #our-work-section .scroll-card:hover img {
                  transform: scale(1.08);
                  box-shadow: 0px 18px 45px rgba(0, 0, 0, 0.28);
                  border-radius: 18px;
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
                  { labelItalic: 'Website', labelRest: 'Design', img: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg' },
                  { labelItalic: 'Social Media', labelRest: 'Creative', img: 'https://images.pexels.com/photos/3977908/pexels-photo-3977908.jpeg' },
                  { labelItalic: 'Email', labelRest: 'Design', img: 'https://images.pexels.com/photos/1181670/pexels-photo-1181670.jpeg' },
                ]
                  .concat([
                    { labelItalic: 'Ad', labelRest: 'Creative', img: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg' },
                    { labelItalic: 'Website', labelRest: 'Design', img: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg' },
                    { labelItalic: 'Social Media', labelRest: 'Creative', img: 'https://images.pexels.com/photos/3977908/pexels-photo-3977908.jpeg' },
                    { labelItalic: 'Email', labelRest: 'Design', img: 'https://images.pexels.com/photos/1181670/pexels-photo-1181670.jpeg' },
                  ])
                  .concat([
                    { labelItalic: 'Ad', labelRest: 'Creative', img: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg' },
                    { labelItalic: 'Website', labelRest: 'Design', img: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg' },
                    { labelItalic: 'Social Media', labelRest: 'Creative', img: 'https://images.pexels.com/photos/3977908/pexels-photo-3977908.jpeg' },
                    { labelItalic: 'Email', labelRest: 'Design', img: 'https://images.pexels.com/photos/1181670/pexels-photo-1181670.jpeg' },
                  ])
                  .map((card, idx) => (
                    <div
                      key={idx}
                      className="scroll-card h-[550px]"
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
        </section>
      </div>
    </section>
  );
};

export default OurWorkSection;
