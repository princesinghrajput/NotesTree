import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, ExternalLink } from 'lucide-react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog', isNew: true },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/50 backdrop-blur-xl border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="relative group flex items-center space-x-2"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-violet-600 
                          rounded-lg opacity-0 group-hover:opacity-10 blur transition-all duration-300" />
            <Sparkles className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 
                         text-transparent bg-clip-text">NoteTree</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="relative px-4 py-2 text-gray-300 hover:text-white 
                         transition-colors duration-200 group"
                onMouseEnter={() => setActiveItem(item.name)}
                onMouseLeave={() => setActiveItem(null)}
              >
                <span className="relative z-10">{item.name}</span>
                {item.isNew && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] font-medium 
                                rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/20">
                    New
                  </span>
                )}
                {activeItem === item.name && (
                  <motion.div
                    layoutId="navbar-hover"
                    className="absolute inset-0 bg-white/5 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </Link>
            ))}

            <div className="h-8 w-px bg-gray-700/50 mx-2" />

            {/* Auth Buttons */}
            <Link
              to="/auth/login"
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200"
            >
              Sign in
            </Link>
            <Link
              to="/auth/register"
              className="group relative px-4 py-2 rounded-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 
                            transition-all duration-300 group-hover:opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 
                            opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
              <span className="relative flex items-center text-white">
                Get Started <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/5 text-gray-300 
                     hover:text-white hover:bg-white/10 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/50 backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-3">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative flex items-center px-4 py-3 rounded-xl text-gray-300 
                           hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  {item.name}
                  {item.isNew && (
                    <span className="ml-2 px-1.5 py-0.5 text-[10px] font-medium rounded-full 
                                 bg-blue-500/20 text-blue-400 border border-blue-500/20">
                      New
                    </span>
                  )}
                </Link>
              ))}
              <div className="h-px bg-gray-700/50 my-4" />
              <Link
                to="/auth/login"
                className="block px-4 py-3 rounded-xl text-gray-300 hover:text-white 
                         hover:bg-white/5 transition-all duration-200"
              >
                Sign in
              </Link>
              <Link
                to="/auth/register"
                className="block px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 
                         to-violet-500 text-white text-center hover:opacity-90 
                         transition-opacity duration-200"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}; 