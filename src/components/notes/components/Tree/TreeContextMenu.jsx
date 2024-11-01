import React from 'react';
import { 
  Plus, Trash, Edit, Link, Tag, 
  Copy, ArrowUp, ArrowDown 
} from 'lucide-react';

const TreeContextMenu = ({ 
  position, 
  onClose, 
  onAddChild,
  onDelete,
  onEdit,
  onMoveUp,
  onMoveDown,
  isRoot 
}) => {
  if (!position) return null;

  const menuItems = [
    {
      icon: Plus,
      label: 'Add Child Note',
      onClick: onAddChild
    },
    {
      icon: Edit,
      label: 'Edit Note',
      onClick: onEdit
    },
    {
      icon: ArrowUp,
      label: 'Move Up',
      onClick: onMoveUp,
      disabled: isRoot
    },
    {
      icon: ArrowDown,
      label: 'Move Down',
      onClick: onMoveDown,
      disabled: isRoot
    },
    {
      icon: Trash,
      label: 'Delete Note',
      onClick: onDelete,
      disabled: isRoot,
      danger: true
    }
  ];

  return (
    <div
      className="fixed bg-white rounded-lg shadow-lg py-1 z-50 min-w-[200px]
                border border-gray-100"
      style={{ left: position.x, top: position.y }}
    >
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            item.onClick();
            onClose();
          }}
          disabled={item.disabled}
          className={`w-full px-4 py-2 text-left flex items-center gap-2 text-sm
            ${item.danger ? 'text-red-600 hover:text-red-700' : 'text-gray-700 hover:text-gray-900'}
            ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            hover:bg-gray-50 transition-colors duration-150`}
        >
          <item.icon className="w-4 h-4" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default TreeContextMenu; 