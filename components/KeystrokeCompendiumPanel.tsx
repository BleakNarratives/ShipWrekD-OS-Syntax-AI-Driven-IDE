import React from 'react';
import type { Shortcut } from '../types';
import { Icon } from './Icon';

interface KeystrokeCompendiumPanelProps {}

const shortcuts: Record<string, Shortcut[]> = {
    "General": [
        { keys: 'Ctrl/Cmd + P', description: 'Open Command Palette' },
        { keys: 'Ctrl/Cmd + S', description: 'Save current file' },
    ],
    "View": [
        { keys: 'Ctrl/Cmd + B', description: 'Toggle Sidebar' },
        { keys: 'Ctrl/Cmd + J', description: 'Toggle Terminal' },
        { keys: 'Ctrl/Cmd + K', description: 'Toggle AI Assistant' },
    ],
    "Assistant": [
        { keys: 'Ctrl/Cmd + Enter', description: 'Send message to AI' },
    ],
};

export const KeystrokeCompendiumPanel: React.FC<KeystrokeCompendiumPanelProps> = () => {
  return (
    <aside className="w-64 bg-[#0d1117] border-r border-gray-700/50 flex flex-col flex-shrink-0">
      <h2 className="text-xs uppercase text-gray-400 font-bold px-3 py-2">Keystroke Compendium</h2>
      <div className="flex-1 p-2 overflow-y-auto">
        {Object.entries(shortcuts).map(([category, items]) => (
            <div key={category} className="mb-6">
                <h3 className="font-bold text-gray-300 px-1 mb-2">{category}</h3>
                <ul className="space-y-1">
                    {items.map(shortcut => (
                        <li key={shortcut.keys} className="flex items-center justify-between p-2 rounded hover:bg-gray-700/30">
                            <span className="text-sm text-gray-400">{shortcut.description}</span>
                            <kbd className="px-2 py-1 text-xs font-semibold text-cyan-300 bg-gray-600/50 border border-gray-500/50 rounded">
                                {shortcut.keys}
                            </kbd>
                        </li>
                    ))}
                </ul>
            </div>
        ))}
      </div>
    </aside>
  );
};
