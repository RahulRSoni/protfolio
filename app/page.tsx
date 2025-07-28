"use client";

import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

import { siteConfig } from "@/config/site";
import { GithubIcon } from "@/components/icons";

// Dynamic imports for performance - Only Spline background
const FullscreenSplineBackground = dynamic(() => import("@/components/fullscreen-spline-background"), {
  ssr: false,
  loading: () => null
});

// Simple static background for other sections
function SimpleBackground({ className = "", opacity = 0.1 }: { className?: string; opacity?: number }) {
  return (
    <div className={`absolute inset-0 ${className}`} style={{ opacity }}>
      {/* Simple geometric shapes without complex animations */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 60 + 20}px`,
              height: `${Math.random() * 60 + 20}px`,
              backgroundColor: i % 2 === 0 ? '#8db1a4' : '#2d4f4a',
              borderRadius: i % 3 === 0 ? '50%' : '8px',
              transform: `rotate(${Math.random() * 45}deg)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Smooth Animated Counter with proper cleanup
function SmoothCounter({ target, duration = 2500, suffix = "" }: { target: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const animationRef = useRef<number | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      let startTime: number | null = null;
      
      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Smooth easing function
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const newCount = Math.floor(easeOutCubic * target);
        
        setCount(newCount);
        
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };
      
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Smooth parallax effects - less aggressive
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.96]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  // Handle back to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Hero Section with Fixed Positioning - FULL WIDTH */}
      <motion.section 
        className="fixed inset-0 w-full h-full flex items-center justify-center overflow-hidden z-0"
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      >
        {/* Full-Screen 3D Background */}
        <div className="absolute inset-0 w-full h-full">
          <FullscreenSplineBackground />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[0.9] mb-6"
              style={{ 
                textShadow: '0 4px 20px rgba(0,0,0,0.3), 0 8px 40px rgba(0,0,0,0.2)' 
              }}
            >
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="block"
              >
                Craft{" "}
              </motion.span>
              
              <motion.span 
                className="bg-gradient-to-r from-[#8db1a4] via-white to-[#8db1a4] bg-clip-text text-transparent font-semibold"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
                style={{
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 4s ease-in-out infinite'
                }}
              >
                Digital
              </motion.span>
              
              <motion.span 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                className="block text-white/95"
              >
                Excellence Through{" "}
                <span className="text-[#8db1a4] font-semibold">Innovation</span>
              </motion.span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl text-white/85 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
              style={{ 
                textShadow: '0 2px 10px rgba(0,0,0,0.3)' 
              }}
            >
              We transform visionary concepts into powerful digital realities through cutting-edge technology, 
              innovative design, and unwavering commitment to excellence.
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Button
                as={Link}
                href="/services"
                className="bg-white/15 backdrop-blur-md border border-white/25 text-white font-semibold hover:bg-white hover:text-[#2d4f4a] transition-all duration-500 px-12 py-8 text-lg shadow-2xl"
                radius="full"
                size="lg"
              >
                Explore Our Services
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Button
                as={Link}
                href="/about"
                variant="bordered"
                className="border-2 border-white/40 text-white hover:bg-white hover:text-[#2d4f4a] transition-all duration-500 px-12 py-8 text-lg font-semibold backdrop-blur-md shadow-2xl"
                radius="full"
                size="lg"
              >
                <GithubIcon size={20} className="mr-2" />
                View Our Work
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <motion.div
            className="w-8 h-14 border-2 border-white/60 rounded-full flex justify-center cursor-pointer backdrop-blur-sm bg-white/10"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.1 }}
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
              });
            }}
          >
            <motion.div 
              className="w-2 h-5 bg-white/80 rounded-full mt-3"
              animate={{ y: [0, 6, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.section>

      
      <div className="relative w-full">
      
        <div className="w-full h-screen"></div>

      
        <div className="relative z-10 w-full bg-white">
          
          <section className="relative w-full  mt-6 lg:py-32 bg-white">
            <SimpleBackground opacity={0.05} />

            <div className="relative z-10 w-full">
              {/* Section Header */}
              <motion.div
                className="text-center mb-16 lg:mb-24 px-4 sm:px-6 lg:px-8"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.h2 
                  className="text-4xl md:text-5xl lg:text-6xl font-light text-[#0a0f1d] mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  Our <span className="text-[#2d4f4a] font-semibold">Expertise</span>
                </motion.h2>
                <motion.p 
                  className="text-lg lg:text-xl text-[#787a84] w-full mt-6 mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  Comprehensive digital solutions that drive innovation and growth across multiple platforms
                </motion.p>
              </motion.div>

              {/* Services Grid - FULL WIDTH */}
              <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className=" mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {[
                      { 
                        title: "Web Development", 
                        icon: "🌐", 
                        href: "/services#web", 
                        description: "Custom websites and applications built with cutting-edge technologies",
                        features: ["Next.js & React", "Full-Stack Development", "E-commerce Solutions"],
                        delay: 0
                      },
                      { 
                        title: "Mobile Development", 
                        icon: "📱", 
                        href: "/services#mobile", 
                        description: "Native and cross-platform mobile solutions for iOS and Android",
                        features: ["React Native", "Native iOS/Android", "App Store Optimization"],
                        delay: 0.1
                      },
                      { 
                        title: "UI/UX Design", 
                        icon: "🎨", 
                        href: "/services#design", 
                        description: "User-centered design solutions that combine aesthetics with functionality",
                        features: ["Design Systems", "User Research", "Prototyping"],
                        delay: 0.2
                      }
                    ].map((service, index) => (
                      <motion.div
                        key={service.title}
                        className="group h-full"
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.8, 
                          delay: service.delay, 
                          ease: "easeOut",
                          type: "spring",
                          stiffness: 100
                        }}
                        viewport={{ once: true, margin: "-50px" }}
                        whileHover={{ 
                          y: -8, 
                          scale: 1.01,
                          transition: { duration: 0.3, ease: "easeOut" }
                        }}
                      >
                        <div className="relative h-full bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-[#dfeoe2] group-hover:border-[#8db1a4] transition-all duration-500 group-hover:shadow-xl overflow-hidden">
                          {/* Hover Effect Background */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-[#2d4f4a]/3 to-[#8db1a4]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          />
                          
                          <div className="relative z-10">
                            <motion.div
                              className="text-4xl lg:text-5xl mb-6 inline-block"
                              whileHover={{ 
                                scale: 1.15, 
                                rotate: 8,
                                transition: { type: "spring", stiffness: 300, damping: 15 }
                              }}
                            >
                              {service.icon}
                            </motion.div>
                            
                            <h3 className="text-xl lg:text-2xl font-bold text-[#0a0f1d] group-hover:text-[#2d4f4a] transition-colors duration-300 mb-4">
                              {service.title}
                            </h3>
                            
                            <p className="text-[#787a84] leading-relaxed mb-6 text-sm lg:text-base">
                              {service.description}
                            </p>
                            
                            <ul className="space-y-3 mb-8">
                              {service.features.map((feature, idx) => (
                                <motion.li
                                  key={idx}
                                  className="flex items-center text-sm text-[#787a84]"
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ delay: service.delay + idx * 0.1, duration: 0.5 }}
                                  viewport={{ once: true }}
                                >
                                  <motion.div
                                    className="w-2 h-2 bg-[#8db1a4] rounded-full mr-3 flex-shrink-0"
                                    whileHover={{ scale: 1.5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                  />
                                  {feature}
                                </motion.li>
                              ))}
                            </ul>
                            
                            <motion.div 
                              whileHover={{ scale: 1.02 }} 
                              whileTap={{ scale: 0.98 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <Button
                                as={Link}
                                href={service.href}
                                className="w-full bg-[#2d4f4a] text-white hover:bg-[#8db1a4] transition-all duration-300 font-semibold"
                                radius="lg"
                                size="lg"
                              >
                                Learn More
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section - FULL WIDTH */}
          <section className="relative w-full py-20 lg:py-32 bg-[#0a0f1d] text-white">
            {/* Simple dark background elements */}
            <div className="absolute inset-0 opacity-5">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 100 + 50}px`,
                    height: `${Math.random() * 100 + 50}px`,
                    backgroundColor: '#8db1a4',
                    borderRadius: i % 2 === 0 ? '50%' : '12px',
                    transform: `rotate(${Math.random() * 45}deg)`,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
              <div className=" mx-auto">
                <motion.div
                  className="text-center mb-16 lg:mb-20"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
                    Proven <span className="text-[#8db1a4] font-semibold">Results</span>
                  </h2>
                  <p className="text-lg lg:text-xl text-[#b8bcc3] max-w-2xl mx-auto leading-relaxed">
                    Numbers that reflect our commitment to excellence and client success
                  </p>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                  {[
                    { number: 150, label: "Projects Delivered", suffix: "+" },
                    { number: 95, label: "Client Satisfaction", suffix: "%" },
                    { number: 50, label: "Happy Clients", suffix: "+" },
                    { number: 5, label: "Years Experience", suffix: "+" }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="text-center group"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: index * 0.15, 
                        duration: 0.8, 
                        ease: "easeOut",
                        type: "spring",
                        stiffness: 100
                      }}
                      viewport={{ once: true, margin: "-50px" }}
                      whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                    >
                      <motion.div
                        className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#8db1a4] mb-3 group-hover:text-white transition-colors duration-300"
                      >
                        <SmoothCounter target={stat.number} suffix={stat.suffix} duration={2000 + index * 200} />
                      </motion.div>
                      <p className="text-[#b8bcc3] font-medium text-base lg:text-lg">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section - FULL WIDTH */}
          <section className="relative w-full py-20 lg:py-32 bg-gradient-to-br from-[#dfeoe2] via-white to-[#b8bcc3]/30">
            <SimpleBackground opacity={0.08} />

            <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
              <div className="mx-auto text-center">
                <motion.h2
                  className="text-4xl md:text-5xl lg:text-6xl font-light text-[#0a0f1d] mb-8"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  Ready to{" "}
                  <span className="text-[#2d4f4a] font-semibold">Transform</span>{" "}
                  Your Digital Presence?
                </motion.h2>
                
                <motion.p
                  className="text-lg lg:text-xl text-[#787a84] mb-12 mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  Let's discuss how our expertise can help transform your vision into powerful digital solutions that drive growth and success.
                </motion.p>
                
                <motion.div
                  className="flex flex-col sm:flex-row gap-6 justify-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    whileHover={{ scale: 1.05, y: -3 }} 
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Button
                      as={Link}
                      href="/contact"
                      size="lg"
                      className="bg-[#2d4f4a] text-white hover:bg-[#8db1a4] px-12 py-8 text-lg font-semibold shadow-2xl"
                      radius="full"
                    >
                      Start Your Project Today
                    </Button>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.05, y: -3 }} 
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Button
                      as={Link}
                      href="/about"
                      variant="bordered"
                      size="lg"
                      className="border-2 border-[#2d4f4a] text-[#2d4f4a] hover:bg-[#2d4f4a] hover:text-white px-12 py-8 text-lg font-semibold shadow-xl"
                      radius="full"
                    >
                      Learn More About Us
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#2d4f4a] text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-[#8db1a4] transition-all duration-300"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: showBackToTop ? 1 : 0, 
          scale: showBackToTop ? 1 : 0 
        }}
        transition={{ 
          duration: 0.3, 
          ease: "easeOut",
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
        whileHover={{ 
          scale: 1.1,
          y: -3,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollToTop}
        style={{ pointerEvents: showBackToTop ? 'auto' : 'none' }}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="m18 15-6-6-6 6"/>
        </svg>
      </motion.button>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        html, body {
          width: 100vw;
          max-width: 100vw;
          overflow-x: hidden;
          scroll-behavior: smooth;
        }
        
        * {
          box-sizing: border-box;
        }
        
        /* Ensure no horizontal overflow */
        .w-full {
          width: 100% !important;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #8db1a4;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #2d4f4a;
        }
      `}</style>
    </div>
  );
}