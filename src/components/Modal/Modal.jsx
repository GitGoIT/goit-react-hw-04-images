import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import css from './/modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');                      // create Portal from ..public/index.html string 62 - <div id="modal-root"></div>

export const Modal = ({ closeModal, children }) => {

  const overlayCloseModal = useCallback(
    ({ target, currentTarget, code }) => {                                   // Modal close when Click only on overlay zone
      if (target === currentTarget || code === 'Escape') {                   // 2. cheking and waiting for Escape
        closeModal();
      }
    }, [closeModal]);

  useEffect(() => {
    document.addEventListener('keydown', overlayCloseModal);                 // 1. add listener for Escape

    return () => document.removeEventListener('keydown', overlayCloseModal); // 3. remove listener for Escape
  }, [overlayCloseModal]);

  return createPortal(
    <div className={css.Overlay} onClick={overlayCloseModal}>
      <div className={css.Modal}>{children}</div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};