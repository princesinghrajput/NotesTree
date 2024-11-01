import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: "How is NoteTree different from other note-taking apps?",
    answer: "NoteTree uniquely combines hierarchical organization with AI-powered features, making it easier to structure and connect your thoughts. Our visual tree structure provides an intuitive way to see relationships between notes."
  },
  {
    question: "Can I collaborate with others?",
    answer: "Yes! NoteTree offers real-time collaboration features. Share notes or entire trees with team members, and work together seamlessly with live updates and commenting."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use bank-grade encryption to protect your data, and our zero-knowledge architecture ensures that only you can access your notes. Your privacy is our top priority."
  },
  {
    question: "Can I access my notes offline?",
    answer: "Yes, NoteTree works offline! Your changes sync automatically when you're back online, ensuring you never lose your work."
  },
  {
    question: "What's the learning curve like?",
    answer: "NoteTree is designed to be intuitive from day one. Our smart onboarding process guides you through the features, and most users are productive within minutes."
  }
];

const FAQItem = ({ faq, isOpen, onToggle, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="relative group"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                    rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
    <div className="relative border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between text-left 
                 bg-white/5 hover:bg-white/10 transition-colors duration-200"
      >
        <span className="font-medium text-white">{faq.question}</span>
        {isOpen ? (
          <Minus className="w-5 h-5 text-gray-400" />
        ) : (
          <Plus className="w-5 h-5 text-gray-400" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 py-4 text-gray-400"
          >
            {faq.answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </motion.div>
);

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="relative py-32 bg-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-1.5 rounded-full 
                     border border-gray-800 bg-gray-900/50 backdrop-blur-xl
                     text-sm font-medium text-gray-400 mb-8"
          >
            <HelpCircle className="w-4 h-4 mr-2 text-blue-500" />
            FAQ
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}; 