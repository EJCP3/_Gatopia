import React, { useState } from 'react';
import Navegacion from "./Navegacion";
import Modal from './login-registro/Modal';
import { createPortal } from 'react-dom';

const Header = () => {
  // Estado para manejar si el usuario está logueado o no
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Estado para manejar la visibilidad del modal
  const [showModal, setShowModal] = useState(false);

  const handleAdoptionClick = () => {
    if (!isLoggedIn) {
      // Mostrar modal de inicio de sesión/registro si no está logueado
      setShowModal(true);
    } else {
      // Redirigir a la página de adopciones si está logueado
      window.location.href = '/Home/Adopciones';
    }
  };

  return (
    <>
      <Navegacion />
      <section className="index-header">
        <h6 className="index-header-titulo">{"Una nueva vida para nuestro amigo bigotudo"}</h6>
        <h3 className="index-header-subtitulo">
          {"Gatopia dedicada organización dedicado al rescate y cuidado de gatos sin hogar"}
          <span className="index-header-subtitulo-img"></span>
        </h3>
        <button className="index-header-btn" onClick={handleAdoptionClick}>Conoce a nuestros bigotudos</button>
        <img className="index-header-imagenPortada" src="https://uoatbkvmdkgovqixyint.supabase.co/storage/v1/object/public/imagen/mobile/gatoheader.svg" alt="Gato header"/>
        <div className="index-header-img">
          <img src="https://uoatbkvmdkgovqixyint.supabase.co/storage/v1/object/public/imagen/mobile/feedPet.svg" alt="Feed pet"/>
          <img src="/src/assets/mobile/animals_cat.svg" alt="Cat"/>
        </div>
      </section>
      {showModal && createPortal(
        <Modal onClose={() => setShowModal(false)} />,
        document.body
      )}
    </>
  );
};

export default Header;
