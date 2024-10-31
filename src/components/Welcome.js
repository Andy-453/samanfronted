import React from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1>SamAn </h1>
      <p>Bienvenidos a SamAn aplicación para gestión documental dentro del hogar</p>
      <button onClick={() => navigate('/register')}>REGISTER</button>
      <button onClick={() => navigate('/login')}>LOGIN</button>
    </div>
  );
}

export default Welcome;