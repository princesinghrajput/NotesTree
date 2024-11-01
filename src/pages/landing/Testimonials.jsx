import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, MessageCircle } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "NoteTree has completely transformed how I organize my thoughts. The AI-powered features are mind-blowing!",
    author: "Sarah Johnson",
    role: "Product Designer at Google",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 5
  },
  {
    id: 2,
    content: "The best note-taking app I've ever used. The tree structure makes it so intuitive to organize complex projects.",
    author: "Michael Chen",
    role: "Software Engineer at Meta",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    rating: 5
  },
  {
    id: 3,
    content: "Finally, a note-taking app that understands how my brain works. The visualization features are incredible.",
    author: "Emily Davis",
    role: "UX Researcher at Apple",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    rating: 5
  }
];

const TestimonialCard = ({ testimonial, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: index * 0.2 }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    className="relative group"
  >
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                    blur-xl group-hover:blur-2xl transition-all duration-300" />
    <div className="relative p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10">
      <div className="flex items-center space-x-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
        ))}
      </div>
      
      <Quote className="w-10 h-10 text-blue-400/20 absolute top-8 right-8" />
      
      <p className="text-gray-300 text-lg leading-relaxed mb-6">
        "{testimonial.content}"
      </p>
      
      <div className="flex items-center">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.author}
          className="w-12 h-12 rounded-full border-2 border-white/10"
        />
        <div className="ml-4">
          <h4 className="text-white font-medium">{testimonial.author}</h4>
          <p className="text-gray-400 text-sm">{testimonial.role}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

export const Testimonials = () => (
  <div className="relative py-32 bg-black overflow-hidden">
    {/* Background effects */}
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
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
          <MessageCircle className="w-4 h-4 mr-2 text-blue-500" />
          What people are saying
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          Loved by
          <span className="bg-gradient-to-r from-blue-400 to-violet-400 
                       text-transparent bg-clip-text"> thousands </span>
          of users
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg text-gray-400 max-w-3xl mx-auto"
        >
          Join thousands of satisfied users who have transformed their note-taking experience with NoteTree.
        </motion.p>
      </div>

      <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
        ))}
      </div>
    </div>
  </div>
); 