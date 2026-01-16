import Counter from '../counter';
import { HeaderProps } from '../../types';

const Header = ({ flags }: HeaderProps) => {
  return <Counter value={flags}></Counter>;
};

export default Header;
