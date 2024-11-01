import { useState, useCallback } from 'react';
import { useNotes } from '../../../context/notes/NoteContext';

export const useNoteTree = () => {
  const { notes, updateNote, deleteNote } = useNotes();
  const [expandedNodes, setExpandedNodes] = useState(new Set(['root']));
  const [selectedNode, setSelectedNode] = useState(null);

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
        title: note.title,
        children,
        isExpanded: expandedNodes.has(note.id),
        isSelected: selectedNode === note.id,
        data: note
      };
    };

    const rootNodes = notes
      .filter(note => note.parentId === 'root')
      .map(note => buildNode(note.id))
      .filter(Boolean);

    return rootNodes;
  }, [notes, expandedNodes, selectedNode]);

  const toggleNode = useCallback((nodeId) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  }, []);

  const selectNode = useCallback((nodeId) => {
    setSelectedNode(nodeId);
  }, []);

  return {
    treeData: buildTreeData(),
    expandedNodes,
    selectedNode,
    toggleNode,
    selectNode
  };
}; 