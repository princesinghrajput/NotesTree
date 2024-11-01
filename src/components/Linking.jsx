import React, { useState } from 'react';
import { useNotes } from '../context/NoteContext';

const Linking = () => {
  const { notes, links, addLink, removeLink, activeNote } = useNotes();
  const [selectedTarget, setSelectedTarget] = useState('');

  if (!notes || !links) return null; // Guard clause for undefined props

  const handleLink = () => {
    if (activeNote && selectedTarget && activeNote !== selectedTarget) {
      const linkId = addLink(activeNote, selectedTarget);
      if (linkId) {
        setSelectedTarget('');
      }
    }
  };

  // Filter out the active note and already linked notes from potential targets
  const availableNodes = notes.filter(note => {
    if (note.id === activeNote) return false;
    if (note.id === 'root') return false;
    
    // Check if link already exists
    const linkExists = links.some(link => 
      (link.sourceId === activeNote && link.targetId === note.id) ||
      (link.sourceId === note.id && link.targetId === activeNote)
    );
    
    return !linkExists;
  });

  // Get existing links for the active note
  const activeNoteLinks = links.filter(link => 
    link.sourceId === activeNote || link.targetId === activeNote
  );

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-medium mb-4">Link Notes</h3>
      {activeNote ? (
        <div className="space-y-4">
          <div className="flex gap-2">
            <select
              value={selectedTarget}
              onChange={(e) => setSelectedTarget(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a note to link...</option>
              {availableNodes.map((node) => (
                <option key={node.id} value={node.id}>
                  {node.title}
                </option>
              ))}
            </select>
            <button
              onClick={handleLink}
              disabled={!selectedTarget}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-300"
            >
              Link
            </button>
          </div>
          
          {/* Show existing links */}
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Existing Links</h4>
            <div className="space-y-2">
              {activeNoteLinks.map((link) => {
                const linkedNote = notes.find(n => 
                  n.id === (link.sourceId === activeNote ? link.targetId : link.sourceId)
                );
                return (
                  <div key={link.id} className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    <span>{linkedNote?.title || 'Unknown Note'}</span>
                    <button
                      onClick={() => removeLink(link.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Select a note to create links</p>
      )}
    </div>
  );
};

export default Linking;