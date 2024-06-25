import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';
import { login, signup } from '../../firebase';
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false)

  const userAuth = async (event) => {
    event.preventDefault();
    setLoading(true)
    if (signState === "Sign In") {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
    setLoading(false)
  };

  const formHandle = () => {
    setSignState(prevState => prevState === "Sign In" ? "Sign Up" : "Sign In");
  };

  return (
    loading?<div className="login-spinner">
      <img src={netflix_spinner} alt="spinner gif" />
    </div>:
    <div className='login'>
      <img src={logo} alt="logo" className='login-logo' />
      <div className="login-form">
        <h1>{signState}</h1>
        <form onSubmit={userAuth}>
          {signState === "Sign Up" && (
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Your Name' />
          )}
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
          <button type='submit'>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" name="remember" id="remember" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <p>Need help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign Up" ? (
            <p>Already have an account? <span onClick={formHandle}>Sign In Now</span></p>
          ) : (
            <p>New to Netflix? <span onClick={formHandle}>Sign Up Now</span></p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
