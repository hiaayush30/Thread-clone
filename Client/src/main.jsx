import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { store } from './redux/store.js'
import { HelmetProvider } from 'react-helmet-async';

const helmetContext={};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider context={helmetContext}>
        <App />
      </HelmetProvider>
    </Provider>
  </StrictMode>,
)
