import React, { createContext, useContext, useState, useCallback } from 'react';

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([
    {
      id: 'root',
      title: 'My Notes',
      content: {
        time: new Date().getTime(),
        blocks: [
          {
            type: "paragraph",
            data: {
              text: "Welcome to your notes! Click on a note to start editing."
            }
          }
        ],
        version: "2.27.2"
      },
      parentId: null,
      tags: [],
      links: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ]);
  const [activeNote, setActiveNote] = useState(null);
  const [links, setLinks] = useState([]);
  const [selectedParentId, setSelectedParentId] = useState('root');

  const addNote = useCallback((parentId, title) => {
    if (!title.trim()) return null;

    const actualParentId = parentId || selectedParentId;

    const parentExists = actualParentId === 'root' || notes.some(note => note.id === actualParentId);
    if (!parentExists) {
      console.error('Parent note does not exist');
      return null;
    }

    const hasDuplicate = notes.some(note => 
      note.parentId === actualParentId && 
      note.title.toLowerCase() === title.toLowerCase()
    );

    if (hasDuplicate) {
      console.error('A note with this title already exists under the selected parent');
      return null;
    }

    const newNote = {
      id: `note-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: title.trim(),
      content: {
        time: new Date().getTime(),
        blocks: [
          {
            type: "paragraph",
            data: {
              text: ""
            }
          }
        ],
        version: "2.27.2"
      },
      parentId: actualParentId,
      tags: [],
      links: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setNotes(prev => [...prev, newNote]);
    return newNote.id;
  }, [notes, selectedParentId]);

  const addLink = useCallback((sourceId, targetId) => {
    if (!notes.some(n => n.id === sourceId) || !notes.some(n => n.id === targetId)) {
      console.error('One or both notes do not exist');
      return null;
    }

    const linkExists = links.some(
      link => (link.sourceId === sourceId && link.targetId === targetId) ||
              (link.sourceId === targetId && link.targetId === sourceId)
    );

    if (linkExists) {
      console.error('Link already exists between these notes');
      return null;
    }

    const newLink = {
      id: `link-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      sourceId,
      targetId,
      createdAt: new Date().toISOString()
    };

    setLinks(prev => [...prev, newLink]);
    return newLink.id;
  }, [notes, links]);

  const removeLink = useCallback((linkId) => {
    setLinks(prev => prev.filter(link => link.id !== linkId));
  }, []);

  const updateNote = useCallback((noteId, updates) => {
    setNotes(prev => prev.map(note => 
      note.id === noteId
        ? {
            ...note,
            ...updates,
            updatedAt: new Date().toISOString(),
            title: updates.title || note.title,
            content: updates.content || note.content,
            tags: updates.tags || note.tags,
            links: updates.links || note.links,
          }
        : note
    ));
  }, []);

  const updateNoteContent = useCallback((noteId, editorContent) => {
    setNotes(prev => prev.map(note => 
      note.id === noteId
        ? {
            ...note,
            content: editorContent,
            updatedAt: new Date().toISOString(),
          }
        : note
    ));
  }, []);

  const deleteNote = useCallback((noteId) => {
    const getDescendants = (id) => {
      const children = notes.filter(note => note.parentId === id);
      return children.reduce((acc, child) => 
        [...acc, child.id, ...getDescendants(child.id)], 
        []
      );
    };

    const descendantIds = getDescendants(noteId);
    const idsToDelete = [noteId, ...descendantIds];

    setNotes(prev => prev.filter(note => !idsToDelete.includes(note.id)));
    if (activeNote === noteId) {
      setActiveNote(null);
    }
  }, [notes, activeNote]);

  const getChildren = useCallback((noteId) => {
    return notes.filter(note => note.parentId === noteId);
  }, [notes]);

  const isDescendant = useCallback((potentialAncestorId, noteId) => {
    let currentNote = notes.find(note => note.id === noteId);
    while (currentNote && currentNote.parentId) {
      if (currentNote.parentId === potentialAncestorId) {
        return true;
      }
      currentNote = notes.find(note => note.id === currentNote.parentId);
    }
    return false;
  }, [notes]);

  const moveNote = useCallback((noteId, newParentId) => {
    if (noteId === newParentId || isDescendant(noteId, newParentId)) {
      return false;
    }
    
    setNotes(prev => prev.map(note => 
      note.id === noteId
        ? { ...note, parentId: newParentId }
        : note
    ));
    return true;
  }, [isDescendant]);

  const value = {
    notes,
    activeNote,
    links,
    selectedParentId,
    setSelectedParentId,
    setActiveNote,
    addNote,
    updateNote,
    updateNoteContent,
    deleteNote,
    addLink,
    removeLink,
    getChildren,
    isDescendant,
    moveNote,
  };

  return (
    <NoteContext.Provider value={value}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error('useNotes must be used within a NoteProvider');
  }
  return context;
};