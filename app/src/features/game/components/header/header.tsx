import Counter from '../counter';
import { HeaderProps } from '../../types';
import styles from './header.module.css';
import Button from '../button/button';
import Timer from '../timer/timer';

const Header = ({ flags, buttonClick, status }: HeaderProps) => {
  return (
    <div className={styles.main_container}>
      <Timer style={{ flexBasis: '30%' }}></Timer>
      <Button
        text={status === 'lost' ? '😫' : status === 'win' ? '😎' : '🙂'}
        onClick={buttonClick}
      ></Button>
      <Counter value={flags} style={{ flexBasis: '30%' }}></Counter>
    </div>
  );
};

export default Header;
