import React, { useState } from 'react';
import type { Diagnostic } from '../types';
import { Icon, IconName } from './Icon';

interface InlineDiagnosticProps {
    diagnostic: Diagnostic;
    originalCode: string;
    onApplyFix: (lineNumber: number, suggestion: string) => void;
}

export const InlineDiagnostic: React.FC<InlineDiagnosticProps> = ({ diagnostic, originalCode, onApplyFix }) => {
    const [showFix, setShowFix] = useState(false);

    const severityMap: Record<Diagnostic['severity'], { icon: IconName, color: string, bgColor: string }> = {
        'error': { icon: 'close', color: 'text-red-400', bgColor: 'bg-red-500/10' },
        'warning': { icon: 'bell', color: 'text-yellow-400', bgColor: 'bg-yellow-500/10' },
        'info': { icon: 'lightbulb', color: 'text-cyan-400', bgColor: 'bg-cyan-500/10' },
    };

    const { icon, color, bgColor } = severityMap[diagnostic.severity] || severityMap.info;

    const handleAccept = () => {
        if(diagnostic.suggestion) {
            onApplyFix(diagnostic.line, diagnostic.suggestion);
        }
        setShowFix(false);
    }
    
    const indentation = originalCode.match(/^\s*/)?.[0] || '';

    return (
        <div className={`p-2 text-xs leading-normal whitespace-normal ${bgColor}`}>
            <div className="flex items-start gap-2">
                <Icon name={icon} className={`w-4 h-4 mt-0.5 flex-shrink-0 ${color}`} />
                <div className="flex-1">
                    <p className="text-gray-300">{diagnostic.message}</p>
                    {diagnostic.suggestion && !showFix && (
                         <button 
                            onClick={() => setShowFix(true)}
                            className={`mt-2 px-2 py-0.5 ${color.replace('text', 'bg')}/20 ${color} rounded hover:${color.replace('text', 'bg')}/40 transition-colors text-xs font-bold flex items-center gap-1`}
                        >
                            <Icon name="wrench" className="w-3 h-3" />
                            Quick Fix
                        </button>
                    )}
                </div>
            </div>
            {showFix && diagnostic.suggestion && (
                <div className="mt-2 ml-6 p-2 bg-black/20 rounded-md">
                    <p className="text-xs text-gray-400 mb-1 font-bold">Suggested Change:</p>
                    <div className="font-mono text-xs">
                        <div className="flex items-center bg-red-900/30 text-red-300 rounded-t-md px-2 py-1">
                            <span className="w-4">-</span>
                            <pre className="p-0 m-0">{indentation}{originalCode.trim()}</pre>
                        </div>
                        <div className="flex items-center bg-green-900/30 text-green-300 rounded-b-md px-2 py-1">
                            <span className="w-4">+</span>
                             <pre className="p-0 m-0">{indentation}{diagnostic.suggestion.trim()}</pre>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                         <button 
                            onClick={handleAccept}
                            className="px-3 py-1 bg-green-600/50 text-green-300 rounded hover:bg-green-600/70 transition-colors text-xs font-bold"
                        >
                            Accept
                        </button>
                         <button 
                            onClick={() => setShowFix(false)}
                            className="px-3 py-1 bg-gray-600/50 text-gray-300 rounded hover:bg-gray-600/70 transition-colors text-xs"
                        >
                            Reject
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}