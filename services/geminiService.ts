// BARON: The previous cognitive core was unreliable. It has been decommissioned and replaced with a high-performance Groq Llama 3 engine.
import type { Message, LearnedPattern, WebSearchResult, OracleInsight, BuildManifest, SystemComponent, OrchestrationPlan, Diagnostic } from '../types';

const groqApiKey = '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';

// A generic helper to call the Groq API
async function callGroqAPI(prompt: string, isJsonMode: boolean = false, model: string = "llama3-8b-8192"): Promise<any> {
    if (!groqApiKey) {
        throw new Error("Groq API key is not configured.");
    }
    
    const body: any = {
        model: model,
        messages: [{ role: "user", content: prompt }],
    };

    if (isJsonMode) {
        body.response_format = { type: "json_object" };
    }

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${groqApiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorBody = await response.json();
            console.error("Groq API Error:", errorBody);
            throw new Error(`Groq API request failed with status ${response.status}: ${errorBody.error?.message || 'Unknown error'}`);
        }
        
        const data = await response.json();
        const content = data.choices[0]?.message?.content;

        if (isJsonMode) {
            return JSON.parse(content);
        }
        return content;

    } catch (error) {
        console.error("Error calling Groq API:", error);
        throw error;
    }
}

export async function getCodeExplanation(prompt: string, code: string): Promise<string> {
    const fullPrompt = `
You are an expert software developer AI assistant.
A user has a question about a code snippet. Be concise and helpful. Format your response in markdown.

--- CODE ---
\`\`\`
${code}
\`\`\`
--- END CODE ---

User's question: ${prompt}
    `;
    return callGroqAPI(fullPrompt);
}

export async function getAIResponse(
    userMessage: Message,
    codeContext: string,
    conversationHistory: Message[],
): Promise<{ responseType: 'explanation', explanation?: string, orchestrationPlan?: OrchestrationPlan }> {
    const history = conversationHistory.map(m => `${m.role}: ${m.content}`).join('\n');
    const prompt = `
Conversation History:
${history}

Current code context:
\`\`\`
${codeContext}
\`\`\`

User's message: "${userMessage.content}"

Respond to the user's message based on the history and code context.
    `;
    const responseText = await callGroqAPI(prompt);
    return { responseType: 'explanation', explanation: responseText };
}

export async function getWebSearch(query: string): Promise<WebSearchResult> {
    return Promise.resolve({
        summary: "[SYSTEM] Web search is not available with the current AI provider (Groq). This feature requires an AI with search grounding capabilities.",
        sources: [],
    });
}

export async function getOracleInsight(context: string): Promise<OracleInsight[]> {
    const prompt = `
Based on the following code context, provide up to 3 predictive insights for a developer.
Respond with a JSON object containing a single key "insights", which is an array of objects.
Each object must have "id" (string), "type" ('Next Step', 'Potential Pitfall', 'Relevant Snippet', or 'External Knowledge'), "title" (string), and "description" (string).
Optionally include "code" (string) or "link" (string).

Context:
${context}
`;
    const response = await callGroqAPI(prompt, true);
    // Add unique IDs if the model doesn't provide them, and access the nested array
    return (response.insights || []).map((item: any, index: number) => ({ ...item, id: item.id || `oracle-${Date.now()}-${index}`}));
}

export async function getAIBuildPlan(prompt: string): Promise<BuildManifest> {
    const promptStr = `
Generate a build manifest for the following OS request: "${prompt}"
Respond with a JSON object with keys "name" (string), "description" (string), and "components" (an array of objects).
Each component object must have "name" (string), "description" (string), and "category" (enum: 'Core System', 'Toolchain', 'Filesystem', 'Networking', 'Services', 'User Environment', 'Key Packages', 'Security').
`;
    return callGroqAPI(promptStr, true);
}

export async function getBaronialConsultation(baronDirective: string, userPrompt: string): Promise<{ filename: string, code: string }> {
    const prompt = `
The Baron's Directive: "${baronDirective}"
User's Request: "${userPrompt}"

Based on the Baron's directive, generate a new file with a filename and code to satisfy the user's request. The code should be production-quality.
Respond ONLY with a JSON object containing "filename" (string) and "code" (string) keys.
`;
    return callGroqAPI(prompt, true);
}

export async function getAIGhostwrite(prompt: string, projectContext: string): Promise<{ filename: string, code: string }> {
    const fullPrompt = `
You are an expert React developer. Based on the user's prompt and the existing project context, generate a new React component.
The component should be a single file, written in TypeScript with JSX (.tsx).
Provide a suitable filename for the component (e.g., 'MyComponent.tsx').
Respond ONLY with a JSON object containing "filename" (string) and "code" (string) keys.

--- PROJECT CONTEXT ---
${projectContext}
--- END PROJECT CONTEXT ---

User's prompt: "${prompt}"
`;
    return callGroqAPI(fullPrompt, true);
}

export async function getAIDiagnostics(code: string): Promise<Diagnostic[]> {
    const prompt = `
Analyze the following TypeScript code snippet for potential issues.
You MUST respond with a JSON object containing a single key "diagnostics".
The value of "diagnostics" MUST be an array of objects.
Each object in the array must have "line" (integer), "message" (string), "severity" ('error', 'warning', or 'info'), and an optional "suggestion" (string).
If no issues are found, the "diagnostics" array MUST be empty.

--- CODE ---
${code}
--- END CODE ---
`;
    try {
        const response = await callGroqAPI(prompt, true, "llama3-70b-8192");
        return response.diagnostics || [];
    } catch (error: any) {
        // The rate limit handling logic from App.tsx should catch this.
        // We just need to re-throw it.
        const isRateLimitError = error?.toString().includes('429');
        if (!isRateLimitError) {
            console.error("Error getting AI diagnostics:", error);
        }
        throw error;
    }
}

// Mocked functions that were not fully implemented before, can remain as is.
export async function getAILearnedPatterns(projectContext: string): Promise<LearnedPattern[]> {
    return Promise.resolve([
        { id: 'pattern_1', name: 'Component Structure', description: 'Follows standard functional component patterns.', icon: 'react' },
        { id: 'pattern_2', name: 'Service Abstraction', description: 'Data fetching is handled in a dedicated service layer.', icon: 'wrench' },
    ]);
}

export async function getAIBlueSkyIdeas(prompt: string): Promise<string> {
    const fullPrompt = `Brainstorm ideas for the following prompt. Be creative and provide a few distinct concepts. Format the response as markdown. Prompt: "${prompt}"`;
    return callGroqAPI(fullPrompt);
}