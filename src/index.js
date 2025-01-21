import React from 'react';
import ReactDOM from 'react-dom/client';  // Use 'react-dom/client' in React 18
import App from './App';
import './index.css';  // Optional: if you are using styles

// Create a root for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the <App /> component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
