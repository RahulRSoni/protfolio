import React, { useRef, useEffect, useState } from "react";
import Counter from "../components/counter";
import TestimonialsCarousel from "../components/testimonials-carousel";

// Simple typewriter effect
function Typewriter({ text, speed = 60 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return <span>{displayed}<span className="animate-pulse">|</span></span>;
}

export default function HomePage() {
  // Parallax effect state
  const [scrollY, setScrollY] = useState(0);
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Custom cursor state
  const [cursor, setCursor] = useState({ x: 0, y: 0, active: false });
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax scroll
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Cursor movement
    const moveCursor = (e: MouseEvent) => {
      setCursor((c) => ({ ...c, x: e.clientX, y: e.clientY }));
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  useEffect(() => {
    // Cursor style update
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${cursor.x - 16}px, ${cursor.y - 16}px, 0)`;
    }
  }, [cursor.x, cursor.y]);

  // Add hover listeners to buttons for cursor effect
  useEffect(() => {
    const buttons = document.querySelectorAll("button, a");
    const handleEnter = () => setCursor((c) => ({ ...c, active: true }));
    const handleLeave = () => setCursor((c) => ({ ...c, active: false }));
    buttons.forEach((btn) => {
      btn.addEventListener("mouseenter", handleEnter);
      btn.addEventListener("mouseleave", handleLeave);
    });
    return () => {
      buttons.forEach((btn) => {
        btn.removeEventListener("mouseenter", handleEnter);
        btn.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  // Parallax transforms
  const shape1Style = {
    transform: `translateY(${scrollY * 0.2}px)`
  };
  const shape2Style = {
    transform: `translateY(${-scrollY * 0.15}px)`
  };
  const textStyle = {
    transform: `translateY(${scrollY * 0.08}px)`
  };

  return (
    <main className="min-h-screen w-full relative overflow-x-hidden">
      {/* Custom Interactive Cursor */}
      <div
        ref={cursorRef}
        className={`fixed z-[9999] pointer-events-none w-8 h-8 rounded-full border-2 border-blue-400 bg-blue-400/20 transition-transform duration-150 ease-out mix-blend-difference ${
          cursor.active ? "scale-150 border-purple-500 bg-purple-400/30" : "scale-100"
        }`}
        style={{ left: 0, top: 0 }}
      />
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-200 animate-gradient-mesh" />

      {/* Parallax Layers */}
      <div ref={parallaxRef} className="relative w-full h-[80vh] flex flex-col items-center justify-center select-none">
        {/* Background Layer: Animated gradient mesh (already above) */}
        {/* Midground Layer: Floating geometric shapes with parallax */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-10 left-1/4 w-32 h-32 bg-blue-400 opacity-30 rounded-full blur-2xl animate-float"
            style={shape1Style}
          />
          <div
            className="absolute bottom-10 right-1/3 w-24 h-24 bg-pink-400 opacity-30 rounded-full blur-2xl animate-float2"
            style={shape2Style}
          />
        </div>
        {/* Foreground Layer: Typography with parallax */}
        <h1
          className="text-5xl md:text-7xl font-extrabold text-center text-gray-900 mb-4 drop-shadow-lg motion-safe:blur-sm animate-none"
          style={textStyle}
        >
          <Typewriter text="Crafting Digital Excellence" speed={60} />
        </h1>
        <p className="text-xl md:text-2xl text-center text-gray-700 mb-8" style={textStyle}>
          We transform visionary ideas into powerful digital solutions
        </p>
        <div className="flex gap-4 mb-8">
          <button className="px-6 py-2 bg-blue-600 text-white rounded shadow hover:scale-105 transition">View Our Work</button>
          <button className="px-6 py-2 bg-purple-600 text-white rounded shadow hover:scale-105 transition">Start Your Project</button>
        </div>
        {/* Scroll Indicator: Animated mouse icon */}
        <div className="mt-12 flex flex-col items-center">
          <div className="w-7 h-12 border-2 border-gray-400 rounded-full flex items-start justify-center relative">
            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 animate-bounce" />
          </div>
          <span className="text-xs text-gray-500 mt-2">Scroll</span>
        </div>
      </div>
      {/* Other sections remain as placeholders */}
      {/* Interactive Stats Section: Animated Counters */}
      <section className="py-16 bg-white/70 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <Counter value={150} label="Projects Delivered" />
          <Counter value={95} label="Client Satisfaction" />
          <Counter value={50} label="Happy Clients" />
          <Counter value={5} label="Years of Innovation" />
        </div>
      </section>
      {/* Features Showcase: Bento Grid Layout */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Innovation First */}
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center group hover:scale-105 transition cursor-pointer">
            {/* Custom illustration placeholder */}
            <div className="w-16 h-16 mb-4 bg-blue-300 rounded-full flex items-center justify-center group-hover:rotate-6 transition">
              {/* Icon or SVG */}
              <span className="text-3xl">💡</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Innovation First</h3>
            <p className="text-gray-600 text-center text-sm">Custom illustrations with engaging hover effects.</p>
          </div>
          {/* Quality Driven */}
          <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center group hover:scale-105 transition cursor-pointer">
            {/* Badge animation placeholder */}
            <div className="w-16 h-16 mb-4 bg-yellow-300 rounded-full flex items-center justify-center group-hover:scale-110 transition">
              {/* Icon or SVG */}
              <span className="text-3xl">🏅</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Quality Driven</h3>
            <p className="text-gray-600 text-center text-sm">Badge animations and delightful micro-interactions.</p>
          </div>
          {/* Client Focused */}
          <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center group hover:scale-105 transition cursor-pointer">
            {/* Testimonial preview placeholder */}
            <div className="w-16 h-16 mb-4 bg-green-300 rounded-full flex items-center justify-center group-hover:scale-110 transition">
              {/* Icon or SVG */}
              <span className="text-3xl">🤝</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Client Focused</h3>
            <p className="text-gray-600 text-center text-sm">Testimonial previews with avatars and reviews.</p>
          </div>
          {/* Future Ready */}
          <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center group hover:scale-105 transition cursor-pointer">
            {/* Tech stack visualization placeholder */}
            <div className="w-16 h-16 mb-4 bg-pink-300 rounded-full flex items-center justify-center group-hover:rotate-12 transition">
              {/* Icon or SVG */}
              <span className="text-3xl">🚀</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Future Ready</h3>
            <p className="text-gray-600 text-center text-sm">Tech stack visualization and interactive cards.</p>
          </div>
        </div>
      </section>
      {/* Technology Stack Visualization */}
      <section className="py-16 bg-white/60 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-center justify-between">
          {/* Floating Tech Logos (placeholders) */}
          <div className="flex-1 flex flex-wrap gap-4 justify-center md:justify-start relative">
            {/* Example floating logos */}
            <div className="w-14 h-14 bg-blue-200 rounded-full flex items-center justify-center shadow-lg animate-float">
              <span className="text-2xl">⚛️</span>
            </div>
            <div className="w-14 h-14 bg-yellow-200 rounded-full flex items-center justify-center shadow-lg animate-float2">
              <span className="text-2xl">🟨</span>
            </div>
            <div className="w-14 h-14 bg-green-200 rounded-full flex items-center justify-center shadow-lg animate-float">
              <span className="text-2xl">🟩</span>
            </div>
            <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center shadow-lg animate-float2">
              <span className="text-2xl">💠</span>
            </div>
            {/* Add more logos as needed */}
          </div>
          {/* Skill Bars */}
          <div className="flex-1 flex flex-col gap-6 w-full max-w-md">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-gray-700">React</span>
                <span className="text-sm text-gray-500">95%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: '95%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-gray-700">Next.js</span>
                <span className="text-sm text-gray-500">90%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-black rounded-full transition-all duration-1000" style={{ width: '90%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-gray-700">Node.js</span>
                <span className="text-sm text-gray-500">85%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-600 rounded-full transition-all duration-1000" style={{ width: '85%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-gray-700">Tailwind CSS</span>
                <span className="text-sm text-gray-500">90%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 rounded-full transition-all duration-1000" style={{ width: '90%' }} />
              </div>
            </div>
          </div>
          {/* Interactive Tech Cards (placeholders) */}
          <div className="flex-1 flex flex-col gap-6 w-full max-w-xs">
            <div className="bg-white rounded-xl shadow-lg p-5 hover:scale-105 transition cursor-pointer border border-blue-100">
              <h4 className="font-bold text-blue-700 mb-2">React</h4>
              <p className="text-gray-600 text-sm">A powerful library for building user interfaces with components and hooks.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-5 hover:scale-105 transition cursor-pointer border border-black/10">
              <h4 className="font-bold text-black mb-2">Next.js</h4>
              <p className="text-gray-600 text-sm">A React framework for production-grade, server-rendered apps.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-5 hover:scale-105 transition cursor-pointer border border-green-200">
              <h4 className="font-bold text-green-700 mb-2">Node.js</h4>
              <p className="text-gray-600 text-sm">A fast, scalable runtime for building backend services and APIs.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Client Testimonials Carousel */}
      <section className="py-16">
        <div className="flex justify-center items-center">
          <TestimonialsCarousel
            testimonials={[
              {
                text: "The team delivered our project on time with exceptional quality. Highly recommended!",
                client: "Jane Doe",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg",
                company: "TechStore Pro",
                companyLogo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Google-flutter-logo.svg",
                rating: 5,
              },
              {
                text: "Outstanding service and support throughout our app launch.",
                client: "John Smith",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                company: "FinanceFirst",
                companyLogo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
                rating: 5,
              },
              {
                text: "Their expertise in UI/UX design transformed our product experience.",
                client: "Emily Chen",
                avatar: "https://randomuser.me/api/portraits/women/65.jpg",
                company: "DataAnalytics Inc.",
                companyLogo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
                rating: 4,
              },
            ]}
          />
        </div>
      </section>
    </main>
  );
}

// Tailwind custom animations (add to tailwind.config.js):
// animate-gradient-mesh, animate-float, animate-float2
// (To be implemented for advanced visuals) 