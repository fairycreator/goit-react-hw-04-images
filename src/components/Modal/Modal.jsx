import React, { useEffect } from 'react';
import '../Styles/styles.css';

const Modal = ({ largeImageURL, onClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleModalClose = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="Overlay" onClick={handleModalClose}>
      <div className="Modal">
        <img src={largeImageURL} alt="Large version" />
      </div>
    </div>
  );
};

export default Modal;
