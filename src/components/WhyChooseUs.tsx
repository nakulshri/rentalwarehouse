import React, { useEffect, useRef, useState } from 'react';
import { Award, DollarSign, Clock, Package, Shield, Heart, Zap, Users } from 'lucide-react';

const WhyChooseUs = () => {
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

  const features = [
    {
      icon: <Award className="w-10 h-10" />,
      title: "Premium Quality",
      description: "Only the finest materials and meticulous attention to detail in every piece we offer",
      delay: "0ms",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      stats: "100% Quality Tested"
    },
    {
      icon: <DollarSign className="w-10 h-10" />,
      title: "Competitive Pricing",
      description: "Fair, transparent pricing that delivers exceptional value without compromising on excellence",
      delay: "200ms",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      stats: "Best Value Guaranteed"
    },
    {
      icon: <Clock className="w-10 h-10" />,
      title: "Reliable Service",
      description: "Punctual delivery, professional setup, and timely pickup for every event",
      delay: "400ms",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      stats: "99% On-Time Delivery"
    },
    {
      icon: <Package className="w-10 h-10" />,
      title: "Extensive Inventory",
      description: "Comprehensive collection covering all your event needs from intimate gatherings to grand celebrations",
      delay: "600ms",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      stats: "500+ Items Available"
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Fully Insured",
      description: "Complete peace of mind with comprehensive insurance coverage for all rentals",
      delay: "800ms",
      gradient: "from-indigo-500 to-blue-500",
      bgGradient: "from-indigo-50 to-blue-50",
      stats: "100% Protected"
    },
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Personal Touch",
      description: "Dedicated support team that cares about making your event truly special",
      delay: "1000ms",
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50",
      stats: "Personal Service"
    }
  ];

  return (
    <section id="why-choose-us" ref={sectionRef} className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23667eea' fill-opacity='0.1'%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20 animate-float"
            style={{
              left: `${15 + i * 12}%`,
              top: `${20 + i * 8}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${6 + i * 0.3}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-20">
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-sm font-semibold uppercase tracking-wider mb-6 shadow-lg">
              <Zap className="w-4 h-4 mr-2" />
              Why Choose Us
            </span>
          </div>
          
          <h2 className={`text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Excellence in Every
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Detail
            </span>
          </h2>
          
          <p className={`text-xl text-gray-600 max-w-4xl mx-auto font-light transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            We're committed to delivering exceptional service and premium quality that makes your event truly memorable
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ 
                transitionDelay: isVisible ? feature.delay : '0ms'
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`relative h-full bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl border border-gray-100 transition-all duration-500 ${
                hoveredCard === index ? 'scale-105 -translate-y-2' : ''
              }`}>
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
                
                {/* Animated Border */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                <div className="relative z-10 text-center h-full flex flex-col">
                  {/* Icon */}
                  <div className={`mb-6 w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {feature.icon}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                    {feature.description}
                  </p>

                  {/* Stats */}
                  <div className="mt-auto">
                    <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${feature.gradient} text-white text-sm font-semibold rounded-full`}>
                      {feature.stats}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-1200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Create Something Amazing?
            </h3>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Let us help you bring your vision to life with our premium rental equipment and exceptional service
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Get Started Today
              </button>
              <button 
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border-2 border-white text-white rounded-2xl font-bold text-lg hover:bg-white hover:text-indigo-600 transition-all duration-300 transform hover:scale-105"
              >
                View Our Work
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;