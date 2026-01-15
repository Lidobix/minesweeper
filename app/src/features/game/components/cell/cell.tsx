import { memo } from 'react';
import { CELL_SIZE } from '../../constants';
import { CellProps } from '../../types';
import styles from './cell.module.css';

const RawCell = ({
  value,
  isOpen,
  isBomb,
  hasFlag,
  onClick,
  onContextMenu,
}: CellProps) => {
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
      className={styles.cell_container}
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

const Cell = memo(RawCell);

export default Cell;
