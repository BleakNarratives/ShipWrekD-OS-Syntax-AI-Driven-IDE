import React, { useState } from 'react';
import type { VaultFragment, VaultFragmentType } from '../types';
import { Icon, IconName } from './Icon';

interface VaultPanelProps {
  fragments: VaultFragment[];
  onAddFragment: (content: string, type: VaultFragmentType) => void;
  onPasteFragment: (content: string) => void;
}

const fragmentConfig: Record<VaultFragmentType, { icon: IconName; color: string; }> = {
    'Snippet': { icon: 'file', color: 'text-cyan-400' },
    'Note': { icon: 'lightbulb', color: 'text-yellow-400' },
    // FIX: Replaced non-existent 'link' icon with 'cloud' icon.
    'URL': { icon: 'cloud', color: 'text-green-400' },
    'Command': { icon: 'command', color: 'text-purple-400' },
};

export const VaultPanel: React.FC<VaultPanelProps> = ({ fragments, onAddFragment, onPasteFragment }) => {
    const [note, setNote] = useState('');

    const handleAddNote = () => {
        if (note.trim()) {
            onAddFragment(note, 'Note');
            setNote('');
        }
    };

    return (
        <aside className="w-64 bg-[#0d1117] border-r border-gray-700/50 flex flex-col flex-shrink-0">
            <h2 className="text-xs uppercase text-gray-400 font-bold px-3 py-2">The Vault</h2>
            <div className="flex-1 p-2 overflow-y-auto">
                {fragments.length > 0 ? (
                    <ul className="space-y-2">
                        {fragments.map(fragment => {
                            const config = fragmentConfig[fragment.type];
                            return (
                                <li key={fragment.id} className="p-2 bg-[#161b22] border border-gray-700/50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Icon name={config.icon} className={`w-4 h-4 flex-shrink-0 ${config.color}`} />
                                        <span className={`text-xs font-bold ${config.color}`}>{fragment.type}</span>
                                        <span className="text-xs text-gray-500 ml-auto">{fragment.timestamp.toLocaleTimeString()}</span>
                                    </div>
                                    <pre className="text-xs text-gray-300 bg-black/30 p-2 rounded whitespace-pre-wrap max-h-24 overflow-y-auto font-mono">
                                        <code>{fragment.content}</code>
                                    </pre>
                                    {fragment.sourceFile && <p className="text-xs text-gray-500 mt-1 truncate">From: {fragment.sourceFile}</p>}
                                    <div className="flex items-center gap-2 mt-2">
                                        <button onClick={() => onPasteFragment(fragment.content)} className="flex-1 py-1 bg-gray-600/50 text-gray-300 rounded hover:bg-gray-600/70 text-xs">Paste</button>
                                        <button onClick={() => navigator.clipboard.writeText(fragment.content)} className="flex-1 py-1 bg-gray-600/50 text-gray-300 rounded hover:bg-gray-600/70 text-xs">Copy</button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <div className="p-4 flex flex-col items-center justify-center text-center h-full text-gray-500">
                        <Icon name="vault" className="w-12 h-12 mb-4" />
                        <h3 className="font-bold text-gray-400">The Vault is empty.</h3>
                        <p className="text-sm mt-1">Copied code snippets and your notes will be stored here.</p>
                    </div>
                )}
            </div>
            <div className="p-2 border-t border-gray-700/50">
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add a quick note..."
                    className="w-full h-16 p-2 bg-[#161b22] border border-gray-600 rounded-md text-sm focus:outline-none focus:border-cyan-500 resize-none"
                />
                <button
                    onClick={handleAddNote}
                    className="w-full mt-2 px-3 py-1.5 bg-cyan-600/80 text-white rounded hover:bg-cyan-600 disabled:bg-gray-600 transition-colors text-sm font-bold"
                >
                    Add Note to Vault
                </button>
            </div>
        </aside>
    );
};