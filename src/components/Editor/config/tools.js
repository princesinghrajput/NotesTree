import { EDITOR_TOOLS } from '../../../config/editor';
import { tools } from '../../../config/editor';

export const getEditorTools = () => ({
  ...EDITOR_TOOLS,
  // Add any component-specific tool configurations here
});

export const getToolbarGroups = () => [
  {
    id: 'text-style',
    tools: ['bold', 'italic', 'underline']
  },
  {
    id: 'block-style',
    tools: ['header', 'quote', 'list']
  },
  {
    id: 'insert',
    tools: ['link', 'image', 'code']
  },
  {
    id: 'alignment',
    tools: ['left', 'center', 'right']
  }
];

export { tools }; 