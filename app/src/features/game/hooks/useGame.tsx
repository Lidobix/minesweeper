import { useContext, useCallback } from 'react';
import { CellType } from '../types';
import {
  getOpenedCells,
  placeFlag,
  generateGrid,
  checkGameStatus,
} from '../controller';
import { GameContext } from '../context/gameContext';

export const useGame = () => {
  const {
    grid,
    flags,
    status,
    endGame,
    setStatus,
    setGrid,
    setEndGame,
    updateFlags,
    resetGame,
  } = useContext(GameContext);

  const setNewGame = useCallback(() => {
    const newGrid = generateGrid();
    resetGame(newGrid);
  }, [resetGame]);

  const openCell = useCallback(
    (cell: CellType) => {
      const updateGrid = getOpenedCells(cell, grid);
      setGrid(updateGrid);

      const { status: updatedStatus, endGame } = checkGameStatus(cell, grid);
      setStatus(updatedStatus);
      setEndGame(endGame);
    },
    [grid, setGrid, setStatus, setEndGame]
  );

  const toggleFlag = useCallback(
    (cell: CellType) => {
      const updatedGrid = placeFlag(cell, grid, flags);
      setGrid(updatedGrid);
      updateFlags();
    },
    [grid, flags, setGrid, updateFlags]
  );

  return { grid, flags, status, endGame, openCell, toggleFlag, setNewGame };
};
