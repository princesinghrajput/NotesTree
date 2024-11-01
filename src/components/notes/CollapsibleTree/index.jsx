import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import Tree from 'react-d3-tree';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotes } from '../../../context/NoteContext';
import CustomNode from './CustomNode';
import ContextMenu from './ContextMenu';
import QuickAddPanel from './QuickAddPanel';
import useOutsideClick from '../../../hooks/common/useOutsideClick';
import toast from 'react-hot-toast';
import { PlusIcon, MinusIcon } from 'lucide-react';

const CollapsibleTree = () => {
  const { notes, addNote, setActiveNote, activeNote, deleteNote, updateNote, moveNote } = useNotes();
  console.log('Context values:', { 
    hasNotes: Boolean(notes), 
    hasAddNote: Boolean(addNote),
    hasUpdateNote: Boolean(updateNote),
    hasDeleteNote: Boolean(deleteNote)
  });
  const [selectedNode, setSelectedNode] = useState(null);
  const [draggedNode, setDraggedNode] = useState(null);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickAddPosition, setQuickAddPosition] = useState({ x: 0, y: 0 });
  const [contextMenu, setContextMenu] = useState(null);
  const treeContainer = useRef(null);
  const [zoom, setZoom] = useState(0.8);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Move buildTreeData before its usage in filteredTreeData
  const buildTreeData = useCallback(() => {
    const buildNode = (noteId, depth = 0) => {
      const note = notes.find(n => n.id === noteId);
      if (!note) return null;

      const children = notes
        .filter(n => n.parentId === noteId)
        .map(child => buildNode(child.id, depth + 1))
        .filter(Boolean);

      return {
        id: note.id,
        name: note.title,
        children,
        depth,
        attributes: {
          created: new Date(note.createdAt).toLocaleDateString(),
          tags: note.tags?.join(', ') || ''
        }
      };
    };

    const rootNodes = notes
      .filter(note => note.parentId === 'root')
      .map(note => buildNode(note.id))
      .filter(Boolean);

    return {
      name: 'My Notes',
      children: rootNodes
    };
  }, [notes]);

  // Add search functionality
  const filteredTreeData = useMemo(() => {
    if (!searchTerm) return buildTreeData();
    
    const filterNode = (node) => {
      if (node.name.toLowerCase().includes(searchTerm.toLowerCase())) return true;
      if (node.children) {
        node.children = node.children.filter(child => filterNode(child));
        return node.children.length > 0;
      }
      return false;
    };

    const data = buildTreeData();
    data.children = data.children.filter(filterNode);
    return data;
  }, [buildTreeData, searchTerm]);

  // Add loading effect
  useEffect(() => {
    setIsLoading(true);
    try {
      // Simulate loading time for smoother UX
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to load notes');
      setIsLoading(false);
    }
  }, []);

  // Add zoom controls with smooth animation
  const handleZoom = useCallback((delta) => {
    setZoom(prev => {
      const newZoom = prev + delta;
      return Math.min(Math.max(newZoom, 0.3), 2);
    });
  }, []);

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e) => {
      if (e.key === 'f' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        document.querySelector('#search-input')?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, []);

  // Handle node editing
  const handleEditNode = useCallback((nodeId, newName) => {
    try {
      console.log('Editing node:', nodeId, newName); // Debug log
      updateNote(nodeId, { title: newName });
      toast.success('Note updated successfully');
    } catch (error) {
      console.error('Failed to update note:', error);
      toast.error('Failed to update note');
    }
  }, [updateNote]);

  // Handle node clicking
  const handleNodeClick = useCallback((nodeDatum) => {
    try {
      console.log('Node clicked:', nodeDatum); // Debug log
      setActiveNote(nodeDatum.id);
      setSelectedNode(nodeDatum);
    } catch (error) {
      console.error('Error handling node click:', error);
    }
  }, [setActiveNote]);

  // Handle adding child node
  const handleAddChild = useCallback((parentNode, position) => {
    setSelectedNode(parentNode);
    setQuickAddPosition({
      x: position?.x || window.innerWidth / 2,
      y: position?.y || window.innerHeight / 2
    });
    setShowQuickAdd(true);
  }, []);

  // Handle node movement
  const handleNodeMove = useCallback((sourceId, targetId) => {
    if (sourceId === targetId) return;
    
    try {
      // Implement the actual node moving logic here
      const sourceNode = notes.find(n => n.id === sourceId);
      if (sourceNode) {
        updateNote(sourceId, { ...sourceNode, parentId: targetId });
        toast.success('Note moved successfully');
      }
    } catch (error) {
      console.error('Failed to move note:', error);
      toast.error('Failed to move note');
    }
  }, [notes, updateNote]);

  // Add handleDrop function
  const handleDrop = useCallback((draggedId, targetId) => {
    if (draggedId === targetId) return;
    
    try {
      const success = moveNote(draggedId, targetId);
      if (success) {
        toast.success('Note moved successfully');
      } else {
        toast.error('Cannot move a note to its descendant');
      }
    } catch (error) {
      console.error('Failed to move note:', error);
      toast.error('Failed to move note');
    }
  }, [moveNote]);

  // Add handleDelete callback
  const handleDelete = useCallback((nodeId) => {
    try {
      deleteNote(nodeId);
      toast.success('Note deleted successfully');
    } catch (error) {
      console.error('Failed to delete note:', error);
      toast.error('Failed to delete note');
    }
  }, [deleteNote]);

  return (
    <div ref={treeContainer} className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Add search bar */}
      <div className="absolute top-4 left-4 z-10">
        <input
          id="search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search notes... (Ctrl/⌘ + F)"
          className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm
                    border border-gray-200 focus:outline-none focus:ring-2 
                    focus:ring-blue-400 w-64 transition-all duration-200"
        />
      </div>

      {/* Add loading state */}
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-full text-red-500">
          {error}
        </div>
      ) : (
        <Tree
          data={filteredTreeData}
          nodeSize={{ x: 220, y: 100 }}
          orientation="horizontal"
          renderCustomNodeElement={(rd3tProps) => (
            <CustomNode
              {...rd3tProps}
              isActive={rd3tProps.nodeDatum.id === activeNote}
              depth={rd3tProps.nodeDatum.depth || 0}
              onNodeClick={() => handleNodeClick(rd3tProps.nodeDatum)}
              onContextMenu={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setContextMenu({
                  x: e.pageX,
                  y: e.pageY,
                  nodeData: rd3tProps.nodeDatum
                });
              }}
              onDragStart={(e) => {
                setDraggedNode(rd3tProps.nodeDatum);
                e.dataTransfer.setData('text/plain', rd3tProps.nodeDatum.id);
              }}
              onDrop={handleDrop}
              onAddChild={(e, position) => {
                e.stopPropagation();
                handleAddChild(rd3tProps.nodeDatum, position);
              }}
              onEditNode={handleEditNode}
              onDelete={() => handleDelete(rd3tProps.nodeDatum.id)}
            />
          )}
          pathClassFunc={() => 'stroke-blue-300 stroke-2 transition-all duration-300'}
          translate={{ x: 100, y: window.innerHeight / 2 }}
          separation={{ siblings: 2, nonSiblings: 2.5 }}
          zoom={zoom}
          onUpdate={({ zoom }) => setZoom(zoom)}
          enableLegacyTransitions={true}
          transitionDuration={300}
        />
      )}

      {/* Context Menu */}
      <AnimatePresence>
        {contextMenu && (
          <ContextMenu
            position={contextMenu}
            onClose={() => setContextMenu(null)}
            onAddChild={(e) => handleAddChild(contextMenu.nodeData, { x: contextMenu.x, y: contextMenu.y })}
            onDelete={() => {
              deleteNote(contextMenu.nodeData.id);
              setContextMenu(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Quick Add Panel */}
      <AnimatePresence>
        {showQuickAdd && (
          <QuickAddPanel
            position={quickAddPosition}
            onAdd={(title) => {
              addNote(selectedNode?.id || 'root', title);
              setShowQuickAdd(false);
            }}
            onClose={() => setShowQuickAdd(false)}
          />
        )}
      </AnimatePresence>

      {/* Enhanced zoom controls */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleZoom(0.2)}
          className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 
                   transition-colors duration-200 focus:outline-none focus:ring-2
                   focus:ring-blue-400"
        >
          <PlusIcon className="w-6 h-6 text-gray-600" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleZoom(-0.2)}
          className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 
                   transition-colors duration-200 focus:outline-none focus:ring-2
                   focus:ring-blue-400"
        >
          <MinusIcon className="w-6 h-6 text-gray-600" />
        </motion.button>
      </div>
    </div>
  );
};

export default CollapsibleTree; 