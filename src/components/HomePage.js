import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRecentlyAdded = JSON.parse(localStorage.getItem('recentlyAdded') || '[]');
    setRecentlyAdded(storedRecentlyAdded);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUploadRedirect = () => {
    navigate('/upload');
  };

  return (
    <div className="home-page">
      <header className="header">
        <div className="logo">
          <h1>SamAn</h1>
        </div>
        <div className="user-info">
          <span>Samir - ID</span>
        </div>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="button-group">
        <button>ACCESS REQUEST</button>
        <button>CREAR GRUPO FAMILIAR</button>
        <button>ARCHIVES</button>
        <button>PROTECTION</button>
        <button onClick={handleUploadRedirect}>EXPORT</button>
        <button>DELETE</button>
      </div>

      <section className="recently-viewed">
        <h2>Últimos Vistos</h2>
        <div className="file-preview-container">
          {recentlyViewed.length === 0 ? (
            <p>No hay archivos vistos recientemente.</p>
          ) : (
            recentlyViewed.map((file, index) => (
              <div key={index} className="file-preview">
                <p>{file.name}</p>
                <div className="file-thumbnail">
                  {file.preview ? (
                    <img src={file.preview} alt="Preview" />
                  ) : (
                    <p>No hay previsualización</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="recently-added">
  <h2>Últimos Agregados</h2>
  <div className="file-preview-container">
    {recentlyAdded.length === 0 ? (
      <p>No hay archivos agregados recientemente.</p>
    ) : (
      recentlyAdded.map((file, index) => (
        <div key={index} className="file-preview">
          <p>{file.name}</p>
          <div className="file-thumbnail">
            {file.type.startsWith('image/') ? (
              <img src={file.preview} alt="Preview" />
            ) : file.type === 'application/pdf' ? (
              <div className="file-icon">
                <img src="/path-to-icons/pdf-icon.png" alt="PDF Icon" className="icon" />
                <p>PDF</p>
              </div>
            ) : file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
              file.type === 'application/msword' ? (
              <div className="file-icon">
                <img src="/path-to-icons/word-icon.png" alt="Word Icon" className="icon" />
                <p>Word</p>
              </div>
            ) : (
              <div className="file-icon">
                <img src="/path-to-icons/file-icon.png" alt="File Icon" className="icon" />
                <p>Archivo</p>
              </div>
            )}
            </div>
          </div>
        ))
        )}
       </div>
      </section>
    </div>
  );
}

export default HomePage;
