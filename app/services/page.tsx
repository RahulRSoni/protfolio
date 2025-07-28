"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { title, subtitle } from "@/components/primitives";
import { ServiceSplineScene, SplineScene } from "@/components/spline-scene";
import dynamic from "next/dynamic";

// Dynamic imports for performance
const ParallaxBackground = dynamic(() => import("@/components/parallax-background"), {
  ssr: false
});

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  technologies: string[];
  gradient: string;
  splineUrl?: string;
}

const services: Service[] = [
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
    gradient: "from-blue-500 to-cyan-500",
    splineUrl: "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
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
    gradient: "from-green-500 to-emerald-500"
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
    gradient: "from-purple-500 to-pink-500"
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
    gradient: "from-cyan-500 to-blue-500"
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
    gradient: "from-purple-500 to-indigo-500"
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
    gradient: "from-orange-500 to-red-500"
  }
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
        y: -10,
        rotateX: 5,
        rotateY: 5,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="transform-gpu h-full"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <div className="h-full bg-white/80 backdrop-blur-sm border border-[#dfeoe2] hover:border-[#8db1a4] transition-all duration-500 hover:shadow-2xl group rounded-xl p-8">
        {/* Service Icon */}
        <motion.div
          className="text-5xl mb-6 inline-block"
          whileHover={{ scale: 1.2, rotate: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {service.icon}
        </motion.div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-[#0a0f1d] mb-4 group-hover:text-[#2d4f4a] transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-[#787a84] leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Features */}
        <div className="mb-6">
          <h4 className="font-semibold text-[#2d4f4a] mb-3">Key Features:</h4>
          <ul className="space-y-2">
            {service.features.map((feature, idx) => (
              <motion.li
                key={idx}
                className="flex items-center text-sm text-[#787a84]"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 + idx * 0.05 }}
              >
                <motion.span
                  className="w-2 h-2 bg-[#8db1a4] rounded-full mr-3 flex-shrink-0"
                  whileHover={{ scale: 1.5 }}
                />
                {feature}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div className="mb-6">
          <h4 className="font-semibold text-[#2d4f4a] mb-3">Technologies:</h4>
          <div className="flex flex-wrap gap-2">
            {service.technologies.map((tech, idx) => (
              <motion.span
                key={idx}
                className="px-3 py-1 bg-[#dfeoe2] text-[#2d4f4a] text-xs rounded-full font-medium"
                whileHover={{ scale: 1.05, backgroundColor: "#8db1a4", color: "white" }}
                transition={{ duration: 0.2 }}
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
            className="w-full bg-[#2d4f4a] text-white hover:bg-[#8db1a4] transition-colors"
            radius="lg"
          >
            Learn More
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ProcessSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const processes = [
    { step: "01", title: "Discovery", description: "Understanding your goals and requirements" },
    { step: "02", title: "Strategy", description: "Developing the optimal technical approach" },
    { step: "03", title: "Design", description: "Creating user-centered interface designs" },
    { step: "04", title: "Development", description: "Building with cutting-edge technologies" },
    { step: "05", title: "Testing", description: "Ensuring quality and performance" },
    { step: "06", title: "Launch", description: "Deploying and monitoring your solution" }
  ];

  return (
    <section ref={ref} className="py-32 bg-[#0a0f1d] text-white relative overflow-hidden">
      {/* Background 3D Scene */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ y }}
      >
        <SplineScene
          sceneUrl="https://prod.spline.design/pvM5sSiYV2ivWraz/scene.splinecode"
          className="w-full h-full"
        />
      </motion.div>

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
          <p className={`${subtitle()} text-[#b8bcc3]`}>
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
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {process.step}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-[#8db1a4] transition-colors">
                {process.title}
              </h3>
              <p className="text-[#b8bcc3] text-sm leading-relaxed">
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

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
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
          <motion.h1
            className={`${title({ size: "lg" })} text-[#0a0f1d] mb-6`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our <span className="text-[#2d4f4a]">Services</span>
          </motion.h1>

          <motion.p
            className={`${subtitle()} text-[#787a84] mb-12`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Comprehensive digital solutions that drive innovation and growth across multiple platforms and technologies
          </motion.p>

          {/* Featured 3D Scene */}
          <motion.div
            className="w-full max-w-2xl h-96 mx-auto rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <ServiceSplineScene className="w-full h-full" />
          </motion.div>
        </div>
      </motion.section>

      {/* Services Grid */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
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
          <p className={`${subtitle()} text-[#787a84]`}>
            Expert solutions across the digital spectrum
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </section>

      {/* Process Section */}
      <ProcessSection />

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
            Ready to Start Your <span className="text-[#2d4f4a]">Project</span>?
          </motion.h2>
          
          <motion.p
            className={`${subtitle()} text-[#787a84] mb-12`}
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
                className="bg-[#2d4f4a] text-white hover:bg-[#8db1a4] px-8 py-4 text-lg font-semibold"
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
                className="border-2 border-[#2d4f4a] text-[#2d4f4a] hover:bg-[#2d4f4a] hover:text-white px-8 py-4 text-lg font-semibold"
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