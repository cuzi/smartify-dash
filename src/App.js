import React from 'react';
import { SmartifyProvider } from './provider';
import Router from './router';
import './App.css';

function App() {
  return (
      <SmartifyProvider>
          <Router />
      </SmartifyProvider>
  );
}

export default App;
