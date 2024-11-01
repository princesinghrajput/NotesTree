import React from 'react';
import { Split } from '@geoffcox/react-splitter';
import { SPLITTER_CONFIG } from '../../config/ui';
import { SplitterHandle } from './SplitterHandle';

export const SplitLayout = ({ 
  splitPosition, 
  onSplitDragEnd, 
  leftPanel: LeftPanel, 
  rightPanel: RightPanel 
}) => (
  <div className="h-screen bg-gray-50">
    <Split
      initialPrimarySize={`${splitPosition}%`}
      minPrimarySize={SPLITTER_CONFIG.minSize}
      maxPrimarySize={SPLITTER_CONFIG.maxSize}
      splitterSize={SPLITTER_CONFIG.size}
      onSplitDragEnd={onSplitDragEnd}
      renderSplitter={({ isDragging }) => (
        <SplitterHandle isDragging={isDragging} />
      )}
    >
      <LeftPanel />
      <RightPanel />
    </Split>
  </div>
); 