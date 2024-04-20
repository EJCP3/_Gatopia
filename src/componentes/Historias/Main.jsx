import React, { useEffect, useState } from 'react';
import { supabase } from "../../supabase/client";
import { Toaster,  toast } from "sonner";
import { Carousel, Modal, ButtonToolbar, Button } from "rsuite";
import "rsuite/dist/rsuite.min.css";

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
  const [userRole, setUserRole] = useState(null); 

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

  const onHistoriaChange = () => {
    fetchHistorias();  // Recarga las historias
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

  const handleDelete = async (historiaId) => {
    if (userRole === "admin") {
      const { error } = await supabase.from("historias").delete().eq('id', historiaId);
      if (error) {
        toast.error("Error al eliminar la historia: " + error.message);
      } else {
        toast.success("Historia eliminada correctamente");
        fetchHistorias();
      }
    }
  };


  const handleOpenCrearParaEditar = (historia) => {
    setSelectedHistoria(historia);
    setOpenCrear(true);
  };

 



  return (
<section>
    <section className="historias-header">
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
         
          <div className="home-historias-item-details">
            <h4 className="historias-main-contenido-titulo">{historia.titulo}</h4>
            <p className="historias-main-contenido-fecha">{new Date(historia.fecha).toLocaleDateString("es-ES")}</p>
            
          </div>
        </article>
      ))}

      {selectedHistoria && (
        <Modal size="sm" open={open} onClose={handleClose} className="historias-modal">
    <Modal.Header>
        <Modal.Title>{selectedHistoria.titulo}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <p className="home-historias-modal-description">{selectedHistoria.descripción}</p>
        <Carousel autoplay className="custom-slider">
            {imageUrls.map((foto, index) => (
                <img key={index} src={foto} alt={`Slide ${index + 1}`} />
            ))}
        </Carousel>
        <p className="home-historias-modal-date">{new Date(selectedHistoria.fecha).toLocaleDateString("es-ES")}</p>
    </Modal.Body>
    <Modal.Footer>
          {userRole === "admin" && (
                <>
                  <Button color="blue" appearance="primary" onClick={() => setOpenCrear(true)}>Editar</Button>
                  <Button color="red" appearance="primary" onClick={() => handleDelete(selectedHistoria.id)}>Eliminar</Button>
                </>
              )}
          </Modal.Footer>
</Modal>
      )}
      {openCrear && (
        <CrearHistoria
          open={true}
          onClose={() => setOpenCrear(false)}
          historia={selectedHistoria}
          onHistoriaChange={onHistoriaChange}  
        />
      )}
    </section>
    </section>
  );
};


export default Main;
