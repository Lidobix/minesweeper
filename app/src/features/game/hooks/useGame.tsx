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
  const { grid, status, endGame, setStatus, setGrid, setEndGame, resetGame } =
    useContext(GameContext);

  const setNewGame = useCallback(() => {
    const newGrid = generateGrid();
    resetGame(newGrid);
  }, [resetGame]);

  const openCell = useCallback(
    (cell: CellType) => {
      if (status !== 'playing') return;
      setGrid((currentGrid) => {
        const updateGrid = getOpenedCells(cell, currentGrid, status);
        const { status: updatedStatus, endGame } = checkGameStatus(
          cell,
          updateGrid,
        );
        setStatus(updatedStatus);
        setEndGame(endGame);
        return updateGrid;
      });
    },
    [setGrid, setStatus, setEndGame, status],
  );

  const toggleFlag = useCallback(
    (cell: CellType) => {
      setGrid((currentGrid) => {
        const currentFlagsCount = currentGrid.filter((c) => c.hasFlag).length;

        return placeFlag(cell, currentGrid, currentFlagsCount);
      });
    },
    [setGrid],
  );

  return { grid, status, endGame, openCell, toggleFlag, setNewGame };
};
