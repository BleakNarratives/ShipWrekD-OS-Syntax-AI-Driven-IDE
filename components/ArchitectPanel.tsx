import React, { useState } from 'react';
import type { BuildManifest, SystemComponent } from '../types';
import { Icon } from './Icon';

interface ArchitectPanelProps {
  manifest: BuildManifest | null;
  onGeneratePlan: (prompt: string) => void;
  isLoading: boolean;
}

const WelcomeView: React.FC = () => (
    <div className="p-4 flex flex-col items-center justify-center text-center h-full">
        <Icon name="cpu" className="w-16 h-16 text-gray-600 mb-4" />
        <h3 className="font-bold text-gray-200 mb-2">System Architect</h3>
        <p className="text-sm text-gray-500">
            Translate high-level goals into a complete OS build plan. Describe your ideal system, from a minimal server to a full-featured desktop.
        </p>
    </div>
);

const ManifestView: React.FC<{ manifest: BuildManifest }> = ({ manifest }) => {
    const groupedComponents = manifest.components.reduce((acc, component) => {
        (acc[component.category] = acc[component.category] || []).push(component);
        return acc;
    }, {} as Record<string, SystemComponent[]>);

    const categoryOrder: SystemComponent['category'][] = ['Core System', 'Toolchain', 'Filesystem', 'Networking', 'Security', 'Services', 'User Environment', 'Key Packages'];
    
    return (
        <div className="p-2 overflow-y-auto">
            <div className="p-2 mb-4 bg-gray-700/20 rounded-lg">
                <h3 className="font-bold text-lg text-cyan-300">{manifest.name}</h3>
                <p className="text-sm text-gray-400 mt-1">{manifest.description}</p>
            </div>
            
            {categoryOrder.map(category => groupedComponents[category] && (
                <div key={category} className="mb-4">
                    <h4 className="text-xs uppercase text-gray-400 font-bold px-1 mb-2">{category}</h4>
                    <ul className="space-y-2">
                        {groupedComponents[category].map(component => (
                            <li key={component.name} className="p-2 rounded bg-gray-700/20">
                                <p className="font-semibold text-gray-300 text-sm">{component.name}</p>
                                <p className="text-xs text-gray-400">{component.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export const ArchitectPanel: React.FC<ArchitectPanelProps> = ({ manifest, onGeneratePlan, isLoading }) => {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = () => {
        if (prompt.trim() && !isLoading) {
            onGeneratePlan(prompt);
        }
    };

    return (
        <aside className="w-64 bg-[#0d1117] border-r border-gray-700/50 flex flex-col flex-shrink-0">
            <h2 className="text-xs uppercase text-gray-400 font-bold px-3 py-2">System Architect</h2>
            <div className="flex-1 flex flex-col min-h-0">
                {isLoading ? (
                    <div className="p-4 flex flex-col items-center justify-center text-center h-full">
                        <Icon name="sparkle" className="w-16 h-16 text-cyan-400 mb-6 animate-pulse" />
                        <h3 className="font-bold text-gray-200 mb-2">Generating Architecture...</h3>
                        <p className="text-sm text-gray-500">Drafting the system blueprint.</p>
                    </div>
                ) : manifest ? <ManifestView manifest={manifest} /> : <WelcomeView />}
            </div>
            <div className="p-2 border-t border-gray-700/50">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') handleSubmit(); }}
                    placeholder="Describe your OS goal... e.g., 'a lightweight OS for retro gaming'"
                    className="w-full h-20 p-2 bg-[#161b22] border border-gray-700/50 rounded-md text-sm focus:outline-none focus:border-cyan-500 resize-none"
                    disabled={isLoading}
                />
                <button
                    onClick={handleSubmit}
                    disabled={isLoading || !prompt.trim()}
                    className="w-full mt-2 px-3 py-2 bg-cyan-600/80 text-white rounded hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors text-sm font-bold flex items-center justify-center gap-2"
                >
                    <Icon name="sparkle" className="w-5 h-5" />
                    Generate Plan
                </button>
            </div>
        </aside>
    );
};
