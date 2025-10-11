import React from 'react';

export type IconName = 'logo' | 'file' | 'addFile' | 'folder' | 'folderOpen' | 'react' | 'js' | 'python' | 'json' | 'markdown' | 'send' | 'sparkle' | 'play' | 'user' | 'users' | 'gitBranch' | 'sync' | 'bell' | 'check' | 'close' | 'command' | 'kernel' | 'git' | 'magic' | 'save' | 'package' | 'lightbulb' | 'wrench' | 'ghostwriter' | 'dna' | 'changelog' | 'shield' | 'bolt' | 'lock' | 'chevronDown' | 'chevronRight' | 'cpu' | 'hammer' | 'aegis' | 'brain' | 'orchestrate' | 'mindmap' | 'heart-circuit' | 'bug' | 'microphone' | 'image' | 'upload' | 'baron' | 'cloud' | 'palette' | 'search' | 'oracle' | 'rocket' | 'history' | 'ellipsis' | 'keyboard' | 'vault' | 'crosshair' | 'terminal' | 'contribution' | 'copy' | 'download' | 'gear' | 'logbook' | 'dock' | 'architect' | 'menu';

interface IconProps {
  name: IconName;
  className?: string;
  title?: string;
}

const ICONS: Record<IconName, React.ReactNode> = {
  logo: <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.5l3 3m0 0l3-3m-3 3v14m5-11.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />,
  file: <><path d="M5 3h10l4 4v12a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" /><path d="M15 3v4h-4" /><rect x="7" y="14" width="10" height="5" rx="1" /></>,
  addFile: <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
  folder: <><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" /><circle cx="12" cy="12.5" r=".5" fill="currentColor" /></>,
  folderOpen: <path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-8a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2zM5 8l1.5-3h11L19 8m-8 6h.01" />,
  react: <path strokeLinecap="round" strokeLinejoin="round" d="M14.553 15.129a.5.5 0 01.447.276l.053.098a6.5 6.5 0 001.996 9.006.5.5 0 01-.276.953l-.098-.027a6.5 6.5 0 00-9.006-1.996.5.5 0 01-.447-.276l-.053-.098a6.5 6.5 0 00-1.996-9.006.5.5 0 01.276-.953l.098.027a6.5 6.5 0 009.006 1.996zM12 17.25a.75.75 0 100-1.5.75.75 0 000 1.5z" transform="rotate(30 12 12)" />,
  js: <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 15h-2v-5h2v5zm4 0h-2v-3c0-1.11-.89-2-2-2h-2v-2h4v7z" />,
  python: <path strokeLinecap="round" strokeLinejoin="round" d="M11.5 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM12.5 12.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" transform="rotate(45 12 12)" />,
  json: <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H7a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2m-4 0a2 2 0 00-2-2h-2a2 2 0 00-2 2m4 0a2 2 0 012-2h2a2 2 0 012 2m0 0h2v-2m-4 0v-2" />,
  markdown: <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M3 8h18M3 12h18M3 16h18M3 20h18" />,
  send: <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />,
  sparkle: <path d="M9.5 2.5a4.5 4.5 0 11-1.5 8.7V20h8v-8.8a4.5 4.5 0 11-1.5-8.7M12 12V2" />,
  play: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="2" /><path d="M12 14v3" /></>,
  user: <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
  users: <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-2.212M12 20v-5m0 0a3 3 0 100-6 3 3 0 000 6zM2 20h5v-2a3 3 0 015.356-2.212" />,
  gitBranch: <path strokeLinecap="round" strokeLinejoin="round" d="M6 3v12m0 0a3 3 0 106 0m-6 0a3 3 0 116 0m-6 0h6m6 6V9a3 3 0 00-3-3H9" />,
  sync: <path strokeLinecap="round" strokeLinejoin="round" d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />,
  bell: <path strokeLinecap="round" strokeLinejoin="round" d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9zM13.73 21a2 2 0 01-3.46 0" />,
  check: <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />,
  close: <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />,
  command: <path strokeLinecap="round" strokeLinejoin="round" d="M10 9a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V9z" />,
  kernel: <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />,
  git: <path strokeLinecap="round" strokeLinejoin="round" d="M2.8 14.8l7.4 7.4 7.4-7.4M12 2.8v19.4" />,
  magic: <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l3.05 6.4L11 5l-2.95 6.4L5 3zM14 10l3.05 6.4L20 12l-2.95 6.4L14 10zM19 19l-3.05-6.4L13 19l2.95-6.4L19 19z" />,
  save: <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />,
  package: <path strokeLinecap="round" strokeLinejoin="round" d="M20 20a2 2 0 01-2 2H6a2 2 0 01-4-2V9.414a2 2 0 01.586-1.414l5.414-5.414A2 2 0 0111.414 2H18a2 2 0 012 2v4M9 12h6" />,
  lightbulb: <path strokeLinecap="round" strokeLinejoin="round" d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" />,
  wrench: <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />,
  ghostwriter: <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a5 5 0 00-5 5c0 2.21 1.45 4.1 3.44 4.73A8.994 8.994 0 002.25 21h19.5c0-4.42-3.13-8.12-7.19-8.27A5 5 0 0012 2zM9 11c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />,
  dna: <path strokeLinecap="round" strokeLinejoin="round" d="M4.3 4.3c-1.7 1.7-1.7 4.5 0 6.2s4.5 1.7 6.2 0l1.4-1.4c1.7-1.7 1.7-4.5 0-6.2s-4.5-1.7-6.2 0l-1.4 1.4zm9.2 9.2c-1.7 1.7-1.7 4.5 0 6.2s4.5 1.7 6.2 0 1.7-4.5 0-6.2-4.5-1.7-6.2 0zm-5-5l5 5" />,
  changelog: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
  shield: <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  bolt: <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
  lock: <path strokeLinecap="round" strokeLinejoin="round" d="M18 10a6 6 0 10-12 0v4H4v8h16v-8h-2v-4zM12 2a4 4 0 00-4 4v4h8v-4a4 4 0 00-4-4z" />,
  chevronDown: <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />,
  chevronRight: <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />,
  cpu: <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm5 0V3m6 2V3M8 21v-2m6 2v-2M3 8h2m14 0h2M3 15h2m14 0h2m-6-5h-4v4h4v-4z" />,
  hammer: <><path d="M5 15v-5h14v5" /><path d="M3 15h18v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3z" /><path d="M18.5 10l-7-7-1.5 1.5 7 7 1.5-1.5z" /></>,
  aegis: <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM12 8v7m-3-3.5h6" />,
  brain: <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 2.5a4.5 4.5 0 11-1.5 8.7V20h8v-8.8a4.5 4.5 0 11-1.5-8.7M12 12V2" />,
  orchestrate: <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-3m0-6V3m-4 10a2 2 0 104 0 2 2 0 00-4 0zm-4 4a2 2 0 104 0 2 2 0 00-4 0zm8 0a2 2 0 104 0 2 2 0 00-4 0z" />,
  mindmap: <path strokeLinecap="round" strokeLinejoin="round" d="M4 12a3 3 0 106 0 3 3 0 00-6 0zm10 0a3 3 0 106 0 3 3 0 00-6 0zM7 12h10M7 12a5 5 0 01-5-5m5 5a5 5 0 00-5 5m15-5a5 5 0 015 5m-5-5a5 5 0 005-5" />,
  'heart-circuit': <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35zM2 9h2m16 0h2m-8-7v2m0 16v2m-6.5-6.5l-1.4-1.4m11.3 0l-1.4 1.4M6.1 6.1l1.4 1.4m9.1 9.1l1.4-1.4" />,
  bug: <path strokeLinecap="round" strokeLinejoin="round" d="M12 20a8 8 0 01-8-8V8l8-4 8 4v4a8 8 0 01-8 8zm-4-9h8m-8 4h8m-7-8l-2-2m10 0l2-2m-2 12l2 2m-10 0l-2 2" />,
  microphone: <><rect x="7" y="2" width="10" height="14" rx="2" /><path d="M7 9H17M7 12H17M12 16v6" /><path d="M8 22h8" /></>,
  image: <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79zM21 12a9 9 0 00-9-9" />,
  upload: <path strokeLinecap="round" strokeLinejoin="round" d="M12 11V3m0 8l4-4m-4 4L8 7m-6 9v2a2 2 0 002 2h12a2 2 0 002-2v-2" />,
  baron: <path strokeLinecap="round" strokeLinejoin="round" d="M5 15v-2a2 2 0 012-2h10a2 2 0 012 2v2m-8-8l-2 2h8l-2-2M9 3v3m6-3v3m-6 8h2m-2 2h2m4-2h2m-2 2h2" />,
  cloud: <path strokeLinecap="round" strokeLinejoin="round" d="M18 10h-1.26A8 8 0 104 16.25" />,
  palette: <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.5c5.25 0 9.5 4.25 9.5 9.5s-4.25 9.5-9.5 9.5S2.5 17.25 2.5 12 6.75 2.5 12 2.5zm0 2.5a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
  search: <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
  oracle: <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0zM12 22v-2" />,
  rocket: <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 18H12a2 2 0 01-2-2V7.5a2.5 2.5 0 015 0V16a2 2 0 01-2 2zm-4-13.5c-1.333-1-2-2.333-2-4V.5m2 4V.5m0 3.5c1.333-1 2-2.333-2-4V.5m-2 4c0 1.667.667 3 2 4m-2-4c-.667 1-1.333 2-2 4m10 5.5h-1.5m1.5 0h1.5m-1.5 0v-1.5m0 1.5v1.5M6 12H4.5m1.5 0H7.5m-1.5 0V10.5m0 1.5v1.5" />,
  history: <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
  ellipsis: <path strokeLinecap="round" strokeLinejoin="round" d="M12 12h.01M19 12h.01M5 12h.01" />,
  keyboard: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 9h.01M11 9h.01M15 9h.01M7 13h.01M11 13h.01M15 13h.01M7 17h10" /></>,
  vault: <><rect x="3" y="8" width="18" height="12" rx="2" /><path d="M7 8v-2a5 5 0 0110 0v2" /><circle cx="12" cy="14" r="1.5" /></>,
  crosshair: <><circle cx="12" cy="12" r="8" /><path d="M12 2v4m0 12v4M2 12h4m12 0h4" /></>,
  terminal: <><path d="M4 17l6-6-6-6" /><path d="M12 19h8" /></>,
  contribution: <><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19 10h3m-1.5-1.5v3" /></>,
  copy: <><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></>,
  download: <path strokeLinecap="round" strokeLinejoin="round" d="M12 11V19M12 19l4-4m-4 4L8 15m-6-4v2a2 2 0 002 2h12a2 2 0 002-2v-2" />,
  gear: <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM12 15a3 3 0 100-6 3 3 0 000 6z" />,
  logbook: <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
  dock: <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18v18H3V3zm0 13h18M9 3v13" />,
  architect: <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />,
  menu: <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />,
};

export const Icon: React.FC<IconProps> = ({ name, className, title }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`flex-shrink-0 ${className}`}
      aria-label={title || name}
    >
      {ICONS[name]}
    </svg>
  );
};
