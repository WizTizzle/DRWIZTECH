import React, { useRef } from 'react';
import { Lightbulb } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer 
      ref={footerRef}
      className="relative bg-black text-white py-24 overflow-hidden"
      id="main-footer"
    >
      {/* Background gradients - separated for easier targeting */}
      <div className="absolute inset-0" id="footer-background">
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_center,rgba(142,216,248,0.2),transparent_80%)]"
          id="footer-gradient-bottom"
        />
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(75,156,211,0.1),transparent_70%)]"
          id="footer-gradient-top"
        />
      </div>
      
      <div className="container mx-auto px-4" id="footer-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
          id="footer-content"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12" id="footer-grid">
            {/* Company Info Section */}
            <motion.div 
              variants={itemVariants}
              className="md:col-span-4"
              id="footer-company-section"
            >
              <div className="flex items-center space-x-3 mb-6" id="footer-logo-container">
                <Lightbulb className="text-primary-300" size={32} id="footer-logo-icon" />
                <h3 className="text-2xl font-display font-bold" id="footer-company-name">WizTech</h3>
              </div>
              <p className="text-gray-400 leading-relaxed mb-8" id="footer-company-description">
                Professional data recovery services worldwide. Industry-leading success rates with secure, certified processes.
              </p>
              <div className="flex space-x-4" id="footer-social-links">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  id="footer-social-facebook"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 text-primary-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  id="footer-social-twitter"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5 text-primary-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  id="footer-social-linkedin"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5 text-primary-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </motion.a>
              </div>
            </motion.div>

            <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8" id="footer-info-columns">
              {/* Contact Section */}
              <motion.div variants={itemVariants} id="footer-contact-section">
                <h4 className="text-lg font-semibold mb-4" id="footer-contact-title">Contact</h4>
                <ul className="space-y-3 text-gray-400" id="footer-contact-list">
                  <li id="footer-contact-email">support@wiztechrecovery.com</li>
                  <li id="footer-contact-phone">+1 (555) 123-4567</li>
                  <li id="footer-contact-address">123 Recovery Lane</li>
                  <li id="footer-contact-city">Tech City, TC 12345</li>
                </ul>
              </motion.div>

              {/* Hours Section */}
              <motion.div variants={itemVariants} id="footer-hours-section">
                <h4 className="text-lg font-semibold mb-4" id="footer-hours-title">Hours</h4>
                <ul className="space-y-3 text-gray-400" id="footer-hours-list">
                  <li id="footer-hours-weekday">Monday - Friday: 9AM - 6PM</li>
                  <li id="footer-hours-saturday">Saturday: 10AM - 4PM</li>
                  <li id="footer-hours-sunday">Sunday: Closed</li>
                  <li id="footer-hours-emergency">24/7 Emergency Service Available</li>
                </ul>
              </motion.div>

              {/* Quick Links Section */}
              <motion.div variants={itemVariants} id="footer-links-section">
                <h4 className="text-lg font-semibold mb-4" id="footer-links-title">Quick Links</h4>
                <ul className="space-y-3 text-gray-400" id="footer-links-list">
                  <li id="footer-link-about"><Link to="/about" className="hover:text-primary-300 transition-colors">About Us</Link></li>
                  <li id="footer-link-services"><Link to="/services" className="hover:text-primary-300 transition-colors">Services</Link></li>
                  <li id="footer-link-blog"><Link to="/blog" className="hover:text-primary-300 transition-colors">Blog</Link></li>
                  <li id="footer-link-support"><Link to="/support" className="hover:text-primary-300 transition-colors">Support</Link></li>
                </ul>
              </motion.div>
            </div>
          </div>

          {/* Copyright Section */}
          <motion.div
            variants={itemVariants}
            className="mt-16 pt-8 border-t border-white/10 text-center text-gray-400"
            id="footer-copyright"
          >
            <p id="footer-copyright-text">&copy; {new Date().getFullYear()} WizTech Data Recovery. All rights reserved.</p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}