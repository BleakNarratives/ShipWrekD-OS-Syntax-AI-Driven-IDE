import React, { useState, useRef, useEffect } from 'react';
import type { FileTreeNode } from '../types';
import { Icon } from './Icon';

interface ExplorerPanelProps {
  files: FileTreeNode[];
  selectedFileId: string | null;
  onFileSelect: (id: string) => void;
  onPreviewFile: (fileId: string, fileName: string) => void;
  onCreateFile: (parentId: string | null) => void;
  onCreateFolder: (parentId: string | null) => void;
  onDeleteNode: (nodeId: string) => void;
  onRenameNode: (nodeId: string, newName: string) => void;
}

const FileNode: React.FC<{ 
    node: FileTreeNode; 
    selectedFileId: string | null; 
    onFileSelect: (id: string) => void; 
    onPreviewFile: (fileId: string, fileName: string) => void; 
    onDeleteNode: (nodeId: string) => void;
    onRenameNode: (nodeId: string, newName: string) => void;
    level?: number 
}> = ({ node, selectedFileId, onFileSelect, onPreviewFile, onDeleteNode, onRenameNode, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(node.name);
  const renameInputRef = useRef<HTMLInputElement>(null);

  const isSelected = node.id === selectedFileId;
  const isPreviewable = node.id === '13';

  useEffect(() => {
      if(isRenaming) {
          renameInputRef.current?.focus();
      }
  }, [isRenaming]);

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
  
  const handleRename = () => {
      if (renameValue.trim() && renameValue !== node.name) {
          onRenameNode(node.id, renameValue);
      }
      setIsRenaming(false);
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
        className={`flex items-center group cursor-pointer py-1.5 text-sm rounded transition-colors ${isSelected ? 'bg-[var(--color-primary-bg-hover)] text-gray-100' : 'text-gray-400 hover:bg-white/5'}`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleSelect}
        onDoubleClick={() => setIsRenaming(true)}
      >
        <Icon name={getIconName()} className={`w-4 h-4 mr-2 flex-shrink-0 ${iconColor}`} />
        {isRenaming ? (
            <input
                ref={renameInputRef}
                type="text"
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                onBlur={handleRename}
                onKeyDown={(e) => { if (e.key === 'Enter') handleRename(); if (e.key === 'Escape') setIsRenaming(false); }}
                className="bg-transparent border border-cyan-500 rounded px-1 py-0 flex-1 w-full text-white"
                onClick={(e) => e.stopPropagation()}
            />
        ) : (
            <>
                <span className={`flex-1 truncate ${isSelected ? 'font-semibold' : ''}`}>{node.name}</span>
                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {isPreviewable && (
                        <button 
                            onClick={(e) => { e.stopPropagation(); onPreviewFile(node.id, node.name); }}
                            className="mr-1 p-0.5 rounded hover:bg-cyan-500/20"
                            title="Preview Component"
                        >
                           <Icon name="react" className="w-4 h-4 text-cyan-400" />
                        </button>
                    )}
                    <button 
                        onClick={(e) => { e.stopPropagation(); setIsRenaming(true); }}
                        className="mr-1 p-0.5 rounded hover:bg-white/10"
                        title="Rename"
                    >
                       <Icon name="wrench" className="w-4 h-4 text-gray-400" />
                    </button>
                    <button 
                        onClick={(e) => { e.stopPropagation(); onDeleteNode(node.id); }}
                        className="mr-1 p-0.5 rounded hover:bg-red-500/20"
                        title="Delete"
                    >
                       <Icon name="close" className="w-4 h-4 text-red-400" />
                    </button>
                </div>
            </>
        )}
      </div>
      {node.type === 'folder' && isOpen && node.children && (
        <div>
          {node.children.map(child => (
            <FileNode key={child.id} node={child} selectedFileId={selectedFileId} onFileSelect={onFileSelect} onPreviewFile={onPreviewFile} onDeleteNode={onDeleteNode} onRenameNode={onRenameNode} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};


export const ExplorerPanel: React.FC<ExplorerPanelProps> = ({ files, selectedFileId, onFileSelect, onPreviewFile, onCreateFile, onCreateFolder, onDeleteNode, onRenameNode }) => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="px-4 h-12 flex items-center justify-between border-b border-[var(--color-border-subtle)] flex-shrink-0">
        <h2 className="text-sm uppercase text-gray-400 font-bold tracking-wider">Explorer</h2>
        <div className="flex items-center gap-2">
            <button onClick={() => onCreateFile(null)} className="p-1 rounded hover:bg-white/10" title="New File">
                <Icon name="addFile" className="w-5 h-5 text-gray-400" />
            </button>
             <button onClick={() => onCreateFolder(null)} className="p-1 rounded hover:bg-white/10" title="New Folder">
                <Icon name="folder" className="w-5 h-5 text-gray-400" />
            </button>
        </div>
      </div>
      <div className="p-2 flex-1 overflow-y-auto">
        {files.map(node => (
          <FileNode key={node.id} node={node} selectedFileId={selectedFileId} onFileSelect={onFileSelect} onPreviewFile={onPreviewFile} onDeleteNode={onDeleteNode} onRenameNode={onRenameNode} />
        ))}
      </div>
    </div>
  );
};