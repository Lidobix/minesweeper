import { ButtonProps } from '../../types';
import styles from './button.module.css';

const Button = ({ onClick, text }: ButtonProps) => {
  return (
    <button onClick={onClick} className={styles.main_container}>
      {text}
    </button>
  );
};

export default Button;
