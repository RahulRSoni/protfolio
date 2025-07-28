"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamic import of Spline to prevent SSR issues
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => null
});

interface SplineSceneProps {
  sceneUrl: string;
  className?: string;
  enableInteraction?: boolean;
  autoRotate?: boolean;
}

// Loading component with your color scheme
function SplineLoader() {
  return (
    <motion.div 
      className="flex items-center justify-center h-full bg-gradient-to-br from-[#dfeoe2] to-white rounded-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative">
        {/* Outer rotating ring */}
        <motion.div
          className="w-16 h-16 border-4 border-[#8db1a4]/20 border-t-[#2d4f4a] rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner pulsing dot */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1.2 }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        >
          <div className="w-6 h-6 bg-[#2d4f4a] rounded-full opacity-60" />
        </motion.div>
        
        {/* Geometric floating elements */}
        <motion.div
          className="absolute -top-2 -right-2 w-3 h-3 bg-[#8db1a4] rounded-sm"
          animate={{ 
            y: [-5, 5, -5],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-2 -left-2 w-2 h-2 bg-[#2d4f4a] rounded-full"
          animate={{ 
            y: [5, -5, 5],
            x: [-2, 2, -2]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
      
      <motion.p
        className="absolute bottom-4 text-[#787a84] text-sm font-medium"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Loading 3D Experience...
      </motion.p>
    </motion.div>
  );
}

// Error fallback component
function SplineError() {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-[#dfeoe2] to-white rounded-xl border-2 border-dashed border-[#b8bcc3]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <motion.div
        className="text-4xl mb-4"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🎨
      </motion.div>
      <h3 className="text-[#0a0f1d] font-semibold mb-2">3D Scene Loading</h3>
      <p className="text-[#787a84] text-sm text-center max-w-xs">
        Interactive 3D content will appear here
      </p>
    </motion.div>
  );
}

export function SplineScene({ 
  sceneUrl, 
  className = "", 
  enableInteraction = true,
  autoRotate = false 
}: SplineSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const splineRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

      // Auto-rotate if enabled
      if (autoRotate) {
        const camera = spline.findObjectByName('Camera');
        if (camera) {
          // Add subtle auto-rotation
          setInterval(() => {
            if (camera.rotation) {
              camera.rotation.y += 0.005;
            }
          }, 16);
        }
      }

      // Add mouse interaction enhancements
      if (enableInteraction) {
        const scene = spline.scene;
        if (scene) {
          // Add hover effects or custom interactions here
          console.log('Spline scene loaded with interactions enabled');
        }
      }
    } catch (error) {
      console.error('Spline loading error:', error);
      setHasError(true);
    }
  }

  // Error handler
  function onError(error: any) {
    console.error('Spline scene error:', error);
    setHasError(true);
    setIsLoaded(false);
  }

  // Mouse interaction handlers
  function onMouseDown(e: any) {
    if (!enableInteraction) return;
    
    // Add custom mouse down interactions
    if (e.target?.name) {
      console.log('Clicked on:', e.target.name);
      // You can trigger animations or state changes here
    }
  }

  function onMouseHover(e: any) {
    if (!enableInteraction) return;
    
    // Add hover effects
    if (e.target?.name) {
      // Change cursor or trigger hover animations
      document.body.style.cursor = 'pointer';
    }
  }

  function onMouseHoverOut() {
    document.body.style.cursor = 'default';
  }

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      <AnimatePresence mode="wait">
        {!isLoaded && !hasError && (
          <motion.div
            key="loader"
            className="absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SplineLoader />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spline Scene */}
      {isInView && !hasError && (
        <motion.div
          className="w-full h-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: isLoaded ? 1 : 0,
            scale: isLoaded ? 1 : 0.95
          }}
          transition={{ duration: 0.6, delay: isLoaded ? 0.2 : 0 }}
        >
          <Suspense fallback={<SplineLoader />}>
          <Spline
            scene={sceneUrl}
            onLoad={onLoad}
            onError={onError}
            onSplineMouseDown={onMouseDown}
            onSplineMouseHover={onMouseHover}
            style={{ 
              width: '100%', 
              height: '100%',
              borderRadius: 'inherit'
            }}
          />
          </Suspense>
        </motion.div>
      )}

      {/* Error State */}
      {hasError && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <SplineError />
        </motion.div>
      )}

      {/* Loading Overlay for Better UX */}
      {!isLoaded && !hasError && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#dfeoe2]/50 to-white/50 backdrop-blur-sm"
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          style={{ pointerEvents: isLoaded ? 'none' : 'auto' }}
        />
      )}
    </div>
  );
}

// Export variants for different use cases
export function HeroSplineScene({ className }: { className?: string }) {
  return (
    <SplineScene
      sceneUrl="https://prod.spline.design/pvM5sSiYV2ivWraz/scene.splinecode"
      className={className}
      enableInteraction={true}
      autoRotate={false}
    />
  );
}

export function ServiceSplineScene({ className }: { className?: string }) {
  return (
    <SplineScene
      sceneUrl="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
      className={className}
      enableInteraction={true}
      autoRotate={true}
    />
  );
}

export function AboutSplineScene({ className }: { className?: string }) {
  return (
    <SplineScene
      sceneUrl="https://prod.spline.design/pvM5sSiYV2ivWraz/scene.splinecode"
      className={className}
      enableInteraction={false}
      autoRotate={true}
    />
  );
}