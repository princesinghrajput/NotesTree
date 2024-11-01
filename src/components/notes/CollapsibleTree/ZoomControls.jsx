import React from 'react';
import Button from '../../common/Button';
import { PlusIcon, MinusIcon } from '../../common/icons';

const ZoomControls = ({ onZoomIn, onZoomOut }) => {
  return (
    <div className="absolute bottom-4 right-4 flex gap-2">
      <Button
        variant="secondary"
        size="icon"
        onClick={onZoomIn}
        className="rounded-full"
      >
        <PlusIcon className="w-6 h-6" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        onClick={onZoomOut}
        className="rounded-full"
      >
        <MinusIcon className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default ZoomControls; 