"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamic import of Spline to prevent SSR issues
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => null
});

interface FullscreenSplineBackgroundProps {
  sceneUrl?: string;
  opacity?: number;
  enableParallax?: boolean;
  enableInteraction?: boolean;
  className?: string;
}

// Enhanced loading component with your color scheme
function FullscreenSplineLoader() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#dfeoe2] via-white to-[#b8bcc3]/20">
      {/* Animated geometric shapes as fallback */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
            }}
            animate={{
              y: [0, -50, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 8,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          >
            <div
              className={`w-full h-full rounded-xl border-2 backdrop-blur-sm ${
                i % 4 === 0 ? 'bg-[#8db1a4]/20 border-[#8db1a4]/30' :
                i % 4 === 1 ? 'bg-[#2d4f4a]/20 border-[#2d4f4a]/30' :
                i % 4 === 2 ? 'bg-[#dfeoe2]/40 border-[#dfeoe2]/50' :
                'bg-[#b8bcc3]/20 border-[#b8bcc3]/30'
              }`}
              style={{
                transform: `perspective(1000px) rotateX(${Math.random() * 30}deg) rotateY(${Math.random() * 30}deg)`,
                clipPath: i % 3 === 0 ? 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' : 'none',
                borderRadius: i % 2 === 0 ? '50%' : '12px',
              }}
            />
          </motion.div>
        ))}
      </div>
      
      {/* Central loading indicator */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative mb-6">
            <motion.div
              className="w-20 h-20 border-4 border-[#8db1a4]/20 border-t-[#2d4f4a] rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-8 h-8 bg-[#2d4f4a] rounded-full" />
            </motion.div>
          </div>
          
          <motion.p
            className="text-[#787a84] text-lg font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Loading Immersive Experience...
          </motion.p>
        </motion.div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: ['#8db1a4', '#2d4f4a', '#dfeoe2'][Math.floor(Math.random() * 3)],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100, -20],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function FullscreenSplineBackground({
  sceneUrl = "https://prod.spline.design/pvM5sSiYV2ivWraz/scene.splinecode",
  opacity = 0.8,
  enableParallax = true,
  enableInteraction = true,
  className = ""
}: FullscreenSplineBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const splineRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax scroll effects
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [opacity, opacity * 0.7, opacity * 0.3]);

  // Intersection Observer for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Spline scene loaded callback
  function onLoad(spline: any) {
    try {
      setIsLoaded(true);
      setHasError(false);
      splineRef.current = spline;

      // Enhanced scene setup for background use
      if (spline.scene) {
        // Make the scene more suitable for background use
        const camera = spline.findObjectByName('Camera');
        if (camera) {
          // Adjust camera for better background composition
          camera.position.z = camera.position.z * 1.2; // Pull back slightly
        }

        // Add subtle auto-rotation for dynamic effect
        const mainObjects = spline.scene.children.filter((child: any) => 
          child.type === 'Mesh' || child.type === 'Group'
        );
        
        if (mainObjects.length > 0 && enableInteraction) {
          const rotationSpeed = 0.002;
          const animateScene = () => {
            mainObjects.forEach((obj: any, index: number) => {
              if (obj.rotation) {
                obj.rotation.y += rotationSpeed * (index % 2 === 0 ? 1 : -1);
                obj.rotation.x += rotationSpeed * 0.5;
              }
            });
            if (!hasError) {
              requestAnimationFrame(animateScene);
            }
          };
          animateScene();
        }
      }
    } catch (error) {
      console.error('Spline background loading error:', error);
      setHasError(true);
    }
  }

  // Error handler
  function onError(error: any) {
    console.error('Spline background scene error:', error);
    setHasError(true);
    setIsLoaded(false);
  }

  // Mouse event handlers - CORRECTED
  function onSplineMouseDown(e: any) {
    if (enableInteraction) {
      console.log('Spline mouse down:', e);
      // Add your mouse down logic here
    }
  }

  function onSplineMouseHover(e: any) {
    if (enableInteraction) {
      console.log('Spline mouse hover:', e);
      setIsHovered(true);
      // Add your hover logic here
    }
  }

  // Handle container mouse leave to detect hover out
  function handleContainerMouseLeave() {
    setIsHovered(false);
    console.log('Mouse left Spline area');
    // Add your hover out logic here
  }

  return (
    <motion.div 
      ref={containerRef}
      className={`fixed inset-0 z-0 ${className}`}
      style={{ 
        opacity: enableParallax ? backgroundOpacity : opacity,
        y: enableParallax ? y : 0,
        scale: enableParallax ? scale : 1
      }}
      onMouseLeave={handleContainerMouseLeave} // Handle hover out at container level
    >
      {/* Spline Background Scene */}
      {isInView && !hasError && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <Suspense fallback={<FullscreenSplineLoader />}>
            <Spline
              scene={sceneUrl}
              onLoad={onLoad}
              onError={onError}
              onSplineMouseDown={onSplineMouseDown}
              onSplineMouseHover={onSplineMouseHover}
              // Note: onSplineMouseHoverOut doesn't exist - using container onMouseLeave instead
              style={{ 
                width: '100%', 
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1,
                cursor: enableInteraction ? 'pointer' : 'default'
              }}
            />
          </Suspense>
        </motion.div>
      )}

      {/* Enhanced Loading State */}
      <AnimatePresence>
        {(!isLoaded && !hasError) && (
          <motion.div
            key="loader"
            className="absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FullscreenSplineLoader />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error State with Animated Fallback */}
      {hasError && (
        <motion.div
          className="absolute inset-0 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FullscreenSplineLoader />
        </motion.div>
      )}

      {/* Overlay for better content readability */}
      <motion.div
        className="absolute inset-0 z-20 bg-gradient-to-b from-transparent via-white/10 to-white/30 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* Hover state indicator (optional visual feedback) */}
      {isHovered && enableInteraction && (
        <motion.div
          className="absolute inset-0 z-15 bg-[#8db1a4]/5 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
}

// Export variants for different scenes
export function HeroSplineBackground() {
  return (
    <FullscreenSplineBackground
      sceneUrl="https://prod.spline.design/pvM5sSiYV2ivWraz/scene.splinecode"
      opacity={0.9}
      enableParallax={true}
      enableInteraction={true}
    />
  );
}

export function AlternativeSplineBackground() {
  return (
    <FullscreenSplineBackground
      sceneUrl="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
      opacity={0.7}
      enableParallax={true}
      enableInteraction={false}
    />
  );
}