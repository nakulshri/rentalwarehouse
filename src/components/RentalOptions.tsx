import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RentalOptions = () => {
  const [isVisible, setIsVisible] = useState(false);
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
      description: "Plates, cutlery, glassware and more."
    },
    {
      id: 2,
      name: "Decoration",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=80",
      description: "Decorative items and accessories."
    },
    {
      id: 3,
      name: "Seating",
      image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80",
      description: "Chairs, sofas, and more."
    },
    {
      id: 4,
      name: "Lighting",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=80",
      description: "Lighting fixtures and lamps."
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-800 mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            BROWSE RENTAL COLLECTION
          </h2>
          <p className={`text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Explore our comprehensive range of rental equipment and furniture
          </p>
        </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-4xl mx-auto">
          {rentalCategories.map((category, index) => (
            <div
              key={category.id}
              className={`group cursor-pointer transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
              onClick={() => navigate(`/rent?category=${encodeURIComponent(category.name.toLowerCase().replace(/ /g, '_'))}`)}
            >
              <div className="relative overflow-hidden rounded-lg aspect-square mb-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
              <h3 className="text-center text-lg font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                {category.name}
              </h3>
            </div>
          ))}
        </div>

        <div className={`text-center mt-12 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button
            onClick={() => navigate('/rent')}
            className="px-8 py-4 bg-[#63585E] text-white rounded-full font-semibold hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            View All Rental Equipment
          </button>
        </div>
      </div>
    </section>
  );
};

export default RentalOptions; 