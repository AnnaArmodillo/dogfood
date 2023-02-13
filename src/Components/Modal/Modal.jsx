import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import modalStyle from './modal.module.css';

function ModalInner({ closeModalHandler, children }) {
  useEffect(() => {
    function closeModalByEscape(event) {
      if (event.key === 'Escape') {
        closeModalHandler();
      }
    }
    document.addEventListener('keydown', closeModalByEscape);
    return () => {
      document.removeEventListener('keydown', closeModalByEscape);
    };
  }, []);
  function closeModalByClickX() {
    closeModalHandler();
  }
  return (
    <div className={modalStyle.modalInner}>
      <button
        type="button"
        className={modalStyle.buttonClose}
        onClick={closeModalByClickX}
      >
        <i className="fa-solid fa-xmark" />
      </button>
      {children}
    </div>
  );
}

export function Modal({ isModalActive, closeModalHandler, children }) {
  function closeModalByClickWrapper(event) {
    if (event.target === event.currentTarget) {
      closeModalHandler();
    }
  }
  if (!isModalActive) return null;
  return createPortal(
    <div onMouseDown={closeModalByClickWrapper} className={modalStyle.modal}>
      <ModalInner closeModalHandler={closeModalHandler}>
        {children}
      </ModalInner>
    </div>,
    document.getElementById('root'),
  );
}
