import React, { useEffect, useRef, useState } from 'react';
import { Phone, Instagram, MapPin, Mail, Send } from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [sending, setSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setStatusMessage(null);
    try {
      const res = await fetch('/.netlify/functions/send-contact-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Failed to send message');
      setStatusMessage('Message sent — we\'ll get back to you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      console.error(err);
      setStatusMessage('Failed to send message. Please try again later.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className={`text-2xl font-light text-gray-900 mb-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Get in Touch
          </h2>
          <p className={`text-base text-gray-600 max-w-xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            We'd love to hear about your event and help make it unforgettable
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Send us a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2.5 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 text-sm"
                    />
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2.5 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 text-sm"
                    />
                  </div>
                  
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 text-sm"
                    />
                  </div>
                  
                  <div>
                    <textarea
                      name="message"
                      placeholder="Tell us about your event..."
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-3 py-2.5 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 resize-none text-sm"
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-gray-900 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 flex items-center justify-center space-x-2 text-sm disabled:opacity-60"
                >
                  <Send size={16} />
                  <span>{sending ? 'Sending...' : 'Send Message'}</span>
                </button>
                {statusMessage && (
                  <div className="text-sm mt-2 text-center text-gray-700">{statusMessage}</div>
                )}
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className={`space-y-8 transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <a
                  href="tel:559-552-3768"
                  className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 group"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 group-hover:bg-gray-200 transition-colors duration-200 flex-shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1 text-sm">Phone</h4>
                    <p className="text-gray-600 text-sm">(559) 552-3768</p>
                  </div>
                </a>
                
                <a
                  href="mailto:therentalwarehouse1@gmail.com"
                  className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 group"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 group-hover:bg-gray-200 transition-colors duration-200 flex-shrink-0">
                    <Mail size={16} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1 text-sm">Email</h4>
                    <p className="text-gray-600 text-sm break-all">therentalwarehouse1@gmail.com</p>
                  </div>
                </a>
                
                <a
                  href="https://instagram.com/the_rental_warehouse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 group"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 group-hover:bg-gray-200 transition-colors duration-200 flex-shrink-0">
                    <Instagram size={16} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1 text-sm">Instagram</h4>
                    <p className="text-gray-600 text-sm">@the_rental_warehouse</p>
                  </div>
                </a>
                
                <div className="flex items-start space-x-3 p-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 flex-shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1 text-sm">Address</h4>
                    <p className="text-gray-600 text-sm">641 Walnut Dr</p>
                    <p className="text-gray-600 text-sm">Fowler, CA 93625</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
              <div className="p-3 border-b border-gray-200">
                <h4 className="font-medium text-gray-900 text-sm">Our Location</h4>
                <p className="text-xs text-gray-600">Find us on the map</p>
              </div>
              <div className="h-48">
                <iframe
                  title="The Rental Warehouse Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3202.235661485038!2d-119.68420189999999!3d36.620713699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8094f14e23bb4b43%3A0x31f7084cf3123639!2s641%20Walnut%20Dr%2C%20Fowler%2C%20CA%2093625%2C%20USA!5e0!3m2!1sen!2sin!4v1757711692531!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;