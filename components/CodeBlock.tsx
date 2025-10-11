import React, { useRef, useEffect } from 'react';
import { Icon } from './Icon';
import { getLanguageFromFilename } from '../utils/language';

declare const hljs: any;

interface CodeBlockProps {
  code: string;
  filename?: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, filename, language }) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.textContent = code;
      hljs.highlightElement(codeRef.current);
    }
  }, [code]);
  
  const getLanguage = () => {
      if (language) return language;
      if (filename) return getLanguageFromFilename(filename);
      return 'plaintext';
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'snippet.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-black/30 rounded-lg border border-gray-700/50">
      <div className="flex items-center justify-between px-3 py-1.5 bg-gray-700/40 border-b border-gray-700/50 text-xs">
        <span className="font-mono text-cyan-400">{filename || getLanguage()}</span>
        <div className="flex items-center gap-2">
          <button onClick={handleCopy} title="Copy code" className="p-1 text-gray-400 hover:text-white transition-colors">
            <Icon name="copy" className="w-4 h-4" />
          </button>
          {filename && (
            <button onClick={handleDownload} title="Download file" className="p-1 text-gray-400 hover:text-white transition-colors">
              <Icon name="download" className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      <div className="max-h-60 overflow-y-auto">
        <pre className="p-0 m-0"><code ref={codeRef} className={`language-${getLanguage()} p-3 text-xs`}>{/* Code is set via ref */}</code></pre>
      </div>
    </div>
  );
};