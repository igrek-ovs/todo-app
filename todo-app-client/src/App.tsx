import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import WebSocket from './contexts/WebSocket';
import Routing from './routes/routing';
import { index } from './theme/index';

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <WebSocket>
        <ThemeProvider theme={index}>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Routing />
        </ThemeProvider>
      </WebSocket>
    </StyledEngineProvider>
  );
};

export default App;
