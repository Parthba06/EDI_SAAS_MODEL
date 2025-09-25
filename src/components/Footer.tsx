import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          {/* Left Side - Copyright */}
          <div className="text-gray-500 text-xs mb-4 lg:mb-0 font-medium tracking-wide">
            © 2025 AI.WORK INC. LINKEDIN MEDIUM
          </div>

          {/* Right Side - Navigation Links */}
          <div className="flex flex-wrap gap-8 text-xs text-gray-500 font-medium tracking-wide">
            <a href="#" className="hover:text-gray-300 transition-colors duration-200">
              TERMS OF USE
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors duration-200">
              PRIVACY POLICY
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors duration-200">
              SUPPORT
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors duration-200">
              TRUST CENTER
            </a>
          </div>
        </div>

        {/* Large ai.work Branding */}
        <div className="relative flex items-center justify-center pt-16 pb-8">
          {/* Background circle - positioned at top left */}
          <div className="absolute top-8 left-1/4 w-16 h-16 bg-gray-700 rounded-full"></div>
          
          {/* Main ai.work text */}
          <div className="text-gray-700 font-black text-[8rem] md:text-[12rem] lg:text-[16rem] xl:text-[20rem] leading-none select-none tracking-tight">
            ai.work
          </div>
          
          {/* Vertical gray bar on right side */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-32 bg-gray-600"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;