import React from 'react';
import './error-indicator.css';
import icon from './death-star.png';

const ErrorIndicator = () => (
    <div className="error-indicator">
        <img src={icon} alt="error icon" />
        <span className="boom">Oops!</span>
        <span>something has gone terribly wrong</span>
        <span>(but we already sent droids to fix it)</span>
    </div>
);

export default ErrorIndicator;
