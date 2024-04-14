import React, { useEffect, useState } from 'react';
import { supabase } from "../../supabase/client";
import { Toaster,  toast } from "sonner";
import { Carousel, Modal, ButtonToolbar } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { Dropdown } from 'rsuite';
import Navegacion from "../inicio/Navegacion";
import CrearHistoria from "./CrearHistorial";


const Main = () => {
  const [openCrear, setOpenCrear] = useState(false);
  const handleOpenCrear = () => setOpenCrear(true);
  const handleCloseCrear = () => setOpenCrear(false);

  const [historias, setHistorias] = useState([]);
  const [selectedHistoria, setSelectedHistoria] = useState(null);
  const [open, setOpen] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [userRole, setUserRole] = useState(null);  // Estado para almacenar el rol del usuario

   useEffect(() => {
    fetchHistorias();
    fetchUserRole();
  }, []);

  const fetchHistorias = async () => {
    const { data, error } = await supabase.from("historias").select("*").order("fecha", { ascending: false });

    
    if (error) console.error("Error al obtener las historias:", error.message);
    else setHistorias(data);
  };

  const fetchUserRole = async () => {
    // Obtener el rol del usuario actual
    try{
      const user = await supabase.auth.getUser();
      const { error, data} = await supabase.from("usuario")
      .select("role")
      .eq("userID", user.data.user.id);

      setUserRole(data[0].role)
      

      if(error) {
        throw error;
      }

    }catch(error) {
      alert(error.error_description || error.message);
  }
  };

  function extractUrls(urlString) {
    const trimmedString = urlString.slice(1, -1);
    const urls = trimmedString.split('], [');
    return urls.map(url => url.trim());
  }

  const handleOpen = (historia) => {
    setSelectedHistoria(historia);
    setOpen(true);
    if (historia.carusel) {
      const urls = extractUrls(historia.carusel);
      setImageUrls(urls);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setImageUrls([]);
  };

  const handleEdit = (historia) => {
    setSelectedHistoria(historia);
    setOpen(true);
  };


  const handleDelete = (historiaId) => {
    console.log(historiaId.id)
    console.log("si")
    toast('¿Estás seguro de que quieres eliminar esta historia?', {
      duration: 10000,  // Muestra el toast por 10 segundos, dando tiempo al usuario para actuar
      position: "top-center",
      style: {
        background: '#ffe4ff',
      },
      action: {
        
        label: 'Eliminar',
        onClick: () => executeDelete(historiaId)
      }
    });
  };

  const executeDelete = async (historiaId) => {
    console.log("ds",historiaId)
        const { error } = await supabase.from("historias").delete().eq('id', historiaId);
    if (error) {
      toast.error({ title: "Error", description: "No se pudo eliminar la historia" });
    } else {
      fetchHistorias();  // Re-fetch the historias after deletion
      toast.success({ title: "Success", description: "Historia eliminada correctamente" });
    }
  };


  const AdminActionsDropdown = ({ historiaId }) => {
    return userRole === 'admin' && (
      <Dropdown title="Opciones" trigger={['click', 'hover']} placement="rightStart">
        <Dropdown.Item onClick={() => handleEdit(historiaId)}>Editar</Dropdown.Item>
        <Dropdown.Item onClick={() => handleDelete(historiaId.id)}>Eliminar</Dropdown.Item>
      </Dropdown>
    );
  };

  return (
<section>
    <section className="historias-header">
    <Navegacion />
    <h3 className="historias-header-titulo">
      Historias de los mas valientes
    </h3>
    {userRole === "admin" && (
      <button className="adopcion-header-btn" onClick={handleOpenCrear}>
        Crear Historias
      </button>
    )}
    <CrearHistoria open={openCrear} onClose={handleCloseCrear} />
  </section>

    <section className="historias-main">
      {historias.map(historia => (
        <article key={historia.id} className="historias-main-contenido" onClick={() => handleOpen(historia)}>
        
          <img className="historias-main-contenido-img" src={historia.carusel ? extractUrls(historia.carusel)[0] : undefined} alt="Cover" />
          <ButtonToolbar>
            <AdminActionsDropdown historiaId={historia} />
          </ButtonToolbar>
          <div className="home-historias-item-details">
            <h4 className="historias-main-contenido-titulo">{historia.titulo}</h4>
            <p className="historias-main-contenido-fecha">{new Date(historia.fecha).toLocaleDateString("es-ES")}</p>
            
          </div>
        </article>
      ))}

      {selectedHistoria && (
        <Modal size="sm" open={open} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title>{selectedHistoria.titulo}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="home-historias-modal-date">{new Date(selectedHistoria.fecha).toLocaleDateString("es-ES")}</p>
            <p className="home-historias-modal-description">{selectedHistoria.descripción}</p>
            <Carousel autoplay className="custom-slider">
              {imageUrls.map((foto, index) => (
                <img key={index} src={foto} height="100" width="100px" alt={`Slide ${index + 1}`} />
              ))}
            </Carousel>
          </Modal.Body>
        </Modal>
      )}
    </section>
    </section>
  );
};


export default Main;
