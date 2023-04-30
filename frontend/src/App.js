import React from 'react';
import Button from '@mui/material/Button';
import '@fontsource/roboto/400.css';
import { BrowserRouter } from 'react-router-dom';

import { Dashboard } from './apps'
import { MainContainer } from './apps';

function App() {
  return (
    <BrowserRouter>
        <MainContainer />
    </BrowserRouter>
  );
}

export default App;
