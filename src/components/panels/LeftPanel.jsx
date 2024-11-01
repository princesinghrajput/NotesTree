import React from 'react';
import ErrorBoundary from '../common/ErrorBoundary';
import CollapsibleTree from '../notes/CollapsibleTree';

export const LeftPanel = () => (
  <div className="h-full border-r border-gray-200 bg-white shadow-sm overflow-hidden">
    <ErrorBoundary>
      <CollapsibleTree />
    </ErrorBoundary>
  </div>
); 