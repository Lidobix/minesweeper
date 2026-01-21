import React, { useCallback } from 'react';
import Grid from './components/grid/grid';
import { useGame } from './hooks/useGame';
import { CellType } from './types';
import Header from './components/header/header';
import styles from './index.module.css';
import { MINES_QTY, STATUS_COLOR } from './constants';

const MineSweeper = () => {
  const { grid, status, openCell, toggleFlag, resetGame } = useGame();

  const handleToggleFlag = useCallback(
    (cell: CellType, e: React.MouseEvent) => {
      e.preventDefault();
      toggleFlag(cell);
    },
    [toggleFlag],
  );

  const activeFlags = grid.filter((c) => c.hasFlag).length;
  const remainingFLags = MINES_QTY - activeFlags;

  return (
    <div>
      <div
        className={styles.main_container}
        style={{
          borderColor: STATUS_COLOR[status],
        }}
      >
        <Header
          flags={remainingFLags}
          buttonClick={resetGame}
          gameStatus={status}
        ></Header>
        <Grid
          datas={grid}
          leftClick={openCell}
          rightClick={handleToggleFlag}
          status={status}
        ></Grid>
        <div></div>
      </div>
    </div>
  );
};

export default MineSweeper;
