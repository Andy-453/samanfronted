import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [acceptPolicies, setAcceptPolicies] = useState(false); // Estado para el checkbox de políticas

  const navigate = useNavigate(); // Hook de navegación

const validateEmail = (email) => {
    // Valida si el correo tiene el formato correcto
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name) => {
    // Valida si el nombre solo contiene letras y espacios
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name);
  };

  const validatePassword = (password) => {
    // Requisitos de seguridad de la contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validación de nombre y correo electrónico
    if (!validateName(name)) {
      setErrorMessage("El nombre solo debe contener letras y espacios.");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Por favor, ingresa un correo electrónico válido.");
      return;
    }
    
    if (!validatePassword(password)) {
      setErrorMessage("La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial.");
      return;
    }

    // Verificación de aceptación de políticas
    if (!acceptPolicies) {
      setErrorMessage("Debes aceptar las políticas de tratamiento de datos.");
      return;
    }

    const userRegisterData = {
      name,
      email,
      password,
      userTypeId: 2, // Tipo de usuario cliente
      isDeleted: false // Siempre falso
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(userRegisterData).toString()
      });

      if (response.ok) {
        const contentType = response.headers.get("content-type");
        let result;
        if (contentType && contentType.includes("application/json")) {
          result = await response.json();
        } else {
          result = { message: await response.text() };
        }
        setSuccessMessage(result.message);
        setErrorMessage('');

        // Redirigir al usuario a la página de login después de 2 segundos
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error al registrarse");
      }
    } catch (error) {
      setErrorMessage("Error de conexión con el servidor");
      console.error("Error en handleRegister:", error);
    }
  };

  return (
    <div className="register-container">
      <h1>Registrar</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Checkbox para aceptar políticas de tratamiento de datos */}
        <label>
          <input
            type="checkbox"
            checked={acceptPolicies}
            onChange={(e) => setAcceptPolicies(e.target.checked)}
          />
          Acepto las <a href="/policies" target="_blank" rel="noopener noreferrer">políticas de tratamiento de datos</a>
        </label>

        <button type="submit">Registrar</button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </form>
    </div>
  );
}

export default Register;
