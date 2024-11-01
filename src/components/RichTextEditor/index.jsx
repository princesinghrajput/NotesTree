import React, { useEffect, useRef, useCallback, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
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
import { useNotes } from '../../context/NoteContext';
import { debounce } from '../../utils/helpers';
import toast from 'react-hot-toast';
import './styles.css';
import { 
  Bold, Italic, Underline, Code as CodeIcon, Link as LinkIcon, 
  Image as ImageIcon, List as ListIcon, 
  Heading1, Heading2, Quote as QuoteIcon, 
  AlignLeft, AlignCenter, AlignRight
} from 'lucide-react';

const EDITOR_JS_TOOLS = {
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
  checklist: {
    class: Checklist,
    inlineToolbar: true,
    shortcut: 'CMD+SHIFT+C'
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
    shortcut: 'CMD+SHIFT+Q',
    config: {
      quotePlaceholder: 'Enter a quote',
      captionPlaceholder: 'Quote\'s author'
    },
  },
  warning: {
    class: Warning,
    inlineToolbar: true,
    shortcut: 'CMD+SHIFT+W',
    config: {
      titlePlaceholder: 'Title',
      messagePlaceholder: 'Message'
    },
  },
  code: {
    class: Code,
    shortcut: 'CMD+SHIFT+C'
  },
  linkTool: {
    class: LinkTool,
    config: {
      endpoint: '/api/fetch-link-meta',
    }
  },
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByFile(file) {
          // Implement your image upload logic here
          return Promise.resolve({
            success: 1,
            file: {
              url: URL.createObjectURL(file),
              // Add other image data as needed
            }
          });
        }
      },
      captionPlaceholder: 'Image caption'
    }
  },
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
        codesandbox: true,
        codepen: true,
        vimeo: true,
      }
    }
  },
  table: {
    class: Table,
    inlineToolbar: true,
    shortcut: 'CMD+SHIFT+T'
  },
  inlineCode: {
    class: InlineCode,
    shortcut: 'CMD+SHIFT+M'
  },
  marker: {
    class: Marker,
    shortcut: 'CMD+SHIFT+M'
  },
  delimiter: Delimiter,
};

const RichTextEditor = ({ noteId }) => {
  const { updateNote, notes } = useNotes();
  const editorInstance = useRef(null);
  const editorRef = useRef(null);
  const currentNote = notes.find(note => note.id === noteId);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const lastSaveTimestamp = useRef(Date.now());

  // Increase debounce time and add save handling logic
  const saveContent = useCallback(
    debounce(async (content) => {
      try {
        // Prevent saving if less than 2 seconds have passed since last save
        const now = Date.now();
        if (now - lastSaveTimestamp.current < 5000) {
          return;
        }

        setIsSaving(true);
        await updateNote(noteId, { content });
        lastSaveTimestamp.current = now;
        toast.success('Changes saved', { 
          duration: 5000,
          position: 'bottom-right',
        });
      } catch (error) {
        console.error('Failed to save:', error);
        toast.error('Failed to save changes');
      } finally {
        setIsSaving(false);
      }
    }, 5000), // Increased debounce time to 2 seconds
    [noteId, updateNote]
  );

  // Add word and character count
  const updateCounts = useCallback(() => {
    if (editorInstance.current) {
      editorInstance.current.save().then(outputData => {
        const text = outputData.blocks
          .map(block => block.data.text || '')
          .join(' ');
        setWordCount(text.trim().split(/\s+/).length);
        setCharCount(text.length);
      });
    }
  }, []);

  useEffect(() => {
    if (!noteId || !editorRef.current) return;

    let editor;
    
    const initEditor = async () => {
      try {
        // Destroy existing instance if it exists
        if (editorInstance.current && typeof editorInstance.current.destroy === 'function') {
          await editorInstance.current.destroy();
          editorInstance.current = null;
        }

        // Initialize new editor with modified configuration
        editor = new EditorJS({
          holder: editorRef.current,
          tools: EDITOR_JS_TOOLS,
          data: currentNote?.content || {
            time: new Date().getTime(),
            blocks: [
              {
                type: 'paragraph',
                data: {
                  text: 'Start writing your note...'
                }
              }
            ]
          },
          placeholder: 'Start writing or press "/" for commands',
          inlineToolbar: true,
          autofocus: true,
          defaultBlock: 'paragraph',
          hideToolbar: false,
          onReady: () => {
            // More specific event handling - only for the content area
            const editorElement = editorRef.current;
            const handleKeyDown = (e) => {
              // Only stop propagation if the event target is inside the content area
              const isContentArea = e.target.closest('.ce-block') || 
                                  e.target.closest('.ce-toolbar');
              
              if (isContentArea && (e.key === 'Enter' || e.key === 'Backspace')) {
                e.stopPropagation();
              }
            };

            editorElement.addEventListener('keydown', handleKeyDown, true);
            // Store the handler for cleanup
            editorElement._keydownHandler = handleKeyDown;
          },
          onChange: async () => {
            try {
              const content = await editor.save();
              saveContent(content);
              updateCounts();
            } catch (error) {
              console.error('Save failed:', error);
            }
          },
        });

        await editor.isReady;
        editorInstance.current = editor;
        setIsReady(true);
      } catch (error) {
        console.error('Editor initialization failed:', error);
        toast.error('Failed to initialize editor');
      }
    };

    initEditor();

    // Update cleanup function
    return () => {
      const cleanup = async () => {
        // Remove event listener using the stored handler
        if (editorRef.current && editorRef.current._keydownHandler) {
          editorRef.current.removeEventListener('keydown', editorRef.current._keydownHandler, true);
          delete editorRef.current._keydownHandler;
        }
        
        if (editorInstance.current && typeof editorInstance.current.destroy === 'function') {
          try {
            await editorInstance.current.destroy();
            editorInstance.current = null;
            setIsReady(false);
          } catch (error) {
            console.error('Editor cleanup failed:', error);
          }
        }
      };
      cleanup();
    };
  }, [noteId, currentNote]);

  return (
    <div className={`flex flex-col h-full bg-white transition-all duration-300 ${
      isFullscreen ? 'fixed inset-0 z-50' : ''
    }`}>
      {/* Editor Header */}
      <div className="border-b border-gray-200 px-4 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            {currentNote?.title || 'Select a note'}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </button>
          </div>
        </div>
        
        {/* Enhanced Toolbar */}
        <div className="flex items-center gap-2 mt-2 pb-2">
          <ToolbarButton icon={Bold} tooltip="Bold (⌘+B)" />
          <ToolbarButton icon={Italic} tooltip="Italic (⌘+I)" />
          <ToolbarButton icon={Underline} tooltip="Underline (⌘+U)" />
          <div className="w-px h-6 bg-gray-200" />
          <ToolbarButton icon={Heading1} tooltip="Heading 1" />
          <ToolbarButton icon={Heading2} tooltip="Heading 2" />
          <ToolbarButton icon={QuoteIcon} tooltip="Quote" />
          <div className="w-px h-6 bg-gray-200" />
          <ToolbarButton icon={ListIcon} tooltip="List" />
          <ToolbarButton icon={CodeIcon} tooltip="Code" />
          <ToolbarButton icon={LinkIcon} tooltip="Link" />
          <ToolbarButton icon={ImageIcon} tooltip="Image" />
          <div className="w-px h-6 bg-gray-200" />
          <ToolbarButton icon={AlignLeft} tooltip="Align Left" />
          <ToolbarButton icon={AlignCenter} tooltip="Align Center" />
          <ToolbarButton icon={AlignRight} tooltip="Align Right" />
        </div>
      </div>

      {/* Editor Content - Make it scrollable */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div 
          ref={editorRef}
          className="prose max-w-none p-4 h-full
                     focus:outline-none editor-container"
        />
        {!isReady && (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        )}
      </div>

      {/* Editor Status - Keep at bottom */}
      <div className="border-t border-gray-200 px-4 py-2 text-sm text-gray-500 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isSaving ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500" />
                Saving...
              </span>
            ) : (
              <span>
                Last saved: {new Date(currentNote?.updatedAt || Date.now()).toLocaleString()}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span>{wordCount} words</span>
            <span>{charCount} characters</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Toolbar Button Component
const ToolbarButton = ({ icon: Icon, tooltip, onClick }) => (
  <div className="relative group">
    <button
      onClick={onClick}
      className="p-2 hover:bg-gray-100 rounded transition-colors"
    >
      <Icon className="w-4 h-4 text-gray-600" />
    </button>
    {tooltip && (
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1
                    bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100
                    transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {tooltip}
      </div>
    )}
  </div>
);

export default RichTextEditor; 