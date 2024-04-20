import { useState, useEffect } from 'react';
import { Modal, Carousel, Panel, Row, Col, Grid } from 'rsuite';
import './estilos/layout/_home.scss';
import CrearPublicacion from './CrearPublicacion';
import { supabase } from '../../supabase/client';
 // Asegúrate de ajustar la ruta

 
const Header = () => {

  const [gatos, setGatos] = useState([]);
  const [selectedGato, setSelectedGato] = useState(null);
  const [openInfoGato, setOpenInfoGato] = useState(false);

  useEffect(() => {
    const fetchRandomGatos = async () => {
      const { data, error } = await supabase.from('adopcion').select('*');
      if (error) {
        console.error('Error fetching gatos:', error);
        return;
      }
      // Asignar imágenes de gatos de forma aleatoria y actualizar diariamente
      const shuffled = data.sort(() => 0.3 - Math.random());
      setGatos(shuffled.slice(0, 3));
    };

    fetchRandomGatos();
    const intervalId = setInterval(fetchRandomGatos, 86400000); // 86400000 ms = 24 horas
    return () => clearInterval(intervalId);
  }, []);

  // const handleOpen = (e, gato) => {
  //   e.stopPropagation();
  //   setSelectedGato(gato);
  //   setOpen(true);
  // };



  const handleOpenInfoGato = (gato) => {
    setSelectedGato(gato);
    setOpenInfoGato(true);
  };

  const handleCloseInfoGato = () => {
    setOpenInfoGato(false);
    setSelectedGato(null);

  };

  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();

  const handleClose = (e) => {
    console.log("header")
  if (e) e.stopPropagation();
  setOpen(false);
  };

  
  const handleOpen = (e) => {
    console.log("header")
    e.stopPropagation();
    setSize("sm");
    setOpen(true);
  };

  return (
    <section className="home-header">
      <h2 className="home-header-titulo">Gato del día</h2>

      <section className='home-header-contenedor'>
      {gatos.map((gato) => (
      <picture key={gato.id} onClick={() => handleOpenInfoGato(gato)} >
          <img className='home-header-contenedor-img' src={gato.foto[0]} height="200" alt={gato.nombre} />
          </picture>

      ))}
      </section>
      {selectedGato && (
        <Modal size="xs" open={openInfoGato} onClose={handleCloseInfoGato}>
          <Modal.Header>
            <Modal.Title>{selectedGato.nombre}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Carousel  autoplay className="home-header-custom-slider">
              {selectedGato.foto.map((foto, index) => (
                <img  key={index} src={foto} alt={`Gato ${index + 1}`} />
              ))}
            </Carousel>
            <Grid fluid>
            
            <Row  style={{marginTop:10}}>
      <Col  xs={24} sm={24} md={8}>
        <Panel bordered header="Sexo">
          <p>{selectedGato.sexo || "Sin información"}</p>
        </Panel>
      </Col>
   
   
      <Col  xs={24} sm={24} md={8}>
        <Panel bordered header="Edad">
          <p>{selectedGato.edad || "Sin información"}</p>
        </Panel>
      </Col>
   
   
    
      <Col  xs={24} sm={24} md={8}>
        <Panel bordered header="Tamaño">
          <p>{selectedGato.tamaño || "Sin información"}</p>
        </Panel>
      </Col>
    
   
      <Col  xs={24} sm={24} md={8}>
        <Panel bordered header="nota">
          <p>{selectedGato.nota || "Sin información"}</p>
        </Panel>
      </Col>
      <Col  xs={24} sm={24} md={8}>
        <Panel bordered header="condiciones">
          <p>{selectedGato.condiciones || "Sin información"}</p>
        </Panel>
      </Col>
            </Row>
            </Grid>
          </Modal.Body>
        </Modal>
      )}
      <input className="home-header-input" placeholder="¿En qué estás pensando?" onClick={(e) => handleOpen(e)}/>
      <CrearPublicacion size={size} open={open} onCloseHeader={handleClose} />
    </section>
  );
};

export default Header;
