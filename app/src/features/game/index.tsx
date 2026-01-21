import React, { useCallback, useEffect } from 'react';
import Grid from './components/grid/grid';
import { useGame } from './hooks/useGame';
import { CellType } from './types';
import Header from './components/header/header';
import styles from './index.module.css';
import { MINES_QTY } from './constants';

const MineSweeper = () => {
  const { grid, status, openCell, toggleFlag, setNewGame } = useGame();

  const handleToggleFlag = useCallback(
    (cell: CellType, e: React.MouseEvent) => {
      e.preventDefault();
      toggleFlag(cell);
    },
    [toggleFlag],
  );

  const activeFlags = grid.filter((c) => c.hasFlag).length;
  const remainingFLags = MINES_QTY - activeFlags;

  useEffect(setNewGame, []);

  return (
    <div>
      <div
        className={styles.main_container}
        style={{
          borderColor:
            status === 'win'
              ? '#23ce6b'
              : status === 'lost'
                ? 'red'
                : '#3f4747',
        }}
      >
        <Header
          flags={remainingFLags}
          buttonClick={setNewGame}
          gameStatus={status}
        ></Header>
        <Grid
          datas={grid}
          leftClick={openCell}
          rightClick={handleToggleFlag}
        ></Grid>
        <div></div>
      </div>
    </div>
  );
};

export default MineSweeper;
