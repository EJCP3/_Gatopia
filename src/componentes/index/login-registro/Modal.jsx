import React, { useState } from 'react';
import './modal.scss';
import { FaTimes } from "react-icons/fa";
import Aside from './Aside';
import Login from './Login';
import Registro from './Registro';

const Modal = ({ onClose }) => {
  const [formToShow, setFormToShow] = useState('registro');

  const toggleForm = (form) => {
    setFormToShow(form);
  };

  return (
    <section className="modal">
      <button className='modal-btnCerrar' onClick={onClose}>
        <FaTimes />
      </button>
      {formToShow === 'registro' ? <Login /> : <Registro />}
      <Aside onToggleForm={toggleForm} />
    </section>
  );
}

export default Modal;
