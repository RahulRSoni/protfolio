"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FloatingBallsProps {
  density?: number; // Number of balls (default: 100)
  colors?: string[]; // Array of colors for balls
  opacity?: number; // Overall opacity (default: 0.6)
  speed?: number; // Animation speed multiplier (default: 1)
  size?: { min: number; max: number }; // Ball size range
  className?: string;
}

interface Ball {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  directionX: number;
  directionY: number;
}

export default function FloatingBalls({
  density = 100,
  colors = ['#8db1a4', '#2d4f4a', '#dfeoe2', '#b8bcc3'],
  opacity = 0.6,
  speed = 1,
  size = { min: 2, max: 8 },
  className = ""
}: FloatingBallsProps) {
  const [balls, setBalls] = useState<Ball[]>([]);

  useEffect(() => {
    const generateBalls = () => {
      const newBalls: Ball[] = [];
      
      for (let i = 0; i < density; i++) {
        newBalls.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * (size.max - size.min) + size.min,
          color: colors[Math.floor(Math.random() * colors.length)],
          duration: (Math.random() * 15 + 10) / speed, // 10-25 seconds divided by speed
          delay: Math.random() * 8,
          directionX: (Math.random() - 0.5) * 200, // -100 to 100
          directionY: (Math.random() - 0.5) * 300, // -150 to 150
        });
      }
      
      setBalls(newBalls);
    };

    generateBalls();
  }, [density, colors, speed, size]);

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-0 ${className}`} style={{ opacity }}>
      {balls.map((ball) => (
        <motion.div
          key={ball.id}
          className="absolute rounded-full"
          style={{
            width: ball.size,
            height: ball.size,
            backgroundColor: ball.color,
            left: `${ball.x}%`,
            top: `${ball.y}%`,
            filter: 'blur(0.5px)',
          }}
          animate={{
            y: [0, ball.directionY, 0],
            x: [0, ball.directionX, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: ball.duration,
            repeat: Infinity,
            delay: ball.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

// Preset variations for different sections
export function HeroFloatingBalls() {
  return (
    <FloatingBalls
      density={120}
      colors={['#8db1a4', '#2d4f4a', '#dfeoe2']}
      opacity={0.7}
      speed={0.8}
      size={{ min: 2, max: 6 }}
    />
  );
}

export function SubtleFloatingBalls() {
  return (
    <FloatingBalls
      density={60}
      colors={['#8db1a4', '#dfeoe2']}
      opacity={0.4}
      speed={1.2}
      size={{ min: 1, max: 4 }}
    />
  );
}

export function DarkFloatingBalls() {
  return (
    <FloatingBalls
      density={80}
      colors={['#8db1a4', '#2d4f4a', '#ffffff']}
      opacity={0.5}
      speed={1}
      size={{ min: 2, max: 5 }}
    />
  );
}