"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

// Dynamic imports for Spline components
const ServiceSplineScene = dynamic(() => import("@/components/spline-scene").then(mod => mod.ServiceSplineScene), {
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

// Service Card Component
function ServiceCard({ service, index }: { service: any; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          delay: index * 0.1,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      } : {}}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-full bg-white/95 dark:bg-[#1a1f2e]/95 backdrop-blur-sm border border-[#dfeoe2] dark:border-[#2d4f4a] hover:border-[#8db1a4] transition-all duration-500 hover:shadow-2xl group rounded-xl p-6 lg:p-8 overflow-hidden relative">
        {/* Hover background effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${service.color}15, transparent 70%)`
          }}
        />

        <div className="relative z-10">
          {/* Service Icon */}
          <motion.div
            className="text-5xl lg:text-6xl mb-6 inline-block"
            animate={isHovered ? { rotateY: [0, 360] } : {}}
            transition={{ duration: 2 }}
          >
            {service.icon}
          </motion.div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0a0f1d] dark:text-white mb-4 group-hover:text-[#2d4f4a] dark:group-hover:text-[#8db1a4] transition-colors">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-[#787a84] dark:text-[#e5e7eb] leading-relaxed mb-6 text-base lg:text-lg">
            {service.description}
          </p>

          {/* Features */}
          <div className="mb-6">
            <h4 className="font-semibold text-[#2d4f4a] dark:text-[#8db1a4] mb-3 text-lg">Key Features:</h4>
            <ul className="space-y-2">
              {service.features.map((feature: string, idx: number) => (
                <motion.li
                  key={idx}
                  className="flex items-center text-[#787a84] dark:text-[#d1d5db] text-sm sm:text-base"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1 + idx * 0.05 }}
                >
                  <motion.span
                    className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-3 flex-shrink-0"
                    style={{ backgroundColor: service.color }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: idx * 0.2 }}
                  />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="mb-8">
            <h4 className="font-semibold text-[#2d4f4a] dark:text-[#8db1a4] mb-3 text-lg">Technologies:</h4>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((tech: string, idx: number) => (
                <motion.span
                  key={idx}
                  className="px-3 py-1 bg-[#dfeoe2] dark:bg-[#374151] text-[#2d4f4a] dark:text-[#e5e7eb] text-sm rounded-full font-medium"
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: service.color, 
                    color: "white" 
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.1 + idx * 0.05 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              as={Link}
              href={`/services/${service.id}`}
              className="w-full bg-[#2d4f4a] dark:bg-[#8db1a4] text-white dark:text-[#0a0f1d] hover:bg-[#8db1a4] dark:hover:bg-[#2d4f4a] hover:text-white font-semibold py-4 text-lg"
              radius="lg"
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// Process Section
function ProcessSection() {
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

  const processes = [
    { step: "01", title: "Discovery", description: "Understanding your goals and requirements" },
    { step: "02", title: "Strategy", description: "Developing the optimal technical approach" },
    { step: "03", title: "Design", description: "Creating user-centered interface designs" },
    { step: "04", title: "Development", description: "Building with cutting-edge technologies" },
    { step: "05", title: "Testing", description: "Ensuring quality and performance" },
    { step: "06", title: "Launch", description: "Deploying and monitoring your solution" }
  ];

  if (!mounted) return null;

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-[#0a0f1d] text-white relative overflow-hidden">
      {/* Background 3D Scene with parallax */}
      <motion.div
        className="absolute inset-0 opacity-20 dark:opacity-30"
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
            Our <span className="text-[#8db1a4]">Process</span>
          </h2>
          <p className="text-lg lg:text-xl text-[#b8bcc3] max-w-2xl mx-auto">
            A proven methodology that delivers exceptional results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processes.map((process, index) => (
            <motion.div
              key={process.step}
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="w-16 h-16 bg-[#2d4f4a] rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold group-hover:bg-[#8db1a4] transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                {process.step}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-[#8db1a4] transition-colors">
                {process.title}
              </h3>
              <p className="text-[#b8bcc3] leading-relaxed">
                {process.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
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

  // Smooth scroll function using native Lenis
  const scrollToSection = (selector: string) => {
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Services data
  const services = [
    {
      id: "web",
      title: "Web Development",
      description: "Custom websites and web applications built with cutting-edge technologies for optimal performance and user experience.",
      icon: "🌐",
      features: [
        "Responsive Design & Development",
        "Progressive Web Applications (PWA)",
        "E-commerce Solutions",
        "Content Management Systems",
        "API Integration & Development"
      ],
      technologies: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"],
      color: "#3b82f6"
    },
    {
      id: "mobile",
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications that provide seamless experiences across iOS and Android devices.",
      icon: "📱",
      features: [
        "Native iOS & Android Apps",
        "Cross-Platform Development",
        "App Store Optimization",
        "Push Notifications",
        "Offline Functionality"
      ],
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
      color: "#10b981"
    },
    {
      id: "design",
      title: "UI/UX Design",
      description: "User-centered design solutions that combine aesthetics with functionality to create interfaces users love.",
      icon: "🎨",
      features: [
        "User Research & Analysis",
        "Wireframing & Prototyping",
        "Visual Design Systems",
        "Interaction Design",
        "Usability Testing"
      ],
      technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "Principle"],
      color: "#a855f7"
    },
    {
      id: "cloud",
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and migration services that ensure reliability while reducing operational costs.",
      icon: "☁️",
      features: [
        "Cloud Migration Strategy",
        "Infrastructure as Code",
        "Serverless Architecture",
        "DevOps & CI/CD",
        "Monitoring & Analytics"
      ],
      technologies: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes"],
      color: "#06b6d4"
    },
    {
      id: "ai",
      title: "AI Integration",
      description: "Intelligent automation and machine learning solutions that transform business processes and decision-making.",
      icon: "🤖",
      features: [
        "Machine Learning Models",
        "Natural Language Processing",
        "Computer Vision Solutions",
        "Predictive Analytics",
        "AI-Powered Chatbots"
      ],
      technologies: ["TensorFlow", "PyTorch", "OpenAI", "Python", "MLflow"],
      color: "#8b5cf6"
    },
    {
      id: "strategy",
      title: "Digital Strategy",
      description: "Strategic consulting for digital transformation that aligns technology with business objectives.",
      icon: "📈",
      features: [
        "Digital Transformation Planning",
        "Technology Auditing",
        "Growth Strategy Development",
        "Performance Optimization",
        "Team Training & Support"
      ],
      technologies: ["Analytics", "KPIs", "Roadmapping", "Consulting", "Training"],
      color: "#f97316"
    }
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
            <ServiceSplineScene className="w-full h-full" />
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
            Our <span className="text-[#2d4f4a] dark:text-[#8db1a4]">Services</span>
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
            Comprehensive digital solutions that drive innovation and growth across multiple platforms and technologies
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
            onClick={() => scrollToSection('.services-content')}
          >
            <motion.div 
              className="w-2 h-5 bg-white/80 dark:bg-[#8db1a4]/80 rounded-full mt-3"
              animate={{ y: [0, 6, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Services Content Section */}
      <section className="services-content py-24 lg:py-32 px-6 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={`${title()} mb-6`}>
            What We <span className="text-[#2d4f4a] dark:text-[#8db1a4]">Offer</span>
          </h2>
          <p className={`${subtitle()} max-w-3xl mx-auto`}>
            Expert solutions across the digital spectrum
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </section>

      {/* Process Section */}
      <ProcessSection />

      {/* CTA Section */}
      <section className="py-24 lg:py-32 px-6 bg-[#dfeoe2] dark:bg-[#1a1f2e]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className={`${title()} mb-6`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Start Your <span className="text-[#2d4f4a] dark:text-[#8db1a4]">Project</span>?
          </motion.h2>
          
          <motion.p
            className={`${subtitle()} mb-12`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Let's discuss how we can help transform your digital presence with our comprehensive solutions
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
                Get Started Today
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                as={Link}
                href="/contact"
                variant="bordered"
                size="lg"
                className="border-2 border-[#2d4f4a] dark:border-[#8db1a4] text-[#2d4f4a] dark:text-[#8db1a4] hover:bg-[#2d4f4a] dark:hover:bg-[#8db1a4] hover:text-white dark:hover:text-[#0a0f1d] px-8 py-4 text-lg font-semibold"
                radius="lg"
              >
                Schedule Consultation
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}