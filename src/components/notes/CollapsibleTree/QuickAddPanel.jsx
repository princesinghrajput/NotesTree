import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { colors, animations } from '../../../theme/colors';

const QuickAddPanel = ({ position, onAdd, onClose, initialValue = '' }) => {
  const [title, setTitle] = useState(initialValue);
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus input with a slight delay to ensure animation doesn't interfere
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      className="fixed bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 z-50 w-80
                border border-gray-100"
      style={{ left: position.x, top: position.y }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="noteTitle" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Note Title
          </label>
          <input
            ref={inputRef}
            id="noteTitle"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title..."
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                     text-sm placeholder-gray-400 transition-all duration-200"
          />
        </div>
        <div className="flex justify-end gap-2">
          <motion.button
            type="button"
            onClick={onClose}
            whileHover={{ backgroundColor: colors.gray[100] }}
            whileTap={{ scale: 0.98 }}
            className="px-3 py-1.5 text-sm text-gray-600 rounded-md
                     transition-colors duration-150"
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            whileHover={{ backgroundColor: colors.primary[600] }}
            whileTap={{ scale: 0.98 }}
            className="px-3 py-1.5 text-sm text-white bg-primary-500 rounded-md
                     transition-colors duration-150"
          >
            Add Note
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default QuickAddPanel; 