import React from 'react';
import { Play, ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/concert_stage.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Main Logo/Title */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-4 tracking-wider">
            LINKIN
          </h1>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-red-500 mb-6 tracking-wider">
            PARK
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          From Zero to worldwide phenomenon. Experience the evolution of rock, metal, and electronic fusion.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
            <Play size={20} />
            <span>Listen Now</span>
          </button>
          
          <button 
            onClick={scrollToAbout}
            className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Explore Journey
          </button>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-zinc-800">
            <div className="text-3xl font-bold text-red-500 mb-2">100M+</div>
            <div className="text-gray-300">Records Sold</div>
          </div>
          
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-zinc-800">
            <div className="text-3xl font-bold text-red-500 mb-2">2024</div>
            <div className="text-gray-300">From Zero Album</div>
          </div>
          
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-zinc-800">
            <div className="text-3xl font-bold text-red-500 mb-2">World</div>
            <div className="text-gray-300">Tour Active</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce hover:text-red-500 transition-colors"
      >
        <ArrowDown size={32} />
      </button>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-2 h-20 bg-red-500 transform rotate-45 opacity-50"></div>
      <div className="absolute bottom-40 right-10 w-2 h-20 bg-red-500 transform -rotate-45 opacity-50"></div>
      <div className="absolute top-1/2 left-0 w-1 h-40 bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-30"></div>
      <div className="absolute top-1/2 right-0 w-1 h-40 bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-30"></div>
    </div>
  );
};

export default Hero;
