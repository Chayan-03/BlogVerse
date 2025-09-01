
import React from "react";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    if (decoded.exp && decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("token");
      return <Navigate to="/signin" replace />;
    }
    return children;

  } catch (err) {
    localStorage.removeItem("token");
    return <Navigate to="/signin" replace />;
  }
};

export default ProtectedRoute;


// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/signin" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;
