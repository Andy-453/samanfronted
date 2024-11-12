import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
  
    const formData = new URLSearchParams();
    formData.append("Email", email);
    formData.append("Password", password);
  
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
      });
  
      if (response.ok) {
        const data = await response.json();
        alert("Login exitoso");
        console.log("Token:", data.token);

        // Guardar el token JWT en el localStorage
        localStorage.setItem('token', data.token);  
        localStorage.setItem('userName', data.userName); // Guardar el nombre del usuario
        // Redirigir al usuario a la página principal después del login exitoso
        navigate("/home");

      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error al iniciar sesión");
      }
    } catch (error) {
      setErrorMessage("Error de conexión con el servidor");
      console.error("Error en handleLogin:", error);
    }
  };
  
  return (
    <div className="login-container">
      <h1>SamAn </h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">LOGIN</button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default Login;
