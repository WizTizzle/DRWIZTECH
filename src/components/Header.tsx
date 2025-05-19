import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Save, Lock, Unlock, Undo } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPositionSaved, setIsPositionSaved] = useState(() => {
    return localStorage.getItem('logo-position-saved') === 'true';
  });
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  // Logo adjustment states
  const [logoSize, setLogoSize] = useState(() => {
    return isPositionSaved 
      ? Number(localStorage.getItem('logo-size-fixed')) 
      : Number(localStorage.getItem('logo-size')) || 104;
  });
  const [logoMargin, setLogoMargin] = useState(() => {
    return isPositionSaved 
      ? Number(localStorage.getItem('logo-margin-fixed'))
      : Number(localStorage.getItem('logo-margin')) || 10;
  });
  const [logoRotation, setLogoRotation] = useState(() => {
    return isPositionSaved 
      ? Number(localStorage.getItem('logo-rotation-fixed'))
      : Number(localStorage.getItem('logo-rotation')) || 0;
  });
  const [logoX, setLogoX] = useState(() => {
    return isPositionSaved 
      ? Number(localStorage.getItem('logo-x-fixed'))
      : Number(localStorage.getItem('logo-x')) || 0;
  });
  const [logoY, setLogoY] = useState(() => {
    return isPositionSaved 
      ? Number(localStorage.getItem('logo-y-fixed'))
      : Number(localStorage.getItem('logo-y')) || 0;
  });
  const [isLocked, setIsLocked] = useState(true);
  const [navbarHeight, setNavbarHeight] = useState(() => {
    return Number(localStorage.getItem('navbar-height')) || 384; // 24rem default
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Save current position as fixed
  const savePosition = () => {
    localStorage.setItem('logo-size-fixed', logoSize.toString());
    localStorage.setItem('logo-margin-fixed', logoMargin.toString());
    localStorage.setItem('logo-rotation-fixed', logoRotation.toString());
    localStorage.setItem('logo-x-fixed', logoX.toString());
    localStorage.setItem('logo-y-fixed', logoY.toString());
    localStorage.setItem('logo-position-saved', 'true');
    localStorage.setItem('navbar-height', navbarHeight.toString());
    setIsPositionSaved(true);
    setIsLocked(true);
  };

  // Clear saved position and return to adjustable mode
  const clearSavedPosition = () => {
    localStorage.removeItem('logo-size-fixed');
    localStorage.removeItem('logo-margin-fixed');
    localStorage.removeItem('logo-rotation-fixed');
    localStorage.removeItem('logo-x-fixed');
    localStorage.removeItem('logo-y-fixed');
    localStorage.removeItem('logo-position-saved');
    localStorage.removeItem('navbar-height');
    setIsPositionSaved(false);
    setIsLocked(true);
  };

  // Handle drag events for navbar height adjustment
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isLocked) return;
    setIsDragging(true);
    setStartY(e.clientY);
    setStartHeight(navbarHeight);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const deltaY = e.clientY - startY;
    const newHeight = Math.max(200, Math.min(600, startHeight + deltaY));
    setNavbarHeight(newHeight);
    localStorage.setItem('navbar-height', newHeight.toString());
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startY, startHeight]);

  // Save current adjustments to localStorage (only when not in saved position mode)
  useEffect(() => {
    if (!isPositionSaved) {
      localStorage.setItem('logo-size', logoSize.toString());
      localStorage.setItem('logo-margin', logoMargin.toString());
      localStorage.setItem('logo-rotation', logoRotation.toString());
      localStorage.setItem('logo-x', logoX.toString());
      localStorage.setItem('logo-y', logoY.toString());
    }
  }, [logoSize, logoMargin, logoRotation, logoX, logoY, isPositionSaved]);

  return (
    <motion.header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md border-b-4 border-primary-300/20' : 'bg-transparent border-b-4 border-primary-300/10'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ height: `${navbarHeight}px` }}
    >
      <div className="container mx-auto px-4 h-full relative">
        <nav className="flex items-center justify-between h-full">
          <div className="flex items-center space-x-8">
            <motion.div
              whileHover={{ scale: isLocked ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link to="/" className="block">
                <div 
                  className="flex flex-col items-center"
                  style={{
                    transform: `rotate(${logoRotation}deg) translate(${logoX}px, ${logoY}px)`,
                    marginLeft: `${logoMargin}%`
                  }}
                >
                  <img 
                    src="/images/Final logo WIZTECH.png"
                    alt="WizTech Logo"
                    style={{
                      height: `${logoSize}px`,
                    }}
                    className="w-auto object-contain transition-all duration-300"
                  />
                  <div className="text-xl font-display tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-primary-300 via-primary-400 to-primary-300 animate-shine [background-size:200%_auto] -mt-1">
                    DATA RECOVERY
                  </div>
                </div>
              </Link>
            </motion.div>

            {!isPositionSaved && (
              <>
                {!isLocked && (
                  <div className="flex items-center space-x-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <div>
                      <label className="block text-sm text-gray-600">Size (px)</label>
                      <input
                        type="number"
                        value={logoSize}
                        onChange={(e) => setLogoSize(Number(e.target.value))}
                        className="w-20 px-2 py-1 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">Margin (%)</label>
                      <input
                        type="number"
                        value={logoMargin}
                        onChange={(e) => setLogoMargin(Number(e.target.value))}
                        className="w-20 px-2 py-1 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">X (px)</label>
                      <input
                        type="number"
                        value={logoX}
                        onChange={(e) => setLogoX(Number(e.target.value))}
                        className="w-20 px-2 py-1 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">Y (px)</label>
                      <input
                        type="number"
                        value={logoY}
                        onChange={(e) => setLogoY(Number(e.target.value))}
                        className="w-20 px-2 py-1 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">Rotation (°)</label>
                      <input
                        type="number"
                        value={logoRotation}
                        onChange={(e) => setLogoRotation(Number(e.target.value))}
                        className="w-20 px-2 py-1 border rounded"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsLocked(!isLocked)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    title={isLocked ? "Unlock logo adjustment" : "Lock logo position"}
                  >
                    {isLocked ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                  </button>
                  
                  <button
                    onClick={savePosition}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors text-green-600"
                    title="Save current position permanently"
                  >
                    <Save className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}

            {isPositionSaved && (
              <button
                onClick={clearSavedPosition}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-blue-600"
                title="Return to adjustment mode"
              >
                <Undo className="w-5 h-5" />
              </button>
            )}
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

      {/* Drag handle */}
      {!isLocked && (
        <div
          className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-b from-transparent to-gray-200/20 cursor-row-resize"
          onMouseDown={handleMouseDown}
        >
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-300 rounded-full" />
        </div>
      )}
    </motion.header>
  );
}