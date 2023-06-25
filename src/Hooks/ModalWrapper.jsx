import React, { useEffect } from 'react';

/**
 * This component renders a popper at different parts of the website.
 * @param {Object} props - The component props.
 * @param {JSX.Element} props.children - The JSX content to be rendered inside the component.
 * @param {React.RefObject} props.modalRef - The reference to the modal element.
 * @returns {JSX.Element} - The JSX for the PopperComponent.
 */
export default function ModalWrapper({ children, modalRef }) {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        modalRef.current.classList.add('hidden');
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [modalRef]);

  return (
    <div ref={modalRef} className="hidden">
      {children}
    </div>
  );
}
