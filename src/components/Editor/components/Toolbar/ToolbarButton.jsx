import React from 'react';

const ToolbarButton = ({ icon: Icon, tooltip, onClick }) => (
  <div className="relative group">
    <button
      onClick={onClick}
      className="p-2 hover:bg-gray-100 rounded transition-colors"
      aria-label={tooltip}
    >
      <Icon className="w-4 h-4 text-gray-600" />
    </button>
    {tooltip && (
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1
                    bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100
                    transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {tooltip}
      </div>
    )}
  </div>
);

export default ToolbarButton; 