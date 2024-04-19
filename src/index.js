import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ElectionsScreen from './Screeens/ElectionsScreen';
import OpenElections from './Screeens/OpenElections';
import RegisterScreen from './Screeens/RegisterScreen';
import CandidatesScreen from './Screeens/CandidatesScreen';
import PartiesScreen from './Screeens/PartiesScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<ElectionsScreen />} />
      <Route path="/vote" element={<OpenElections />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/candidates" element={<CandidatesScreen />} />
      <Route path="/parties" element={<PartiesScreen />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
