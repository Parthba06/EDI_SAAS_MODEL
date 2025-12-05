import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, ArrowDown } from "lucide-react";
import ImageTrail from "./ImageTrail";
import logo from "@/assets/logo-removebg-preview.png";

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

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
    <main className="relative w-full min-h-screen lg:h-screen overflow-hidden bg-[#F4F4F4] text-black border-b border-black/10">
      {/* ImageTrail Effect */}
      <div className="absolute inset-0 z-20">
        <ImageTrail
          items={[
            'https://picsum.photos/id/287/300/300',
            'https://picsum.photos/id/1001/300/300',
            'https://picsum.photos/id/1025/300/300',
            'https://picsum.photos/id/1026/300/300',
            'https://picsum.photos/id/1027/300/300',
            'https://picsum.photos/id/1028/300/300',
            'https://picsum.photos/id/1029/300/300',
            'https://picsum.photos/id/1030/300/300',
            'https://picsum.photos/id/1031/300/300',
            'https://picsum.photos/id/1032/300/300',
            'https://picsum.photos/id/1033/300/300',
            'https://picsum.photos/id/1035/300/300'
          ]}
          variant={1}
        />
      </div>

      {/* Right flower/leaf decorative SVG */}
      <svg
        className="pointer-events-none absolute -right-20 bottom-0 h-[130%] w-auto opacity-20 grayscale z-10"
        viewBox="0 0 1000 1400"
        aria-hidden="true"
      >
        <g fill="#d1d5db" stroke="#cfcfcf" strokeWidth="2">
          <path d="M920 320C780 420 640 580 580 780c-60 200-20 460-20 460s-160-170-190-340c-30-170 60-320 190-440 130-120 300-210 440-240-30 60-80 100-80 100z" />
          <path d="M640 960c70-70 240-140 360-200 120-60 220-160 220-160s-80 140-160 220c-100 100-240 160-360 190-130 30-240 30-240 30s140-30 180-80z" />
        </g>
      </svg>

      {/* Logo - Top Left */}
      <div className="absolute top-6 md:top-8 left-6 md:left-8 z-50">
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="FlowFund logo"
            className="h-8 w-auto md:h-9 object-contain drop-shadow-[0_4px_12px_rgba(15,23,42,0.45)]"
          />
        </div>
      </div>

      {/* Get Started Button - Top Right */}
      <div className="absolute top-6 md:top-8 right-6 md:right-8 z-50">
        <Button
          variant="default"
          onClick={handleGetStarted}
          className="px-4 md:px-6 py-2 bg-white text-black hover:bg-gray-100 font-semibold rounded-lg transition-all duration-300 hover:scale-105 text-sm md:text-base"
        >
          Get Started
        </Button>
      </div>

      {/* Text Content */}
      <div className="relative pt-32 md:pt-36 lg:pt-40 pb-24 md:pb-28 lg:pb-32 mx-auto max-w-7xl px-4 md:px-8 z-50 pointer-events-none">
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
        <div className="mt-6 flex items-center gap-2 text-base md:text-lg text-black font-hero-sans font-semibold pointer-events-auto">
          <a href="#" className="underline-offset-4 hover:underline pointer-events-auto">Discover more</a>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-green-300">
            <ArrowDown className="h-3 w-3 text-black" />
          </span>
        </div>
      </div>
    </main>
  );
}
