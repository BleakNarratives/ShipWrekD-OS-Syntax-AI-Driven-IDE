import React from 'react';
import type { WispTask } from '../types';
import { Icon, IconName } from './Icon';

interface TaskCruciblePanelProps {
  tasks: WispTask[];
}

const statusConfig: Record<WispTask['status'], { icon: IconName; color: string; }> = {
    pending: { icon: 'sparkle', color: 'text-yellow-400' },
    completed: { icon: 'check', color: 'text-green-400' },
    failed: { icon: 'close', color: 'text-red-400' },
};

export const TaskCruciblePanel: React.FC<TaskCruciblePanelProps> = ({ tasks }) => {
    return (
        <aside className="w-64 bg-[#0d1117] border-r border-gray-700/50 flex flex-col flex-shrink-0">
            <h2 className="text-xs uppercase text-gray-400 font-bold px-3 py-2">Task Crucible</h2>
            <div className="flex-1 p-2 overflow-y-auto">
                {tasks.length > 0 ? (
                    <ul className="space-y-2">
                        {tasks.map((task) => {
                            const config = statusConfig[task.status];
                            return (
                                <li key={task.id} className="p-2 bg-[#161b22] border-l-4 border-gray-700 rounded-md">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Icon name={config.icon} className={`w-4 h-4 flex-shrink-0 ${config.color} ${task.status === 'pending' ? 'animate-spin' : ''}`} />
                                        <span className={`text-xs font-bold uppercase ${config.color}`}>{task.status}</span>
                                    </div>
                                    <p className="text-sm text-gray-300">{task.description}</p>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <div className="p-4 flex flex-col items-center justify-center text-center h-full text-gray-500">
                        <Icon name="crosshair" className="w-12 h-12 mb-4" />
                        <h3 className="font-bold text-gray-400">No tasks assigned.</h3>
                        <p className="text-sm mt-1">Delegate tasks to the Wisp via the Command Palette.</p>
                    </div>
                )}
            </div>
        </aside>
    );
};
