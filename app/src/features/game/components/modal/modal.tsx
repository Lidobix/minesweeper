import React from 'react';
import { ModalProps } from '../../types';

const Modal = ({ status }: ModalProps) => {
  return (
    <div>
      <p>{status === 'lost' ? 'PERDU !!!' : 'GAGNE!!!!'}</p>
    </div>
  );
};

export default Modal;
