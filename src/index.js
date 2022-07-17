import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import QuestionGen from './components/QuestionGen';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Router>
     <Routes>
      <Route path="/" element={<App />} />
      <Route path="/question-generator" element={<QuestionGen />} >
      </Route> 
    </Routes>
  </Router>
  </React.StrictMode>
);
reportWebVitals();
