import React from 'react';
import type { KernelModule } from '../types';
import { Icon } from './Icon';

interface KernelPanelProps {
  modules: KernelModule[];
  onActivateModule: (moduleId: string) => void;
}

export const KernelPanel: React.FC<KernelPanelProps> = ({ modules, onActivateModule }) => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="px-4 h-12 flex items-center border-b border-[var(--color-border-subtle)] flex-shrink-0">
        <h2 className="text-sm uppercase text-gray-400 font-bold tracking-wider">System Kernel</h2>
      </div>
      <div className="flex-1 p-2 overflow-y-auto space-y-4">
        {modules.map(module => (
          <div key={module.id} className="bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] rounded-lg p-3">
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
    </div>
  );
};