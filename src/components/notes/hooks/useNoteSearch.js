import { useState, useCallback, useMemo } from 'react';

export const useNoteSearch = (treeData) => {
  const [searchTerm, setSearchTerm] = useState('');

  const searchNodes = useCallback((nodes, term) => {
    if (!term.trim()) return nodes;

    const searchInNode = (node) => {
      const matchesTitle = node.title.toLowerCase().includes(term.toLowerCase());
      
      let matchingChildren = [];
      if (node.children?.length) {
        matchingChildren = node.children
          .map(child => searchInNode(child))
          .filter(Boolean);
      }

      if (matchesTitle || matchingChildren.length > 0) {
        return {
          ...node,
          children: matchingChildren
        };
      }

      return null;
    };

    return nodes
      .map(node => searchInNode(node))
      .filter(Boolean);
  }, []);

  const filteredNotes = useMemo(() => {
    return searchNodes(treeData, searchTerm);
  }, [treeData, searchTerm, searchNodes]);

  return {
    searchTerm,
    setSearchTerm,
    filteredNotes
  };
}; 