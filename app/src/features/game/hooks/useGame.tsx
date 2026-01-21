import { useContext, useCallback, useState } from 'react';
import { CellType } from '../types';
import { getOpenedCells, placeFlag, generateGrid } from '../controller';
import { GameContext } from '../context/gameContext';

export const useGame = () => {
  const { grid, status, endGame, setStatus, setGrid, setEndGame, resetGame } =
    useContext(GameContext);
  const [isFirstMove, setIsFirstMove] = useState(true);

  const setNewGame = useCallback(() => {
    const newGrid = generateGrid();
    resetGame(newGrid);
  }, [resetGame]);

  const openCell = useCallback(
    (cell: CellType) => {
      if (status !== 'playing') return;
      setGrid((currentGrid) => {
        const { updatedGrid, status, endGame } = getOpenedCells(
          cell,
          currentGrid,
        );

        setStatus(status);
        setEndGame(endGame);
        return updatedGrid;
      });
    },
    [setGrid, setStatus, setEndGame, status],
  );

  const toggleFlag = useCallback(
    (cell: CellType) => {
      if (status !== 'playing') return;
      setGrid((currentGrid) => {
        const currentFlagsCount = currentGrid.filter((c) => c.hasFlag).length;

        return placeFlag(cell, currentGrid, currentFlagsCount);
      });
    },
    [setGrid, status],
  );

  return { grid, status, endGame, openCell, toggleFlag, setNewGame };
};
