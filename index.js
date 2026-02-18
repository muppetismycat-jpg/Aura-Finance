
import React from 'https://esm.sh/react@^19.2.4';
import { createRoot } from 'https://esm.sh/react-dom@^19.2.4/client';
import htm from 'https://esm.sh/htm';
import App from './App.js';

const html = htm.bind(React.createElement);

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    html`
      <${React.StrictMode}>
        <${App} />
      <//>
    `
  );
}
