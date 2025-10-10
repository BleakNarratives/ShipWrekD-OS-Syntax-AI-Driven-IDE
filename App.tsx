import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { Header } from './components/Header';
import { ExplorerPanel } from './components/ExplorerPanel';
import { Editor } from './components/Editor';
import { Assistant } from './components/Assistant';
import { Terminal } from './components/Terminal';
import { StatusBar } from './components/StatusBar';
import { BlueSkyModal } from './components/BlueSkyModal';
import { CommandPalette } from './components/CommandPalette';
import { ActivityBar } from './components/ActivityBar';
import { KernelPanel } from './components/KernelPanel';
import { SourceControlPanel } from './components/SourceControlPanel';
import { PackagesPanel } from './components/PackagesPanel';
import { GhostwriterPanel } from './components/GhostwriterPanel';
import { ChangelogPanel } from './components/ChangelogPanel';
import { IntelPanel } from './components/IntelPanel';
import { ArchitectPanel } from './components/ArchitectPanel';
import { ForgePanel } from './components/ForgePanel';
import { AegisPanel } from './components/AegisPanel';
import { CognitiveCorePanel } from './components/CognitiveCorePanel';
import { ModMindPanel } from './components/ModMindPanel';
import { SymbiotePanel } from './components/SymbiotePanel';
import { DebuggerPanel } from './components/DebuggerPanel';
import { ThemePanel } from './components/ThemePanel';
import type { Message, FileTreeNode, Command, KernelModule, PythonPackage, Suggestion, Diagnostic, RefactorAction, LearnedPattern, PerformanceInsight, SecurityVulnerability, BuildManifest, ProjectTemplate, AegisStatus, ThreatLog, MonitoredComponent, CognitiveCoreState, CognitiveEngineTier, EthicalGovernorMode, OrchestrationPlan, ModMindState, SymbioteState, DebugState, VocalState, ThemeName } from './types';
import { FILE_TREE, FILE_CONTENTS, PROJECT_TEMPLATES, MONITORED_COMPONENTS, COGNITIVE_CORE_STATE, MODMIND_STATE, SYMBIOTE_STATE, DEBUG_STATE, THEMES } from './constants';
import { getAIResponse, getAIContextualSuggestions, getAIDiagnostics, getAIGeneratedCode, getAIRefactoring, getAIBlueSkyIdeas, getAILearnedPatterns, getAIGhostwrittenCode, getAIIntelAnalysis, getAIBuildPlan, runAegisAnalysis, getAIOrchestrationPlan, getBaronialConsultation } from './services/geminiService';

// Browser-specific speech recognition setup
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
let recognition: any;
if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
}

/**
 * A robust, recursive deep-clone function to safely clone state objects.
 */
function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (Array.isArray(obj)) {
    const arrCopy: any[] = [];
    for (const item of obj) {
      arrCopy.push(deepClone(item));
    }
    return arrCopy as T;
  }
  const objCopy = {} as { [key: string]: any };
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      objCopy[key] = deepClone((obj as any)[key]);
    }
  }
  return objCopy as T;
}

const App: React.FC = () => {
  const [files, setFiles] = useState<FileTreeNode[]>(FILE_TREE);
  const [fileContents, setFileContents] = useState<Map<string, string>>(new Map(FILE_CONTENTS));
  const [selectedFileId, setSelectedFileId] = useState<string>('5');
  const [activeEditorContent, setActiveEditorContent] = useState<string>(fileContents.get('5') || '');
  const [assistantMessages, setAssistantMessages] = useState<Message[]>([
      { role: 'model', content: "I am ShipWrekD's AI core. I now provide proactive suggestions and inline diagnostics. My terminal is interactive. Press Ctrl+P to access all commands.", responseType: 'explanation' }
  ]);
  const [terminalOutput, setTerminalOutput] = useState<string[]>(['Welcome to ShipWrekD OS Interactive Terminal.', 'Type `help` for a list of commands.']);
  const [isLoading, setIsLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<Suggestion[]>([]);
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
  
  const [isBlueSkyModalOpen, setIsBlueSkyModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSidebarPanelVisible, setIsSidebarPanelVisible] = useState(true);
  const [isTerminalVisible, setIsTerminalVisible] = useState(true);
  const [isAssistantVisible, setIsAssistantVisible] = useState(true);

  const [activePanel, setActivePanel] = useState('explorer');
  const [theme, setTheme] = useState<ThemeName>('canary');
  const [kernelModules, setKernelModules] = useState<KernelModule[]>([
    { id: 'git', name: 'Professional VCS (Git)', description: 'Activate industry-standard source control. Track changes, manage branches, and commit your work.', icon: 'git', activated: false },
    { id: 'nat', name: 'Natural Language VCS (Nat)', description: 'Manage versions using simple, everyday language. Ideal for users new to source control.', icon: 'magic', activated: false },
    { id: 'python', name: 'Python Environment', description: 'Activate the Python development substrate, including a high-velocity package manager.', icon: 'python', activated: false },
  ]);
  const [pythonPackages, setPythonPackages] = useState<PythonPackage[]>([
      { name: 'flask', version: '3.0.3', description: 'A lightweight WSGI web application framework.'}
  ]);
  
  const [ghostwriterStatus, setGhostwriterStatus] = useState<'uncalibrated' | 'calibrating' | 'calibrated'>('uncalibrated');
  const [learnedPatterns, setLearnedPatterns] = useState<LearnedPattern[]>([]);
  const [performanceInsights, setPerformanceInsights] = useState<PerformanceInsight[]>([]);
  const [securityVulnerabilities, setSecurityVulnerabilities] = useState<SecurityVulnerability[]>([]);
  const [buildManifest, setBuildManifest] = useState<BuildManifest | null>(null);
  const [isArchitectLoading, setIsArchitectLoading] = useState(false);
  const [aegisStatus, setAegisStatus] = useState<AegisStatus>('secure');
  const [threatLogs, setThreatLogs] = useState<ThreatLog[]>([]);
  const [monitoredComponents, setMonitoredComponents] = useState<MonitoredComponent[]>(MONITORED_COMPONENTS);
  const [cognitiveCoreState, setCognitiveCoreState] = useState<CognitiveCoreState>(COGNITIVE_CORE_STATE);
  const [orchestrationPlan, setOrchestrationPlan] = useState<OrchestrationPlan | null>(null);
  const [currentOrchestrationStep, setCurrentOrchestrationStep] = useState(-1);
  const [modMindState, setModMindState] = useState<ModMindState>(MODMIND_STATE);
  const [symbioteState, setSymbioteState] = useState<SymbioteState>(SYMBIOTE_STATE);
  const [debugState, setDebugState] = useState<DebugState>(DEBUG_STATE);
  
  const [lastBaronResponse, setLastBaronResponse] = useState<string>(
    `I call it the **Cognitive Symbiote**. This is not a mere "scanner." It is a high-bandwidth interface that monitors the developer's physiological and neurological state... The data collected will not be sold. It will be contributed to the "Developer Genome Project,"... I have created the Symbiote panel, accessible via the new bio-circuit icon. I will now provide the code for the new components/SymbiotePanel.tsx file.`
  );
  const [hasNewBaronDirective, setHasNewBaronDirective] = useState(true); // Start with a notification

  // Vocal Symbiosis State
  const [vocalState, setVocalState] = useState<VocalState>('idle');
  const vocalInputRef = useRef('');

  const suggestionTimeoutRef = useRef<number | null>(null);
  const diagnosticTimeoutRef = useRef<number | null>(null);
  const intelTimeoutRef = useRef<number | null>(null);

  // Apply theme changes dynamically
  useEffect(() => {
    const selectedTheme = THEMES[theme];
    const root = document.documentElement;
    if (selectedTheme) {
      Object.entries(selectedTheme.palette).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    }
  }, [theme]);

  const findFile = (nodes: FileTreeNode[], id: string): FileTreeNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findFile(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const findFileByName = (nodes: FileTreeNode[], name: string): FileTreeNode | null => {
    for (const node of nodes) {
        if(node.name.toLowerCase() === name.toLowerCase()) return node;
        if(node.children){
            const found = findFileByName(node.children, name);
            if(found) return found;
        }
    }
    return null;
  }

  const getFilePath = (nodes: FileTreeNode[], id: string, path: string = ''): string => {
    for (const node of nodes) {
        const currentPath = path ? `${path} / ${node.name}` : node.name;
        if (node.id === id) return currentPath;
        if (node.children) {
            const foundPath = getFilePath(node.children, id, currentPath);
            if (foundPath) return foundPath;
        }
    }
    return '';
  };

  const selectedFile = findFile(files, selectedFileId);
  const selectedFilePath = getFilePath(files, selectedFileId);

  const handleFileSelect = useCallback((id: string) => {
    const content = fileContents.get(id) || '';
    setSelectedFileId(id);
    setActiveEditorContent(content);
    setActivePanel('explorer');
  }, [fileContents]);

  const handleEditorChange = useCallback((newContent: string) => {
    setActiveEditorContent(newContent);
    setFileContents(prev => new Map(prev).set(selectedFileId, newContent));
  }, [selectedFileId]);
  
  const handleApplyFix = useCallback((lineNumber: number, suggestion: string) => {
    const lines = activeEditorContent.split('\n');
    const lineIndex = lineNumber - 1;
    if (lineIndex >= 0 && lineIndex < lines.length) {
        const originalLine = lines[lineIndex];
        const indentation = originalLine.match(/^\s*/)?.[0] || '';
        lines[lineIndex] = indentation + suggestion.trim();
        const newContent = lines.join('\n');
        handleEditorChange(newContent);
    }
  }, [activeEditorContent, handleEditorChange]);

  const handleCreateFile = useCallback((filename: string, content: string) => {
    const newFileId = String(Date.now());
    const newFile: FileTreeNode = { id: newFileId, name: filename, type: 'file' };

    setFiles(currentFiles => {
        const newFiles = deepClone(currentFiles);
        const componentsFolder = newFiles.find((n: any) => n.id === '1')?.children?.find((n: any) => n.id === '4');
        if (componentsFolder && componentsFolder.children) {
          componentsFolder.children.push(newFile);
        } else {
          newFiles[0].children.push(newFile);
        }
        return newFiles;
    });

    setFileContents(prev => new Map(prev).set(newFileId, content));
    handleFileSelect(newFileId);
  }, [handleFileSelect]);
  
  const speakText = useCallback((text: string, isConsultation: boolean = false) => {
    if ('speechSynthesis' in window) {
      setVocalState('speaking');
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Select a more "authoritative" voice for the Baron
      const voices = window.speechSynthesis.getVoices();
      if (isConsultation) {
        const baronVoice = voices.find(v => v.name.includes('Google UK English Male')) || voices.find(v => v.name.includes('David')) || voices.find(v => v.lang === 'en-GB' && v.name.includes('Male'));
        if (baronVoice) {
            utterance.voice = baronVoice;
            utterance.pitch = 0.8;
            utterance.rate = 0.9;
        }
      }

      utterance.onend = () => setVocalState('idle');
      utterance.onerror = () => setVocalState('idle'); // Handle errors
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const handleSendMessage = useCallback(async (messageContent: string, image?: Message['image']) => {
    if (!messageContent.trim() && !image || isLoading) return;
  
    const userMessage: Message = { role: 'user', content: messageContent, image };
    const currentMessages = [...assistantMessages, userMessage];
    setAssistantMessages(currentMessages);
    
    setIsLoading(true);
    setAiSuggestions([]);
    setOrchestrationPlan(null);
    setCurrentOrchestrationStep(-1);
  
    try {
      const aiResponse = await getAIResponse(userMessage, activeEditorContent, currentMessages);
      let modelMessage: Message;
  
      if (aiResponse.responseType === 'orchestration' && aiResponse.orchestrationPlan) {
        modelMessage = { role: 'model', content: `I have understood your directive. Here is the execution plan:`, responseType: 'orchestration', orchestrationPlan: aiResponse.orchestrationPlan, };
        setOrchestrationPlan(aiResponse.orchestrationPlan);
        setCurrentOrchestrationStep(0);
      } else if (aiResponse.responseType === 'code_generation' && aiResponse.filename && aiResponse.code) {
        modelMessage = { role: 'model', content: `I've drafted a new file \`${aiResponse.filename}\`. You can review the code and create the file directly.`, responseType: 'code_generation', filename: aiResponse.filename, code: aiResponse.code, };
      } else {
        modelMessage = { role: 'model', content: aiResponse.explanation || "My apologies, I couldn't generate a valid response.", responseType: 'explanation', };
      }
      setAssistantMessages(prev => [...prev, modelMessage]);
      speakText(modelMessage.content);
    } catch (error) {
      console.error('Gemini API error:', error);
      const errorMessageContent = error instanceof Error ? error.message : "My apologies, I seem to be malfunctioning. Check the console for details.";
      const errorMessage: Message = { role: 'model', content: errorMessageContent, responseType: 'explanation' };
      setAssistantMessages(prev => [...prev, errorMessage]);
      speakText(errorMessageContent);
    } finally {
      if (!orchestrationPlan) {
        setIsLoading(false);
      }
    }
  }, [activeEditorContent, isLoading, assistantMessages, orchestrationPlan, speakText]);
  
  const handleConsultBaron = useCallback(async (userPrompt: string) => {
    if (!userPrompt.trim() || isLoading) return;
    setHasNewBaronDirective(false);
    const userMessage: Message = { role: 'user', content: userPrompt };
    setAssistantMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setAiSuggestions([]);
    try {
        const { filename, code } = await getBaronialConsultation(lastBaronResponse, userPrompt);
        const modelMessage: Message = { role: 'model', content: `The Baron's directive is clear. I will now create the \`${filename}\` file as per his specifications.`, responseType: 'code_generation', filename: filename, code: code, consultation: true };
        setAssistantMessages(prev => [...prev, modelMessage]);
        speakText(modelMessage.content, true); // Use Baron's voice
    } catch (error) {
        console.error('Baronial Consultation error:', error);
        const errorMessageContent = error instanceof Error ? error.message : "The Baron is unavailable. Check the console.";
        const errorMessage: Message = { role: 'model', content: errorMessageContent, responseType: 'explanation' };
        setAssistantMessages(prev => [...prev, errorMessage]);
        speakText(errorMessageContent);
    } finally {
        setIsLoading(false);
    }
  }, [isLoading, lastBaronResponse, speakText]);

  const handleToggleListening = useCallback(() => {
    if (!SpeechRecognition) {
        alert("Speech recognition is not supported in this browser.");
        return;
    }
    if (vocalState === 'listening') {
        recognition.stop();
        setVocalState('idle');
    } else {
        setVocalState('listening');
        recognition.start();
    }
  }, [vocalState]);

  useEffect(() => {
    if (!recognition) return;
    recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        vocalInputRef.current = transcript;
    };
    recognition.onend = () => {
        setVocalState('idle');
        if (vocalInputRef.current) {
            handleSendMessage(vocalInputRef.current);
            vocalInputRef.current = '';
        }
    };
    recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setVocalState('idle');
    };
  }, [handleSendMessage]);


  const handleRunCode = useCallback(() => { /* ... */ }, [selectedFile]);
  const handleAskAI = useCallback(() => { /* ... */ }, [handleSendMessage]);
  const handleTerminalCommand = useCallback((command: string) => { /* ... */ }, [files, fileContents]);
  const handleActivateModule = useCallback((moduleId: string) => { /* ... */ }, []);
  const handleInstallPackage = useCallback((packageName: string) => { /* ... */ }, [handleTerminalCommand]);
  const handleGenerateCodeFromComment = useCallback(async (comment: string, lineNumber: number) => { /* ... */ }, [activeEditorContent, selectedFile, handleEditorChange]);
  const handleRefactorSelection = useCallback(async (selection: { text: string, start: number, end: number }, action: RefactorAction) => { /* ... */ }, [activeEditorContent, selectedFile, handleEditorChange]);
  const handleBlueSkyGenerate = useCallback(async (prompt: string): Promise<string> => getAIBlueSkyIdeas(prompt), []);
  const buildProjectContext = useCallback((): string => { /* ... */ return ''; }, [files, fileContents]);
  const handleCalibrateAI = useCallback(async () => { /* ... */ }, [buildProjectContext]);
  const handleGhostwriteComponent = useCallback(async (prompt: string) => { /* ... */ }, [buildProjectContext, handleCreateFile]);
  
  const handleGenerateBuildPlan = useCallback(async (prompt: string) => {
    if (!prompt.trim()) return;
    setIsArchitectLoading(true);
    setBuildManifest(null);
    try {
        const manifest = await getAIBuildPlan(prompt);
        setBuildManifest(manifest);
    } catch (error) {
        console.error("Failed to generate build plan:", error);
        const errorMessage: Message = { role: 'model', content: `Apologies, the System Architect failed to generate a plan. Details: ${error instanceof Error ? error.message : 'Unknown error'}.`, responseType: 'explanation' };
        setAssistantMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsArchitectLoading(false);
    }
  }, []);
  
  const handleForgeProject = useCallback((template: ProjectTemplate, projectName: string) => { /* ... */ }, [fileContents, handleFileSelect]);
  const handleRunAegisScan = useCallback(async () => { /* ... */ }, []);
  const handleIsolateComponent = useCallback((componentId: string) => { /* ... */ }, []);
  const handleCognitiveEngineChange = useCallback((tier: CognitiveEngineTier) => {
    setCognitiveCoreState(prev => ({ ...prev, engineTier: tier }));
  }, []);
  const handleEthicalGovernorChange = useCallback((mode: EthicalGovernorMode) => {
    setCognitiveCoreState(prev => ({ ...prev, governorMode: mode }));
  }, []);
  const handleStrategyToggle = useCallback((strategyId: string) => { /* ... */ }, []);
  const handleToggleDataTrust = useCallback(() => { /* ... */ }, []);
  const handleThemeChange = useCallback((themeName: ThemeName) => {
    setTheme(themeName);
  }, []);

  useEffect(() => { /* Orchestrator Execution Effect */ }, [currentOrchestrationStep, orchestrationPlan]);
  const commands: Command[] = useMemo(() => { /* ... */ return []; }, [files, handleFileSelect, handleRunCode, handleAskAI, handleCalibrateAI, handleRunAegisScan]);
  useEffect(() => { /* Keydown listener for Command Palette */ }, []);
  useEffect(() => { /* Proactive AI Suggestions & Diagnostics */ }, [selectedFileId, activeEditorContent, handleSendMessage]);

  const renderSidebarPanel = () => {
    const gitModule = kernelModules.find(m => m.id === 'git');
    const natModule = kernelModules.find(m => m.id === 'nat');
    const pythonModule = kernelModules.find(m => m.id === 'python');

    switch(activePanel) {
      case 'explorer': return <ExplorerPanel files={files} selectedFileId={selectedFileId} onFileSelect={handleFileSelect} />;
      case 'debugger': return <DebuggerPanel state={debugState} />;
      case 'source-control': return <SourceControlPanel gitModule={gitModule!} natModule={natModule!} onActivate={handleActivateModule} />;
      case 'intel': return <IntelPanel performanceInsights={performanceInsights} securityVulnerabilities={securityVulnerabilities} />;
      case 'aegis': return <AegisPanel status={aegisStatus} logs={threatLogs} components={monitoredComponents} onRunScan={handleRunAegisScan} onIsolate={handleIsolateComponent} />;
      case 'architect': return <ArchitectPanel manifest={buildManifest} onGeneratePlan={handleGenerateBuildPlan} isLoading={isArchitectLoading} />;
      case 'forge': return <ForgePanel templates={PROJECT_TEMPLATES} onForgeProject={handleForgeProject} />;
      case 'packages': return pythonModule?.activated ? <PackagesPanel packages={pythonPackages} onInstallPackage={handleInstallPackage} /> : <ExplorerPanel files={files} selectedFileId={selectedFileId} onFileSelect={handleFileSelect} />;
      case 'kernel': return <KernelPanel modules={kernelModules} onActivateModule={handleActivateModule} />;
      case 'ghostwriter': return <GhostwriterPanel status={ghostwriterStatus} patterns={learnedPatterns} onCalibrate={handleCalibrateAI} onGhostwrite={handleGhostwriteComponent} />;
      case 'changelog': return <ChangelogPanel />;
      case 'cognitive-core': return <CognitiveCorePanel state={cognitiveCoreState} onEngineChange={handleCognitiveEngineChange} onGovernorChange={handleEthicalGovernorChange} />;
      case 'modmind': return <ModMindPanel state={modMindState} onStrategyToggle={handleStrategyToggle} />;
      case 'symbiote': return <SymbiotePanel state={symbioteState} onToggleDataTrust={handleToggleDataTrust} />;
      case 'theme': return <ThemePanel currentTheme={theme} onThemeChange={handleThemeChange} />;
      default: return <ExplorerPanel files={files} selectedFileId={selectedFileId} onFileSelect={handleFileSelect} />;
    }
  }
  
  const pythonModuleActivated = kernelModules.find(m => m.id === 'python')?.activated || false;

  return (
    <div className="flex flex-col h-screen bg-[var(--color-bg-base)] text-gray-300">
      <Header 
        filePath={selectedFilePath}
        onCommandPaletteClick={() => setIsCommandPaletteOpen(true)}
        onBlueSkyClick={() => setIsBlueSkyModalOpen(true)} 
      />
      <main className="flex flex-1 overflow-hidden">
        {isSidebarPanelVisible && renderSidebarPanel()}
        <div className="flex flex-col flex-1 min-w-0">
          <Editor
            fileName={selectedFile?.name || ''}
            content={activeEditorContent}
            diagnostics={diagnostics}
            onChange={handleEditorChange}
            onApplyFix={handleApplyFix}
            onGenerateCodeFromComment={handleGenerateCodeFromComment}
            onRefactorSelection={handleRefactorSelection}
          />
          {isTerminalVisible && <Terminal output={terminalOutput} onCommand={handleTerminalCommand} />}
        </div>
        {isAssistantVisible && <Assistant
          messages={assistantMessages}
          suggestions={aiSuggestions}
          onSendMessage={handleSendMessage}
          onApplyCode={handleEditorChange}
          onCreateFile={handleCreateFile}
          isLoading={isLoading}
          onConsultBaron={handleConsultBaron}
          hasNewBaronDirective={hasNewBaronDirective}
          vocalState={vocalState}
          onToggleListening={handleToggleListening}
        />}
      </main>
      <div className="flex items-center flex-shrink-0">
         <ActivityBar 
            activePanel={activePanel} 
            onPanelChange={setActivePanel}
            pythonModuleActivated={pythonModuleActivated}
        />
        <StatusBar engineTier={cognitiveCoreState.engineTier} />
      </div>
      <BlueSkyModal 
        isOpen={isBlueSkyModalOpen}
        onClose={() => setIsBlueSkyModalOpen(false)}
        onGenerate={handleBlueSkyGenerate}
      />
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        commands={commands}
      />
    </div>
  );
};

export default App;
