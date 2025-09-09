import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Eye } from 'lucide-react';

const Gallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  const events = [
    {
      image: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: 'Merced',
      subtitle: 'Elegant Wedding Celebration',
      description: 'A breathtaking wedding celebration featuring premium decor, crystal chandeliers, and sophisticated table settings that created an unforgettable romantic atmosphere.',
      category: 'Wedding',
      year: '2024'
    },
    {
      image: 'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: "The Sihota's",
      subtitle: 'Anniversary Gala',
      description: 'A sophisticated anniversary celebration with custom lighting design, premium staging, and elegant floral arrangements that perfectly captured the couples journey.',
      category: 'Anniversary',
      year: '2024'
    },
    {
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: 'Corporate Excellence',
      subtitle: 'Annual Business Gala',
      description: 'Professional staging and lighting for a prestigious corporate event, featuring modern design elements and premium presentation setups.',
      category: 'Corporate',
      year: '2024'
    },
    {
      image: 'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: 'Garden Elegance',
      subtitle: 'Outdoor Celebration',
      description: 'An enchanting outdoor event with premium crockery, ambient lighting, and sophisticated decor that transformed a garden into a magical venue.',
      category: 'Outdoor',
      year: '2024'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % events.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [events.length, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % events.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section id="gallery" ref={sectionRef} className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-20">
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="inline-block px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
              Event Highlights
            </span>
          </div>
          
          <h2 className={`text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Moments of
            <span className="block bg-gradient-to-r from-[#998DA0] to-[#63585E] bg-clip-text text-transparent">
  Excellence
</span>

          </h2>
          
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto font-light transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Discover our recent work and the magic we create for unforgettable celebrations
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Main Gallery */}
          <div className="relative h-[70vh] rounded-3xl overflow-hidden shadow-2xl bg-black">
            {events.map((event, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ${
                  index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
              >
                <div 
                  className="w-full h-full bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${event.image})` }}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-12">
                    <div className="max-w-4xl">
                      {/* Category Badge */}
                      <div className={`inline-flex items-center space-x-2 mb-4 transition-all duration-1000 delay-300 ${
                        index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}>
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
                          {event.category}
                        </span>
                        <span className="text-white/60 text-sm">{event.year}</span>
                      </div>

                      {/* Title */}
                      <h3 className={`text-4xl md:text-6xl font-black text-white mb-28 transition-all duration-1000 delay-500 ${
                        index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}>
                        {event.title}
                      </h3>

                      {/* Subtitle */}
                      <h4 className={`text-xl md:text-2xl text-white/80 font-light mb-5 mt-10 transition-all duration-1000 delay-700 ${
                        index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}>
                        {event.subtitle}
                      </h4>

                      {/* Description */}
                      <p className={`text-white/70 text-lg leading-relaxed max-w-2xl mb-1 transition-all duration-1000 delay-900 ${
                        index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}>
                        {event.description}
                      </p>

                      {/* View Details Button */}
                      
                    </div>
                  </div>

                  {/* Play Button Overlay */}
                  
                </div>
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-8 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-8 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center mt-8 space-x-4">
            {events.map((event, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                  index === currentSlide 
                    ? 'ring-4 ring-white shadow-2xl scale-110' 
                    : 'hover:scale-105 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-black/20 ${
                  index === currentSlide ? 'opacity-0' : 'opacity-100'
                }`}></div>
              </button>
            ))}
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {events.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'w-12 bg-gray-800' 
                    : 'w-3 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;