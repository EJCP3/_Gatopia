import { useState } from 'react';
import { createPortal } from 'react-dom';
import Modal from './Modal';
import './modal.scss';

export default function BtnModal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button className='btn-unete' onClick={() => setShowModal(true)}>
        Unete a nosotros
      </button>
      {showModal && createPortal(
        <Modal onClose={() => setShowModal(false)} />,
        document.body
      )}
    </>
  );
}
