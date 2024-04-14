import { useState } from 'react';
import { Modal, ButtonToolbar, Button, Placeholder } from 'rsuite';
import Contraseña from './Contraseña';
import DatoPerfil from '../DatoPerfil';




 



const ModalPerfil = ({ size, open, onClose }) => {

   const [openPerfil, setOpenPerfil] = useState(false);
   const [editar, setEditar] = useState(true);
  const handleOpenPerfil = (e) => {
    e.stopPropagation();
    setOpenPerfil(true)
    
  };
  const handleClosePerfil = (e) => {
    e.stopPropagation()
    setOpenPerfil(false);
   

  };



  const [openContraseña, setOpenContraseña] = useState(false);
  const [sizeContraseña, setsizeContraseña] = useState();
  
  const handleOpenContraseña = (e) => {
    e.stopPropagation();
    setsizeContraseña("sm");
    setOpenContraseña(true)
  };
  const handleCloseContraseña = (e) => {
    e.stopPropagation()
    setOpenContraseña(false);
   

  };

  return (
    <section>
       <Modal size={"xs"} open={open} onClose={onClose} >
        <Modal.Header>
          <Modal.Title>Configuración</Modal.Title>
        </Modal.Header>
        <Modal.Body className='conte-btn'>
        <Button  size="lg" color="orange" appearance="primary" onClick={(e) => handleOpenPerfil(e) }>
        Configurar Perfil
      </Button>
       
      <Button  size="lg" color="orange" appearance="primary"  onClick={(e) => handleOpenContraseña(e)} >
        Cambiar Contraseña
      </Button>
       <Contraseña size={sizeContraseña} open={openContraseña} onClose={handleCloseContraseña}/>
       <DatoPerfil  open={openPerfil} onClose={handleClosePerfil} editar={editar}/>
        </Modal.Body>
      </Modal>
    </section>
  )
}

export default ModalPerfil