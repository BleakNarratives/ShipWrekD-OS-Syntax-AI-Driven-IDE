import React from 'react';
import { Icon } from './Icon';

interface HeaderProps {
  filePath: string;
  onCommandPaletteClick: () => void;
  onBlueSkyClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ filePath, onCommandPaletteClick, onBlueSkyClick }) => {
  return (
    <header className="bg-[var(--color-bg-surface)] border-b border-[var(--color-border-base)] px-4 flex items-center justify-between h-12 flex-shrink-0">
      <div className="flex items-center gap-4">
        <Icon name="logo" className="w-7 h-7 text-[var(--color-primary-fg)]" />
        <div className="text-sm text-gray-500">
            {filePath.split(' / ').map((part, index, arr) => (
                <React.Fragment key={index}>
                    <span className={index === arr.length - 1 ? 'text-gray-200 font-semibold' : ''}>{part}</span>
                    {index < arr.length - 1 && <span className="mx-1">/</span>}
                </React.Fragment>
            ))}
        </div>
      </div>
     
      <div className="flex items-center gap-2">
         <button 
          onClick={onCommandPaletteClick} 
          className="flex items-center gap-2 px-3 py-1.5 bg-gray-700/50 text-gray-300 rounded-md hover:bg-gray-600/70 transition-colors text-xs border border-transparent hover:border-gray-500"
        >
          <Icon name="command" className="w-4 h-4 text-[var(--color-primary-fg)]" />
          Command...
          <span className="text-xs text-gray-500 ml-2 border border-gray-600 rounded px-1.5 py-0.5">Ctrl+P</span>
        </button>
        <button 
          onClick={onBlueSkyClick} 
          className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-[var(--color-primary-bg-hover)] transition-colors"
          title="Blue Sky Meeting"
        >
          <Icon name="mindmap" className="w-6 h-6 text-blue-300" />
        </button>
      </div>
    </header>
  );
};