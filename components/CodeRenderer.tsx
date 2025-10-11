import React, { useState, useRef, useEffect } from 'react';
import type { Diagnostic } from '../types';
import { InlineDiagnostic } from './InlineDiagnostic';
import { Icon, IconName } from './Icon';

declare const hljs: any;

interface CodeRendererProps {
  code: string;
  language: string;
  diagnostics: Diagnostic[];
  onApplyFix: (lineNumber: number, suggestion: string) => void;
  onCodeChange: (newCode: string) => void;
}

const severityMap: Record<Diagnostic['severity'], { icon: IconName, color: string }> = {
    'error': { icon: 'close', color: 'text-red-400' },
    'warning': { icon: 'bell', color: 'text-yellow-400' },
    'info': { icon: 'lightbulb', color: 'text-cyan-400' },
};


export const CodeRenderer: React.FC<CodeRendererProps> = ({ code, language, diagnostics, onApplyFix, onCodeChange }) => {
  const [activePopoverLine, setActivePopoverLine] = useState<number | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const lines = code.split('\n');
  const diagnosticsByLine: Record<number, Diagnostic[]> = {};
  diagnostics.forEach(d => {
    if (!diagnosticsByLine[d.line]) diagnosticsByLine[d.line] = [];
    diagnosticsByLine[d.line].push(d);
  });
  
  const handleScroll = () => {
    if (gutterRef.current && textareaRef.current) {
        gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
            setActivePopoverLine(null);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
    
  const getPopoverStyle = (): React.CSSProperties => {
      if (!activePopoverLine || !textareaRef.current) return { display: 'none' };
      const lineHeight = 24; // Corresponds to leading-6
      const paddingTop = 16; // Corresponds to p-4
      const popoverTop = (activePopoverLine - 1) * lineHeight + paddingTop - textareaRef.current.scrollTop;
      return {
          top: `${popoverTop}px`,
      };
  };

  return (
    <div className="relative w-full h-full flex font-mono text-sm leading-6 bg-[var(--color-bg-base)]">
      {/* Gutter */}
      <div 
        ref={gutterRef} 
        className="p-4 text-right text-gray-500 select-none bg-[var(--color-bg-base)] border-r border-[var(--color-border-subtle)] overflow-hidden"
      >
        {lines.map((_, index) => {
          const lineNumber = index + 1;
          const lineDiagnostics = diagnosticsByLine[lineNumber];
          const primaryDiagnostic = lineDiagnostics?.[0];
          const severity = primaryDiagnostic?.severity || 'info';
          const { icon, color } = severityMap[severity];

          return (
            <div key={lineNumber} className="relative h-6">
              {primaryDiagnostic ? (
                <button 
                  onClick={() => setActivePopoverLine(l => l === lineNumber ? null : lineNumber)} 
                  className={`absolute left-0 top-1/2 -translate-y-1/2 ${color}`}
                >
                  <Icon name={icon} className="w-4 h-4" />
                </button>
              ) : null}
              {lineNumber}
            </div>
          );
        })}
      </div>

      {/* Textarea for Editing */}
      <textarea
        ref={textareaRef}
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        onScroll={handleScroll}
        spellCheck="false"
        className="flex-1 p-4 bg-transparent text-gray-300 resize-none outline-none"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
      />
      
      {/* Popover */}
      {activePopoverLine && diagnosticsByLine[activePopoverLine] && (
         <div ref={popoverRef} className="diagnostic-popover" style={getPopoverStyle()}>
             <div className="diagnostic-popover-header">
                <h3 className="diagnostic-popover-title">Synt Suggestions ({diagnosticsByLine[activePopoverLine].length})</h3>
                 <button onClick={() => setActivePopoverLine(null)} className="diagnostic-popover-close">
                     <Icon name="close" className="w-4 h-4 text-gray-400" />
                 </button>
             </div>
             {diagnosticsByLine[activePopoverLine].map((diag, i) => (
                <InlineDiagnostic
                    key={i}
                    diagnostic={diag}
                    originalCode={lines[activePopoverLine - 1]}
                    onApplyFix={(...args) => { onApplyFix(...args); setActivePopoverLine(null); }}
                />
             ))}
         </div>
     )}
    </div>
  );
};