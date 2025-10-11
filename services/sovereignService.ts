import type { Message, LearnedPattern, WebSearchResult, OracleInsight, BuildManifest, Diagnostic } from '../types';

/**
 * This service provides mock, placeholder responses when the main AI cognitive core is offline.
 * This ensures the IDE remains functional and responsive even without an API key.
 */

const sovereignExplanation = `**[SOVEREIGN MODE]** My higher cognitive functions are offline. I am operating on local heuristics. My responses are based on general knowledge and may not be contextually accurate. Functionality is limited until the connection to the cognitive core is restored.`;

export async function getAIResponse(
    userMessage: Message, 
    code: string,
    conversationHistory: Message[],
    isParentsAwayMode?: boolean
): Promise<{ responseType: 'explanation', explanation?: string }> {
    return Promise.resolve({ 
        responseType: 'explanation', 
        explanation: sovereignExplanation 
    });
}

export async function getWebSearch(query: string): Promise<WebSearchResult> {
    return Promise.resolve({
        summary: "[SOVEREIGN MODE] Web search is unavailable while operating in sovereign mode.",
        sources: []
    });
}

export async function getOracleInsight(context: string): Promise<OracleInsight[]> {
    return Promise.resolve([
        { 
            id: 'sov_1', 
            type: 'Next Step', 
            title: 'Review Core Logic', 
            description: 'Consider reviewing the main application logic in App.tsx to ensure all state transitions are handled correctly.'
        },
        { 
            id: 'sov_2', 
            type: 'Potential Pitfall', 
            title: 'Check for Hardcoded Values', 
            description: 'Be mindful of any hardcoded strings or numbers that should be moved to a constants file for better maintainability.'
        },
        {
            id: 'sov_3',
            type: 'External Knowledge',
            title: 'React Hooks Documentation',
            description: 'When in doubt, consulting the official React documentation for hooks like useEffect and useCallback can prevent common issues.',
            link: 'https://react.dev/reference/react'
        }
    ]);
}


export async function getAILearnedPatterns(projectContext: string): Promise<LearnedPattern[]> {
     return Promise.resolve([
        { id: 'pattern_1', name: 'Generic Component Structure', description: 'Components appear to follow a standard functional component pattern.', icon: 'react' },
        { id: 'pattern_2', name: 'Service Layer Abstraction', description: 'Data fetching seems to be handled in a dedicated service layer.', icon: 'wrench' },
        { id: 'pattern_3', name: 'Type-Safe Constants', description: 'A central file appears to manage shared constants and types.', icon: 'json' },
    ]);
}

export async function getAIBlueSkyIdeas(prompt: string): Promise<string> {
    return Promise.resolve(`
### Blue Sky Ideas (Sovereign Mode)

The Oracle's connection to the generative ether is severed. Here are some generalized ideas based on your prompt:

1.  **Simplify the Core Problem:** Break down your prompt, "${prompt}", into its smallest constituent parts. Address each one individually before combining them.
2.  **Consider the User Experience:** How would a new user interact with this feature? Map out the simplest possible user flow.
3.  **Look for Analogies:** Are there existing solutions in other domains that solve a similar problem? How can you adapt their principles to your own?
    `);
}

export async function getAIBuildPlan(prompt: string): Promise<BuildManifest> {
    return Promise.resolve({
        name: 'Sovereign Mode Fallback Plan',
        description: 'This is a generic project plan. The System Architect is offline.',
        components: [
            {name: 'Core Application Logic', description: 'The primary entry point and state management.', category: 'Core System'},
            {name: 'UI Component Library', description: 'Reusable UI elements for the interface.', category: 'User Environment'},
            {name: 'Data Service Module', description: 'Handles data fetching and state logic.', category: 'Services'},
        ]
    });
}

export async function getBaronialConsultation(baronDirective: string, userPrompt: string): Promise<{filename: string, code: string}> {
    return Promise.resolve({
        filename: 'SovereignDirective.txt',
        code: `The Baron is currently incommunicado. His last directive was:\n\n---\n${baronDirective}\n---\n\nSovereign Core recommends proceeding with caution.`
    });
}

export async function getAIGhostwrite(prompt: string, projectContext: string): Promise<{ filename: string, code: string }> {
    return Promise.resolve({
        filename: 'SovereignComponent.tsx',
        code: `// [SOVEREIGN MODE] Ghostwriter is offline.
// This is a placeholder component based on your prompt:
// "${prompt}"

import React from 'react';

const SovereignComponent: React.FC = () => {
  return (
    <div>
      <h1>Sovereign Component</h1>
      <p>This is a placeholder generated in Sovereign Mode.</p>
    </div>
  );
};

export default SovereignComponent;
`
    });
}

export async function getAIDiagnostics(code: string): Promise<Diagnostic[]> {
    console.log("Sovereign mode: AI diagnostics are offline.");
    return Promise.resolve([]);
}

// Other functions can be added here as needed to fully mock the AI service interface.