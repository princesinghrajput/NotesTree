import React from 'react';

export const SplitterHandle = ({ isDragging }) => (
  <div
    className={`
      h-full w-1 hover:w-1 bg-transparent hover:bg-blue-200 
      cursor-col-resize transition-all duration-200 
      ${isDragging ? 'bg-blue-300 w-1' : ''}
    `}
  />
); 