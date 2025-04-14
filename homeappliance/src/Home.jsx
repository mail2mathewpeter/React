// src/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/home.css';

function Home() {
    const [highlightLogin, setHighlightLogin] = useState(false);
    const navigate = useNavigate();

    const handleGetStarted = () => {
        setHighlightLogin(true);
        // Remove highlight after animation
        setTimeout(() => {
            setHighlightLogin(false);
        }, 3000);
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    return (
        <div className="home-container">
            {/* Left panel with brand and graphic */}
            <div className="left-panel">
                <div className="brand">
                    <div>Organic</div>
                    <div>Mind</div>
                </div>
                
                <div className="graphic-container">
                    {/* Abstract graphic elements */}
                    <div className="yellow-shape-top"></div>
                    <div className="orange-shape"></div>
                    <div className="yellow-shape-bottom"></div>
                    <div className="white-circle"></div>
                    <div className="dot dot-1"></div>
                    <div className="dot dot-2"></div>
                    <div className="dot dot-3"></div>
                    <div className="dot dot-4"></div>
                    <div className="circle-outline circle-outline-1"></div>
                    <div className="circle-outline circle-outline-2"></div>
                    <div className="line line-1"></div>
                    <div className="curved-line"></div>
                </div>
            </div>
            
            {/* Right panel with product info */}
            <div className="right-panel">
                <div className="content-container">
                    <h1 className="title">Productive Mind</h1>
                    
                    <p className="description">
                        With only the features you need, Organic Mind is customized 
                        for individuals seeking a stress-free way to stay focused on 
                        their goals, projects, and tasks.
                    </p>
                    
                    <button className="cta-button" onClick={handleGetStarted}>
                        Get Started
                    </button>
                    
                    <div className={`login-link ${highlightLogin ? 'highlight-animation' : ''}`}>
                        <p>Already have an account? <a href="#" onClick={handleSignIn}>Sign in</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
