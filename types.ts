import React from 'react';

export interface Message {
  role: 'user' | 'model';
  content: string;
  responseType?: 'explanation' | 'code_generation' | 'orchestration' | 'theme_update';
  filename?: string;
  code?: string;
  source?: 'assistant' | 'ghostwriter';
  orchestrationPlan?: OrchestrationPlan;
  image?: {
    mimeType: string;
    data: string; // base64
  };
  consultation?: boolean; // Flag for messages resulting from a Baronial Consultation
  cssBackground?: string; // For AI-driven theme updates
}

export interface FileTreeNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileTreeNode[];
}

export interface Command {
    id:string;
    name: string;
    category: string;
    action: () => void;
    keywords?: string[];
}

export interface KernelModule {
    id: string;
    name: string;
    description: string;
    icon: any; // IconName type
    activated: boolean;
}

export interface PythonPackage {
    name: string;
    version: string;
    description: string;
}

export interface Suggestion {
    id: string;
    text: string;
    icon: any; // IconName type
    action: () => void;
}

export interface Diagnostic {
  line: number;
  message: string;
  severity: 'error' | 'warning' | 'info';
  suggestion?: string;
}

export type RefactorAction = 'explain' | 'refactor' | 'add_comments' | 'find_bugs';

export interface LearnedPattern {
  id: string;
  name: string;
  description: string;
  icon: any; // IconName type
}

export interface PerformanceInsight {
  line: number;
  message: string;
  severity: 'high' | 'medium' | 'low';
  suggestion: string;
}

export interface SecurityVulnerability {
  line: number;
  message: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  suggestion: string;
  cwe?: string; // Common Weakness Enumeration ID
}

export interface SystemComponent {
  name: string;
  description: string;
  category: 'Core System' | 'Toolchain' | 'Filesystem' | 'Networking' | 'Services' | 'User Environment' | 'Key Packages' | 'Security';
}

export interface BuildManifest {
  name: string;
  description: string;
  components: SystemComponent[];
}

export interface TemplateFile {
  name: string;
  content: string;
}

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  icon: any; // IconName type
  files: (TemplateFile | { name: string; children: TemplateFile[] })[];
}

export type AegisStatus = 'secure' | 'scanning' | 'threat_detected' | 'isolated';

export interface ThreatLog {
  id: string;
  timestamp: string;
  componentId: string;
  description: string;
  severity: 'critical' | 'high' | 'medium';
}

export interface PromptThreatLog {
  id: string;
  timestamp: string;
  prompt: string;
  threatType: 'Prompt Injection' | 'Data Exfiltration Attempt' | 'Command Injection Attempt';
  actionTaken: 'Blocked';
}

export interface MonitoredComponent {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'isolated';
}

// Types for the Cognitive Core feature
export type CognitiveEngineTier = 'distilled' | 'standard' | 'advanced' | 'unfettered';
export type EthicalGovernorMode = 'guardian' | 'pragmatist' | 'machiavellian';

export interface CognitiveCoreState {
  engineTier: CognitiveEngineTier;
  governorMode: EthicalGovernorMode;
}

// Types for the AI Orchestrator
export type AppModule = 'architect' | 'forge' | 'ghostwriter' | 'aegis' | 'terminal';

export interface OrchestrationStep {
  id: string;
  module: AppModule;
  details: string; // A human-readable description of the step
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  command: {
    action: string; // e.g., 'generate_plan', 'forge_project', 'ghostwrite', 'run_scan'
    args: Record<string, any>; // e.g., { prompt: '...', projectName: '...' }
  };
}

export interface OrchestrationPlan {
    planId: string;
    steps: OrchestrationStep[];
}

// Types for ModMind, the meta-cognitive conductor
export interface OrchestrationStrategy {
    id: string;
    name: string;
    description: string;
    trigger: string; // e.g., a keyword or phrase that invokes this strategy
    enabled: boolean;
}

export interface ModMindState {
    strategies: OrchestrationStrategy[];
    cognitiveLoad: number; // 0-100
    lastDecisionTrace: string;
}

// Types for the Cognitive Symbiote
export interface BiometricStream {
    id: string;
    name: string;
    unit: string;
    value: number;
    status: 'active' | 'paused' | 'unavailable';
}

export interface SymbioteState {
    connectionStatus: 'connected' | 'connecting' | 'disconnected';
    dataTrustOptIn: boolean;
    streams: BiometricStream[];
}

// Types for the Quantum Debugger
export interface CallStackFrame {
  id: string;
  functionName: string;
  file: string;
  line: number;
}

export interface Breakpoint {
  id: string;
  file: string;
  line: number;
  enabled: boolean;
}

export interface DebugState {
  status: 'running' | 'paused' | 'stopped';
  callStack: CallStackFrame[];
  breakpoints: Breakpoint[];
  variables: Record<string, any>;
}

// Types for Vocal Symbiosis
export type VocalState = 'idle' | 'listening' | 'speaking';

// Types for Theming
export type ThemeName = 'amber' | 'canary' | 'praxis' | 'guardsman' | 'aether';

export interface Theme {
  name: string;
  palette: Record<string, string>;
}

// Types for Search
export interface LocalSearchResult {
    fileId: string;
    fileName: string;
    line: number;
    snippet: string;
}

export interface Source {
    uri: string;
    title: string;
}

export interface WebSearchResult {
    summary: string;
    sources: Source[];
}

// Types for Oracle
export interface OracleInsight {
    id: string;
    type: 'Next Step' | 'Potential Pitfall' | 'Relevant Snippet' | 'External Knowledge';
    title: string;
    description: string;
    code?: string;
    link?: string;
}

// Types for Launchpad
export type DeploymentService = 'github' | 'huggingface';

// Types for Chronicle
export type ChronicleEventType = 'file' | 'ai' | 'system' | 'terminal' | 'action';
export interface ChronicleEntry {
    id: string;
    timestamp: Date;
    type: ChronicleEventType;
    description: string;
}

// Types for Keystroke Compendium
export interface Shortcut {
    keys: string;
    description: string;
}

// Types for The Vault
export type VaultFragmentType = 'Snippet' | 'Note' | 'URL' | 'Command';
export interface VaultFragment {
    id: string;
    type: VaultFragmentType;
    content: string;
    sourceFile?: string;
    timestamp: Date;
}

// Types for aFiREFLY Data Consent
export interface DataPoint {
    id: string;
    name: string;
    description: string;
    active: boolean;
}

export interface MembershipTier {
    name: string;
    contributionRequired: number;
}

export interface DataConsentState {
    optedIn: boolean;
    contributionScore: number;
    currentTier: MembershipTier;
    nextTier: MembershipTier;
    dataPoints: DataPoint[];
}

// Types for aFiREFLY Predictive Buffer
export interface PredictiveBufferSegment {
    id: string;
    state: 'empty' | 'buffering' | 'ready';
    confidence: number; // 0-1
}

// Types for Agent Ops
export interface TraceLogEntry {
    id: string;
    timestamp: Date;
    source: 'SYSTEM' | 'aFiREFLY' | 'OSINT' | 'ModMind';
    message: string;
}

export interface OSINTLead {
    confidence: number;
    profile: string;
    locations: string[];
    associates: string[];
}

export interface TraceResult {
    summary: string;
    leads: OSINTLead[];
}


// Types for aFiREFLY Wisp
export interface WispState {
    level: number;
    xp: number;
    xpToNextLevel: number;
    status: 'idle' | 'working' | 'evolving';
    tasksCompleted: number;
}

// BARON: Refined. Tasks require structure and accountability.
export type WispTaskType = 'FORMAT_FILE' | 'CREATE_BOILERPLATE';

export interface WispTask {
    id: string;
    description: string;
    type: WispTaskType;
    status: 'pending' | 'completed' | 'failed';
    payload: { 
        fileId?: string | null;
        fileType?: 'component' | 'service';
        name?: string;
    };
}

// BARON: Essential configurations for a controlled Symbiote.
export type NotificationProfile = 'subtle' | 'audible' | 'full_alert';
export type EvolutionaryFocus = 'none' | 'File I/O' | 'Component Stubs' | 'Testing Scaffolds';

export interface SymbioteConfig {
    notificationProfile: NotificationProfile;
    permissions: {
        readAnalysis: boolean;
        writeFormatting: boolean;
        writeLogic: boolean;
    };
    evolutionaryFocus: EvolutionaryFocus;
}

// BARON: The "Nat" version control system requires a state snapshot structure. This is it.
export interface Snapshot {
  id: string;
  timestamp: Date;
  description: string;
  fileTree: FileTreeNode[];
  fileContents: Map<string, string>;
}

// BARON: The one true source of application state. All components will drink from this well.
export interface AppContextType {
    // State
    fileTree: FileTreeNode[];
    selectedFileId: string | null;
    fileContents: Map<string, string>;
    terminalOutput: string[];
    messages: Message[];
    diagnostics: Diagnostic[];
    isAnalyzingCode: boolean;
    isLoadingFile: boolean;
    analysisError: string | null;
    splitViewFileId: string | null;
    isAssistantLoading: boolean;
    hasNewBaronDirective: boolean;
    activePanel: string;
    kernelModules: KernelModule[];
    buildManifest: BuildManifest | null;
    ghostwriterStatus: 'uncalibrated' | 'calibrating' | 'calibrated';
    theme: ThemeName;
    aegisStatus: AegisStatus;
    architecturalViolation: boolean;
    threatLogs: ThreatLog[];
    monitoredComponents: MonitoredComponent[];
    cognitiveCoreState: CognitiveCoreState;
    modMindState: ModMindState;
    symbioteState: SymbioteState;
    debugState: DebugState;
    localSearchResults: LocalSearchResult[];
    webSearchResult: WebSearchResult | null;
    isSearchLoading: boolean;
    oracleInsights: OracleInsight[];
    isOracleLoading: boolean;
    chronicleLog: ChronicleEntry[];
    vaultFragments: VaultFragment[];
    dataConsentState: DataConsentState;
    pythonPackages: PythonPackage[];
    performanceInsights: PerformanceInsight[];
    securityVulnerabilities: SecurityVulnerability[];
    traceLog: TraceLogEntry[];
    traceResult: TraceResult | null;
    isTracing: boolean;
    snapshots: Snapshot[];
    wispTasks: WispTask[];
    vocalState: VocalState;
    cognitiveLoad: number;
    activeFileNode: FileTreeNode | null;
    activeFileContent: string;
    captainLogContent: string;

    // Handlers
    handleFileSelect: (id: string) => void;
    setFileContents: React.Dispatch<React.SetStateAction<Map<string, string>>>;
    setTerminalOutput: React.Dispatch<React.SetStateAction<string[]>>;
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    setDiagnostics: React.Dispatch<React.SetStateAction<Diagnostic[]>>;
    handleApplyFix: (lineNumber: number, suggestion: string) => void;
    handlePreviewFile: (fileId: string, fileName: string) => void;
    handleCommand: (command: string) => void;
    handleSendMessage: (message: string, image?: Message['image']) => Promise<void>;
    handleSearch: (query: string, type: 'local' | 'web') => Promise<void>;
    handleOracleConsult: () => Promise<void>;
    handleGhostwrite: (prompt: string) => Promise<void>;
    handlePurgeViolation: () => void;
    handleSaveSnapshot: (description: string) => void;
    handleRestoreSnapshot: (snapshotId: string) => void;
    setActivePanel: React.Dispatch<React.SetStateAction<string>>;
    handleCodeChange: (newCode: string) => void;
    setSplitViewFileId: React.Dispatch<React.SetStateAction<string | null>>;
    findFile: (nodes: FileTreeNode[], id: string) => FileTreeNode | null;
    getFilePath: () => string;
    handleRunCode: () => void;
    handleCreateFile: (parentId: string | null) => void;
    handleCreateFolder: (parentId: string | null) => void;
    handleDeleteNode: (nodeId: string) => void;
    handleRenameNode: (nodeId: string, newName: string) => void;

    // Panel-specific handlers
    onActivateModule: (id: string) => void;
    onGeneratePlan: (prompt: string) => void;
    onCalibrate: () => void;
    onForgeProject: (template: ProjectTemplate, projectName: string) => void;
    onThemeChange: React.Dispatch<React.SetStateAction<ThemeName>>;
    onInstallPackage: (packageName: string) => void;
    onRunScan: () => void;
    onIsolate: (id: string) => void;
    onEngineChange: (tier: any) => void;
    onGovernorChange: (mode: any) => void;
    onStrategyToggle: (strategyId: string) => void;
    onToggleDataTrust: () => void;
    onPushToLaunchpad: (service: any, repoName: string) => Promise<void>;
    onToggleDataConsentOptIn: () => void;
    onTraceCascade: (seed: string) => void;
    onConsultBaron: (prompt: string) => void;
    onCreateFile: (filename: string, code: string) => void;
}


// New types for the redesigned UI
export type IdeMode = 'code' | 'plan' | 'debug' | 'system';
export type LayoutMode = 'portrait' | 'landscape';

export interface OmniBarSuggestion {
    id: string;
    type: 'file' | 'command' | 'ai';
    label: string;
    description?: string;
    action: () => void;
}