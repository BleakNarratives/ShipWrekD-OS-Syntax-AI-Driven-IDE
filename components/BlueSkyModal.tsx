import React, { useState } from 'react';
import { Icon } from './Icon';

// This is a browser-only component, so we can safely reference 'window'
declare const marked: any;

interface BlueSkyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (prompt: string) => Promise<string>;
}

export const BlueSkyModal: React.FC<BlueSkyModalProps> = ({ isOpen, onClose, onGenerate }) => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    setResult('');
    try {
        const response = await onGenerate(prompt);
        setResult(response);
    } catch (error) {
        console.error("Blue Sky generation error:", error);
        setResult("My apologies, I couldn't generate ideas. Please check the console for details.");
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleClose = () => {
    setPrompt('');
    setResult('');
    setIsLoading(false);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center" onClick={handleClose}>
      <div
        className="relative bg-[#161b22] border border-gray-700/50 rounded-lg shadow-2xl w-full max-w-3xl flex flex-col max-h-[80vh] h-[700px]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700/50 flex-shrink-0">
          <div className="flex items-center gap-3">
            <Icon name="users" className="w-6 h-6 text-blue-300" />
            <h2 className="text-lg font-bold text-gray-200">Blue Sky Brainstorming Session</h2>
          </div>
          <button onClick={handleClose} className="p-1 rounded-full hover:bg-gray-700">
            <Icon name="close" className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto">
            {isLoading && (
                <div className="flex justify-center items-center h-full">
                    <div className="flex flex-col items-center gap-4">
                        <Icon name="sparkle" className="w-12 h-12 text-blue-400 animate-pulse" />
                        <p className="text-gray-400">Generating ideas...</p>
                    </div>
                </div>
            )}
            {!isLoading && !result && (
                <div className="text-center text-gray-400 pt-16">
                    <Icon name="lightbulb" className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-300">What's on your mind?</h3>
                    <p className="mt-2">Describe a problem, a feature, or a concept, and I'll generate ideas to get you started.</p>
                </div>
            )}
            {result && (
                <div 
                    className="prose prose-invert prose-sm md:prose-base max-w-full" 
                    dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, '<br />') }} // Simple markdown-like rendering
                />
            )}
        </div>

        <div className="p-4 border-t border-gray-700/50 flex-shrink-0">
          <div className="flex items-start gap-3">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') handleSubmit(); }}
              placeholder="e.g., Ideas for a new user authentication flow that uses passkeys..."
              className="flex-1 bg-[#0d1117] border border-gray-600 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500 resize-none h-24"
              disabled={isLoading}
            />
            <button
              onClick={handleSubmit}
              disabled={isLoading || !prompt.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-bold flex items-center gap-2"
            >
              <Icon name="sparkle" className="w-5 h-5" />
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
