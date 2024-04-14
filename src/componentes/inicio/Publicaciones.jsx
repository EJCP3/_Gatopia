import { useEffect, useState } from "react";
import { supabase } from "../../supabase/client";
import { FaTimes, FaEdit, FaEllipsisH } from "react-icons/fa";
import { Toaster, toast } from "sonner";
import CrearPublicacion from "./CrearPublicacion";
import { Dropdown, Modal, ButtonToolbar, Button, Placeholder } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { BsAlignCenter } from "react-icons/bs";
import "rsuite/dist/rsuite.min.css";

const SizeDropdown = ({
  deletePublication,
  handleOpenUpdate,
  publicacion,
  ...props
}) => (
  <Dropdown appearance="default" noCaret {...props}>

    <Dropdown.Item onClick={(e) => {
      handleOpenUpdate(e, publicacion.id)
    }}>Editar</Dropdown.Item>
    <Dropdown.Item onClick={() =>  deletePublication(publicacion.id)}>
      Borrar
    </Dropdown.Item>
  </Dropdown>
);

const Publicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [selectedPublicacion, setSelectedPublicacion] = useState(null);
  const [userID, setUserID] = useState(null);
  const [selectedUser, setSelectedUser] = useState([]);

  // const handleOpen = (size, user) => {
  //   setSelectedUser(user);
  //   setSize(size);
  //   setOpen(true);
  // };

  const [openUpdate, setOpenUpdate] = useState(false);
  const [sizeUpdate, setSizeUpdate] = useState();
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();

  const handleOpen = (e, user) => {
    
    setOpen(true);
    setSelectedUser(user);
    setSize("sm");
    
  };

  const handleClose = (e) => {
    setOpen(false);
   
  };

  

  const handleOpenUpdate = (e, publicacion) => {
    if (e) e.stopPropagation();
        setOpenUpdate(true);
    
    setSelectedPublicacion(publicacion);
    console.log(selectedPublicacion)
    // console.log(selectedPublicacion)
   
    
  };

  const handleCloseUpdate = (e) => {
    if (e) e.stopPropagation();
    setOpenUpdate(false);
   
  };
  useEffect(() => {
    console.log("Publicación seleccionada actualizada:", selectedPublicacion);
  }, [selectedPublicacion]);
  
  useEffect(() => {
    fetchData();

    const fetchUsuario = async () => {
      try {
        const user = await supabase.auth.getUser();
        setUserID(user.data.user.id);
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
        .select(
          "userID,nombre_usuario, foto_perfil, portada, provincia, descripción, fecha_creacion, role"
        )
        .in("userID", usuariosIDs);

      
      if (usuariosError) {
        throw usuariosError;
      }
      console.log(usuarios)
      setUsuarios(usuariosData);
    } catch (error) {
      console.error("Error al obtener los datos:", error.message);
    }
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
      toast.success("Publicacion eliminada");
      
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  // const updatePublicacion = async (id, update) => {
  //   try {
  //     const user = supabase.auth.getUser();
  //     const { error, data } = await supabase
  //       .from("publicaciones")
  //       .update(update)
  //       .eq("userId", user.id)
  //       .eq("id", id);
  //     if (error) {
  //       throw error;
  //     }

  //     setPublicaciones(
  //       publicaciones.filter((publicacion) => publicacion.id !== id)
  //     );
  //     toast.success("Publicacion actualizada");
  //     fetchData();
  //   } catch (error) {
  //     alert(error.error_description || error.message);
  //   }
  // };

  // const handleOpenUpdate = (publicacion) => {
  //   setSelectedPublicacion(publicacion);
  //   setOpenUpdate(true);
  // };

  // const handleCloseModalupdate = () => {
  //   setSelectedPublicacion(null);
  // };

  // console.log("Publicacion seleccionada:", selectedPublicacion);

  const handleClick = (publicacion) => {
    // Lógica para manejar el clic en la publicación
    console.log("Publicación clickeada:", publicacion.id);
  };

  return (
    <section className="home-publicaciones">
      <Toaster />
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
            {/* {publicacion.userID === userID && (
              <button
                className="home-publicaciones-contenido-btn"
                onClick={() => deletePublication(publicacion.id)}
              >
                <FaTimes />
              </button>
            )} */}
            <div className="home-publicaciones-contenido-perfil">
              <div
                className="home-publicaciones-contenido-perfil-cont"
                size="sm"
                onClick={(e) => handleOpen(e, usuario)}
              >
                <img
                  className="home-publicaciones-contenido-perfil-cont-img"
                  src={usuario.foto_perfil}
                  alt="Imagen de perfil de usuario"
                />
                <h3 className="home-publicaciones-contenido-perfil-cont-usuario">
                  {usuario.nombre_usuario}
                </h3>
              </div>

              <Modal  size={size} open={open} onClose={handleClose}>
        <Modal.Header>
        
        </Modal.Header>
        <Modal.Body>
        {selectedUser && (
      <article className="modalP-perfil-contenedor">
        <img className="modalP-perfil-contenedor-portada" src={selectedUser.portada} />
        <div className="modalP-perfil-contenedor-info-perfil">
          <img className="modalP-perfil-contenedor-info-perfil_logo" src={selectedUser.foto_perfil} />
          <h3 className="modalP-perfil-contenedor-info-perfil_nombre">{selectedUser.nombre_usuario}</h3>
        </div>
        <div className="modalP-perfil-contenedor-info">
          <p className="modalP-perfil-info-fecha">{selectedUser.provincia}</p>
          <p className="modalP-perfil-contenedor-info-fecha">
            <strong>Fecha de creación:</strong> {selectedUser.fecha_creacion}
          </p>
          <p className="modalP-perfil-contenedor-info-des">{selectedUser.descripción}</p>
        </div>
      </article>
    )}
      
        </Modal.Body>
      </Modal>

              {publicacion.userID === userID && (
                <ButtonToolbar>
                  <SizeDropdown
                    size="xs"
                    color="subtle"
                    appearance="subtle"
                    title={<FaEllipsisH />}
                    trigger={["click", "hover"]}
                    className="home-publicaciones-contenido-perfil-submenu"
                    deletePublication={deletePublication}
                    handleOpenUpdate={handleOpenUpdate}
                    publicacion={publicacion}
                  />
                </ButtonToolbar>
              )}
            </div>
            <img
              className="home-publicaciones-contenido-img"
              src={publicacion.foto}
              alt="Foto de la publicación"
            />

            <p className="home-publicaciones-contenido-parrafo">
              {publicacion.descripción}
            </p>
          </article>
        );
      })}
      {selectedPublicacion && openUpdate  && (
  <CrearPublicacion
    publicacion={selectedPublicacion}
    fetchData={fetchData}
    onClose={handleCloseUpdate}
    openUpdate={openUpdate}

  />
)}
    </section>
  );
};

export default Publicaciones;
