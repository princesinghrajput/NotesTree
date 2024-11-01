import React from 'react';

const EditorContent = ({ editorRef, isReady }) => {
  return (
    <div className="flex-1 overflow-y-auto min-h-0">
      <div 
        ref={editorRef}
        className="prose max-w-none p-4 h-full focus:outline-none editor-container"
      />
      {!isReady && (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      )}
    </div>
  );
};

export default EditorContent; 