import React, { useState } from 'react';
import { useTags } from '../hooks/useTags';

const Tagging = () => {
  const { tags, addTag } = useTags();
  const [tag, setTag] = useState('');

  const handleAddTag = () => {
    addTag(tag);
    setTag('');
  };

  return (
    <div>
      <input
        type="text"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="Add a tag"
      />
      <button onClick={handleAddTag}>Add Tag</button>
      <div>
        {tags.map((t, index) => (
          <span key={index}>{t} </span>
        ))}
      </div>
    </div>
  );
};

export default Tagging;