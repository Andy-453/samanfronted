import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './components/Welcome';
import Register from './components/Register';
import Login from './components/Login';
import HomePage from './components/HomePage';
import FileUploadPage from './components/FileUploadPage';
import Policies from './components/Policies'; // Importa el componente de políticas

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomePage />} /> {/* Ruta para la página principal */}
          <Route path="/upload" element={<FileUploadPage />} /> {/* Ruta para la página de carga de documentos */}
          <Route path="/policies" element={<Policies />} /> {/* Ruta para la página de políticas */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;