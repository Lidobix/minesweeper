import { memo } from 'react';
import { CELL_SIZE } from '../../constants';
import { SquareRenderProps } from '../../types';
import styles from './square.module.css';

const RawSquare = ({
  value,
  isOpen,
  isBomb,
  hasFlag,
  onClick,
  onContextMenu,
}: SquareRenderProps) => {
  const setCellContent = (): string | null => {
    if (hasFlag) {
      return '🚩';
    } else if (isOpen && isBomb) {
      return '💥';
    } else if (isOpen && value !== 0) {
      return value.toString();
    } else {
      return null;
    }
  };

  return (
    <div
      onClick={onClick}
      onContextMenu={onContextMenu}
      className={styles.square_container}
      style={{
        height: `${CELL_SIZE}px`,
        width: `${CELL_SIZE}px`,
        backgroundColor: isOpen ? 'grey' : 'transparent',
      }}
    >
      <p className={styles.value}>{setCellContent()}</p>
    </div>
  );
};

const Square = memo(RawSquare);

export default Square;
