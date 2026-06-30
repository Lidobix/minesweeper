import { useEffect } from 'react';
import styles from './modal.module.css';
import { ModalProps } from '../../types';
import LevelSelector from '../../features/game/components/levelSelector/levelSelector';

const Modal = ({ isOpen, toggle }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      // document.body.style.width = '100%';
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.position = '';
      // document.body.style.width = '';
    };
  }, [isOpen]);

  return (
    <div className={styles.main_container}>
      <div className={styles.modal}>
        <p>JE SUIS LA MODALE</p>
        <LevelSelector ></LevelSelector>
        <button onClick={toggle}>⚙️</button>
      </div>
    </div>
  );
};

export default Modal;
