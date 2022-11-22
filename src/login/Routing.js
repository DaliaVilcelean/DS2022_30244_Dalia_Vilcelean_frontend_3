import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminPage from "../AdminPage/AdminPage.js";
import LogInPage from "./LogInPage";
import Home from '../home/home.js'



const Routing = () => {
    return (
      <Router>
        <Routes>
          <Route path='/' exact  element={<LogInPage />} />
          <Route
            path='/AdminPage'
          exact  element={<ProtectedRoute children={<AdminPage />} />}
          />
          
        </Routes>
      </Router>
    );
  };
  export default Routing;