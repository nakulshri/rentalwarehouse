import { useEffect, useRef, useState } from 'react';
import { Palette, Utensils, Lightbulb, Star as Stage } from 'lucide-react';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
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
      icon: Palette,
      title: "Event Decor",
      description: "Transform your space with elegant decorative elements and premium furnishings"
    },
    {
      icon: Utensils,
      title: "Tableware",
      description: "Exquisite crockery and dining essentials for refined culinary experiences"
    },
    {
      icon: Lightbulb,
      title: "Lighting",
      description: "Professional lighting solutions to create the perfect ambiance"
    },
    {
      icon: Stage,
      title: "Stages & Setup",
      description: "Complete staging solutions for memorable performances and presentations"
    }
  ];

  // CTA removed; scrollToProducts intentionally removed

  return (
    <section id="services" ref={sectionRef} className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium uppercase tracking-wide mb-4">
              What We Offer
            </span>
          </div>
          
          <h2 className={`text-2xl font-light text-gray-900 mb-4 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Premium rental solutions
          </h2>
          
          <p className={`text-base text-gray-600 max-w-xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Everything you need to make your event memorable and elegant
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
              }}
            >
              <div className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-all duration-300 h-full flex flex-col">
                {/* Icon */}
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-200 transition-colors duration-200">
                  <service.icon size={24} className="text-gray-600" />
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-medium text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-200">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed flex-grow">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA removed per design request */}
      </div>
    </section>
  );
};

export default Services;