import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// css
import "./styles.css"

const Login = ({ setUser }) => {

  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  const handleChange = e => {
    setUsername(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setUser(username)
    navigate('/villain/list')
  }

  return (
    <form onSubmit={handleSubmit}>
        <h1>Platnium Membership</h1><br /><br />
      <div className="row mb-3">
        <label htmlFor="inputEmail3" className="col-lg-2 col-form-label">Username: </label>
        <div className="col-sm-10">
          <input 
            type="text" 
            className="form-control" 
            id="inputEmail3" 
            value={username}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="inputPassword3" className="col-lg-2 col-form-label">Password: </label>
        <div className="col-sm-10">
          <input type="password" className="form-control" id="inputPassword3" />
        </div>
      </div>

      <button type="submit" className="btn btn-primary">Sign in</button>
    </form>
  );
};

export default Login;
