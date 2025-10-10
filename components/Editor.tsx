import React, { useEffect, useRef, useMemo, useState, forwardRef, useImperativeHandle } from 'react';
import type { Diagnostic, RefactorAction } from '../types';
import { InlineDiagnostic } from './InlineDiagnostic';
import { Icon } from './Icon';

// This is a browser-only component, so we can safely reference 'window'
declare const hljs: any;

interface EditorProps {
  fileName: string;
  content: string;
  diagnostics: Diagnostic[];
  onChange: (newContent: string) => void;
  onApplyFix: (lineNumber: number, suggestion: string) => void;
  onGenerateCodeFromComment: (comment: string, lineNumber: number) => Promise<void>;
  onRefactorSelection: (selection: { text: string, start: number, end: number }, action: RefactorAction) => void;
}

interface ContextMenuState {
  x: number;
  y: number;
  selection: { text: string; start: number; end: number; };
}

export const Editor = forwardRef((props: EditorProps, ref) => {
  const { fileName, content, diagnostics, onChange, onApplyFix, onGenerateCodeFromComment, onRefactorSelection } = props;
  const codeRef = useRef<HTMLElement>(null);
  const editingRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const [isGenerating, setIsGenerating] = useState<number | null>(null);

  useImperativeHandle(ref, () => ({
    getSelection: () => {
      if (editingRef.current) {
        const { selectionStart, selectionEnd, value } = editingRef.current;
        return value.substring(selectionStart, selectionEnd);
      }
      return '';
    }
  }));

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.innerHTML = content
        .replace(new RegExp("&", "g"), "&amp;")
        .replace(new RegExp("<", "g"), "&lt;");
      hljs.highlightElement(codeRef.current);
    }
  }, [content]);
  
  const syncScroll = () => {
    if(editingRef.current && linesRef.current && gutterRef.current) {
        const top = editingRef.current.scrollTop;
        const left = editingRef.current.scrollLeft;
        linesRef.current.scrollTop = top;
        linesRef.current.scrollLeft = left;
        gutterRef.current.scrollTop = top;
    }
  }

  const handleContextMenu = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    if (editingRef.current) {
        const { selectionStart, selectionEnd, value } = editingRef.current;
        if (selectionStart !== selectionEnd) {
            e.preventDefault();
            setContextMenu({
                x: e.clientX,
                y: e.clientY,
                selection: { text: value.substring(selectionStart, selectionEnd), start: selectionStart, end: selectionEnd }
            });
        }
    }
  }

  const handleGenerateClick = async (comment: string, lineNumber: number) => {
    setIsGenerating(lineNumber);
    await onGenerateCodeFromComment(comment, lineNumber);
    setIsGenerating(null);
  }
  
  const handleRefactorClick = (action: RefactorAction) => {
    if (contextMenu) {
        onRefactorSelection(contextMenu.selection, action);
    }
    setContextMenu(null);
  }
  
  useEffect(() => {
    const handleClickOutside = () => setContextMenu(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const lines = useMemo(() => content.split('\n'), [content]);
  const diagnosticsByLine = useMemo(() => {
    return diagnostics.reduce((acc, d) => {
        (acc[d.line] = acc[d.line] || []).push(d);
        return acc;
    }, {} as Record<number, Diagnostic[]>);
  }, [diagnostics]);

  const language = fileName.split('.').pop() || 'plaintext';
  const isComment = (line: string) => {
    const trimmed = line.trim();
    if (language === 'py') return trimmed.startsWith('#');
    return trimmed.startsWith('//');
  }

  return (
    <div className="flex-1 flex flex-col bg-[#282c34] min-h-0" onClick={() => setContextMenu(null)}>
      {contextMenu && (
        <div 
            className="fixed z-50 bg-[#161b22] border border-gray-700/50 rounded-lg shadow-2xl py-2 w-56 text-sm"
            style={{ top: contextMenu.y, left: contextMenu.x }}
            onClick={e => e.stopPropagation()} // Prevent closing when clicking inside
        >
            <button onClick={() => handleRefactorClick('explain')} className="flex items-center gap-3 px-4 py-2 w-full text-left text-gray-300 hover:bg-cyan-400/10 hover:text-cyan-300"><Icon name="lightbulb" className="w-4 h-4" />Explain Selection</button>
            <button onClick={() => handleRefactorClick('refactor')} className="flex items-center gap-3 px-4 py-2 w-full text-left text-gray-300 hover:bg-cyan-400/10 hover:text-cyan-300"><Icon name="wrench" className="w-4 h-4" />Refactor for Readability</button>
            <button onClick={() => handleRefactorClick('add_comments')} className="flex items-center gap-3 px-4 py-2 w-full text-left text-gray-300 hover:bg-cyan-400/10 hover:text-cyan-300"><Icon name="sparkle" className="w-4 h-4" />Add Comments</button>
            <button onClick={() => handleRefactorClick('find_bugs')} className="flex items-center gap-3 px-4 py-2 w-full text-left text-gray-300 hover:bg-cyan-400/10 hover:text-cyan-300"><Icon name="wrench" className="w-4 h-4" />Find Potential Bugs</button>
        </div>
      )}
      <div className="flex justify-between items-center bg-[#0d1117] border-b border-gray-700/50 h-10 px-4 flex-shrink-0">
        <div className="text-sm text-gray-300">{fileName}</div>
      </div>
      <div className="flex-1 flex overflow-hidden relative font-mono text-sm">
        {/* Gutter */}
        <div ref={gutterRef} className="h-full bg-[#282c34] text-right p-2 select-none overflow-hidden flex-shrink-0">
          {lines.map((line, i) => (
            <div key={i} className="h-[21px] leading-[21px] text-gray-500 flex items-center justify-end gap-2 pr-2">
              <span>{i + 1}</span>
              {isComment(line) && line.trim().length > 3 ? (
                isGenerating === i + 1 ? (
                   <Icon name="sparkle" className="w-4 h-4 text-cyan-400 animate-spin"/>
                ) : (
                  <button title="Generate Code" onClick={() => handleGenerateClick(line, i + 1)}>
                    <Icon name="sparkle" className="w-4 h-4 text-gray-600 hover:text-cyan-400 transition-colors"/>
                  </button>
                )
              ) : <div className="w-4 h-4" /> }
            </div>
          ))}
        </div>

        {/* Editor Content */}
        <div className="flex-1 flex overflow-hidden relative p-2">
          <textarea
            ref={editingRef}
            value={content}
            onChange={(e) => onChange(e.target.value)}
            onScroll={syncScroll}
            onContextMenu={handleContextMenu}
            className="absolute inset-0 w-full h-full p-0 bg-transparent text-transparent caret-white resize-none border-none outline-none overflow-auto z-10 font-mono text-sm leading-[21px]"
            spellCheck="false"
          />
          <div ref={linesRef} className="w-full h-full p-0 text-gray-300 overflow-auto pointer-events-none">
            {lines.map((line, i) => (
                <div key={i} className="h-[21px] leading-[21px] whitespace-pre">
                    <pre className="p-0 m-0"><code ref={i === 0 ? codeRef : null} className={`${language} p-0 m-0`}>{line}</code></pre>
                    {diagnosticsByLine[i+1] && diagnosticsByLine[i+1].map((d, dIndex) => (
                        <InlineDiagnostic key={dIndex} diagnostic={d} originalCode={line} onApplyFix={onApplyFix} />
                    ))}
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
