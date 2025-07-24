import React from "react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-blue-50">
      {/* Hero Section: Animated Timeline, Founder Image */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="py-24 flex flex-col items-center justify-center relative"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">The Story Behind Our Success</h1>
        <div className="flex flex-col md:flex-row items-center gap-12 w-full max-w-5xl">
          {/* Animated Timeline Placeholder */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse mb-2" />
            <div className="bg-white rounded-lg shadow p-4">
              <span className="font-semibold text-blue-700">2019</span>
              <p className="text-gray-600 text-sm mt-1">Company founded with a vision for digital excellence.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <span className="font-semibold text-blue-700">2021</span>
              <p className="text-gray-600 text-sm mt-1">Reached 50+ clients and expanded our team.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <span className="font-semibold text-blue-700">2023</span>
              <p className="text-gray-600 text-sm mt-1">Awarded for innovation and client satisfaction.</p>
            </div>
            {/* Add more milestones as needed */}
          </div>
          {/* Founder Image with Floating Elements Placeholder */}
          <div className="flex-1 flex flex-col items-center relative">
            <div className="w-40 h-40 rounded-full bg-blue-200 overflow-hidden shadow-lg mb-4 flex items-center justify-center">
              {/* Replace with founder image */}
              <span className="text-6xl text-blue-600">👤</span>
            </div>
            {/* Floating elements */}
            <div className="absolute top-4 left-4 w-8 h-8 bg-purple-300 rounded-full blur-xl animate-float" />
            <div className="absolute bottom-4 right-4 w-6 h-6 bg-pink-300 rounded-full blur-lg animate-float2" />
            <span className="font-semibold text-blue-700">Founder Name</span>
            <span className="text-gray-500 text-sm">Founder & CEO</span>
          </div>
        </div>
      </motion.section>
      {/* Mission & Vision Cards */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        className="py-16"
      >
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-start">
            <h2 className="text-2xl font-bold text-blue-700 mb-2">Our Mission</h2>
            <p className="text-gray-700 mb-2">Empowering businesses through innovative digital solutions</p>
          </div>
          {/* Vision Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-start">
            <h2 className="text-2xl font-bold text-purple-700 mb-2">Our Vision</h2>
            <p className="text-gray-700 mb-2">To be the leading force in digital transformation</p>
          </div>
          {/* Values Card (spans both columns on mobile) */}
          <div className="bg-blue-50 rounded-2xl shadow p-8 flex flex-col items-start md:col-span-2 mt-4">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Our Values</h2>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-1 bg-blue-200 text-blue-800 rounded-full font-medium text-sm">Trust</span>
              <span className="px-4 py-1 bg-purple-200 text-purple-800 rounded-full font-medium text-sm">Innovation</span>
              <span className="px-4 py-1 bg-yellow-200 text-yellow-800 rounded-full font-medium text-sm">Excellence</span>
              <span className="px-4 py-1 bg-green-200 text-green-800 rounded-full font-medium text-sm">Partnership</span>
            </div>
          </div>
        </div>
      </motion.section>
      {/* Team Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="py-16 bg-white/70 backdrop-blur-sm"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            {/* Team Member Card Example */}
            {[1,2,3,4,5,6].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.1 * i, ease: "easeOut" }}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center group hover:shadow-2xl hover:scale-105 transition cursor-pointer relative overflow-hidden"
              >
                {/* Photo Placeholder */}
                <div className="w-20 h-20 rounded-full bg-blue-200 mb-4 flex items-center justify-center text-3xl">
                  <span role="img" aria-label="avatar">{i % 2 === 0 ? "👩‍💻" : "👨‍💻"}</span>
                </div>
                <h3 className="font-semibold text-lg mb-1">{i % 2 === 0 ? "Emily" : "Alex"} {i}</h3>
                <span className="text-blue-600 text-sm mb-2">{i % 2 === 0 ? "Frontend Developer" : "Backend Developer"}</span>
                {/* Animated Skills Tags */}
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium animate-float">React</span>
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium animate-float2">Node.js</span>
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">UI/UX</span>
                </div>
                {/* Hover: Social Links & Description */}
                <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-4">
                  <div className="flex gap-3 mb-2">
                    <a href="#" className="text-blue-500 hover:text-blue-700 text-xl">🔗</a>
                    <a href="#" className="text-blue-400 hover:text-blue-600 text-xl">🐦</a>
                  </div>
                  <p className="text-xs text-gray-600 text-center">Passionate about building modern web experiences and collaborating with clients.</p>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Team Stats Row */}
          <div className="flex flex-wrap justify-center gap-8 mt-6">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-blue-700">30+</span>
              <span className="text-gray-600 text-sm">Years Experience</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-purple-700">12</span>
              <span className="text-gray-600 text-sm">Certifications</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-green-700">6</span>
              <span className="text-gray-600 text-sm">Team Members</span>
            </div>
          </div>
        </div>
      </motion.section>
      {/* Company Culture */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        className="py-16"
      >
        <div className="max-w-5xl mx-auto flex flex-col gap-12">
          {/* Office Photos Placeholder */}
          <div>
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Our Workspace</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {[1,2,3].map((i) => (
                <div key={i} className="w-40 h-28 bg-blue-100 rounded-xl shadow flex items-center justify-center text-3xl">
                  🏢
                </div>
              ))}
            </div>
          </div>
          {/* Work Process Steps */}
          <div>
            <h2 className="text-2xl font-bold text-purple-700 mb-4">How We Work</h2>
            <div className="flex flex-wrap gap-6">
              {['Discovery', 'Design', 'Development', 'Testing', 'Launch', 'Support'].map((step, idx) => (
                <div key={step} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-xl font-bold mb-2">{idx+1}</div>
                  <span className="text-sm text-gray-700 font-medium">{step}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Achievements */}
          <div>
            <h2 className="text-2xl font-bold text-green-700 mb-4">Achievements</h2>
            <div className="flex gap-4 flex-wrap">
              <div className="bg-green-100 px-4 py-2 rounded-full font-medium text-green-800 shadow">Award Winner 2023</div>
              <div className="bg-yellow-100 px-4 py-2 rounded-full font-medium text-yellow-800 shadow">Certified Partner</div>
              <div className="bg-blue-100 px-4 py-2 rounded-full font-medium text-blue-800 shadow">Top Rated Agency</div>
            </div>
          </div>
          {/* Trusted By (Client Logos) */}
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Trusted By</h2>
            <div className="flex gap-6 items-center flex-wrap">
              {[1,2,3,4].map((i) => (
                <div key={i} className="w-20 h-10 bg-gray-200 rounded flex items-center justify-center text-lg font-bold text-gray-500">
                  LOGO
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
      {/* Why Choose Us */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        className="py-16 bg-white/60 backdrop-blur-sm"
      >
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Experience */}
          <div className="bg-blue-50 rounded-2xl p-6 flex flex-col items-center shadow group hover:scale-105 transition cursor-pointer">
            <span className="text-3xl mb-2">⏳</span>
            <h3 className="font-bold text-lg mb-1">5+ Years</h3>
            <p className="text-gray-600 text-center text-sm">In the industry, delivering excellence.</p>
          </div>
          {/* Expertise */}
          <div className="bg-purple-50 rounded-2xl p-6 flex flex-col items-center shadow group hover:scale-105 transition cursor-pointer">
            <span className="text-3xl mb-2">🧑‍💻</span>
            <h3 className="font-bold text-lg mb-1">Full-Stack</h3>
            <p className="text-gray-600 text-center text-sm">Development capabilities across the stack.</p>
          </div>
          {/* Support */}
          <div className="bg-green-50 rounded-2xl p-6 flex flex-col items-center shadow group hover:scale-105 transition cursor-pointer">
            <span className="text-3xl mb-2">💬</span>
            <h3 className="font-bold text-lg mb-1">24/7 Support</h3>
            <p className="text-gray-600 text-center text-sm">Always available for our clients.</p>
          </div>
          {/* Results */}
          <div className="bg-yellow-50 rounded-2xl p-6 flex flex-col items-center shadow group hover:scale-105 transition cursor-pointer">
            <span className="text-3xl mb-2">🏆</span>
            <h3 className="font-bold text-lg mb-1">Proven Results</h3>
            <p className="text-gray-600 text-center text-sm">A track record of successful projects.</p>
          </div>
        </div>
      </motion.section>
    </main>
  );
} 