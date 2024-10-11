import './App.css';
import SignUp from "./pages/auth/SignUp";
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import PrivateRoute from "./components/PrivateRoute";
import ProductHome from "./pages/products/ProductHome";
import {useSelector} from 'react-redux';
import {RootState} from './store';
import {useEffect} from "react";

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const token = useSelector((state: RootState) => state.user.token);

  useEffect(() => {
    console.log("Authed: " + isAuthenticated);
    console.log("Token " + token);
  }, [isAuthenticated, token])

  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <Route
            path="/"
            element={
              <PrivateRoute>
                <ProductHome/>
              </PrivateRoute>}/>
        ) : (
          <Route path="/" element={<SignUp/>}/>
        )}
      </Routes>
    </Router>
  );
}

export default App;
