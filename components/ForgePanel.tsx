import React, { useState } from 'react';
import type { ProjectTemplate } from '../types';
import { Icon } from './Icon';

interface ForgePanelProps {
  templates: ProjectTemplate[];
  onForgeProject: (template: ProjectTemplate, projectName: string) => void;
}

export const ForgePanel: React.FC<ForgePanelProps> = ({ templates, onForgeProject }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<ProjectTemplate | null>(null);
  const [projectName, setProjectName] = useState('');

  const handleForge = () => {
    if (selectedTemplate && projectName.trim()) {
      onForgeProject(selectedTemplate, projectName.trim());
      setProjectName('');
      setSelectedTemplate(null);
    }
  };
  
  const handleSelectTemplate = (template: ProjectTemplate) => {
      setSelectedTemplate(template);
      // Suggest a project name based on the template
      const suggestedName = template.name.toLowerCase().replace(/\s+/g, '-');
      setProjectName(suggestedName);
  }

  return (
    <aside className="w-64 bg-[#0d1117] border-r border-gray-700/50 flex flex-col flex-shrink-0">
      <h2 className="text-xs uppercase text-gray-400 font-bold px-3 py-2">Project Forge</h2>
      <div className="flex-1 p-2 overflow-y-auto">
        <h3 className="text-sm font-bold text-gray-300 px-1 mb-2">Select an Archetype</h3>
        <div className="space-y-2">
            {templates.map(template => (
                <button
                    key={template.id}
                    onClick={() => handleSelectTemplate(template)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${selectedTemplate?.id === template.id ? 'bg-cyan-500/10 border-cyan-500' : 'bg-[#161b22] border-gray-700/50 hover:border-gray-600'}`}
                >
                    <div className="flex items-center gap-3 mb-1">
                        <Icon name={template.icon} className="w-6 h-6 text-cyan-400" />
                        <h4 className="font-bold text-gray-200">{template.name}</h4>
                    </div>
                    <p className="text-xs text-gray-400">{template.description}</p>
                </button>
            ))}
        </div>
      </div>
      {selectedTemplate && (
        <div className="p-4 border-t border-gray-700/50 bg-[#161b22]">
            <div className="mb-3">
                <label htmlFor="project-name" className="text-xs font-bold text-gray-400 block mb-1">Project Name</label>
                <input
                    id="project-name"
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g., my-awesome-app"
                    className="w-full bg-[#0d1117] border border-gray-600 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:border-cyan-500"
                />
            </div>
          <button
            onClick={handleForge}
            disabled={!projectName.trim()}
            className="w-full px-3 py-2 bg-cyan-600/80 text-white rounded hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors text-sm font-bold flex items-center justify-center gap-2"
          >
            <Icon name="hammer" className="w-5 h-5" />
            Forge Project
          </button>
        </div>
      )}
    </aside>
  );
};
