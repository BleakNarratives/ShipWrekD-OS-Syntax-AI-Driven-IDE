import React from 'react';
import type { ChronicleEntry, ChronicleEventType } from '../types';
import { Icon, IconName } from './Icon';

interface ChroniclePanelProps {
  log: ChronicleEntry[];
}

const eventTypeConfig: Record<ChronicleEventType, { icon: IconName; color: string; }> = {
    file: { icon: 'file', color: 'text-cyan-400' },
    ai: { icon: 'sparkle', color: 'text-amber-400' },
    system: { icon: 'cpu', color: 'text-purple-400' },
    terminal: { icon: 'command', color: 'text-green-400' },
    action: { icon: 'bolt', color: 'text-gray-400' },
};

export const ChroniclePanel: React.FC<ChroniclePanelProps> = ({ log }) => {
    const reversedLog = [...log].reverse();

    return (
        <aside className="w-64 bg-[#0d1117] border-r border-gray-700/50 flex flex-col flex-shrink-0">
            <h2 className="text-xs uppercase text-gray-400 font-bold px-3 py-2">Chronicle</h2>
            <div className="flex-1 p-2 overflow-y-auto">
                {reversedLog.length > 0 ? (
                    <ul>
                        {reversedLog.map((entry) => {
                            const config = eventTypeConfig[entry.type] || eventTypeConfig.action;
                            return (
                                <li key={entry.id} className="flex items-start gap-3 p-2 text-sm border-b border-gray-800">
                                    <Icon name={config.icon} className={`w-4 h-4 mt-0.5 flex-shrink-0 ${config.color}`} />
                                    <div className="flex-1">
                                        <p className="text-gray-300">{entry.description}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {entry.timestamp.toLocaleTimeString()}
                                        </p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <div className="p-4 flex flex-col items-center justify-center text-center h-full">
                        <Icon name="history" className="w-16 h-16 text-gray-600 mb-4" />
                        <h3 className="font-bold text-gray-200 mb-2">Session Log</h3>
                        <p className="text-sm text-gray-500">
                            Your actions will be recorded here for backtracking and review.
                        </p>
                    </div>
                )}
            </div>
        </aside>
    );
};
