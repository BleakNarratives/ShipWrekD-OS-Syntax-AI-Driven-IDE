import React, { useRef, useEffect, useState, useContext } from 'react';
import { Icon } from './Icon';
import { AppContext } from '../App';

interface TerminalProps {
  isTabbed?: boolean;
}

const ToggleSwitch: React.FC<{ checked: boolean; onChange: () => void; label: string }> = ({ checked, onChange, label }) => (
    <div className="flex items-center">
        <label className="text-xs text-gray-400 mr-2">{label}</label>
        <button onClick={onChange} className={`relative inline-flex items-center h-4 rounded-full w-7 transition-colors ${checked ? 'bg-[var(--color-primary-fg)]' : 'bg-gray-600'}`}>
            <span className={`inline-block w-3 h-3 transform bg-white rounded-full transition-transform ${checked ? 'translate-x-4' : 'translate-x-0.5'}`} />
        </button>
    </div>
);

export const Terminal: React.FC<TerminalProps> = ({ isTabbed }) => {
  const context = useContext(AppContext);
  if (!context) return null;
  const { terminalOutput: output, handleCommand: onCommand } = context;
  
  const endOfOutputRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isConversationMode, setIsConversationMode] = useState(false);

  useEffect(() => {
    endOfOutputRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [output]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCommand(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentCommand.trim()) {
        onCommand(currentCommand);
        setCommandHistory(prev => [currentCommand, ...prev]);
        setHistoryIndex(-1);
        setCurrentCommand('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setCurrentCommand(commandHistory[newIndex]);
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setCurrentCommand(commandHistory[newIndex]);
        } else {
            setHistoryIndex(-1);
            setCurrentCommand('');
        }
    }
  };

  return (
    <div className={`h-full bg-[var(--color-bg-surface)] flex flex-col flex-shrink-0 ${!isTabbed ? 'h-64 border-t border-[var(--color-border-base)]' : 'h-full'}`} onClick={() => inputRef.current?.focus()}>
      {!isTabbed && (
        <div className="flex items-center justify-between px-4 h-10 border-b border-[var(--color-border-base)] text-sm flex-shrink-0">
            <div className="flex items-center">
                <div className="border-b-2 border-[var(--color-primary-fg)] text-gray-100 px-2 py-2 font-semibold">TERMINAL</div>
                <div className="text-gray-500 px-2 py-2 hover:text-gray-200 cursor-pointer">PROBLEMS</div>
                <div className="text-gray-500 px-2 py-2 hover:text-gray-200 cursor-pointer">OUTPUT</div>
            </div>
            <div className="flex items-center gap-2">
                <ToggleSwitch checked={isConversationMode} onChange={() => setIsConversationMode(!isConversationMode)} label="Conversation Mode" />
                <Icon name="ellipsis" className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
        </div>
      )}
      <div className="flex-1 p-4 overflow-y-auto text-sm">
        {output.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap font-mono">{line}</div>
        ))}
        <div ref={endOfOutputRef} />
        <form onSubmit={handleSubmit} className="flex">
            <span className="text-[var(--color-primary-fg)] mr-2 font-semibold">{'>'}</span>
            <input
                ref={inputRef}
                type="text"
                value={currentCommand}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-gray-300 focus:outline-none font-mono"
                autoFocus
                placeholder={isConversationMode ? 'Describe what you want to do...' : ''}
            />
        </form>
      </div>
    </div>
  );
};