import React, { useEffect, useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Gradient */}
     <div className="absolute inset-0 bg-white">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.6),transparent_60%)]"></div>
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(240,240,240,0.4),transparent_50%)]"></div>
</div>





      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
            }}
          />
        ))}
      </div>

      {/* Parallax Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{ 
          transform: `translateY(${scrollY * 0.3}px)`,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className="space-y-8">
          {/* Main Headline */}
          <div className="animate-fade-in-up space-y-6">
            <h1 className="text-5xl md:text-8xl font-black text-gray-900 leading-none tracking-tight">
              <span className="block text-[#63585E]">Elevate Your</span>
              <span className="block bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                Events.
              </span>
            </h1>
            
            <div className="flex items-center justify-center space-x-4 text-lg md:text-xl text-gray-600 font-medium">
              <span className="px-4 py-2   ">Crockery</span>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span className="px-4 py-2 ">Lighting</span>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span className="px-4 py-2 ">Decor</span>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span className="px-4 py-2 ">Stages</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <button 
              onClick={() => scrollToSection('services')}
              className="group relative px-10 py-5 bg-gray-900 text-white rounded-full font-bold text-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-bounce-subtle"
            >
              <span className="relative z-10">Explore Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
            </button>
            
            <button 
              onClick={() => scrollToSection('gallery')}
              className="group px-10 py-5 border-2 border-gray-300 text-gray-700 rounded-full font-bold text-lg hover:border-gray-900 hover:text-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-xl backdrop-blur-sm bg-white/50"
            >
              <span className="group-hover:tracking-wide transition-all duration-300">See Our Work</span>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-30 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
    </section>
  );
};

export default Hero;