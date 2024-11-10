import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from './pages/Home';
import AddWebsites from './pages/AddWebsites';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { useDispatch } from 'react-redux';
import { loginSuccess, setLoading } from './features/auth/authSlice';
import { jwtDecode } from 'jwt-decode';




function App() {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const istokenExpired = (token) =>{
    if(!token){
      return true;
    }
    try{
      const decodedtoken = jwtDecode(token);
      const currenttime= Date.now() / 1000;
      console.log(currenttime);
      console.log(decodedtoken.exp)
      return decodedtoken.exp < currenttime;

      
    }catch(error){
      console.log('Error decoding token ' + error);
      return true;
    }
  }

  useEffect(() => {
    // dispatch(setLoading(true));
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    console.log(typeof(localStorage.getItem('user')))

    if(istokenExpired(token)){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      <Navigate to="/login" />
    }

    // if (user && token) {
    //   dispatch(
    //     loginSuccess({
    //       user:user,
    //       token:token,
    //     })
    //   )
    // }
    // dispatch(setLoading(false));
  }, [])

  return (
    <>

      <Router>

        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>

          } />
          <Route path="/add-website" element={
                 <ProtectedRoute>
            <AddWebsites />
            </ProtectedRoute>
            } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
