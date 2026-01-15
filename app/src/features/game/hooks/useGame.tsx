import { useEffect, useContext } from 'react';
import { CellType } from '../types';
import { getOpenedCells, placeFlag, generateGrid } from '../controller';
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
  };

  const toggleFlag = (cell: CellType) => {
    const updatedGrid = placeFlag(cell, grid, flags);
    setGrid(updatedGrid);
    updateFlags();
  };

  return { grid, openCell, toggleFlag, resetGame, flags };
};
