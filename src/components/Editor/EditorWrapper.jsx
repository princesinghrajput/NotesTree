import React from 'react';
import { useNotes } from '../../context/NoteContext';
import RichTextEditor from '../RichTextEditor';
import { EditorPlaceholder } from './EditorPlaceholder';

export const EditorWrapper = () => {
  const { activeNote } = useNotes();
  
  return (
    <div className="h-full flex flex-col overflow-hidden">
      {activeNote ? (
        <RichTextEditor noteId={activeNote} />
      ) : (
        <EditorPlaceholder />
      )}
    </div>
  );
}; 