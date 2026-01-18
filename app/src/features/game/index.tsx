import React, { useCallback, useEffect, useState } from 'react';
import Grid from './components/grid/grid';
import { useGame } from './hooks/useGame';
import { CellType, StatusType } from './types';
import Header from './components/header/header';
import Button from './components/button/button';
import styles from './index.module.css';

const MineSweeper = () => {
  const { grid, flags, status, endGame, openCell, toggleFlag, setNewGame } =
    useGame();

  const handleToggleFlag = (cell: CellType, e: React.MouseEvent) => {
    e.preventDefault();
    toggleFlag(cell);
  };

  useEffect(setNewGame, []);

  return (
    <div>
      <div className={styles.main_container}>
        <Header
          flags={flags}
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
