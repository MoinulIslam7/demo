import React, { useEffect } from 'react';
import './ModalWrapper.css';
/**
 * Renders a modal wrapper component.
 *
 * This component wraps content within a modal that can be toggled to open or close.
 * It provides functionality to close the modal when the Escape key is pressed.
 *
 * @param {Object} props - The component props.
 * @param {function} props.toggleModal - The function to toggle the modal open or close.
 * @param {boolean} props.isOpen - A boolean indicating whether the modal is open or not.
 * @param {React.ReactNode} props.children - The content to be rendered within the modal.
 * @returns {JSX.Element} The rendered modal wrapper component.
 */

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
