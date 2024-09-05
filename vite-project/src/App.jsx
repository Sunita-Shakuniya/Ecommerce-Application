import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Order from './pages/order/Order';
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import NoPage from './pages/nopagge/NoPage';
import MyState from './context/data/myState';
import AllProducts from './pages/allproducts/AllProducts';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import ProductInfo from './pages/productInfo/ProductInfo';
import AddProduct from './pages/admin/pages/AddProduct';
import UpdateProduct from './pages/admin/pages/UpdateProduct';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Aboutus from './pages/aboutus/Aboutus';
import { onAuthStateChanged } from 'firebase/auth';
import { initializeFirebase } from './firebase/FirebaseConfig';

function App() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const initFirebase = async () => {
      const { auth } = await initializeFirebase();
      if (auth) {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setUser(user);
            // Check if the user is admin
            if (user.email === 'admin@gmail.com') {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
          } else {
            setUser(null);
            setIsAdmin(false);
          }
          setFirebaseInitialized(true);
        });
      }
    };

    initFirebase();
  }, []);

  if (!firebaseInitialized) {
    return <div>Loading Firebase...</div>;
  }

  return (
    <MyState>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/order' element={
            <ProtectedRoute user={user}>
              <Order />
            </ProtectedRoute>
          } />
          <Route path='/cart' element={<Cart />} />
          <Route path='/dashboard' element={
            <ProtectedRouteForAdmin user={user} isAdmin={isAdmin}>
              <Dashboard />
            </ProtectedRouteForAdmin>
          } />
          <Route path='/allproducts' element={<AllProducts />} />
          <Route path='/aboutus' element={<Aboutus />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/productinfo/:id' element={<ProductInfo />} />
          <Route path='/addproduct' element={
            <ProtectedRouteForAdmin user={user} isAdmin={isAdmin}>
              <AddProduct />
            </ProtectedRouteForAdmin>
          } />
          <Route path='/updateproduct' element={
            <ProtectedRouteForAdmin user={user} isAdmin={isAdmin}>
              <UpdateProduct />
            </ProtectedRouteForAdmin>
          } />
          <Route path='/*' element={<NoPage />} />
        </Routes>
        <ToastContainer />
      </Router>
    </MyState>
  );
}

export default App;

// User route protection
export const ProtectedRoute = ({ children, user }) => {
  if (user) {
    return children;
  } else {
    return <Navigate to={'/login'} />;
  }
};

// Admin route protection
export const ProtectedRouteForAdmin = ({ children, user, isAdmin }) => {
  if (isAdmin) {
    return children;
  } else {
    return <Navigate to={'/login'} />;
  }
};
