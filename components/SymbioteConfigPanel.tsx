import React from 'react';
import type { SymbioteConfig, NotificationProfile, EvolutionaryFocus } from '../types';
import { Icon } from './Icon';

interface SymbioteConfigPanelProps {
  isOpen: boolean;
  onClose: () => void;
  config: SymbioteConfig;
  onConfigChange: (newConfig: SymbioteConfig) => void;
}

const ToggleSwitch: React.FC<{ checked: boolean; onChange: (checked: boolean) => void; disabled?: boolean; }> = ({ checked, onChange, disabled }) => (
    <button onClick={() => onChange(!checked)} disabled={disabled} className={`relative inline-flex items-center h-5 rounded-full w-9 transition-colors ${checked ? 'bg-cyan-500' : 'bg-gray-600'} disabled:opacity-50 disabled:cursor-not-allowed`}>
        <span className={`inline-block w-3.5 h-3.5 transform bg-white rounded-full transition-transform ${checked ? 'translate-x-5' : 'translate-x-1'}`} />
    </button>
);

export const SymbioteConfigPanel: React.FC<SymbioteConfigPanelProps> = ({ isOpen, onClose, config, onConfigChange }) => {
    if (!isOpen) return null;

    const permissionPresets: Record<Exclude<EvolutionaryFocus, 'none'>, SymbioteConfig['permissions']> = {
        'File I/O': { readAnalysis: true, writeFormatting: true, writeLogic: false },
        'Component Stubs': { readAnalysis: true, writeFormatting: true, writeLogic: true },
        'Testing Scaffolds': { readAnalysis: true, writeFormatting: true, writeLogic: true },
    };

    const handlePermissionChange = (key: keyof SymbioteConfig['permissions'], value: boolean) => {
        onConfigChange({ ...config, permissions: { ...config.permissions, [key]: value } });
    };

    const handleProfileChange = (profile: NotificationProfile) => {
        onConfigChange({ ...config, notificationProfile: profile });
    };

    const handleFocusChange = (focus: EvolutionaryFocus) => {
        if (focus === 'none') {
            onConfigChange({ ...config, evolutionaryFocus: focus });
        } else {
            const newPermissions = permissionPresets[focus];
            onConfigChange({ ...config, evolutionaryFocus: focus, permissions: newPermissions });
        }
    };

    const permissionsDisabled = config.evolutionaryFocus !== 'none';

    const notificationProfiles: { id: NotificationProfile, name: string, desc: string }[] = [
        { id: 'subtle', name: 'Subtle Pulse', desc: 'Briefly illuminates the relevant line of code.' },
        { id: 'audible', name: 'Audible Chime', desc: 'Plays a high-frequency chime.' },
        { id: 'full_alert', name: 'Full Alert', desc: 'Displays a traditional pop-up notification.' },
    ];
    
    const evolutionaryFoci: EvolutionaryFocus[] = ['File I/O', 'Component Stubs', 'Testing Scaffolds'];

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center" onClick={onClose}>
            <div
                className="relative bg-[#161b22] border border-gray-700/50 rounded-lg shadow-2xl w-full max-w-md flex flex-col max-h-[80vh]"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-700/50 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <Icon name="gear" className="w-6 h-6 text-cyan-400" />
                        <h2 className="text-lg font-bold text-gray-200">Symbiote Configuration</h2>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-700">
                        <Icon name="close" className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                <div className="flex-1 p-4 overflow-y-auto space-y-6">
                    {/* Notification Profile */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-300 px-1 mb-2">Cognitive Interruption Level</h3>
                        <div className="p-3 bg-[#0d1117] rounded-md space-y-2">
                             {notificationProfiles.map(p => (
                                <button key={p.id} onClick={() => handleProfileChange(p.id)} className={`w-full text-left p-2 rounded border-2 ${config.notificationProfile === p.id ? 'bg-cyan-500/10 border-cyan-500' : 'border-transparent hover:bg-gray-700/50'}`}>
                                    <p className="font-semibold text-sm text-gray-200">{p.name}</p>
                                    <p className="text-xs text-gray-400">{p.desc}</p>
                                </button>
                             ))}
                        </div>
                    </div>

                    {/* Permission Scopes */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-300 px-1 mb-2">Permission Scopes</h3>
                        {permissionsDisabled && (
                            <p className="text-xs text-amber-400/80 px-1 mb-2">Permissions are managed by the selected Evolutionary Focus. To customize, set focus to 'None'.</p>
                        )}
                        <div className="p-3 bg-[#0d1117] rounded-md space-y-3">
                            <div className="flex items-center justify-between">
                                <label className={`flex-1 pr-4 ${permissionsDisabled ? 'opacity-60' : ''}`}>
                                    <p className="font-semibold text-sm text-gray-200">Read File Analysis</p>
                                    <p className="text-xs text-gray-400">Allow Wisp to passively analyze code for issues.</p>
                                </label>
                                <ToggleSwitch checked={config.permissions.readAnalysis} onChange={(val) => handlePermissionChange('readAnalysis', val)} disabled={permissionsDisabled} />
                            </div>
                             <div className="flex items-center justify-between">
                                <label className={`flex-1 pr-4 ${permissionsDisabled ? 'opacity-60' : ''}`}>
                                    <p className="font-semibold text-sm text-gray-200">Write: Formatting Only</p>
                                    <p className="text-xs text-gray-400">Permit Wisp to execute code formatting tasks.</p>
                                </label>
                                <ToggleSwitch checked={config.permissions.writeFormatting} onChange={(val) => handlePermissionChange('writeFormatting', val)} disabled={permissionsDisabled} />
                            </div>
                             <div className="flex items-center justify-between">
                                <label className={`flex-1 pr-4 opacity-60`}>
                                    <p className="font-semibold text-sm text-gray-200">Write: Automate Core Logic</p>
                                    <p className="text-xs text-gray-400">Authorize Wisp to generate and modify application logic. (Restricted)</p>
                                </label>
                                <ToggleSwitch checked={config.permissions.writeLogic} disabled onChange={(val) => handlePermissionChange('writeLogic', val)} />
                            </div>
                        </div>
                    </div>
                    
                    {/* Evolutionary Focus */}
                     <div>
                        <h3 className="text-sm font-bold text-gray-300 px-1 mb-2">Evolutionary Focus (+10% XP)</h3>
                        <div className="p-3 bg-[#0d1117] rounded-md">
                            <div className="flex flex-wrap gap-2">
                                {evolutionaryFoci.map(focus => (
                                    <button key={focus} onClick={() => handleFocusChange(focus)} className={`px-3 py-1 text-sm rounded-full ${config.evolutionaryFocus === focus ? 'bg-cyan-500 text-black font-bold' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}>
                                        {focus}
                                    </button>
                                ))}
                                 <button onClick={() => handleFocusChange('none')} className={`px-3 py-1 text-sm rounded-full ${config.evolutionaryFocus === 'none' ? 'bg-gray-500 text-black font-bold' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}>
                                    None
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};