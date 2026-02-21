import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, children, title }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isVisible]);

  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay"
      onClick={handleClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease'
      }}
    >
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#141414',
          borderRadius: '12px',
          padding: '30px',
          maxWidth: '90%',
          maxHeight: '90%',
          overflow: 'auto',
          position: 'relative',
          transform: isVisible ? 'scale(1)' : 'scale(0.9)',
          transition: 'transform 0.3s ease',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '5px',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.background = 'rgba(229, 9, 20, 0.8)'}
          onMouseOut={(e) => e.target.style.background = 'none'}
        >
          ×
        </button>
        
        {title && (
          <h2 style={{
            color: '#e50914',
            margin: '0 0 20px 0',
            fontSize: '24px',
            fontWeight: 'bold'
          }}>
            {title}
          </h2>
        )}
        
        <div style={{ color: '#fff' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
