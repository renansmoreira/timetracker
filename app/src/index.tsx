import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import Timers from './routes/timers/Timers';
import Customers from './routes/Customers';
import Timer from './routes/timers/timer/Timer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="timers" element={<Timers />}>
            <Route path="add" element={<Timer operation="POST" />} />
            <Route path=":id" element={<Timer operation="PUT" />} />
          </Route>
          <Route path="customers" element={<Customers />} />
        </Route>
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
