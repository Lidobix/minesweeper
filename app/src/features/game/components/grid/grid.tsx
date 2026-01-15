import Cell from '../cell/cell';
import styles from './grid.module.css';
import { ROWS, CELL_SIZE } from '../../constants';
import { GridGameProps } from '../../types';

const Grid = ({ datas, leftClick, rightClick }: GridGameProps) => {
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
              isMine={cell.isMine}
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

export default Grid;
