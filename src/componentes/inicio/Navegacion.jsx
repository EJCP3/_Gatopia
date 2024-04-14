import { useRef, useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { supabase } from "../../supabase/client";
import { useNavigate, Link } from "react-router-dom";
import ModalPerfil from "./perfil/ModalPerfil";
import { createPortal } from 'react-dom';






function Navegacion() {

  const navigate = useNavigate();
  const navRef = useRef();

  const [perfil, setPerfil] = useState({nombreUsuario: '', fotoPerfil: ''})

  async function signOut() {
    const { error } = await supabase.auth.signOut()
  }

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  
 


	useEffect(() => {
		const fetchPerfil = async () => {
			try{
				const user = await supabase.auth.getUser();
				const { error, data} = await supabase.from("usuario")
        .select("nombre_usuario, foto_perfil")
        .eq("userID", user.data.user.id);

				console.log(data)
        
        setPerfil({
          nombreUsuario: data[0].nombre_usuario,
          fotoPerfil: data[0].foto_perfil
        })

				if(error) {
					throw error;
				}

			}catch(error) {
				alert(error.error_description || error.message);
		}
		};
		fetchPerfil();
	}, []); 
  

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
    <div className="home-nav">
     <div className="home-nav-logo" onClick={handleOpenModal} >
      <img 
        className="home-nav-logo-img"
        src={perfil.fotoPerfil}
        alt="Imagen de perfil de usuario"
      />
      <h3 className="home-nav-logo-titulo">{perfil.nombreUsuario}</h3>
      {showModal && createPortal(
        <ModalPerfil onClose={handleCloseModal} />,
        document.body
      )}
    </div>
   
      {/* <div className="home-nav-logo" onClick={handleOpenModal}>
        <img
          className="home-nav-logo-img"
          src={perfil.fotoPerfil}
        />
        <h3 className="home-nav-logo-titulo">{perfil.nombreUsuario}</h3>
      </div> */}

      <nav className="home-nav-contenedor" ref={navRef}>
        <div className="home-nav-contenedor-pagina">
          <a className="home-nav-contenedor-pagina-link" href="/Home" >
            Home
          </a>
          <a className="home-nav-contenedor-pagina-link" href="/Adopciones">
            Adopciones
          </a>
         
          <a className="home-nav-contenedor-pagina-link" href="/Donaciones">
            Donaciones
          </a>
          <a  className="home-nav-contenedor-pagina-link" href="/Historias">
            Historias
          </a>
        </div>
        <div className="home-nav-contenedor-confi">
          <a className="home-nav-contenedor-confi-item" href="/#">
          Perfil
          </a>
          <a className="home-nav-contenedor-confi-item" onClick={signOut}>
            Cerrar sesion
          </a>
        </div>

        <button
          className="home-nav-contenedor-btn home-nav-contenedor-close-btn"
          onClick={showNavbar}
        >
          <FaTimes />
        </button>
      </nav>
      <button className="home-nav-contenedor-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </div>
  );
}

export default Navegacion;
