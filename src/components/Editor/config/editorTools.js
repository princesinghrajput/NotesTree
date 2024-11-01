import Header from '@editorjs/header';
import List from '@editorjs/list';
import Checklist from '@editorjs/checklist';
import Quote from '@editorjs/quote';
import Warning from '@editorjs/warning';
import Code from '@editorjs/code';
import LinkTool from '@editorjs/link';
import Image from '@editorjs/image';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import InlineCode from '@editorjs/inline-code';
import Marker from '@editorjs/marker';
import Delimiter from '@editorjs/delimiter';

export const EDITOR_TOOLS = {
  header: {
    class: Header,
    config: {
      levels: [1, 2, 3, 4, 5, 6],
      defaultLevel: 2
    },
    shortcut: 'CMD+SHIFT+H'
  },
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: 'unordered'
    },
    shortcut: 'CMD+SHIFT+L'
  },
  // ... other tools configuration
};

// Export individual tools for easier imports
export const tools = {
  Header,
  List,
  Checklist,
  Quote,
  Warning,
  Code,
  LinkTool,
  Image,
  Embed,
  Table,
  InlineCode,
  Marker,
  Delimiter
}; 