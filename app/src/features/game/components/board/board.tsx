import Cell from '../cell/cell';
import { ROWS, CELL_SIZE } from '../../constants';
import styles from './board.module.css';
import { BoardGameProps } from '../../types';

const Board = ({ datas, leftClick, rightClick }: BoardGameProps) => {
  return (
    <div
      className={styles.main_container}
      style={{ width: `${ROWS * CELL_SIZE}px` }}
    >
      {datas.length > 0
        ? datas.map((cell, index) => (
            <Cell
              key={index}
              value={cell.value}
              isBomb={cell.isBomb}
              isOpen={cell.isOpen}
              onClick={() => leftClick(cell)}
              onContextMenu={(e) => rightClick(cell, e)}
              hasFlag={cell.hasFlag}
            ></Cell>
          ))
        : null}
    </div>
  );
};

export default Board;
