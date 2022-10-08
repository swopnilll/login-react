import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { App } from './App';
import { AuthProvider } from './context/AuthProvider';

import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <Routes>
                <Route path="/*" element={ <App />} />
            </Routes>
        </AuthProvider>
    </BrowserRouter>
    ,
    document.querySelector("#root")
)