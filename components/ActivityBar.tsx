import React, { useContext } from 'react';
import { AppContext } from '../App';
import { Icon, IconName } from './Icon';

const ActivityBarButton: React.FC<{ iconName: IconName; panelId: string; activePanel: string; onPanelChange: (panelId: string) => void; title: string; }> = 
({ iconName, panelId, activePanel, onPanelChange, title }) => {
  const isActive = activePanel === panelId;
  return (
    <button
      onClick={() => onPanelChange(panelId)}
      title={title}
      className={`relative flex items-center justify-center w-full h-14 transition-colors ${isActive ? 'text-[var(--color-primary-fg)]' : 'text-gray-500 hover:text-white'}`}
    >
      <Icon name={iconName} className="w-7 h-7" />
      {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-primary-fg)] rounded-r-full"></div>}
    </button>
  );
}

export const ActivityBar: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return null;

  const { activePanel, setActivePanel: onPanelChange, kernelModules } = context;
  const pythonModuleActivated = kernelModules.some(m => m.id === 'python' && m.activated);

  return (
    <div className="w-20 bg-[var(--color-bg-surface)] border-r border-[var(--color-border-base)] flex flex-col items-center py-2 gap-2 flex-shrink-0">
      <ActivityBarButton iconName="file" panelId="explorer" activePanel={activePanel} onPanelChange={onPanelChange} title="Explorer" />
      <ActivityBarButton iconName="search" panelId="search" activePanel={activePanel} onPanelChange={onPanelChange} title="Search" />
      <ActivityBarButton iconName="gitBranch" panelId="source-control" activePanel={activePanel} onPanelChange={onPanelChange} title="Source Control" />
      <ActivityBarButton iconName="bug" panelId="debugger" activePanel={activePanel} onPanelChange={onPanelChange} title="Debugger" />
      <ActivityBarButton iconName="forge" panelId="forge" activePanel={activePanel} onPanelChange={onPanelChange} title="Project Forge" />
      <ActivityBarButton iconName="aegis" panelId="aegis" activePanel={activePanel} onPanelChange={onPanelChange} title="Aegis Security" />
      
      <div className="w-full flex-1"></div>

      <ActivityBarButton iconName="kernel" panelId="kernel" activePanel={activePanel} onPanelChange={onPanelChange} title="System Kernel" />
      <ActivityBarButton iconName="palette" panelId="theme" activePanel={activePanel} onPanelChange={onPanelChange} title="Theme Forge" />
    </div>
  );
};
