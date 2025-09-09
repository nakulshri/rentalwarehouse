import React, { useEffect, useRef, useState } from 'react';
import { Award, DollarSign, Clock, Package } from 'lucide-react';

const WhyChooseUs = () => {
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

  const features = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality Products",
      description: "Premium materials and meticulous attention to detail",
      delay: "0ms",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Affordable Pricing",
      description: "Competitive rates without compromising on excellence",
      delay: "200ms",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Timely Delivery",
      description: "Reliable scheduling and punctual service every time",
      delay: "400ms",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Wide Variety",
      description: "Extensive inventory to meet all your event needs",
      delay: "600ms",
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section id="why-choose-us" ref={sectionRef} className="py-20 bg-classywhite">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-classygray mb-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Why Choose Us
          </h2>
          <p className={`text-xl text-classylavender max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Excellence in every detail, reliability in every service
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-classywhite p-8 rounded shadow-none border border-classygray ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: isVisible ? feature.delay : '0ms'
              }}
            >
              <div className="text-center">
                <div className={`mb-6 w-16 h-16 mx-auto rounded bg-classylavender flex items-center justify-center text-classywhite group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold text-classyblack mb-4 group-hover:text-classyblack transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-classyblack leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Animated Border */}
              <div className={`absolute inset-0 rounded bg-classylavender opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`}></div>
              <div className="absolute inset-0 rounded border-2 border-transparent group-hover:border-classygray transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;