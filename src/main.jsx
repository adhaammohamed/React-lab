import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ConterContextProvide from './Context/ConterContext';
import  TokenContextProvider  from './Context/TokenContext';
import { Provider } from 'react-redux';
import { store } from './redux/store.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <ConterContextProvide>
        <TokenContextProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </TokenContextProvider>
    </ConterContextProvide>
  </StrictMode>,
)
