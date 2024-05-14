import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./forgot.css"

function Forgot() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const apiUrl = "http://localhost:5000"

  const forgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target[0].value;
    console.log(email)

    try {
      const response = await fetch(`${apiUrl}/reset-password-mail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setLoading(false);
      setMessage(data.message || 'Password reset email sent successfully');
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '10rem' }}>
      {loading && <div>Loading...</div>}
      {message && <div>{message}</div>}
      <div className="forgotPassword">
        <div className="forgot">
          <h1>Forgot Password</h1>
          <form onSubmit={forgotPassword} className='sendCode'>
            <input type="email" placeholder="Email" required />
            <button className='sc' type="submit">Submit</button>
          </form>
          <Link className='toLogin' to="/signin" >Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Forgot;