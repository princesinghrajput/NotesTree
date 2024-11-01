import { useState, useCallback } from 'react';

export const useTags = (initialTags = []) => {
  const [tags, setTags] = useState(initialTags);

  const addTag = useCallback((tag) => {
    setTags(prev => {
      if (prev.includes(tag)) return prev;
      return [...prev, tag];
    });
  }, []);

  const removeTag = useCallback((tagToRemove) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  }, []);

  const clearTags = useCallback(() => {
    setTags([]);
  }, []);

  return { 
    tags, 
    addTag, 
    removeTag, 
    clearTags 
  };
}; 