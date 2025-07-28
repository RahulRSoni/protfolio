"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface FloatingElementsProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  shape: 'circle' | 'square' | 'triangle' | 'hexagon';
  intensity: number;
}

export default function FloatingElements({ mouseX, mouseY }: FloatingElementsProps) {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  // Transform mouse movement to parallax offsets
  const parallaxX1 = useTransform(mouseX, [-20, 20], [-5, 5]);
  const parallaxY1 = useTransform(mouseY, [-20, 20], [-5, 5]);
  const parallaxX2 = useTransform(mouseX, [-20, 20], [-10, 10]);
  const parallaxY2 = useTransform(mouseY, [-20, 20], [-10, 10]);
  const parallaxX3 = useTransform(mouseX, [-20, 20], [-15, 15]);
  const parallaxY3 = useTransform(mouseY, [-20, 20], [-15, 15]);

  useEffect(() => {
    const generateElements = () => {
      const newElements: FloatingElement[] = [];
      const colors = ['#8db1a4', '#2d4f4a', '#dfeoe2', '#b8bcc3', '#787a84'];
      const shapes: ('circle' | 'square' | 'triangle' | 'hexagon')[] = ['circle', 'square', 'triangle', 'hexagon'];

      for (let i = 0; i < 12; i++) {
        newElements.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 80 + 30,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          intensity: Math.random() * 0.8 + 0.2
        });
      }
      setElements(newElements);
    };

    generateElements();
  }, []);

  const renderShape = (element: FloatingElement) => {
    const baseClasses = "absolute transform-gpu";
    const style = {
      width: element.size,
      height: element.size,
      backgroundColor: element.color + '40', // 40 for opacity
      border: `2px solid ${element.color}60`,
    };

    switch (element.shape) {
      case 'circle':
        return (
          <div
            className={`${baseClasses} rounded-full`}
            style={style}
          />
        );
      case 'square':
        return (
          <div
            className={`${baseClasses} rounded-lg`}
            style={style}
          />
        );
      case 'triangle':
        return (
          <div
            className={baseClasses}
            style={{
              width: 0,
              height: 0,
              borderLeft: `${element.size / 2}px solid transparent`,
              borderRight: `${element.size / 2}px solid transparent`,
              borderBottom: `${element.size}px solid ${element.color}60`,
            }}
          />
        );
      case 'hexagon':
        return (
          <div
            className={`${baseClasses} relative`}
            style={{ width: element.size, height: element.size }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: element.color + '40',
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                border: `2px solid ${element.color}60`,
              }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Layer 1 - Light parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ x: parallaxX1, y: parallaxY1 }}
      >
        {elements.slice(0, 4).map((element) => (
          <motion.div
            key={`layer1-${element.id}`}
            className="absolute"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 15 + element.intensity * 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.3 }
            }}
          >
            {renderShape(element)}
          </motion.div>
        ))}
      </motion.div>

      {/* Layer 2 - Medium parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ x: parallaxX2, y: parallaxY2 }}
      >
        {elements.slice(4, 8).map((element) => (
          <motion.div
            key={`layer2-${element.id}`}
            className="absolute"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
            animate={{
              rotate: [360, 0],
              y: [-10, 10, -10],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 12 + element.intensity * 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              whileHover={{
                rotate: 45,
                scale: 1.3,
                transition: { duration: 0.2 }
              }}
            >
              {renderShape(element)}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Layer 3 - Strong parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ x: parallaxX3, y: parallaxY3 }}
      >
        {elements.slice(8, 12).map((element) => (
          <motion.div
            key={`layer3-${element.id}`}
            className="absolute"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
            animate={{
              rotate: [0, -360],
              x: [-5, 5, -5],
              y: [-8, 8, -8],
              scale: [1, 0.7, 1],
            }}
            transition={{
              duration: 8 + element.intensity * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {renderShape(element)}
          </motion.div>
        ))}
      </motion.div>

      {/* Interactive Geometric Patterns */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: useTransform(mouseX, [-20, 20], [-2, 2]),
          y: useTransform(mouseY, [-20, 20], [-2, 2])
        }}
      >
        {/* Large floating ring */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-32 h-32 border-4 border-[#8db1a4]/30 rounded-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <motion.div
            className="absolute top-1/2 left-1/2 w-4 h-4 bg-[#2d4f4a]/60 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Floating grid */}
        <motion.div
          className="absolute bottom-1/3 left-1/5 w-24 h-24"
          animate={{
            rotate: [0, 180, 360],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="grid grid-cols-3 gap-1 w-full h-full">
            {Array.from({ length: 9 }).map((_, i) => (
              <motion.div
                key={i}
                className="bg-[#dfeoe2]/40 border border-[#b8bcc3]/60 rounded-sm"
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.8, 1.1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* DNA Helix */}
        <motion.div
          className="absolute top-2/3 right-1/3 w-16 h-32"
          animate={{ rotate: [0, 360] }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-[#8db1a4]/50 rounded-full"
              style={{
                left: `${Math.sin((i * Math.PI) / 4) * 20 + 50}%`,
                top: `${(i / 8) * 100}%`,
              }}
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.4, 0.9, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Ambient Light Effects */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: useTransform(mouseX, [-20, 20], [-1, 1]),
          y: useTransform(mouseY, [-20, 20], [-1, 1])
        }}
      >
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            background: 'radial-gradient(circle, rgba(141, 177, 164, 0.2) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </motion.div>
    </div>
  );
}