import React from 'react';
import { 
  Bold, Italic, Underline, Code as CodeIcon, 
  Link as LinkIcon, Image as ImageIcon, 
  List as ListIcon, Heading1, Heading2, 
  Quote as QuoteIcon, AlignLeft, AlignCenter, AlignRight 
} from 'lucide-react';
import ToolbarButton from './ToolbarButton';

const EditorToolbar = () => {
  const toolbarGroups = [
    [
      { icon: Bold, tooltip: "Bold (⌘+B)" },
      { icon: Italic, tooltip: "Italic (⌘+I)" },
      { icon: Underline, tooltip: "Underline (⌘+U)" }
    ],
    [
      { icon: Heading1, tooltip: "Heading 1" },
      { icon: Heading2, tooltip: "Heading 2" },
      { icon: QuoteIcon, tooltip: "Quote" }
    ],
    [
      { icon: ListIcon, tooltip: "List" },
      { icon: CodeIcon, tooltip: "Code" },
      { icon: LinkIcon, tooltip: "Link" },
      { icon: ImageIcon, tooltip: "Image" }
    ],
    [
      { icon: AlignLeft, tooltip: "Align Left" },
      { icon: AlignCenter, tooltip: "Align Center" },
      { icon: AlignRight, tooltip: "Align Right" }
    ]
  ];

  return (
    <div className="flex items-center gap-2 mt-2 pb-2">
      {toolbarGroups.map((group, groupIndex) => (
        <React.Fragment key={groupIndex}>
          {groupIndex > 0 && <div className="w-px h-6 bg-gray-200" />}
          {group.map((tool, toolIndex) => (
            <ToolbarButton
              key={toolIndex}
              icon={tool.icon}
              tooltip={tool.tooltip}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default EditorToolbar; 