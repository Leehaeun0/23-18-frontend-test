import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { worker } from '../server/mockWorker';

worker
  .start()
  .then(() => {
    ReactDOM.createRoot(document.getElementById('app')!).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  })
  .catch(console.error);
