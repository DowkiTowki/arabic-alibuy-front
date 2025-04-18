import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './css/index.css';
import Root from './Root';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AnimatePresence } from "framer-motion";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Root>
      <BrowserRouter>
        <AnimatePresence mode={'wait'}>
          <Routes>
            <Route path="*" element={<App />} />
          </Routes>
        </AnimatePresence>
  </BrowserRouter>
  </Root>
);

serviceWorkerRegistration.register();
reportWebVitals();