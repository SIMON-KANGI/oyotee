import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import store from './features/Store.jsx'
import { Provider } from 'react-redux'
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
  <ChakraProvider>
  <BrowserRouter>
      <App />
      </BrowserRouter>
  </ChakraProvider>
  </Provider>
  </StrictMode>,
)
