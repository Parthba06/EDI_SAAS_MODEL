"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";

const PostHeroInsights: React.FC = () => {
  useEffect(() => {
    const tlDots = gsap.timeline({ repeat: -1, yoyo: true });
    tlDots
      .to(".phi-icon-dots", {
        y: -3,
        scale: 1.03,
        duration: 1.6,
        ease: "power1.inOut",
      })
      .to(".phi-icon-dots", {
        y: 0,
        scale: 1,
        duration: 1.6,
        ease: "power1.inOut",
      });

    const tlStar = gsap.timeline({ repeat: -1, yoyo: true });
    tlStar
      .to(".phi-icon-star", {
        rotation: 6,
        scale: 1.04,
        duration: 2.4,
        ease: "power1.inOut",
        transformOrigin: "50% 50%",
      })
      .to(".phi-icon-star", {
        rotation: -6,
        scale: 0.98,
        duration: 2.4,
        ease: "power1.inOut",
        transformOrigin: "50% 50%",
      });

    const tlCircle = gsap.timeline({ repeat: -1, yoyo: true });
    tlCircle
      .to(".phi-icon-circle", {
        y: -3,
        scale: 1.05,
        duration: 2,
        ease: "power1.inOut",
      })
      .to(".phi-icon-circle", {
        y: 2,
        scale: 0.97,
        duration: 2,
        ease: "power1.inOut",
      });

    return () => {
      tlDots.kill();
      tlStar.kill();
      tlCircle.kill();
    };
  }, []);

  return (
    <section className="w-full bg-[#f5f5f5] text-black">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16 py-16 md:py-20 lg:py-24">
        <div className="mb-16 md:mb-[4.5rem] lg:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-light tracking-tight mb-4">
            See Clearly. Decide Confidently.
          </h2>
          <p className="max-w-xl md:max-w-2xl text-base leading-relaxed text-black/80">
            Buried answers cost millions. Summation surfaces themfast, reliable, enterprise-grade.
          </p>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="w-full max-w-[1200px] rounded-xl border border-[#e5e5e5] bg-[#fafafa] px-8 md:px-16 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-0 md:gap-x-16">
              <div className="flex flex-col items-start md:items-center md:border-r border-[#e5e5e5] md:pr-8 lg:pr-10">
                <div className="mb-5 flex h-16 items-center justify-start md:justify-center">
              <video
                src="https://framerusercontent.com/assets/r8k9381odeAh4DNFyaujM0wSxSU.mp4"
                loop
                autoPlay
                muted
                playsInline
                preload="auto"
                className="w-16 h-16 rounded-lg object-cover bg-transparent"
              ></video>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-[#1a1a1a] text-left md:text-center">
                  More Strategic Reviews
                </h3>
                <p className="text-base leading-relaxed text-[#444444] max-w-xs text-left md:text-center">
                  Weeks of preparation cut to hours. AI surfaces risks and patterns early so reviews drive action.
                </p>
              </div>

              <div className="flex flex-col items-start md:items-center md:border-r border-[#e5e5e5] md:px-8 lg:px-10 mt-8 md:mt-0">
                <div className="mb-5 flex h-16 items-center justify-start md:justify-center">
              <video
                src="https://framerusercontent.com/assets/KsNQBVTAQlNyF85T6WD67dyOihI.mp4"
                loop
                autoPlay
                muted
                playsInline
                preload="auto"
                className="w-16 h-16 rounded-lg object-cover bg-transparent"
              ></video>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-[#1a1a1a] text-left md:text-center">
                  Decisions You Can Trust
                </h3>
                <p className="text-base leading-relaxed text-[#444444] max-w-xs text-left md:text-center">
                  High-stakes calls demand certainty. Every number ties back to source systems, giving leaders confidence to act.
                </p>
              </div>

              <div className="flex flex-col items-start md:items-center md:pl-8 lg:pl-10 mt-8 md:mt-0">
                <div className="mb-5 flex h-16 items-center justify-start md:justify-center">
              <video
                src="https://framerusercontent.com/assets/cdgTlEeojTdZY77oir3VopVK4Y.mp4"
                loop
                autoPlay
                muted
                playsInline
                preload="auto"
                className="w-16 h-16 rounded-lg object-cover bg-transparent"
              ></video>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-[#1a1a1a] text-left md:text-center">
                  Drive Profitable Growth
                </h3>
                <p className="text-base leading-relaxed text-[#444444] max-w-xs text-left md:text-center">
                  Disparate systems hide value. Summation reveals the performance drivers that unlock growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostHeroInsights;
