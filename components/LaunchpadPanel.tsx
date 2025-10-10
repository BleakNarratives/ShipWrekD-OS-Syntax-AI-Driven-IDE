import React, { useState } from 'react';
import type { DeploymentService } from '../types';
import { Icon } from './Icon';

interface LaunchpadPanelProps {
  onPush: (service: DeploymentService, repoName: string, commitMessage: string) => Promise<void>;
}

const ToggleSwitch: React.FC<{ checked: boolean; onChange: () => void; label: string }> = ({ checked, onChange, label }) => (
    <div className="flex items-center justify-center">
        <label htmlFor="guided-mode" className="text-sm text-gray-400 mr-2">{label}</label>
        <button id="guided-mode" onClick={onChange} className={`relative inline-flex items-center h-5 rounded-full w-9 transition-colors ${checked ? 'bg-cyan-500' : 'bg-gray-600'}`}>
            <span className={`inline-block w-3.5 h-3.5 transform bg-white rounded-full transition-transform ${checked ? 'translate-x-5' : 'translate-x-1'}`} />
        </button>
    </div>
);

export const LaunchpadPanel: React.FC<LaunchpadPanelProps> = ({ onPush }) => {
    const [service, setService] = useState<DeploymentService | null>(null);
    const [repoName, setRepoName] = useState('');
    const [commitMessage, setCommitMessage] = useState('');
    const [isGuidedMode, setIsGuidedMode] = useState(true);
    const [isPushing, setIsPushing] = useState(false);
    const [pushSuccess, setPushSuccess] = useState(false);

    const handlePush = async () => {
        if (!service || !repoName.trim() || !commitMessage.trim()) return;
        setIsPushing(true);
        setPushSuccess(false);
        await onPush(service, repoName, commitMessage);
        setIsPushing(false);
        setPushSuccess(true);
    };
    
    const reset = () => {
        setService(null);
        setRepoName('');
        setCommitMessage('');
        setIsPushing(false);
        setPushSuccess(false);
    };

    if (isPushing) {
        return (
             <aside className="w-64 bg-[#0d1117] border-r border-gray-700/50 flex flex-col flex-shrink-0">
                <h2 className="text-xs uppercase text-gray-400 font-bold px-3 py-2">Launchpad</h2>
                <div className="p-4 flex flex-col items-center justify-center text-center h-full">
                    <Icon name="rocket" className="w-16 h-16 text-cyan-400 mb-6 animate-pulse" />
                    <h3 className="font-bold text-gray-200 mb-2">Deployment in Progress...</h3>
                    <p className="text-sm text-gray-500">Executing push to {service}. See terminal for details.</p>
                </div>
            </aside>
        );
    }
    
    if (pushSuccess) {
         return (
             <aside className="w-64 bg-[#0d1117] border-r border-gray-700/50 flex flex-col flex-shrink-0">
                <h2 className="text-xs uppercase text-gray-400 font-bold px-3 py-2">Launchpad</h2>
                <div className="p-4 flex flex-col items-center justify-center text-center h-full">
                    <Icon name="check" className="w-16 h-16 text-green-400 mb-6" />
                    <h3 className="font-bold text-gray-200 mb-2">Deployment Successful</h3>
                    <p className="text-sm text-gray-500 mb-6">Your project has been deployed to {repoName}.</p>
                    <button onClick={reset} className="w-full mt-2 px-3 py-1.5 bg-cyan-600/80 text-white rounded hover:bg-cyan-600 transition-colors text-sm font-bold">
                        Deploy Another Project
                    </button>
                </div>
            </aside>
        );
    }

    if (!service) {
        return (
            <aside className="w-64 bg-[#0d1117] border-r border-gray-700/50 flex flex-col flex-shrink-0">
                <h2 className="text-xs uppercase text-gray-400 font-bold px-3 py-2">Launchpad</h2>
                <div className="p-4 flex flex-col items-center justify-center text-center h-full">
                    <Icon name="rocket" className="w-12 h-12 text-gray-600 mb-4" />
                    <h3 className="font-bold text-gray-200 mb-2">Choose a Destination</h3>
                    <p className="text-sm text-gray-500 mb-6">Select a service to deploy your project to.</p>
                    <div className="space-y-3 w-full">
                        <button onClick={() => setService('github')} className="w-full p-3 bg-gray-700/50 text-gray-200 rounded hover:bg-gray-600/70 transition-colors font-bold">GitHub</button>
                        <button onClick={() => setService('huggingface')} className="w-full p-3 bg-gray-700/50 text-gray-200 rounded hover:bg-gray-600/70 transition-colors font-bold">Hugging Face</button>
                    </div>
                     <div className="mt-8 border-t border-gray-700/50 w-full pt-4">
                         <ToggleSwitch checked={isGuidedMode} onChange={() => setIsGuidedMode(!isGuidedMode)} label="Guided Mode" />
                    </div>
                </div>
            </aside>
        );
    }

    const serviceName = service === 'github' ? 'GitHub' : 'Hugging Face';
    const repoLabel = service === 'github' ? 'Repository Name' : 'HF Repository';
    const repoPlaceholder = service === 'github' ? 'username/my-project' : 'username/my-space-name';

    return (
        <aside className="w-64 bg-[#0d1117] border-r border-gray-700/50 flex flex-col flex-shrink-0">
            <div className="flex items-center p-2 border-b border-gray-700/50">
                <button onClick={() => setService(null)} className="p-1 hover:bg-gray-700/50 rounded-full mr-2">
                    <Icon name="chevronRight" className="w-5 h-5 text-gray-400 transform rotate-180" />
                </button>
                <h2 className="text-xs uppercase text-gray-400 font-bold">Deploy to {serviceName}</h2>
            </div>
            <div className="flex-1 p-3 overflow-y-auto">
                <div className="mb-4">
                    <label className="text-xs font-bold text-gray-400 block mb-1">{repoLabel}</label>
                    <input
                        type="text"
                        value={repoName}
                        onChange={(e) => setRepoName(e.target.value)}
                        placeholder={repoPlaceholder}
                        className="w-full bg-[#161b22] border border-gray-600 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:border-cyan-500"
                    />
                    {isGuidedMode && <p className="text-xs text-gray-500 mt-1">The project's destination path on {serviceName}.</p>}
                </div>
                <div className="mb-4">
                    <label className="text-xs font-bold text-gray-400 block mb-1">Commit Message</label>
                    <textarea
                        value={commitMessage}
                        onChange={(e) => setCommitMessage(e.target.value)}
                        placeholder="e.g., feat: Implement user login"
                        className="w-full h-24 p-2 bg-[#161b22] border border-gray-600 rounded-md text-sm focus:outline-none focus:border-cyan-500 resize-none"
                    />
                    {isGuidedMode && <p className="text-xs text-gray-500 mt-1">A short description of the changes in this version.</p>}
                </div>
            </div>
            <div className="p-2 border-t border-gray-700/50">
                <button
                    onClick={handlePush}
                    disabled={!repoName.trim() || !commitMessage.trim()}
                    className="w-full px-3 py-2 bg-cyan-600/80 text-white rounded hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors text-sm font-bold flex items-center justify-center gap-2"
                >
                    <Icon name="rocket" className="w-5 h-5" />
                    Push to {serviceName}
                </button>
            </div>
        </aside>
    );
};