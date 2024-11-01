import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTrail, a } from '@react-spring/web';
import gsap from 'gsap';

const Particles = () => {
  const mesh = useRef();
  const trail = useRef([]);
  const maxTrail = 20;

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }

    // Update trail
    const mousePosition = state.mouse;
    trail.current.unshift({ x: mousePosition.x, y: mousePosition.y });
    if (trail.current.length > maxTrail) {
      trail.current.pop();
    }
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshStandardMaterial 
        color="#4f46e5"
        emissive="#818cf8"
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

export const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [trail, api] = useTrail(5, () => ({
    xy: [0, 0],
    config: { mass: 1, tension: 280, friction: 60 }
  }));

  useEffect(() => {
    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      
      // Animate main cursor
      gsap.to(cursorRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.2,
        ease: "power2.out"
      });

      // Animate cursor dot
      gsap.to(cursorDotRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.1
      });

      // Update trail
      api.start({ xy: [clientX, clientY] });
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [api]);

  return (
    <>
      {/* Main cursor */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="relative w-full h-full">
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Particles />
          </Canvas>
        </div>
      </div>

      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full 
                   pointer-events-none z-50 mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />

      {/* Trailing effect */}
      {trail.map((props, index) => (
        <a.div
          key={index}
          className="fixed top-0 left-0 w-1 h-1 rounded-full pointer-events-none 
                     bg-gradient-to-r from-blue-500 to-violet-500"
          style={{
            transform: props.xy.to((x, y) => `translate(${x}px, ${y}px)`),
            opacity: 1 - index * 0.2
          }}
        />
      ))}
    </>
  );
}; 