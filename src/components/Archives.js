import React, { useState, useEffect } from 'react';
import './Archives.css';

function ArchivesPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtén el token desde localStorage, si es necesario
    // Llamada a la API para obtener los archivos
    fetch('https://localhost:7210/api/Documents/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Usa el token si es necesario
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los archivos');
        }
        return response.json();
      })
      .then((data) => {
        setFiles(data); // Asume que `data` es un array de archivos
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar los archivos:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="archives-page">
      <h2>Archivos</h2>
      {loading ? (
        <p>Cargando archivos...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="file-grid">
          {files.length === 0 ? (
            <p>No hay archivos disponibles.</p>
          ) : (
            files.map((file, index) => (
              <div key={index} className="file-card">
                {file.url ? (
                  <img src={file.url} alt={file.name} className="file-thumbnail" />
                ) : (
                  <div className="file-placeholder">Vista previa no disponible</div>
                )}
                <h3>{file.name}</h3>
                <button
                  className="download-button"
                  onClick={() => window.open(file.url, '_blank')}
                >
                  Descargar
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default ArchivesPage;
