import Cell from '../cell/cell';
import styles from './grid.module.css';
import { ROWS, CELL_SIZE } from '../../constants';
import { GridGameProps } from '../../types';

const Grid = ({ datas, leftClick, rightClick, status }: GridGameProps) => {
  return (
    <div
      className={styles.main_container}
      style={{
        width: `${ROWS * CELL_SIZE}px`,
        cursor: status !== 'playing' ? 'default' : 'pointer',
      }}
    >
      {datas.length > 0
        ? datas.map((cell, index) => (
            <Cell
              key={index}
              cell={cell}
              onClick={leftClick}
              onContextMenu={rightClick}
            ></Cell>
          ))
        : null}
    </div>
  );
};

export default Grid;
