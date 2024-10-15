import './App.css';
import SignUp from "./pages/auth/SignUp";
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import PrivateRoute from "./components/PrivateRoute";
import ProductHome from "./pages/products/ProductHome";
import {useSelector} from 'react-redux';
import {RootState} from './store';
import LogIn from "./pages/auth/LogIn";
import YourOrders from "./pages/orders/YourOrders";

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

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

        <Route path="/login" element={<LogIn/>}/>

        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <YourOrders/>
            </PrivateRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
