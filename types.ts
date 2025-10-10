import React from 'react';

export interface Message {
  role: 'user' | 'model';
  content: string;
  responseType?: 'explanation' | 'code_generation' | 'orchestration';
  filename?: string;
  code?: string;
  source?: 'assistant' | 'ghostwriter';
  orchestrationPlan?: OrchestrationPlan;
  image?: {
    mimeType: string;
    data: string; // base64
  };
  consultation?: boolean; // Flag for messages resulting from a Baronial Consultation
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
    connectionStatus: 'disconnected' | 'connecting' | 'connected';
    dataTrustOptIn: boolean;
    streams: BiometricStream[];
}

// Types for the Debugger
export interface StackFrame {
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
    status: 'inactive' | 'running' | 'paused';
    callStack: StackFrame[];
    breakpoints: Breakpoint[];
    variables: Record<string, any>;
}

// Types for the Vocal Interface
export type VocalState = 'idle' | 'listening' | 'speaking';

// Types for the UI Theming feature
export type ThemeName = 'amber' | 'canary';

export interface ThemePalette {
  '--color-primary-fg': string;
  '--color-primary-bg-hover': string;
  '--color-primary-border': string;
  '--color-bg-base': string;
  '--color-bg-surface': string;
  '--color-border-base': string;
  '--color-accent-red': string;
}

export interface Theme {
  name: string;
  palette: ThemePalette;
}
