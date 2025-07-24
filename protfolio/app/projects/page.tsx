import React, { useState } from "react";

const FILTERS = [
  "All",
  "Web Development",
  "Mobile Apps",
  "UI/UX Design",
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-green-100 to-blue-50">
      {/* Hero Section: Filter Tabs, Search Bar */}
      <section className="py-24 flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Our Portfolio of Excellence</h1>
        {/* Filter Tabs */}
        <div className="flex gap-4 mb-6 flex-wrap justify-center">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              className={`px-5 py-2 rounded-full font-medium transition border-2 ${
                activeFilter === filter
                  ? "bg-blue-600 text-white border-blue-600 shadow"
                  : "bg-white text-blue-700 border-blue-200 hover:bg-blue-50"
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        {/* Search Bar */}
        <div className="w-full max-w-md flex items-center bg-white rounded-full shadow px-4 py-2">
          <input
            type="text"
            placeholder="Search projects..."
            className="flex-1 bg-transparent outline-none text-gray-700 text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="text-gray-400 text-xl ml-2">🔍</span>
        </div>
      </section>
      {/* Project Grid (Masonry Layout) */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Example Project Card */}
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="relative group rounded-2xl overflow-hidden shadow-lg bg-white flex flex-col">
              {/* Thumbnail Placeholder */}
              <div className="h-48 bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center text-5xl text-white">
                🖼️
              </div>
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">Project {i}</h3>
                <div className="flex gap-2 mb-2">
                  <span className="px-3 py-0.5 bg-blue-500 text-white rounded-full text-xs font-medium">Web</span>
                  <span className="px-3 py-0.5 bg-green-500 text-white rounded-full text-xs font-medium">React</span>
                  <span className="px-3 py-0.5 bg-purple-500 text-white rounded-full text-xs font-medium">Next.js</span>
                </div>
                <div className="flex gap-3 mt-2">
                  <a href="#" className="text-white underline hover:text-blue-200 text-sm">Details</a>
                  <a href="#" className="text-white underline hover:text-blue-200 text-sm">Live Demo</a>
                  <a href="#" className="text-white underline hover:text-blue-200 text-sm">GitHub</a>
                </div>
              </div>
              {/* Card Content (visible always) */}
              <div className="p-4 flex-1 flex flex-col">
                <h4 className="font-bold text-lg mb-1">Project {i} Title</h4>
                <p className="text-gray-600 text-sm mb-2 flex-1">Short project description goes here. Highlight the main features and tech used.</p>
                <div className="flex gap-2 flex-wrap mt-auto">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">React</span>
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">Next.js</span>
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">API</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Featured Projects (Detailed Showcases) */}
      <section className="py-16 bg-white/70 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto flex flex-col gap-12">
          {/* Project 1: E-commerce Platform */}
          <div className="flex flex-col md:flex-row gap-8 items-center bg-white rounded-2xl shadow-lg p-8">
            {/* Images Placeholder */}
            <div className="flex flex-col gap-2 w-full md:w-1/3">
              <div className="h-28 bg-blue-100 rounded-lg flex items-center justify-center text-3xl">Before</div>
              <div className="h-28 bg-green-100 rounded-lg flex items-center justify-center text-3xl">After</div>
            </div>
            {/* Details */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-blue-700 mb-2">E-commerce Platform</h3>
              <div className="flex gap-3 mb-2">
                <span className="bg-blue-200 text-blue-800 px-3 py-0.5 rounded-full text-xs font-medium">Web Development</span>
                <span className="bg-gray-200 text-gray-800 px-3 py-0.5 rounded-full text-xs font-medium">Next.js</span>
                <span className="bg-green-200 text-green-800 px-3 py-0.5 rounded-full text-xs font-medium">Stripe</span>
                <span className="bg-purple-200 text-purple-800 px-3 py-0.5 rounded-full text-xs font-medium">PostgreSQL</span>
              </div>
              <p className="text-gray-700 mb-2">Complete e-commerce solution with payment integration.</p>
              <div className="text-sm text-gray-600 mb-2">Client: <span className="font-semibold">TechStore Pro</span></div>
              <div className="text-sm text-gray-600 mb-2">Results: <span className="font-semibold">300% increase in online sales</span></div>
            </div>
          </div>
          {/* Project 2: Mobile Banking App */}
          <div className="flex flex-col md:flex-row gap-8 items-center bg-white rounded-2xl shadow-lg p-8">
            {/* Images Placeholder */}
            <div className="flex flex-col gap-2 w-full md:w-1/3">
              <div className="h-28 bg-blue-100 rounded-lg flex items-center justify-center text-3xl">Before</div>
              <div className="h-28 bg-green-100 rounded-lg flex items-center justify-center text-3xl">After</div>
            </div>
            {/* Details */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-blue-700 mb-2">Mobile Banking App</h3>
              <div className="flex gap-3 mb-2">
                <span className="bg-green-200 text-green-800 px-3 py-0.5 rounded-full text-xs font-medium">Mobile Development</span>
                <span className="bg-blue-200 text-blue-800 px-3 py-0.5 rounded-full text-xs font-medium">React Native</span>
                <span className="bg-gray-200 text-gray-800 px-3 py-0.5 rounded-full text-xs font-medium">Node.js</span>
                <span className="bg-yellow-200 text-yellow-800 px-3 py-0.5 rounded-full text-xs font-medium">MongoDB</span>
              </div>
              <p className="text-gray-700 mb-2">Secure mobile banking application.</p>
              <div className="text-sm text-gray-600 mb-2">Client: <span className="font-semibold">FinanceFirst</span></div>
              <div className="text-sm text-gray-600 mb-2">Results: <span className="font-semibold">50k+ downloads in first month</span></div>
            </div>
          </div>
          {/* Project 3: SaaS Dashboard */}
          <div className="flex flex-col md:flex-row gap-8 items-center bg-white rounded-2xl shadow-lg p-8">
            {/* Images Placeholder */}
            <div className="flex flex-col gap-2 w-full md:w-1/3">
              <div className="h-28 bg-blue-100 rounded-lg flex items-center justify-center text-3xl">Before</div>
              <div className="h-28 bg-green-100 rounded-lg flex items-center justify-center text-3xl">After</div>
            </div>
            {/* Details */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-blue-700 mb-2">SaaS Dashboard</h3>
              <div className="flex gap-3 mb-2">
                <span className="bg-purple-200 text-purple-800 px-3 py-0.5 rounded-full text-xs font-medium">Web Application</span>
                <span className="bg-blue-200 text-blue-800 px-3 py-0.5 rounded-full text-xs font-medium">React</span>
                <span className="bg-yellow-200 text-yellow-800 px-3 py-0.5 rounded-full text-xs font-medium">D3.js</span>
                <span className="bg-gray-200 text-gray-800 px-3 py-0.5 rounded-full text-xs font-medium">Python</span>
              </div>
              <p className="text-gray-700 mb-2">Real-time analytics dashboard.</p>
              <div className="text-sm text-gray-600 mb-2">Client: <span className="font-semibold">DataAnalytics Inc.</span></div>
              <div className="text-sm text-gray-600 mb-2">Results: <span className="font-semibold">Improved data insights by 200%</span></div>
            </div>
          </div>
        </div>
      </section>
      {/* Case Study Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Challenge */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <span className="text-3xl mb-2">❓</span>
            <h3 className="font-bold text-lg mb-2">Challenge</h3>
            <p className="text-gray-600 text-sm text-center">Clients needed scalable, secure, and modern digital solutions to grow their business.</p>
          </div>
          {/* Solution */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <span className="text-3xl mb-2">💡</span>
            <h3 className="font-bold text-lg mb-2">Solution</h3>
            <p className="text-gray-600 text-sm text-center">We designed and developed tailored platforms using the latest technologies and best practices.</p>
          </div>
          {/* Implementation */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <span className="text-3xl mb-2">🛠️</span>
            <h3 className="font-bold text-lg mb-2">Implementation</h3>
            <p className="text-gray-600 text-sm text-center">Agile development, continuous testing, and close collaboration ensured project success.</p>
          </div>
          {/* Results */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <span className="text-3xl mb-2">🏆</span>
            <h3 className="font-bold text-lg mb-2">Results</h3>
            <p className="text-gray-600 text-sm text-center">Significant growth, improved user experience, and measurable business outcomes for our clients.</p>
          </div>
        </div>
      </section>
    </main>
  );
} 