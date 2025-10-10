import React, { useState } from 'react';
import type { PythonPackage } from '../types';
import { Icon } from './Icon';

interface PackagesPanelProps {
  packages: PythonPackage[];
  onInstallPackage: (packageName: string) => void;
}

export const PackagesPanel: React.FC<PackagesPanelProps> = ({ packages, onInstallPackage }) => {
  const [newPackageName, setNewPackageName] = useState('');

  const handleInstall = () => {
    if (newPackageName.trim()) {
      onInstallPackage(newPackageName.trim());
      setNewPackageName('');
    }
  };

  return (
    <aside className="w-64 bg-[#0d1117] border-r border-gray-700/50 flex flex-col flex-shrink-0">
      <h2 className="text-xs uppercase text-gray-400 font-bold px-3 py-2">Python Packages</h2>
      <div className="p-2 border-b border-gray-700/50">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newPackageName}
            onChange={(e) => setNewPackageName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleInstall()}
            placeholder="e.g., flask, numpy"
            className="flex-1 bg-[#161b22] border border-gray-600 rounded-md px-2 py-1 text-sm focus:outline-none focus:border-cyan-500"
          />
          <button
            onClick={handleInstall}
            className="px-3 py-1 bg-cyan-600/80 text-white rounded-md hover:bg-cyan-600 text-sm font-bold"
          >
            Install
          </button>
        </div>
      </div>
      <div className="flex-1 p-2 overflow-y-auto">
        <h3 className="text-xs uppercase text-gray-500 font-bold px-1 mb-2">Installed</h3>
        {packages.length > 0 ? (
          <ul>
            {packages.map((pkg) => (
              <li key={pkg.name} className="p-2 rounded hover:bg-gray-700/30">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-200">{pkg.name}</span>
                  <span className="text-xs bg-gray-600 text-gray-300 px-2 py-0.5 rounded-full">{pkg.version}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{pkg.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 text-center p-4">No packages installed.</p>
        )}
      </div>
    </aside>
  );
};
