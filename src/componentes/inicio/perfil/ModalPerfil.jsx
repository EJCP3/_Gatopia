import { FaTimes } from "react-icons/fa";
import  Perfil  from './Perfil';
import './modalPerfil.scss'


const ModalPerfil = ({onClose}) => {

 

  return (
    <section className="modalP">
      <Perfil/>
      <button className='modalP-btnCerrar' onClick={onClose}>
        <FaTimes />
      </button>
    </section>
  );
}

export default ModalPerfil;
