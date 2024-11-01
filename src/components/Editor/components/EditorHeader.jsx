import React from 'react';

const EditorHeader = ({ title, isFullscreen, onToggleFullscreen }) => {
  return (
    <div className="border-b border-gray-200 px-4 py-3 flex-shrink-0">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          {title || 'Select a note'}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleFullscreen}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorHeader; 