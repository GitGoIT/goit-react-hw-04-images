import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './/modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');              // create Portal from ..public/index.html string 62 - <div id="modal-root"></div>

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.overlayCloseModal);     // 1. add listener for Escape
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.overlayCloseModal); // 3. uremove listener for Escape
  }

  overlayCloseModal = ({ target, currentTarget, code }) => {         // Modal close when Click only on overlay zone
    if (target === currentTarget || code === 'Escape') {             // 2. cheking and waiting for Escape
      this.props.closeModal();
    }
  };

  render() {
    const { children } = this.props;
    const { overlayCloseModal } = this;
    return createPortal(
      <div className={css.Overlay} onClick={overlayCloseModal}>
        <div className={css.Modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
