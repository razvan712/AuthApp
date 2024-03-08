/* eslint-disable react/prop-types */

import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {

  const authenticated = localStorage.getItem('authenticated')

  if (!authenticated) {

    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
