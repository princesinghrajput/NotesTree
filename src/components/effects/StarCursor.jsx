import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const StarCursor = () => {
  const cursorRef = useRef(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = React.useState(false);
  const [stars, setStars] = React.useState([]);
  const [isClicking, setIsClicking] = React.useState(false);
  const starIdRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Create stars with varying frequency based on movement speed
      if (Math.random() < (isClicking ? 0.4 : 0.2)) {
        const newStar = {
          id: starIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 12 + 4,
          rotation: Math.random() * 360,
          color: getRandomColor()
        };
        setStars(prev => [...prev, newStar]);

        setTimeout(() => {
          setStars(prev => prev.filter(star => star.id !== newStar.id));
        }, 1000);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isClicking]);

  // Get random color from a curated palette
  const getRandomColor = () => {
    const colors = [
      'text-blue-400',
      'text-violet-400',
      'text-purple-400',
      'text-indigo-400',
      'text-cyan-400',
      'text-teal-400'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <>
      {/* Enhanced main cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-50"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isVisible ? (isClicking ? 0.8 : 1) : 0,
          opacity: isVisible ? 1 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      >
        {/* Outer ring */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500/30 to-violet-500/30 
                      backdrop-blur-sm p-0.5">
          {/* Inner ring */}
          <div className="w-full h-full rounded-full border border-white/50" />
        </div>
      </motion.div>

      {/* Animated stars with enhanced effects */}
      <AnimatePresence>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ 
              opacity: 1, 
              scale: 0,
              x: star.x - star.size / 2,
              y: star.y - star.size / 2,
              rotate: star.rotation
            }}
            animate={{ 
              opacity: 0,
              scale: 1,
              x: star.x - star.size / 2 + (Math.random() - 0.5) * 100,
              y: star.y - star.size / 2 + (Math.random() - 0.5) * 100,
              rotate: star.rotation + (Math.random() - 0.5) * 180
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              duration: 1,
              ease: "easeOut"
            }}
            className="fixed pointer-events-none z-40"
            style={{ width: star.size, height: star.size }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className={`w-full h-full ${star.color} filter drop-shadow-lg`}
            >
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}; 