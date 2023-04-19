import React from 'react';
import Button from '@mui/material/Button';
import '@fontsource/roboto/400.css';

import Dashboard from './components/dashboard/Dashboard';
import MainContainer from './components/container/Container';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <MainContainer />
    </BrowserRouter>
  );
}

export default App;
