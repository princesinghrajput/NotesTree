import React from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, TrashIcon, LinkIcon, TagIcon, EditIcon } from '../../icons';
import { colors, animations } from '../../../theme/colors';

const MenuItem = ({ icon: Icon, label, onClick, danger, disabled }) => (
  <motion.button
    whileHover={{ 
      backgroundColor: danger ? '#FEE2E2' : '#F3F4F6',
      x: 2 
    }}
    whileTap={{ scale: 0.98 }}
    disabled={disabled}
    className={`w-full px-4 py-2 text-left flex items-center gap-2 text-sm
      ${danger ? 'text-red-600 hover:text-red-700' : 'text-gray-700 hover:text-gray-900'}
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      transition-colors duration-150`}
    onClick={onClick}
  >
    <Icon className="w-4 h-4" />
    {label}
  </motion.button>
);

const ContextMenu = ({ 
  position, 
  onClose, 
  onAddChild, 
  onAddTag, 
  onDelete, 
  onCreateLink,
  onEdit,
  isRoot 
}) => {
  if (!position) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      className="fixed bg-white/90 backdrop-blur-sm rounded-lg shadow-lg py-1 z-50 
                min-w-[200px] border border-gray-100"
      style={{ left: position.x, top: position.y }}
    >
      <MenuItem 
        icon={EditIcon} 
        label="Edit Note" 
        onClick={() => {
          onEdit();
          onClose();
        }}
      />
      <MenuItem 
        icon={PlusIcon} 
        label="Add Child Note" 
        onClick={() => {
          onAddChild();
          onClose();
        }}
      />
      <MenuItem 
        icon={TagIcon} 
        label="Add Tag" 
        onClick={() => {
          onAddTag();
          onClose();
        }}
      />
      <MenuItem 
        icon={LinkIcon} 
        label="Create Link" 
        onClick={() => {
          onCreateLink();
          onClose();
        }}
      />
      <div className="my-1 h-px bg-gray-200" />
      <MenuItem 
        icon={TrashIcon} 
        label="Delete Note" 
        danger
        disabled={isRoot}
        onClick={() => {
          if (!isRoot) {
            onDelete();
            onClose();
          }
        }}
      />
    </motion.div>
  );
};

export default ContextMenu; 