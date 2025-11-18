import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

// eslint-disable-next-line react-refresh/only-export-components
const Dashboard = () => <iframe
    src="https://dbc-b57a2aee-5d64.cloud.databricks.com/embed/dashboardsv3/01f0c1ae91a919b58a95c26c98fac1f5?o=3362824062149607"
    width="100%"
    height="600"
    frameBorder="0">
</iframe>

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/dash" element={<Dashboard/>}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)