import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom' // 1. 라우터 불러오기

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. App을 BrowserRouter로 반드시 감싸야 합니다 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
