import React from 'react';
import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from '../store';

// Create a PrivateRoute component that checks if the user is authenticated
const PrivateRoute: React.FC<{ children: React.JSX.Element }> = ({children}) => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/signup"/>;
  }

  // Otherwise, render the children components
  return children;
};

export default PrivateRoute;
