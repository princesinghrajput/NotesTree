import React from 'react';
import { ChevronRight, ChevronDown, File, Folder } from 'lucide-react';

const TreeNode = ({ 
  node, 
  isExpanded, 
  isSelected, 
  onToggle, 
  onSelect, 
  onContextMenu,
  isDragging,
  isDropTarget 
}) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onSelect(node);
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    onToggle(node);
  };

  return (
    <div
      className={`
        flex items-center p-2 rounded-lg cursor-pointer
        ${isSelected ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}
        ${isDragging ? 'opacity-50' : ''}
        ${isDropTarget ? 'border-2 border-blue-400' : ''}
      `}
      onClick={handleClick}
      onContextMenu={(e) => onContextMenu(e, node)}
    >
      <button
        onClick={handleToggle}
        className="p-1 hover:bg-gray-100 rounded"
      >
        {node.children?.length > 0 ? (
          isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
        ) : null}
      </button>
      
      {node.children?.length > 0 ? (
        <Folder size={16} className="mx-2 text-gray-500" />
      ) : (
        <File size={16} className="mx-2 text-gray-500" />
      )}
      
      <span className="truncate">{node.title}</span>
    </div>
  );
};

export default TreeNode; 