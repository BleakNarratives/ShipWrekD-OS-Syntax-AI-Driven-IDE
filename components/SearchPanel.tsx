import React, { useState } from 'react';
import type { LocalSearchResult, WebSearchResult } from '../types';
import { Icon } from './Icon';

interface SearchPanelProps {
    onSearch: (query: string, type: 'local' | 'web') => void;
    localResults: LocalSearchResult[];
    webResult: WebSearchResult | null;
    isLoading: boolean;
    onFileSelect: (fileId: string) => void;
}

export const SearchPanel: React.FC<SearchPanelProps> = ({ onSearch, localResults, webResult, isLoading, onFileSelect }) => {
    const [query, setQuery] = useState('');
    const [searchType, setSearchType] = useState<'local' | 'web'>('local');

    const handleSearch = () => {
        onSearch(query, searchType);
    };

    return (
        <aside className="w-64 bg-[#0d1117] border-r border-gray-700/50 flex flex-col flex-shrink-0">
            <h2 className="text-xs uppercase text-gray-400 font-bold px-3 py-2">Search</h2>
            <div className="p-2 border-b border-gray-700/50">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Search..."
                    className="w-full bg-[#161b22] border border-gray-600 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:border-cyan-500"
                />
                <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => setSearchType('local')} className={`flex-1 py-1 text-xs rounded ${searchType === 'local' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-gray-700/50 text-gray-400'}`}>Local</button>
                    <button onClick={() => setSearchType('web')} className={`flex-1 py-1 text-xs rounded ${searchType === 'web' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-gray-700/50 text-gray-400'}`}>Web</button>
                </div>
                 <button
                    onClick={handleSearch}
                    disabled={isLoading || !query.trim()}
                    className="w-full mt-2 px-3 py-1.5 bg-cyan-600/80 text-white rounded hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors text-sm font-bold flex items-center justify-center gap-2"
                >
                    <Icon name="search" className="w-4 h-4" />
                    Search
                </button>
            </div>

            <div className="flex-1 p-2 overflow-y-auto">
                {isLoading && <div className="text-center p-4 text-sm text-gray-400">Searching...</div>}

                {!isLoading && searchType === 'local' && localResults.length > 0 && (
                    <div>
                        <h3 className="text-xs uppercase text-gray-500 font-bold px-1 mb-2">Local Results ({localResults.length})</h3>
                        <ul>
                            {localResults.map((result, index) => (
                                <li key={index} onClick={() => onFileSelect(result.fileId)} className="p-2 rounded hover:bg-gray-700/30 cursor-pointer">
                                    <p className="font-semibold text-gray-300 text-sm">{result.fileName}<span className="text-gray-500 ml-2">L{result.line}</span></p>
                                    <p className="text-xs text-gray-400 mt-1 font-mono truncate" title={result.snippet}>{result.snippet}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {!isLoading && searchType === 'web' && webResult && (
                    <div>
                        <h3 className="text-xs uppercase text-gray-500 font-bold px-1 mb-2">Web Result</h3>
                        <div className="p-2 bg-gray-700/20 rounded">
                            <p className="text-sm text-gray-300 whitespace-pre-wrap">{webResult.summary}</p>
                        </div>
                        {webResult.sources.length > 0 && (
                            <div className="mt-4">
                                <h4 className="text-xs uppercase text-gray-500 font-bold px-1 mb-2">Sources</h4>
                                <ul className="space-y-1">
                                    {webResult.sources.map((source, index) => (
                                        <li key={index}>
                                            <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-400 hover:underline truncate block" title={source.uri}>
                                                {source.title || source.uri}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </aside>
    );
};
