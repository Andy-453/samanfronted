import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener el nombre del usuario desde localStorage
    const name = localStorage.getItem('userName');
    if (name) {
      setUserName(name);
    } else {
      console.error("El nombre del usuario no se encuentra en localStorage.");
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUploadRedirect = () => {
    navigate('/upload');
  };
  
  const handleArchivesRedirect = () => {
    navigate('/archives');
  };


  return (
    <div className="home-page">
      <header className="header">
        <div className="logo">
          <h1>SamAn</h1>
        </div>
        <div className="user-info">
          <span>{userName}</span> {/* Mostramos el nombre dinámicamente */}
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
        <button onClick={handleArchivesRedirect}>ARCHIVES</button>
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
                <p>ARCHIVO</p>
                <div className="file-thumbnail"></div>
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
                <p>ARCHIVO</p>
                <div className="file-thumbnail"></div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
