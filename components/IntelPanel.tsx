import React, { useState } from 'react';
import type { PerformanceInsight, SecurityVulnerability } from '../types';
import { Icon } from './Icon';

interface IntelPanelProps {
  performanceInsights: PerformanceInsight[];
  securityVulnerabilities: SecurityVulnerability[];
}

const severityColors: Record<string, string> = {
    critical: 'border-red-500',
    high: 'border-orange-500',
    medium: 'border-yellow-500',
    low: 'border-blue-500',
};

const InsightItem: React.FC<{ item: PerformanceInsight | SecurityVulnerability, type: 'performance' | 'security' }> = ({ item, type }) => (
    <div className={`p-2 border-l-4 rounded bg-gray-700/20 ${severityColors[item.severity] || 'border-gray-500'}`}>
        <div className="flex items-start gap-2 mb-1">
            <Icon name={type === 'performance' ? 'bolt' : 'lock'} className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
                <span className="font-semibold text-gray-300 text-sm">L{item.line}: {item.message}</span>
                <p className="text-xs text-gray-400 mt-1">{item.suggestion}</p>
                {type === 'security' && (item as SecurityVulnerability).cwe && (
                    <p className="text-xs text-gray-500 mt-1">Reference: {(item as SecurityVulnerability).cwe}</p>
                )}
            </div>
        </div>
    </div>
);


export const IntelPanel: React.FC<IntelPanelProps> = ({ performanceInsights, securityVulnerabilities }) => {
    const [isPerfOpen, setIsPerfOpen] = useState(true);
    const [isSecOpen, setIsSecOpen] = useState(true);

    return (
        <aside className="w-64 bg-[#0d1117] border-r border-gray-700/50 flex flex-col flex-shrink-0">
            <h2 className="text-xs uppercase text-gray-400 font-bold px-3 py-2">Intelligence Analysis</h2>
            <div className="flex-1 p-2 overflow-y-auto space-y-4">
                <div>
                    <button onClick={() => setIsPerfOpen(!isPerfOpen)} className="w-full text-left font-bold text-gray-300 text-sm flex items-center justify-between p-1">
                        <span>Performance Insights ({performanceInsights.length})</span>
                        <Icon name={isPerfOpen ? 'chevronDown' : 'chevronRight'} className="w-4 h-4 text-gray-500" />
                    </button>
                    {isPerfOpen && (
                        <div className="mt-2 space-y-2">
                            {performanceInsights.length > 0 ? (
                                performanceInsights.map((insight, i) => <InsightItem key={`perf-${i}`} item={insight} type="performance" />)
                            ) : (
                                <p className="text-xs text-gray-500 px-2">No performance issues found.</p>
                            )}
                        </div>
                    )}
                </div>
                <div>
                    <button onClick={() => setIsSecOpen(!isSecOpen)} className="w-full text-left font-bold text-gray-300 text-sm flex items-center justify-between p-1">
                        <span>Security Vulnerabilities ({securityVulnerabilities.length})</span>
                        <Icon name={isSecOpen ? 'chevronDown' : 'chevronRight'} className="w-4 h-4 text-gray-500" />
                    </button>
                    {isSecOpen && (
                        <div className="mt-2 space-y-2">
                            {securityVulnerabilities.length > 0 ? (
                                securityVulnerabilities.map((vuln, i) => <InsightItem key={`sec-${i}`} item={vuln} type="security" />)
                            ) : (
                                <p className="text-xs text-gray-500 px-2">No security vulnerabilities found.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};
