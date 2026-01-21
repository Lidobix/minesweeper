import { ButtonProps } from '../../types';
import styles from './button.module.css';

const Button = ({ onClick, text, style }: ButtonProps) => {
  return (
    <button onClick={onClick} className={styles.main_container} style={style}>
      {text}
    </button>
  );
};

export default Button;
