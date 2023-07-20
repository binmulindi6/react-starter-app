import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'material-icons/iconfont/round.css'
import './styles/index.css'
import WebsiteHome from './pages/Home'
import { NavProvider,SessionProvider } from './utilis/Context'
import NotFound from './pages/404'

import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <NavProvider>
    <SessionProvider>
      <Router>
        <div className="w-full flex justify-center">
          {/* Website */}
        {/* <Dashbord> */}
          <Routes>
            <Route path="/" element={<WebsiteHome />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        {/* </Dashbord> */}
        </div>
      </Router>
    </SessionProvider>
    </NavProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
