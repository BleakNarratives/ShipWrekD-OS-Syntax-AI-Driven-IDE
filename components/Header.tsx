import React, { useContext } from 'react';
import { Icon } from './Icon';
import { AppContext } from '../App';

export const Header: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return null;
  const { getFilePath, handleRunCode, activeFileNode } = context;
  const filePath = getFilePath();

  return (
    <header className="bg-[var(--color-bg-surface)] shadow-[0_1px_0_0_var(--color-border-base)] px-4 flex items-center justify-between h-12 flex-shrink-0">
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
      <div className="flex items-center">
        <button
          onClick={handleRunCode}
          disabled={!activeFileNode}
          className="flex items-center gap-2 px-3 py-1.5 bg-green-600/20 text-green-300 rounded-md hover:bg-green-600/40 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors text-sm font-semibold"
          title="Run Code (Ctrl/Cmd + R)"
        >
          <Icon name="play" className="w-4 h-4" />
          <span>Run</span>
        </button>
      </div>
    </header>
  );
};