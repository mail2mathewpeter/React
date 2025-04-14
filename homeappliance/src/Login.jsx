import { useState } from 'react';

import './CSS/login.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [highlightSignIn, setHighlightSignIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });
    // Add your authentication logic here
  };

  const highlightButton = () => {
    setHighlightSignIn(true);
    setTimeout(() => {
      setHighlightSignIn(false);
    }, 3000);
  };

  return (
    <div className="login-container">
      {/* Left panel with brand and graphic */}
      <div className="left-panel">
        <div className="brand">
          <div>Organic</div>
          <div>Mind</div>
        </div>
        
        <div className="graphic-container">
          {/* Abstract graphic elements */}
          <div className="yellow-shape"></div>
          <div className="orange-shape"></div>
          <div className="white-circle-large"></div>
          <div className="white-circle-small"></div>
          <div className="dot dot-1"></div>
          <div className="dot dot-2"></div>
          <div className="dot dot-3"></div>
          <div className="line line-1"></div>
          <div className="line line-2"></div>
          <div className="curved-line"></div>
        </div>
      </div>
      
      {/* Right panel with login form */}
      <div className="right-panel">
        <div className="form-container">
          <h1 className="title">Sign in</h1>
          
          <form action="/dashboard" >
            <div className="input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@mail.com"
                required
              />
            </div>
            
            <div className="input-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="****************"
                required
              />
              <button 
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
            </div>
            
            <button 
              type="submit" 
              className={`sign-in-button ${highlightSignIn ? 'highlight' : ''}`}
            >
              Sign in
            </button>
          </form>
          
          <div className="divider">or</div>
          
          <div className="social-login">
            <button className="social-button" onClick={highlightButton}>
              Google
            </button>
            <button className="social-button" onClick={highlightButton}>
              Facebook
            </button>
          </div>
          
          <div className="signup-link">
            <p>Don't have an account? <a href="#" onClick={(e) => {
              e.preventDefault();
              highlightButton();
            }}>Sign up</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;