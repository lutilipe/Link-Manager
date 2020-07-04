import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'
import { Provider } from 'react-redux'
import Store from './store'
import App from './App'
import TokenRefresh from './components/TokenRefresh'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <TokenRefresh />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
