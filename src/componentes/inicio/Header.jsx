import { useState } from 'react';
import './estilos/layout/_home.scss'
import CrearPublicacion from './CrearPublicacion';
import { createPortal } from 'react-dom';


const Header = () => {
  
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const handleCloseModal = (e) => {
    e.stopPropagation();
    setShowModal(false);
  };
  
  return (
    <section className="home-header" >
       
        <h2 className="home-header-titulo">Gato del dias</h2>
        <picture className="home-header-img">
            <img src="/src/assets/mobile/gatodias1.svg"/>
            <img src="/src/assets/mobile/gatodias1.svg"/>
            <img src="/src/assets/mobile/gatodias1.svg"/>
            <img src="/src/assets/mobile/gatodias2.svg"/>
            <img src="/src/assets/mobile/gatodias3.svg"/>
        </picture>
        <input className="home-header-input" placeholder="¿En qué estás pensando?" onClick={handleOpenModal}/>
        {showModal && createPortal(
        <CrearPublicacion onClose={handleCloseModal} />,
        document.body
      )}
    </section>
  )
}

export default Header