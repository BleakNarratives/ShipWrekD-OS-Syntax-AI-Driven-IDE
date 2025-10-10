import React, { useState } from 'react';
import type { LearnedPattern } from '../types';
import { Icon } from './Icon';

interface GhostwriterPanelProps {
  status: 'uncalibrated' | 'calibrating' | 'calibrated';
  patterns: LearnedPattern[];
  onCalibrate: () => void;
  onGhostwrite: (prompt: string) => void;
}

const UncalibratedView: React.FC<{ onCalibrate: () => void }> = ({ onCalibrate }) => (
  <div className="p-4 flex flex-col items-center justify-center text-center h-full">
    <Icon name="dna" className="w-16 h-16 text-gray-600 mb-4" />
    <h3 className="font-bold text-gray-200 mb-2">Ghostwriter is Uncalibrated</h3>
    <p className="text-sm text-gray-500 mb-6">
      The AI's potential is dormant. Calibrate it to imprint your unique coding style and architectural patterns.
    </p>
    <button
      onClick={onCalibrate}
      className="w-full px-4 py-2 bg-cyan-600/50 text-cyan-300 rounded hover:bg-cyan-600/70 transition-colors text-sm font-bold flex items-center justify-center gap-2"
    >
      <Icon name="dna" className="w-5 h-5" />
      Begin Calibration
    </button>
  </div>
);

const CalibratingView: React.FC = () => (
    <div className="p-4 flex flex-col items-center justify-center text-center h-full">
        <Icon name="sparkle" className="w-16 h-16 text-cyan-400 mb-6 animate-pulse" />
        <h3 className="font-bold text-gray-200 mb-2">Calibration in Progress...</h3>
        <p className="text-sm text-gray-500">The AI is imprinting your digital persona.</p>
        <div className="mt-4 text-xs text-gray-400">
            <p>Analyzing file structures...</p>
            <p>Learning component patterns...</p>
            <p>Deriving naming conventions...</p>
        </div>
    </div>
);

const CalibratedView: React.FC<{ patterns: LearnedPattern[]; onGhostwrite: (prompt: string) => void }> = ({ patterns, onGhostwrite }) => {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = () => {
        if (prompt.trim()) {
            onGhostwrite(prompt);
            setPrompt('');
        }
    };
    
    return (
        <div className="flex-1 p-2 flex flex-col">
            <div className="p-2 mb-2">
                <div className="flex items-center gap-2 text-green-400 font-semibold text-sm">
                    <Icon name="check" className="w-5 h-5" />
                    <span>Status: Attuned</span>
                </div>
            </div>
            <div className="px-2 mb-4">
                <h3 className="text-xs uppercase text-gray-400 font-bold mb-2">Learned Patterns</h3>
                <ul className="space-y-2">
                    {patterns.map(pattern => (
                        <li key={pattern.id} className="p-2 rounded bg-gray-700/20">
                            <div className="flex items-center gap-2 mb-1">
                                <Icon name={pattern.icon} className="w-4 h-4 text-cyan-400" />
                                <span className="font-semibold text-gray-300 text-sm">{pattern.name}</span>
                            </div>
                            <p className="text-xs text-gray-400 ml-6">{pattern.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-auto p-2 border-t border-gray-700/50">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ghostwrite a component... (e.g., 'a settings modal with theme and notification toggles')"
                    className="w-full h-24 p-2 bg-[#161b22] border border-gray-700/50 rounded-md text-sm focus:outline-none focus:border-cyan-500 resize-none"
                />
                <button
                    onClick={handleSubmit}
                    disabled={!prompt.trim()}
                    className="w-full mt-2 px-3 py-2 bg-cyan-600/80 text-white rounded hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors text-sm font-bold flex items-center justify-center gap-2"
                >
                    <Icon name="ghostwriter" className="w-5 h-5" />
                    Ghostwrite
                </button>
            </div>
        </div>
    )
};


export const GhostwriterPanel: React.FC<GhostwriterPanelProps> = ({ status, patterns, onCalibrate, onGhostwrite }) => {
  const renderContent = () => {
    switch(status) {
        case 'uncalibrated':
            return <UncalibratedView onCalibrate={onCalibrate} />;
        case 'calibrating':
            return <CalibratingView />;
        case 'calibrated':
            return <CalibratedView patterns={patterns} onGhostwrite={onGhostwrite} />;
        default:
            return null;
    }
  };

  return (
    <aside className="w-64 bg-[#0d1117] border-r border-gray-700/50 flex flex-col flex-shrink-0">
      <h2 className="text-xs uppercase text-gray-400 font-bold px-3 py-2">Ghostwriter</h2>
      <div className="flex-1 flex flex-col min-h-0">
        {renderContent()}
      </div>
    </aside>
  );
};
