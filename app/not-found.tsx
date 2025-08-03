"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamic imports for performance
const SplineScene = dynamic(() => import("@/components/spline-scene").then(mod => mod.SplineScene), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-to-br from-[#dfeoe2] to-white dark:from-[#0a0f1d] dark:to-[#2d4f4a] rounded-xl animate-pulse" />
});

const FloatingBalls = dynamic(() => import("@/components/floating-balls"), {
  ssr: false
});

// Custom 404 Spline Animation Component
function Custom404Animation() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  if (!mounted) return null;

  return (
    <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden">
      {/* Fallback Creative 404 Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#dfeoe2] via-white to-[#b8bcc3]/20 dark:from-[#0a0f1d] dark:via-[#1a1f2e] dark:to-[#2d4f4a]/20 flex items-center justify-center">
        
        {/* Animated 404 Text */}
        <div className="relative">
          <motion.div
            className="text-8xl lg:text-9xl font-bold text-[#2d4f4a]/20 dark:text-[#8db1a4]/20 select-none"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            404
          </motion.div>
          
          {/* Floating geometric elements around 404 */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                backgroundColor: i % 2 === 0 ? '#8db1a4' : '#2d4f4a',
                borderRadius: i % 3 === 0 ? '50%' : '20%',
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                rotate: [0, 360],
                scale: [0.5, 1, 0.5],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* 3D Spline Overlay */}
      <motion.div
        className="absolute inset-0 opacity-60 dark:opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <SplineScene
          sceneUrl={isDark ? "https://prod.spline.design/pvM5sSiYV2ivWraz/scene.splinecode" : "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"}
          className="w-full h-full"
          enableInteraction={true}
          autoRotate={true}
        />
      </motion.div>

      {/* Interactive particles that follow mouse */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-[#8db1a4] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              y: [-20, -60, -20],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Search Component
function SmartSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const router = useRouter();

  const pages = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Web Development", path: "/services#web" },
    { name: "Mobile Development", path: "/services#mobile" },
    { name: "UI/UX Design", path: "/services#design" },
    { name: "About Us", path: "/about" },
    { name: "Our Team", path: "/about#team" },
    { name: "Contact", path: "/contact" },
    { name: "Blog", path: "/blog" },
  ];

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = pages
        .filter(page => 
          page.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 4);
      setSuggestions(filtered.map(page => page.name));
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const foundPage = pages.find(page => 
        page.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (foundPage) {
        router.push(foundPage.path);
      } else {
        // If no exact match, go to home with search query
        router.push(`/?search=${encodeURIComponent(searchQuery)}`);
      }
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    const page = pages.find(p => p.name === suggestion);
    if (page) {
      router.push(page.path);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSearch}>
        <Input
          placeholder="Search for pages, services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          classNames={{
            input: "text-[#0a0f1d] dark:text-white",
            inputWrapper: "bg-white/95 dark:bg-[#1a1f2e]/95 border border-[#dfeoe2] dark:border-[#2d4f4a] hover:border-[#8db1a4] focus-within:border-[#8db1a4] transition-colors"
          }}
          endContent={
            <Button
              type="submit"
              size="sm"
              className="bg-[#2d4f4a] dark:bg-[#8db1a4] text-white dark:text-[#0a0f1d] min-w-unit-16"
              radius="md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Button>
          }
          radius="lg"
          size="lg"
        />
      </form>

      {/* Search Suggestions */}
      {suggestions.length > 0 && (
        <motion.div
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1a1f2e] border border-[#dfeoe2] dark:border-[#2d4f4a] rounded-lg shadow-xl z-10 overflow-hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {suggestions.map((suggestion, index) => (
            <motion.button
              key={suggestion}
              className="w-full px-4 py-3 text-left hover:bg-[#dfeoe2] dark:hover:bg-[#2d4f4a]/20 transition-colors text-[#0a0f1d] dark:text-white"
              onClick={() => handleSuggestionClick(suggestion)}
              whileHover={{ x: 5 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-3 text-[#8db1a4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                {suggestion}
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

// Quick Navigation Cards
function QuickNavCard({ title, description, href, icon }: {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full"
    >
      <Link
        href={href}
        className="block h-full bg-white/95 dark:bg-[#1a1f2e]/95 backdrop-blur-sm border border-[#dfeoe2] dark:border-[#2d4f4a] hover:border-[#8db1a4] transition-all duration-300 hover:shadow-xl group rounded-xl p-6 text-center"
      >
        <motion.div
          className="text-4xl mb-4 inline-block"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {icon}
        </motion.div>
        
        <h3 className="text-lg font-semibold text-[#0a0f1d] dark:text-white mb-2 group-hover:text-[#2d4f4a] dark:group-hover:text-[#8db1a4] transition-colors">
          {title}
        </h3>
        
        <p className="text-[#787a84] dark:text-[#d1d5db] text-sm leading-relaxed">
          {description}
        </p>
      </Link>
    </motion.div>
  );
}

export default function NotFoundPage() {
  const containerRef = useRef(null);
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  // Parallax effect for background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  if (!mounted) return null;

  return (
    <>
      {/* SEO Meta Tags */}
      <head>
        <title>Page Not Found - DIGIVO | Digital Excellence</title>
        <meta name="description" content="The page you're looking for doesn't exist. Explore our digital services including web development, mobile apps, and UI/UX design." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://digivo.com/404" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Page Not Found - DIGIVO" />
        <meta property="og:description" content="Let's help you find what you're looking for. Explore our digital solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://digivo.com/404" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Page Not Found - DIGIVO" />
        <meta name="twitter:description" content="Let's help you find what you're looking for." />
      </head>

      <div ref={containerRef} className="min-h-screen bg-white dark:bg-[#0a0f1d] relative overflow-hidden">
        {/* Floating Balls Background */}
        <FloatingBalls
          density={40}
          colors={isDark ? ['#8db1a4', '#2d4f4a', '#ffffff'] : ['#8db1a4', '#2d4f4a', '#dfeoe2']}
          opacity={isDark ? 0.2 : 0.3}
          speed={0.8}
          size={{ min: 2, max: 6 }}
        />

        {/* Background Pattern */}
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{ y }}
        >
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 100 + 50}px`,
                  height: `${Math.random() * 100 + 50}px`,
                  backgroundColor: i % 2 === 0 ? '#8db1a4' : '#2d4f4a',
                  borderRadius: i % 3 === 0 ? '50%' : '20%',
                  transform: `rotate(${Math.random() * 45}deg)`,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen pt-24 px-6">
          <div className="max-w-6xl mx-auto">
            
            {/* Hero Section */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-[#0a0f1d] dark:text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Oops! <span className="text-[#2d4f4a] dark:text-[#8db1a4]">Lost in Space?</span>
              </motion.h1>
              
              <motion.p
                className="text-lg lg:text-xl xl:text-2xl text-[#787a84] dark:text-[#b8bcc3] mb-12 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                The page you're looking for seems to have wandered off into the digital void. 
                But don't worry - we'll help you find your way back to something amazing!
              </motion.p>
            </motion.div>

            {/* 3D Animation Section */}
            <motion.div
              className="mb-16 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Custom404Animation />
            </motion.div>

            {/* Search Section */}
            <motion.div
              className="mb-16 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h2 className="text-2xl lg:text-3xl font-semibold text-[#0a0f1d] dark:text-white mb-8">
                Let's Find What You're Looking For
              </h2>
              <div className="flex justify-center">
                <SmartSearch />
              </div>
            </motion.div>

            {/* Quick Navigation */}
            <motion.div
              className="mb-16 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <h3 className="text-xl lg:text-2xl font-semibold text-[#0a0f1d] dark:text-white mb-8">
                Popular Destinations
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                <QuickNavCard
                  title="Home"
                  description="Return to our main page and explore our digital solutions"
                  href="/"
                  icon="🏠"
                />
                
                <QuickNavCard
                  title="Services"
                  description="Discover our web development, mobile apps, and design services"
                  href="/services"
                  icon="⚡"
                />
                
                <QuickNavCard
                  title="About Us"
                  description="Learn about our team and the story behind DIGIVO"
                  href="/about"
                  icon="👥"
                />
                
                <QuickNavCard
                  title="Contact"
                  description="Get in touch and let's discuss your next project"
                  href="/contact"
                  icon="📞"
                />
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              className="text-center pb-24"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <h3 className="text-xl font-semibold text-[#0a0f1d] dark:text-white mb-6">
                Still Can't Find What You Need?
              </h3>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    as={Link}
                    href="/"
                    size="lg"
                    className="bg-[#2d4f4a] dark:bg-[#8db1a4] text-white dark:text-[#0a0f1d] hover:bg-[#8db1a4] dark:hover:bg-[#2d4f4a] px-8 py-4 font-semibold shadow-xl"
                    radius="lg"
                  >
                    Take Me Home
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    as={Link}
                    href="/contact"
                    variant="bordered"
                    size="lg"
                    className="border-2 border-[#2d4f4a] dark:border-[#8db1a4] text-[#2d4f4a] dark:text-[#8db1a4] hover:bg-[#2d4f4a] dark:hover:bg-[#8db1a4] hover:text-white dark:hover:text-[#0a0f1d] px-8 py-4 font-semibold shadow-lg"
                    radius="lg"
                  >
                    Get Help
                  </Button>
                </motion.div>
              </div>

              {/* Fun Fact */}
              <motion.div
                className="mt-12 p-6 bg-white/50 dark:bg-[#1a1f2e]/50 backdrop-blur-sm rounded-xl border border-[#dfeoe2] dark:border-[#2d4f4a] max-w-md mx-auto"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <div className="text-3xl mb-3">💡</div>
                <p className="text-[#787a84] dark:text-[#b8bcc3] text-sm">
                  <strong>Fun Fact:</strong> The first 404 error was discovered at CERN in 1992. 
                  You're now part of internet history!
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`decoration-${i}`}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 200 + 100}px`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
                opacity: [0.03, 0.08, 0.03],
              }}
              transition={{
                duration: Math.random() * 20 + 15,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div
                className="w-full h-full border-2 border-[#8db1a4]/20 dark:border-[#8db1a4]/30 rounded-full"
                style={{
                  background: `conic-gradient(from ${Math.random() * 360}deg, transparent, ${i % 2 === 0 ? '#8db1a4' : '#2d4f4a'}20, transparent)`
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}