import React, { useCallback, useEffect, memo } from 'react';
import Grid from './components/grid/grid';
import { useGame } from './hooks/useGame';
import { CellType } from './types';
import GameHeader from './components/gameHeader/gameHeader';
import styles from './index.module.css';
import { STATUS_COLOR } from './constants/config';
import LevelSelector from './components/levelSelector/levelSelector';

interface MineSwiperProps {
  style?: React.CSSProperties;
}

const RawMineSweeper = ({ style }: MineSwiperProps) => {
  const {
    grid,
    status,
    cols,
    rows,
    minesQty,
    levels,
    openCell,
    toggleFlag,
    resetGame,
    selectLevel,
  } = useGame();

  const handleToggleFlag = useCallback(
    (cell: CellType, e: React.MouseEvent) => {
      e.preventDefault();
      toggleFlag(cell);
    },
    [toggleFlag],
  );

  useEffect(() => {
    console.log('useeffetc');
    resetGame();
  }, [resetGame]);

  const activeFlags = grid.filter((c) => c.hasFlag).length;
  const remainingFLags = minesQty - activeFlags;

  return (
    <div
      className={styles.main_container}
      style={{
        ...style,
        borderColor: STATUS_COLOR[status],
      }}
    >
      <div
        className={`${styles.element} ${styles.side_element}`}
        style={{
          background: 'orange',
        }}
      >
        <LevelSelector
        // selectLevel={selectLevel}
        // levels={levels}
        ></LevelSelector>
      </div>

      <div className={styles.element} style={{}}>
        <GameHeader
          flags={remainingFLags}
          buttonClick={resetGame}
          status={status}
        ></GameHeader>
        <Grid
          cols={cols}
          rows={rows}
          datas={grid}
          leftClick={openCell}
          rightClick={handleToggleFlag}
          status={status}
        ></Grid>
      </div>
      <div
        className={`${styles.element} ${styles.side_element}`}
        style={{}}
      ></div>
    </div>
  );
};

const MineSweeper = memo(RawMineSweeper);

export default MineSweeper;
