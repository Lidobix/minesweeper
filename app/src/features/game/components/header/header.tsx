import Counter from '../counter';
import { HeaderProps } from '../../types';
import styles from './header.module.css';
import Button from '../button/button';

const Header = ({ flags, buttonClick, gameStatus }: HeaderProps) => {
  return (
    <div className={styles.main_container}>
      <Button
        text={gameStatus === 'lost' ? '😫' : '🙂'}
        onClick={buttonClick}
      ></Button>
      <Counter value={flags}></Counter>
    </div>
  );
};

export default Header;
