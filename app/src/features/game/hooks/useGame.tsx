import { useEffect } from 'react';

import { CellType, GridType } from '../types';

import { getOpenedCells, placeFlag, generateGrid } from '../controller';
import { useContext } from 'react';
import { GameContext } from '../context/gameContext';

export const useGame = () => {
  const { grid, flags, setGrid, updateFlags } = useContext(GameContext);

  const resetGame = () => {
    const newGrid = generateGrid();
    setGrid(newGrid);
  };

  useEffect(resetGame, [setGrid]);

  const openCell = (cell: CellType) => {
    const updateGrid = getOpenedCells(cell, grid);

    setGrid(updateGrid);

    // if (cell.hasFlag || endGame) {
    //   return;
    // }
    // setEndGame(cell.isMine);
    // checkGameState(cell, gameCells);
    const cellsToOpen = getOpenedCells(cell, grid);
    // setGameCells(cellsToOpen);
  };

  const toggleFlag = (cell: CellType) => {
    const updatedGrid = placeFlag(cell, grid, flags);
    setGrid(updatedGrid);
    updateFlags();
  };

  

  return { grid, openCell, toggleFlag, resetGame, flags };
};
