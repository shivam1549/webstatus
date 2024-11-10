import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { logout } from '../features/auth/authSlice';


const Navbar = () => {
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [username, setuserName] = useState('');
  useEffect(() => {
    if (userdata && typeof userdata === 'object') {
      setuserName(userdata.username || '');
    }
  }, [userdata]);
  const handleLogout = () => {
    dispatch(logout());
  }
  return (
    <>

      <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <span className="navbar-brand brand-logo mr-5" >
            Web Status
          </span>
          <span className="navbar-brand brand-logo-mini" >
            WS
          </span>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
          <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
            <span className="icon-menu"></span>
          </button>
     

          <ul className="navbar-nav navbar-nav-right">

            <li className="nav-item nav-profile dropdown">
              <span className="nav-link dropdown-toggle" data-toggle="dropdown" id="profileDropdown">
                {username}

              
              </span>
              <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                {token &&
                  <span onClick={handleLogout} className="dropdown-item">
                    <i className="ti-power-off text-primary"></i>
                    Logout
                  </span>
                }
              </div>
            </li>

          </ul>

          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
            <span className="icon-menu"></span>
          </button>
        </div>
      </nav>


    </>
  )
}

export default Navbar