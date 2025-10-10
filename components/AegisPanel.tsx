import React from 'react';
import type { AegisStatus, ThreatLog, MonitoredComponent } from '../types';
import { Icon } from './Icon';

interface AegisPanelProps {
  status: AegisStatus;
  logs: ThreatLog[];
  components: MonitoredComponent[];
  onRunScan: () => void;
  onIsolate: (componentId: string) => void;
}

const statusConfig: Record<AegisStatus, { color: string; icon: any; text: string; description: string }> = {
    secure: {
        color: 'text-green-400',
        icon: 'shield',
        text: 'System Secure',
        description: 'No threats detected. All components operating within normal parameters.'
    },
    scanning: {
        color: 'text-cyan-400',
        icon: 'sparkle',
        text: 'Scanning...',
        description: 'Performing behavioral analysis on all active components.'
    },
    threat_detected: {
        color: 'text-red-400',
        icon: 'shield',
        text: 'Threat Detected!',
        description: 'Anomalous behavior identified. Review logs and take action immediately.'
    },
    isolated: {
        color: 'text-yellow-400',
        icon: 'shield',
        text: 'Threat Contained',
        description: 'A malicious component has been isolated and sandboxed.'
    },
};

const severityColors: Record<string, string> = {
    critical: 'border-red-500',
    high: 'border-orange-500',
    medium: 'border-yellow-500',
};


export const AegisPanel: React.FC<AegisPanelProps> = ({ status, logs, components, onRunScan, onIsolate }) => {
  const currentStatus = statusConfig[status];

  return (
    <aside className="w-64 bg-[#0d1117] border-r border-gray-700/50 flex flex-col flex-shrink-0">
      <h2 className="text-xs uppercase text-gray-400 font-bold px-3 py-2">Aegis Protocol</h2>
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 p-2 overflow-y-auto space-y-4">
            <div className="p-3 bg-[#161b22] border border-gray-700/50 rounded-lg text-center">
                <Icon name={currentStatus.icon} className={`w-12 h-12 mx-auto mb-2 ${currentStatus.color} ${status === 'scanning' ? 'animate-pulse' : ''}`} />
                <h3 className={`font-bold ${currentStatus.color}`}>{currentStatus.text}</h3>
                <p className="text-xs text-gray-500 mt-1">{currentStatus.description}</p>
            </div>

            {logs.length > 0 && (
                 <div className="p-3 bg-[#161b22] border border-gray-700/50 rounded-lg">
                    <h4 className="text-xs uppercase text-gray-400 font-bold px-1 mb-2">Threat Logs</h4>
                    <ul className="space-y-2">
                        {logs.map(log => (
                            <li key={log.id} className={`p-2 border-l-4 rounded bg-gray-700/20 ${severityColors[log.severity]}`}>
                                <p className="font-semibold text-red-300 text-sm">{components.find(c => c.id === log.componentId)?.name || 'Unknown Component'}</p>
                                <p className="text-xs text-gray-400">{log.description}</p>
                                <p className="text-xs text-gray-500 mt-1">{new Date(log.timestamp).toLocaleString()}</p>
                                {components.find(c => c.id === log.componentId)?.status !== 'isolated' && (
                                    <button onClick={() => onIsolate(log.componentId)} className="mt-2 px-2 py-0.5 bg-red-500/20 text-red-300 rounded hover:bg-red-500/40 text-xs font-bold">
                                        Isolate Threat
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="p-3 bg-[#161b22] border border-gray-700/50 rounded-lg">
                <h4 className="text-xs uppercase text-gray-400 font-bold px-1 mb-2">Monitored Components</h4>
                <ul className="space-y-1">
                    {components.map(comp => (
                        <li key={comp.id} className="flex items-center justify-between p-2 rounded hover:bg-gray-700/20">
                            <span className="text-sm text-gray-300">{comp.name}</span>
                            {comp.status === 'isolated' ? (
                                <span className="text-xs font-bold text-yellow-400">ISOLATED</span>
                            ) : (
                                <span className="text-xs font-bold text-green-400">ACTIVE</span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        
        <div className="p-2 border-t border-gray-700/50">
          <button
            onClick={onRunScan}
            disabled={status === 'scanning'}
            className="w-full mt-2 px-3 py-2 bg-cyan-600/80 text-white rounded hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors text-sm font-bold flex items-center justify-center gap-2"
          >
            <Icon name="aegis" className="w-5 h-5" />
            Run Manual Scan
          </button>
        </div>
      </div>
    </aside>
  );
};