import React, { useEffect, useRef } from 'react';
import './ModalWrapper.css';

export default function ModalWrapper({ toggleModal, isOpen, children }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && modalRef.current && !modalRef.current.contains(event.target)) {
        toggleModal();
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleModal]);

  return (
    <div className="modal" style={!isOpen ? { display: 'none' } : null}>
      <div className="modal__wrapper" ref={modalRef}>
        {children}
      </div>
    </div>
  );
}
