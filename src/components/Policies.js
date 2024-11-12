import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Policies.css';

function Policies() {
  const navigate = useNavigate();

  // Definición de la función handleBackToRegister
  const handleBackToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="policies-container">
      <h1>Políticas de Tratamiento de Datos</h1>
      <p>
        Esta política describe cómo recopilamos, usamos y protegemos la información personal de nuestros usuarios...
      </p>
      <h2>Recopilación de Información</h2>
      <p>
        Recopilamos datos personales básicos únicamente cuando son necesarios para que el usuario pueda acceder y utilizar nuestra plataforma de gestión documental en el hogar. 
        Los datos que solicitamos se limitan a aquellos necesarios para identificar al usuario y asegurar una experiencia personalizada y segura.
      </p>
      <h2>Uso de la Información</h2>
      <p>
        Los datos personales recopilados se emplean exclusivamente para facilitar el servicio de gestión de documentos de forma segura y eficiente.
        Esto incluye la organización, almacenamiento y acceso controlado a los documentos que el usuario elige gestionar en la plataforma.
        No compartimos esta información con terceros sin el consentimiento explícito del usuario, salvo cuando lo exija la ley.
      </p>
      <h2>Protección de Información</h2>
      <p>
        Contamos con medidas técnicas y administrativas para proteger los datos personales contra accesos no autorizados, pérdidas y otros riesgos. 
        Utilizamos encriptación y controles de acceso para garantizar la confidencialidad y seguridad de los datos almacenados en nuestra plataforma.
      </p>
      <p>
        Para más detalles, puedes contactarnos a través de nuestro correo electrónico o visitar nuestras oficinas.
      </p>

      {/* Botón para regresar a la página de registro */}
      <button className="back-button" onClick={handleBackToRegister}>
        Regresar al Registro
      </button>

      <div className="policies-footer">
        <p>Última actualización: 11 de Noviembre de 2024</p>
      </div>
    </div>
  );
}

export default Policies;
