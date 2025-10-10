import React, { useState } from 'react';
import type { FileTreeNode } from '../types';
import { Icon } from './Icon';

interface ExplorerPanelProps {
  files: FileTreeNode[];
  selectedFileId: string | null;
  onFileSelect: (id: string) => void;
}

const FileNode: React.FC<{ node: FileTreeNode; selectedFileId: string | null; onFileSelect: (id: string) => void; level?: number }> = ({ node, selectedFileId, onFileSelect, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(true);
  const isSelected = node.id === selectedFileId;

  const handleToggle = () => {
    if (node.type === 'folder') {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = () => {
    if(node.type === 'file'){
        onFileSelect(node.id);
    } else {
        handleToggle();
    }
  }

  const getIconName = () => {
    if (node.type === 'folder') {
      return isOpen ? 'folderOpen' : 'folder';
    }
    const extension = node.name.split('.').pop();
    switch (extension) {
      case 'tsx':
      case 'jsx':
        return 'react';
      case 'ts':
      case 'js':
        return 'js';
      case 'py':
        return 'python';
      case 'json':
        return 'json';
      case 'md':
        return 'markdown';
      default:
        return 'file';
    }
  };
  
  const iconColor = getIconName() === 'react' ? 'text-cyan-400' : 'text-gray-400';

  return (
    <div>
      <div
        onClick={handleSelect}
        className={`flex items-center cursor-pointer py-1 text-sm rounded transition-colors ${isSelected ? 'bg-cyan-400/10 text-cyan-300' : 'hover:bg-gray-700/30'}`}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
      >
        <Icon name={getIconName()} className={`w-4 h-4 mr-2 flex-shrink-0 ${iconColor}`} />
        <span>{node.name}</span>
      </div>
      {node.type === 'folder' && isOpen && node.children && (
        <div>
          {node.children.map(child => (
            <FileNode key={child.id} node={child} selectedFileId={selectedFileId} onFileSelect={onFileSelect} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};


export const ExplorerPanel: React.FC<ExplorerPanelProps> = ({ files, selectedFileId, onFileSelect }) => {
  return (
    <aside className="w-64 bg-[#0d1117] border-r border-gray-700/50 p-2 flex-shrink-0 overflow-y-auto">
      <h2 className="text-xs uppercase text-gray-400 font-bold px-3 py-2">Explorer</h2>
      {files.map(node => (
        <FileNode key={node.id} node={node} selectedFileId={selectedFileId} onFileSelect={onFileSelect} />
      ))}
    </aside>
  );
};
