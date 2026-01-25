import { useContext } from 'react';
import styles from './timer.module.css';
import { GameContext } from '../../contexts/gameContext';
import { formatTime } from '../../utils';
import { useTimer } from '../../hooks/useTimer';
import { TimerProps } from '../../types';

const Timer = ({ style }: TimerProps) => {
  useTimer();
  const { time } = useContext(GameContext);

  return (
    <div className={styles.main_container} style={{ ...style }}>
      <p className={styles.value}>{formatTime(time)}</p>
    </div>
  );
};

export default Timer;
