import  { useState } from 'react';
import './aside.scss';

const Aside = ({ onToggleForm }) => {
  const [registrate, setRegistrate] = useState(true);

  const handleButtonClick = () => {
    if (!registrate) {
      onToggleForm('registro');
    } else {
      onToggleForm('inicioSesion');
    }
    setRegistrate(!registrate);
  };

  return (
    <section className="index-aside">
      <h3 className="index-aside-titulo">{registrate ? 'Hola de nuevo' : 'Bienvenido'}</h3>
      <p className="index-aside-parrafo">
        {registrate
          ? "Si todavía no eres parte de la familia, te puedes unir aquí abajo." 
          : "Si ya eres parte de la familia, inicia sesión."}
      </p>
      <button className="index-aside-btn" onClick={handleButtonClick}>
        {registrate ? 'Regístrate' : 'Inicia Sesión'}
      </button>
      <img src="/src/assets/mobile/aside-fondo.svg" className="index-aside-img" alt="background" />
    </section>
  );
};

export default Aside;
