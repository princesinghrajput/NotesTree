import { useCallback, useRef, useState } from 'react';
import { debounce } from '../../../utils/helpers';
import toast from 'react-hot-toast';

export const useEditorSave = (noteId, updateNote) => {
  const [isSaving, setIsSaving] = useState(false);
  const lastSaveTimestamp = useRef(Date.now());

  const saveContent = useCallback(
    debounce(async (content) => {
      try {
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
    }, 5000),
    [noteId, updateNote]
  );

  return { saveContent, isSaving };
}; 