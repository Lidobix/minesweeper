import { useContext, useCallback, useRef, useEffect } from 'react';
import { CellType } from '../types';
import { getOpenedCells, placeFlag, fillGrid } from '../controller';
import { GameContext } from '../context/gameContext';

export const useGame = () => {
  const { grid, status, setStatus, setGrid, resetGame } =
    useContext(GameContext);

  const statusRef = useRef(status);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  const openCell = useCallback(
    (cell: CellType) => {
      const currentStatus = statusRef.current;

      if (
        (currentStatus !== 'standBy' && currentStatus !== 'playing') ||
        cell.hasFlag ||
        cell.isOpen
      )
        return;

      setGrid((currentGrid) => {
        let gridToProcess = currentGrid;

        if (statusRef.current === 'standBy') {
          gridToProcess = fillGrid(cell, currentGrid);
        }

        const { updatedGrid, status: nextStatus } = getOpenedCells(
          cell,
          gridToProcess,
        );

        setStatus(nextStatus);
        return updatedGrid;
      });
    },
    [setGrid, setStatus],
  );

  const toggleFlag = useCallback(
    (cell: CellType) => {
      const currentStatus = statusRef.current;
      if (currentStatus !== 'playing' && currentStatus !== 'standBy') return;

      setGrid((currentGrid) => {
        const currentFlagsCount = currentGrid.filter((c) => c.hasFlag).length;
        return placeFlag(cell, currentGrid, currentFlagsCount);
      });
    },
    [setGrid],
  );

  return {
    grid,
    status,
    resetGame,
    openCell,
    toggleFlag,
  };
};
