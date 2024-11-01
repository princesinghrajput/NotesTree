import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, ArrowRight } from 'lucide-react';
import KUTE from 'kute.js';
import { TypeAnimation } from 'react-type-animation';
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { CustomCursor } from '../../components/effects/CustomCursor';
import { StarCursor } from '../../components/effects/StarCursor';

export const Hero = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  useEffect(() => {
    // Animate the blob
    const tween = KUTE.fromTo(
      '#blob1',
      { path: '#blob1' },
      { path: '#blob2' },
      { repeat: 999, duration: 3000, yoyo: true }
    );
    tween.start();
  }, []);

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <div ref={targetRef} className="relative min-h-screen overflow-hidden bg-black">
      <StarCursor />
      {/* Enhanced Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: false,
          background: {
            color: "transparent",
          },
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: ["#3b82f6", "#8b5cf6", "#6366f1"] },
            shape: {
              type: ["circle", "triangle", "polygon"],
              polygon: { nb_sides: 6 },
            },
            opacity: {
              value: 0.3,
              random: true,
              anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
            },
            size: {
              value: 3,
              random: true,
              anim: { enable: true, speed: 2, size_min: 0.3, sync: false }
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#a5b4fc",
              opacity: 0.2,
              width: 1
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "bounce",
              bounce: false,
              attract: { enable: true, rotateX: 600, rotateY: 1200 }
            }
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: ["grab", "bubble"]
              },
              onclick: {
                enable: true,
                mode: "push"
              },
              resize: true
            },
            modes: {
              grab: {
                distance: 140,
                line_linked: {
                  opacity: 0.5
                }
              },
              bubble: {
                distance: 200,
                size: 8,
                duration: 2,
                opacity: 0.8,
                speed: 3
              },
              push: {
                particles_nb: 4
              }
            }
          },
          retina_detect: true
        }}
      />

      {/* Animated Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-violet-500/10 to-purple-500/10 animate-gradient-xy" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_100%)]" />
      </div>

      {/* Animated Gradient Blob */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute w-full h-full opacity-40" viewBox="0 0 900 600">
          <g transform="translate(450,300)">
            <path
              id="blob1"
              d="M120,-157.6C152.7,-141.5,174.3,-102.6,194.8,-58.8C215.3,-14.9,234.7,33.8,228.4,80.8C222.2,127.8,190.4,173,148.1,184C105.8,195,53,171.8,1.7,169.5C-49.5,167.2,-99,185.8,-146.2,175.6C-193.4,165.4,-238.2,126.4,-250.1,78.6C-262,30.8,-241,-25.9,-212.2,-69.5C-183.4,-113.1,-146.8,-143.6,-107.8,-156.7C-68.8,-169.8,-27.4,-165.5,11.9,-181.5C51.2,-197.5,87.3,-173.7,120,-157.6Z"
              fill="url(#gradient1)"
            />
            <path
              id="blob2"
              d="M137.4,-191.2C175.8,-172.4,203.5,-133.6,216.7,-90.1C229.9,-46.7,228.6,1.3,214.9,43.2C201.3,85.1,175.3,120.8,141.6,150.8C107.9,180.8,66.5,205,-1.7,207.2C-69.8,209.4,-139.6,189.7,-181.8,151.1C-224,112.4,-238.6,54.7,-230.4,2.2C-222.2,-50.3,-191.2,-97.5,-153.2,-117.4C-115.2,-137.2,-70.3,-129.6,-27.7,-153.5C14.9,-177.4,99,-210,137.4,-191.2Z"
              fill="url(#gradient1)"
              style={{ visibility: 'hidden' }}
            />
            <defs>
              <linearGradient id="gradient1" gradientTransform="rotate(45)">
                <stop offset="5%" stopColor="rgba(59, 130, 246, 0.2)" />
                <stop offset="95%" stopColor="rgba(139, 92, 246, 0.2)" />
              </linearGradient>
            </defs>
          </g>
        </svg>
      </div>

      {/* Content */}
      <motion.div 
        style={{ opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16"
      >
        <div className="text-center">
          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center px-4 py-1.5 rounded-full 
                     bg-white/10 backdrop-blur-lg border border-white/20
                     text-sm font-medium mb-8 group cursor-pointer
                     hover:bg-white/20 transition-all duration-300"
          >
            <Sparkles className="w-4 h-4 mr-2 text-blue-400" />
            <span className="text-white/80">Introducing NoteTree 2.0</span>
            <div className="relative ml-2">
              <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Dynamic Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative mb-6"
          >
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white">
              Your thoughts,{' '}
              <span className="relative">
                <TypeAnimation
                  sequence={[
                    'organized',
                    2000,
                    'connected',
                    2000,
                    'visualized',
                    2000,
                  ]}
                  wrapper="span"
                  repeat={Infinity}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400"
                />
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-xl text-gray-300/80 max-w-3xl mx-auto 
                     leading-relaxed tracking-wide"
          >
            Experience note-taking reimagined. Craft your ideas with precision,
            organize with intelligence, and collaborate seamlessly in real-time.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4 px-4"
          >
            <Link
              to="/auth/register"
              className="group relative inline-flex items-center justify-center px-8 py-3.5 
                       rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 
                       text-white font-medium text-lg 
                       transition-all duration-300 transform hover:scale-105
                       hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 
                            blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
              <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              <span className="relative">Start Creating</span>
            </Link>
            <Link
              to="/auth/login"
              className="relative inline-flex items-center justify-center px-8 py-3.5 
                       rounded-2xl bg-white/10 backdrop-blur-lg text-white 
                       font-medium text-lg border border-white/20
                       hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              Sign In
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
