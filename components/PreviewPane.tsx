import React from 'react';
import { Icon } from './Icon';

interface PreviewPaneProps {
  fileName: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const PreviewPane: React.FC<PreviewPaneProps> = ({ fileName, onClose, children }) => {
  return (
    <div className="flex-1 flex flex-col border-l border-[var(--color-border-base)] min-w-[40%] max-w-[50%]">
      <header className="flex items-center justify-between px-3 py-2 border-b border-[var(--color-border-base)] h-12 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Icon name="react" className="w-5 h-5 text-cyan-400" />
          <span className="font-semibold text-sm text-gray-200">Preview: {fileName}</span>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/10" title="Close Preview">
          <Icon name="close" className="w-5 h-5 text-gray-400" />
        </button>
      </header>
      <div className="flex-1 overflow-auto bg-black/20 relative">
        {children}
      </div>
    </div>
  );
};
