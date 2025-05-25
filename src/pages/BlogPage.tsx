import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionDivider } from '../components/SectionDivider';
import { Calendar, User, Tag, Clock, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export function BlogPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(pageRef, { once: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const featuredPost = {
    title: "5 Warning Signs Your Hard Drive Is About to Fail",
    excerpt: "Learn the key indicators that your hard drive might be on the verge of failure and what steps you should take to protect your valuable data before it's too late.",
    image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    date: "May 15, 2025",
    author: "Dr. Sarah Williams",
    category: "Hardware",
    readTime: "7 min read"
  };

  const recentPosts = [
    {
      title: "SSD vs HDD Data Recovery: Key Differences Explained",
      excerpt: "Understanding the unique challenges of recovering data from solid-state drives compared to traditional hard disk drives.",
      image: "https://images.pexels.com/photos/4195326/pexels-photo-4195326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: "May 10, 2025",
      author: "James Chen",
      category: "Technology",
      readTime: "5 min read"
    },
    {
      title: "How to Properly Backup Your Business Data in 2025",
      excerpt: "Modern backup strategies for businesses of all sizes that ensure your critical data remains protected against all threats.",
      image: "https://images.pexels.com/photos/7887800/pexels-photo-7887800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: "May 5, 2025",
      author: "Michael Rodriguez",
      category: "Business",
      readTime: "8 min read"
    },
    {
      title: "Ransomware Recovery: What You Need to Know",
      excerpt: "Essential information about recovering your systems and data after a ransomware attack without paying the ransom.",
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: "April 28, 2025",
      author: "Emma Thompson",
      category: "Security",
      readTime: "10 min read"
    },
    {
      title: "RAID Recovery: Common Failures and Solutions",
      excerpt: "A comprehensive guide to understanding RAID failures and the professional recovery options available.",
      image: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: "April 20, 2025",
      author: "David Lee",
      category: "Enterprise",
      readTime: "6 min read"
    }
  ];

  const categories = [
    { name: "Hardware", count: 12 },
    { name: "Software", count: 8 },
    { name: "Security", count: 10 },
    { name: "Business", count: 7 },
    { name: "Technology", count: 15 },
    { name: "Enterprise", count: 9 },
    { name: "Data Protection", count: 11 }
  ];

  const popularTags = [
    "Data Recovery", "Hard Drive", "SSD", "Backup", "RAID", 
    "Ransomware", "Cloud Storage", "NAS", "Flash Drive", "Encryption"
  ];

  return (
    <div ref={pageRef} className="container mx-auto px-4 py-12 pt-64">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6">
              Data Recovery <span className="text-primary-600">Insights</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert tips, industry news, and technical guides to help you understand and navigate the world of data recovery.
            </p>
          </motion.div>

          <SectionDivider className="my-12" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div variants={itemVariants} className="lg:col-span-2">
              {/* Featured Post */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
                <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-3 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {featuredPost.date}
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center">
                        <Tag className="w-4 h-4 mr-1" />
                        {featuredPost.category}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 hover:text-primary-600 transition-colors">
                      {featuredPost.title}
                    </h3>
                    <p className="text-gray-600 mb-5">{featuredPost.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <button className="text-primary-600 font-medium inline-flex items-center">
                        Read Full Article
                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Posts */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Recent Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recentPosts.map((post, index) => (
                    <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center space-x-2 mb-3 text-xs text-gray-500">
                          <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded">
                            {post.category}
                          </span>
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {post.date}
                          </div>
                        </div>
                        <h3 className="text-lg font-bold mb-2 hover:text-primary-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-3 text-sm line-clamp-3">{post.excerpt}</p>
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-gray-500">
                            By {post.author}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {post.readTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <button className="px-6 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
                    View All Articles
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Search */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Search Articles</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <Link 
                        to="#" 
                        className="flex justify-between items-center py-2 hover:text-primary-600 transition-colors"
                      >
                        <span>{category.name}</span>
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                          {category.count}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Popular Tags */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <Link 
                      key={index} 
                      to="#" 
                      className="bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700 px-3 py-1 rounded-full text-sm transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-primary-50 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Subscribe to our newsletter for the latest data recovery tips and industry news.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button type="submit" className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors">
                    Subscribe
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}