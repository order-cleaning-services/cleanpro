import React from 'react'
import ReactDOM from 'react-dom/client'

import './assets/styles/GlobalStyle.scss'

import { RouterProvider } from 'react-router-dom'
import router from './routes/routes'

import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>,
)
