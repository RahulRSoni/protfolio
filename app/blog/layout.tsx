"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { useTheme } from "next-themes";

// Blog Navbar Component
function BlogNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-[#0a0f1d]/95 backdrop-blur-xl shadow-lg' 
          : 'bg-white/80 dark:bg-[#0a0f1d]/80 backdrop-blur-md'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#2d4f4a] to-[#8db1a4] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <div>
                <span className="text-xl font-bold text-[#0a0f1d] dark:text-white">DIGIVO</span>
                <span className="block text-xs text-[#8db1a4] font-medium">BLOG</span>
              </div>
            </Link>
          </motion.div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-[#787a84] dark:text-[#b8bcc3] hover:text-[#2d4f4a] dark:hover:text-[#8db1a4] transition-colors">
              Home
            </Link>
            <Link href="/services" className="text-[#787a84] dark:text-[#b8bcc3] hover:text-[#2d4f4a] dark:hover:text-[#8db1a4] transition-colors">
              Services
            </Link>
            <Link href="/about" className="text-[#787a84] dark:text-[#b8bcc3] hover:text-[#2d4f4a] dark:hover:text-[#8db1a4] transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-[#787a84] dark:text-[#b8bcc3] hover:text-[#2d4f4a] dark:hover:text-[#8db1a4] transition-colors">
              Contact
            </Link>
            <Link href="/blog" className="text-[#2d4f4a] dark:text-[#8db1a4] font-semibold">
              Blog
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-[#dfeoe2] dark:bg-[#2d4f4a] text-[#2d4f4a] dark:text-[#8db1a4] hover:bg-[#8db1a4] hover:text-white transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </motion.button>

            {/* CTA Button */}
            <Button
              as={Link}
              href="/contact"
              className="bg-[#2d4f4a] dark:bg-[#8db1a4] text-white dark:text-[#0a0f1d] hover:bg-[#8db1a4] dark:hover:bg-[#2d4f4a] font-semibold"
              radius="lg"
              size="md"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

// Blog Footer Component
function BlogFooter() {
  return (
    <footer className="bg-[#0a0f1d] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#2d4f4a] to-[#8db1a4] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <div>
                <span className="text-2xl font-bold">DIGIVO</span>
                <span className="block text-sm text-[#8db1a4] font-medium">BLOG</span>
              </div>
            </div>
            <p className="text-[#b8bcc3] leading-relaxed mb-6 max-w-md">
              Your go-to resource for web development insights, design trends, and digital transformation strategies.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { name: 'Twitter', icon: '𝕏' },
                { name: 'LinkedIn', icon: '💼' },
                { name: 'GitHub', icon: '⚡' }
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href="#"
                  className="w-10 h-10 bg-[#2d4f4a]/20 rounded-lg flex items-center justify-center hover:bg-[#8db1a4] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  title={social.name}
                >
                  <span className="text-sm">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {[
                'Web Development',
                'UI/UX Design', 
                'Mobile Development',
                'Case Studies',
                'Cloud Solutions',
                'AI & Technology'
              ].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/blog?category=${encodeURIComponent(item)}`}
                    className="text-[#b8bcc3] hover:text-[#8db1a4] transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'Services', href: '/services' },
                { name: 'About', href: '/about' },
                { name: 'Contact', href: '/contact' },
                { name: 'All Posts', href: '/blog' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-[#b8bcc3] hover:text-[#8db1a4] transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#2d4f4a]/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#b8bcc3] text-sm">
            © 2024 DIGIVO. All rights reserved.
          </p>
          <p className="text-[#8db1a4] text-sm mt-4 md:mt-0">
            Crafting digital excellence through insightful content.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Blog Layout Component
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#fafbfc] dark:bg-[#0a0f1d]">
      {/* Blog Navbar */}
      <BlogNavbar />

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Blog Footer */}
      <BlogFooter />
    </div>
  );
}