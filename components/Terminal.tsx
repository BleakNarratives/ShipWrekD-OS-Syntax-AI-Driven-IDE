
import React, { useRef, useEffect, useState } from 'react';

interface TerminalProps {
  output: string[];
  onCommand: (command: string) => void;
}

export const Terminal: React.FC<TerminalProps> = ({ output, onCommand }) => {
  const endOfOutputRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentCommand, setCurrentCommand] = useState('');

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
    <div className="h-48 bg-[#0d1117] border-t border-gray-700/50 flex flex-col flex-shrink-0" onClick={() => inputRef.current?.focus()}>
      <div className="flex items-center px-4 h-8 border-b border-gray-700/50 text-xs flex-shrink-0">
        <div className="border-b-2 border-cyan-400 text-cyan-300 px-2 py-1">TERMINAL</div>
        <div className="text-gray-400 px-2 py-1">PROBLEMS</div>
        <div className="text-gray-400 px-2 py-1">OUTPUT</div>
      </div>
      <div className="flex-1 p-2 overflow-y-auto text-sm">
        {output.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap font-mono">{line}</div>
        ))}
        <div ref={endOfOutputRef} />
        <form onSubmit={handleSubmit} className="flex">
            <span className="text-cyan-400 mr-2">{'>'}</span>
            <input
                ref={inputRef}
                type="text"
                value={currentCommand}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-gray-300 focus:outline-none font-mono"
                autoFocus
            />
        </form>
      </div>
    </div>
  );
};