import { memo } from 'react';
import {
  CUSTOM_GREEN,
  CUSTOM_GREY,
  MINES_INDICATOR_COLORS,
} from '../../constants/config';
import { CellProps } from '../../types';
import styles from './cell.module.css';

const RawCell = ({ cell, onClick, onContextMenu, status }: CellProps) => {
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
        backgroundColor: cell.isOpen ? CUSTOM_GREY : CUSTOM_GREEN,
        cursor:
          status !== 'playing' && status !== 'standBy'
            ? 'default'
            : cell.isOpen
              ? 'default'
              : 'pointer',
      }}
    >
      <p
        className={styles.value}
        style={{
          color: MINES_INDICATOR_COLORS[cell.value],
        }}
      >
        {setCellContent()}
      </p>
    </div>
  );
};

const Cell = memo(RawCell);

export default Cell;
