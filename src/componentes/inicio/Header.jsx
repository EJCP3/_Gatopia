import { useState } from 'react';
import './estilos/layout/_home.scss'
import CrearPublicacion from './CrearPublicacion';


const Header = () => {
  
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
    <section className="home-header" >
       
        <h2 className="home-header-titulo">Gato del dias</h2>
        <picture className="home-header-img">
            <img src="/src/assets/mobile/gatodias1.svg"/>
            <img src="/src/assets/mobile/gatodias1.svg"/>
            <img src="/src/assets/mobile/gatodias1.svg"/>
            <img src="/src/assets/mobile/gatodias2.svg"/>
            <img src="/src/assets/mobile/gatodias3.svg"/>
        </picture>
        <input className="home-header-input" placeholder="¿En qué estás pensando?" onClick={(e) => handleOpen(e)}/>
        <CrearPublicacion
        size={size} open={open} onCloseHeader={handleClose}
       
      />
    </section>
  )
}

export default Header