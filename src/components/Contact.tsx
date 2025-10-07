import React, { useEffect, useRef, useState } from 'react';
import { Phone, Instagram, Mail, Send } from 'lucide-react';

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
                
              </div>
            </div>

            {/* Location removed by request */}
            <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 p-4">
              <p className="text-sm text-gray-700">Location details have been removed. Please contact us via phone or email to schedule appointments.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;