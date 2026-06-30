import { useContext, useCallback, useRef, useEffect } from 'react';
import { CellType, LevelType } from '../types';
import { getOpenedCells, placeFlag, fillGrid } from '../controller';
import { GameContext } from '../contexts/gameContext';

export const useGame = () => {
  const {
    grid,
    status,
    cols,
    rows,
    minesQty,
    levels,
    // currentLevel,
    setStatus,
    setGrid,
    resetGame,
    toggleLevel,
  } = useContext(GameContext);

  const statusRef = useRef(status);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  const openCell = useCallback(
    (cell: CellType) => {
      console.log('opencell');
      const currentStatus = statusRef.current;
      if (cols === 0 || minesQty === 0) return;
      if (
        (currentStatus !== 'standBy' && currentStatus !== 'playing') ||
        cell.hasFlag ||
        cell.isOpen
      )
        return;

      setGrid((currentGrid) => {
        let gridToProcess = currentGrid;

        if (statusRef.current === 'standBy') {
          gridToProcess = fillGrid(cell, currentGrid, minesQty, cols);
        }

        const { updatedGrid, status: nextStatus } = getOpenedCells(
          cell,
          gridToProcess,
          minesQty,
          cols,
        );

        setStatus(nextStatus);
        return updatedGrid;
      });
    },
    [setGrid, setStatus, minesQty, cols],
  );

  const toggleFlag = useCallback(
    (cell: CellType) => {
      if (minesQty === 0) return;
      const currentStatus = statusRef.current;
      if (currentStatus !== 'playing' && currentStatus !== 'standBy') return;

      setGrid((currentGrid) => {
        const currentFlagsCount = currentGrid.filter((c) => c.hasFlag).length;
        return placeFlag(cell, currentGrid, currentFlagsCount, minesQty);
      });
    },
    [setGrid, minesQty],
  );

  const selectLevel = useCallback(
    (level: LevelType) => {
      toggleLevel(level);
    },
    [toggleLevel],
  );

  return {
    grid,
    status,
    cols,
    rows,
    minesQty,
    levels,
    // currentLevel,
    resetGame,
    openCell,
    toggleFlag,
    selectLevel,
  };
};
