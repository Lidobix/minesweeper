import { useContext } from 'react';
import styles from './timer.module.css';
import { GameContext } from '../../context/gameContext';
import { formatTime } from '../../utils';
import { useTimer } from '../../hooks/useTimer';

const Timer = () => {
  useTimer();
  const { time } = useContext(GameContext);

  return (
    <div className={styles.main_container}>
      <p className={styles.value}>{formatTime(time)}</p>
    </div>
  );
};

export default Timer;
