import React from 'react';
import type { ThemeName } from '../types';
import { THEMES } from '../constants';
import { Icon } from './Icon';

interface ThemePanelProps {
  currentTheme: ThemeName;
  onThemeChange: (themeName: ThemeName) => void;
}

export const ThemePanel: React.FC<ThemePanelProps> = ({ currentTheme, onThemeChange }) => {
  return (
    <aside className="w-64 bg-[#0d1117] border-r border-gray-700/50 flex flex-col flex-shrink-0">
      <h2 className="text-xs uppercase text-gray-400 font-bold px-3 py-2">Theme Forge</h2>
      <div className="flex-1 p-2 overflow-y-auto space-y-2">
        {Object.entries(THEMES).map(([id, theme]) => (
          <button
            key={id}
            onClick={() => onThemeChange(id as ThemeName)}
            className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${currentTheme === id ? 'bg-cyan-500/10 border-cyan-500' : 'bg-[#161b22] border-gray-700/50 hover:border-gray-600'}`}
          >
            <h4 className="font-bold text-gray-200 mb-2">{theme.name}</h4>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border-2 border-gray-600" style={{ backgroundColor: theme.palette['--color-primary-fg'] }}></div>
              <div className="w-6 h-6 rounded-full border-2 border-gray-600" style={{ backgroundColor: theme.palette['--color-bg-surface'] }}></div>
              <div className="w-6 h-6 rounded-full border-2 border-gray-600" style={{ backgroundColor: theme.palette['--color-accent-red'] }}></div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};
