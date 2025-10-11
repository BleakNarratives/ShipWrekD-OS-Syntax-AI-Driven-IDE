import React from 'react';
import type { DebugState } from '../types';
import { Icon } from './Icon';

interface DebuggerPanelProps {
  state: DebugState;
}

const VariableTree: React.FC<{ data: Record<string, any>; level?: number }> = ({ data, level = 0 }) => {
    return (
        <div style={{ paddingLeft: `${level * 16}px` }}>
            {Object.entries(data).map(([key, value]) => {
                const isObject = typeof value === 'object' && value !== null;
                return (
                    <div key={key} className="text-xs">
                        <span className="text-orange-400">{key}: </span>
                        {isObject ? (
                            <details className="pl-2">
                                <summary className="cursor-pointer text-gray-500 italic">Object</summary>
                                <VariableTree data={value} level={level + 1} />
                            </details>
                        ) : (
                            <span className="text-purple-300">{String(value)}</span>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export const DebuggerPanel: React.FC<DebuggerPanelProps> = ({ state }) => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="px-4 h-12 flex items-center border-b border-[var(--color-border-subtle)] flex-shrink-0">
        <h2 className="text-sm uppercase text-gray-400 font-bold tracking-wider">Debugger</h2>
      </div>
      <div className="flex-1 p-2 overflow-y-auto space-y-4">
        
        {/* Call Stack */}
        <div>
            <h3 className="text-sm font-bold text-gray-300 px-1 mb-2">Call Stack</h3>
            <ul className="space-y-1">
                {state.callStack.map(frame => (
                    <li key={frame.id} className="p-2 rounded bg-cyan-500/10 border-l-2 border-cyan-500">
                        <p className="font-semibold text-sm text-cyan-200">{frame.functionName}</p>
                        <p className="text-xs text-gray-400">{frame.file}:{frame.line}</p>
                    </li>
                ))}
            </ul>
        </div>
        
        {/* Variables */}
        <div>
            <h3 className="text-sm font-bold text-gray-300 px-1 mb-2">Variables</h3>
            <div className="p-2 bg-[var(--color-bg-base)] rounded font-mono">
                <VariableTree data={state.variables} />
            </div>
        </div>

        {/* Breakpoints */}
        <div>
            <h3 className="text-sm font-bold text-gray-300 px-1 mb-2">Breakpoints</h3>
            <ul className="space-y-1">
                {state.breakpoints.map(bp => (
                    <li key={bp.id} className="flex items-center gap-2 p-1">
                        <input type="checkbox" checked={bp.enabled} readOnly className="h-3 w-3 rounded-sm bg-gray-700 border-gray-500" />
                        <div className="flex-1">
                             <p className="text-sm text-gray-300">{bp.file}</p>
                             <p className="text-xs text-gray-500">Line {bp.line}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>

      </div>
    </div>
  );
};