"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

// Title utility function (since we can't import from primitives)
const title = ({ size = "md" }: { size?: "sm" | "md" | "lg" } = {}) => {
  const sizeClasses = {
    sm: "text-3xl lg:text-4xl",
    md: "text-[2.3rem] lg:text-5xl", 
    lg: "text-4xl lg:text-6xl"
  };
  return `tracking-tight inline font-semibold ${sizeClasses[size]}`;
};

const subtitle = () => "w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full";

// Full-screen 3D Hero Background Component
function HeroSplineBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#dfeoe2] via-white to-[#8db1a4]/20"
        animate={{
          background: [
            "linear-gradient(135deg, #dfeoe2 0%, #ffffff 50%, rgba(141, 177, 164, 0.2) 100%)",
            "linear-gradient(225deg, rgba(141, 177, 164, 0.3) 0%, #ffffff 50%, #2d4f4a 100%)",
            "linear-gradient(315deg, #b8bcc3 0%, #ffffff 50%, rgba(45, 79, 74, 0.2) 100%)",
            "linear-gradient(135deg, #dfeoe2 0%, #ffffff 50%, rgba(141, 177, 164, 0.2) 100%)"
          ]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      
      {/* 3D Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-50, 50, -50],
              x: [-30, 30, -30],
              rotateX: [0, 360],
              rotateY: [0, -360],
              rotateZ: [0, 180],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          >
            <div
              className={`w-${Math.floor(Math.random() * 8) + 8} h-${Math.floor(Math.random() * 8) + 8} rounded-xl backdrop-blur-sm border border-white/20`}
              style={{
                background: ['#8db1a4', '#2d4f4a', '#dfeoe2', '#b8bcc3'][Math.floor(Math.random() * 4)] + '40',
                transform: `perspective(1000px) rotateX(${Math.random() * 60}deg) rotateY(${Math.random() * 60}deg)`,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Particle System */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: ['#8db1a4', '#2d4f4a', '#dfeoe2'][Math.floor(Math.random() * 3)],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-200, 200, -200],
              x: [-100, 100, -100],
              opacity: [0, 1, 0],
              scale: [0, 2, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Glowing Orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full filter blur-3xl"
          style={{
            width: Math.random() * 400 + 200,
            height: Math.random() * 400 + 200,
            background: `radial-gradient(circle, ${['#8db1a4', '#2d4f4a'][i % 2]}30 0%, transparent 70%)`,
            left: `${Math.random() * 120 - 10}%`,
            top: `${Math.random() * 120 - 10}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
            x: [-50, 50, -50],
            y: [-30, 30, -30],
          }}
          transition={{
            duration: 20 + i * 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

// Parallax Background Component
function ParallaxBackground() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Layer 1 - Slowest */}
      <motion.div
        className="absolute inset-0"
        style={{ y: y1 }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`layer1-${i}`}
            className="absolute opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 120}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              backgroundColor: ['#8db1a4', '#2d4f4a'][i % 2],
              borderRadius: i % 2 === 0 ? '50%' : '12px',
              transform: `rotate(${Math.random() * 45}deg)`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </motion.div>

      {/* Layer 2 - Medium */}
      <motion.div
        className="absolute inset-0"
        style={{ y: y2 }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`layer2-${i}`}
            className="absolute opacity-15"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 120}%`,
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              backgroundColor: '#dfeoe2',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            }}
            animate={{
              rotate: [0, -360],
              y: [-20, 20, -20],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      {/* Layer 3 - Fastest */}
      <motion.div
        className="absolute inset-0"
        style={{ y: y3 }}
      >
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`layer3-${i}`}
            className="absolute opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 120}%`,
              width: `${Math.random() * 60 + 30}px`,
              height: `${Math.random() * 60 + 30}px`,
              backgroundColor: '#b8bcc3',
              borderRadius: '8px',
              transform: `rotate(${Math.random() * 45}deg)`,
            }}
            animate={{
              x: [-30, 30, -30],
              y: [-40, 40, -40],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

// Enhanced Service Card Component
function ServiceCard({ service, index }: { service: any; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100, rotateX: -15 }}
      animate={isInView ? {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
          duration: 0.8,
          delay: index * 0.1,
          type: "spring",
          stiffness: 100
        }
      } : {}}
      whileHover={{
        y: -15,
        scale: 1.02,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      className="transform-gpu h-full"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-full bg-white/90 backdrop-blur-sm border border-[#dfeoe2] hover:border-[#8db1a4] transition-all duration-500 hover:shadow-2xl group rounded-2xl p-8 overflow-hidden relative">
        {/* Animated background on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${service.color}15, transparent 70%)`
          }}
        />

        {/* Floating particles within card */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full opacity-0 group-hover:opacity-60"
              style={{
                backgroundColor: service.color,
                left: `${20 + i * 15}%`,
                top: `${10 + i * 15}%`,
              }}
              animate={isHovered ? {
                y: [-10, 10, -10],
                x: [-5, 5, -5],
                scale: [0.5, 1.5, 0.5],
                rotate: [0, 180, 360]
              } : {}}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          {/* Service Icon with 3D effect */}
          <motion.div
            className="text-6xl mb-6 inline-block"
            whileHover={{ 
              scale: 1.2, 
              rotate: 10,
              transition: { type: "spring", stiffness: 300 }
            }}
            animate={isHovered ? {
              rotateY: [0, 360]
            } : {}}
            transition={{ duration: 2 }}
          >
            {service.icon}
          </motion.div>

          {/* Title */}
          <h3 className="text-2xl lg:text-3xl font-bold text-[#0a0f1d] mb-4 group-hover:text-[#2d4f4a] transition-colors">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-[#787a84] leading-relaxed mb-6 text-base lg:text-lg">
            {service.description}
          </p>

          {/* Features */}
          <div className="mb-6">
            <h4 className="font-semibold text-[#2d4f4a] mb-3 text-lg">Key Features:</h4>
            <ul className="space-y-2">
              {service.features.map((feature: string, idx: number) => (
                <motion.li
                  key={idx}
                  className="flex items-center text-[#787a84]"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1 + idx * 0.05 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                >
                  <motion.span
                    className="w-3 h-3 rounded-full mr-3 flex-shrink-0"
                    style={{ backgroundColor: service.color }}
                    whileHover={{ scale: 1.5 }}
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: idx * 0.2
                    }}
                  />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="mb-8">
            <h4 className="font-semibold text-[#2d4f4a] mb-3 text-lg">Technologies:</h4>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((tech: string, idx: number) => (
                <motion.span
                  key={idx}
                  className="px-3 py-1 bg-[#dfeoe2] text-[#2d4f4a] text-sm rounded-full font-medium"
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: service.color, 
                    color: "white" 
                  }}
                  transition={{ duration: 0.2 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  style={{ transitionDelay: `${idx * 0.05}s` }}
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
              className="w-full bg-[#2d4f4a] text-white hover:bg-[#8db1a4] transition-colors font-semibold py-4 text-lg relative overflow-hidden"
              radius="lg"
            >
              <span className="relative z-10">Learn More</span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ scale: 0, opacity: 1 }}
                whileHover={{
                  scale: 2,
                  opacity: 0,
                  transition: { duration: 0.6 }
                }}
                style={{ borderRadius: '50%' }}
              />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

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

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Full-Screen Hero Section */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Full-screen 3D Background */}
        <HeroSplineBackground />

        {/* Hero Content */}
        <div className="relative z-20 text-center max-w-6xl mx-auto px-6">
          <motion.h1
            className={`${title({ size: "lg" })} text-[#0a0f1d] mb-8`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our <span className="text-[#2d4f4a]">Services</span>
          </motion.h1>

          <motion.p
            className={`${subtitle()} text-[#787a84] mb-12 max-w-4xl mx-auto`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Comprehensive digital solutions that drive innovation and growth across multiple platforms and technologies
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                className="bg-[#2d4f4a] text-white hover:bg-[#8db1a4] px-12 py-6 text-lg font-semibold shadow-2xl"
                radius="full"
              >
                Explore All Services
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="bordered"
                size="lg"
                className="border-2 border-[#2d4f4a] text-[#2d4f4a] hover:bg-[#2d4f4a] hover:text-white px-12 py-6 text-lg font-semibold shadow-xl"
                radius="full"
              >
                Get Custom Quote
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Grid Section with Parallax Background */}
      <section className="relative py-32 px-6 bg-white">
        {/* Parallax Background */}
        <ParallaxBackground />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className={`${title()} text-[#0a0f1d] mb-6`}>
              What We <span className="text-[#2d4f4a]">Offer</span>
            </h2>
            <p className={`${subtitle()} text-[#787a84] max-w-3xl mx-auto`}>
              Expert solutions across the digital spectrum
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section with 3D Background */}
      <section className="py-32 bg-[#0a0f1d] text-white relative overflow-hidden">
        {/* 3D Background Animation */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                backgroundColor: ['#8db1a4', '#2d4f4a'][i % 2],
                borderRadius: i % 2 === 0 ? '50%' : '12px',
              }}
              animate={{
                y: [-50, 50, -50],
                x: [-30, 30, -30],
                rotate: [0, 360],
                scale: [0.8, 1.3, 0.8],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className={`${title()} text-white mb-6`}>
              Our <span className="text-[#8db1a4]">Process</span>
            </h2>
            <p className={`${subtitle()} text-[#b8bcc3] max-w-2xl mx-auto`}>
              A proven methodology that delivers exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Discovery", description: "Understanding your goals and requirements" },
              { step: "02", title: "Strategy", description: "Developing the optimal technical approach" },
              { step: "03", title: "Design", description: "Creating user-centered interface designs" },
              { step: "04", title: "Development", description: "Building with cutting-edge technologies" },
              { step: "05", title: "Testing", description: "Ensuring quality and performance" },
              { step: "06", title: "Launch", description: "Deploying and monitoring your solution" }
            ].map((process, index) => (
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
                  whileHover={{ scale: 1.1, rotate: 5 }}
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

      {/* CTA Section */}
      <section className="py-32 px-6 bg-[#dfeoe2] relative overflow-hidden">
        {/* Parallax Background Elements */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-40"
              style={{
                background: `radial-gradient(circle, ${['#8db1a4', '#2d4f4a'][i % 2]}40 0%, transparent 70%)`,
                width: Math.random() * 300 + 200,
                height: Math.random() * 300 + 200,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [-50, 50, -50],
                y: [-30, 30, -30],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h2
            className={`${title()} text-[#0a0f1d] mb-6`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to Start Your <span className="text-[#2d4f4a]">Project</span>?
          </motion.h2>
          
          <motion.p
            className={`${subtitle()} text-[#787a84] mb-12 max-w-3xl mx-auto`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Let's discuss how we can help transform your digital presence with our comprehensive solutions
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                as={Link}
                href="/contact"
                size="lg"
                className="bg-[#2d4f4a] text-white hover:bg-[#8db1a4] px-8 py-4 text-lg font-semibold shadow-2xl relative overflow-hidden"
                radius="lg"
              >
                <span className="relative z-10">Get Started Today</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                as={Link}
                href="/contact"
                variant="bordered"
                size="lg"
                className="border-2 border-[#2d4f4a] text-[#2d4f4a] hover:bg-[#2d4f4a] hover:text-white px-8 py-4 text-lg font-semibold shadow-xl"
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