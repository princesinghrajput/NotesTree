import { useState, useCallback } from 'react';

export const useTreeSelection = (setActiveNote) => {
  const [selectedNode, setSelectedNode] = useState(null);

  const selectNode = useCallback((nodeData) => {
    if (nodeData?.id) {
      setSelectedNode(nodeData);
      setActiveNote(nodeData.id);
    }
  }, [setActiveNote]);

  return {
    selectedNode,
    selectNode
  };
}; 