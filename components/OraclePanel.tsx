import React from 'react';
import type { OracleInsight } from '../types';
import { Icon, IconName } from './Icon';

// This is a browser-only component, so we can safely reference 'window'
declare const hljs: any;

interface OraclePanelProps {
  insights: OracleInsight[];
  onConsult: () => void;
  isLoading: boolean;
}

const InsightCard: React.FC<{ insight: OracleInsight }> = ({ insight }) => {
    const codeRef = React.useRef<HTMLElement>(null);

    React.useEffect(() => {
        if (codeRef.current) {
            hljs.highlightElement(codeRef.current);
        }
    }, [insight.code]);

    const typeConfig: Record<OracleInsight['type'], { icon: IconName; color: string; }> = {
        'Next Step': { icon: 'sparkle', color: 'text-cyan-400' },
        'Potential Pitfall': { icon: 'shield', color: 'text-red-400' },
        'Relevant Snippet': { icon: 'file', color: 'text-green-400' },
        'External Knowledge': { icon: 'lightbulb', color: 'text-yellow-400' },
    };
    
    const config = typeConfig[insight.type];

    return (
        <div className="p-3 bg-[#161b22] border border-gray-700/50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
                <Icon name={config.icon} className={`w-5 h-5 flex-shrink-0 ${config.color}`} />
                <div className='flex-1'>
                    <h4 className={`font-bold text-sm ${config.color}`}>{insight.type}</h4>
                    <p className="font-semibold text-gray-200">{insight.title}</p>
                </div>
            </div>
            <p className="text-sm text-gray-400 mb-2">{insight.description}</p>
            {insight.code && (
                <div className="max-h-48 overflow-y-auto bg-black/30 rounded mt-2">
                    <pre><code ref={codeRef} className="text-xs">{insight.code}</code></pre>
                </div>
            )}
            {insight.link && (
                <a href={insight.link} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 hover:underline mt-2 block truncate">
                    {insight.link}
                </a>
            )}
        </div>
    );
};

export const OraclePanel: React.FC<OraclePanelProps> = ({ insights, onConsult, isLoading }) => {
  return (
    <aside className="w-64 bg-[#0d1117] border-r border-gray-700/50 flex flex-col flex-shrink-0">
      <h2 className="text-xs uppercase text-gray-400 font-bold px-3 py-2">The Oracle</h2>
      <div className="flex-1 p-2 overflow-y-auto">
        {isLoading ? (
             <div className="p-4 flex flex-col items-center justify-center text-center h-full">
                <Icon name="oracle" className="w-16 h-16 text-cyan-400 mb-6 animate-pulse" />
                <h3 className="font-bold text-gray-200 mb-2">Gazing into the digital ether...</h3>
                <p className="text-sm text-gray-500">The Oracle is divining your path.</p>
            </div>
        ) : insights.length > 0 ? (
            <div className="space-y-3">
                {insights.map(insight => <InsightCard key={insight.id} insight={insight} />)}
            </div>
        ) : (
            <div className="p-4 flex flex-col items-center justify-center text-center h-full">
                <Icon name="oracle" className="w-16 h-16 text-gray-600 mb-4" />
                <h3 className="font-bold text-gray-200 mb-2">The Oracle is Silent</h3>
                <p className="text-sm text-gray-500">
                    Consult the Oracle to receive predictive insights based on your current work.
                </p>
            </div>
        )}
      </div>
      <div className="p-2 border-t border-gray-700/50">
        <button
          onClick={onConsult}
          disabled={isLoading}
          className="w-full mt-2 px-3 py-2 bg-cyan-600/80 text-white rounded hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors text-sm font-bold flex items-center justify-center gap-2"
        >
          <Icon name="oracle" className="w-5 h-5" />
          Consult the Oracle
        </button>
      </div>
    </aside>
  );
};
