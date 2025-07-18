import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { SERVICE_PATHS } from '../data/serviceLinks';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerY, setHeaderY] = useState(0);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const serviceLinks = [
    { title: 'Hard Drive Recovery', path: SERVICE_PATHS.hardDrive },
    { title: 'SSD & NVMe Recovery', path: SERVICE_PATHS.ssd },
    { title: 'RAID & NAS Recovery', path: SERVICE_PATHS.raid },
    { title: 'Flash & Memory Card Recovery', path: SERVICE_PATHS.flash },
    { title: 'Server Recovery', path: SERVICE_PATHS.server }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const headerHeight = headerRef.current?.offsetHeight || 160;
      
      // Determine if page is scrolled for styling
      setIsScrolled(currentScrollY > 50);
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > headerHeight) {
        // Scrolling down - hide header
        setHeaderY(-headerHeight);
      } else {
        // Scrolling up - show header
        setHeaderY(0);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the menu when navigating to a new page
  useEffect(() => {
    setIsMenuOpen(false);
    setMobileServicesExpanded(false);
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isActiveRoute = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const isActiveServiceRoute = () => {
    return Object.values(SERVICE_PATHS).some(path => location.pathname.startsWith(path));
  };

  return (
    <motion.header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md border-b-2 border-primary-600/40' : 'bg-transparent border-b-2 border-primary-600/20'
      }`}
      initial={{ y: -100 }}
      animate={{ y: headerY }}
      transition={{ 
        type: "tween", 
        ease: "easeInOut", 
        duration: 0.5
      }}
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
                      console.error('Failed to load logo image');
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
                isActiveRoute('/') && !isActiveRoute('/services') && !isActiveRoute('/about') && !isActiveRoute('/support') 
                  ? 'font-medium text-primary-600' 
                  : ''
              }`}
            >
              Home
            </Link>

            <Link 
              to="/assessment" 
              className={`text-gray-900 hover:text-primary-600 transition-colors ${
                isActiveRoute('/assessment') ? 'font-medium text-primary-600' : ''
              }`}
            >
              Data Recovery Assessment
            </Link>
            
            {/* Data Recovery Dropdown */}
            <div className="relative group" ref={dropdownRef}>
              <button
                className={`flex items-center text-gray-900 hover:text-primary-600 transition-colors focus:outline-none ${
                  isActiveServiceRoute() ? 'font-medium text-primary-600' : ''
                }`}
                onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                onMouseEnter={() => setIsServicesDropdownOpen(true)}
                aria-expanded={isServicesDropdownOpen}
                aria-haspopup="true"
              >
                Data Recovery Services
                <ChevronDown size={16} className="ml-1" />
              </button>
              
              <AnimatePresence>
                {isServicesDropdownOpen && (
                  <motion.div 
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onMouseLeave={() => setIsServicesDropdownOpen(false)}
                  >
                    <div className="py-2">
                      <Link 
                        to="/services" 
                        className="block px-4 py-2 text-gray-800 hover:bg-primary-50 hover:text-primary-600"
                      >
                        All Services
                      </Link>
                      {serviceLinks.map((service) => (
                        <Link 
                          key={service.path}
                          to={service.path} 
                          className={`block px-4 py-2 hover:bg-primary-50 hover:text-primary-600 ${
                            isActiveRoute(service.path) ? 'bg-primary-50 text-primary-600' : 'text-gray-800'
                          }`}
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              to="/about" 
              className={`text-gray-900 hover:text-primary-600 transition-colors ${
                isActiveRoute('/about') ? 'font-medium text-primary-600' : ''
              }`}
            >
              About
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
                    isActiveRoute('/') && !isActiveRoute('/services') && !isActiveRoute('/about') && !isActiveRoute('/support')  
                      ? 'font-medium text-primary-600' 
                      : ''
                  }`}
                >
                  Home
                </Link>

                <Link 
                  to="/assessment" 
                  className={`block text-gray-900 hover:text-primary-600 transition-colors ${
                    isActiveRoute('/assessment') ? 'font-medium text-primary-600' : ''
                  }`}
                >
                  Data Recovery Assessment
                </Link>
                
                {/* Mobile Data Recovery Dropdown */}
                <div className="space-y-2">
                  <button
                    onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}
                    className={`flex items-center justify-between w-full text-left text-gray-900 hover:text-primary-600 transition-colors ${
                      isActiveServiceRoute() ? 'font-medium text-primary-600' : ''
                    }`}
                    aria-expanded={mobileServicesExpanded}
                    aria-controls="mobile-services-menu"
                  >
                    <span>Data Recovery Services</span>
                    {mobileServicesExpanded ? (
                      <ChevronDown size={16} className="ml-1" />
                    ) : (
                      <ChevronRight size={16} className="ml-1" />
                    )}
                  </button>
                  
                  {mobileServicesExpanded && (
                    <div id="mobile-services-menu" className="pl-4 space-y-2 border-l-2 border-primary-100">
                      <Link 
                        to="/services" 
                        className={`block text-gray-900 hover:text-primary-600 transition-colors ${
                          location.pathname === '/services' ? 'font-medium text-primary-600' : ''
                        }`}
                      >
                        All Services
                      </Link>
                      {serviceLinks.map((service) => (
                        <Link 
                          key={service.path}
                          to={service.path} 
                          className={`block text-gray-900 hover:text-primary-600 transition-colors ${
                            isActiveRoute(service.path) ? 'font-medium text-primary-600' : ''
                          }`}
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                
                <Link 
                  to="/about" 
                  className={`block text-gray-900 hover:text-primary-600 transition-colors ${
                    isActiveRoute('/about') ? 'font-medium text-primary-600' : ''
                  }`}
                >
                  About
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