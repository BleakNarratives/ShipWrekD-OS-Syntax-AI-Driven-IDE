import React, { useContext } from 'react';
import { Icon } from './Icon';
import { AppContext } from '../App';

export const StatusBar: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return null;
  const { cognitiveLoad, isAnalyzingCode, analysisError, activeFileNode: activeFile } = context;

  const loadColor = cognitiveLoad > 75 ? 'bg-red-500' : cognitiveLoad > 50 ? 'bg-yellow-500' : 'bg-cyan-500';

  return (
    <footer className="bg-[var(--color-bg-surface)] shadow-[0_-1px_0_0_var(--color-border-base)] px-4 h-8 flex items-center justify-between text-xs text-gray-400 flex-shrink-0 z-10">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 hover:text-white cursor-pointer" title="Git Branch">
          <Icon name="gitBranch" className="w-4 h-4" />
          <span>main</span>
        </div>
        <div className="flex items-center gap-2" title={`Cognitive Load: ${Math.round(cognitiveLoad)}%`}>
            <Icon name="brain" className="w-4 h-4"/>
            <div className="w-24 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ${loadColor}`} style={{ width: `${cognitiveLoad}%` }}></div>
            </div>
        </div>

        {analysisError ? (
            <div className="flex items-center gap-1.5 text-yellow-400" title={analysisError}>
                <Icon name="bell" className="w-4 h-4" />
                <span>{analysisError}</span>
            </div>
        ) : isAnalyzingCode ? (
            <div className="flex items-center gap-1.5 text-cyan-300 px-2 py-0.5 rounded-md bg-cyan-500/10 animate-pulse" title="Analyzing code...">
                <Icon name="sparkle" className="w-4 h-4 animate-spin" />
                <span>Analyzing...</span>
            </div>
        ) : null}
      </div>
      <div className="flex items-center gap-4">
        <span title="Indentation">Spaces: 2</span>
        <span title="File Encoding">UTF-8</span>
        {activeFile && <span title="Language Mode">{activeFile.name.split('.').pop()?.toUpperCase()}</span>}
        <div className="flex items-center gap-1 hover:text-white cursor-pointer" title="Notifications">
          <Icon name="bell" className="w-4 h-4" />
        </div>
      </div>
    </footer>
  );
};