import React, { useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      name: "Sarah Johnson",
      event: "Wedding Reception",
      rating: 5,
      quote: "The Rental Warehouse transformed our wedding into a fairy tale. Their attention to detail and premium quality equipment made our special day absolutely perfect."
    },
    {
      name: "Michael Chen",
      event: "Corporate Event",
      rating: 5,
      quote: "Professional service from start to finish. The lighting setup was spectacular and really elevated our company's annual gala. Highly recommended!"
    },
    {
      name: "Emily Rodriguez",
      event: "Birthday Celebration",
      rating: 5,
      quote: "Amazing customer service and beautiful decor pieces. They helped bring my vision to life and made the planning process so smooth and enjoyable."
    },
    {
      name: "David Thompson",
      event: "Anniversary Party",
      rating: 5,
      quote: "Outstanding quality and timely delivery. The crockery was elegant and the stage setup was exactly what we envisioned. Thank you for making our anniversary memorable!"
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
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 bg-classywhite">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-classygray mb-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Client Testimonials
          </h2>
          <p className={`text-xl text-classylavender max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            What our satisfied clients say about us
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="bg-classywhite rounded p-8 md:p-12 shadow-none border border-classygray">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 ${
                  index === currentTestimonial 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 absolute inset-0 translate-x-4'
                }`}
              >
                <div className="text-center">
                  {/* Stars */}
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed italic">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Client Info */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 mb-1">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600">
                      {testimonial.event}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-gray-200"
            >
              <ChevronLeft size={24} className="text-gray-600" />
            </button>

            <div className="flex space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-gray-800 scale-125' 
                      : 'bg-gray-400 hover:bg-gray-600'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-gray-200"
            >
              <ChevronRight size={24} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;