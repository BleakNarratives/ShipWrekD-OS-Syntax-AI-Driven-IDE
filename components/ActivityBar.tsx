import React from 'react';
import { Icon, IconName } from './Icon';

interface ActivityBarProps {
  activePanel: string;
  onPanelChange: (panelId: string) => void;
  pythonModuleActivated: boolean;
}

const ActivityBarButton: React.FC<{ iconName: IconName; panelId: string; activePanel: string; onPanelChange: (panelId: string) => void; title: string; }> = 
({ iconName, panelId, activePanel, onPanelChange, title }) => {
  const isActive = activePanel === panelId;
  return (
    <button
      onClick={() => onPanelChange(panelId)}
      title={title}
      className={`relative flex items-center justify-center w-full h-16 transition-colors ${isActive ? 'text-[var(--color-primary-fg)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
    >
      <Icon name={iconName} className="w-7 h-7" />
      {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-primary-fg)]"></div>}
    </button>
  );
}

export const ActivityBar: React.FC<ActivityBarProps> = ({ activePanel, onPanelChange, pythonModuleActivated }) => {
  return (
    <div className="w-20 bg-[#0d1117] border-r border-[var(--color-border-base)] flex flex-col items-center py-4 gap-2 flex-shrink-0">
      <ActivityBarButton iconName="file" panelId="explorer" activePanel={activePanel} onPanelChange={onPanelChange} title="Explorer" />
      <ActivityBarButton iconName="search" panelId="search" activePanel={activePanel} onPanelChange={onPanelChange} title="Search" />
      <ActivityBarButton iconName="bug" panelId="debugger" activePanel={activePanel} onPanelChange={onPanelChange} title="Debugger" />
      <ActivityBarButton iconName="gitBranch" panelId="source-control" activePanel={activePanel} onPanelChange={onPanelChange} title="Source" />
      <ActivityBarButton iconName="rocket" panelId="launchpad" activePanel={activePanel} onPanelChange={onPanelChange} title="Launchpad" />
      <ActivityBarButton iconName="shield" panelId="intel" activePanel={activePanel} onPanelChange={onPanelChange} title="Intel" />
      <ActivityBarButton iconName="aegis" panelId="aegis" activePanel={activePanel} onPanelChange={onPanelChange} title="Aegis" />
      <ActivityBarButton iconName="forge" panelId="forge" activePanel={activePanel} onPanelChange={onPanelChange} title="Forge" />
      <ActivityBarButton iconName="ghostwriter" panelId="ghostwriter" activePanel={activePanel} onPanelChange={onPanelChange} title="Ghost" />
      <ActivityBarButton iconName="cpu" panelId="architect" activePanel={activePanel} onPanelChange={onPanelChange} title="Architect" />
      {pythonModuleActivated && <ActivityBarButton iconName="package" panelId="packages" activePanel={activePanel} onPanelChange={onPanelChange} title="Packages" />}
      
      <div className="w-full flex-1"></div>

      <ActivityBarButton iconName="vault" panelId="vault" activePanel={activePanel} onPanelChange={onPanelChange} title="The Vault" />
      <ActivityBarButton iconName="history" panelId="chronicle" activePanel={activePanel} onPanelChange={onPanelChange} title="Chronicle" />
      <ActivityBarButton iconName="oracle" panelId="oracle" activePanel={activePanel} onPanelChange={onPanelChange} title="Oracle" />
      <ActivityBarButton iconName="modmind" panelId="modmind" activePanel={activePanel} onPanelChange={onPanelChange} title="ModMind" />
      <ActivityBarButton iconName="brain" panelId="cognitive-core" activePanel={activePanel} onPanelChange={onPanelChange} title="Cognition" />
      <ActivityBarButton iconName="heart-circuit" panelId="symbiote" activePanel={activePanel} onPanelChange={onPanelChange} title="Symbiote" />
      <ActivityBarButton iconName="changelog" panelId="changelog" activePanel={activePanel} onPanelChange={onPanelChange} title="Log" />
      <ActivityBarButton iconName="kernel" panelId="kernel" activePanel={activePanel} onPanelChange={onPanelChange} title="Kernel" />
      <ActivityBarButton iconName="keyboard" panelId="compendium" activePanel={activePanel} onPanelChange={onPanelChange} title="Keystroke Compendium" />
      <ActivityBarButton iconName="palette" panelId="theme" activePanel={activePanel} onPanelChange={onPanelChange} title="Theme" />
    </div>
  );
};
