import Spline from '@splinetool/react-spline';
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <main className="relative w-full h-screen">
      <Spline
        scene="https://prod.spline.design/m-O1Y9yStbUYE3Vp/scene.splinecode" 
      />
      
      {/* Logo - Top Left */}
      <div className="absolute top-8 left-8 z-10">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-black">
            SocialIntel
          </span>
        </div>
      </div>
      
      {/* Get Started Button - Top Right */}
      <div className="absolute top-8 right-8 z-10">
        <Button 
          variant="default"
          className="px-6 py-2 bg-white text-black hover:bg-gray-100 font-semibold rounded-lg transition-all duration-300 hover:scale-105"
        >
          Get Started
        </Button>
      </div>
      
      {/* Text Content - Bottom Left */}
      <div className="absolute bottom-8 left-0 p-6 md:p-8 lg:p-12 max-w-2xl z-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight transform translate-x-[-100px] opacity-0 animate-[slideInLeft_1s_ease-out_0.3s_forwards]">
          The Next Gen<br />
          AI Workforce
        </h1>
        
        <p className="text-base md:text-lg text-gray-300 leading-relaxed transform translate-x-[-80px] opacity-0 animate-[slideInLeft_1s_ease-out_0.8s_forwards]">
          Autonomous AI Workers designed for internal<br />
          operations teams - IT, HR, Procurement, Legal<br />
          and beyond.
        </p>
      </div>
      
      {/* Optional gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />
    </main>
  );
}
