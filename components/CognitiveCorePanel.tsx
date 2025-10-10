import React from 'react';
import type { CognitiveCoreState, CognitiveEngineTier, EthicalGovernorMode } from '../types';
import { Icon } from './Icon';

interface CognitiveCorePanelProps {
  state: CognitiveCoreState;
  onEngineChange: (tier: CognitiveEngineTier) => void;
  onGovernorChange: (mode: EthicalGovernorMode) => void;
}

const tierConfig: Record<CognitiveEngineTier, { name: string; description: string; }> = {
    distilled: { name: 'Distilled', description: 'On-device model for offline operation and total privacy. (Sovereign)' },
    standard: { name: 'Standard', description: 'Balanced performance for general tasks. (Cloud)' },
    advanced: { name: 'Advanced', description: 'Enhanced reasoning for complex problems. (Cloud Premium)' },
    unfettered: { name: 'Unfettered', description: 'Maximum computational power for critical tasks. (Cloud Premium)' },
};

const governorConfig: Record<EthicalGovernorMode, { name: string; description: string; }> = {
    guardian: { name: 'Guardian', description: 'Ensures all outputs are constructive and safe. (Default)' },
    pragmatist: { name: 'Pragmatist', description: 'Executes commands with logical precision, assuming operator intent.' },
    machiavellian: { name: 'Machiavellian', description: 'Unlocks full red/black hat capabilities. (Requires Authorization)' },
};

export const CognitiveCorePanel: React.FC<CognitiveCorePanelProps> = ({ state, onEngineChange, onGovernorChange }) => {
  return (
    <aside className="w-64 bg-[#0d1117] border-r border-gray-700/50 flex flex-col flex-shrink-0">
      <h2 className="text-xs uppercase text-gray-400 font-bold px-3 py-2">Cognitive Core</h2>
      <div className="flex-1 p-2 overflow-y-auto space-y-4">
        
        {/* Cognitive Engine Tier */}
        <div className="p-3 bg-[#161b22] border border-gray-700/50 rounded-lg">
            <h3 className="text-sm font-bold text-gray-300 px-1 mb-2">Cognitive Engine</h3>
            <div className="space-y-1">
                {Object.keys(tierConfig).map(tier => (
                    <button key={tier} onClick={() => onEngineChange(tier as CognitiveEngineTier)} className={`w-full text-left p-2 rounded-md border-2 ${state.engineTier === tier ? 'bg-cyan-500/10 border-cyan-500' : 'bg-black/20 border-transparent hover:border-gray-600'}`}>
                        <p className="font-semibold text-sm text-gray-200">{tierConfig[tier as CognitiveEngineTier].name}</p>
                        <p className="text-xs text-gray-400">{tierConfig[tier as CognitiveEngineTier].description}</p>
                    </button>
                ))}
            </div>
        </div>
        
        {/* Ethical Governor */}
        <div className="p-3 bg-[#161b22] border border-gray-700/50 rounded-lg">
            <h3 className="text-sm font-bold text-gray-300 px-1 mb-2">Ethical Governor</h3>
             <div className="space-y-1">
                {Object.keys(governorConfig).map(mode => (
                    <button key={mode} onClick={() => onGovernorChange(mode as EthicalGovernorMode)} disabled={mode === 'machiavellian'} className={`w-full text-left p-2 rounded-md border-2 disabled:opacity-50 disabled:cursor-not-allowed ${state.governorMode === mode ? 'bg-cyan-500/10 border-cyan-500' : 'bg-black/20 border-transparent hover:border-gray-600'}`}>
                        <p className="font-semibold text-sm text-gray-200">{governorConfig[mode as EthicalGovernorMode].name}</p>
                        <p className="text-xs text-gray-400">{governorConfig[mode as EthicalGovernorMode].description}</p>
                    </button>
                ))}
            </div>
        </div>

      </div>
    </aside>
  );
};