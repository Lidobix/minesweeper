import { memo } from 'react';
import { CELL_SIZE } from '../../constants';
import { CellProps } from '../../types';
import styles from './cell.module.css';

const RawCell = ({ cell, onClick, onContextMenu }: CellProps) => {
  const setCellContent = (): string | null => {
    if (cell.hasFlag) {
      return '🚩';
    } else if (cell.isOpen && cell.isMine) {
      return '💥';
    } else if (cell.isOpen && cell.value !== 0) {
      return cell.value.toString();
    } else {
      return null;
    }
  };

  const handleLeftCLick = () => onClick(cell);
  const handleRightClick = (e: React.MouseEvent) => onContextMenu(cell, e);
  return (
    <div
      onClick={handleLeftCLick}
      onContextMenu={handleRightClick}
      className={styles.main_container}
      style={{
        height: `${CELL_SIZE}px`,
        width: `${CELL_SIZE}px`,
        backgroundColor: cell.isOpen ? '#3f4747' : '#23ce6b',
      }}
    >
      <p
        className={styles.value}
        style={{
          color:
            cell.value === 1
              ? '#2D7DD2'
              : cell.value === 2
                ? '#EEB902'
                : cell.value === 3
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
