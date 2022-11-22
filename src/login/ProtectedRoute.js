import React from "react";
import { Navigate } from "react-router-dom";
 const LOCAL_STORAGE_USER_KEY = 'user'

const ProtectedRoute = ({ children }) => {
  if (!localStorage.getItem(LOCAL_STORAGE_USER_KEY)) {
    return <Navigate to="../AdminPage" />;
  }

  return children;
};

export default ProtectedRoute;
