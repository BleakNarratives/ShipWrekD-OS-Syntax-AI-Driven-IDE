import React from 'react';
import { Icon, IconName } from './Icon';
import type { CognitiveEngineTier } from '../types';

interface StatusBarProps {
    engineTier: CognitiveEngineTier;
}

export const StatusBar: React.FC<StatusBarProps> = ({ engineTier }) => {
  // FIX: Explicitly type the map object to ensure TypeScript correctly infers
  // the 'icon' property as type 'IconName' instead of the wider 'string' type.
  const engineInfoMap: Record<CognitiveEngineTier, { icon: IconName; text: string; }> = {
      distilled: { icon: 'cpu', text: 'Local AI' },
      standard: { icon: 'cloud', text: 'Cloud AI' },
      advanced: { icon: 'cloud', text: 'Cloud AI (Adv)' },
      unfettered: { icon: 'cloud', text: 'Cloud AI (Unf)' },
  };
  const engineInfo = engineInfoMap[engineTier];

  return (
    <footer className="bg-[var(--color-bg-surface)] border-t border-[var(--color-border-base)] px-4 h-8 flex items-center justify-between text-xs text-gray-400 flex-shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Icon name="gitBranch" className="w-4 h-4" />
          <span>main</span>
        </div>
        <div className="flex items-center gap-1">
          <Icon name="sync" className="w-4 h-4" />
          <span>0↓ 0↑</span>
        </div>
         <div className="flex items-center gap-1.5" title={`Cognitive Engine: ${engineTier}`}>
          <Icon name={engineInfo.icon} className="w-4 h-4" />
          <span>{engineInfo.text}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span>Spaces: 2</span>
        <span>UTF-8</span>
        <span>TypeScript</span>
        <div className="flex items-center gap-1">
          <Icon name="bell" className="w-4 h-4" />
        </div>
      </div>
    </footer>
  );
};