import React from 'react';

const RampTimelineSection = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#EAEAEA' }}>
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-gray-500 text-base mb-8 font-normal opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
            New software shouldn't take a year to implement.
          </p>
          <h2 className="text-5xl md:text-6xl font-medium text-black leading-tight mb-10 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
            Here's what you can get done with<br />
            Ramp in just 30 days.
          </h2>
          <div className="flex items-center justify-center space-x-2 text-gray-500 text-base opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]">
            <span>Switch to Ramp</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative mb-20 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards]">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300 transform -translate-y-1/2"></div>
          
          {/* Timeline Points */}
          <div className="relative flex justify-between items-center">
            {/* Today */}
            <div className="flex flex-col items-center">
              <div className="bg-white border-2 border-gray-300 rounded-full w-3 h-3 mb-6"></div>
              <span className="bg-white px-5 py-2.5 rounded-full border border-gray-200 font-normal text-gray-800 text-sm shadow-sm">
                Today
              </span>
            </div>
            
            {/* Day 5 */}
            <div className="flex flex-col items-center">
              <div className="bg-white border-2 border-gray-300 rounded-full w-3 h-3 mb-6"></div>
              <span className="bg-white px-5 py-2.5 rounded-full border border-gray-200 font-normal text-gray-800 text-sm shadow-sm">
                Day 5
              </span>
            </div>
            
            {/* Day 30 */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-300 rounded-full w-3 h-3 mb-6"></div>
              <span className="bg-white px-5 py-2.5 rounded-full border border-gray-200 font-normal text-gray-800 text-sm shadow-sm">
                Day 30
              </span>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Get Started Card */}
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 opacity-0 animate-[fadeInUp_0.8s_ease-out_1s_forwards] hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-normal text-black mb-6">Get started.</h3>
            <div className="space-y-3.5">
              <div className="flex items-start space-x-3">
                <svg className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600 text-sm leading-relaxed">Connect your ERP in five minutes</span>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600 text-sm leading-relaxed">Upload your policy in two minutes</span>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600 text-sm leading-relaxed">Issue yourself a card in one minute</span>
              </div>
            </div>
          </div>

          {/* Get Comfortable Card */}
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 opacity-0 animate-[fadeInUp_0.8s_ease-out_1.2s_forwards] hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-normal text-black mb-6">Get comfortable.</h3>
            <div className="space-y-3.5">
              <div className="flex items-start space-x-3">
                <svg className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600 text-sm leading-relaxed">Connect to HRIS, email, and 200+ apps</span>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600 text-sm leading-relaxed">Set up approvals and controls</span>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600 text-sm leading-relaxed">Issue cards to employees</span>
              </div>
            </div>
          </div>

          {/* Ask Why Card */}
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 opacity-0 animate-[fadeInUp_0.8s_ease-out_1.4s_forwards] hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-normal text-black mb-6">Ask why you didn't switch years ago.</h3>
            <div className="space-y-3.5">
              <div className="flex items-start space-x-3">
                <svg className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600 text-sm leading-relaxed">100% of business spend moved to Ramp</span>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600 text-sm leading-relaxed">Intake-to-pay 8.5x more efficient</span>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600 text-sm leading-relaxed">Books close 75% faster</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RampTimelineSection;
