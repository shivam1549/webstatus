import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const Register = () => {

  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const showpassword = () =>{
    document.querySelector("#password").type = document.querySelector("#password").type === 'password' ? 'text' : 'password';
  }

  const handleClick = (e) =>{
    e.preventDefault();
    if(errors && (errors.username || errors.email || errors.password)){
     
      return false;
    }
    if(Object.keys(data).length === 3){
      e.target.innerText = 'Please wait...'
      e.target.disabled = true;
      axios
          .post(import.meta.env.VITE_API_URL+"/api/register",
            {...data}
          ).then(response=>{
            console.log(response);
            e.target.innerText = 'REGISTER'
            e.target.disabled = false;
            setMessage("Registration Successfull!")
          }).catch(error=>{
            // console.log(error.response.data.error)
            e.target.innerText = 'REGISTER'
            e.target.disabled = false;
            setErrors(prevError =>({
              ...prevError,
              ['registererror'] : error.response.data.error,
            }))
          })
    }
    else{
      setErrors(prevError =>({
        ...prevError,
        ['username'] : "Please fill username",
        ['email'] : "Please fill email",
        ['password'] : "Please fill password",
      }))
    }
    // console.log(data)
    
    
    
  }

  const validateFiled = (name, value) =>{
    let error = '';
    switch(name){
      case "email":
      error = /\S+@\S+\.\S+/.test(value) ? "" : "Invalid email";
      break;
    case "username":
      error = value.trim().length > 3 && /^[a-zA-Z\s]+$/.test(value) ? "" : "Name only can contain letters";
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
              {errors.formerror && <p className='text-danger'>{errors.formerror}</p>}
             
              <h6 className="font-weight-light">Register Now</h6>
              <div className="pt-3">
              <div className="form-group">
                  <input type="text" onChange={handleChange} className="form-control form-control-lg" id="name" name="username" placeholder="Name" />
                  {errors.username && <p className='text-danger'>{errors.username}</p>}
                </div>
                <div className="form-group">
                  <input type="email" onChange={handleChange} className="form-control form-control-lg" name="email" id="exampleInputEmail1" placeholder="Email" />
                  {errors.email && <p className='text-danger'>{errors.email}</p>}
                </div>
                <div className="form-group">
                  <input type="password" onChange={handleChange} className="form-control form-control-lg" name="password" id="password" placeholder="Password" />
                  {errors.password && <p className='text-danger'>{errors.password}</p>}
                </div>
                <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input type="checkbox" onClick={showpassword} id="showpassword" className="form-check-input" />
                      Show Password
                    <i className="input-helper"></i></label>
                  </div>
                <div className="mt-3">
                {message &&  <p className='text-success'>{message}</p>}
                {errors.registererror && <p className='text-danger'>{errors.registererror}</p> }
                  <button onClick={handleClick} className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">REGISTER</button>
                </div>
                <div className="my-2 d-flex justify-content-between align-items-center">
                
                  {/* <a href="#" className="auth-link text-black">Forgot password?</a> */}
                </div>
             
                <div className="text-center mt-4 font-weight-light">
                  Already registered? <Link to="/login" className="text-primary">login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register