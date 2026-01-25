import { CounterProps } from '../../types';
import styles from './counter.module.css';

const Counter = ({ value, style }: CounterProps) => {
  return (
    <div className={styles.main_container} style={{ ...style }}>
      <p className={styles.text}>{value}</p>
    </div>
  );
};

export default Counter;
