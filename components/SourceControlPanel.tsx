import React, { useState } from 'react';
import { Icon } from './Icon';
import type { KernelModule, Snapshot } from '../types';

interface SourceControlPanelProps {
    gitModule: KernelModule;
    natModule: KernelModule;
    onActivate: (moduleId: string) => void;
    snapshots: Snapshot[];
    onSaveSnapshot: (description: string) => void;
    onRestoreSnapshot: (snapshotId: string) => void;
}

const ChooserUI: React.FC<{ onActivate: (moduleId: string) => void }> = ({ onActivate }) => (
    <div className="p-4 flex flex-col items-center justify-center text-center h-full">
        <Icon name="gitBranch" className="w-12 h-12 text-gray-600 mb-4" />
        <h3 className="font-bold text-gray-200 mb-2">Activate Source Control</h3>
        <p className="text-sm text-gray-500 mb-6">Choose a version control system to track your project changes.</p>
        <div className="space-y-3 w-full">
            <button 
                onClick={() => onActivate('git')}
                className="w-full px-4 py-2 bg-cyan-600/50 text-cyan-300 rounded hover:bg-cyan-600/70 transition-colors text-sm font-bold flex items-center justify-center gap-2"
            >
                <Icon name="gitBranch" className="w-4 h-4" />
                <span>Activate Professional (Git)</span>
            </button>
            <button 
                onClick={() => onActivate('nat')}
                className="w-full px-4 py-2 bg-purple-600/50 text-purple-300 rounded hover:bg-purple-600/70 transition-colors text-sm font-bold flex items-center justify-center gap-2"
            >
                <Icon name="magic" className="w-4 h-4" />
                <span>Activate Simplified (Nat)</span>
            </button>
        </div>
    </div>
);

const GitUI: React.FC = () => (
    <div className="flex-1 p-2 flex flex-col">
        <div className="mb-4">
          <textarea
            placeholder="Commit message (e.g., feat: add user login)"
            className="w-full h-24 p-2 bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] rounded-md text-sm focus:outline-none focus:border-cyan-500 resize-none"
          />
          <button className="w-full mt-2 px-3 py-2 bg-blue-600/80 text-white rounded hover:bg-blue-600 transition-colors text-sm font-bold">
            Commit
          </button>
        </div>
        <div>
            <h3 className="text-xs uppercase text-gray-400 font-bold px-1 py-1">Changes (2)</h3>
            <ul>
                <li className="flex items-center gap-2 p-1 rounded hover:bg-gray-700/30 cursor-pointer">
                    <Icon name="file" className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">App.tsx</span>
                    <span className="text-yellow-400 font-bold ml-auto">M</span>
                </li>
                 <li className="flex items-center gap-2 p-1 rounded hover:bg-gray-700/30 cursor-pointer">
                    <Icon name="file" className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">types.ts</span>
                    <span className="text-green-400 font-bold ml-auto">A</span>
                </li>
            </ul>
        </div>
      </div>
);

const timeSince = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
}


const NatUI: React.FC<Pick<SourceControlPanelProps, 'snapshots' | 'onSaveSnapshot' | 'onRestoreSnapshot'>> = ({ snapshots, onSaveSnapshot, onRestoreSnapshot }) => {
    const [description, setDescription] = useState('');

    const handleSave = () => {
        if (description.trim()) {
            onSaveSnapshot(description);
            setDescription('');
        }
    };
    
    return (
        <div className="flex-1 p-2 flex flex-col min-h-0">
            <div className="mb-4">
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your changes... (e.g., I created the login button and connected it to the main app)"
                    className="w-full h-24 p-2 bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] rounded-md text-sm focus:outline-none focus:border-purple-500 resize-none"
                />
                <button 
                    onClick={handleSave}
                    disabled={!description.trim()}
                    className="w-full mt-2 px-3 py-2 bg-purple-600/80 text-white rounded hover:bg-purple-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors text-sm font-bold flex items-center justify-center gap-2"
                >
                    <Icon name="save" className="w-4 h-4" />
                    Save Version
                </button>
            </div>
            <div className="flex-1 overflow-y-auto">
                <h3 className="text-xs uppercase text-gray-400 font-bold px-1 py-1">History</h3>
                {snapshots.length > 0 ? (
                    <ul className="space-y-2">
                        {snapshots.map(snapshot => (
                            <li key={snapshot.id} className="text-sm p-2 text-gray-400 border-l-2 border-gray-700 pl-3">
                                <p className="font-semibold text-gray-300">{snapshot.description}</p>
                                <div className="flex items-center justify-between mt-1">
                                    <p className="text-xs text-gray-500">{timeSince(snapshot.timestamp)}</p>
                                    <button 
                                        onClick={() => onRestoreSnapshot(snapshot.id)}
                                        className="px-2 py-0.5 bg-cyan-600/50 text-cyan-300 rounded hover:bg-cyan-600/70 text-xs font-bold"
                                    >
                                        Restore
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-center text-gray-500 p-4">No versions saved yet.</p>
                )}
            </div>
        </div>
    );
};


export const SourceControlPanel: React.FC<SourceControlPanelProps> = ({ gitModule, natModule, onActivate, ...natProps }) => {
    
    const renderContent = () => {
        if (gitModule.activated) {
            return <GitUI />;
        }
        if (natModule.activated) {
            return <NatUI {...natProps} />;
        }
        return <ChooserUI onActivate={onActivate} />;
    };

  return (
    <div className="w-full h-full flex flex-col">
        <div className="px-4 h-12 flex items-center border-b border-[var(--color-border-subtle)] flex-shrink-0">
            <h2 className="text-sm uppercase text-gray-400 font-bold tracking-wider">Source Control</h2>
        </div>
        {renderContent()}
    </div>
  );
};