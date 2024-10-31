import axios from 'axios';
import React, { useState } from 'react';
import './FileUploadPage.css';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';

function FileUploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Por favor seleccione un archivo para subir.');
      return;
    }

    const formData = new FormData();
    formData.append('DocumentName', selectedFile.name);
    formData.append('Address', 'Dirección del documento'); // Puedes cambiar la dirección si es necesario
    formData.append('TypeDocument', 'Tipo de documento'); // Puedes cambiar el tipo de documento si es necesario
    formData.append('DocumentFile', selectedFile);
    formData.append('IsProtected', false); // Valor predeterminado
    formData.append('IsShared', false); // Valor predeterminado
    formData.append('IsDeleted', false); // Valor predeterminado

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/Documents/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert('Documento subido con éxito');
        navigate('/home'); // Redirigir a la página principal después de la carga exitosa
      }
    } catch (error) {
      console.error('Error al subir el documento:', error);
      alert('Error al subir el documento. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div className="file-upload-page">
      <header className="header">
        <div className="logo">
          <h1>SamAn</h1>
        </div>
        <div className="user-info">
          <span>Samir - ID</span>
        </div>
      </header>

      <div className="upload-container">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>SUBIR</button>
        <button onClick={() => navigate('/home')}>CANCELAR</button>
      </div>
    </div>
  );
}

export default FileUploadPage;