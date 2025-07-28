"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface GeometricShape {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  opacity: number;
  animationDuration: number;
  shape: 'circle' | 'square' | 'triangle' | 'hexagon' | 'diamond';
}

interface ParallaxBackgroundProps {
  intensity?: number;
  showGrid?: boolean;
  showParticles?: boolean;
}

export default function ParallaxBackground({ 
  intensity = 1, 
  showGrid = true, 
  showParticles = true 
}: ParallaxBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Advanced parallax transforms for multiple layers
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100 * intensity]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200 * intensity]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300 * intensity]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -400 * intensity]);
  
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  // Spring animations for smooth movement
  const smoothY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const smoothY2 = useSpring(y2, { stiffness: 80, damping: 25 });
  const smoothY3 = useSpring(y3, { stiffness: 60, damping: 20 });

  // Generate dynamic geometric shapes
  const [shapes, setShapes] = useState<GeometricShape[]>([]);

  useEffect(() => {
    const generateShapes = () => {
      const newShapes: GeometricShape[] = [];
      const colors = ['#8db1a4', '#2d4f4a', '#dfeoe2', '#b8bcc3', '#787a84'];
      const shapeTypes: ('circle' | 'square' | 'triangle' | 'hexagon' | 'diamond')[] = 
        ['circle', 'square', 'triangle', 'hexagon', 'diamond'];
      
      for (let i = 0; i < 25; i++) {
        newShapes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 120, // Extended for better coverage
          size: Math.random() * 80 + 30,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          opacity: Math.random() * 0.4 + 0.1,
          animationDuration: Math.random() * 15 + 10,
          shape: shapeTypes[Math.floor(Math.random() * shapeTypes.length)]
        });
      }
      setShapes(newShapes);
    };

    generateShapes();
  }, []);

  // Render different geometric shapes
  const renderShape = (shape: GeometricShape, className: string = "") => {
    const baseStyle = {
      width: shape.size,
      height: shape.size,
      backgroundColor: shape.color,
      opacity: shape.opacity,
    };

    switch (shape.shape) {
      case 'circle':
        return (
          <div
            className={`absolute rounded-full backdrop-blur-sm ${className}`}
            style={baseStyle}
          />
        );
      
      case 'square':
        return (
          <div
            className={`absolute rounded-lg backdrop-blur-sm ${className}`}
            style={baseStyle}
          />
        );
      
      case 'triangle':
        return (
          <div
            className={`absolute ${className}`}
            style={{
              width: 0,
              height: 0,
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid ${shape.color}`,
              opacity: shape.opacity,
            }}
          />
        );
      
      case 'hexagon':
        return (
          <div
            className={`absolute ${className}`}
            style={{
              width: shape.size,
              height: shape.size,
              backgroundColor: shape.color,
              opacity: shape.opacity,
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            }}
          />
        );
      
      case 'diamond':
        return (
          <div
            className={`absolute transform rotate-45 ${className}`}
            style={{
              width: shape.size * 0.7,
              height: shape.size * 0.7,
              backgroundColor: shape.color,
              opacity: shape.opacity,
            }}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#dfeoe2] via-white to-[#b8bcc3]/20"
    >
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 opacity-60"
        style={{ scale, opacity, rotate }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-[#dfeoe2] via-transparent to-[#8db1a4]/20"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2d4f4a]/5 to-transparent"
          animate={{
            backgroundPosition: ['50% 0%', '50% 100%', '50% 0%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>

      {/* Layer 1 - Slowest moving background shapes */}
      <motion.div
        className="absolute inset-0"
        style={{ y: smoothY1, opacity }}
      >
        {shapes.slice(0, 6).map((shape) => (
          <motion.div
            key={`layer1-${shape.id}`}
            className="absolute"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
            }}
            animate={{
              rotate: [shape.rotation, shape.rotation + 360],
              scale: [1, 1.2, 1],
              opacity: [shape.opacity, shape.opacity * 0.3, shape.opacity],
            }}
            transition={{
              duration: shape.animationDuration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {renderShape(shape, "filter blur-[1px]")}
          </motion.div>
        ))}
      </motion.div>

      {/* Layer 2 - Medium speed geometric elements */}
      <motion.div
        className="absolute inset-0"
        style={{ y: smoothY2 }}
      >
        {shapes.slice(6, 12).map((shape) => (
          <motion.div
            key={`layer2-${shape.id}`}
            className="absolute"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-15, 15, -15],
              rotate: [0, 180, 360],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: shape.animationDuration * 0.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {renderShape(shape)}
          </motion.div>
        ))}
      </motion.div>

      {/* Layer 3 - Fast moving foreground elements */}
      <motion.div
        className="absolute inset-0"
        style={{ y: smoothY3 }}
      >
        {shapes.slice(12, 18).map((shape) => (
          <motion.div
            key={`layer3-${shape.id}`}
            className="absolute"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
            }}
            animate={{
              scale: [1, 1.4, 1],
              rotate: [shape.rotation, shape.rotation - 360],
              opacity: [shape.opacity, shape.opacity * 1.5, shape.opacity],
            }}
            transition={{
              duration: shape.animationDuration * 0.6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="relative">
              {renderShape(shape)}
              <motion.div
                className="absolute top-0 left-0"
                animate={{ rotate: [0, -180, -360] }}
                transition={{
                  duration: shape.animationDuration * 0.4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {renderShape({
                  ...shape,
                  size: shape.size * 0.3,
                  color: '#2d4f4a',
                  opacity: shape.opacity * 0.6,
                  shape: 'square'
                })}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Layer 4 - Ultra-fast decorative elements */}
      <motion.div
        className="absolute inset-0"
        style={{ y: y4 }}
      >
        {shapes.slice(18, 25).map((shape) => (
          <motion.div
            key={`layer4-${shape.id}`}
            className="absolute"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
            }}
            animate={{
              y: [-50, 50, -50],
              x: [-25, 25, -25],
              rotate: [0, 720],
              scale: [0.5, 1.5, 0.5],
              opacity: [0.1, 0.8, 0.1],
            }}
            transition={{
              duration: shape.animationDuration * 0.4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {renderShape(shape, "filter blur-[2px]")}
          </motion.div>
        ))}
      </motion.div>

      {/* Dynamic Grid Pattern Overlay */}
      {showGrid && (
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{ y: smoothY1 }}
        >
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="dynamicGrid"
                width="120"
                height="120"
                patternUnits="userSpaceOnUse"
              >
                <motion.path
                  d="M 120 0 L 0 0 0 120"
                  fill="none"
                  stroke="#2d4f4a"
                  strokeWidth="1"
                  opacity="0.4"
                  animate={{
                    strokeWidth: [0.5, 1.5, 0.5],
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="2"
                  fill="#8db1a4"
                  animate={{
                    r: [1, 4, 1],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dynamicGrid)" />
          </svg>
        </motion.div>
      )}

      {/* Noise Texture Overlay with Animation */}
      <motion.div
        className="absolute inset-0 opacity-10 mix-blend-overlay"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #8db1a4 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, #2d4f4a 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, #dfeoe2 0%, transparent 50%),
            radial-gradient(circle at 10% 90%, #b8bcc3 0%, transparent 50%)
          `,
          backgroundSize: '400px 400px, 300px 300px, 500px 500px, 250px 250px',
        }}
        animate={{
          backgroundPosition: [
            '0% 0%, 0% 0%, 0% 0%, 0% 0%',
            '100% 100%, 50% 50%, 75% 25%, 25% 75%',
            '0% 0%, 0% 0%, 0% 0%, 0% 0%'
          ]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Ambient Light Effects */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [0.8, 0.2]) }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(141, 177, 164, 0.4) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [-20, 20, -20],
            y: [-20, 20, -20],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(45, 79, 74, 0.3) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{
            scale: [1.1, 0.9, 1.1],
            opacity: [0.2, 0.5, 0.2],
            x: [20, -20, 20],
            y: [15, -15, 15],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute top-2/3 left-1/6 w-60 h-60 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(223, 224, 226, 0.5) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
          animate={{
            scale: [0.8, 1.3, 0.8],
            opacity: [0.4, 0.7, 0.4],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>

      {/* Floating Particles */}
      {showParticles && (
        <motion.div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 4 + 1,
                height: Math.random() * 4 + 1,
                backgroundColor: ['#8db1a4', '#2d4f4a', '#dfeoe2'][Math.floor(Math.random() * 3)],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-50, -200, -50],
                x: [
                  -Math.random() * 40 + 20, 
                  Math.random() * 40 - 20, 
                  -Math.random() * 40 + 20
                ],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 8,
                repeat: Infinity,
                delay: Math.random() * 8,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Organic Flow Lines */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ y: smoothY2 }}
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8db1a4" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#2d4f4a" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#dfeoe2" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          
          <motion.path
            d="M0,200 Q200,100 400,200 T800,200 L800,220 Q600,120 400,220 T0,220 Z"
            fill="url(#flowGradient)"
            animate={{
              d: [
                "M0,200 Q200,100 400,200 T800,200 L800,220 Q600,120 400,220 T0,220 Z",
                "M0,180 Q200,280 400,180 T800,180 L800,200 Q600,300 400,200 T0,200 Z",
                "M0,200 Q200,100 400,200 T800,200 L800,220 Q600,120 400,220 T0,220 Z"
              ]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.path
            d="M0,400 Q300,300 600,400 T1200,400"
            stroke="#2d4f4a"
            strokeWidth="2"
            fill="none"
            opacity="0.3"
            animate={{
              d: [
                "M0,400 Q300,300 600,400 T1200,400",
                "M0,420 Q300,320 600,420 T1200,420",
                "M0,400 Q300,300 600,400 T1200,400"
              ]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      </motion.div>

      {/* Interactive Light Streaks */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ y: y3 }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`streak-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#8db1a4] to-transparent"
            style={{
              width: `${Math.random() * 300 + 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 60 - 30}deg)`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scaleX: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}