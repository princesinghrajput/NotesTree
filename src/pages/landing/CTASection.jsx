import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';

export const CTASection = () => (
  <div className="relative py-24 bg-black overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
    </div>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 opacity-10" />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xl" />

        {/* Content */}
        <div className="relative px-8 py-16 sm:px-16 sm:py-24 lg:py-32 xl:flex xl:items-center">
          <div className="xl:w-0 xl:flex-1">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold tracking-tight text-white md:text-5xl xl:text-6xl"
            >
              Ready to transform your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                note-taking experience?
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="mt-6 max-w-lg mx-auto text-xl text-gray-300 xl:mx-0"
            >
              Join thousands of users who have already revolutionized how they capture and organize their thoughts.
            </motion.p>
          </div>

          <div className="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col space-y-4"
            >
              <Link
                to="/auth/register"
                className="group relative inline-flex items-center justify-center px-8 py-3.5 
                         rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 
                         text-white font-medium text-lg 
                         transition-all duration-300 transform hover:scale-105
                         hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 
                              blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                <span className="relative">Get Started Free</span>
              </Link>

              <Link
                to="/features"
                className="group inline-flex items-center justify-center px-8 py-3.5 
                         rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 
                         text-white font-medium text-lg hover:bg-white/20 
                         transition-all duration-300"
              >
                Learn More
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-4 text-sm text-gray-400 text-center xl:text-left"
            >
              No credit card required. Start for free and upgrade anytime.
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  </div>
); 