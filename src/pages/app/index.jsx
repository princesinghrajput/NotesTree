import React, { useState } from 'react';
import { SplitLayout } from '../../components/layout/SplitLayout';
import { LeftPanel } from '../../components/panels/LeftPanel';
import { RightPanel } from '../../components/panels/RightPanel';
import { SPLITTER_CONFIG } from '../../config/ui';

export const NotesApp = () => {
  const [splitPosition, setSplitPosition] = useState(SPLITTER_CONFIG.defaultPosition);

  const handleSplitDragEnd = (newSize) => {
    const containerWidth = document.querySelector('.splitter-container').offsetWidth;
    const newPercentage = (newSize / containerWidth) * 100;
    setSplitPosition(newPercentage);
  };

  return (
    <SplitLayout 
      splitPosition={splitPosition}
      onSplitDragEnd={handleSplitDragEnd}
      leftPanel={LeftPanel}
      rightPanel={RightPanel}
    />
  );
}; 