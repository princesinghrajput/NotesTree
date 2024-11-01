import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, TagIcon, EditIcon } from '../../icons';
import { colors, animations } from '../../../theme/colors';

const CustomNode = ({ 
  nodeDatum, 
  toggleNode, 
  isActive,
  onNodeClick,
  onContextMenu,
  onDragStart,
  onDrop,
  onAddChild,
  onEditNode,
  onDelete,
  depth = 0
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(nodeDatum.name);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isDraggingForChild, setIsDraggingForChild] = useState(false);
  const [dragLine, setDragLine] = useState(null);
  const nodeRef = useRef(null);
  const dragTimer = useRef(null);
  const dragStartPos = useRef(null);
  
  const getNodeColors = () => {
    if (isActive) return colors.node.selected;
    if (nodeDatum.id === 'root') return colors.node.root;
    if (!nodeDatum.children?.length) return colors.node.leaf;
    if (depth <= 1) return colors.node.parent;
    return colors.node.child;
  };

  const nodeColors = getNodeColors();
  const nodeSize = nodeDatum.id === 'root' ? 30 : 25;

  // Handle drag start with visual feedback
  const handleDragStart = (e) => {
    e.stopPropagation();
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    
    dragTimer.current = setTimeout(() => {
      setIsDraggingForChild(true);
      document.body.style.cursor = 'grabbing';
    }, 500);
    
    if (onDragStart) {
      onDragStart(nodeDatum.id);
    }
  };

  // Handle drag with line visualization
  const handleDrag = (e) => {
    if (!isDraggingForChild || !nodeRef.current) return;
    
    const rect = nodeRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update drag line position
    setDragLine({
      x1: 0,
      y1: 0,
      x2: x,
      y2: y
    });
  };

  const handleDragEnd = (e) => {
    clearTimeout(dragTimer.current);
    document.body.style.cursor = 'default';
    setIsDraggingForChild(false);
    setDragLine(null);

    if (dragStartPos.current) {
      const dx = e.clientX - dragStartPos.current.x;
      const dy = e.clientY - dragStartPos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 50 && isDraggingForChild) {
        const rect = nodeRef.current.getBoundingClientRect();
        onAddChild(e, {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    }
    dragStartPos.current = null;
  };

  // Double click to edit
  const handleDoubleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(true);
    console.log('Double click triggered');
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editedName.trim() && editedName !== nodeDatum.name) {
      onEditNode(nodeDatum.id, editedName.trim());
    }
    setIsEditing(false);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      clearTimeout(dragTimer.current);
      document.body.style.cursor = 'default';
    };
  }, []);

  // Add useEffect for handling double-click editing
  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const handleDblClick = (e) => {
      e.stopPropagation();
      setIsEditing(true);
    };

    node.addEventListener('dblclick', handleDblClick);
    return () => node.removeEventListener('dblclick', handleDblClick);
  }, []);

  const handleCircleClick = (e) => {
    e.stopPropagation();
    onNodeClick(nodeDatum);
    console.log('Circle clicked');
  };

  // Add handleDrop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
    
    const draggedId = e.dataTransfer.getData('text/plain');
    if (draggedId && onDrop) {
      onDrop(draggedId, nodeDatum.id);
    }
  };

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e) => {
      if (!isActive) return;
      
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        onDelete?.();
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        onAddChild?.(e, { x: 0, y: 0 });
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [isActive, onDelete, onAddChild]);

  // Add tooltips
  const buttonWithTooltip = (icon, label, onClick) => (
    <div className="group relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
      >
        {icon}
      </motion.button>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1
                    bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100
                    transition-opacity duration-200 whitespace-nowrap">
        {label}
      </div>
    </div>
  );

  return (
    <motion.g
      ref={nodeRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="group cursor-pointer"
      onDoubleClick={handleDoubleClick}
    >
      {/* Node Circle */}
      <motion.circle 
        r={nodeSize}
        fill={`url(#gradient-${nodeDatum.id || 'root'})`}
        className="node-circle transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCircleClick}
        onContextMenu={onContextMenu}
        draggable="true"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        filter="url(#glow)"
      />

      {/* Node Content */}
      <g transform="translate(35, 0)">
        <AnimatePresence mode="wait">
          {isEditing ? (
            <foreignObject
              width="200"
              height="40"
              x="-100"
              y="-20"
              className="overflow-visible"
            >
              <motion.div
                {...animations.scale}
                className="bg-white rounded-lg shadow-lg p-1"
              >
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  onBlur={handleEditSubmit}
                  className="w-full px-2 py-1 text-sm border rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-primary-500
                           bg-white"
                  autoFocus
                />
              </motion.div>
            </foreignObject>
          ) : (
            <motion.text
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              dy=".31em"
              className={`text-sm font-medium select-none
                ${isActive ? 'fill-primary-900' : 'fill-gray-700'}`}
            >
              {nodeDatum.name}
            </motion.text>
          )}
        </AnimatePresence>

        {/* Quick Actions */}
        <motion.g 
          className="quick-actions"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transform="translate(0, -25)"
        >
          <rect
            x="-25"
            y="-12"
            width="50"
            height="24"
            rx="12"
            fill="white"
            className="shadow-md"
          />
          {/* Action buttons */}
        </motion.g>
      </g>

      {/* Gradients & Filters */}
      <defs>
        <radialGradient 
          id={`gradient-${nodeDatum.id || 'root'}`}
          gradientUnits="userSpaceOnUse"
        >
          <stop 
            offset="0%" 
            stopColor={nodeColors.primary}
          />
          <stop 
            offset="100%" 
            stopColor={nodeColors.secondary}
          />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    </motion.g>
  );
};

export default CustomNode;