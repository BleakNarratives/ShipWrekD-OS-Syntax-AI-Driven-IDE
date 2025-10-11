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
    <div className="w-full h-full flex flex-col">
      <div className="px-4 h-12 flex items-center border-b border-[var(--color-border-subtle)] flex-shrink-0">
        <h2 className="text-sm uppercase text-gray-400 font-bold tracking-wider">Theme Forge</h2>
      </div>
      <div className="flex-1 p-2 overflow-y-auto space-y-2">
        {Object.entries(THEMES).map(([id, theme]) => (
          <button
            key={id}
            onClick={() => onThemeChange(id as ThemeName)}
            className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${currentTheme === id ? 'bg-cyan-500/10 border-cyan-500' : 'bg-[var(--color-bg-base)] border-[var(--color-border-subtle)] hover:border-gray-600'}`}
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
    </div>
  );
};