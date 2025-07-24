import React, { useEffect, useState } from "react";

interface Testimonial {
  text: string;
  client: string;
  avatar: string; // URL or placeholder
  company: string;
  companyLogo: string; // URL or placeholder
  rating: number; // 1-5
}

interface CarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialsCarousel({ testimonials }: CarouselProps) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const t = testimonials[index];

  return (
    <div className="w-full max-w-xl mx-auto bg-white/80 rounded-2xl shadow-lg p-8 flex flex-col items-center relative overflow-hidden">
      {/* Animated background blur */}
      <div className="absolute inset-0 -z-10 blur-2xl opacity-30 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200" />
      {/* Client avatar and company logo */}
      <div className="flex items-center gap-4 mb-4">
        <img src={t.avatar} alt={t.client} className="w-14 h-14 rounded-full border-2 border-blue-300 object-cover" />
        <img src={t.companyLogo} alt={t.company} className="w-10 h-10 rounded bg-white p-1 shadow" />
      </div>
      {/* Testimonial text */}
      <p className="text-lg text-gray-700 italic text-center mb-4">"{t.text}"</p>
      {/* Client name and company */}
      <div className="text-sm text-gray-600 mb-2">{t.client} <span className="text-gray-400">/</span> {t.company}</div>
      {/* Animated star rating */}
      <div className="flex gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-yellow-400 transition-transform ${i < t.rating ? 'scale-110' : 'opacity-30'}`}>★</span>
        ))}
      </div>
      {/* Carousel indicators */}
      <div className="flex gap-2 mt-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full ${i === index ? 'bg-blue-500' : 'bg-gray-300'} transition`}
            onClick={() => setIndex(i)}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 