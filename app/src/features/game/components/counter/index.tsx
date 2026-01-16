import { CounterProps } from '../../types';
import styles from './counter.module.css';

const Counter = ({ value }: CounterProps) => {
  return (
    <div className={styles.main_container}>
      <p className={styles.text}>🚩 {value}</p>
    </div>
  );
};

export default Counter;
