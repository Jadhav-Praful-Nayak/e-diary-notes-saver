import React from 'react'

import { Link ,useLocation, useNavigate} from "react-router-dom";


const Navbar = () => {
  let navigate=useNavigate();
  let location=useLocation();
  const handleLogout =()=>{
    localStorage.removeItem('token')
    navigate('/signin')
    

  }
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            E-diary
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
          {!localStorage.getItem("token") ? (
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <Link className="btn btn-success me-md-2" to="/signin">
                Sign in
              </Link>
              <Link className="btn btn-success" to="/signup">
                Sign Up
              </Link>
            </div>
          ) : (
            <div>
              <button className="btn btn-success" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar


