import React from 'react';

const EditorStatus = ({ isSaving, lastSaved, wordCount, charCount }) => {
  return (
    <div className="border-t border-gray-200 px-4 py-2 text-sm text-gray-500 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isSaving ? (
            <span className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500" />
              Saving...
            </span>
          ) : (
            <span>Last saved: {new Date(lastSaved).toLocaleString()}</span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span>{wordCount} words</span>
          <span>{charCount} characters</span>
        </div>
      </div>
    </div>
  );
};

export default EditorStatus; 