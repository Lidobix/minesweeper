import React, { useCallback, useEffect, memo } from 'react';
import Grid from './components/grid/grid';
import { useGame } from './hooks/useGame';
import { CellType } from './types';
import Header from './components/header/header';
import styles from './index.module.css';
import { STATUS_COLOR } from './constants/config';

interface MineSwiperProps {
  style?: React.CSSProperties;
}

const RawMineSweeper = ({ style }: MineSwiperProps) => {
  const {
    grid,
    status,
    openCell,
    toggleFlag,
    resetGame,
    cols,
    rows,
    minesQty,
  } = useGame();

  const handleToggleFlag = useCallback(
    (cell: CellType, e: React.MouseEvent) => {
      e.preventDefault();
      toggleFlag(cell);
    },
    [toggleFlag],
  );

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  const activeFlags = grid.filter((c) => c.hasFlag).length;
  const remainingFLags = minesQty - activeFlags;

  return (
    <div
      className={styles.main_container}
      style={{ ...style, borderColor: STATUS_COLOR[status] }}
    >
      <Header
        flags={remainingFLags}
        buttonClick={resetGame}
        status={status}
      ></Header>
      <Grid
        cols={cols}
        rows={rows}
        datas={grid}
        leftClick={openCell}
        rightClick={handleToggleFlag}
        status={status}
      ></Grid>
    </div>
  );
};

const MineSweeper = memo(RawMineSweeper);

export default MineSweeper;
