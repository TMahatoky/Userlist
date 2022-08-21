import React from 'react';
//import ReactDOM from 'react-dom/client';
import { createRoot} from 'react-dom/client'
import './index.css';
import App from './App';
import { AuthProvider } from './AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<BrowserRouter>
            <AuthProvider>
                <Routes>
                <Route path='/*' element={<App />} />
                </Routes>
            </AuthProvider>
            </BrowserRouter>)

