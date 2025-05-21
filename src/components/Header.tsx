import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          <div className="flex items-center space-x-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link to="/" className="block">
                <div 
                  className="flex flex-col items-center"
                  style={{
                    transform: `rotate(0deg) translate(0px, 0px)`,
                    marginLeft: '10%'
                  }}
                >
                  <img 
                    src="/images/Final logo WIZTECH.png"
                    alt="WizTech Logo"
                    style={{
                      height: '104px'
                    }}
                    className="w-auto object-contain transition-all duration-300"
                  />
                  <div className="text-xl font-display tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-primary-300 via-primary-400 to-primary-300 animate-shine [background-size:200%_auto] -mt-1">
                    DATA RECOVERY
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-900 hover:text-primary-600 transition-colors">Home</Link>
            <Link to="/services/hard-drive" className="text-gray-900 hover:text-primary-600 transition-colors">Hard Drive</Link>
            <Link to="/services/ssd" className="text-gray-900 hover:text-primary-600 transition-colors">SSD</Link>
            <Link to="/services/raid" className="text-gray-900 hover:text-primary-600 transition-colors">RAID</Link>
            <Link to="/services/flash" className="text-gray-900 hover:text-primary-600 transition-colors">Flash</Link>
            <Link to="/services/server" className="text-gray-900 hover:text-primary-600 transition-colors">Server</Link>
            
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
                <Link to="/" className="block text-gray-900 hover:text-primary-600 transition-colors">Home</Link>
                <Link to="/services/hard-drive" className="block text-gray-900 hover:text-primary-600 transition-colors">Hard Drive</Link>
                <Link to="/services/ssd" className="block text-gray-900 hover:text-primary-600 transition-colors">SSD</Link>
                <Link to="/services/raid" className="block text-gray-900 hover:text-primary-600 transition-colors">RAID</Link>
                <Link to="/services/flash" className="block text-gray-900 hover:text-primary-600 transition-colors">Flash</Link>
                <Link to="/services/server" className="block text-gray-900 hover:text-primary-600 transition-colors">Server</Link>
                
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