import React from 'react';
import type { DataConsentState } from '../types';
import { Icon } from './Icon';

interface DataConsentPanelProps {
  state: DataConsentState;
  onToggleOptIn: () => void;
}

const ToggleSwitch: React.FC<{ checked: boolean; onChange: () => void; }> = ({ checked, onChange }) => (
    <button onClick={onChange} className={`relative inline-flex items-center h-5 rounded-full w-9 transition-colors ${checked ? 'bg-cyan-500' : 'bg-gray-600'}`}>
        <span className={`inline-block w-3.5 h-3.5 transform bg-white rounded-full transition-transform ${checked ? 'translate-x-5' : 'translate-x-1'}`} />
    </button>
);

export const DataConsentPanel: React.FC<DataConsentPanelProps> = ({ state, onToggleOptIn }) => {
    const progressPercent = (state.contributionScore / state.nextTier.contributionRequired) * 100;

    return (
        <aside className="w-64 bg-[#0d1117] border-r border-gray-700/50 flex flex-col flex-shrink-0">
            <h2 className="text-xs uppercase text-gray-400 font-bold px-3 py-2">aFiREFLY Contribution</h2>
            <div className="flex-1 p-2 overflow-y-auto space-y-6">

                {/* Contribution Status */}
                <div className="p-3 bg-[#161b22] border border-gray-700/50 rounded-lg">
                    <div className="flex items-center justify-between">
                        <label className="font-semibold text-sm text-gray-200">
                            Contribution Status
                        </label>
                        <ToggleSwitch checked={state.optedIn} onChange={onToggleOptIn} />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                        {state.optedIn
                            ? "You are contributing to the Developer Genome Project. Your anonymized data helps improve the AI for everyone."
                            : "You are not contributing. The AI will operate using only its base model."
                        }
                    </p>
                </div>

                {/* Membership Tier Progress */}
                <div>
                    <h3 className="text-sm font-bold text-gray-300 px-1 mb-2">Membership Tier</h3>
                     <div className="p-3 bg-[#161b22] border border-gray-700/50 rounded-lg">
                        <div className="flex justify-between items-baseline mb-1">
                            <span className="text-sm font-bold text-cyan-300">{state.currentTier.name}</span>
                             <span className="text-xs text-gray-400">Next: {state.nextTier.name}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div className="bg-cyan-500 h-2.5 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                        </div>
                        <p className="text-right text-xs text-gray-400 mt-1">{state.contributionScore} / {state.nextTier.contributionRequired} Points</p>
                    </div>
                </div>

                {/* Collected Data Points */}
                <div>
                    <h3 className="text-sm font-bold text-gray-300 px-1 mb-2">Collected Data Points (Anonymized)</h3>
                    <div className="space-y-2">
                        {state.dataPoints.map(point => (
                            <div key={point.id} className="p-2 bg-gray-700/20 rounded">
                                <p className="font-semibold text-gray-300 text-sm">{point.name}</p>
                                <p className="text-xs text-gray-400">{point.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                 <div className="p-2 text-center">
                    <button className="w-full px-3 py-1.5 bg-gray-600/50 text-gray-300 rounded hover:bg-gray-600/70 transition-colors text-xs font-bold">
                        Learn More
                    </button>
                </div>

            </div>
        </aside>
    );
};
