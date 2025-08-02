"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

// Dynamic imports for Spline components
const AboutSplineScene = dynamic(() => import("@/components/spline-scene").then(mod => mod.AboutSplineScene), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-to-br from-[#dfeoe2] to-white dark:from-[#0a0f1d] dark:to-[#2d4f4a] rounded-xl animate-pulse" />
});

const SplineScene = dynamic(() => import("@/components/spline-scene").then(mod => mod.SplineScene), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-to-br from-[#dfeoe2] to-white dark:from-[#0a0f1d] dark:to-[#2d4f4a] rounded-xl animate-pulse" />
});

const ParallaxBackground = dynamic(() => import("@/components/parallax-background"), {
  ssr: false
});

const FloatingBalls = dynamic(() => import("@/components/floating-balls"), {
  ssr: false
});

// Enhanced transition settings
const THEME_TRANSITION = {
  duration: 0.8,
  ease: [0.25, 0.46, 0.45, 0.94]
};

const SCENE_TRANSITION = {
  duration: 1.2,
  ease: [0.25, 0.46, 0.45, 0.94]
};

// Title utility functions
const title = ({ size = "md" }: { size?: "sm" | "md" | "lg" } = {}) => {
  const sizeClasses = {
    sm: "text-2xl sm:text-3xl lg:text-4xl",
    md: "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl", 
    lg: "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl"
  };
  return `tracking-tight inline font-semibold ${sizeClasses[size]} text-[#0a0f1d] dark:text-white transition-all duration-700 ease-out`;
};

const subtitle = () => "w-full text-base sm:text-lg lg:text-xl xl:text-2xl text-[#787a84] dark:text-[#b8bcc3] block max-w-full transition-all duration-700 ease-out";

// Enhanced Animated Counter Component
function AnimatedCounter({ target, duration = 2000, suffix = "" }: { target: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Enhanced easing function
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeOutCubic * target));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, target, duration]);

  return (
    <span 
      ref={ref} 
      className="text-4xl lg:text-6xl font-bold text-[#2d4f4a] dark:text-[#8db1a4] transition-all duration-700 ease-out"
    >
      {count}{suffix}
    </span>
  );
}

// Enhanced Team Member Card Component
function TeamMemberCard({ member, index }: { member: any; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      animate={isInView ? {
        opacity: 1,
        y: 0,
        rotateY: 0,
        transition: {
          duration: 0.8,
          delay: index * 0.15,
          ease: THEME_TRANSITION.ease
        }
      } : {}}
      whileHover={{
        y: -12,
        rotateY: 5,
        scale: 1.03,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      className="h-full transform-gpu"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-full bg-white/95 dark:bg-[#1a1f2e]/95 backdrop-blur-sm border border-[#dfeoe2] dark:border-[#2d4f4a] hover:border-[#8db1a4] dark:hover:border-[#8db1a4] transition-all duration-700 hover:shadow-2xl dark:hover:shadow-2xl dark:hover:shadow-[#8db1a4]/10 group rounded-xl p-6 text-center overflow-hidden relative">
        
        {/* Enhanced hover background effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700"
          style={{
            background: `linear-gradient(135deg, ${member.color || '#8db1a4'}15, transparent 70%)`
          }}
        />

        {/* Theme transition overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-transparent via-[#8db1a4]/5 to-transparent opacity-0 dark:opacity-100 transition-all duration-700"
        />

        <div className="relative z-10">
          {/* Enhanced Avatar with theme transitions */}
          <motion.div
            className="w-24 h-24 bg-gradient-to-br from-[#2d4f4a] to-[#8db1a4] dark:from-[#8db1a4] dark:to-[#2d4f4a] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold shadow-lg dark:shadow-[#8db1a4]/20 transition-all duration-700"
            whileHover={{ scale: 1.1, rotate: 5 }}
            animate={isHovered ? { 
              rotateY: [0, 360],
              transition: { duration: 2, ease: "easeInOut" }
            } : {}}
          >
            <motion.span
              className="transition-all duration-700"
              animate={{
                textShadow: isHovered 
                  ? "0 0 20px rgba(255,255,255,0.5)" 
                  : "0 0 0px rgba(255,255,255,0)"
              }}
            >
              {member.initials}
            </motion.span>
          </motion.div>
          
          <h3 className="text-xl font-semibold text-[#0a0f1d] dark:text-white mb-2 group-hover:text-[#2d4f4a] dark:group-hover:text-[#8db1a4] transition-all duration-700">
            {member.name}
          </h3>
          
          <p className="text-[#8db1a4] dark:text-[#8db1a4] font-medium mb-3 transition-all duration-700">
            {member.role}
          </p>
          
          <p className="text-[#787a84] dark:text-[#d1d5db] text-sm leading-relaxed mb-4 transition-all duration-700">
            {member.bio}
          </p>
          
          <div className="flex justify-center flex-wrap gap-2">
            {member.skills.map((skill: string, idx: number) => (
              <motion.span
                key={idx}
                className="px-2 py-1 bg-[#dfeoe2] dark:bg-[#374151] text-[#2d4f4a] dark:text-[#e5e7eb] text-xs rounded-full font-medium transition-all duration-700 hover:bg-[#8db1a4] hover:text-white dark:hover:bg-[#8db1a4] dark:hover:text-[#0a0f1d]"
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.3 }
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 + idx * 0.05, duration: 0.5 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Enhanced Values Section Component
function ValuesSection() {
  const ref = useRef(null);
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Move useScroll to top level
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
    layoutEffect: false
  });

  // All transform hooks at top level
  const yTransform = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const backgroundScaleTransform = useTransform(scrollYProgress, [0, 1], [1.1, 0.9]);
  const backgroundOpacityTransform = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  // Spring animations
  const y = useSpring(yTransform, { stiffness: 100, damping: 30 });
  const backgroundScale = useSpring(backgroundScaleTransform, { stiffness: 100, damping: 30 });
  const backgroundOpacity = useSpring(backgroundOpacityTransform, { stiffness: 100, damping: 30 });
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  const values = [
    {
      icon: "🎯",
      title: "Excellence",
      description: "We strive for perfection in every project, delivering solutions that exceed expectations and drive meaningful results."
    },
    {
      icon: "🚀",
      title: "Innovation",
      description: "We embrace cutting-edge technologies and creative approaches to solve complex challenges and stay ahead of trends."
    },
    {
      icon: "🤝",
      title: "Partnership",
      description: "We build lasting relationships with our clients, working as an extension of their team to achieve shared success."
    },
    {
      icon: "⚡",
      title: "Agility",
      description: "We adapt quickly to changing requirements and market conditions, ensuring our solutions remain relevant and effective."
    }
  ];

  // Show nothing until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <section className="py-24 lg:py-32 bg-[#0a0f1d] text-white relative overflow-hidden transition-all duration-700">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-semibold text-white mb-6">
              Our Core <span className="text-[#8db1a4]">Values</span>
            </h2>
            <p className="text-lg lg:text-xl text-[#b8bcc3] max-w-2xl mx-auto">
              These principles guide every decision we make and every solution we create
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-[#0a0f1d] text-white relative overflow-hidden transition-all duration-700">
      
      {/* Enhanced Background with smooth theme transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? 'dark' : 'light'}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={SCENE_TRANSITION}
        >
          {/* Background gradient overlay that changes with theme */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: isDark 
                ? "linear-gradient(135deg, rgba(10, 15, 29, 0.95) 0%, rgba(26, 31, 46, 0.9) 50%, rgba(45, 79, 74, 0.8) 100%)"
                : "linear-gradient(135deg, rgba(10, 15, 29, 0.98) 0%, rgba(45, 79, 74, 0.95) 50%, rgba(141, 177, 164, 0.9) 100%)"
            }}
            transition={THEME_TRANSITION}
          />

          {/* Enhanced 3D Scene with smoother transitions */}
          <motion.div
            className="absolute inset-0 opacity-20 dark:opacity-30"
            style={{ 
              y, 
              scale: backgroundScale,
              opacity: backgroundOpacity
            }}
          >
            {/* Light Mode Scene with enhanced transitions */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              animate={{
                opacity: isDark ? 0 : 1,
                scale: isDark ? 0.95 : 1,
                rotateX: isDark ? 5 : 0,
                filter: isDark ? "blur(2px)" : "blur(0px)"
              }}
              transition={SCENE_TRANSITION}
            >
              <SplineScene
                sceneUrl="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
                className="w-full h-full"
              />
            </motion.div>

            {/* Dark Mode Scene with enhanced transitions */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              animate={{
                opacity: isDark ? 1 : 0,
                scale: isDark ? 1 : 0.95,
                rotateX: isDark ? 0 : 5,
                filter: isDark ? "blur(0px)" : "blur(2px)"
              }}
              transition={SCENE_TRANSITION}
            >
              <SplineScene
                sceneUrl="https://prod.spline.design/pvM5sSiYV2ivWraz/scene.splinecode"
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>

          {/* Floating light particles that change with theme */}
          <motion.div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 4 + 2,
                  height: Math.random() * 4 + 2,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  backgroundColor: isDark 
                    ? ['#8db1a4', '#2d4f4a', '#ffffff'][Math.floor(Math.random() * 3)]
                    : ['#2d4f4a', '#8db1a4', '#dfeoe2'][Math.floor(Math.random() * 3)],
                  y: [-50, -200, -50],
                  x: [
                    -Math.random() * 40 + 20, 
                    Math.random() * 40 - 20, 
                    -Math.random() * 40 + 20
                  ],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: Math.random() * 15 + 10,
                  repeat: Infinity,
                  delay: Math.random() * 8,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={THEME_TRANSITION}
        >
          <motion.h2 
            className="text-4xl lg:text-5xl xl:text-6xl font-semibold text-white mb-6 transition-all duration-700"
            animate={{
              textShadow: isDark 
                ? "0 0 30px rgba(141, 177, 164, 0.3)" 
                : "0 0 20px rgba(255, 255, 255, 0.2)"
            }}
            transition={THEME_TRANSITION}
          >
            Our Core <span className="text-[#8db1a4] transition-all duration-700">Values</span>
          </motion.h2>
          <p className="text-lg lg:text-xl text-[#b8bcc3] max-w-2xl mx-auto transition-all duration-700">
            These principles guide every decision we make and every solution we create
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.15, 
                duration: 0.8,
                ease: THEME_TRANSITION.ease
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
            >
              <motion.div
                className="text-4xl mb-4 inline-block"
                whileHover={{ 
                  scale: 1.3, 
                  rotate: 15,
                  transition: { type: "spring", stiffness: 300, damping: 15 }
                }}
                animate={{
                  textShadow: isDark 
                    ? "0 0 20px rgba(141, 177, 164, 0.4)" 
                    : "0 0 10px rgba(255, 255, 255, 0.3)"
                }}
                transition={THEME_TRANSITION}
              >
                {value.icon}
              </motion.div>
              
              <h3 className="text-xl font-semibold mb-4 group-hover:text-[#8db1a4] transition-all duration-700">
                {value.title}
              </h3>
              
              <p className="text-[#b8bcc3] leading-relaxed text-sm transition-all duration-700">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  const containerRef = useRef(null);
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Enhanced scroll progress for hero parallax - moved to top level
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
    layoutEffect: false
  });

  // All transform hooks at the top level to maintain hook order
  const heroYTransform = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const heroScaleTransform = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacityTransform = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroRotateXTransform = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const contentYTransform = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const contentOpacityTransform = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const splineYTransform = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const splineScaleTransform = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const scrollIndicatorYTransform = useTransform(scrollYProgress, [0, 0.3], [0, 20]);
  const scrollIndicatorOpacityTransform = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const floatingElementsYTransform = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const floatingElementsOpacityTransform = useTransform(scrollYProgress, [0, 0.5], [0.6, 0]);

  // Spring animations
  const heroY = useSpring(heroYTransform, { stiffness: 100, damping: 30 });
  const heroScale = useSpring(heroScaleTransform, { stiffness: 100, damping: 30 });
  const heroOpacity = useSpring(heroOpacityTransform, { stiffness: 100, damping: 30 });
  const heroRotateX = useSpring(heroRotateXTransform, { stiffness: 100, damping: 30 });
  const contentY = useSpring(contentYTransform, { stiffness: 100, damping: 30 });
  const contentOpacity = useSpring(contentOpacityTransform, { stiffness: 100, damping: 30 });
  const splineY = useSpring(splineYTransform, { stiffness: 100, damping: 30 });
  const splineScale = useSpring(splineScaleTransform, { stiffness: 100, damping: 30 });
  const scrollIndicatorY = useSpring(scrollIndicatorYTransform, { stiffness: 100, damping: 30 });
  const scrollIndicatorOpacity = useSpring(scrollIndicatorOpacityTransform, { stiffness: 100, damping: 30 });
  const floatingElementsY = useSpring(floatingElementsYTransform, { stiffness: 100, damping: 30 });
  const floatingElementsOpacity = useSpring(floatingElementsOpacityTransform, { stiffness: 100, damping: 30 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  // Smooth scroll function
  const scrollToSection = (selector: string) => {
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Team members data
  const teamMembers = [
    {
      name: "Alex Thompson",
      role: "Founder & CEO",
      initials: "AT",
      bio: "Visionary leader with 10+ years in digital transformation and strategic planning.",
      skills: ["Strategy", "Leadership", "Innovation"],
      color: "#3b82f6"
    },
    {
      name: "Sarah Chen",
      role: "Lead Developer",
      initials: "SC",
      bio: "Full-stack expert specializing in modern web technologies and scalable architectures.",
      skills: ["React", "Node.js", "Cloud"],
      color: "#10b981"
    },
    {
      name: "Marcus Rodriguez",
      role: "UI/UX Designer",
      initials: "MR",
      bio: "Creative designer focused on user-centered design solutions and innovative interfaces.",
      skills: ["Design", "Prototyping", "Research"],
      color: "#a855f7"
    },
    {
      name: "Emily Watson",
      role: "Project Manager",
      initials: "EW",
      bio: "Agile project management expert ensuring seamless delivery and client satisfaction.",
      skills: ["Agile", "Planning", "Communication"],
      color: "#f97316"
    }
  ];

  // Stats data
  const stats = [
    { number: 150, label: "Projects Completed", suffix: "+" },
    { number: 95, label: "Client Satisfaction", suffix: "%" },
    { number: 50, label: "Happy Clients", suffix: "+" },
    { number: 5, label: "Years Experience", suffix: "+" }
  ];

  // Show loading state until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0a0f1d] relative transition-all duration-700">
        <section className="h-screen w-full flex items-center justify-center overflow-hidden relative">
          <div className="relative z-20 text-center w-full max-w-7xl mx-auto px-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl tracking-tight inline font-semibold text-[#0a0f1d] dark:text-white mb-8">
              About <span className="text-[#2d4f4a] dark:text-[#8db1a4]">DIGIVO</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-[#787a84] dark:text-[#b8bcc3] mb-16 max-w-4xl mx-auto">
              We're a passionate team of digital innovators dedicated to transforming businesses through cutting-edge technology and creative solutions
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-white dark:bg-[#0a0f1d] relative transition-all duration-700">
      
      {/* Enhanced Floating Balls Background with theme transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? 'dark-balls' : 'light-balls'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={THEME_TRANSITION}
        >
          <FloatingBalls
            density={80}
            colors={isDark ? ['#8db1a4', '#2d4f4a', '#ffffff'] : ['#8db1a4', '#2d4f4a', '#dfeoe2']}
            opacity={isDark ? 0.4 : 0.5}
            speed={1}
            size={{ min: 2, max: 6 }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ENHANCED FULL-SCREEN Hero Section */}
      <section className="h-screen w-full flex items-center justify-center overflow-hidden relative">
        
        {/* Enhanced Full-Screen Parallax Background */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ 
            y: heroY, 
            opacity: heroOpacity,
            scale: heroScale,
            rotateX: heroRotateX
          }}
        >
          <motion.div 
            className="absolute inset-0 w-full h-full transition-all duration-700"
            animate={{
              background: isDark 
                ? "linear-gradient(135deg, rgba(10, 15, 29, 1) 0%, rgba(26, 31, 46, 0.95) 50%, rgba(45, 79, 74, 0.8) 100%)"
                : "linear-gradient(135deg, rgba(223, 224, 226, 1) 0%, rgba(255, 255, 255, 0.95) 50%, rgba(184, 188, 195, 0.3) 100%)"
            }}
            transition={THEME_TRANSITION}
          >
            <ParallaxBackground intensity={1.5} />
          </motion.div>
        </motion.div>

        {/* Enhanced Full-Screen 3D Spline Elements */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ 
            y: splineY,
            opacity: heroOpacity,
            scale: splineScale
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isDark ? 'dark-hero' : 'light-hero'}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 1.1, rotateY: -10 }}
              transition={SCENE_TRANSITION}
            >
              {/* Light Mode 3D Scene with enhanced effects */}
              <motion.div
                className="absolute inset-0 w-full h-full"
                animate={{
                  opacity: isDark ? 0 : 1,
                  scale: isDark ? 0.95 : 1,
                  filter: isDark ? "blur(3px) brightness(0.8)" : "blur(0px) brightness(1)",
                  rotateX: isDark ? 5 : 0
                }}
                transition={SCENE_TRANSITION}
              >
                <AboutSplineScene className="w-full h-full" />
              </motion.div>

              {/* Dark Mode 3D Scene with enhanced effects */}
              <motion.div
                className="absolute inset-0 w-full h-full"
                animate={{
                  opacity: isDark ? 1 : 0,
                  scale: isDark ? 1 : 0.95,
                  filter: isDark ? "blur(0px) brightness(1)" : "blur(3px) brightness(0.8)",
                  rotateX: isDark ? 0 : 5
                }}
                transition={SCENE_TRANSITION}
              >
                <SplineScene
                  sceneUrl="https://prod.spline.design/pvM5sSiYV2ivWraz/scene.splinecode"
                  className="w-full h-full"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Enhanced color overlay that changes with theme */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: isDark 
                ? "radial-gradient(circle at 50% 50%, rgba(141, 177, 164, 0.1) 0%, transparent 70%)"
                : "radial-gradient(circle at 50% 50%, rgba(45, 79, 74, 0.1) 0%, transparent 70%)"
            }}
            transition={THEME_TRANSITION}
          />

          {/* Additional parallax layers for richer effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              y: floatingElementsY,
              opacity: floatingElementsOpacity
            }}
          >
            {/* Floating geometric shapes at different speeds */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full opacity-20 dark:opacity-30"
                style={{
                  width: Math.random() * 100 + 50,
                  height: Math.random() * 100 + 50,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: isDark ? '#8db1a4' : '#2d4f4a',
                }}
                animate={{
                  y: [0, -50, 0],
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 15 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Hero Content */}
        <motion.div 
          className="relative z-20 text-center w-full max-w-7xl mx-auto px-6"
          style={{
            y: contentY,
            opacity: contentOpacity
          }}
        >
          <motion.h1
            className={`${title({ size: "lg" })} mb-8`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              textShadow: isDark ? '0 4px 30px rgba(141, 177, 164, 0.3)' : '0 4px 20px rgba(45, 79, 74, 0.2)'
            }}
          >
            About <motion.span 
              className="text-[#2d4f4a] dark:text-[#8db1a4] transition-all duration-700"
              animate={{
                textShadow: isDark 
                  ? "0 0 40px rgba(141, 177, 164, 0.6)" 
                  : "0 0 20px rgba(45, 79, 74, 0.4)"
              }}
              transition={THEME_TRANSITION}
            >
              DIGIVO
            </motion.span>
          </motion.h1>

          <motion.p
            className={`${subtitle()} mb-16 max-w-4xl mx-auto`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              textShadow: isDark ? '0 2px 15px rgba(0,0,0,0.7)' : '0 2px 10px rgba(255,255,255,0.7)'
            }}
          >
            We're a passionate team of digital innovators dedicated to transforming businesses through cutting-edge technology and creative solutions
          </motion.p>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            y: scrollIndicatorY,
            opacity: scrollIndicatorOpacity
          }}
        >
          <motion.div
            className="w-8 h-14 border-2 border-white/60 dark:border-[#8db1a4]/60 rounded-full flex justify-center cursor-pointer backdrop-blur-sm bg-white/10 dark:bg-black/20 transition-all duration-700"
            animate={{ 
              y: [0, 8, 0],
              borderColor: isDark ? "rgba(141, 177, 164, 0.6)" : "rgba(255, 255, 255, 0.6)"
            }}
            transition={{ 
              y: { duration: 2, repeat: Infinity },
              borderColor: THEME_TRANSITION
            }}
            whileHover={{ scale: 1.1 }}
            onClick={() => scrollToSection('.about-content')}
          >
            <motion.div 
              className="w-2 h-5 bg-white/80 dark:bg-[#8db1a4]/80 rounded-full mt-3 transition-all duration-700"
              animate={{ 
                y: [0, 6, 0], 
                opacity: [1, 0.3, 1],
                backgroundColor: isDark ? "rgba(141, 177, 164, 0.8)" : "rgba(255, 255, 255, 0.8)"
              }}
              transition={{ 
                y: { duration: 2, repeat: Infinity },
                opacity: { duration: 2, repeat: Infinity },
                backgroundColor: THEME_TRANSITION
              }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="about-content py-24 lg:py-32 bg-[#dfeoe2] dark:bg-[#1a1f2e] transition-all duration-700">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={THEME_TRANSITION}
          >
            <h2 className={`${title()} mb-6`}>
              Our <span className="text-[#2d4f4a] dark:text-[#8db1a4] transition-all duration-700">Impact</span>
            </h2>
            <p className={`${subtitle()} max-w-2xl mx-auto`}>
              Numbers that reflect our commitment to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center bg-white/95 dark:bg-[#0a0f1d]/95 rounded-2xl p-8 shadow-lg backdrop-blur-sm border border-[#dfeoe2] dark:border-[#2d4f4a] hover:border-[#8db1a4] dark:hover:border-[#8db1a4] transition-all duration-700 hover:shadow-2xl dark:hover:shadow-2xl dark:hover:shadow-[#8db1a4]/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.15, 
                  duration: 0.8,
                  ease: THEME_TRANSITION.ease
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
              >
                <AnimatedCounter 
                  target={stat.number} 
                  suffix={stat.suffix}
                />
                <p className="text-[#787a84] dark:text-[#b8bcc3] mt-2 font-medium transition-all duration-700">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Story Section */}
      <section className="py-24 lg:py-32 px-6 bg-white dark:bg-[#0a0f1d] transition-all duration-700">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={THEME_TRANSITION}
            >
              <h2 className={`${title()} mb-6`}>
                Our <span className="text-[#2d4f4a] dark:text-[#8db1a4] transition-all duration-700">Story</span>
              </h2>
              
              <div className="space-y-6 text-[#787a84] dark:text-[#b8bcc3] leading-relaxed transition-all duration-700">
                <p>
                  Founded in 2019 in the heart of Bhopal, DIGIVO emerged from a simple yet powerful vision: 
                  to bridge the gap between innovative technology and real-world business solutions.
                </p>
                
                <p>
                  What started as a small team of passionate developers and designers has grown into a 
                  comprehensive digital agency that serves clients globally while maintaining our commitment 
                  to local excellence and personal relationships.
                </p>
                
                <p>
                  Today, we combine the agility of a startup with the expertise of seasoned professionals, 
                  delivering cutting-edge solutions that drive digital transformation across industries.
                </p>
              </div>

              <motion.div 
                className="mt-8" 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  as={Link}
                  href="/contact"
                  size="lg"
                  className="bg-[#2d4f4a] dark:bg-[#8db1a4] text-white dark:text-[#0a0f1d] hover:bg-[#8db1a4] dark:hover:bg-[#2d4f4a] hover:text-white px-8 py-4 font-semibold transition-all duration-700"
                  radius="lg"
                >
                  Work With Us
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={THEME_TRANSITION}
            >
              <div className="aspect-square rounded-2xl overflow-hidden border border-[#dfeoe2] dark:border-[#2d4f4a] shadow-lg transition-all duration-700">
                <SplineScene
                  sceneUrl="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Team Section */}
      <section className="py-24 lg:py-32 px-6 bg-white dark:bg-[#0a0f1d] transition-all duration-700">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={THEME_TRANSITION}
          >
            <h2 className={`${title()} mb-6`}>
              Meet Our <span className="text-[#2d4f4a] dark:text-[#8db1a4] transition-all duration-700">Team</span>
            </h2>
            <p className={`${subtitle()} max-w-2xl mx-auto`}>
              The passionate individuals behind our success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Values Section */}
      <ValuesSection />

      {/* Enhanced CTA Section */}
      <section className="py-24 lg:py-32 px-6 bg-[#dfeoe2] dark:bg-[#1a1f2e] transition-all duration-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className={`${title()} mb-6`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={THEME_TRANSITION}
          >
            Ready to <span className="text-[#2d4f4a] dark:text-[#8db1a4] transition-all duration-700">Collaborate</span>?
          </motion.h2>
          
          <motion.p
            className={`${subtitle()} mb-12`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...THEME_TRANSITION, delay: 0.2 }}
          >
            Let's discuss how our expertise can help transform your digital presence and drive your business forward
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...THEME_TRANSITION, delay: 0.4 }}
          >
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                as={Link}
                href="/contact"
                size="lg"
                className="bg-[#2d4f4a] dark:bg-[#8db1a4] text-white dark:text-[#0a0f1d] hover:bg-[#8db1a4] dark:hover:bg-[#2d4f4a] hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-700"
                radius="lg"
              >
                Start a Project
              </Button>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                as={Link}
                href="/services"
                variant="bordered"
                size="lg"
                className="border-2 border-[#2d4f4a] dark:border-[#8db1a4] text-[#2d4f4a] dark:text-[#8db1a4] hover:bg-[#2d4f4a] dark:hover:bg-[#8db1a4] hover:text-white dark:hover:text-[#0a0f1d] px-8 py-4 text-lg font-semibold transition-all duration-700"
                radius="lg"
              >
                View Our Services
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}