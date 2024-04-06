import { createPortal } from "react-dom";
import ModalPerfil from "./perfil/ModalPerfil";
import { useState } from "react";


const Publicaciones = () => {
  
  
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
    <section className="home-publicaciones">
        
        <article className="home-publicaciones-contenido">
            
            <img className="home-publicaciones-contenido-img" src="/src/assets/mobile/Rectangle 69.svg"/>
      <div className="home-publicaciones-contenido-perfil" onClick={handleOpenModal} >
      <img 
        className="home-publicaciones-contenido-perfil"
        src="/src/assets/mobile/fotoperfil.svg"
        alt="Imagen de perfil de usuario"
      />
      <h3 className="home-publicaciones-contenido-perfil-usuario">"si"</h3>
      {showModal && createPortal(
        <ModalPerfil onClose={handleCloseModal} />,
        document.body
      )}
    </div>
            {/* <div className="home-publicaciones-contenido-perfil">
                <img className="home-publicaciones-contenido-perfil-foto" src="/src/assets/mobile/fotoperfil.svg"/>
                <h3 className="home-publicaciones-contenido-perfil-usuario">Usuario-1 </h3>
            </div> */}
            <p className="home-publicaciones-contenido-parrafo">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultrices consequat justo at ornare.</p>
        </article>
    </section>
  )
}

export default Publicaciones