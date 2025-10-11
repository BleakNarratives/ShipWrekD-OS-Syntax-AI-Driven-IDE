// FIX: Implemented the previously empty Sidebar component.
import React, { useContext } from 'react';
import { AppContext } from '../App';
import { ExplorerPanel } from './ExplorerPanel';
import { KernelPanel } from './KernelPanel';
import { SourceControlPanel } from './SourceControlPanel';
import { GhostwriterPanel } from './GhostwriterPanel';
import { ArchitectPanel } from './ArchitectPanel';
import { ForgePanel } from './ForgePanel';
import { ThemePanel } from './ThemePanel';
import { TaskCruciblePanel } from './TaskCruciblePanel';
import { PackagesPanel } from './PackagesPanel';
import { ChangelogPanel } from './ChangelogPanel';
import { SearchPanel } from './SearchPanel';
import { DebuggerPanel } from './DebuggerPanel';
import { LaunchpadPanel } from './LaunchpadPanel';
import { AegisPanel } from './AegisPanel';
import { VaultPanel } from './VaultPanel';
import { ChroniclePanel } from './ChroniclePanel';
import { OraclePanel } from './OraclePanel';
import { ModMindPanel } from './ModMindPanel';
import { CognitiveCorePanel } from './CognitiveCorePanel';
import { SymbiotePanel } from './SymbiotePanel';
import { DataConsentPanel } from './DataConsentPanel';
import { KeystrokeCompendiumPanel } from './KeystrokeCompendiumPanel';
import { IntelPanel } from './IntelPanel';
import { CaptainLogPanel } from './CaptainLogPanel';
import { PROJECT_TEMPLATES } from '../constants';

export const Sidebar: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return null;

  const { 
      activePanel, 
      fileTree: files, 
      selectedFileId, 
      handleFileSelect, 
      handlePreviewFile,
      handleCreateFile,
      handleCreateFolder,
      handleDeleteNode,
      handleRenameNode,
      kernelModules,
      onActivateModule,
      snapshots,
      onSaveSnapshot,
      onRestoreSnapshot,
      buildManifest,
      onGeneratePlan,
      ghostwriterStatus,
      onCalibrate,
      handleGhostwrite,
      onForgeProject,
      theme,
      onThemeChange,
      wispTasks,
      pythonPackages,
      onInstallPackage,
      aegisStatus,
      architecturalViolation,
      handlePurgeViolation,
      threatLogs,
      monitoredComponents,
      onRunScan,
      onIsolate,
      cognitiveCoreState,
      onEngineChange,
      onGovernorChange,
      modMindState,
      onStrategyToggle,
      symbioteState,
      onToggleDataTrust,
      debugState,
      localSearchResults,
      webSearchResult,
      isSearchLoading,
      handleSearch,
      oracleInsights,
      isOracleLoading,
      handleOracleConsult,
      onPushToLaunchpad,
      chronicleLog,
      vaultFragments,
      dataConsentState,
      onToggleDataConsentOptIn,
      performanceInsights,
      securityVulnerabilities,
      traceLog,
      traceResult,
      isTracing,
      onTraceCascade,
      captainLogContent
  } = context;

  const renderPanel = () => {
    switch (activePanel) {
      case 'explorer':
        return <ExplorerPanel 
            files={files} 
            selectedFileId={selectedFileId} 
            onFileSelect={handleFileSelect} 
            onPreviewFile={handlePreviewFile} 
            onCreateFile={handleCreateFile}
            onCreateFolder={handleCreateFolder}
            onDeleteNode={handleDeleteNode}
            onRenameNode={handleRenameNode}
        />;
      case 'search':
        return <SearchPanel onSearch={handleSearch} localResults={localSearchResults} webResult={webSearchResult} isLoading={isSearchLoading} onFileSelect={handleFileSelect} />;
      case 'debugger':
        return <DebuggerPanel state={debugState} />;
      case 'source-control':
        return <SourceControlPanel gitModule={kernelModules.find(m=>m.id==='git')!} natModule={kernelModules.find(m=>m.id==='nat')!} onActivate={onActivateModule} snapshots={snapshots} onSaveSnapshot={onSaveSnapshot} onRestoreSnapshot={onRestoreSnapshot} />;
      case 'launchpad':
        return <LaunchpadPanel onPush={async (service, repo, msg) => onPushToLaunchpad(service, repo)} />;
      case 'intel':
        return <IntelPanel performanceInsights={performanceInsights} securityVulnerabilities={securityVulnerabilities} traceLog={traceLog} traceResult={traceResult} isTracing={isTracing} onTraceCascade={onTraceCascade} />;
      case 'aegis':
        return <AegisPanel status={aegisStatus} logs={threatLogs} components={monitoredComponents} onRunScan={onRunScan} onIsolate={onIsolate} architecturalViolation={architecturalViolation} onPurgeViolation={handlePurgeViolation} />;
      case 'forge':
        return <ForgePanel templates={PROJECT_TEMPLATES} onForgeProject={onForgeProject} />;
      case 'ghostwriter':
        return <GhostwriterPanel status={ghostwriterStatus} patterns={[]} onCalibrate={onCalibrate} onGhostwrite={handleGhostwrite} />;
      case 'wisp-crucible':
        return <TaskCruciblePanel tasks={wispTasks} />;
      case 'architect':
        return <ArchitectPanel manifest={buildManifest} onGeneratePlan={onGeneratePlan} isLoading={false} />;
      case 'packages':
        return <PackagesPanel packages={pythonPackages} onInstallPackage={onInstallPackage} />;
      case 'vault':
        return <VaultPanel fragments={vaultFragments} onAddFragment={() => {}} onPasteFragment={() => {}} />;
      case 'chronicle':
        return <ChroniclePanel log={chronicleLog} />;
      case 'captains-log':
        return <CaptainLogPanel content={captainLogContent} />;
      case 'oracle':
        return <OraclePanel insights={oracleInsights} onConsult={handleOracleConsult} isLoading={isOracleLoading} />;
      case 'modmind':
        return <ModMindPanel state={modMindState} onStrategyToggle={onStrategyToggle} />;
      case 'cognitive-core':
        return <CognitiveCorePanel state={cognitiveCoreState} onEngineChange={onEngineChange} onGovernorChange={onGovernorChange} />;
      case 'symbiote':
        return <SymbiotePanel state={symbioteState} onToggleDataTrust={onToggleDataTrust} />;
      case 'data-consent':
        return <DataConsentPanel state={dataConsentState} onToggleOptIn={onToggleDataConsentOptIn} />;
      case 'changelog':
        return <ChangelogPanel />;
      case 'kernel':
        return <KernelPanel modules={kernelModules} onActivateModule={onActivateModule} />;
      case 'compendium':
        return <KeystrokeCompendiumPanel />;
      case 'theme':
        return <ThemePanel currentTheme={theme} onThemeChange={onThemeChange} />;
      default:
        return <ExplorerPanel 
            files={files} 
            selectedFileId={selectedFileId} 
            onFileSelect={handleFileSelect} 
            onPreviewFile={handlePreviewFile}
            onCreateFile={handleCreateFile}
            onCreateFolder={handleCreateFolder}
            onDeleteNode={handleDeleteNode}
            onRenameNode={handleRenameNode}
        />;
    }
  };

  return <div className="w-72 flex-shrink-0 bg-[var(--color-bg-surface)] border-r border-[var(--color-border-base)]">{renderPanel()}</div>;
};