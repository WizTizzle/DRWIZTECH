import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { SERVICE_PATHS } from '../data/serviceLinks';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the menu when navigating to a new page
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isActiveRoute = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md border-b-2 border-primary-600/40' : 'bg-transparent border-b-2 border-primary-600/20'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 py-12">
        <nav className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="flex-shrink-0 ml-16"
          >
            <Link to="/" className="block">
              <div className="flex flex-col items-center">
                <div className="relative mx-auto">
                  <img 
                    src="/images/Final logo WIZTECH.png"
                    alt="WizTech Logo"
                    className="h-[140px] w-auto object-contain"
                    onError={(e) => {
                      console.error('Failed to load logo image, using text fallback');
                      // We would normally set a fallback here, but we'll let the app handle it
                    }}
                  />
                </div>
                <div className="text-xl font-display tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-primary-300 via-primary-400 to-primary-300 animate-shine [background-size:200%_auto] -mt-1">
                  DATA RECOVERY
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12 mr-12">
            <Link 
              to="/" 
              className={`text-gray-900 hover:text-primary-600 transition-colors ${
                isActiveRoute('/') && !isActiveRoute('/services') && !isActiveRoute('/blog') && !isActiveRoute('/about') && !isActiveRoute('/support') 
                  ? 'font-medium text-primary-600' 
                  : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className={`text-gray-900 hover:text-primary-600 transition-colors ${
                isActiveRoute('/services') ? 'font-medium text-primary-600' : ''
              }`}
            >
              Services
            </Link>
            <Link 
              to="/about" 
              className={`text-gray-900 hover:text-primary-600 transition-colors ${
                isActiveRoute('/about') ? 'font-medium text-primary-600' : ''
              }`}
            >
              About
            </Link>
            <Link 
              to="/blog" 
              className={`text-gray-900 hover:text-primary-600 transition-colors ${
                isActiveRoute('/blog') ? 'font-medium text-primary-600' : ''
              }`}
            >
              Blog
            </Link>
            <Link 
              to="/support" 
              className={`text-gray-900 hover:text-primary-600 transition-colors ${
                isActiveRoute('/support') ? 'font-medium text-primary-600' : ''
              }`}
            >
              Support
            </Link>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
            >
              Contact Us
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden"
            >
              <div className="py-4 space-y-4">
                <Link 
                  to="/" 
                  className={`block text-gray-900 hover:text-primary-600 transition-colors ${
                    isActiveRoute('/') && !isActiveRoute('/services') && !isActiveRoute('/blog') && !isActiveRoute('/about') && !isActiveRoute('/support')  
                      ? 'font-medium text-primary-600' 
                      : ''
                  }`}
                >
                  Home
                </Link>
                <Link 
                  to="/services" 
                  className={`block text-gray-900 hover:text-primary-600 transition-colors ${
                    isActiveRoute('/services') ? 'font-medium text-primary-600' : ''
                  }`}
                >
                  Services
                </Link>
                <Link 
                  to="/about" 
                  className={`block text-gray-900 hover:text-primary-600 transition-colors ${
                    isActiveRoute('/about') ? 'font-medium text-primary-600' : ''
                  }`}
                >
                  About
                </Link>
                <Link 
                  to="/blog" 
                  className={`block text-gray-900 hover:text-primary-600 transition-colors ${
                    isActiveRoute('/blog') ? 'font-medium text-primary-600' : ''
                  }`}
                >
                  Blog
                </Link>
                <Link 
                  to="/support" 
                  className={`block text-gray-900 hover:text-primary-600 transition-colors ${
                    isActiveRoute('/support') ? 'font-medium text-primary-600' : ''
                  }`}
                >
                  Support
                </Link>
                
                <button className="w-full px-6 py-2 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors">
                  Contact Us
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}