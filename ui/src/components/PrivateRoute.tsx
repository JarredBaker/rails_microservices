import React from 'react';
import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from '../store';

const PrivateRoute: React.FC<{ children: React.JSX.Element }> = ({children}) => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  if (!isAuthenticated) return <Navigate to="/"/>;

  return children;
};

export default PrivateRoute;
