
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
                 {isModel && message.responseType === 'orchestration' && message.orchestrationPlan && (
                    <OrchestrationProgress plan={message.orchestrationPlan} />
                )}
                {isModel && message.responseType === 'code_generation' && message.filename && message.code && (
                     <div className="mt-2 w-full max-w-sm">
                        <div className="bg-[#282c34] rounded-md overflow-hidden border border-gray-700">
                            <pre className="p-2 text-xs max-h-48 overflow-auto"><code ref={codeRef} className="language-tsx">{message.code}</code></pre>
                        </div>
                        <button 
                            onClick={() => onCreateFile(message.filename!, message.code!)}
                            className="mt-2 px-3 py-1 bg-green-600/50 text-green-300 rounded hover:bg-green-600/70 transition-colors text-xs flex items-center gap-2"
                        >
                            <Icon name="addFile" className="w-4 h-4" />
                            Create file: {message.filename}
                        </button>
                    </div>
                )}
                {isModel && message.responseType === 'explanation' && extractedCodeFromExplanation && (
                     <button 
                        onClick={() => onApplyCode(extractedCodeFromExplanation)}
                        className="mt-2 px-3 py-1 bg-green-600/50 text-green-300 rounded hover:bg-green-600/70 transition-colors text-xs flex items-center gap-2"
                    >
                        <Icon name="check" className="w-4 h-4" />
                        Apply to Editor
                    </button>
                )}
            </div>
        </div>
    );
};

export const Assistant: React.FC<AssistantProps> = ({ messages, suggestions, onSendMessage, onApplyCode, onCreateFile, isLoading, onConsultBaron, hasNewBaronDirective, vocalState, onToggleListening }) => {
  const [input, setInput] = useState('');
  const [attachedImage, setAttachedImage] = useState<Message['image'] | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(input.trim() || attachedImage){
      onSendMessage(input, attachedImage || undefined);
      setInput('');
      setAttachedImage(null);
    }
  };

  const handleConsult = () => {
    if (input.trim()) {
        onConsultBaron(input);
        setInput('');
        setAttachedImage(null);
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setAttachedImage({ mimeType: file.type, data: base64String });
      };
      reader.readAsDataURL(file);
    }
  };
  
  // FIX: Explicitly type the return value of this function to ensure the `icon` property
  // is inferred as the specific `IconName` type, not the general `string` type.
  const getVocalButtonUI = (): { icon: IconName; color: string; title: string; } => {
      switch(vocalState) {
          case 'listening':
              return { icon: 'sparkle', color: 'text-red-500 animate-pulse', title: 'Listening... (Click to Stop)' };
          case 'speaking':
              return { icon: 'close', color: 'text-amber-500', title: 'Speaking... (Click to Interrupt - TBD)' };
          default:
              return { icon: 'microphone', color: 'text-gray-400 hover:text-[var(--color-primary-fg)]', title: 'Use Microphone' };
      }
  };

  const vocalButtonUI = getVocalButtonUI();

  return (
    <aside className="w-96 bg-[var(--color-bg-base)] border-l border-[var(--color-border-base)] flex flex-col">
      <div className="h-12 flex items-center px-4 border-b border-[var(--color-border-base)] flex-shrink-0">
        <h2 className="text-sm font-bold uppercase text-gray-400">AI Assistant</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} onApplyCode={onApplyCode} onCreateFile={onCreateFile} />
        ))}
        {isLoading && (
           <div className="flex items-start gap-3 my-4">
             <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-amber-500/20">
                <Icon name="sparkle" className="w-5 h-5 text-[var(--color-primary-fg)] animate-pulse" />
             </div>
             <div className="p-3 rounded-lg bg-[var(--color-bg-surface)]">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[var(--color-primary-fg)] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-[var(--color-primary-fg)] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-[var(--color-primary-fg)] rounded-full animate-bounce"></div>
                </div>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {suggestions.length > 0 && !isLoading && (
        <div className="p-2 border-t border-[var(--color-border-base)]">
            <h3 className="text-xs font-bold uppercase text-gray-500 px-2 mb-2">Suggestions</h3>
            <div className="space-y-2">
                {suggestions.map(suggestion => (
                    <button 
                        key={suggestion.id}
                        onClick={() => setInput(suggestion.text)}
                        className="w-full text-left flex items-center gap-2 p-2 bg-gray-700/30 text-gray-300 rounded hover:bg-gray-700/50 transition-colors text-xs"
                    >
                        <Icon name={suggestion.icon} className="w-4 h-4 text-[var(--color-primary-fg)] flex-shrink-0" />
                        <span>{suggestion.text}</span>
                    </button>
                ))}
            </div>
        </div>
      )}

      <div className="p-2 border-t border-[var(--color-border-base)]">
        <div className="bg-[var(--color-bg-surface)] rounded-md border border-gray-600 focus-within:border-[var(--color-primary-border)]">
            {attachedImage && (
                <div className="p-2 relative">
                    <img src={`data:${attachedImage.mimeType};base64,${attachedImage.data}`} alt="Attachment" className="max-h-24 rounded" />
                    <button onClick={() => setAttachedImage(null)} className="absolute top-1 right-1 p-0.5 bg-black/50 rounded-full text-white hover:bg-black/80">
                        <Icon name="close" className="w-3 h-3" />
                    </button>
                </div>
            )}
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask to create a component..."
                className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none"
                disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || (!input.trim() && !attachedImage)} className="p-2 rounded-md text-gray-400 hover:text-[var(--color-primary-fg)] disabled:text-gray-600 disabled:cursor-not-allowed">
                <Icon name="send" className="w-5 h-5" />
            </button>
            </form>
        </div>
        <div className="flex items-center gap-1 mt-2">
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden"/>
            <button onClick={() => fileInputRef.current?.click()} className="p-2 rounded text-gray-400 hover:text-[var(--color-primary-fg)]" title="Attach Image"><Icon name="image" className="w-5 h-5" /></button>
            <button className="p-2 rounded text-gray-400 hover:text-[var(--color-primary-fg)]" title="Upload File"><Icon name="upload" className="w-5 h-5" /></button>
            <button onClick={onToggleListening} className={`p-2 rounded ${vocalButtonUI.color}`} title={vocalButtonUI.title}><Icon name={vocalButtonUI.icon} className="w-5 h-5" /></button>
            <button onClick={handleConsult} disabled={isLoading || !input.trim()} className="p-2 rounded text-gray-400 hover:text-amber-400 disabled:text-gray-600 disabled:cursor-not-allowed ml-auto relative" title="Consult the Baron">
                <Icon name="baron" className="w-5 h-5" />
                {hasNewBaronDirective && <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-[var(--color-bg-base)]" />}
            </button>
        </div>
      </div>
    </aside>
  );
};
