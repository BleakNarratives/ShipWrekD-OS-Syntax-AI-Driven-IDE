/**
 * Determines the highlight.js language string from a given filename.
 * @param filename The full name of the file (e.g., 'App.tsx').
 * @returns A string representing the language for syntax highlighting.
 */
export function getLanguageFromFilename(filename: string): string {
    const extension = filename.split('.').pop()?.toLowerCase();
    switch (extension) {
        case 'js': return 'javascript';
        case 'jsx': return 'jsx';
        case 'ts': return 'typescript';
        case 'tsx': return 'tsx';
        case 'py': return 'python';
        case 'json': return 'json';
        case 'md': return 'markdown';
        case 'html': return 'html';
        case 'css': return 'css';
        case 'sh': return 'bash';
        case 'log': return 'plaintext';
        case 'toml': return 'ini';
        default: return 'plaintext';
    }
}
