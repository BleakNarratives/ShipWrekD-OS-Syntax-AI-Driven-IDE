import React from 'react';
import { Icon } from './Icon';

interface CaptainLogPanelProps {
  content: string;
}

interface LogEntry {
  timestamp: string;
  header: string;
  tasks: { title: string; description: string }[];
  status: string;
}

const parseLogContent = (content: string): LogEntry[] => {
    const entries: LogEntry[] = [];
    const entryBlocks = content.split('=====================================');
    
    // Start from the second block to ignore header
    for (let i = 1; i < entryBlocks.length; i++) {
        const block = entryBlocks[i];
        if (!block.trim()) continue;

        const lines = block.trim().split('\n');
        const entry: LogEntry = { timestamp: '', header: '', tasks: [], status: '' };
        
        let currentTask: { title: string; description: string } | null = null;

        lines.forEach(line => {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('[LATEST -')) {
                const match = trimmedLine.match(/\[LATEST - (.*?)\] (.*)/);
                if (match) {
                    entry.timestamp = match[1];
                    entry.header = match[2];
                }
            } else if (trimmedLine.startsWith('- TASK')) {
                const match = trimmedLine.match(/- TASK \d+ \((.*?)\): (.*)/);
                if (match) {
                    currentTask = { title: match[1], description: match[2] };
                    entry.tasks.push(currentTask);
                }
            } else if (trimmedLine.startsWith('- STATUS:')) {
                entry.status = trimmedLine.substring('- STATUS:'.length).trim();
            } else if (currentTask) {
                // This is a continuation of a task description
                currentTask.description += ` ${trimmedLine}`;
            }
        });

        if (entry.header) {
            entries.push(entry);
        }
    }

    return entries.reverse(); // Show latest first
};

export const CaptainLogPanel: React.FC<CaptainLogPanelProps> = ({ content }) => {
  const logEntries = parseLogContent(content);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="px-4 h-12 flex items-center border-b border-[var(--color-border-subtle)] flex-shrink-0">
        <h2 className="text-sm uppercase text-gray-400 font-bold tracking-wider">Captain's Log</h2>
      </div>
      <div className="flex-1 p-2 overflow-y-auto">
        {logEntries.map((entry, index) => (
            <div key={index} className="mb-6 p-3 bg-[var(--color-bg-base)] rounded-lg border border-[var(--color-border-base)]">
                <div className="border-b border-[var(--color-border-base)] pb-2 mb-2">
                    <p className="text-xs text-gray-400">Log Entry - {entry.timestamp}</p>
                    <p className="font-semibold text-gray-200">{entry.header}</p>
                </div>
                {entry.tasks.length > 0 && (
                    <div className="mb-2">
                        <h4 className="text-xs font-bold uppercase text-gray-400 mb-1">Tasks Executed:</h4>
                        <ul className="space-y-2 pl-4">
                            {entry.tasks.map((task, taskIndex) => (
                                <li key={taskIndex} className="text-sm text-gray-300 list-disc list-outside">
                                    <span className="font-bold text-gray-200">{task.title}:</span> {task.description}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                 {entry.status && (
                    <div>
                        <h4 className="text-xs font-bold uppercase text-gray-400 mb-1">Status Report:</h4>
                        <p className="text-sm text-cyan-300 italic">"{entry.status}"</p>
                    </div>
                 )}
            </div>
        ))}
      </div>
    </div>
  );
};