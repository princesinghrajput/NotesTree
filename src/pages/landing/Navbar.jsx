import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Sparkles, ExternalLink, 
  User, LogOut, Settings, Layout
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menuItems = [
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog', isNew: true },
  ];

  const profileItems = [
    { 
      name: 'Dashboard', 
      path: '/app', 
      icon: Layout,
      description: 'Access your notes'
    },
    { 
      name: 'Settings', 
      path: '/app/settings', 
      icon: Settings,
      description: 'Manage your account'
    },
    { 
      name: 'Logout', 
      action: handleLogout, 
      icon: LogOut,
      description: 'Sign out of your account'
    }
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

            {/* Auth Section */}
            <div className="hidden md:flex items-center space-x-1">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl 
                             hover:bg-white/5 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 
                                 to-violet-500 flex items-center justify-center text-white 
                                 font-medium">
                      {user?.name?.[0]?.toUpperCase() || <User size={16} />}
                    </div>
                    <span className="text-gray-300 hover:text-white">
                      {user?.name || 'Profile'}
                    </span>
                  </button>

                  {/* Profile Dropdown */}
                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-72 rounded-2xl bg-black/90 
                                 backdrop-blur-xl border border-white/10 shadow-2xl 
                                 shadow-black/40 overflow-hidden"
                      >
                        {/* User Info */}
                        <div className="p-4 border-b border-white/10">
                          <div className="font-medium text-white">
                            {user?.name || 'User'}
                          </div>
                          <div className="text-sm text-gray-400">
                            {user?.email || 'user@example.com'}
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                          {profileItems.map((item) => (
                            item.action ? (
                              <button
                                key={item.name}
                                onClick={item.action}
                                className="w-full flex items-center space-x-3 p-3 rounded-xl
                                         text-left text-gray-300 hover:text-white 
                                         hover:bg-white/5 transition-colors duration-200"
                              >
                                <item.icon className="w-5 h-5" />
                                <div>
                                  <div className="font-medium">{item.name}</div>
                                  <div className="text-sm text-gray-500">
                                    {item.description}
                                  </div>
                                </div>
                              </button>
                            ) : (
                              <Link
                                key={item.name}
                                to={item.path}
                                className="flex items-center space-x-3 p-3 rounded-xl
                                         text-gray-300 hover:text-white hover:bg-white/5 
                                         transition-colors duration-200"
                              >
                                <item.icon className="w-5 h-5" />
                                <div>
                                  <div className="font-medium">{item.name}</div>
                                  <div className="text-sm text-gray-500">
                                    {item.description}
                                  </div>
                                </div>
                              </Link>
                            )
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link
                    to="/auth/login"
                    className="px-4 py-2 text-gray-300 hover:text-white 
                             transition-colors duration-200"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/auth/register"
                    className="group relative px-4 py-2 rounded-xl overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 
                                 to-violet-500 transition-all duration-300 
                                 group-hover:opacity-90" />
                    <span className="relative flex items-center text-white">
                      Get Started 
                      <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 
                                          transition-transform" />
                    </span>
                  </Link>
                </>
              )}
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