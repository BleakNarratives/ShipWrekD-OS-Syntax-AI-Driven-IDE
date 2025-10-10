import React from 'react';

export type IconName = 'logo' | 'file' | 'addFile' | 'folder' | 'folderOpen' | 'react' | 'js' | 'python' | 'json' | 'markdown' | 'send' | 'sparkle' | 'play' | 'user' | 'users' | 'gitBranch' | 'sync' | 'bell' | 'check' | 'close' | 'command' | 'kernel' | 'git' | 'magic' | 'save' | 'package' | 'lightbulb' | 'wrench' | 'ghostwriter' | 'dna' | 'changelog' | 'shield' | 'bolt' | 'lock' | 'chevronDown' | 'chevronRight' | 'cpu' | 'hammer' | 'aegis' | 'brain' | 'orchestrate' | 'mindmap' | 'heart-circuit' | 'bug' | 'microphone' | 'image' | 'upload' | 'baron' | 'cloud' | 'palette';

interface IconProps {
  name: IconName;
  className?: string;
  title?: string;
}

const ICONS: Record<IconName, React.ReactNode> = {
  logo: <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.5l3 3m0 0l3-3m-3 3v14m5-11.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />,
  file: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
  addFile: <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
  folder: <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />,
  folderOpen: <path strokeLinecap="round" strokeLinejoin="round" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />,
  react: <path strokeLinecap="round" strokeLinejoin="round" d="M14.553 15.129a.5.5 0 01.447.276l.053.098a6.5 6.5 0 001.996 9.006.5.5 0 01-.276.953l-.098-.027a6.5 6.5 0 00-9.006-1.996.5.5 0 01-.447-.276l-.053-.098a6.5 6.5 0 00-1.996-9.006.5.5 0 01.276-.953l.098.027a6.5 6.5 0 009.006 1.996zM12 17.25a.75.75 0 100-1.5.75.75 0 000 1.5z" transform="rotate(30 12 12)" />,
  js: <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 15h-2v-5h2v5zm4 0h-2v-3c0-1.11-.89-2-2-2h-2v-2h4v7z" />,
  python: <path strokeLinecap="round" strokeLinejoin="round" d="M11.5 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM12.5 12.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" transform="rotate(45 12 12)" />,
  json: <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H7a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2m-4 0a2 2 0 00-2-2h-2a2 2 0 00-2 2m4 0a2 2 0 012-2h2a2 2 0 012 2m0 0h2v-2m-4 0v-2" />,
  markdown: <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M3 8h18M3 12h18M3 16h18M3 20h18" />,
  send: <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />,
  sparkle: <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l3.05 6.4L11 5l-2.95 6.4L5 3zM14 10l3.05 6.4L20 12l-2.95 6.4L14 10zM19 19l-3.05-6.4L13 19l2.95-6.4L19 19z" />,
  play: <path strokeLinecap="round" strokeLinejoin="round" d="M6 4l15 8-15 8V4z" />,
  user: <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
  users: <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-2.212M12 20v-5m0 0a3 3 0 100-6 3 3 0 000 6zM2 20h5v-2a3 3 0 015.356-2.212" />,
  gitBranch: <path strokeLinecap="