import React, { useState } from 'react';
import type { PerformanceInsight, SecurityVulnerability, TraceLogEntry, TraceResult } from '../types';
import { Icon } from './Icon';
import { CodeBlock } from './CodeBlock';

interface IntelPanelProps {
  performanceInsights: PerformanceInsight[];
  securityVulnerabilities: SecurityVulnerability[];
  traceLog: TraceLogEntry[];
  traceResult: TraceResult | null;
  isTracing: boolean;
  onTraceCascade: (seed: string) => void;
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

const AgentOperations: React.FC<Omit<IntelPanelProps, 'performanceInsights' | 'securityVulnerabilities'>> = ({ traceLog, traceResult, isTracing, onTraceCascade }) => {
    const [seed, setSeed] = useState('');

    const handleInitiate = () => {
        if (seed.trim() && !isTracing) {
            onTraceCascade(seed);
        }
    };
    
    const sourceColors: Record<TraceLogEntry['source'], string> = {
        SYSTEM: 'text-gray-400',
        aFiREFLY: 'text-purple-400',
        OSINT: 'text-cyan-400',
        ModMind: 'text-amber-400',
    }

    return (
        <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 p-2 overflow-y-auto space-y-4">
                {traceLog.length === 0 && !isTracing && (
                    <div className="p-4 flex flex-col items-center justify-center text-center h-full text-gray-500">
                        <Icon name="crosshair" className="w-12 h-12 mb-4" />
                        <h3 className="font-bold text-gray-400">Agent 6 Standing By</h3>
                        <p className="text-sm mt-1">Provide a target seed to initiate a Trace Cascade.</p>
                    </div>
                )}

                {traceLog.length > 0 && (
                    <div>
                        <h3 className="text-xs uppercase text-gray-500 font-bold px-1 mb-2">Trace Log</h3>
                        <div className="p-2 bg-[var(--color-bg-base)] rounded space-y-1 font-mono text-xs max-h-60 overflow-y-auto">
                            {traceLog.map(entry => (
                                <p key={entry.id}>
                                    <span className="text-gray-600">{entry.timestamp.toLocaleTimeString()} </span>
                                    <span className={sourceColors[entry.source]}>[{entry.source}] </span>
                                    <span className="text-gray-300">{entry.message}</span>
                                </p>
                            ))}
                             {isTracing && <p className="text-cyan-300 animate-pulse">Tracing...</p>}
                        </div>
                    </div>
                )}
               
                {traceResult && (
                     <div>
                        <h3 className="text-xs uppercase text-gray-500 font-bold px-1 mb-2">Trace Result</h3>
                         <div className="p-2 bg-[var(--color-bg-base)] rounded space-y-2">
                             <p className="text-sm text-gray-300 italic">{traceResult.summary}</p>
                            <CodeBlock code={JSON.stringify(traceResult.leads.filter(l => l.confidence >= 0.5), null, 2)} language="json" filename="leads.json" />
                        </div>
                    </div>
                )}

            </div>
            <div className="p-2 border-t border-[var(--color-border-base)]">
                <input
                    type="text"
                    value={seed}
                    onChange={(e) => setSeed(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleInitiate()}
                    placeholder="Target Seed (e.g., name, handle)"
                    className="w-full bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] rounded-md px-2 py-1.5 text-sm focus:outline-none focus:border-cyan-500"
                    disabled={isTracing}
                />
                 <button
                    onClick={handleInitiate}
                    disabled={isTracing || !seed.trim()}
                    className="w-full mt-2 px-3 py-1.5 bg-cyan-600/80 text-white rounded hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors text-sm font-bold flex items-center justify-center gap-2"
                >
                    <Icon name="crosshair" className="w-4 h-4" />
                    Initiate Trace Cascade
                </button>
            </div>
        </div>
    );
};


export const IntelPanel: React.FC<IntelPanelProps> = (props) => {
    const { performanceInsights, securityVulnerabilities, ...agentProps } = props;
    const [isPerfOpen, setIsPerfOpen] = useState(true);
    const [isSecOpen, setIsSecOpen] = useState(true);
    const [activeTab, setActiveTab] = useState<'analysis' | 'agents'>('analysis');

    const AnalysisView = () => (
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
    );


    return (
        <div className="w-full h-full flex flex-col">
            <div className="px-4 h-12 flex items-center border-b border-[var(--color-border-subtle)] flex-shrink-0">
                <h2 className="text-sm uppercase text-gray-400 font-bold tracking-wider">Intel & Agents</h2>
            </div>
            <div className="flex items-center px-2 border-b border-[var(--color-border-base)] text-sm">
                <button onClick={() => setActiveTab('analysis')} className={`px-3 py-2 font-semibold ${activeTab === 'analysis' ? 'border-b-2 border-[var(--color-primary-fg)] text-gray-100' : 'text-gray-500 hover:text-gray-200'}`}>
                    Analysis
                </button>
                 <button onClick={() => setActiveTab('agents')} className={`px-3 py-2 font-semibold ${activeTab === 'agents' ? 'border-b-2 border-[var(--color-primary-fg)] text-gray-100' : 'text-gray-500 hover:text-gray-200'}`}>
                    Agents
                </button>
            </div>
            {activeTab === 'analysis' ? <AnalysisView /> : <AgentOperations {...agentProps} />}
        </div>
    );
};