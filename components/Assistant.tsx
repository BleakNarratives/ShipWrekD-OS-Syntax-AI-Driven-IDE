

import React, { useState, useRef, useEffect } from 'react';
import type { Message, Suggestion, OrchestrationPlan, VocalState } from '../types';
import { Icon, IconName } from './Icon';

// This is a browser-only component, so we can safely reference 'window'
declare const hljs: any;

interface AssistantProps {
  messages: Message[];
  suggestions: Suggestion[];
  onSendMessage: (message: string, image?: Message['image']) => void;
  onApplyCode: (code: string) => void;
  onCreateFile: (filename: string, code: string) => void;
  isLoading: boolean;
  onConsultBaron: (prompt: string) => void;
  hasNewBaronDirective: boolean;
  vocalState: VocalState;
  onToggleListening: () => void;
}

const moduleIcons: Record<string, IconName> = {
    architect: 'cpu',
    forge: 'hammer',
    ghostwriter: 'ghostwriter',
    aegis: 'aegis',
    terminal: 'command'
};

const OrchestrationProgress: React.FC<{ plan: OrchestrationPlan }> = ({ plan }) => {
    return (
        <div className="p-3 my-2 rounded-lg bg-gray-700/40 w-full max-w-sm">
            <div className="flex items-center gap-2 mb-3">
                <Icon name="orchestrate" className="w-5 h-5 text-[var(--color-primary-fg)]" />
                <h4 className="font-bold text-gray-200">Executing Plan...</h4>
            </div>
            <ul className="space-y-2">
                {plan.steps.map(step => (
                    <li key={step.id} className="flex items-start gap-3 text-sm">
                        <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center mt-0.5">
                           {step.status === 'pending' && <div className="w-2 h-2 rounded-full bg-gray-500" title="Pending"></div>}
                           {step.status === 'in_progress' && <Icon name="sparkle" className="w-4 h-4 text-[var(--color-primary-fg)] animate-spin" title="In Progress" />}
                           {step.status === 'completed' && <Icon name="check" className="w-4 h-4 text-green-400" title="Completed" />}
                           {step.status === 'failed' && <Icon name="close" className="w-4 h-4 text-red-400" title="Failed" />}
                        </div>
                        <div className="flex-1">
                            <p className={`font-semibold ${step.status === 'pending' ? 'text-gray-400' : 'text-gray-200'}`}>{step.details}</p>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Icon name={moduleIcons[step.module] || 'file'} className="w-3 h-3" />
                                <span>{step.module}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const ChatMessage: React.FC<{ message: Message; onApplyCode: (code: string) => void; onCreateFile: (filename: string, code: string) => void; }> = ({ message, onApplyCode, onCreateFile }) => {
    const isModel = message.role === 'model';
    const codeRef = useRef<HTMLElement>(null);

    const codeBlockRegex = /```(?:[a-zA-Z]*)?\n([\s\S]*?)\n```/;
    const match = message.content.match(codeBlockRegex);
    const extractedCodeFromExplanation = match ? match[1] : null;

    useEffect(() => {
        if (codeRef.current) {
            hljs.highlightElement(codeRef.current);
        }
    }, [message.code, message.content]);
    
    return (
        <div className={`flex items-start gap-3 my-4 ${isModel ? '' : 'flex-row-reverse'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isModel ? 'bg-amber-500/20' : 'bg-gray-600'}`}>
                <Icon name={isModel ? 'sparkle' : 'user'} className={`w-5 h-5 ${isModel ? 'text-[var(--color-primary-fg)]' : 'text-gray-300'}`} />
            </div>
            <div className={`flex flex-col max-w-full ${isModel ? 'items-start' : 'items-end'}`}>
                 {message.consultation && (
                     <div className="flex items-center gap-2 mb-1 text-xs text-amber-400/80 font-semibold">
                         <Icon name="baron" className="w-4 h-4" />
                         <span>DIRECTIVE FROM THE BARON</span>
                     </div>
                 )}
                 <div className={`p-3 rounded-lg prose prose-invert prose-sm max-w-sm ${isModel ? 'bg-[var(--color-bg-surface)]' : 'bg-blue-600/50 text-blue-100'}`}>
                     <div className="break-words whitespace-pre-wrap" dangerouslySetInnerHTML={{__html: message.content}}></div>
                </div>
                {message.image && (
                    <div className="mt-2 p-1 border border-gray-600 rounded-lg bg-[var(--color-bg-surface)]">
                        <img src={`data:${message.image.mimeType};base64,${message.image.data}`} alt="User upload" className="max-w-xs max-h-48 rounded" />
                    </div>
                )}
            </div>
        </div>
    );
};

// FIX: Added the missing Assistant component to resolve the export error.
export const Assistant: React.FC<AssistantProps> = ({
  messages,
  suggestions,
  onSendMessage,
  onApplyCode,
  onCreateFile,
  isLoading,
  onConsultBaron,
  hasNewBaronDirective,
  vocalState,
  onToggleListening,
}) => {
  const [input, setInput] = useState('');
  const [image, setImage] = useState<Message['image'] | undefined>(undefined);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
            setIsExportMenuOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSend = () => {
    if (input.trim() || image) {
      onSendMessage(input, image);
      setInput('');
      setImage(undefined);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = (event.target?.result as string).split(',')[1];
        if (base64String) {
          setImage({
            mimeType: file.type,
            data: base64String,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
    const formatTranscript = (format: 'txt' | 'md'): string => {
        return messages.map(msg => {
            if (format === 'md') {
                const codeContent = msg.code || (msg.content.match(/```.*\n([\s\S]+)```/) || [])[1];
                let content = msg.content;
                if(codeContent) {
                    content = msg.content.replace(/```.*\n([\s\S]+)```/, `\`\`\`\n${codeContent}\`\`\``)
                }
                return `**${msg.role.toUpperCase()}:**\n\n${content}`;
            }
            // TXT format
            return `${msg.role.toUpperCase()}:\n${msg.content}`;
        }).join('\n\n---\n\n');
    };

    const handleExport = (format: 'copy' | 'txt' | 'md') => {
        setIsExportMenuOpen(false);
        if (format === 'copy') {
            navigator.clipboard.writeText(formatTranscript('txt'));
            return;
        }
        
        const content = formatTranscript(format);
        const blob = new Blob([content], { type: format === 'md' ? 'text/markdown' : 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chat-history.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };


  const vocalButtonClasses: Record<VocalState, string> = {
    idle: 'text-gray-400 hover:text-cyan-400',
    listening: 'text-red-400 animate-pulse',
    speaking: 'text-cyan-400 animate-pulse',
  };

  return (
    <aside className="w-80 bg-[#0d1117] border-l border-gray-700/50 flex flex-col flex-shrink-0">
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-700/50">
        <h2 className="text-xs uppercase text-gray-400 font-bold flex items-center justify-between">
          <span>AI Assistant</span>
        </h2>
        <div className="flex items-center gap-2">
            {hasNewBaronDirective && (
              <button onClick={() => onConsultBaron("Proceed.")} className="relative flex items-center gap-1 text-amber-400/80 hover:text-amber-400 text-xs font-semibold" title="New Directive from The Baron. Click to proceed.">
                <Icon name="baron" className="w-4 h-4" />
                <span>DIRECTIVE</span>
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
              </button>
            )}
             <div className="relative" ref={exportMenuRef}>
                 <button onClick={() => setIsExportMenuOpen(prev => !prev)} className="p-1.5 rounded-full text-gray-400 hover:bg-gray-700 hover:text-cyan-400 transition-colors" title="Export Chat">
                    <Icon name="ellipsis" className="w-5 h-5" />
                 </button>
                 {isExportMenuOpen && (
                     <div className="absolute bottom-full right-0 mb-2 w-48 bg-[#161b22] border border-gray-700/50 rounded-lg shadow-2xl py-1 z-10">
                        <button onClick={() => handleExport('copy')} className="flex items-center gap-3 px-3 py-2 w-full text-left text-sm text-gray-300 hover:bg-cyan-400/10 hover:text-cyan-300">Copy Transcript</button>
                        <button onClick={() => handleExport('txt')} className="flex items-center gap-3 px-3 py-2 w-full text-left text-sm text-gray-300 hover:bg-cyan-400/10 hover:text-cyan-300">Save as .txt</button>
                        <button onClick={() => handleExport('md')} className="flex items-center gap-3 px-3 py-2 w-full text-left text-sm text-gray-300 hover:bg-cyan-400/10 hover:text-cyan-300">Save as .md</button>
                     </div>
                 )}
            </div>
        </div>
      </div>
      <div className="flex-1 p-2 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index}>
            <ChatMessage message={msg} onApplyCode={onApplyCode} onCreateFile={onCreateFile} />
            {msg.responseType === 'orchestration' && msg.orchestrationPlan && (
              <OrchestrationProgress plan={msg.orchestrationPlan} />
            )}
            {msg.responseType === 'code_generation' && msg.filename && msg.code && (
              <div className="p-3 my-2 rounded-lg bg-gray-700/40 w-full max-w-sm">
                <p className="text-sm font-semibold text-gray-300 mb-2">Generated File: <code className="font-mono text-cyan-400">{msg.filename}</code></p>
                <div className="max-h-48 overflow-y-auto bg-black/30 rounded">
                    <pre><code className="text-xs">{msg.code}</code></pre>
                </div>
                <button
                  onClick={() => onCreateFile(msg.filename!, msg.code!)}
                  className="w-full mt-2 px-3 py-1.5 bg-cyan-600/50 text-cyan-300 rounded hover:bg-cyan-600/70 transition-colors text-xs font-bold"
                >
                  Create File
                </button>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3 my-4">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <Icon name="sparkle" className="w-5 h-5 text-[var(--color-primary-fg)] animate-spin" />
            </div>
            <div className="p-3 rounded-lg bg-[var(--color-bg-surface)] text-sm text-gray-400">
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-2 border-t border-gray-700/50">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question or give a command..."
            className="w-full bg-[#161b22] border border-gray-600 rounded-lg p-3 pr-24 text-sm focus:outline-none focus:border-cyan-500 resize-none h-24"
            disabled={isLoading}
          />
          <div className="absolute bottom-2 right-2 flex items-center gap-1">
             <button onClick={() => fileInputRef.current?.click()} className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-cyan-400 transition-colors" title="Attach Image">
                <Icon name="image" className="w-5 h-5" />
             </button>
             <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
             <button onClick={onToggleListening} className={`p-2 rounded-full transition-colors ${vocalButtonClasses[vocalState]}`} title="Vocal Input">
                <Icon name="microphone" className="w-5 h-5" />
             </button>
            <button
              onClick={handleSend}
              disabled={isLoading || (!input.trim() && !image)}
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-bold flex items-center gap-2"
            >
              <Icon name="send" className="w-4 h-4" />
            </button>
          </div>
        </div>
        {image && (
          <div className="mt-2 text-xs text-gray-400 flex items-center gap-2">
            <Icon name="image" className="w-4 h-4 text-cyan-400" />
            <span>Image attached.</span>
            <button onClick={() => { setImage(undefined); if(fileInputRef.current) fileInputRef.current.value = ''; }} className="text-red-400 hover:underline">[remove]</button>
          </div>
        )}
      </div>
    </aside>
  );
};