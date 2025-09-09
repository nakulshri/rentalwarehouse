import React, { useEffect, useRef, useState } from 'react';
import { Palette, Utensils, Lightbulb, Star as Stage, ArrowRight } from 'lucide-react';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const services = [
    {
      image: "https://images.pexels.com/photos/1444424/pexels-photo-1444424.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      title: "Elegant setups",
      category: "DECOR",
      description: "Transform your space with sophisticated decorative elements and premium furnishings that create unforgettable atmospheres",
      delay: "0ms",
      gradient: "from-rose-500 to-pink-500",
      bgGradient: "from-rose-50 to-pink-50"
    },
    {
      image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      title: "Premium serveware",
      category: "CROCKERY",
      description: "Exquisite tableware and dining essentials for refined culinary experiences that impress every guest",
      delay: "200ms",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50"
    },
    {
      image: "https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      title: "Custom lighting",
      category: "LIGHTING",
      description: "Professional lighting solutions to create the perfect ambiance and atmosphere for any occasion",
      delay: "400ms",
      gradient: "from-amber-500 to-orange-500",
      bgGradient: "from-amber-50 to-orange-50"
    },
    {
      image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      title: "Professional stages",
      category: "STAGES",
      description: "Complete staging solutions for memorable performances and presentations that captivate audiences",
      delay: "600ms",
      gradient: "from-violet-500 to-purple-500",
      bgGradient: "from-violet-50 to-purple-50"
    }
  ];

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" ref={sectionRef} className="py-32 bg-classywhite relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 2 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-20">
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="inline-block px-4 py-2 bg-classylavender text-classywhite rounded text-sm font-semibold uppercase tracking-wider mb-6">
              What We Offer
            </span>
          </div>
          
          <h2 className={`text-5xl md:text-7xl font-black text-classygray mb-6 leading-tight transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Premium rental solutions
          </h2>
          
          <p className={`text-xl md:text-2xl text-classylavender max-w-3xl mx-auto font-light leading-relaxed transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Crafted for exceptional events that leave lasting impressions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ 
                transitionDelay: isVisible ? service.delay : '0ms'
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`relative h-full ${index % 2 === 0 ? 'bg-classylavender' : 'bg-classywhite'} rounded p-8 shadow-none border border-classygray overflow-hidden ${
                hoveredCard === index ? 'scale-105' : ''
              }`}>
                {/* Background Gradient */}
                {/* Removed gradient for a more solid, classy look */}
                {/* Animated Border */}
                <div className="absolute inset-0 rounded bg-classygray opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <div className="absolute inset-[1px] rounded bg-classywhite"></div>
                <div className="relative z-10 text-center h-full flex flex-col">
                  {/* Image */}
                  <div className="mb-6 w-full h-32 mx-auto rounded overflow-hidden group-hover:scale-105 transition-all duration-500 shadow-none">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Category */}
                  <span className="text-xs font-bold text-classygray uppercase tracking-widest mb-3">
                    {service.category}
                  </span>
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-classyblack mb-4 group-hover:text-classygray transition-colors duration-300">
                    {service.title}
                  </h3>
                  {/* Description */}
                  <p className="text-classygray leading-relaxed mb-8 flex-grow">
                    {service.description}
                  </p>
                  {/* CTA Button removed for a cleaner look */}
                </div>
                {/* Floating Elements */}
                {/* Removed for a cleaner look */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;