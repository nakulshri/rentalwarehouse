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
      description: 'A breathtaking wedding celebration featuring premium decor, crystal chandeliers, and sophisticated table settings.',
      category: 'Wedding',
      year: '2024'
    },
    {
      image: 'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: "The Sihota's",
      subtitle: 'Anniversary Gala',
      description: 'A sophisticated anniversary celebration with custom lighting design and elegant floral arrangements.',
      category: 'Anniversary',
      year: '2024'
    },
    {
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: 'Corporate Excellence',
      subtitle: 'Annual Business Gala',
      description: 'Professional staging and lighting for a prestigious corporate event with modern design elements.',
      category: 'Corporate',
      year: '2024'
    },
    {
      image: 'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      title: 'Garden Elegance',
      subtitle: 'Outdoor Celebration',
      description: 'An enchanting outdoor event with premium crockery and sophisticated decor.',
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
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, events.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section id="gallery" ref={sectionRef} className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium uppercase tracking-wide mb-4">
              Our Work
            </span>
          </div>
          
          <h2 className={`text-2xl font-light text-gray-900 mb-4 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Recent Events
          </h2>
          
          <p className={`text-base text-gray-600 max-w-xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            See how we've transformed special occasions into unforgettable experiences
          </p>
        </div>

        <div className={`relative transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Main Image Display */}
          <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-80 md:h-96">
              <img
                src={events[currentSlide].image}
                alt={events[currentSlide].title}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              
              {/* Content */}
              <div className="absolute inset-0 flex items-end">
                <div className="p-6 text-white">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs font-medium">
                      {events[currentSlide].category}
                    </span>
                    <span className="text-xs opacity-90">
                      {events[currentSlide].year}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-medium mb-2">
                    {events[currentSlide].title}
                  </h3>
                  <p className="text-sm opacity-90 mb-3">
                    {events[currentSlide].subtitle}
                  </p>
                  <p className="text-xs opacity-80 max-w-lg">
                    {events[currentSlide].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-700 hover:bg-opacity-100 transition-all duration-200 shadow-md"
            >
              <ChevronLeft size={16} />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-700 hover:bg-opacity-100 transition-all duration-200 shadow-md"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center space-x-3 mt-6">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentSlide 
                    ? 'bg-gray-900' 
                    : 'bg-gray-300 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          {/* Auto-play Toggle */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center space-x-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 text-xs"
            >
              <Play size={14} className={isAutoPlaying ? 'text-green-600' : 'text-gray-400'} />
              <span className="font-medium">
                {isAutoPlaying ? 'Auto-playing' : 'Paused'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;