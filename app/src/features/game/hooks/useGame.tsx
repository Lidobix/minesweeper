import { useEffect, useContext, useCallback } from 'react';
import { CellType } from '../types';
import {
  getOpenedCells,
  placeFlag,
  generateGrid,
  checkGameStatus,
} from '../controller';
import { GameContext } from '../context/gameContext';

export const useGame = () => {
  const { grid, flags, status, setStatus, setGrid, updateFlags } =
    useContext(GameContext);

  const resetGame = useCallback(() => {
    const newGrid = generateGrid();
    setGrid(newGrid);
  }, [setGrid]);

  useEffect(resetGame, [setGrid, resetGame]);

  const openCell = useCallback(
    (cell: CellType) => {
      const updateGrid = getOpenedCells(cell, grid);
      setGrid(updateGrid);

      const updatedStatus = checkGameStatus(cell, grid);
      setStatus(updatedStatus);
    },
    [grid, setGrid, setStatus]
  );

  const toggleFlag = useCallback(
    (cell: CellType) => {
      const updatedGrid = placeFlag(cell, grid, flags);
      setGrid(updatedGrid);
      updateFlags();
    },
    [grid, flags, setGrid, updateFlags]
  );

  return { grid, flags, status, openCell, toggleFlag, resetGame };
};
