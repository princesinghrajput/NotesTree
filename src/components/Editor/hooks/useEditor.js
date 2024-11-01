import { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import { EDITOR_TOOLS } from '../config/editorTools';
import toast from 'react-hot-toast';

export const useEditor = ({ noteId, currentNote, onSave }) => {
  const editorInstance = useRef(null);
  const editorRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!noteId || !editorRef.current) return;

    const initEditor = async () => {
      try {
        const editor = new EditorJS({
          holder: editorRef.current,
          tools: EDITOR_TOOLS,
          data: currentNote?.content || {
            time: new Date().getTime(),
            blocks: [
              {
                type: 'paragraph',
                data: { text: 'Start writing your note...' }
              }
            ]
          },
          onChange: async () => {
            try {
              const content = await editor.save();
              onSave(content);
            } catch (error) {
              console.error('Save failed:', error);
            }
          },
          // ... other editor configurations
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

    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
        editorInstance.current = null;
        setIsReady(false);
      }
    };
  }, [noteId, currentNote, onSave]);

  return {
    editorRef,
    isReady,
    editorInstance
  };
}; 