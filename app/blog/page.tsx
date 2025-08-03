"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Badge } from "@heroui/badge";
import { Link } from "@heroui/link";
import { useSearchParams } from "next/navigation";
import Head from "next/head";

// Blog data with different types and layouts
const blogPosts = [
  {
    id: 1,
    title: "Building Modern Web Applications with Next.js 15",
    excerpt: "Explore the latest features in Next.js 15 and learn how to build performant, scalable web applications with cutting-edge tools.",
    category: "Web Development",
    tags: ["Next.js", "React", "JavaScript", "Performance"],
    author: "Alex Thompson",
    date: "2024-12-15",
    readTime: "8 min",
    emoji: "⚡",
    slug: "building-modern-web-apps-nextjs-15",
    type: "tutorial", // Different content types
    featured: true,
    image: "/blog/nextjs-15.jpg"
  },
  {
    id: 2,
    title: "Case Study: How We Increased Client Engagement by 300%",
    excerpt: "A detailed analysis of our redesign project for TechCorp, showcasing strategic UX improvements that led to dramatic engagement increases.",
    category: "Case Studies",
    tags: ["Case Study", "UX", "Analytics", "Results"],
    author: "Sarah Chen",
    date: "2024-12-12",
    readTime: "12 min",
    emoji: "📈",
    slug: "techcorp-engagement-case-study",
    type: "case-study", // Different layout
    featured: true,
    image: "/blog/case-study.jpg"
  },
  {
    id: 3,
    title: "UI/UX Design Trends That Will Dominate 2025",
    excerpt: "Discover the emerging design trends that will shape user experiences in 2025, from micro-interactions to AI-powered interfaces.",
    category: "UI/UX Design",
    tags: ["Design", "Trends", "UX", "2025"],
    author: "Marcus Rodriguez",
    date: "2024-12-10",
    readTime: "6 min",
    emoji: "🎨",
    slug: "ux-design-trends-2025",
    type: "article",
    image: "/blog/ux-trends.jpg"
  },
  {
    id: 4,
    title: "Mobile App Performance: Advanced Optimization Techniques",
    excerpt: "Deep dive into mobile app optimization strategies that can dramatically improve performance, user retention, and app store rankings.",
    category: "Mobile Development",
    tags: ["Mobile", "Performance", "Optimization", "React Native"],
    author: "Emily Watson",
    date: "2024-12-08",
    readTime: "10 min",
    emoji: "📱",
    slug: "mobile-app-performance-optimization",
    type: "tutorial",
    image: "/blog/mobile-performance.jpg"
  },
  {
    id: 5,
    title: "The Complete Guide to Cloud Migration for Startups",
    excerpt: "Everything startups need to know about migrating to the cloud, including cost analysis, security considerations, and implementation strategies.",
    category: "Cloud Solutions",
    tags: ["Cloud", "Migration", "AWS", "Startups"],
    author: "Alex Thompson",
    date: "2024-12-05",
    readTime: "15 min",
    emoji: "☁️",
    slug: "cloud-migration-guide-startups",
    type: "guide",
    image: "/blog/cloud-migration.jpg"
  },
  {
    id: 6,
    title: "AI Integration in Web Development: Practical Applications",
    excerpt: "Explore practical ways to integrate AI into your web applications, from chatbots to personalized user experiences.",
    category: "AI & Technology",
    tags: ["AI", "Machine Learning", "Web Dev", "Automation"],
    author: "Sarah Chen",
    date: "2024-12-03",
    readTime: "9 min",
    emoji: "🤖",
    slug: "ai-integration-web-development",
    type: "article",
    image: "/blog/ai-web-dev.jpg"
  }
];

const categories = ["All", ...Array.from(new Set(blogPosts.map(post => post.category)))];

// Newsletter Subscription Component
function NewsletterSubscription() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }, 1500);
  };

  return (
    <motion.div
      className="bg-gradient-to-r from-[#2d4f4a] to-[#8db1a4] rounded-2xl p-8 text-white text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div
        className="text-4xl mb-4"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        📧
      </motion.div>
      
      <h3 className="text-2xl font-bold mb-3">Stay Updated!</h3>
      <p className="text-white/90 mb-6 max-w-md mx-auto">
        Get the latest insights on web development, design trends, and digital strategies delivered to your inbox.
      </p>

      {isSubscribed ? (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="bg-white/20 rounded-lg p-4"
        >
          <span className="text-2xl">✅</span>
          <p className="mt-2">Thanks for subscribing! Check your email for confirmation.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            classNames={{
              input: "text-[#0a0f1d]",
              inputWrapper: "bg-white border-0"
            }}
            radius="lg"
            size="lg"
          />
          <Button
            type="submit"
            isLoading={isLoading}
            className="bg-white text-[#2d4f4a] hover:bg-white/90 font-semibold"
            radius="lg"
            size="lg"
          >
            Subscribe
          </Button>
        </form>
      )}
    </motion.div>
  );
}

// Enhanced Blog Card Component with different layouts
function BlogCard({ post, index, featured = false }: { post: any; index: number; featured?: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Different styling based on post type
  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'case-study':
        return 'from-green-500 to-blue-600';
      case 'tutorial':
        return 'from-blue-500 to-purple-600';
      case 'guide':
        return 'from-orange-500 to-red-600';
      default:
        return 'from-[#2d4f4a] to-[#8db1a4]';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'case-study': return '📊';
      case 'tutorial': return '📚';
      case 'guide': return '📖';
      default: return '📝';
    }
  };

  const cardClass = featured 
    ? "md:col-span-2 lg:col-span-3" 
    : "";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: featured ? 1.01 : 1.02 }}
      className={`h-full ${cardClass}`}
    >
      <Card className="h-full bg-white dark:bg-[#1a1f2e] border border-[#dfeoe2] dark:border-[#2d4f4a] hover:border-[#8db1a4] transition-all duration-300 hover:shadow-xl overflow-hidden">
        {/* Enhanced Header with Type-Specific Gradient */}
        <CardHeader className="p-0">
          <div className={`relative w-full ${featured ? 'h-64 lg:h-80' : 'h-48'} bg-gradient-to-br ${getTypeStyle(post.type)} overflow-hidden`}>
            <div className={`absolute inset-0 flex items-center justify-center ${featured ? 'text-6xl' : 'text-4xl'}`}>
              {post.emoji}
            </div>
            
            {/* Type Badge */}
            <div className="absolute top-3 left-3">
              <Chip className="bg-white/90 text-[#2d4f4a] font-semibold" size="sm">
                {getTypeIcon(post.type)} {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
              </Chip>
            </div>
            
            {/* Category Badge */}
            <div className="absolute top-3 right-3">
              <Badge content={post.readTime} className="bg-[#8db1a4] text-white">
                <Chip className="bg-black/20 text-white" size="sm">
                  {post.category}
                </Chip>
              </Badge>
            </div>
            
            {/* Featured Badge */}
            {featured && (
              <div className="absolute bottom-3 left-3">
                <Chip className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold">
                  ⭐ Featured
                </Chip>
              </div>
            )}

            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        </CardHeader>

        {/* Enhanced Content */}
        <CardBody className={`${featured ? 'p-8' : 'p-6'}`}>
          <div className="flex items-center gap-3 mb-4 text-sm text-[#787a84] dark:text-[#b8bcc3]">
            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span>•</span>
            <span>{post.author}</span>
            <span>•</span>
            <span className="text-[#8db1a4] font-medium">{post.type}</span>
          </div>
          
          <h3 className={`${featured ? 'text-2xl lg:text-3xl' : 'text-xl'} font-bold text-[#0a0f1d] dark:text-white mb-4 leading-tight hover:text-[#2d4f4a] dark:hover:text-[#8db1a4] transition-colors cursor-pointer`}>
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h3>
          
          <p className={`text-[#787a84] dark:text-[#d1d5db] leading-relaxed mb-6 ${featured ? 'text-lg' : ''}`}>
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.slice(0, featured ? 6 : 4).map((tag: string) => (
              <Chip
                key={tag}
                variant="flat"
                className="bg-[#dfeoe2] dark:bg-[#2d4f4a]/30 text-[#2d4f4a] dark:text-[#8db1a4] text-xs"
                size="sm"
              >
                #{tag}
              </Chip>
            ))}
          </div>
        </CardBody>

        {/* Enhanced Footer */}
        <CardFooter className={`${featured ? 'p-8' : 'p-6'} pt-0`}>
          <motion.div whileHover={{ scale: 1.05 }} className="w-full">
            <Button
              as={Link}
              href={`/blog/${post.slug}`}
              className="w-full bg-[#2d4f4a] dark:bg-[#8db1a4] text-white dark:text-[#0a0f1d] hover:bg-[#8db1a4] dark:hover:bg-[#2d4f4a] font-semibold"
              radius="lg"
              size={featured ? "lg" : "md"}
            >
              Read Full Article →
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

// Category Filter Component
function CategoryFilter({ activeCategory, onCategoryChange }: {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      {categories.map((category) => (
        <motion.button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-3 rounded-full font-semibold transition-all ${
            activeCategory === category
              ? 'bg-[#2d4f4a] dark:bg-[#8db1a4] text-white dark:text-[#0a0f1d] shadow-lg'
              : 'bg-white dark:bg-[#1a1f2e] text-[#787a84] dark:text-[#b8bcc3] border border-[#dfeoe2] dark:border-[#2d4f4a] hover:border-[#8db1a4] hover:text-[#2d4f4a] dark:hover:text-[#8db1a4]'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
}

// Search Component
function BlogSearch({ searchTerm, onSearchChange }: {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}) {
  return (
    <div className="max-w-md mx-auto mb-8">
      <Input
        placeholder="Search articles..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        startContent={
          <svg className="w-5 h-5 text-[#787a84]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        }
        classNames={{
          input: "text-[#0a0f1d] dark:text-white",
          inputWrapper: "bg-white dark:bg-[#1a1f2e] border border-[#dfeoe2] dark:border-[#2d4f4a] hover:border-[#8db1a4] focus-within:border-[#8db1a4]"
        }}
        radius="lg"
        size="lg"
      />
    </div>
  );
}

// Main Blog Page Component
export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
    
    // Handle URL parameters for category filtering
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [searchParams]);

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Separate featured and regular posts
  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  if (!mounted) return null;

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>Blog - DIGIVO | Web Development & Design Insights</title>
        <meta name="description" content="Stay updated with the latest web development trends, UI/UX design insights, and digital transformation strategies from DIGIVO's expert team." />
        <meta name="keywords" content="web development blog, UI UX design, digital transformation, Next.js tutorials, mobile app development, cloud solutions" />
        <link rel="canonical" href="https://digivo.com/blog" />
      </Head>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-white via-[#f8fafa] to-[#dfeoe2]/30 dark:from-[#0a0f1d] dark:via-[#1a1f2e] dark:to-[#2d4f4a]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0a0f1d] dark:text-white mb-6">
              Digital <span className="text-[#2d4f4a] dark:text-[#8db1a4]">Insights</span> & 
              <br />Expert <span className="text-[#8db1a4]">Knowledge</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-[#787a84] dark:text-[#b8bcc3] mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover expert insights on web development, design trends, and digital transformation strategies. 
              From tutorials to case studies, we share knowledge that drives results.
            </p>
          </motion.div>

          {/* Enhanced Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[
              { number: `${blogPosts.length}+`, label: "Articles", icon: "📚" },
              { number: "15K+", label: "Readers", icon: "👥" },
              { number: `${categories.length - 1}`, label: "Categories", icon: "🏷️" },
              { number: "Weekly", label: "Updates", icon: "⚡" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center bg-white/50 dark:bg-[#1a1f2e]/50 rounded-xl p-4 backdrop-blur-sm"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl lg:text-3xl font-bold text-[#2d4f4a] dark:text-[#8db1a4] mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-[#787a84] dark:text-[#b8bcc3] font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <BlogSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <CategoryFilter
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </motion.div>

          {/* Results Count */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-[#787a84] dark:text-[#b8bcc3]">
              Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
              {activeCategory !== "All" && ` in ${activeCategory}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </motion.div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div className="mb-16">
              <motion.h2
                className="text-2xl lg:text-3xl font-bold text-[#0a0f1d] dark:text-white mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                ⭐ Featured Articles
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPosts.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} featured={true} />
                ))}
              </div>
            </div>
          )}

          {/* Regular Blog Grid */}
          {regularPosts.length > 0 && (
            <div className="mb-16">
              {featuredPosts.length > 0 && (
                <motion.h2
                  className="text-2xl lg:text-3xl font-bold text-[#0a0f1d] dark:text-white mb-8 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  📝 Latest Articles
                </motion.h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index + featuredPosts.length} />
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-[#0a0f1d] dark:text-white mb-3">
                No articles found
              </h3>
              <p className="text-[#787a84] dark:text-[#b8bcc3] mb-6">
                Try adjusting your search terms or browse different categories.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("All");
                }}
                className="bg-[#2d4f4a] dark:bg-[#8db1a4] text-white dark:text-[#0a0f1d] hover:bg-[#8db1a4] dark:hover:bg-[#2d4f4a]"
                radius="lg"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}

          {/* Newsletter Subscription */}
          <NewsletterSubscription />
        </div>
      </section>

      {/* Content Type Categories */}
      <section className="py-16 bg-white dark:bg-[#1a1f2e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0a0f1d] dark:text-white mb-4">
              Content <span className="text-[#2d4f4a] dark:text-[#8db1a4]">Types</span>
            </h2>
            <p className="text-lg text-[#787a84] dark:text-[#b8bcc3] max-w-2xl mx-auto">
              Different formats for different learning styles and needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                type: "Tutorial",
                icon: "📚",
                description: "Step-by-step guides with code examples",
                count: blogPosts.filter(p => p.type === 'tutorial').length,
                color: "from-blue-500 to-purple-600"
              },
              {
                type: "Case Study",
                icon: "📊",
                description: "Real project results and lessons learned",
                count: blogPosts.filter(p => p.type === 'case-study').length,
                color: "from-green-500 to-blue-600"
              },
              {
                type: "Guide",
                icon: "📖",
                description: "Comprehensive resources and best practices",
                count: blogPosts.filter(p => p.type === 'guide').length,
                color: "from-orange-500 to-red-600"
              },
              {
                type: "Article",
                icon: "📝",
                description: "Industry insights and trend analysis",
                count: blogPosts.filter(p => p.type === 'article').length,
                color: "from-pink-500 to-purple-600"
              }
            ].map((item, index) => (
              <motion.div
                key={item.type}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="bg-white dark:bg-[#0a0f1d] border border-[#dfeoe2] dark:border-[#2d4f4a] rounded-2xl p-6 h-full hover:border-[#8db1a4] transition-all duration-300 hover:shadow-xl">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-[#0a0f1d] dark:text-white mb-3 group-hover:text-[#2d4f4a] dark:group-hover:text-[#8db1a4] transition-colors">
                    {item.type}
                  </h3>
                  <p className="text-[#787a84] dark:text-[#b8bcc3] mb-4 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#8db1a4] font-medium">
                      {item.count} article{item.count !== 1 ? 's' : ''}
                    </span>
                    <svg className="w-5 h-5 text-[#8db1a4] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-[#2d4f4a] to-[#8db1a4] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Transform Your Digital Presence?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get expert guidance and start your project with our proven strategies and cutting-edge solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  as={Link}
                  href="/contact"
                  size="lg"
                  className="bg-white text-[#2d4f4a] hover:bg-white/90 font-semibold px-8 py-4"
                  radius="lg"
                >
                  Start Your Project
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  as={Link}
                  href="/services"
                  variant="bordered"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#2d4f4a] font-semibold px-8 py-4"
                  radius="lg"
                >
                  View Our Services
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}