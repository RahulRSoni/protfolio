"use client";

import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { title, subtitle } from "@/components/primitives";
import { AboutSplineScene, SplineScene } from "@/components/spline-scene";
import dynamic from "next/dynamic";

// Dynamic imports for performance
const ParallaxBackground = dynamic(() => import("@/components/parallax-background"), {
  ssr: false
});

const FloatingElements = dynamic(() => import("@/components/floating-elements"), {
  ssr: false
});

// Animated Counter Component
function AnimatedCounter({ target, duration = 2000, suffix = "" }: { target: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        setCount(Math.floor(progress * target));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="text-4xl lg:text-6xl font-bold text-[#2d4f4a]">
      {count}{suffix}
    </span>
  );
}

// Team Member Card
function TeamMember({ member, index }: { member: any; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
          type: "spring",
          stiffness: 100
        }
      } : {}}
      whileHover={{
        y: -8,
        rotateY: 5,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="transform-gpu"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <div className="bg-white/80 backdrop-blur-sm border border-[#dfeoe2] hover:border-[#8db1a4] transition-all duration-500 hover:shadow-xl group rounded-xl p-6 text-center">
        <motion.div
          className="w-24 h-24 bg-gradient-to-br from-[#2d4f4a] to-[#8db1a4] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          {member.initials}
        </motion.div>
        
        <h3 className="text-xl font-semibold text-[#0a0f1d] mb-2 group-hover:text-[#2d4f4a] transition-colors">
          {member.name}
        </h3>
        
        <p className="text-[#8db1a4] font-medium mb-3">
          {member.role}
        </p>
        
        <p className="text-[#787a84] text-sm leading-relaxed">
          {member.bio}
        </p>
        
        <div className="flex justify-center space-x-2 mt-4">
          {member.skills.map((skill: string, idx: number) => (
            <motion.span
              key={idx}
              className="px-2 py-1 bg-[#dfeoe2] text-[#2d4f4a] text-xs rounded-full"
              whileHover={{ scale: 1.05, backgroundColor: "#8db1a4", color: "white" }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Values Section
function ValuesSection() {
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

  return (
    <section className="py-32 bg-[#0a0f1d] text-white relative overflow-hidden">
      {/* Background 3D Scene */}
      <div className="absolute inset-0 opacity-10">
        <SplineScene
          sceneUrl="https://prod.spline.design/pvM5sSiYV2ivWraz/scene.splinecode"
          className="w-full h-full"
        />
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
            Our Core <span className="text-[#8db1a4]">Values</span>
          </h2>
          <p className={`${subtitle()} text-[#b8bcc3]`}>
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseXSpring = useSpring(0, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(0, { stiffness: 300, damping: 30 });

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
      mouseXSpring.set(x * 20);
      mouseYSpring.set(y * 20);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseXSpring, mouseYSpring]);

  // Sample team data
  const teamMembers = [
    {
      name: "Alex Thompson",
      role: "Founder & CEO",
      initials: "AT",
      bio: "Visionary leader with 10+ years in digital transformation",
      skills: ["Strategy", "Leadership", "Innovation"]
    },
    {
      name: "Sarah Chen",
      role: "Lead Developer",
      initials: "SC",
      bio: "Full-stack expert specializing in modern web technologies",
      skills: ["React", "Node.js", "Cloud"]
    },
    {
      name: "Marcus Rodriguez",
      role: "UI/UX Designer",
      initials: "MR",
      bio: "Creative designer focused on user-centered design solutions",
      skills: ["Design", "Prototyping", "Research"]
    },
    {
      name: "Emily Watson",
      role: "Project Manager",
      initials: "EW",
      bio: "Agile project management expert ensuring seamless delivery",
      skills: ["Agile", "Planning", "Communication"]
    }
  ];

  const stats = [
    { number: 150, label: "Projects Completed", suffix: "+" },
    { number: 95, label: "Client Satisfaction", suffix: "%" },
    { number: 50, label: "Happy Clients", suffix: "+" },
    { number: 5, label: "Years Experience", suffix: "+" }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Parallax Background */}
        <div className="absolute inset-0">
          <ParallaxBackground />
          <FloatingElements mouseX={mouseXSpring} mouseY={mouseYSpring} />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
          <motion.h1
            className={`${title({ size: "lg" })} text-[#0a0f1d] mb-6`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About <span className="text-[#2d4f4a]">DigitalCraft</span>
          </motion.h1>

          <motion.p
            className={`${subtitle()} text-[#787a84] mb-12`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            We're a passionate team of digital innovators dedicated to transforming businesses through cutting-edge technology and creative solutions
          </motion.p>

          {/* Featured 3D Scene */}
          <motion.div
            className="w-full max-w-2xl h-96 mx-auto rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <AboutSplineScene className="w-full h-full" />
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-32 bg-[#dfeoe2]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className={`${title()} text-[#0a0f1d] mb-6`}>
              Our <span className="text-[#2d4f4a]">Impact</span>
            </h2>
            <p className={`${subtitle()} text-[#787a84]`}>
              Numbers that reflect our commitment to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center bg-white rounded-2xl p-8 shadow-lg"
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
                <p className="text-[#787a84] mt-2 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className={`${title()} text-[#0a0f1d] mb-6`}>
                Our <span className="text-[#2d4f4a]">Story</span>
              </h2>
              
              <div className="space-y-6 text-[#787a84] leading-relaxed">
                <p>
                  Founded in 2019 in the heart of Bhopal, DigitalCraft emerged from a simple yet powerful vision: 
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
                  className="bg-[#2d4f4a] text-white hover:bg-[#8db1a4] px-8 py-4"
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
              transition={{ duration: 0.8 }}
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
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className={`${title()} text-[#0a0f1d] mb-6`}>
              Meet Our <span className="text-[#2d4f4a]">Team</span>
            </h2>
            <p className={`${subtitle()} text-[#787a84]`}>
              The passionate individuals behind our success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <ValuesSection />

      {/* CTA Section */}
      <section className="py-32 px-6 bg-[#dfeoe2]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className={`${title()} text-[#0a0f1d] mb-6`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to <span className="text-[#2d4f4a]">Collaborate</span>?
          </motion.h2>
          
          <motion.p
            className={`${subtitle()} text-[#787a84] mb-12`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Let's discuss how our expertise can help transform your digital presence and drive your business forward
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
                className="bg-[#2d4f4a] text-white hover:bg-[#8db1a4] px-8 py-4 text-lg font-semibold"
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
                className="border-2 border-[#2d4f4a] text-[#2d4f4a] hover:bg-[#2d4f4a] hover:text-white px-8 py-4 text-lg font-semibold"
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