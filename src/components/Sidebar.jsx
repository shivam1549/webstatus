import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <>
     <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item">
          <NavLink
          exact
          className="nav-link"
          activeClassName="active"
          to="/"
        >
          <i className="icon-grid menu-icon"></i>
          <span className="menu-title">Dashboard</span>
        </NavLink>
          </li>
          <li className="nav-item">
          <NavLink
          className="nav-link"
          activeClassName="active"
          to="/add-website"
        >
          <i className="icon-paper menu-icon"></i>
          <span className="menu-title">Add Website</span>
        </NavLink>
          </li>

          </ul>
          </nav>
    </>
  )
}

export default Sidebar