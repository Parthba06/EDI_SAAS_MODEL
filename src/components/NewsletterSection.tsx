import React from 'react';

const NewsletterSection: React.FC = () => {
  return (
    <section className="py-24 px-8" style={{ backgroundColor: '#EAEAEA' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <style>{`
            @keyframes fadeInLeft {
              from {
                opacity: 0;
                transform: translateX(-30px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
            @keyframes fadeInRight {
              from {
                opacity: 0;
                transform: translateX(30px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
            @keyframes slideInUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes float {
              0%, 100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-8px);
              }
            }
            .animate-fadeInLeft {
              animation: fadeInLeft 0.8s ease-out forwards;
            }
            .animate-fadeInRight {
              animation: fadeInRight 0.8s ease-out forwards;
            }
            .animate-slideInUp {
              animation: slideInUp 0.6s ease-out forwards;
            }
            .animate-slideInUp[data-animation-delay="0.2s"] {
              animation-delay: 0.2s;
            }
            .animate-slideInUp[data-animation-delay="0.3s"] {
              animation-delay: 0.3s;
            }
            .animate-slideInUp[data-animation-delay="0.4s"] {
              animation-delay: 0.4s;
            }
            .animate-float[data-animation-delay="1s"] {
              animation-delay: 1s;
            }
            .animate-float {
              animation: float 3s ease-in-out infinite;
            }
            .hover-lift {
              transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .hover-lift:hover {
              transform: translateY(-5px);
              box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            }
          `}</style>
          {/* Text Content */}
          <div className="space-y-8 animate-fadeInLeft">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-8 leading-tight transition-colors duration-300 hover:text-gray-700">
                Newsletters built-in.
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed animate-slideInUp" data-animation-delay="0.3s">
                Deliver posts by email newsletter to your audience, so they'll be in 
                the loop whenever something new goes live. Segment your audience 
                and send multiple different newsletters based on preference.
              </p>
            </div>
          </div>

          {/* Newsletter Interface Visual */}
          <div className="relative animate-fadeInRight">
            <div className="space-y-6">
              {/* Top Newsletter Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg relative hover-lift animate-slideInUp" data-animation-delay="0.2s">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-float"></div>
                </div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-20 h-14 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                    {/* Mountain silhouette in small preview */}
                    <div className="relative h-full">
                      <div className="absolute bottom-0 left-0 right-0">
                        <svg viewBox="0 0 100 30" className="w-full h-4 opacity-80">
                          <path d="M0,30 L0,20 L15,10 L25,15 L40,5 L50,12 L65,8 L75,18 L85,10 L100,20 L100,30 Z" 
                                fill="rgba(255,255,255,0.3)"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="h-3 bg-gray-800 rounded-full mb-2 w-3/4 transition-all duration-300 hover:bg-gray-700"></div>
                    <div className="h-2 bg-gray-300 rounded-full w-1/2 transition-all duration-300 hover:bg-gray-400"></div>
                  </div>
                </div>
              </div>

              {/* Bottom Newsletter Interface */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover-lift animate-slideInUp relative" data-animation-delay="0.4s">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-3 bg-gray-300 rounded-full w-32 transition-all duration-300 hover:bg-gray-400"></div>
                    <div className="w-4 h-4 text-gray-400 transition-transform duration-300 hover:scale-110">
                      <svg fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 10l5 5 5-5z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-300 hover:scale-110 cursor-pointer animate-float" data-animation-delay="1s">
                    <svg className="w-6 h-6 text-white transition-transform duration-300 hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                </div>
                
                {/* Newsletter Title Placeholder */}
                <div className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50 transition-all duration-300 hover:border-gray-300 hover:bg-white">
                  <div className="text-lg text-gray-500 font-medium">The Daily Update</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
