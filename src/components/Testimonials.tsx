import { useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Award } from 'lucide-react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      name: "Sarah Johnson",
      event: "Wedding Reception",
      rating: 5,
      quote: "The Rental Warehouse transformed our wedding into a fairy tale. Their attention to detail and premium quality equipment made our special day absolutely perfect. The team was professional, punctual, and exceeded all our expectations.",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
      location: "Fresno, CA"
    },
    {
      name: "Michael Chen",
      event: "Corporate Event",
      rating: 5,
      quote: "Professional service from start to finish. The lighting setup was spectacular and really elevated our company's annual gala. Highly recommended! The team's expertise and attention to detail made our event unforgettable.",
      image: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
      location: "Fowler, CA"
    },
    {
      name: "Emily Rodriguez",
      event: "Birthday Celebration",
      rating: 5,
      quote: "Amazing customer service and beautiful decor pieces. They helped bring my vision to life and made the planning process so smooth and enjoyable. The quality of their equipment is outstanding.",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
      location: "Fresno, CA"
    },
    {
      name: "David Thompson",
      event: "Anniversary Party",
      rating: 5,
      quote: "Outstanding quality and timely delivery. The crockery was elegant and the stage setup was exactly what we envisioned. Thank you for making our anniversary memorable! The team's professionalism was exceptional.",
      image: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
      location: "Fowler, CA"
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
    }, 8000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" ref={sectionRef} className="py-12 sm:py-16 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23667eea' fill-opacity='0.1'%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-20">
          <div className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full text-xs font-semibold uppercase tracking-wider mb-4 shadow">
              <Award className="w-4 h-4 mr-2" />
              Client Testimonials
            </span>
          </div>
          
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4 leading-tight transition-all duration-700 delay-150 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            What Our Clients Say About Us
          </h2>
          
          <p className={`text-sm sm:text-base text-gray-600 max-w-3xl mx-auto font-light transition-all duration-700 delay-250 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            Don't just take our word for it - hear from the satisfied clients who have experienced our premium service
          </p>
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* Main Testimonial Card */}
          <div className="bg-white rounded-2xl p-6 md:p-10 shadow-lg border border-gray-100 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-100 to-emerald-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>

            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 ${
                  index === currentTestimonial 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 absolute inset-0 translate-x-8'
                }`}
              >
                <div className="relative z-10">
                  {/* Quote Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                      <Quote className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current mx-0.5" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed text-center font-light italic">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Client Info */}
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {testimonial.event}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Navigation */}
          <div className="flex items-center justify-between mt-12">
            <button
              onClick={prevTestimonial}
              className="p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-gray-200 group"
            >
              <ChevronLeft size={28} className="text-gray-600 group-hover:text-indigo-600 transition-colors duration-300" />
            </button>

            <div className="flex space-x-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-gray-200 group"
            >
              <ChevronRight size={28} className="text-gray-600 group-hover:text-indigo-600 transition-colors duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;