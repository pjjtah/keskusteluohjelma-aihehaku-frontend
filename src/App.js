import { React, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Etusivu from "./Components/Etusivu"
import Kirjaudu from "./Components/Admin/Kirjaudu"
import Admin from "./Components/Admin/Admin"
import AdminNew from "./Components/Admin/AdminNew"
import "./App.css";

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.access_token
}

export const PrivateRoute = ({ children}) => {
  const isAuthenticated = getToken();
  if (isAuthenticated ) {
    return children
  }
    
  return <Navigate to="/kirjaudu" />
}

function App() {

  return (
    <Router>
        <Routes>
          <Route path="/kirjaudu" element={<Kirjaudu setToken={setToken}/>}/>
          <Route path="/" element={<Etusivu />}/>
          <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>}/>
          <Route path="/admin2" element={<PrivateRoute><AdminNew /></PrivateRoute>}/>
        </Routes>
    </Router>
  )
}

export default App;
