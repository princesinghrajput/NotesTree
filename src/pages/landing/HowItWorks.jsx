import React from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  TreePine, 
  Share2, 
  Zap,
  ArrowRight
} from 'lucide-react';

const steps = [
  {
    icon: Lightbulb,
    title: "Capture Ideas",
    description: "Start with a thought, no matter how small. Our intelligent editor helps you capture and expand your ideas effortlessly.",
    gradient: "from-amber-500 to-orange-500",
    delay: 0.2
  },
  {
    icon: TreePine,
    title: "Organize Naturally",
    description: "Watch your ideas grow into a beautiful knowledge tree. Connect related thoughts and create meaningful relationships.",
    gradient: "from-emerald-500 to-teal-500",
    delay: 0.3
  },
  {
    icon: Share2,
    title: "Collaborate",
    description: "Share branches of your knowledge tree with team members. Work together in real-time to grow ideas.",
    gradient: "from-blue-500 to-violet-500",
    delay: 0.4
  }
];

const StepCard = ({ step, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: step.delay }}
    viewport={{ once: true }}
    className="relative group"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black 
                    rounded-3xl transform rotate-1 group-hover:rotate-0 
                    transition-transform duration-300" />
    <div className="relative p-8 bg-black rounded-3xl border border-white/10">
      {/* Step Number */}
      <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-500 
                    to-violet-500 rounded-full flex items-center justify-center text-white 
                    font-bold text-sm">
        {index + 1}
      </div>

      {/* Icon */}
      <div className={`w-14 h-14 mb-6 rounded-2xl bg-gradient-to-r ${step.gradient}
                    flex items-center justify-center transform group-hover:scale-110 
                    transition-transform duration-300`}>
        <step.icon className="w-7 h-7 text-white" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
      <p className="text-gray-400 leading-relaxed">{step.description}</p>

      {/* Hover Arrow */}
      <div className="mt-6 flex items-center text-sm text-gray-400 group-hover:text-white 
                    transition-colors duration-200">
        <span>Learn more</span>
        <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 
                            transition-transform duration-200" />
      </div>
    </div>
  </motion.div>
);

export const HowItWorks = () => (
  <div className="relative py-32 bg-black overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]" />
    </div>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="inline-flex items-center px-4 py-1.5 rounded-full 
                   border border-gray-800 bg-gray-900/50 backdrop-blur-xl
                   text-sm font-medium text-gray-400 mb-8"
        >
          <Zap className="w-4 h-4 mr-2 text-blue-500" />
          How It Works
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          Turn your thoughts into a
          <span className="bg-gradient-to-r from-blue-400 to-violet-400 
                       text-transparent bg-clip-text"> beautiful tree</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg text-gray-400 max-w-3xl mx-auto"
        >
          Three simple steps to transform how you capture and organize your ideas.
          Start your journey to better note-taking today.
        </motion.p>
      </div>

      <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
        {steps.map((step, index) => (
          <StepCard key={step.title} step={step} index={index} />
        ))}
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <a
          href="#"
          className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r 
                   from-blue-500 to-violet-500 text-white font-medium hover:from-blue-600 
                   hover:to-violet-600 transition-all duration-200 group"
        >
          Get Started Free
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </a>
      </motion.div>
    </div>
  </div>
); 