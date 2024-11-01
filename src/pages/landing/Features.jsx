import React from 'react';
import { motion } from 'framer-motion';
import { 
  GitFork, 
  PenTool, 
  Share2, 
  Shield,
  Sparkles,
  Zap,
  Brain,
  Cloud
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Organization',
    description: 'Smart categorization and tagging powered by advanced AI to keep your notes perfectly organized.',
    gradient: 'from-purple-500 to-indigo-500',
    delay: 0.2
  },
  {
    icon: PenTool,
    title: 'Rich Formatting',
    description: 'Express your ideas with powerful formatting tools, code blocks, and embedded content.',
    gradient: 'from-blue-500 to-cyan-500',
    delay: 0.3
  },
  {
    icon: Cloud,
    title: 'Real-time Sync',
    description: 'Your notes sync instantly across all devices, ensuring you never lose a thought.',
    gradient: 'from-emerald-500 to-teal-500',
    delay: 0.4
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade encryption and security measures keep your data safe and private.',
    gradient: 'from-orange-500 to-amber-500',
    delay: 0.5
  }
];

const FeatureCard = ({ feature, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: feature.delay }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    className="relative group"
  >
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                    blur-xl group-hover:blur-2xl transition-all duration-300" />
    <div className="relative p-8 bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-200/50 
                    shadow-xl hover:shadow-2xl transition-all duration-300">
      {/* Icon with gradient background */}
      <div className={`relative w-14 h-14 mb-6 rounded-2xl bg-gradient-to-r ${feature.gradient}
                      flex items-center justify-center transform group-hover:scale-110 
                      transition-transform duration-300`}>
        <feature.icon className="w-7 h-7 text-white" />
        <div className="absolute inset-0 rounded-2xl bg-white opacity-0 
                      group-hover:opacity-20 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
        {feature.title}
        <Sparkles className="w-4 h-4 text-amber-500 opacity-0 group-hover:opacity-100 
                          transition-opacity duration-300" />
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {feature.description}
      </p>

      {/* Hover effect */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent 
                    group-hover:border-blue-500/20 transition-all duration-300" />
    </div>
  </motion.div>
);

export const Features = () => (
  <div className="relative py-32 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
    {/* Background effects */}
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
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
          Powerful Features
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          Everything you need to capture
          <span className="bg-gradient-to-r from-blue-400 to-violet-400 
                       text-transparent bg-clip-text"> brilliant ideas</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg text-gray-400 max-w-3xl mx-auto"
        >
          Powerful features combined with an intuitive interface make NoteTree
          the perfect tool for organizing your thoughts and boosting productivity.
        </motion.p>
      </div>

      <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} feature={feature} index={index} />
        ))}
      </div>
    </div>
  </div>
); 