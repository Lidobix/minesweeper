import { useEffect } from 'react';
import Button from '../../features/game/components/button/button';
import styles from './modal.module.css';
import { ModalProps } from '../../types';

const Modal = ({ isOpen, toggle }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  return (
    <div className={styles.main_container}>
      <div className={styles.modal}>
        <p>JE SUIS LA MODALE</p>
        <Button text="⚙️" onClick={toggle}></Button>
      </div>
    </div>
  );
};

export default Modal;
