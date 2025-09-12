import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Utensils, Palette, Sofa, Lightbulb } from 'lucide-react';

const RentalOptions = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  const rentalCategories = [
    {
      id: 1,
      name: "Crockery",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80",
      description: "Elegant plates, cutlery, glassware and dining essentials for sophisticated table settings",
      icon: <Utensils className="w-8 h-8" />,
      gradient: "from-amber-500 to-orange-500",
      bgGradient: "from-amber-50 to-orange-50",
      count: "200+ Items"
    },
    {
      id: 2,
      name: "Decoration",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=80",
      description: "Beautiful decorative items, centerpieces, and accessories to transform any space",
      icon: <Palette className="w-8 h-8" />,
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50",
      count: "150+ Items"
    },
    {
      id: 3,
      name: "Seating",
      image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80",
      description: "Comfortable chairs, sofas, and seating arrangements for all event sizes",
      icon: <Sofa className="w-8 h-8" />,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      count: "100+ Items"
    },
    {
      id: 4,
      name: "Lighting",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=80",
      description: "Professional lighting fixtures, chandeliers, and ambient lighting solutions",
      icon: <Lightbulb className="w-8 h-8" />,
      gradient: "from-yellow-500 to-amber-500",
      bgGradient: "from-yellow-50 to-amber-50",
      count: "80+ Items"
    },
  ];

  return (
    <section ref={sectionRef} className="py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23667eea' fill-opacity='0.1'%3E%3Ccircle cx='60' cy='60' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20 animate-float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${8 + i * 0.5}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-20">
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full text-sm font-semibold uppercase tracking-wider mb-6 shadow-lg">
              <Sparkles className="w-4 h-4 mr-2" />
              Rental Collection
            </span>
          </div>
          
          <h2 className={`text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Browse Our
            <span className="block bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Premium Collection
            </span>
          </h2>
          
          <p className={`text-xl text-gray-600 max-w-4xl mx-auto font-light transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Explore our comprehensive range of rental equipment and furniture, carefully curated to meet all your event needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {rentalCategories.map((category, index) => (
            <div
              key={category.id}
              className={`group cursor-pointer transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${index * 150}ms` : '0ms'
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => navigate(`/rent?category=${encodeURIComponent(category.name.toLowerCase().replace(/ /g, '_'))}`)}
            >
              <div className={`relative h-full bg-white rounded-3xl shadow-xl hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 ${
                hoveredCard === index ? 'scale-105 -translate-y-2' : ''
              }`}>
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-t-3xl aspect-square mb-6">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                  
                  {/* Icon Overlay */}
                  <div className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-r ${category.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                    {category.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-semibold text-gray-500 px-3 py-1 bg-gray-100 rounded-full`}>
                      {category.count}
                    </span>
                    
                    <div className="flex items-center text-indigo-600 font-semibold text-sm group-hover:translate-x-1 transition-transform duration-300">
                      Explore
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Planning?
              </h3>
              <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                Browse our complete collection and find everything you need for your perfect event
              </p>
              <button
                onClick={() => navigate('/rent')}
                className="px-10 py-4 bg-white text-indigo-600 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center mx-auto"
              >
                View All Rental Equipment
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RentalOptions; 