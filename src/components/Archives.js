import React, { useState, useEffect } from 'react';
import './Archives.css';

function ArchivesPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtén el token desde localStorage si es necesario
    // Llamada a la API para obtener la lista de archivos
    fetch('https://www.samandm4.somee.com/api/Documents/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Usa el token si es necesario
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener la lista de archivos');
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

  // Función para descargar un archivo específico usando su id
  const downloadFile = async (fileId, fileName) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://www.samandm4.somee.com/api/Documents/user/${fileId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Incluye el token si es necesario
        },
      });

      if (!response.ok) {
        throw new Error('Error al descargar el archivo');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName || 'archivo_descargado'; // Usa el nombre del archivo o un nombre predeterminado
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url); // Libera la URL del objeto
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
    }
  };

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
                  onClick={() => downloadFile(file.id, file.name)}
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
