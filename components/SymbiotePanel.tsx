import React from 'react';
import type { SymbioteState } from '../types';
import { Icon } from './Icon';

interface SymbiotePanelProps {
  state: SymbioteState;
  onToggleDataTrust: () => void;
}

const statusConfig: Record<SymbioteState['connectionStatus'], { color: string; text: string; }> = {
    connected: { color: 'text-green-400', text: 'Symbiote Link Active' },
    connecting: { color: 'text-cyan-400', text: 'Establishing Link...' },
    disconnected: { color: 'text-gray-500', text: 'Link Inactive' },
};

const ToggleSwitch: React.FC<{ checked: boolean; onChange: () => void; }> = ({ checked, onChange }) => (
    <button onClick={onChange} className={`relative inline-flex items-center h-5 rounded-full w-9 transition-colors ${checked ? 'bg-cyan-500' : 'bg-gray-600'}`}>
        <span className={`inline-block w-3.5 h-3.5 transform bg-white rounded-full transition-transform ${checked ? 'translate-x-5' : 'translate-x-1'}`} />
    </button>
);

export const SymbiotePanel: React.FC<SymbiotePanelProps> = ({ state, onToggleDataTrust }) => {
  const currentStatus = statusConfig[state.connectionStatus];
  
  return (
    <aside className="w-64 bg-[#0d1117] border-r border-gray-700/50 flex flex-col flex-shrink-0">
      <h2 className="text-xs uppercase text-gray-400 font-bold px-3 py-2">Cognitive Symbiote</h2>
      <div className="flex-1 p-2 overflow-y-auto space-y-6">
        
        {/* Connection Status */}
        <div className="p-3 text-center border-b border-gray-700/50">
            <Icon name="heart-circuit" className={`w-10 h-10 mx-auto mb-2 ${currentStatus.color} ${state.connectionStatus === 'connecting' ? 'animate-pulse' : ''}`} />
            <h3 className={`font-bold text-sm ${currentStatus.color}`}>{currentStatus.text}</h3>
        </div>

        {/* Biometric Streams */}
        <div>
          <h3 className="text-sm font-bold text-gray-300 px-1 mb-2">Live Data Streams</h3>
          <div className="space-y-2">
            {state.streams.map(stream => (
              <div key={stream.id} className="p-2 bg-[#161b22] rounded-md">
                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">{stream.name}</span>
                    <span className={`text-sm font-mono font-bold ${stream.status === 'active' ? 'text-cyan-300' : 'text-gray-600'}`}>
                        {stream.status === 'active' ? `${stream.value} ${stream.unit}` : 'N/A'}
                    </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
                    <div className="bg-cyan-500 h-1 rounded-full" style={{ width: `${stream.status === 'active' ? stream.value : 0}%` }}></div>
                </div>
              </div>  
            ))}
          </div>
        </div>

        {/* Developer Genome Project */}
        <div>
            <h3 className="text-sm font-bold text-gray-300 px-1 mb-2">Developer Genome Project</h3>
            <div className="p-3 bg-[#161b22] border border-gray-700/50 rounded-lg">
                <p className="text-xs text-gray-400 mb-3">
                    Contribute your anonymized cognitive data to train a meta-intelligence and gain access to its insights.
                </p>
                <div className="flex items-center justify-between">
                    <label htmlFor="data-trust-toggle" className="font-semibold text-sm text-gray-200">
                        Apply to Join
                    </label>
                    <ToggleSwitch checked={state.dataTrustOptIn} onChange={onToggleDataTrust} />
                </div>
                 <button className="w-full mt-3 px-3 py-1.5 bg-gray-600/50 text-gray-300 rounded hover:bg-gray-600/70 transition-colors text-xs font-bold">
                    Learn More
                </button>
            </div>
        </div>
        
      </div>
    </aside>
  );
};
