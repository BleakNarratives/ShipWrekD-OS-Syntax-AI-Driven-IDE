import React from 'react';
import type { KernelModule } from '../types';
import { Icon } from './Icon';

interface KernelPanelProps {
  modules: KernelModule[];
  onActivateModule: (moduleId: string) => void;
}

export const KernelPanel: React.FC<KernelPanelProps> = ({ modules, onActivateModule }) => {
  return (
    <aside className="w-64 bg-[#0d1117] border-r border-gray-700/50 p-2 flex-shrink-0 overflow-y-auto">
      <h2 className="text-xs uppercase text-gray-400 font-bold px-3 py-2">System Kernel</h2>
      <div className="p-2 space-y-4">
        {modules.map(module => (
          <div key={module.id} className="bg-[#161b22] border border-gray-700/50 rounded-lg p-3">
            <div className="flex items-center gap-3 mb-2">
              <Icon name={module.icon} className="w-6 h-6 text-cyan-400" />
              <h3 className="font-bold text-gray-200">{module.name}</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">{module.description}</p>
            {module.activated ? (
              <div className="flex items-center gap-2 text-green-400 text-sm font-semibold">
                <Icon name="check" className="w-5 h-5" />
                <span>Activated</span>
              </div>
            ) : (
              <button 
                onClick={() => onActivateModule(module.id)}
                className="w-full px-3 py-2 bg-cyan-600/50 text-cyan-300 rounded hover:bg-cyan-600/70 transition-colors text-sm font-bold"
              >
                Activate Module
              </button>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};
