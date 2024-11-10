import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';

const Login = () => {

  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showpassword = () =>{
    document.querySelector("#password").type = document.querySelector("#password").type === 'password' ? 'text' : 'password';
  }


  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(errors && (errors.username || errors.email || errors.password)){
     
      return false;
    }

    if(Object.keys(data).length === 2){
    try{
      const response = await axios.post(import.meta.env.VITE_API_URL+"/api/login",   {...data}  );
      const resultData = JSON.parse(response.data.result);
      console.log(resultData.username)
      dispatch(loginSuccess({
        user:resultData,
        token:resultData.jwt
      }))

      localStorage.setItem('user', JSON.stringify(resultData));
      localStorage.setItem('token', resultData.jwt);
      // console.log(response);
      navigate('/');
      
    }catch(error){
      console.error("login failed ", error)
    }
  }
  else{
    setErrors(prevError =>({
      ...prevError,
      ['email'] : "Please fill email",
      ['password'] : "Please fill password",
    }))
  }
  }

  const validateFiled = (name, value) =>{

    let error = '';
    switch(name){
      case "email":
      error = /\S+@\S+\.\S+/.test(value) ? "" : "Invalid email";
      break;

    case "password":
    error = value.length > 3 ? "" : "Password in required";
    break;

      default:
        break;
  }
    

    setErrors(prevError =>({
      ...prevError,
      [name]:error
    }))
  }

  const handleChange = (e) =>{
    const {name, value} = e.target;
    
      setData(prevData => ({
        ...prevData,
        [name]: value
      }));

      validateFiled(name, value);
      
  }

  return (
   <>
   <div className="content-wrapper d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
               Web Status
              </div>
              <h4>Hello! let's get started</h4>
              <h6 className="font-weight-light">Sign in to continue.</h6>
              <form onSubmit={handleSubmit} className="pt-3">
                <div className="form-group">
                  <input type="email" onChange={handleChange} name="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Username" />
                  {errors.email && <p className='text-danger'>{errors.email}</p>}
                </div>
                <div className="form-group">
                  <input type="password" onChange={handleChange} name='password' className="form-control form-control-lg" id="password" placeholder="Password" />
                  {errors.password && <p className='text-danger'>{errors.password}</p>}
                </div>
                <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input type="checkbox" onClick={showpassword} id="showpassword" className="form-check-input" />
                      Show Password
                    <i className="input-helper"></i></label>
                  </div>
                <div className="mt-3">
                  <button type='submit' className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" >SIGN IN</button>
                </div>
                <div className="my-2 d-flex justify-content-between align-items-center">
                
                  {/* <a href="#" className="auth-link text-black">Forgot password?</a> */}
                </div>
            
                <div className="text-center mt-4 font-weight-light">
                  Don't have an account? <Link to="/register" className="text-primary">Create</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
   </>
  )
}

export default Login