import { GridType, CellId, CellType } from './types';
import { NB_CELLS } from './constants';
import { getCellsAround, getMinesAround } from './utils';

const minesIndexes = [2, 7, 9, 10, 21];
// const minesIndexes = [2];

export const generateGrid = (): GridType => {
  let grid = setGrid();
  grid = setMinesValues(grid);

  return grid;
};

export const getOpenedCells = (cell: CellType, grid: GridType): GridType => {
  const selectedCell = { ...cell };
  let cellsToOpen: GridType = [];

  if (cell.isMine) {
    const trappedCells = grid.filter((cell) => cell.isMine);
    cellsToOpen = trappedCells;
  } else if (selectedCell.value > 0) {
    cellsToOpen.push({ ...selectedCell, isOpen: true });
  } else {
    let cellsToCheck: GridType = [selectedCell];
    const checkedIds: CellId[] = [];
    cellsToOpen.push(selectedCell);
    let customId = selectedCell.id;

    const searchAllCells = (customId: CellId) => {
      const cellsAround = getCellsAround(customId, grid);

      const cellsAroundToOpen = cellsAround.filter(
        (cell) => !cell.isOpen && !cell.isMine
      );

      cellsToOpen = cellsToOpen.concat(cellsAroundToOpen);

      const emptiesCellsAroundToCheck = cellsAroundToOpen.filter(
        (cell) => cell.value === 0
      );

      cellsToCheck = cellsToCheck.concat(emptiesCellsAroundToCheck);
      checkedIds.push(customId);
      cellsToCheck = cellsToCheck.filter((cell) => cell.id !== customId);

      if (cellsToCheck.length > 0) {
        cellsToCheck.forEach((cell) => {
          if (!checkedIds.includes(cell.id)) {
            searchAllCells(cell.id);
          }
        });
      } else return;
    };

    searchAllCells(customId);
  }
  cellsToOpen = [...new Set(cellsToOpen)];

  const idsToOpen = cellsToOpen.map((cell) => {
    return cell.id;
  });

  const updatedCells = grid.map((cell) => {
    if (idsToOpen.includes(cell.id)) {
      cell.isOpen = true;
    }
    return cell;
  });

  return updatedCells;
};

export const placeFlag = (cell: CellType, grid: GridType, flags: number) => {
  if (cell.isOpen || (flags === 0 && !cell.hasFlag)) {
    return grid;
  }

  let updatedGrid = [...grid];
  const selectedCell = { ...cell };

  updatedGrid = grid.map((cell) => {
    if (cell.id === selectedCell.id) {
      cell.hasFlag = !cell.hasFlag;
    }
    return cell;
  });

  return updatedGrid;
};

const setGrid = (): GridType => {
  return Array.from({ length: NB_CELLS }, (element, index) => ({
    value: 0,
    isMine: minesIndexes.includes(index),
    isOpen: false,
    id: index,
    hasFlag: false,
  }));
};

const setMinesValues = (grid: GridType): GridType => {
  const updatedGrid: GridType = grid.map((cell) => {
    return { ...cell, value: getMinesAround(cell, grid) };
  });

  return updatedGrid;
};
