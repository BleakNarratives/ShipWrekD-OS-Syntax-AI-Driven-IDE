import React from 'react';
import { Icon, IconName } from './Icon';

interface ChangeItem {
    type: 'Feature' | 'Improvement' | 'Fix';
    description: string;
}

interface VersionLog {
    version: string;
    date: string;
    items: ChangeItem[];
}

const changelogData: VersionLog[] = [
    {
        version: "v0.4.0",
        date: "Current",
        items: [
            { type: 'Feature', description: 'Introduced "Project Ghostwriter" for personalized AI code generation.' },
            { type: 'Feature', description: 'Added AI Calibration to learn project-specific coding styles.' },
            { type: 'Improvement', description: 'Enhanced modularity with a new System Kernel panel.' },
        ],
    },
    {
        version: "v0.3.0",
        date: "Yesterday",
        items: [
            { type: 'Feature', description: 'Integrated AI code generation directly from comments in the editor.' },
            { type: 'Feature', description: 'Added AI-powered refactoring via a right-click context menu.' },
            { type: 'Feature', description: 'Activated "Blue Sky" AI brainstorming modal.' },
        ],
    },
    {
        version: "v0.2.0",
        date: "Two Days Ago",
        items: [
            { type: 'Feature', description: 'Implemented proactive, contextual AI suggestions in the assistant.' },
            { type: 'Feature', description: 'Launched real-time AI code diagnostics and inline fixes.' },
            { type: 'Improvement', description: 'Upgraded Command Palette with comprehensive IDE actions.' },
        ],
    },
    {
        version: "v0.1.0",
        date: "Three Days Ago",
        items: [
            { type: 'Feature', description: 'Interactive terminal with support for simulated shell commands.' },
            { type: 'Improvement', description: 'Redesigned UI with an activity bar for modular panel access.' },
        ],
    },
];

const changeTypeStyles: Record<ChangeItem['type'], { icon: IconName; color: string; }> = {
    'Feature': { icon: 'sparkle', color: 'text-cyan-400' },
    'Improvement': { icon: 'wrench', color: 'text-green-400' },
    'Fix': { icon: 'check', color: 'text-yellow-400' },
};


export const ChangelogPanel: React.FC = () => {
  return (
    <aside className="w-64 bg-[#0d1117] border-r border-gray-700/50 flex flex-col flex-shrink-0">
      <h2 className="text-xs uppercase text-gray-400 font-bold px-3 py-2">Changelog</h2>
      <div className="flex-1 p-2 overflow-y-auto">
        {changelogData.map((log) => (
            <div key={log.version} className="mb-6">
                <div className="flex items-baseline gap-3 mb-2 px-1">
                    <h3 className="font-bold text-lg text-gray-200">{log.version}</h3>
                    <p className="text-sm text-gray-500">{log.date}</p>
                </div>
                <ul className="space-y-2">
                    {log.items.map((item, index) => {
                        const { icon, color } = changeTypeStyles[item.type];
                        return (
                            <li key={index} className="flex items-start gap-3 p-1 text-sm">
                                <Icon name={icon} className={`w-4 h-4 mt-0.5 flex-shrink-0 ${color}`} />
                                <span className="text-gray-300">{item.description}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        ))}
      </div>
    </aside>
  );
};