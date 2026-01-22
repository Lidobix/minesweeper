import { memo } from 'react';
import Cell from '../cell/cell';
import styles from './grid.module.css';
import { ROWS, CELL_SIZE } from '../../constants';
import { GridGameProps } from '../../types';

const RawGrid = ({ datas, leftClick, rightClick, status }: GridGameProps) => {
  return (
    <div
      className={styles.main_container}
      style={{
        width: `${ROWS * CELL_SIZE}px`,
      }}
    >
      {datas.length > 0
        ? datas.map((cell, index) => (
            <Cell
              key={index}
              cell={cell}
              onClick={leftClick}
              onContextMenu={rightClick}
              status={status}
            ></Cell>
          ))
        : null}
    </div>
  );
};

const Grid = memo(RawGrid);

export default Grid;
