import Counter from '../counter';
import { GameHeaderProps } from '../../types';
import styles from './gameHeader.module.css';
import Timer from '../timer/timer';

const GameHeader = ({ flags, buttonClick, status }: GameHeaderProps) => {
  return (
    <div className={styles.main_container}>
      <Timer style={{ flexBasis: '30%' }}></Timer>
      <button style={{ fontSize: '2rem' }} onClick={buttonClick}>
        {status === 'lost' ? '😫' : status === 'win' ? '😎' : '🙂'}
      </button>
      <Counter value={flags} style={{ flexBasis: '30%' }}></Counter>
    </div>
  );
};

export default GameHeader;
