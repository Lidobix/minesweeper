import React from 'react';
import Grid from './components/grid/grid';
import Counter from './components/counter';
import { useGame } from './hooks/useGame';
import { CellType } from './types';

const MineSweeper = () => {
  const { grid, flags, openCell, toggleFlag, resetGame } = useGame();

  const handleToggleFlag = (cell: CellType, e: React.MouseEvent) => {
    e.preventDefault();
    toggleFlag(cell);
  };

  return (
    <div>
      <button onClick={resetGame}>Nouvelle partie</button>
      <Counter value={flags}></Counter>
      <Grid
        datas={grid}
        leftClick={openCell}
        rightClick={handleToggleFlag}
      ></Grid>
    </div>
  );
};

export default MineSweeper;
