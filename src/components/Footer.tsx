import React from 'react';
import { Instagram, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <div className="text-2xl font-bold mb-2">
              Warehouse<span className="text-sm align-super">©</span>
            </div>
            <p className="text-gray-400">
              © 2025 The Rental Warehouse. All rights reserved.
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="https://instagram.com/rentalwarehouse"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-full transition-colors duration-300"
            >
              <Instagram size={20} />
              <span>Instagram</span>
            </a>
            
            <a
              href="tel:+1234567890"
              className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full transition-colors duration-300"
            >
              <Phone size={20} />
              <span>Call Now</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>Premium event rentals • Professional service • Memorable experiences</p>
        </div>
      </div>

      {/* Wave Background */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <svg
          className="relative block w-full h-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="rgba(255,255,255,0.05)"
          ></path>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;