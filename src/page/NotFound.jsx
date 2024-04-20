import React from 'react';
import { useNavigate } from 'react-router-dom';

// Asegúrate de que este es el camino correcto a tu cliente de Supabase
import './NotFound.css';
import { supabase } from '../supabase/client';

const NotFound = () => {
  const navigate = useNavigate();

  // Función para manejar el clic en el botón
  const handleRedirect = async () => {
    const user = supabase.auth.getUser();
    if (!user) {
      navigate('/Home');   // Redirige a Home si el usuario está logueado
    } else {
      navigate('/');  // Redirige a la página principal si el usuario no está logueado
    }
  };

  return (
    <div className="not-found-container">
      <img src="https://example.com/path-to-your-404-image.png" alt="Not Found" className="not-found-image" />
      <h1 className='titulo'>Oops!</h1>
      <p className='parrafo'>La página que buscas no se pudo encontrar.</p>
      <button onClick={handleRedirect} className="home-link">Ir a la página adecuada</button> {/* Botón para redirigir */}
    </div>
  );
}

export default NotFound;
