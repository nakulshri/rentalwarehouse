import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Package, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCartStore } from '../store/cartStore';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { currentUser, logout, isAdmin } = useAuth();
  const { getItemCount } = useCartStore();
  const location = useLocation();

  // Close menus when navigating
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#181622] text-white border-b border-[#37323D] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - always left */}
          <Link
            to="/"
            className="flex items-center space-x-2 group hover:opacity-90 transition"
            aria-label="Home"
          >
            <span className="text-xl tracking-wide font-extrabold text-white drop-shadow-sm">
              THE RENTAL WAREHOUSE
            </span>
          </Link>

          {/* Right side nav group */}
          <div className="flex items-center space-x-6">
            {/* Nav links (desktop only) */}
            <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold">
              <NavLink to="/blogs">Blog</NavLink>
            </nav>
            {/* Cart */}
            <Link to="/cart" className="relative group" aria-label="Cart">
              <ShoppingCart className="w-6 h-6 transition-colors hover:text-indigo-400" />
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[1.3rem] h-5 px-1 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold border-2 border-[#181622] shadow">
                  {getItemCount()}
                </span>
              )}
            </Link>
            {/* User */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen((open) => !open)}
                  className="w-9 h-9 flex items-center justify-center rounded-full ring-1 ring-white/20 hover:bg-white/10 focus:bg-white/10 transition-all duration-200 group"
                  aria-haspopup="true"
                  aria-expanded={isUserMenuOpen}
                  aria-label="Account"
                >
                  <User className="w-5 h-5 group-hover:text-indigo-400 transition-colors" />
                </button>
                {/* Enhanced User dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 py-2 rounded-2xl shadow-2xl bg-white border border-gray-200 text-gray-800 z-50 animate-fade-in">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">Account</p>
                      <p className="text-xs text-gray-500">{currentUser.email}</p>
                    </div>
                    <div className="py-2">
                      <Link
                        to="/orders"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Package className="w-4 h-4 mr-3 text-gray-400" />
                        My Orders
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Package className="w-4 h-4 mr-3 text-gray-400" />
                          Admin Dashboard
                        </Link>
                      )}
                    </div>
                    <div className="border-t border-gray-100 py-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <X className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex space-x-3">
                <NavLink to="/login" variant="ghost">Sign In</NavLink>
                <NavLink to="/signup" variant="primary">Sign Up</NavLink>
              </div>
            )}
            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(open => !open)}
              className="md:hidden ml-2 p-2 -mr-2 rounded-lg hover:bg-white/10 focus:bg-white/10 transition-colors duration-200"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 pb-4 border-t border-white/15 text-base font-medium space-y-2 animate-slide-down">
            <NavLink to="/blogs" mobile>Blog</NavLink>
            {!currentUser && (
              <>
                <NavLink to="/login" mobile variant="ghost">Sign In</NavLink>
                <NavLink to="/signup" mobile variant="primary">Sign Up</NavLink>
              </>
            )}
            {currentUser && (
              <>
                <NavLink to="/orders" mobile>My Orders</NavLink>
                {isAdmin && <NavLink to="/admin" mobile>Admin Dashboard</NavLink>}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

// Enhanced NavLink Helper with multiple variants:
function NavLink({
  to,
  children,
  variant = "ghost",
  mobile = false,
}: {
  to: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  mobile?: boolean;
}) {
  const baseClasses = "font-semibold transition-all duration-200";
  
  const variants = {
    primary: "bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-2 rounded-xl hover:from-indigo-700 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105",
    secondary: "bg-gray-600 text-white px-4 py-2 rounded-xl hover:bg-gray-700 shadow-md hover:shadow-lg",
    ghost: "text-white/80 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10",
    outline: "border-2 border-white/30 text-white px-4 py-2 rounded-xl hover:border-white/50 hover:bg-white/10 backdrop-blur-sm"
  };

  const mobileClasses = mobile ? "block w-full text-left px-4 py-3 rounded-lg hover:bg-white/10" : "";

  return (
    <Link
      to={to}
      className={`${baseClasses} ${variants[variant]} ${mobileClasses}`}
    >
      {children}
    </Link>
  );
}
