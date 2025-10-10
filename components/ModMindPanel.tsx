import React from 'react';
import type { ModMindState } from '../types';
import { Icon } from './Icon';

interface ModMindPanelProps {
  state: ModMindState;
  onStrategyToggle: (strategyId: string) => void;
}

const ToggleSwitch: React.FC<{ checked: boolean; onChange: () => void; }> = ({ checked, onChange }) => (
    <button onClick={onChange} className={`relative inline-flex items-center h-5 rounded-full w-9 transition-colors ${checked ? 'bg-cyan-500' : 'bg-gray-600'}`}>
        <span className={`inline-block w-3.5 h-3.5 transform bg-white rounded-full transition-transform ${checked ? 'translate-x-5' : 'translate-x-1'}`} />
    </button>
);

export const ModMindPanel: React.FC<ModMindPanelProps> = ({ state, onStrategyToggle }) => {
  return (
    <aside className="w-64 bg-[#0d1117] border-r border-gray-700/50 flex flex-col flex-shrink-0">
      <h2 className="text-xs uppercase text-gray-400 font-bold px-3 py-2">ModMind Core</h2>
      <div className="flex-1 p-2 overflow-y-auto space-y-6">
        
        {/* Cognitive State */}
        <div>
          <h3 className="text-sm font-bold text-gray-300 px-1 mb-2">Cognitive State</h3>
          <div className="p-3 bg-[#161b22] border border-gray-700/50 rounded-lg">
            <label className="text-xs text-gray-400">Current Cognitive Load</label>
            <div className="w-full bg-gray-700 rounded-full h-2.5 mt-1">
              <div className="bg-cyan-500 h-2.5 rounded-full" style={{ width: `${state.cognitiveLoad}%` }}></div>
            </div>
            <p className="text-right text-xs text-cyan-300 mt-1">{state.cognitiveLoad}%</p>

            <label className="text-xs text-gray-400 mt-3 block">Last Decision Trace</label>
            <p className="text-xs text-gray-300 mt-1 p-2 bg-black/20 rounded font-mono">
              {state.lastDecisionTrace}
            </p>
          </div>
        </div>

        {/* Strategy Registry */}
        <div>
            <h3 className="text-sm font-bold text-gray-300 px-1 mb-2">Orchestration Strategies</h3>
            <div className="space-y-2">
                {state.strategies.map(strategy => (
                    <div key={strategy.id} className="p-3 bg-[#161b22] border border-gray-700/50 rounded-lg">
                        <div className="flex items-start justify-between">
                            <div className="flex-1 pr-4">
                                <p className="font-semibold text-sm text-gray-200">{strategy.name}</p>
                                <p className="text-xs text-gray-500 mt-1">{strategy.description}</p>
                                <p className="text-xs text-cyan-400/80 mt-2 font-mono">Trigger: "{strategy.trigger}"</p>
                            </div>
                            <ToggleSwitch checked={strategy.enabled} onChange={() => onStrategyToggle(strategy.id)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </aside>
  );
};
