import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Star, Globe } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '50K+',
    label: 'Active Users',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: FileText,
    value: '1M+',
    label: 'Notes Created',
    gradient: 'from-violet-500 to-purple-500'
  },
  {
    icon: Star,
    value: '4.9/5',
    label: 'User Rating',
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    icon: Globe,
    value: '120+',
    label: 'Countries',
    gradient: 'from-emerald-500 to-teal-500'
  }
];

export const Stats = () => (
  <div className="relative py-20 bg-black overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]" />
    </div>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                          rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="relative p-8 rounded-3xl border border-white/10 bg-black/50 backdrop-blur-xl">
              <div className={`w-12 h-12 mb-4 rounded-2xl bg-gradient-to-r ${stat.gradient} 
                            flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
); 