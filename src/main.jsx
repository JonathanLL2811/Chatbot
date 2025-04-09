import React from 'react';
import ReactDOM from 'react-dom/client';
import Chat from './Chat'; // Importa el componente Chat.jsx
 // Opcional: Importa estilos globales

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Chat /> {/* Renderiza el componente Chat.jsx */}
  </React.StrictMode>,
);