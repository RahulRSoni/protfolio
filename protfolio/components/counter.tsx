import React, { useEffect, useRef, useState } from "react";

interface CounterProps {
  value: number;
  label: string;
  duration?: number;
}

export default function Counter({ value, label, duration = 1200 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current || hasAnimated) return;
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setHasAnimated(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;
    let start = 0;
    const increment = value / (duration / 16);
    const animate = () => {
      start += increment;
      if (start < value) {
        setCount(Math.floor(start));
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };
    animate();
  }, [hasAnimated, value, duration]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <span className="text-4xl md:text-5xl font-extrabold text-blue-700">
        {count}+
      </span>
      <span className="text-lg text-gray-700 mt-2">{label}</span>
    </div>
  );
} 