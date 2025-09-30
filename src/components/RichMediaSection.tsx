import React from 'react';

const RichMediaSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <style jsx>{`
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
                transform: translateY(0px) rotate(0deg);
              }
              50% {
                transform: translateY(-10px) rotate(2deg);
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
          {/* Media Card Visual */}
          <div className="relative animate-fadeInLeft">
            <div className="bg-white rounded-2xl p-8 shadow-lg relative overflow-hidden hover-lift">
              {/* Main landscape card */}
              <div className="relative mb-8 animate-slideInUp" style={{animationDelay: '0.2s'}}>
                <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-xl p-6 h-64 relative overflow-hidden transition-all duration-300 hover:scale-105">
                  {/* Mountain silhouettes */}
                  <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 400 120" className="w-full h-24 opacity-80">
                      <path d="M0,120 L0,80 L50,40 L100,60 L150,20 L200,50 L250,30 L300,70 L350,40 L400,80 L400,120 Z" 
                            fill="rgba(255,255,255,0.2)"/>
                      <path d="M0,120 L0,90 L60,60 L120,80 L180,40 L240,70 L300,50 L360,90 L400,70 L400,120 Z" 
                            fill="rgba(255,255,255,0.1)"/>
                    </svg>
                  </div>
                  {/* Trees */}
                  <div className="absolute bottom-4 left-8">
                    <div className="flex space-x-1">
                      <div className="w-1 h-8 bg-green-800 opacity-60"></div>
                      <div className="w-1 h-6 bg-green-800 opacity-60"></div>
                      <div className="w-1 h-10 bg-green-800 opacity-60"></div>
                      <div className="w-1 h-7 bg-green-800 opacity-60"></div>
                    </div>
                  </div>
                  {/* Plus button */}
                  <div className="absolute bottom-4 right-4 bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center animate-float hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
                    <svg className="w-6 h-6 text-white transition-transform duration-300 hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Food rating card */}
              <div className="absolute top-4 left-4 bg-white rounded-xl p-4 shadow-lg w-48 animate-slideInUp hover-lift" style={{animationDelay: '0.4s'}}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg overflow-hidden">
                    {/* Food bowl image */}
                    <div className="w-full h-full bg-gradient-to-br from-amber-200 to-orange-300 relative">
                      {/* Bowl */}
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-orange-600 rounded-b-full"></div>
                      {/* Food items */}
                      <div className="absolute top-2 left-2 w-2 h-2 bg-green-600 rounded-full"></div>
                      <div className="absolute top-3 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                      <div className="absolute top-1 right-3 w-1 h-1 bg-yellow-600 rounded-full"></div>
                      <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                      <div className="absolute bottom-4 right-2.5 w-1 h-1 bg-orange-700 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-800 rounded-full mb-2 transition-all duration-300 hover:bg-gray-700"></div>
                    <div className="flex space-x-1">
                      <div className="w-4 h-4 text-yellow-400 transition-transform duration-200 hover:scale-110">★</div>
                      <div className="w-4 h-4 text-yellow-400 transition-transform duration-200 hover:scale-110" style={{animationDelay: '0.1s'}}>★</div>
                      <div className="w-4 h-4 text-yellow-400 transition-transform duration-200 hover:scale-110" style={{animationDelay: '0.2s'}}>★</div>
                      <div className="w-4 h-4 text-gray-300 transition-all duration-200 hover:text-yellow-400 hover:scale-110" style={{animationDelay: '0.3s'}}>★</div>
                      <div className="w-4 h-4 text-gray-300 transition-all duration-200 hover:text-yellow-400 hover:scale-110" style={{animationDelay: '0.4s'}}>★</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instagram-like player */}
              <div className="flex items-center space-x-4 mt-4 animate-slideInUp" style={{animationDelay: '0.6s'}}>
                <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all duration-300 hover:scale-110 cursor-pointer">
                  <svg className="w-6 h-6 text-white transition-transform duration-300 hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
                    <svg className="w-4 h-4 text-white transition-transform duration-300 hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <div className="flex-1 h-2 bg-gray-300 rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-gray-800 rounded-full transition-all duration-500 hover:w-2/5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-8 animate-fadeInRight">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-8 leading-tight transition-colors duration-300 hover:text-gray-700">
                Rich media & dynamic cards.
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed animate-slideInUp" style={{animationDelay: '0.3s'}}>
                Modern publishing requires more than just words. 
                Expand your story with image galleries, gifs, video, 
                audio, products, info boxes, accordion toggles, 
                downloadable files, bookmarks, and so much more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RichMediaSection;
