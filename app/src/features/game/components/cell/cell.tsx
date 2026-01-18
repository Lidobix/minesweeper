import { memo } from 'react';
import { CELL_SIZE } from '../../constants';
import { CellProps } from '../../types';
import styles from './cell.module.css';

const RawCell = ({
  value,
  isOpen,
  isMine,
  hasFlag,
  onClick,
  onContextMenu,
}: CellProps) => {
  const setCellContent = (): string | null => {
    if (hasFlag) {
      return '🚩';
    } else if (isOpen && isMine) {
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
      className={styles.main_container}
      style={{
        height: `${CELL_SIZE}px`,
        width: `${CELL_SIZE}px`,
        backgroundColor: isOpen ? '#3f4747' : '#23ce6b',
      }}
    >
      <p
        className={styles.value}
        style={{
          color:
            value === 1
              ? '#2D7DD2'
              : value === 2
              ? '#EEB902'
              : value === 3
              ? '#DB5A42'
              : 'blach',
        }}
      >
        {setCellContent()}
      </p>
    </div>
  );
};

const Cell = memo(RawCell);

export default Cell;
