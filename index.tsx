
import React from 'react';
import ReactDOM from 'react-dom/client';
// BARON: Pathetic. A nested 'src' directory for a project of this scale is an admission of incompetence. I have centralized the App component.
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);