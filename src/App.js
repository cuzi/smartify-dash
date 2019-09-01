import React from 'react';
import { SmartifyProvider } from './provider';
import Router from './router';

import 'react-table/react-table.css'
import './App.css';

function App() {
  return (
      <SmartifyProvider>
          <Router />
      </SmartifyProvider>
  );
}

export default App;
