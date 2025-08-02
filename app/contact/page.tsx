"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

// Dynamic imports for Spline components
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

// Custom Textarea Component
function Textarea({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  required = false, 
  minRows = 3,
  classNames = {},
  radius = "lg"
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  minRows?: number;
  classNames?: {
    label?: string;
    input?: string;
    inputWrapper?: string;
  };
  radius?: string;
}) {
  return (
    <div className="space-y-2">
      <label className={`text-sm font-medium ${classNames.label || 'text-[#2d4f4a] dark:text-[#8db1a4]'}`}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        rows={minRows}
        className={`w-full p-4 text-base resize-y min-h-[120px] rounded-lg outline-none transition-colors ${
          classNames.inputWrapper || 'bg-white/95 dark:bg-[#1a1f2e]/95 border border-[#dfeoe2] dark:border-[#2d4f4a] hover:border-[#8db1a4] focus:border-[#8db1a4]'
        } ${classNames.input || 'text-[#0a0f1d] dark:text-white'}`}
      />
    </div>
  );
}

// Contact Form Component
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    budget: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        service: "",
        budget: "",
        message: ""
      });
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 2000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Name and Email Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Input
            label="Full Name"
            placeholder="Your full name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
            classNames={{
              label: "text-[#2d4f4a] dark:text-[#8db1a4] font-semibold",
              input: "text-[#0a0f1d] dark:text-white",
              inputWrapper: "bg-white/95 dark:bg-[#1a1f2e]/95 border border-[#dfeoe2] dark:border-[#2d4f4a] hover:border-[#8db1a4] focus-within:border-[#8db1a4] transition-colors"
            }}
            radius="lg"
            size="lg"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Input
            label="Email Address"
            placeholder="your.email@company.com"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
            classNames={{
              label: "text-[#2d4f4a] dark:text-[#8db1a4] font-semibold",
              input: "text-[#0a0f1d] dark:text-white",
              inputWrapper: "bg-white/95 dark:bg-[#1a1f2e]/95 border border-[#dfeoe2] dark:border-[#2d4f4a] hover:border-[#8db1a4] focus-within:border-[#8db1a4] transition-colors"
            }}
            radius="lg"
            size="lg"
          />
        </motion.div>
      </div>

      {/* Company and Phone Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Input
            label="Company Name"
            placeholder="Your company name"
            value={formData.company}
            onChange={(e) => handleChange('company', e.target.value)}
            classNames={{
              label: "text-[#2d4f4a] dark:text-[#8db1a4] font-semibold",
              input: "text-[#0a0f1d] dark:text-white",
              inputWrapper: "bg-white/95 dark:bg-[#1a1f2e]/95 border border-[#dfeoe2] dark:border-[#2d4f4a] hover:border-[#8db1a4] focus-within:border-[#8db1a4] transition-colors"
            }}
            radius="lg"
            size="lg"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Input
            label="Phone Number"
            placeholder="+1 (555) 000-0000"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            classNames={{
              label: "text-[#2d4f4a] dark:text-[#8db1a4] font-semibold",
              input: "text-[#0a0f1d] dark:text-white",
              inputWrapper: "bg-white/95 dark:bg-[#1a1f2e]/95 border border-[#dfeoe2] dark:border-[#2d4f4a] hover:border-[#8db1a4] focus-within:border-[#8db1a4] transition-colors"
            }}
            radius="lg"
            size="lg"
          />
        </motion.div>
      </div>

      {/* Service and Budget Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="space-y-2">
            <label className="text-[#2d4f4a] dark:text-[#8db1a4] font-semibold text-sm">Service Interest</label>
            <select
              value={formData.service}
              onChange={(e) => handleChange('service', e.target.value)}
              className="w-full p-4 bg-white/95 dark:bg-[#1a1f2e]/95 border border-[#dfeoe2] dark:border-[#2d4f4a] hover:border-[#8db1a4] focus:border-[#8db1a4] text-[#0a0f1d] dark:text-white rounded-lg outline-none transition-colors"
              required
            >
              <option value="">Select a service</option>
              <option value="web">Web Development</option>
              <option value="mobile">Mobile Development</option>
              <option value="design">UI/UX Design</option>
              <option value="cloud">Cloud Solutions</option>
              <option value="ai">AI Integration</option>
              <option value="strategy">Digital Strategy</option>
              <option value="other">Other</option>
            </select>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="space-y-2">
            <label className="text-[#2d4f4a] dark:text-[#8db1a4] font-semibold text-sm">Project Budget</label>
            <select
              value={formData.budget}
              onChange={(e) => handleChange('budget', e.target.value)}
              className="w-full p-4 bg-white/95 dark:bg-[#1a1f2e]/95 border border-[#dfeoe2] dark:border-[#2d4f4a] hover:border-[#8db1a4] focus:border-[#8db1a4] text-[#0a0f1d] dark:text-white rounded-lg outline-none transition-colors"
            >
              <option value="">Select budget range</option>
              <option value="5k-15k">$5K - $15K</option>
              <option value="15k-30k">$15K - $30K</option>
              <option value="30k-50k">$30K - $50K</option>
              <option value="50k+">$50K+</option>
              <option value="discuss">Let's Discuss</option>
            </select>
          </div>
        </motion.div>
      </div>

      {/* Message Field */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        viewport={{ once: true }}
      >
        <Textarea
          label="Project Details"
          placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          required
          minRows={4}
          classNames={{
            label: "text-[#2d4f4a] dark:text-[#8db1a4] font-semibold",
            input: "text-[#0a0f1d] dark:text-white",
            inputWrapper: "bg-white/95 dark:bg-[#1a1f2e]/95 border border-[#dfeoe2] dark:border-[#2d4f4a] hover:border-[#8db1a4] focus-within:border-[#8db1a4] transition-colors"
          }}
          radius="lg"
        />
      </motion.div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        viewport={{ once: true }}
      >
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className="w-full bg-[#2d4f4a] dark:bg-[#8db1a4] text-white dark:text-[#0a0f1d] hover:bg-[#8db1a4] dark:hover:bg-[#2d4f4a] hover:text-white py-4 text-lg font-semibold shadow-xl"
          radius="lg"
          size="lg"
        >
          {isSubmitting ? "Sending Message..." : "Send Message"}
        </Button>
      </motion.div>

      {/* Success Message */}
      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 px-4 py-3 rounded-lg text-center"
        >
          ✅ Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.
        </motion.div>
      )}
    </motion.form>
  );
}

// Contact Info Card Component
function ContactInfoCard({ icon, title, details, href }: { 
  icon: React.ReactNode; 
  title: string; 
  details: string[]; 
  href?: string; 
}) {
  const content = (
    <motion.div
      className="h-full bg-white/95 dark:bg-[#1a1f2e]/95 backdrop-blur-sm border border-[#dfeoe2] dark:border-[#2d4f4a] hover:border-[#8db1a4] transition-all duration-500 hover:shadow-xl group rounded-xl p-6 text-center cursor-pointer"
      whileHover={{ y: -5, scale: 1.02 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="text-4xl mb-4 inline-block"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {icon}
      </motion.div>
      
      <h3 className="text-xl font-semibold text-[#0a0f1d] dark:text-white mb-3 group-hover:text-[#2d4f4a] dark:group-hover:text-[#8db1a4] transition-colors">
        {title}
      </h3>
      
      <div className="space-y-1">
        {details.map((detail, index) => (
          <p key={index} className="text-[#787a84] dark:text-[#d1d5db] text-sm">
            {detail}
          </p>
        ))}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="block h-full">
        {content}
      </a>
    );
  }

  return content;
}

// FAQ Section Component
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What's your typical project timeline?",
      answer: "Project timelines vary based on complexity. Simple websites take 2-4 weeks, while complex web applications can take 2-6 months. We'll provide a detailed timeline during our initial consultation."
    },
    {
      question: "Do you work with international clients?",
      answer: "Absolutely! We work with clients globally and have experience managing projects across different time zones. We use modern collaboration tools to ensure smooth communication."
    },
    {
      question: "What's included in your development process?",
      answer: "Our process includes discovery, strategy, design, development, testing, and launch. We also provide ongoing support and maintenance options to keep your solution running smoothly."
    },
    {
      question: "Do you provide ongoing support after launch?",
      answer: "Yes, we offer various support and maintenance packages to ensure your digital solution stays updated, secure, and performs optimally. We're here for the long term."
    },
    {
      question: "Can you help with existing projects?",
      answer: "Definitely! We can audit existing projects, provide optimization recommendations, add new features, or completely rebuild solutions using modern technologies."
    }
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          className="bg-white/95 dark:bg-[#1a1f2e]/95 backdrop-blur-sm border border-[#dfeoe2] dark:border-[#2d4f4a] rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="w-full p-6 text-left flex justify-between items-center hover:bg-[#dfeoe2]/50 dark:hover:bg-[#2d4f4a]/20 transition-colors"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <h3 className="text-lg font-semibold text-[#0a0f1d] dark:text-white pr-4">
              {faq.question}
            </h3>
            <motion.div
              className="text-[#8db1a4] text-2xl font-bold"
              animate={{ rotate: openIndex === index ? 45 : 0 }}
              transition={{ duration: 0.2 }}
            >
              +
            </motion.div>
          </motion.button>
          
          <motion.div
            initial={false}
            animate={{
              height: openIndex === index ? "auto" : 0,
              opacity: openIndex === index ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <p className="text-[#787a84] dark:text-[#d1d5db] leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

export default function ContactPage() {
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

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="min-h-screen bg-white dark:bg-[#0a0f1d] relative">
      {/* Floating Balls Background */}
      <FloatingBalls
        density={60}
        colors={isDark ? ['#8db1a4', '#2d4f4a', '#ffffff'] : ['#8db1a4', '#2d4f4a', '#dfeoe2']}
        opacity={isDark ? 0.2 : 0.3}
        speed={1.2}
        size={{ min: 1, max: 4 }}
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
          {/* Adaptive 3D Scene */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{ duration: 0.5 }}
          >
            <SplineScene
              sceneUrl={isDark ? "https://prod.spline.design/pvM5sSiYV2ivWraz/scene.splinecode" : "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"}
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
            Let's <span className="text-[#2d4f4a] dark:text-[#8db1a4]">Connect</span>
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
            Ready to transform your digital presence? Let's discuss your project and create something extraordinary together.
          </motion.p>

          {/* Quick Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => scrollToSection('.contact-form')}
                className="bg-white/15 backdrop-blur-md border border-white/25 text-white font-semibold hover:bg-white hover:text-[#2d4f4a] transition-all duration-500 px-8 py-6 text-lg shadow-2xl"
                radius="full"
                size="lg"
              >
                Start Your Project
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                as="a"
                href="mailto:hello@digivo.com"
                variant="bordered"
                className="border-2 border-white/40 text-white hover:bg-white hover:text-[#2d4f4a] transition-all duration-500 px-8 py-6 text-lg font-semibold backdrop-blur-md shadow-2xl"
                radius="full"
                size="lg"
              >
                Quick Email
              </Button>
            </motion.div>
          </motion.div>
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
            onClick={() => scrollToSection('.contact-content')}
          >
            <motion.div 
              className="w-2 h-5 bg-white/80 dark:bg-[#8db1a4]/80 rounded-full mt-3"
              animate={{ y: [0, 6, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="contact-content py-24 lg:py-32 px-6 bg-white dark:bg-[#0a0f1d]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Contact Form - Takes 2 columns */}
            <div className="lg:col-span-2">
              <motion.div
                className="contact-form bg-white/95 dark:bg-[#1a1f2e]/95 backdrop-blur-sm border border-[#dfeoe2] dark:border-[#2d4f4a] rounded-2xl p-8 lg:p-12 shadow-xl"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className={`${title({ size: "md" })} mb-4`}>
                    Tell Us About Your <span className="text-[#2d4f4a] dark:text-[#8db1a4]">Project</span>
                  </h2>
                  <p className={`${subtitle()}`}>
                    Fill out the form below and we'll get back to you within 24 hours with a detailed response.
                  </p>
                </motion.div>

                <ContactForm />
              </motion.div>
            </div>

            {/* Contact Info & Quick Links */}
            <div className="space-y-8">
              {/* Contact Cards */}
              <div className="space-y-6">
                <ContactInfoCard
                  icon={
                    <div className="w-12 h-12 bg-[#2d4f4a] dark:bg-[#8db1a4] rounded-lg flex items-center justify-center text-white dark:text-[#0a0f1d]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  }
                  title="Email Us"
                  details={["hello@digivo.com", "Response within 24 hours"]}
                  href="mailto:hello@digivo.com"
                />

                <ContactInfoCard
                  icon={
                    <div className="w-12 h-12 bg-[#2d4f4a] dark:bg-[#8db1a4] rounded-lg flex items-center justify-center text-white dark:text-[#0a0f1d]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  }
                  title="Visit Us"
                  details={["Bhopal, Madhya Pradesh", "India"]}
                />

                <ContactInfoCard
                  icon={
                    <div className="w-12 h-12 bg-[#2d4f4a] dark:bg-[#8db1a4] rounded-lg flex items-center justify-center text-white dark:text-[#0a0f1d]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  }
                  title="Business Hours"
                  details={["Mon - Fri: 9:00 AM - 6:00 PM", "IST (UTC +5:30)"]}
                />
              </div>

              {/* Quick Stats */}
              <motion.div
                className="bg-gradient-to-br from-[#2d4f4a] to-[#8db1a4] rounded-2xl p-8 text-white"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold mb-6">Why Choose DIGIVO?</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-bold">✓</span>
                    </div>
                    <span>150+ Successful Projects</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-bold">✓</span>
                    </div>
                    <span>95% Client Satisfaction</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-bold">✓</span>
                    </div>
                    <span>24/7 Support Available</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-bold">✓</span>
                    </div>
                    <span>5+ Years Experience</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 lg:py-32 px-6 bg-[#dfeoe2] dark:bg-[#1a1f2e]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`${title()} mb-6`}>
              Frequently Asked <span className="text-[#2d4f4a] dark:text-[#8db1a4]">Questions</span>
            </h2>
            <p className={`${subtitle()} max-w-2xl mx-auto`}>
              Got questions? We've got answers. Here are some common questions about our services and process.
            </p>
          </motion.div>

          <FAQSection />
        </div>
      </section>

      {/* Process Timeline Section */}
      <section className="py-24 lg:py-32 px-6 bg-white dark:bg-[#0a0f1d]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`${title()} mb-6`}>
              Our <span className="text-[#2d4f4a] dark:text-[#8db1a4]">Process</span>
            </h2>
            <p className={`${subtitle()} max-w-2xl mx-auto`}>
              From initial consultation to final delivery, here's how we bring your vision to life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                step: "01", 
                title: "Discovery", 
                description: "We dive deep into understanding your goals, requirements, and vision through detailed consultations.",
                icon: "🔍"
              },
              { 
                step: "02", 
                title: "Strategy", 
                description: "We develop a comprehensive strategy and roadmap tailored to your specific needs and objectives.",
                icon: "📋"
              },
              { 
                step: "03", 
                title: "Design & Build", 
                description: "Our team creates stunning designs and develops robust solutions using cutting-edge technologies.",
                icon: "🚀"
              },
              { 
                step: "04", 
                title: "Launch & Support", 
                description: "We ensure a smooth launch and provide ongoing support to keep your solution performing optimally.",
                icon: "🎯"
              }
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
                  className="relative mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-20 h-20 bg-[#2d4f4a] dark:bg-[#8db1a4] rounded-full flex items-center justify-center mx-auto mb-4 text-white dark:text-[#0a0f1d] text-2xl font-bold group-hover:bg-[#8db1a4] dark:group-hover:bg-[#2d4f4a] transition-colors">
                    {process.step}
                  </div>
                  <motion.div
                    className="text-3xl absolute -top-2 -right-2"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {process.icon}
                  </motion.div>
                </motion.div>
                
                <h3 className="text-xl font-semibold mb-3 group-hover:text-[#2d4f4a] dark:group-hover:text-[#8db1a4] transition-colors text-[#0a0f1d] dark:text-white">
                  {process.title}
                </h3>
                
                <p className="text-[#787a84] dark:text-[#b8bcc3] leading-relaxed text-sm">
                  {process.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 lg:py-32 px-6 bg-[#0a0f1d] text-white relative overflow-hidden">
        {/* Background 3D Scene */}
        <motion.div
          className="absolute inset-0 opacity-10"
        >
          <SplineScene
            sceneUrl="https://prod.spline.design/pvM5sSiYV2ivWraz/scene.splinecode"
            className="w-full h-full"
          />
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-semibold text-white mb-6">
              Trusted by <span className="text-[#8db1a4]">Growing</span> Businesses
            </h2>
            <p className="text-lg lg:text-xl text-[#b8bcc3] max-w-2xl mx-auto">
              Join the companies that have transformed their digital presence with our solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { number: "150+", label: "Projects Delivered" },
              { number: "50+", label: "Happy Clients" },
              { number: "95%", label: "Satisfaction Rate" },
              { number: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl lg:text-4xl font-bold text-[#8db1a4] mb-2">
                  {stat.number}
                </div>
                <p className="text-[#b8bcc3] text-sm lg:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Testimonial Highlight */}
          <motion.div
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-12 text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-4xl mb-6">💬</div>
            <blockquote className="text-xl lg:text-2xl font-light italic mb-6 text-white leading-relaxed">
              "DIGIVO transformed our digital presence completely. Their team's expertise and dedication to quality is unmatched. We've seen a 300% increase in engagement since launch."
            </blockquote>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-[#8db1a4] rounded-full flex items-center justify-center text-white font-bold mr-4">
                JS
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">John Smith</div>
                <div className="text-[#b8bcc3] text-sm">CEO, TechCorp</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 lg:py-32 px-6 bg-gradient-to-br from-[#dfeoe2] via-white to-[#b8bcc3]/30 dark:from-[#1a1f2e] dark:via-[#0a0f1d] dark:to-[#2d4f4a]/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className={`${title()} mb-8`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Start Your <span className="text-[#2d4f4a] dark:text-[#8db1a4]">Digital Journey</span>?
          </motion.h2>
          
          <motion.p
            className={`${subtitle()} mb-12 max-w-2xl mx-auto`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Don't let your competitors get ahead. Let's discuss how we can transform your digital presence and drive real business results.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => scrollToSection('.contact-form')}
                size="lg"
                className="bg-[#2d4f4a] dark:bg-[#8db1a4] text-white dark:text-[#0a0f1d] hover:bg-[#8db1a4] dark:hover:bg-[#2d4f4a] px-12 py-8 text-lg font-semibold shadow-2xl"
                radius="full"
              >
                Start Your Project Today
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                as="a"
                href="mailto:hello@digivo.com"
                variant="bordered"
                size="lg"
                className="border-2 border-[#2d4f4a] dark:border-[#8db1a4] text-[#2d4f4a] dark:text-[#8db1a4] hover:bg-[#2d4f4a] dark:hover:bg-[#8db1a4] hover:text-white dark:hover:text-[#0a0f1d] px-12 py-8 text-lg font-semibold shadow-xl"
                radius="full"
              >
                Schedule a Call
              </Button>
            </motion.div>
          </motion.div>

          {/* Contact Methods */}
          <motion.div
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="mailto:hello@digivo.com"
              className="flex items-center justify-center p-4 bg-white/95 dark:bg-[#1a1f2e]/95 rounded-xl border border-[#dfeoe2] dark:border-[#2d4f4a] hover:border-[#8db1a4] transition-all duration-300 group"
              whileHover={{ y: -3, scale: 1.02 }}
            >
              <svg className="w-5 h-5 text-[#8db1a4] mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-[#0a0f1d] dark:text-white font-medium">Email Us</span>
            </motion.a>

            <motion.a
              href="tel:+919876543210"
              className="flex items-center justify-center p-4 bg-white/95 dark:bg-[#1a1f2e]/95 rounded-xl border border-[#dfeoe2] dark:border-[#2d4f4a] hover:border-[#8db1a4] transition-all duration-300 group"
              whileHover={{ y: -3, scale: 1.02 }}
            >
              <svg className="w-5 h-5 text-[#8db1a4] mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-[#0a0f1d] dark:text-white font-medium">Call Us</span>
            </motion.a>

            <motion.a
              href="https://wa.me/919876543210"
              className="flex items-center justify-center p-4 bg-white/95 dark:bg-[#1a1f2e]/95 rounded-xl border border-[#dfeoe2] dark:border-[#2d4f4a] hover:border-[#8db1a4] transition-all duration-300 group"
              whileHover={{ y: -3, scale: 1.02 }}
            >
              <svg className="w-5 h-5 text-[#8db1a4] mr-3 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106" />
              </svg>
              <span className="text-[#0a0f1d] dark:text-white font-medium">WhatsApp</span>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}