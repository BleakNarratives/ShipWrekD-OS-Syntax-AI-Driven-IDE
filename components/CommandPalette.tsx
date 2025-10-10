import React, { useState, useEffect, useRef } from 'react';
import type { Command } from '../types';
import { Icon } from './Icon';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  commands: Command[];
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, commands }) => {
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const filteredCommands = search ? commands.filter(cmd => 
      cmd.name.toLowerCase().includes(search.toLowerCase()) || 
      cmd.category.toLowerCase().includes(search.toLowerCase()) ||
      cmd.keywords?.some(k => k.toLowerCase().includes(search.toLowerCase()))
  ) : commands;
  
  // FIX: Explicitly typed the initial value for the reduce function to ensure that
  // `groupedCommands` is correctly typed as `Record<string, Command[]>`. This
  // resolves downstream type errors where its type was being inferred as `any` or `unknown`.
  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    (acc[cmd.category] = acc[cmd.category] || []).push(cmd);
    return acc;
  }, {} as Record<string, Command[]>);
  
  const flatCommands = Object.values(groupedCommands).flat();

  useEffect(() => {
    setActiveIndex(0);
  }, [search]);
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev + 1) % flatCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev - 1 + flatCommands.length) % flatCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (flatCommands[activeIndex]) {
        executeCommand(flatCommands[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const executeCommand = (command: Command) => {
    command.action();
    onClose();
  };
  
  useEffect(() => {
    document.getElementById(`command-${activeIndex}`)?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  if (!isOpen) return null;

  let commandIndex = -1;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center pt-20" onClick={onClose}>
      <div 
        className="relative bg-[#161b22] border border-gray-700/50 rounded-lg shadow-2xl w-full max-w-2xl flex flex-col max-h-[60vh]"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-2 border-b border-gray-700/50">
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search..."
            className="w-full bg-transparent p-2 text-lg text-gray-200 focus:outline-none"
          />
        </div>
        <div className="overflow-y-auto">
          {Object.entries(groupedCommands).map(([category, cmds]) => (
            <div key={category} className="p-2">
              <h3 className="text-xs font-bold uppercase text-gray-500 px-2 mb-1">{category}</h3>
              <ul>
                {cmds.map((cmd) => {
                  commandIndex++;
                  const isSelected = commandIndex === activeIndex;
                  return (
                    <li
                      id={`command-${commandIndex}`}
                      key={cmd.id}
                      onClick={() => executeCommand(cmd)}
                      onMouseEnter={() => setActiveIndex(commandIndex)}
                      className={`flex items-center gap-3 p-2 rounded cursor-pointer text-sm ${isSelected ? 'bg-cyan-400/10 text-cyan-300' : 'text-gray-400 hover:bg-gray-700/30'}`}
                    >
                      <Icon name="file" className="w-4 h-4" />
                      <span>{cmd.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          {filteredCommands.length === 0 && (
            <p className="p-4 text-center text-gray-500">No commands found.</p>
          )}
        </div>
      </div>
    </div>
  );
};