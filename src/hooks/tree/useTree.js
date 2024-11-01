import { useState, useCallback } from 'react';

export const useTree = (notes) => {
  const [expandedNodes, setExpandedNodes] = useState(new Set(['root']));

  const buildTreeData = useCallback(() => {
    const buildNode = (noteId) => {
      const note = notes.find(n => n.id === noteId);
      if (!note) return null;

      const children = notes
        .filter(n => n.parentId === noteId)
        .map(child => buildNode(child.id))
        .filter(Boolean);

      return {
        id: note.id,
        name: note.title,
        children,
        hasChildren: children.length > 0,
        isExpanded: expandedNodes.has(note.id),
        attributes: {
          created: new Date(note.createdAt).toLocaleDateString(),
          tags: note.tags.join(', ')
        }
      };
    };

    return {
      name: 'My Notes',
      children: notes
        .filter(note => note.parentId === 'root')
        .map(note => buildNode(note.id))
        .filter(Boolean),
      isExpanded: true
    };
  }, [notes, expandedNodes]);

  const toggleNode = useCallback((nodeId) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  }, []);

  return { 
    buildTreeData, 
    toggleNode, 
    expandedNodes 
  };
}; 