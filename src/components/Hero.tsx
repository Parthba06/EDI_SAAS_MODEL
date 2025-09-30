import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { BarChart3, ArrowDown } from "lucide-react";

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const nodes = titleRef.current?.querySelectorAll<HTMLElement>(".split-seq");
    const eyebrow = eyebrowRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Eyebrow
            eyebrow?.classList.add("in");
            // Words
            nodes?.forEach((el, idx) => {
              setTimeout(() => el.classList.add("in"), 60 * idx);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative w-full min-h-screen lg:h-screen overflow-visible lg:overflow-hidden bg-neutral-100 bg-[radial-gradient(circle_at_1px_1px,_rgba(0,0,0,0.06)_1px,_transparent_0)] bg-[length:28px_28px]">
      {/* Right flower/leaf decorative SVG */}
      <svg
        className="pointer-events-none absolute -right-20 bottom-0 h-[130%] w-auto opacity-30 grayscale z-10"
        viewBox="0 0 1000 1400"
        aria-hidden="true"
      >
        <g fill="#d1d5db" stroke="#cfcfcf" strokeWidth="2">
          <path d="M920 320C780 420 640 580 580 780c-60 200-20 460-20 460s-160-170-190-340c-30-170 60-320 190-440 130-120 300-210 440-240-30 60-80 100-80 100z" />
          <path d="M640 960c70-70 240-140 360-200 120-60 220-160 220-160s-80 140-160 220c-100 100-240 160-360 190-130 30-240 30-240 30s140-30 180-80z" />
        </g>
      </svg>

      {/* Logo - Top Left */}
      <div className="absolute top-8 left-8 z-30">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-black">
            KAIROZ
          </span>
        </div>
      </div>

      {/* Get Started Button - Top Right */}
      <div className="absolute top-8 right-8 z-30">
        <Button
          variant="default"
          className="px-6 py-2 bg-white text-black hover:bg-gray-100 font-semibold rounded-lg transition-all duration-300 hover:scale-105"
        >
          Get Started
        </Button>
      </div>

      {/* Text Content */}
      <div className="relative mt-24 md:mt-0 md:absolute md:left-0 md:top-28 lg:top-32 p-6 md:p-10 lg:p-16 max-w-[1500px] z-30">
        {/* Agency pill */}
        <div ref={eyebrowRef} className="eyebrow-seq inline-flex items-center gap-2 text-black text-xl md:text-1xl font-hero-sans font-semibold mb-6">
          <span className="inline-block h-2 w-3 bg-emerald-500 rounded-[3px] rotate-45" />
          Social Media Analytics
        </div>

        {/* Mixed-style heading */}
        <h1 ref={titleRef} className="font-hero-sans text-black leading-[0.9] font-bold tracking-tight text-6xl md:text-8xl lg:text-[86px]">
          <span className="split-seq">We</span> <span className="split-seq">build</span> <em className="not-italic">
          <span className="split-seq italic font-hero-serif font-light">high-</span>
          <span className="split-seq italic font-hero-serif font-light">performing</span><br></br> 
            <span className="split-seq">Next-Gen</span>
          </em> <span className="split-seq">AI</span> <span className="split-seq">Analytics</span> <span className="split-seq">for</span><br />
          <span className="split-seq">modern</span> <span className="split-seq">creators</span>
        </h1>

        {/* Subcopy */}
        <p className="mt-24 font-hero-sans text-[#1f2937] text-base leading-[1.45] font-bold max-w-[500px]">
          Track all your platforms in one place.Spot hot niche trends.Get AI-crafted content ideas your audience will obsess over. Skyrocket your creator game.
        </p>

        {/* Discover more CTA */}
        <div className="mt-6 flex items-center gap-2 text-base md:text-lg text-black font-hero-sans font-semibold">
          <a href="#" className="underline-offset-4 hover:underline">Discover more</a>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-green-300">
            <ArrowDown className="h-3 w-3 text-black" />
          </span>
        </div>
      </div>
    </main>
  );
}
