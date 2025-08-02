"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
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

// Title utility functions
const title = ({ size = "md" }: { size?: "sm" | "md" | "lg" } = {}) => {
  const sizeClasses = {
    sm: "text-2xl sm:text-3xl lg:text-4xl",
    md: "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl", 
    lg: "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl"
  };
  return `tracking-tight inline font-semibold ${sizeClasses[size]} text-[#0a0f1d] dark:text-white transition-colors duration-500`;
};

const subtitle = () => "w-full text-base sm:text-lg lg:text-xl xl:text-2xl text-[#787a84] dark:text-[#b8bcc3] block max-w-full transition-colors duration-500";

// Animated Counter Component
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
        
        // Smooth easing
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeOutCubic * target));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, target, duration]);

  return <span ref={ref} className="text-4xl lg:text-6xl font-bold text-[#2d4f4a] dark:text-[#8db1a4]">{count}{suffix}</span>;
}

// Team Member Card Component
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
          duration: 0.6,
          delay: index * 0.1,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      } : {}}
      whileHover={{
        y: -8,
        rotateY: 5,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="h-full transform-gpu"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-full bg-white/95 dark:bg-[#1a1f2e]/95 backdrop-blur-sm border border-[#dfeoe2] dark:border-[#2d4f4a] hover:border-[#8db1a4] transition-all duration-500 hover:shadow-2xl group rounded-xl p-6 text-center overflow-hidden relative">
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${member.color || '#8db1a4'}15, transparent 70%)`
          }}
        />

        <div className="relative z-10">
          {/* Avatar */}
          <motion.div
            className="w-24 h-24 bg-gradient-to-br from-[#2d4f4a] to-[#8db1a4] dark:from-[#8db1a4] dark:to-[#2d4f4a] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            animate={isHovered ? { rotateY: [0, 360] } : {}}
            transition={{ duration: 2 }}
          >
            {member.initials}
          </motion.div>
          
          <h3 className="text-xl font-semibold text-[#0a0f1d] dark:text-white mb-2 group-hover:text-[#2d4f4a] dark:group-hover:text-[#8db1a4] transition-colors">
            {member.name}
          </h3>
          
          <p className="text-[#8db1a4] dark:text-[#8db1a4] font-medium mb-3">
            {member.role}
          </p>
          
          <p className="text-[#787a84] dark:text-[#d1d5db] text-sm leading-relaxed mb-4">
            {member.bio}
          </p>
          
          <div className="flex justify-center flex-wrap gap-2">
            {member.skills.map((skill: string, idx: number) => (
              <motion.span
                key={idx}
                className="px-2 py-1 bg-[#dfeoe2] dark:bg-[#374151] text-[#2d4f4a] dark:text-[#e5e7eb] text-xs rounded-full font-medium"
                whileHover={{ scale: 1.05, backgroundColor: "#8db1a4", color: "white" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 + idx * 0.05 }}
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

// Values Section Component
function ValuesSection() {
  const ref = useRef(null);
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

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

  if (!mounted) return null;

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-[#0a0f1d] text-white relative overflow-hidden">
      {/* Background 3D Scene with parallax */}
      <motion.div
        className="absolute inset-0 opacity-15 dark:opacity-25"
        style={{ y }}
      >
        {/* Light Mode Scene */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{ opacity: isDark ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <SplineScene
            sceneUrl="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
            className="w-full h-full"
          />
        </motion.div>

        {/* Dark Mode Scene */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{ opacity: isDark ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <SplineScene
            sceneUrl="https://prod.spline.design/pvM5sSiYV2ivWraz/scene.splinecode"
            className="w-full h-full"
          />
        </motion.div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-semibold text-white mb-6">
            Our Core <span className="text-[#8db1a4]">Values</span>
          </h2>
          <p className="text-lg lg:text-xl text-[#b8bcc3] max-w-2xl mx-auto">
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
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="text-4xl mb-4 inline-block"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {value.icon}
              </motion.div>
              
              <h3 className="text-xl font-semibold mb-4 group-hover:text-[#8db1a4] transition-colors">
                {value.title}
              </h3>
              
              <p className="text-[#b8bcc3] leading-relaxed text-sm">
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

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  // Scroll progress for hero parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

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

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="min-h-screen bg-white dark:bg-[#0a0f1d] relative">
      {/* Floating Balls Background */}
      <FloatingBalls
        density={80}
        colors={isDark ? ['#8db1a4', '#2d4f4a', '#ffffff'] : ['#8db1a4', '#2d4f4a', '#dfeoe2']}
        opacity={isDark ? 0.3 : 0.4}
        speed={1}
        size={{ min: 2, max: 6 }}
      />

      {/* FULL-SCREEN Hero Section */}
      <section className="h-screen w-full flex items-center justify-center overflow-hidden relative">
        {/* Full-Screen Parallax Background */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#dfeoe2] via-white to-[#b8bcc3]/20 dark:from-[#0a0f1d] dark:via-[#1a1f2e] dark:to-[#2d4f4a]/20 transition-all duration-700">
            <ParallaxBackground />
          </div>
        </motion.div>

        {/* Full-Screen 3D Spline Elements */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Light Mode 3D Scene */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            animate={{
              opacity: isDark ? 0 : 1,
              scale: isDark ? 0.98 : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            <AboutSplineScene className="w-full h-full" />
          </motion.div>

          {/* Dark Mode 3D Scene */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            animate={{
              opacity: isDark ? 1 : 0,
              scale: isDark ? 1 : 0.98,
            }}
            transition={{ duration: 0.5 }}
          >
            <SplineScene
              sceneUrl="https://prod.spline.design/pvM5sSiYV2ivWraz/scene.splinecode"
              className="w-full h-full"
            />
          </motion.div>
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-20 text-center w-full max-w-7xl mx-auto px-6">
          <motion.h1
            className={`${title({ size: "lg" })} mb-8`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              textShadow: isDark ? '0 4px 20px rgba(0,0,0,0.8)' : '0 4px 20px rgba(255,255,255,0.8)'
            }}
          >
            About <span className="text-[#2d4f4a] dark:text-[#8db1a4]">DIGIVO</span>
          </motion.h1>

          <motion.p
            className={`${subtitle()} mb-16 max-w-4xl mx-auto`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.7)' : '0 2px 10px rgba(255,255,255,0.7)'
            }}
          >
            We're a passionate team of digital innovators dedicated to transforming businesses through cutting-edge technology and creative solutions
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-8 h-14 border-2 border-white/60 dark:border-[#8db1a4]/60 rounded-full flex justify-center cursor-pointer backdrop-blur-sm bg-white/10 dark:bg-black/20"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            whileHover={{ scale: 1.1 }}
            onClick={() => scrollToSection('.about-content')}
          >
            <motion.div 
              className="w-2 h-5 bg-white/80 dark:bg-[#8db1a4]/80 rounded-full mt-3"
              animate={{ y: [0, 6, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="about-content py-24 lg:py-32 bg-[#dfeoe2] dark:bg-[#1a1f2e]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`${title()} mb-6`}>
              Our <span className="text-[#2d4f4a] dark:text-[#8db1a4]">Impact</span>
            </h2>
            <p className={`${subtitle()} max-w-2xl mx-auto`}>
              Numbers that reflect our commitment to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center bg-white/95 dark:bg-[#0a0f1d]/95 rounded-2xl p-8 shadow-lg backdrop-blur-sm border border-[#dfeoe2] dark:border-[#2d4f4a]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <AnimatedCounter 
                  target={stat.number} 
                  suffix={stat.suffix}
                />
                <p className="text-[#787a84] dark:text-[#b8bcc3] mt-2 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 lg:py-32 px-6 bg-white dark:bg-[#0a0f1d]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={`${title()} mb-6`}>
                Our <span className="text-[#2d4f4a] dark:text-[#8db1a4]">Story</span>
              </h2>
              
              <div className="space-y-6 text-[#787a84] dark:text-[#b8bcc3] leading-relaxed">
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

              <motion.div className="mt-8" whileHover={{ scale: 1.05 }}>
                <Button
                  as={Link}
                  href="/contact"
                  size="lg"
                  className="bg-[#2d4f4a] dark:bg-[#8db1a4] text-white dark:text-[#0a0f1d] hover:bg-[#8db1a4] dark:hover:bg-[#2d4f4a] px-8 py-4 font-semibold"
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
            >
              <div className="aspect-square rounded-2xl overflow-hidden">
                <SplineScene
                  sceneUrl="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 lg:py-32 px-6 bg-white dark:bg-[#0a0f1d]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`${title()} mb-6`}>
              Meet Our <span className="text-[#2d4f4a] dark:text-[#8db1a4]">Team</span>
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

      {/* Values Section */}
      <ValuesSection />

      {/* CTA Section */}
      <section className="py-24 lg:py-32 px-6 bg-[#dfeoe2] dark:bg-[#1a1f2e]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className={`${title()} mb-6`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to <span className="text-[#2d4f4a] dark:text-[#8db1a4]">Collaborate</span>?
          </motion.h2>
          
          <motion.p
            className={`${subtitle()} mb-12`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Let's discuss how our expertise can help transform your digital presence and drive your business forward
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                as={Link}
                href="/contact"
                size="lg"
                className="bg-[#2d4f4a] dark:bg-[#8db1a4] text-white dark:text-[#0a0f1d] hover:bg-[#8db1a4] dark:hover:bg-[#2d4f4a] px-8 py-4 text-lg font-semibold"
                radius="lg"
              >
                Start a Project
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                as={Link}
                href="/services"
                variant="bordered"
                size="lg"
                className="border-2 border-[#2d4f4a] dark:border-[#8db1a4] text-[#2d4f4a] dark:text-[#8db1a4] hover:bg-[#2d4f4a] dark:hover:bg-[#8db1a4] hover:text-white dark:hover:text-[#0a0f1d] px-8 py-4 text-lg font-semibold"
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