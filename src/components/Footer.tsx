import React, { useRef } from 'react';
import { Lightbulb } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

// Animation variants for individual components
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

// Company Info component
interface CompanyInfoProps {
  className?: string;
  isVisible?: boolean;
}

export function CompanyInfo({ className = "", isVisible = true }: CompanyInfoProps) {
  return (
    <motion.div 
      variants={itemVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className={`md:col-span-4 ${className}`}
      data-component="company-info"
      style={{ pointerEvents: 'auto' }}
    >
      <div className="flex items-center space-x-3 mb-6" data-element="logo-container">
        <span data-element="logo-icon-wrapper">
          <Lightbulb className="text-primary-300" size={32} data-element="logo-icon" />
        </span>
        <h3 className="text-2xl font-display font-bold" data-element="company-name">WizTech</h3>
      </div>
      <p className="text-gray-400 leading-relaxed mb-8" data-element="company-description">
        Professional data recovery services worldwide. Industry-leading success rates with secure, certified processes.
      </p>
      <SocialLinks />
    </motion.div>
  );
}

// Social Links component
interface SocialLinksProps {
  id?: string;
  className?: string;
}

export function SocialLinks({ id = "social-links", className = "" }: SocialLinksProps) {
  return (
    <div className={`flex space-x-4 ${className}`} id={id} data-component="social-links" style={{ pointerEvents: 'auto' }}>
      <SocialLink 
        platform="facebook" 
        href="#" 
        aria-label="Facebook" 
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </SocialLink>
      <SocialLink 
        platform="twitter" 
        href="#" 
        aria-label="Twitter" 
      >
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </SocialLink>
      <SocialLink 
        platform="linkedin" 
        href="#" 
        aria-label="LinkedIn" 
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </SocialLink>
    </div>
  );
}

interface SocialLinkProps {
  platform: string;
  href: string;
  children: React.ReactNode;
  id?: string;
  className?: string;
  'aria-label'?: string;
}

export function SocialLink({ platform, href, children, id, className = "", ...props }: SocialLinkProps) {
  return (
    <motion.a
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      href={href}
      className={`p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors ${className}`}
      id={id}
      data-platform={platform}
      data-element={`social-${platform}`}
      style={{ pointerEvents: 'auto' }}
      {...props}
    >
      <svg className="w-5 h-5 text-primary-300" fill="currentColor" viewBox="0 0 24 24" data-element={`${platform}-icon`}>
        {children}
      </svg>
    </motion.a>
  );
}

// Contact Info component
interface ContactInfoProps {
  className?: string;
  isVisible?: boolean;
}

export function ContactInfo({ className = "", isVisible = true }: ContactInfoProps) {
  return (
    <motion.div 
      variants={itemVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className={className}
      data-component="contact-info"
      style={{ pointerEvents: 'auto' }}
    >
      <h4 className="text-lg font-semibold mb-4" data-element="contact-title">Contact</h4>
      <ul className="space-y-3 text-gray-400" data-element="contact-list">
        <li data-element="contact-email">
          <span className="inline-block w-full">support@drwiztech.com</span>
        </li>
        <li data-element="contact-phone">
          <span className="inline-block w-full">(248) 403-8665</span>
        </li>
        <li data-element="contact-address">
          <span className="inline-block w-full">21 North Main St</span>
        </li>
        <li data-element="contact-city">
          <span className="inline-block w-full">Clarkston, MI 48346</span>
        </li>
      </ul>
    </motion.div>
  );
}

// Business Hours component
interface BusinessHoursProps {
  className?: string;
  isVisible?: boolean;
}

export function BusinessHours({ className = "", isVisible = true }: BusinessHoursProps) {
  return (
    <motion.div 
      variants={itemVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className={className}
      data-component="business-hours"
      style={{ pointerEvents: 'auto' }}
    >
      <h4 className="text-lg font-semibold mb-4" data-element="hours-title">Hours</h4>
      <ul className="space-y-3 text-gray-400" data-element="hours-list">
        <li data-element="hours-weekday">
          <span className="inline-block w-full">Monday - Friday: 9AM - 6PM</span>
        </li>
        <li data-element="hours-saturday">
          <span className="inline-block w-full">Saturday: 10AM - 4PM</span>
        </li>
        <li data-element="hours-sunday">
          <span className="inline-block w-full">Sunday: Closed</span>
        </li>
        <li data-element="hours-appointment" className="font-medium text-primary-300">
          <span className="inline-block w-full">(By Appointment Only)</span>
        </li>
        <li data-element="hours-emergency">
          <span className="inline-block w-full">24/7 Emergency Service Available</span>
        </li>
      </ul>
    </motion.div>
  );
}

// Quick Links component
interface QuickLinksProps {
  className?: string;
  isVisible?: boolean;
  links?: Array<{ text: string; to: string; id?: string }>;
}

export function QuickLinks({ 
  className = "", 
  isVisible = true,
  links = [
    { text: "About Us", to: "/about" },
    { text: "Services", to: "/services" },
    { text: "Blog", to: "/blog" },
    { text: "Support", to: "/support" }
  ]
}: QuickLinksProps) {
  return (
    <motion.div 
      variants={itemVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className={className}
      data-component="quick-links"
      style={{ pointerEvents: 'auto' }}
    >
      <h4 className="text-lg font-semibold mb-4" data-element="links-title">Quick Links</h4>
      <ul className="space-y-3 text-gray-400" data-element="links-list">
        {links.map((link) => (
          <li 
            key={link.to} 
            id={link.id} 
            data-element={`link-${link.text.toLowerCase().replace(' ', '-')}`}
            className="relative"
            style={{ pointerEvents: 'auto' }}
          >
            <Link 
              to={link.to} 
              className="hover:text-primary-300 transition-colors inline-block w-full"
              data-element={`link-${link.text.toLowerCase().replace(' ', '-')}-anchor`}
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// Copyright component
interface CopyrightProps {
  className?: string;
  isVisible?: boolean;
}

export function Copyright({ className = "", isVisible = true }: CopyrightProps) {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className={`mt-16 pt-8 border-t border-white/10 text-center text-gray-400 ${className}`}
      data-component="copyright"
      style={{ pointerEvents: 'auto' }}
    >
      <p data-element="copyright-text" className="relative">
        <span className="relative inline-block w-full">
          &copy; {new Date().getFullYear()} WizTech Data Recovery. All rights reserved.
        </span>
      </p>
    </motion.div>
  );
}

// Main Footer component
interface FooterProps {
  className?: string;
}

export function Footer({ className = "" }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true });

  return (
    <footer 
      ref={footerRef}
      className={`relative bg-black text-white py-24 overflow-hidden ${className}`}
      data-component="footer"
      style={{ pointerEvents: 'auto' }}
    >
      {/* Background with lower z-index */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(142,216,248,0.1),transparent_70%)] pointer-events-none z-0" 
        data-element="footer-background"
      />
      
      <div 
        className="container relative mx-auto px-4 z-10" 
        data-element="footer-container"
        style={{ pointerEvents: 'auto' }}
      >
        <div 
          className="max-w-7xl mx-auto" 
          data-element="footer-content"
          style={{ pointerEvents: 'auto' }}
        >
          <div 
            className="grid grid-cols-1 md:grid-cols-12 gap-12" 
            data-element="footer-grid"
            style={{ pointerEvents: 'auto' }}
          >
            <CompanyInfo isVisible={isInView} />

            <div 
              className="md:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8" 
              data-element="info-columns"
              style={{ pointerEvents: 'auto' }}
            >
              <ContactInfo isVisible={isInView} />
              <BusinessHours isVisible={isInView} />
              <QuickLinks isVisible={isInView} />
            </div>
          </div>

          <Copyright isVisible={isInView} />
        </div>
      </div>
    </footer>
  );
}