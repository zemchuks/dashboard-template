import React from 'react'
import ReactDOM from 'react-dom/client'
// import { Toaster } from "react-hot-toast"
import App from './App.jsx'
import { Provider } from "react-redux";
import store from './redux/store.js'
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'

const theme = createTheme({});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <MantineProvider theme={theme}>
          <App />
          <Toaster richColors position="top-right" toastOptions={{ duration: 3000 }} />
        </MantineProvider>
      </Provider>
    </BrowserRouter>

  </React.StrictMode>
)
