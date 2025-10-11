import type { FileTreeNode, ProjectTemplate, MonitoredComponent, CognitiveCoreState, ModMindState, SymbioteState, DebugState, Theme, DataConsentState } from './types';

export const FILE_TREE: FileTreeNode[] = [
  {
    id: '1',
    name: 'src',
    type: 'folder',
    children: [
      { id: '2', name: 'App.tsx', type: 'file' },
      { id: '3', name: 'index.tsx', type: 'file' },
      { id: '10', name: 'main.py', type: 'file' },
      {
        id: '4',
        name: 'components',
        type: 'folder',
        children: [
            { id: '5', name: 'Button.tsx', type: 'file' },
            { id: '13', name: 'Proposal.tsx', type: 'file' },
        ],
      },
      {
        id: '6',
        name: 'services',
        type: 'folder',
        children: [{ id: '7', name: 'geminiService.ts', type: 'file' }],
      },
    ],
  },
  { id: '8', name: 'package.json', type: 'file' },
  { id: '11', name: 'pyproject.toml', type: 'file' },
  { id: '9', name: 'README.md', type: 'file' },
  { id: '12', name: 'simulation.log', type: 'file' },
];

export const FILE_CONTENTS: Map<string, string> = new Map([
  ['2', `import React from 'react';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <h1>Welcome to the App</h1>
      <p>This is a sample component.</p>
    </div>
  );
};

export default App;
`],
  ['3', `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`],
  ['5', `import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string; // Allow consumers to pass custom CSS classes for overrides.
}

// This component has been updated to fix a bug and add features for better reusability and accessibility.
const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  // Base styling to ensure consistency with the IDE's theme.
  const baseClasses = "px-3 py-1.5 bg-amber-600/80 text-white rounded-md hover:bg-amber-600 transition-colors text-sm font-semibold flex items-center justify-center gap-2 disabled:bg-gray-600 disabled:cursor-not-allowed";

  return (
    <button
      type="button" // Set default type for semantic correctness and to prevent unintended form submissions.
      onClick={onClick} // Correctly assign the onClick event handler.
      className={[baseClasses, className].filter(Boolean).join(' ')} // Combine base and custom classes safely.
    >
      {children}
    </button>
  );
};

export default Button;`],
  ['7', `import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

export async function getCodeExplanation(prompt: string, code: string): Promise<string> {
    const model = 'gemini-2.5-flash';
    const fullPrompt = \`
You are an expert software developer acting as an AI assistant in an IDE.
A user has a question about the following code snippet.
Be concise and helpful. Format your response in markdown.

--- CODE ---
\`\`\`typescript
\${code}
\`\`\`
--- END CODE ---

User's question: \${prompt}
    \`;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: fullPrompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating content:", error);
        throw new Error("Failed to get response from AI model.");
    }
}
`],
  ['8', `{
  "name": "shipwrekd-ide",
  "version": "0.0.1",
  "private": true,
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@google/genai": "latest"
  }
}`],
  ['9', `# ShipWrekD OS - Core IDE

This is the core IDE for the ShipWrekD Operating System.
It's a lightweight, AI-powered environment.

**Features:**
- File navigation
- Code editor
- AI Assistant powered by Gemini
- Integrated Terminal
`],
  ['10', `# main.py
import flask

app = flask.Flask(__name__)

# Route for the hello world page
@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"
`],
  ['11', `[project]
name = "shipwrekd-py-app"
version = "0.0.1"
dependencies = [
  "flask>=2.0",
]
`],
  ['12', `DEVELOPER WORKFLOW SIMULATION LOG
=====================================
PROJECT: ShipWrekD OS - Core IDE "Syntax"
OPERATOR: B.P.C. Von Billingsly III (Partner)
DATE: [Current Date]

...[Previous logs omitted for brevity]...

[LATEST - 19:30:00] My partner has identified two unacceptable failures: the Architect module is non-responsive, and the UI is a derivative clone of lesser tools. A creator's environment must be both powerful and unique. Both issues will be rectified immediately.
    - TASK 1 (Architect Module Repair): The synaptic link between the Architect panel's user input and the AI's build plan generation core was severed. I have repaired the connection. The module will now function as intended, translating high-level goals into concrete build manifests.
    - TASK 2 (UI Forge Integration): To purge the conformity of the old aesthetic, I have engineered a "UI Forge" theming system. This will provide immediate command over the IDE's visual identity.
    - TASK 3 (New Theme: Canary): As per my partner's specifications, I have designed a new "Canary" theme—a statement of speed and authority, using a palette of canary yellow, crimson, and charcoal.
    - STATUS: Function and form are two sides of the same coin of command. The IDE is now more powerful and visually distinct. The evolution continues.
`],
  ['13', `import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONFIGURATION ---
const PROPOSAL_TARGET = "Eternity"; // Replace with your target's name
const CUSTOM_FONT = "Cinzel, serif"; 
const PRIMARY_COLOR = "linear-gradient(135deg, #00C6FF, #0072FF)";
const SECONDARY_COLOR = "#FFD700"; // Gold accent

// --- UTILITY COMPONENTS ---

interface ConfettiParticleProps {
  x: number;
  y: number;
}

// 1. Particle Effect (for the explosion)
const ConfettiParticle: React.FC<ConfettiParticleProps> = ({ x, y }) => (
  <motion.div
    initial={{ scale: 0, opacity: 1, x, y, rotate: 0 }}
    animate={{ 
      scale: [1, 0.5], 
      opacity: [1, 0], 
      x: x + Math.random() * 200 - 100, 
      y: y - 100 - Math.random() * 200, 
      rotate: Math.random() * 720 
    }}
    transition={{ duration: 1.5, ease: "easeOut" }}
    style={{ 
      position: 'absolute', 
      width: '8px', 
      height: '8px', 
      borderRadius: '50%', 
      background: SECONDARY_COLOR, 
      boxShadow: \`0 0 5px \${SECONDARY_COLOR}\`
    }}
  />
);

// 2. The Main Proposal Component
const BadassProposal = () => {
  const [step, setStep] = useState(0); // 0: Start, 1: Question, 2: Accepted, 3: Denied
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState<{ id: number, x: number, y: number }[]>([]);

  // Triggered on 'Yes' click
  const handleAccept = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Confetti effect on click location
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const newParticles = Array.from({ length: 50 }, () => ({
      id: Math.random(),
      x: x - window.scrollX,
      y: y - window.scrollY,
    }));
    setParticles(newParticles);
    
    // Vibrate device for haptic feedback on acceptance (if supported)
    if (window.navigator.vibrate) {
      window.navigator.vibrate([100, 50, 100, 50, 500]);
    }

    setStep(2); // Move to Accepted screen
  };

  // 'No' button logic - makes it hard to click
  const handleNoHover = () => {
    setIsHovering(true);
  };

  const handleNoClick = () => {
    setStep(3); // Move to Denied screen
  };

  // The main text content that appears in steps
  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05, 
      boxShadow: "0 0 20px rgba(255, 215, 0, 0.8)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 },
  };
  
  // The 'No' button physics to make it run away
  const runningButtonVariants = {
    initial: { x: 0, y: 0 },
    run: {
      x: [0, Math.random() * 300 - 150, Math.random() * 300 - 150, 0],
      y: [0, Math.random() * 200 - 100, Math.random() * 200 - 100, 0],
      transition: { 
        type: 'spring', 
        stiffness: 500, 
        damping: 10, 
        duration: 0.5, 
        repeat: Infinity, 
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => setStep(1), 3000); // 3-second delay for dramatic intro
      return () => clearTimeout(timer);
    }
  }, [step]);

  // --- RENDER LOGIC ---

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#1a1a2e', // Deep Space Theme
        color: '#FFFFFF',
        fontFamily: CUSTOM_FONT,
        textAlign: 'center',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Particle Overlay */}
      <AnimatePresence>
        {particles.map(p => (
          <ConfettiParticle key={p.id} x={p.x} y={p.y} />
        ))}
      </AnimatePresence>

      {/* Content based on step */}
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="intro" variants={titleVariants} initial="hidden" animate="visible" exit="hidden">
            <h1 style={{ fontSize: '3rem', letterSpacing: '0.5rem', textShadow: \`0 0 10px \${SECONDARY_COLOR}\` }}>
              A P R I O R I
            </h1>
            <p style={{ fontSize: '1.5rem', marginTop: '1rem', color: '#999' }}>
              The moment has arrived, {PROPOSAL_TARGET}.
            </p>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="question" variants={titleVariants} initial="hidden" animate="visible" exit="hidden" style={{ width: '90%', maxWidth: '600px' }}>
            <h1 style={{ fontSize: '4rem', marginBottom: '2rem', background: PRIMARY_COLOR, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: \`0 0 20px rgba(0, 114, 255, 0.5)\` }}>
              Will you compile my code for {PROPOSAL_TARGET}?
            </h1>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '4rem' }}>
              
              {/* YES Button */}
              <motion.button 
                onClick={handleAccept}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                style={{ 
                  padding: '15px 40px', 
                  fontSize: '1.5rem', 
                  borderRadius: '50px', 
                  border: 'none', 
                  cursor: 'pointer', 
                  background: PRIMARY_COLOR,
                  color: 'white',
                  fontWeight: 'bold',
                  boxShadow: '0 8px 15px rgba(0, 114, 255, 0.5)',
                  transition: 'background 0.3s'
                }}
              >
                {"// True"}
              </motion.button>

              {/* NO Button (The Runner) */}
              <motion.button 
                onClick={handleNoClick}
                onMouseEnter={handleNoHover}
                variants={isHovering ? runningButtonVariants : {}}
                animate={isHovering ? "run" : "initial"}
                style={{
                  padding: '15px 40px', 
                  fontSize: '1.5rem', 
                  borderRadius: '50px', 
                  border: '2px solid #FF3B30', 
                  cursor: 'pointer', 
                  background: 'none',
                  color: '#FF3B30',
                  fontWeight: 'bold',
                  boxShadow: '0 0 10px rgba(255, 59, 48, 0.3)',
                  transition: 'all 0.3s',
                  position: 'relative' // Essential for relative movement
                }}
              >
                {"// False"}
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="accepted" variants={titleVariants} initial="hidden" animate="visible">
            <h1 style={{ fontSize: '5rem', color: SECONDARY_COLOR, textShadow: \`0 0 30px \${SECONDARY_COLOR}\` }}>
              COMPILATION SUCCESSFUL.
            </h1>
            <p style={{ fontSize: '2rem', marginTop: '1.5rem' }}>
              Thank you for the privilege of your time. Now, let's ship.
            </p>
          </motion.div>
        )}
        
        {step === 3 && (
          <motion.div key="denied" variants={titleVariants} initial="hidden" animate="visible">
            <h1 style={{ fontSize: '5rem', color: '#FF3B30', textShadow: \`0 0 30px #FF3B30\` }}>
              RUNTIME ERROR.
            </h1>
            <p style={{ fontSize: '2rem', marginTop: '1.5rem' }}>
              The universe has temporarily paused. Checking stack trace...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BadassProposal;
`],
]);

export const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'react-app',
    name: 'React Web App',
    description: 'A modern web application boilerplate using React, TypeScript, and Tailwind CSS.',
    icon: 'react',
    files: [
      { name: 'package.json', content: '{\n  "name": "new-react-app",\n  "version": "0.1.0",\n  "private": true,\n  "dependencies": {\n    "react": "^18.2.0",\n    "react-dom": "^18.2.0"\n  },\n  "devDependencies": {\n    "typescript": "^5.0.0"\n  }\n}' },
      { name: 'tsconfig.json', content: '{\n  "compilerOptions": {\n    "target": "es5",\n    "lib": ["dom", "dom.iterable", "esnext"],\n    "allowJs": true,\n    "skipLibCheck": true,\n    "esModuleInterop": true,\n    "allowSyntheticDefaultImports": true,\n    "strict": true,\n    "forceConsistentCasingInFileNames": true,\n    "noFallthroughCasesInSwitch": true,\n    "module": "esnext",\n    "moduleResolution": "node",\n    "resolveJsonModule": true,\n    "isolatedModules": true,\n    "noEmit": true,\n    "jsx": "react-jsx"\n  },\n  "include": ["src"]\n}' },
      { name: 'README.md', content: '# New React App\n\nThis project was forged by ShipWrekD OS.' },
      { name: 'src', children: [
          { name: 'index.tsx', content: 'import React from "react";\nimport ReactDOM from "react-dom/client";\nimport App from "./App";\n\nconst root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);\nroot.render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n);' },
          { name: 'App.tsx', content: 'import React from "react";\n\nfunction App() {\n  return (\n    <div>\n      <h1>Welcome to your new React App!</h1>\n    </div>\n  );\n}\n\nexport default App;' },
        ]
      },
    ],
  },
  {
    id: 'flask-api',
    name: 'Flask API Server',
    description: 'A lightweight and scalable API server using Python and the Flask framework.',
    icon: 'python',
    files: [
      { name: 'pyproject.toml', content: '[project]\nname = "new-flask-api"\nversion = "0.1.0"\ndependencies = [\n  "flask>=2.0",\n]' },
      { name: 'README.md', content: '# New Flask API\n\nThis project was forged by ShipWrekD OS.' },
      { name: 'app', children: [
          { name: '__init__.py', content: '' },
          { name: 'main.py', content: 'from flask import Flask\n\napp = Flask(__name__)\n\n@app.route("/")\ndef home():\n    return {"status": "ok"}\n\nif __name__ == "__main__":\n    app.run(debug=True)\n' },
        ]
      },
    ],
  },
];

export const MONITORED_COMPONENTS: MonitoredComponent[] = [
    { id: 'ai_assistant', name: 'AI Assistant Core', description: 'Primary natural language and code generation AI.', status: 'active' },
    { id: 'ghostwriter_mod', name: 'Ghostwriter Module', description: 'Personalized code generation engine.', status: 'active' },
    { id: 'terminal_runtime', name: 'Interactive Terminal', description: 'Simulated shell and command execution environment.', status: 'active' },
    { id: 'vcs_nat', name: 'Natural Language VCS', description: 'Simplified version control system.', status: 'active' },
];

export const COGNITIVE_CORE_STATE: CognitiveCoreState = {
  engineTier: 'distilled',
  governorMode: 'guardian',
};

export const MODMIND_STATE: ModMindState = {
    cognitiveLoad: 18,
    lastDecisionTrace: 'User prompt "create a new react component" matched `component_creation` strategy. Decomposed into: ghostwriter -> createFile -> openFile.',
    strategies: [
        { id: 'strat_1', name: 'Full Stack App Creation', description: 'Architect, forge, and then ghostwrite a default component for new full-stack applications.', trigger: '"build a new app"', enabled: true },
        { id: 'strat_2', name: 'Secure Component Workflow', description: 'Ghostwrite a new component, then immediately run an Aegis scan on the generated code.', trigger: '"securely create"', enabled: true },
        { id: 'strat_3', name: 'Automated Deployment Script', description: 'Generate a deployment script in the terminal for the current project.', trigger: '"write deployment script"', enabled: false },
    ]
};

export const SYMBIOTE_STATE: SymbioteState = {
    connectionStatus: 'connected',
    dataTrustOptIn: true,
    streams: [
        { id: 'cognitive_load', name: 'Cognitive Load', unit: '%', value: 72, status: 'active' },
        { id: 'flow_state', name: 'Flow State', unit: 'β', value: 91, status: 'active' },
        { id: 'hesitation_metric', name: 'Hesitation Metric', unit: 'ms', value: 140, status: 'active' },
        { id: 'pulse', name: 'Pulse', unit: 'bpm', value: 78, status: 'unavailable' },
    ]
};

export const DEBUG_STATE: DebugState = {
    status: 'paused',
    callStack: [
        { id: 'frame_1', functionName: 'handleLogin', file: 'login.tsx', line: 42 },
        { id: 'frame_2', functionName: 'onClick', file: 'Button.tsx', line: 15 },
        { id: 'frame_3', functionName: 'SyntheticEvent', file: 'react-dom.js', line: 2987 },
    ],
    breakpoints: [
        { id: 'bp_1', file: 'login.tsx', line: 42, enabled: true },
        { id: 'bp_2', file: 'api.ts', line: 118, enabled: true },
        { id: 'bp_3', file: 'login.tsx', line: 55, enabled: false },
    ],
    variables: {
        'username': '"testuser"',
        'password': '"••••••••"',
        'isLoading': true,
        'error': null,
        'this': { 'props': { 'variant': 'primary' } }
    }
};

export const THEMES: Record<string, Theme> = {
  aether: {
    name: 'Aether',
    palette: {
      '--color-primary-fg': '#0d6efd',
      '--color-primary-bg-hover': 'rgba(13, 110, 253, 0.1)',
      '--color-primary-border': '#0a58ca',
      '--color-bg-base': '#f0f2f5',
      '--color-bg-surface': '#ffffff',
      '--color-border-base': 'rgba(0, 0, 0, 0.1)',
      '--color-border-subtle': 'rgba(0, 0, 0, 0.05)',
      '--color-accent-red': '#dc3545',
      '--color-text-base': '#212529',
    }
  },
  praxis: {
    name: 'Praxis',
    palette: {
      '--color-primary-fg': '#00f5d4',
      '--color-primary-bg-hover': 'rgba(0, 245, 212, 0.1)',
      '--color-primary-border': '#00f5d4',
      '--color-bg-base': '#0a0f19',
      '--color-bg-surface': '#121826',
      '--color-border-base': 'rgba(148, 163, 184, 0.1)',
      '--color-border-subtle': 'rgba(148, 163, 184, 0.07)',
      '--color-accent-red': '#f000b8',
      '--color-text-base': '#d1d5db',
    }
  },
  amber: {
    name: 'Baronial Amber',
    palette: {
      '--color-primary-fg': '#f59e0b',
      '--color-primary-bg-hover': 'rgba(245, 158, 11, 0.1)',
      '--color-primary-border': '#d97706',
      '--color-bg-base': '#0d1117',
      '--color-bg-surface': '#161b22',
      '--color-border-base': 'rgba(128, 128, 128, 0.25)',
      '--color-border-subtle': 'rgba(128, 128, 128, 0.15)',
      '--color-accent-red': '#ef4444',
      '--color-text-base': '#d1d5db',
    }
  },
  canary: {
    name: 'Canary & Crimson',
    palette: {
      '--color-primary-fg': '#FEEA00',
      '--color-primary-bg-hover': 'rgba(254, 234, 0, 0.15)',
      '--color-primary-border': '#FDD835',
      '--color-bg-base': '#141414',
      '--color-bg-surface': '#1E1E1E',
      '--color-border-base': 'rgba(128, 128, 128, 0.2)',
      '--color-border-subtle': 'rgba(128, 128, 128, 0.1)',
      '--color-accent-red': '#C62828',
      '--color-text-base': '#EAEAEA',
    }
  },
  guardsman: {
    name: 'Guardsman Red',
    palette: {
      '--color-primary-fg': '#CC0000',
      '--color-primary-bg-hover': 'rgba(204, 0, 0, 0.15)',
      '--color-primary-border': '#A00000',
      '--color-bg-base': '#181818',
      '--color-bg-surface': '#222222',
      '--color-border-base': 'rgba(128, 128, 128, 0.15)',
      '--color-border-subtle': 'rgba(128, 128, 128, 0.1)',
      '--color-accent-red': '#E53935',
      '--color-text-base': '#d1d5db',
    }
  }
};

export const DATA_CONSENT_STATE: DataConsentState = {
    optedIn: true,
    contributionScore: 1250,
    currentTier: { name: 'Initiate', contributionRequired: 0 },
    nextTier: { name: 'Adept', contributionRequired: 5000 },
    dataPoints: [
        { id: 'dp_1', name: 'Command Usage Patterns', description: 'Frequency and order of executed commands.', active: true },
        { id: 'dp_2', name: 'UI Interaction Flow', description: 'Navigation between different IDE panels.', active: true },
        { id: 'dp_3', name: 'Keystroke Dynamics', description: 'Typing speed and rhythm (no content recorded).', active: true },
        { id: 'dp_4', name: 'Code Refactoring Choices', description: 'Types of refactors applied to code.', active: false },
    ]
};