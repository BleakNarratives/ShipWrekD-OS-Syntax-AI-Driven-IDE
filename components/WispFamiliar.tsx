import React from 'react';
import type { WispState } from '../types';
import { Icon } from './Icon';

interface WispFamiliarProps {
  state: WispState;
  onOpenConfig: () => void;
}

const getWispVisuals = (level: number) => {
    if (level < 5) {
        return {
            size: 40,
            name: "Wisp",
            icon: <div className="w-6 h-6 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_15px_5px_rgba(0,255,255,0.4)]"></div>
        };
    } else if (level < 10) {
        return {
            size: 48,
            name: "Acolyte",
            icon: <Icon name="sparkle" className="w-8 h-8 text-cyan-300 animate-spin" style={{ animationDuration: '3s' }} />
        };
    }
    return {
        size: 56,
        name: "Construct",
        icon: <Icon name="cpu" className="w-10 h-10 text-cyan-200" />
    };
};

export const WispFamiliar: React.FC<WispFamiliarProps> = ({ state, onOpenConfig }) => {
    const visuals = getWispVisuals(state.level);

    return (
        <div 
            className="fixed bottom-6 right-6 flex items-center gap-3 z-50 group"
            aria-labelledby="wisp-name"
        >
            <div className="relative">
                <div 
                    className="flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm border-2 border-cyan-500/50 transition-all duration-300"
                    style={{ width: visuals.size, height: visuals.size }}
                >
                    {visuals.icon}
                </div>
                
                <button 
                    onClick={onOpenConfig}
                    className="absolute -top-2 -left-2 w-6 h-6 bg-[#161b22] border border-gray-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:border-cyan-400"
                    title="Configure Symbiote"
                >
                    <Icon name="gear" className="w-4 h-4 text-gray-400 hover:text-cyan-400" />
                </button>
            </div>

            <div className="absolute right-full mr-4 w-48 p-2 bg-[#161b22]/80 backdrop-blur-sm border border-gray-700/50 rounded-lg shadow-2xl text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                 <h3 id="wisp-name" className="font-bold text-gray-200">{visuals.name} <span className="text-cyan-400">Lv. {state.level}</span></h3>
                 <p className="text-xs text-gray-400 italic">{state.status === 'idle' ? 'Awaiting command...' : 'Executing task...'}</p>
                 <div className="w-full bg-gray-700/50 rounded-full h-1 mt-2">
                    <div 
                        className="bg-cyan-400 h-1 rounded-full transition-all duration-500" 
                        style={{ width: `${(state.xp / state.xpToNextLevel) * 100}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};
