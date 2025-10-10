import React from 'react';
import { Icon } from './Icon';

interface ActivityBarProps {
  activePanel: string;
  onPanelChange: (panelId: string) => void;
  pythonModuleActivated: boolean;
}

const ActivityBarButton: React.FC<{ iconName: any; panelId: string; activePanel: string; onPanelChange: (panelId: string) => void; title: string; }> = 
({ iconName, panelId, activePanel, onPanelChange, title }) => {
  const isActive = activePanel === panelId;
  return (
    <button
      onClick={() => onPanelChange(panelId)}
      title={title}
      className={`relative flex flex-col items-center justify-center w-16 h-full transition-colors ${isActive ? 'text-[var(--color-primary-fg)]' : 'text-gray-400 hover:text-white'}`}
    >
      <Icon name={iconName} className="w-6 h-6" />
      <span className="text-[10px] mt-1">{title}</span>
      {isActive && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-[var(--color-primary-fg)] rounded-b-full"></div>}
    </button>
  );
}

export const ActivityBar: React.FC<ActivityBarProps> = ({ activePanel, onPanelChange, pythonModuleActivated }) => {
  return (
    <div className="h-16 bg-[var(--color-bg-surface)] border-r border-[var(--color-border-base)] flex items-center px-2 flex-shrink-0">
      <ActivityBarButton iconName="file" panelId="explorer" activePanel={activePanel} onPanelChange={onPanelChange} title="Explorer" />
      <ActivityBarButton iconName="bug" panelId="debugger" activePanel={activePanel} onPanelChange={onPanelChange} title="Debugger" />
      <ActivityBarButton iconName="gitBranch" panelId="source-control" activePanel={activePanel} onPanelChange={onPanelChange} title="Source" />
      <ActivityBarButton iconName="shield" panelId="intel" activePanel={activePanel} onPanelChange={onPanelChange} title="Intel" />
      <ActivityBarButton iconName="aegis" panelId="aegis" activePanel={activePanel} onPanelChange={onPanelChange} title="Aegis" />
      <ActivityBarButton iconName="hammer" panelId="forge" activePanel={activePanel} onPanelChange={onPanelChange} title="Forge" />
      <ActivityBarButton iconName="ghostwriter" panelId="ghostwriter" activePanel={activePanel} onPanelChange={onPanelChange} title="Ghost" />
      <ActivityBarButton iconName="cpu" panelId="architect" activePanel={activePanel} onPanelChange={onPanelChange} title="Architect" />
      {pythonModuleActivated && <ActivityBarButton iconName="package" panelId="packages" activePanel={activePanel} onPanelChange={onPanelChange} title="Packages" />}
      
      <div className="h-full w-px bg-[var(--color-border-base)] mx-2"></div>

      <ActivityBarButton iconName="mindmap" panelId="modmind" activePanel={activePanel} onPanelChange={onPanelChange} title="ModMind" />
      <ActivityBarButton iconName="brain" panelId="cognitive-core" activePanel={activePanel} onPanelChange={onPanelChange} title="Cognition" />
      <ActivityBarButton iconName="heart-circuit" panelId="symbiote" activePanel={activePanel} onPanelChange={onPanelChange} title="Symbiote" />
      <ActivityBarButton iconName="changelog" panelId="changelog" activePanel={activePanel} onPanelChange={onPanelChange} title="Log" />
      <ActivityBarButton iconName="kernel" panelId="kernel" activePanel={activePanel} onPanelChange={onPanelChange} title="Kernel" />
      <ActivityBarButton iconName="palette" panelId="theme" activePanel={activePanel} onPanelChange={onPanelChange} title="Theme" />
    </div>
  );
};