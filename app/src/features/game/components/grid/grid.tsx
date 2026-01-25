import { memo } from 'react';
import Cell from '../cell/cell';
import styles from './grid.module.css';

import { GridGameProps } from '../../types';

const RawGrid = ({
  datas,
  leftClick,
  rightClick,
  status,
  cols,
  rows,
}: GridGameProps) => {
  console.log(cols, rows);
  return (
    <div
      className={styles.main_container}
      style={
        {
          '--color': 'red',
          '--rows': rows,
          '--cols': cols,
        } as React.CSSProperties
      }
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
