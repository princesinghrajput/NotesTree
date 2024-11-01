import React from 'react';
import TreeNode from './components/Tree/TreeNode';
import SearchBar from './components/Search/SearchBar';
import { useNoteTree } from './hooks/useNoteTree';
import { useNoteSearch } from './hooks/useNoteSearch';
import './styles/notes.css';

const Notes = () => {
  const { 
    treeData, 
    expandedNodes, 
    selectedNode, 
    toggleNode, 
    selectNode 
  } = useNoteTree();

  const {
    searchTerm,
    setSearchTerm,
    filteredNotes
  } = useNoteSearch(treeData);

  const renderNode = (node) => {
    const isExpanded = expandedNodes.has(node.id);
    const isSelected = selectedNode === node.id;

    return (
      <div key={node.id}>
        <TreeNode
          node={node}
          isExpanded={isExpanded}
          isSelected={isSelected}
          onToggle={() => toggleNode(node.id)}
          onSelect={() => selectNode(node.id)}
        />
        {isExpanded && node.children?.length > 0 && (
          <div className="ml-6">
            {node.children.map(child => renderNode(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {searchTerm ? (
          filteredNotes.map(node => renderNode(node))
        ) : (
          treeData.map(node => renderNode(node))
        )}
      </div>
    </div>
  );
};

export default Notes; 