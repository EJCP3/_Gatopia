import { createPortal } from "react-dom";
import ModalPerfil from "./perfil/ModalPerfil";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase/client";
import { FaTimes, FaEdit  } from "react-icons/fa";
import { Toaster, toast } from 'sonner';
import CrearPublicacion from "./CrearPublicacion";


const Publicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [selectedPublicacion, setSelectedPublicacion] = useState(null);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    fetchData();

    const fetchUsuario = async () => {
      try {
        const user = await supabase.auth.getUser();
        setUserID(user.data.user.id);
        console.log(userID);
      } catch (error) {
        console.error(
          "Error al obtener la información del usuario:",
          error.message
        );
      }
    };
    fetchUsuario();
  }, []);

  const fetchData = async () => {
    try {
      // Obtener las publicaciones
      const { data: publicacionesData, error: publicacionesError } =
        await supabase
          .from("publicaciones")
          .select("*")
          .order("fecha", { ascending: false });

      if (publicacionesError) {
        throw publicacionesError;
      }

      setPublicaciones(publicacionesData);
      // Obtener los datos de usuario para cada publicación

      const usuariosIDs = publicacionesData.map(
        (publicacion) => publicacion.userID
      );

      const { data: usuariosData, error: usuariosError } = await supabase
        .from("usuario")
        .select("userID,nombre_usuario, foto_perfil")
        .in("userID", usuariosIDs);

      if (usuariosError) {
        throw usuariosError;
      }
      setUsuarios(usuariosData);
    } catch (error) {
      console.error("Error al obtener los datos:", error.message);
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const handleCloseModal = (e) => {
    e.stopPropagation();
    setShowModal(false);
  };

  const deletePublication = async (id) => {
    try {
      const user = await supabase.auth.getUser();

      const { error, data } = await supabase
        .from("publicaciones")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      // Actualizar las publicaciones después de la eliminación
      setPublicaciones(
        publicaciones.filter((publicacion) => publicacion.id !== id)
      );
      toast.success("Publicacion eliminada")
      fetchData();
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };


  const updatePublicacion = async (id, update) => {

    try {
      const user = supabase.auth.getUser();
      const { error, data } = await supabase
        .from("publicaciones")
        .update(update)
        .eq("userId", user.id)
        .eq("id", id);
      if (error) {
        throw error;
      }

      setPublicaciones(
        publicaciones.filter((publicacion) => publicacion.id !== id)
      );
      toast.success("Publicacion actualizada")
      fetchData();
    } catch (error) {
      alert(error.error_description || error.message);
    }
  }

  const handleOpenModalupdate = (publicacion) => {
    setSelectedPublicacion(publicacion);
  };

  const handleCloseModalupdate = () => {
    setSelectedPublicacion(null);
  };


  const handleClick = (publicacion) => {
    // Lógica para manejar el clic en la publicación
    console.log("Publicación clickeada:", publicacion);
  };

  return (
    <section className="home-publicaciones">
      <Toaster/>
      {publicaciones.map((publicacion) => {
        const usuario = usuarios.find(
          (usuario) => usuario.userID === publicacion.userID
        );

        // Si no hay usuario, no mostrar esta publicación
        if (!usuario) return null;
        return (
          <article
            className="home-publicaciones-contenido"
            key={publicacion.id}
            onClick={() => handleClick(publicacion)}
          >
            {publicacion.userID === userID && (
              <button
                className="home-publicaciones-contenido-btn"
                onClick={() => handleOpenModalupdate(publicacion)}
              >
                <FaEdit  />
              </button>
            )}

            {publicacion.userID === userID && (
              <button
                className="home-publicaciones-contenido-btn"
                onClick={() => deletePublication(publicacion.id)}
              >
                <FaTimes />
              </button>
            )}
            <img
              className="home-publicaciones-contenido-img"
              src={publicacion.foto}
              alt="Foto de la publicación"
            />
            <div
              className="home-publicaciones-contenido-perfil"
              onClick={handleOpenModal}
            >
              <img
                className="home-publicaciones-contenido-perfil-img"
                src={usuario.foto_perfil}
                alt="Imagen de perfil de usuario"
              />
              <h3 className="home-publicaciones-contenido-perfil-usuario">
                {usuario.nombre_usuario}
              </h3>
            </div>
            {showModal &&
              createPortal(
                <ModalPerfil onClose={handleCloseModal} />,
                document.body
              )}
            <p className="home-publicaciones-contenido-parrafo">
              {publicacion.descripción}
            </p>
          </article>
        );
      })}
      {selectedPublicacion && (
        <CrearPublicacion
          publicacion={selectedPublicacion}
          onClose={handleCloseModalupdate}
          fetchData={fetchData} // Pasamos fetchData para que se pueda actualizar después de editar la publicación
        />
      )}
    </section>
  );
};

export default Publicaciones;
