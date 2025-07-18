import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  link: string;
  className?: string;
}

export function ServiceCard({ title, description, Icon, link, className = "" }: ServiceCardProps) {
  // Ensure link is correctly formatted and remove any double slashes except for http:// or https://
  const formattedLink = link.replace(/([^:])\/\//g, '$1/');

  console.log(`ServiceCard rendering for ${title} with link: ${formattedLink}`);
  
  return (
    <Link to={formattedLink} className={`block ${className}`} aria-label={`Learn more about ${title}`}>
      <motion.div 
        className="group relative bg-white p-6 sm:p-8 md:p-10 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl overflow-hidden h-full"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <motion.div 
          className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary-300/10 rounded-xl mb-6 md:mb-8 relative"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Icon className="text-primary-300" size={20} />
        </motion.div>
        
        <h3 className="text-xl sm:text-2xl font-display font-semibold mb-3 md:mb-4 text-gray-900 group-hover:text-primary-600 transition-colors duration-500 relative">{title}</h3>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 md:mb-8 relative">{description}</p>
        
        <div className="flex items-center text-sm sm:text-base text-primary-300 font-medium relative group-hover:translate-x-2 transition-transform duration-500">
          <span>Learn more</span>
          <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-500" viewBox="0 0 16 16" fill="none">
            <path d="M1 8h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </motion.div>
    </Link>
  );
}