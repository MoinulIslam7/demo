import React, { useEffect } from 'react';
import './ModalWrapper.css';

export default function ModalWrapper({ toggleModal, isOpen, children }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        toggleModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, toggleModal]);

  return (
    <div className={`modal ${isOpen ? 'visible' : ''}`} onClick={toggleModal} role="contentinfo" onKeyDown={() => { }}>
      <div className="modal__wrapper" onClick={(e) => e.stopPropagation()} role="contentinfo" onKeyDown={() => { }}>
        <div className="modal__content">{children}</div>
      </div>
    </div>
  );
}
