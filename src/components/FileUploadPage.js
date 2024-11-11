import React, { useState } from 'react';
import './FileUploadPage.css';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';

function FileUploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Por favor, seleccione un archivo.');
      return;
    }

    const formData = new FormData();
    formData.append('DocumentFile', selectedFile);
    formData.append('DocumentName', selectedFile.name);
    formData.append('IsProtected', false);
    formData.append('IsShared', false);
    formData.append('Address', 'Dirección de prueba');
    formData.append('TypeDocument', selectedFile.type);
    formData.append('IsDeleted', false);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Usuario no autenticado. Por favor, inicie sesión.');
        navigate('/login');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/Documents/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert('Documento subido con éxito');
        navigate('/home', { replace: true });
      } else {
        const errorResponse = await response.json();
        alert(`Error al subir el documento: ${errorResponse.message || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error al subir el documento:', error);
      alert('Error al subir el documento');
    }
  };

  const handleCancel = () => {
    navigate('/home', { replace: true });
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
      <div className="file-upload-container">
        <div className="file-drop-area">
          <input type="file" className="file-input" onChange={handleFileChange} />
          <p>{selectedFile ? selectedFile.name : 'Por favor arrastre los archivos aquí'}</p>
        </div>
        <div className="buttons">
          <button onClick={handleUpload}>SUBIR</button>
          <button onClick={handleCancel}>CANCELAR</button>
        </div>
      </div>
    </div>
  );
}

export default FileUploadPage;
