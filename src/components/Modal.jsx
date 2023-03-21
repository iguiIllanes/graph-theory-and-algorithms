import React from 'react';
import '../styles/Modal.css';

const Modal = ({ show, onClose, title, content }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <div className="modal-main">
        <button className="close" onClick={onClose}>
          X
        </button>
        {title && <h2>{title}</h2>}
        <div className="modal-content">{content}</div>

      </div>
    </div>
  );
};

export default Modal;