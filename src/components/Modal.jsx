import React from 'react';
import '../styles/Modal.css';

const Modal = ({ show, onClose, content }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <div className="modal-main">
        <button className="close" onClick={onClose}>
          X
        </button>
        <center>{content}</center>
      </div>
    </div>
  );
};

export default Modal;