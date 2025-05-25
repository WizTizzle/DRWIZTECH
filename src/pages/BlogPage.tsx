import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, User, Tag, Clock, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionDivider } from '../components/SectionDivider';

export function BlogPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [headerRef, headerInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [featuredRef, featuredInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [articlesRef, articlesInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const featuredArticles = [
    {
      id: 'hard-drive-clicking',
      title: 'What Those Clicking Sounds from Your Hard Drive Really Mean',
      excerpt: 'When your hard drive starts making unusual noises, it\'s trying to tell you something. Learn to decode these warning signs before it\'s too late.',
      category: 'Hard Drives',
      author: 'Michael Chen',
      date: 'May 15, 2025',
      readTime: '8 min read',
      image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 'ransomware-recovery',
      title: 'Ransomware Recovery: Options Beyond Paying the Ransom',
      excerpt: 'Ransomware attacks continue to rise in 2025. We explore data recovery options that don\'t involve paying cybercriminals.',
      category: 'Security',
      author: 'Sarah Johnson',
      date: 'April 28, 2025',
      readTime: '12 min read',
      image: 'https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];

  const recentArticles = [
    {
      id: 'ssd-vs-hdd-reliability',
      title: 'SSD vs HDD Reliability in 2025: What the Data Shows',
      excerpt: 'With SSDs now dominating the storage market, we analyze failure rate data to determine which technology is truly more reliable.',
      category: 'Storage Technology',
      author: 'David Williams',
      date: 'May 5, 2025',
      readTime: '10 min read',
      image: 'https://images.pexels.com/photos/7639574/pexels-photo-7639574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 'data-backup-strategies',
      title: 'The 3-2-1 Backup Strategy: Still Relevant in the Cloud Era?',
      excerpt: 'The traditional 3-2-1 backup approach has been a standard for decades, but does it still make sense in today\'s cloud-first world?',
      category: 'Backups',
      author: 'Emma Rodriguez',
      date: 'April 22, 2025',
      readTime: '7 min read',
      image: 'https://images.pexels.com/photos/4508751/pexels-photo-4508751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 'flash-drive-myths',
      title: '5 Myths About Flash Drive Recovery Debunked',
      excerpt: 'We address common misconceptions about recovering data from USB drives and other flash storage media.',
      category: 'Flash Storage',
      author: 'James Wilson',
      date: 'April 15, 2025',
      readTime: '6 min read',
      image: 'https://images.pexels.com/photos/4792729/pexels-photo-4792729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 'raid-rebuild',
      title: 'RAID Rebuild Failures: Prevention & Recovery',
      excerpt: 'RAID rebuilds are a critical moment for your storage array. Learn how to prevent failures and what to do when things go wrong.',
      category: 'RAID Systems',
      author: 'Michael Chen',
      date: 'April 8, 2025',
      readTime: '9 min read',
      image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 'phone-data-recovery',
      title: 'Smartphone Data Recovery: What's Possible in 2025',
      excerpt: 'With increasingly integrated designs, recovering data from modern smartphones presents unique challenges. We explore the current state of mobile recovery.',
      category: 'Mobile Devices',
      author: 'Sarah Johnson',
      date: 'March 30, 2025',
      readTime: '8 min read',
      image: 'https://images.pexels.com/photos/193004/pexels-photo-193004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 'cloud-storage-failures',
      title: 'When Cloud Storage Fails: Real-World Recovery Cases',
      excerpt: 'Cloud storage isn't infallible. We share real case studies of cloud data loss and how the data was recovered.',
      category: 'Cloud Storage',
      author: 'David Williams',
      date: 'March 23, 2025',
      readTime: '11 min read',
      image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];

  const categories = [
    { name: 'Hard Drives', count: 18 },
    { name: 'SSD', count: 12 },
    { name: 'Flash Storage', count: 9 },
    { name: 'RAID Systems', count: 15 },
    { name: 'Cloud Storage', count: 7 },
    { name: 'Mobile Devices', count: 11 },
    { name: 'Data Security', count: 14 },
    { name: 'Backups', count: 10 },
  ];

  return (
    <div ref={pageRef} className="container mx-auto px-4 py-12 pt-64">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div 
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6">
            Data Recovery Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert articles, guides, and industry updates to help you understand data recovery and 
            protect your valuable information.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full py-3 px-4 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            </div>
          </div>
        </motion.div>

        {/* Featured Articles */}
        <motion.div 
          ref={featuredRef}
          initial={{ opacity: 0, y: 50 }}
          animate={featuredInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-display font-bold mb-8">Featured Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredArticles.map((article, index) => (
              <motion.div 
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={featuredInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col"
              >
                <div className="h-56 overflow-hidden">
                  <img 
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs font-semibold">
                      {article.category}
                    </span>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      <span>{article.date}</span>
                    </div>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 hover:text-primary-600 transition-colors">
                    <Link to={`/blog/${article.id}`}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4 flex-grow">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full mr-3" />
                    <span className="text-sm text-gray-700">{article.author}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <SectionDivider className="my-16" />

        {/* Recent Articles & Sidebar */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Recent Articles */}
          <motion.div 
            ref={articlesRef}
            initial={{ opacity: 0, y: 50 }}
            animate={articlesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:w-2/3"
          >
            <h2 className="text-3xl font-display font-bold mb-8">Recent Articles</h2>
            
            <div className="space-y-8">
              {recentArticles.map((article, index) => (
                <motion.div 
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={articlesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row"
                >
                  <div className="md:w-1/3 h-48 md:h-auto">
                    <img 
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs font-semibold">
                        {article.category}
                      </span>
                      <span className="mx-2">•</span>
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        <span>{article.date}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 hover:text-primary-600 transition-colors">
                      <Link to={`/blog/${article.id}`}>
                        {article.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-gray-300 rounded-full mr-2" />
                        <span className="text-sm text-gray-700">{article.author}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock size={14} className="mr-1" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-center">
              <button className="px-6 py-2 border border-primary-500 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
                Load More Articles
              </button>
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-8">
            {/* Categories */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category.name} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <Link 
                      to={`/blog/category/${category.name.toLowerCase().replace(' ', '-')}`}
                      className="hover:text-primary-600 transition-colors"
                    >
                      {category.name}
                    </Link>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      {category.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
              <p className="text-gray-700 mb-4">
                Subscribe to our newsletter for the latest data recovery tips and industry news.
              </p>
              <form className="space-y-3">
                <div>
                  <input 
                    type="email"
                    placeholder="Your email address"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
            
            {/* Popular Tags */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                <Link to="/blog/tag/data-loss" className="px-3 py-1 bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700 rounded-full text-sm transition-colors">
                  #data-loss
                </Link>
                <Link to="/blog/tag/recovery" className="px-3 py-1 bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700 rounded-full text-sm transition-colors">
                  #recovery
                </Link>
                <Link to="/blog/tag/backup" className="px-3 py-1 bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700 rounded-full text-sm transition-colors">
                  #backup
                </Link>
                <Link to="/blog/tag/ssd" className="px-3 py-1 bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700 rounded-full text-sm transition-colors">
                  #ssd
                </Link>
                <Link to="/blog/tag/hard-drive" className="px-3 py-1 bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700 rounded-full text-sm transition-colors">
                  #hard-drive
                </Link>
                <Link to="/blog/tag/raid" className="px-3 py-1 bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700 rounded-full text-sm transition-colors">
                  #raid
                </Link>
                <Link to="/blog/tag/ransomware" className="px-3 py-1 bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700 rounded-full text-sm transition-colors">
                  #ransomware
                </Link>
                <Link to="/blog/tag/tips" className="px-3 py-1 bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700 rounded-full text-sm transition-colors">
                  #tips
                </Link>
                <Link to="/blog/tag/security" className="px-3 py-1 bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700 rounded-full text-sm transition-colors">
                  #security
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}