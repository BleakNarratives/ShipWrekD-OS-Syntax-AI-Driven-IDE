import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../App';
import { CodeRenderer } from './CodeRenderer';
import { CodeSkeletonLoader } from './CodeSkeletonLoader';

export const Editor: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return null;
  
  const { 
    activeFileContent, 
    activeFileNode, 
    isLoadingFile, 
    diagnostics, 
    handleApplyFix, 
    handleCodeChange
  } = context;

  const language = activeFileNode ? (activeFileNode.name.split('.').pop() || 'plaintext') : 'plaintext';

  return (
    <main className="flex-1 flex flex-col bg-[var(--color-bg-base)] overflow-hidden relative">
      <AnimatePresence mode="wait">
        {isLoadingFile ? (
          <motion.div
            key="loader"
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CodeSkeletonLoader />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            className="absolute inset-0 overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CodeRenderer
              code={activeFileContent}
              language={language}
              diagnostics={diagnostics}
              onApplyFix={handleApplyFix}
              onCodeChange={handleCodeChange}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};