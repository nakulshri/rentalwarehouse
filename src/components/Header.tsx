import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Package } from 'lucide-react';
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
    <header className="sticky top-0 z-50 bg-[#181622] text-white border-b border-[#37323D] shadow-sm">
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
              <ShoppingCart className="w-6 h-6  transition" />
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[1.3rem] h-5 px-1 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold border-2 border-[#181622] shadow">
                  {getItemCount()}
                </span>
              )}
            </Link>
            {/* User */}
            {currentUser ? (
              <div className="relative">
                <span
                  onClick={() => setIsUserMenuOpen((open) => !open)}
                  className="w-9 h-9 flex items-center justify-center rounded-full ring-1 ring-white/10 hover:bg-white/10 focus:bg-white/10 transition"
                  aria-haspopup="true"
                  aria-expanded={isUserMenuOpen}
                  aria-label="Account"
                  tabIndex={0}
                >
                  <User className="w-5 h-5" />
                </span>
                {/* User dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 py-2 rounded-xl shadow-xl bg-white/90 backdrop-blur-md border border-white/30 text-gray-800 z-50 ring-1 ring-black/10 animate-fade-in">
                    <Link
                      to="/orders"
                      className="block px-4 py-2 hover:bg-indigo-50 transition rounded-md"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 hover:bg-indigo-50 transition rounded-md"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <hr className="my-2 border-gray-200" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-red-100 hover:text-red-600 transition rounded-md"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex space-x-2">
                <NavLink to="/login">Sign In</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
              </div>
            )}
            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(open => !open)}
              className="md:hidden ml-2 p-2 -mr-2 rounded hover:bg-white/10 focus:bg-white/10 transition"
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
                <NavLink to="/login" mobile>Sign In</NavLink>
                <NavLink to="/signup" mobile variant="filled">Sign Up</NavLink>
              </>
            )}
            {currentUser && (
              <>
                <NavLink to="/orders" mobile>My Orders</NavLink>
                {isAdmin && <NavLink to="/admin" mobile>Admin Dashboard</NavLink>}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 rounded hover:bg-red-100 hover:text-red-600 transition"
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

// NavLink Helper:
function NavLink({
  to,
  children,
  variant = "plain",
  mobile = false,
}: {
  to: string;
  children: React.ReactNode;
  variant?: "plain" | "filled";
  mobile?: boolean;
}) {
  return (
    <Link
      to={to}
      className={
      variant === "filled"
        ? `bg-gradient-to-tr from-fuchsia-600 to-indigo-500 text-white px-3 py-1.5 rounded shadow hover:opacity-90 transition font-semibold
          ${mobile ? "block w-full text-center mt-2" : ""}`
        : `hover:text-white transition font-semibold px-2 py-1 rounded
          ${mobile ? "block w-full text-left px-4 py-2 hover:bg-white/10" : ""}`
      }
    >
      {children}
    </Link>
  );
}
