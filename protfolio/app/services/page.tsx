import React from "react";

export default function ServicesPage() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-purple-100 to-pink-50">
      {/* Hero Section: Animated Background, Interactive Service Cards */}
      <section className="py-24 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Animated geometric background placeholder */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-1/4 w-40 h-40 bg-purple-200 opacity-40 rounded-full blur-2xl animate-float" />
          <div className="absolute bottom-10 right-1/3 w-32 h-32 bg-pink-200 opacity-40 rounded-full blur-2xl animate-float2" />
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-yellow-200 opacity-30 rounded-full blur-2xl animate-float" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center">Services That Drive Growth</h1>
        {/* Interactive Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-5xl">
          {["Web Development", "Mobile App Development", "UI/UX Design", "Digital Marketing"].map((service, i) => (
            <div
              key={service}
              className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center group hover:scale-105 transition cursor-pointer relative overflow-hidden min-h-[220px]"
            >
              <div className="w-14 h-14 mb-4 rounded-full flex items-center justify-center text-3xl bg-purple-100 group-hover:bg-pink-200 transition">
                {/* Icon placeholder */}
                {i === 0 && "💻"}
                {i === 1 && "📱"}
                {i === 2 && "🎨"}
                {i === 3 && "📈"}
              </div>
              <h3 className="font-bold text-lg mb-2 text-center">{service}</h3>
              <div className="text-gray-600 text-sm text-center opacity-80 group-hover:opacity-100 transition-all group-hover:translate-y-0 translate-y-4 duration-300">
                {/* Details placeholder */}
                {i === 0 && "Custom websites, e-commerce, PWAs, maintenance, performance, SEO."}
                {i === 1 && "iOS, Android, cross-platform, ASO, UI/UX, app maintenance."}
                {i === 2 && "UI design, UX research, prototyping, design systems, branding."}
                {i === 3 && "SEO, social media, content, email, PPC, analytics."}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Service Categories (Modern Card Layout) */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Web Development */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-3 hover:scale-105 transition cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">💻</span>
              <h3 className="font-bold text-xl">Web Development</h3>
            </div>
            <ul className="list-disc list-inside text-gray-700 text-sm pl-2">
              <li>Custom Website Development</li>
              <li>E-commerce Solutions</li>
              <li>Progressive Web Apps (PWA)</li>
              <li>Website Maintenance & Support</li>
              <li>Performance optimization</li>
              <li>SEO implementation</li>
            </ul>
          </div>
          {/* Mobile App Development */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-3 hover:scale-105 transition cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">📱</span>
              <h3 className="font-bold text-xl">Mobile App Development</h3>
            </div>
            <ul className="list-disc list-inside text-gray-700 text-sm pl-2">
              <li>iOS App Development</li>
              <li>Android App Development</li>
              <li>Cross-platform Solutions (React Native)</li>
              <li>App Store Optimization</li>
              <li>Mobile UI/UX Design</li>
              <li>App Maintenance</li>
            </ul>
          </div>
          {/* UI/UX Design */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-3 hover:scale-105 transition cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🎨</span>
              <h3 className="font-bold text-xl">UI/UX Design</h3>
            </div>
            <ul className="list-disc list-inside text-gray-700 text-sm pl-2">
              <li>User Interface Design</li>
              <li>User Experience Research</li>
              <li>Wireframing & Prototyping</li>
              <li>Design Systems</li>
              <li>Accessibility Compliance</li>
              <li>Brand Identity Design</li>
            </ul>
          </div>
          {/* Digital Marketing */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-3 hover:scale-105 transition cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">📈</span>
              <h3 className="font-bold text-xl">Digital Marketing</h3>
            </div>
            <ul className="list-disc list-inside text-gray-700 text-sm pl-2">
              <li>Search Engine Optimization</li>
              <li>Social Media Marketing</li>
              <li>Content Marketing</li>
              <li>Email Marketing</li>
              <li>PPC Advertising</li>
              <li>Analytics & Reporting</li>
            </ul>
          </div>
        </div>
      </section>
      {/* Process Section */}
      <section className="py-16 bg-white/70 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-purple-700 mb-10">Our Process</h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Stepper Steps */}
            {[
              {
                icon: "🔍",
                title: "Discovery",
                desc: "Research and planning phase to understand your goals.",
              },
              {
                icon: "🎨",
                title: "Design",
                desc: "Creative design and prototyping for a unique look.",
              },
              {
                icon: "💻",
                title: "Development",
                desc: "Coding and implementation with best practices.",
              },
              {
                icon: "🧪",
                title: "Testing",
                desc: "Quality assurance and thorough testing.",
              },
              {
                icon: "🚀",
                title: "Launch",
                desc: "Deployment and go-live support.",
              },
              {
                icon: "🤝",
                title: "Support",
                desc: "Ongoing maintenance and customer care.",
              },
            ].map((step, i) => (
              <div key={step.title} className="flex flex-col items-center text-center flex-1 group">
                <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-2xl mb-2 group-hover:bg-purple-200 transition">
                  {step.icon}
                </div>
                <h3 className="font-bold text-lg mb-1 text-purple-700">{step.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{step.desc}</p>
                {i < 5 && (
                  <div className="hidden md:block absolute right-0 top-1/2 w-8 h-1 bg-purple-200 -translate-y-1/2 md:relative md:w-8 md:h-1 md:bg-purple-200 md:ml-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Pricing Packages */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-pink-700 mb-10">Pricing Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Package */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center border-2 border-pink-100 hover:border-pink-400 transition">
              <h3 className="font-bold text-xl mb-2 text-pink-700">Starter</h3>
              <div className="text-3xl font-extrabold text-pink-600 mb-4">$999</div>
              <ul className="text-gray-700 text-sm mb-6 list-disc list-inside text-left w-full max-w-xs mx-auto">
                <li>Up to 5 pages</li>
                <li>Basic SEO</li>
                <li>Responsive design</li>
                <li>Email support</li>
              </ul>
              <button className="px-6 py-2 bg-pink-600 text-white rounded shadow hover:scale-105 transition">Get Started</button>
            </div>
            {/* Professional Package */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center border-2 border-pink-200 hover:border-pink-500 transition scale-105 z-10">
              <h3 className="font-bold text-xl mb-2 text-pink-800">Professional</h3>
              <div className="text-3xl font-extrabold text-pink-700 mb-4">$2499</div>
              <ul className="text-gray-700 text-sm mb-6 list-disc list-inside text-left w-full max-w-xs mx-auto">
                <li>Up to 15 pages</li>
                <li>Advanced SEO</li>
                <li>Custom features</li>
                <li>Priority support</li>
                <li>Blog & CMS</li>
              </ul>
              <button className="px-6 py-2 bg-pink-700 text-white rounded shadow hover:scale-105 transition">Choose Plan</button>
            </div>
            {/* Enterprise Package */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center border-2 border-pink-100 hover:border-pink-400 transition">
              <h3 className="font-bold text-xl mb-2 text-pink-700">Enterprise</h3>
              <div className="text-3xl font-extrabold text-pink-600 mb-4">Custom</div>
              <ul className="text-gray-700 text-sm mb-6 list-disc list-inside text-left w-full max-w-xs mx-auto">
                <li>Unlimited pages</li>
                <li>Full-stack solutions</li>
                <li>Dedicated manager</li>
                <li>24/7 support</li>
                <li>Custom integrations</li>
              </ul>
              <button className="px-6 py-2 bg-pink-600 text-white rounded shadow hover:scale-105 transition">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 