import { GridType, CellId, CellType, StatusType } from './types';
import { MINES_QTY, NB_CELLS } from './constants';
import { getCellsAround, getMinesAround, getRandomMinesIndexes } from './utils';

export const generateGrid = (): GridType => {
  const mines = generateMines();
  let grid = setGrid(mines);
  grid = setMinesValues(grid);

  return grid;
};

export const checkGameStatus = (cell: CellType, grid: GridType): StatusType => {
  let status: StatusType = 'playing';

  if (cell.isMine && !cell.hasFlag) {
    status = 'lost';
  } else {
    const openedCells = grid.filter((cell) => cell.isOpen).length;
    const targetCells = NB_CELLS - MINES_QTY;

    if (openedCells === targetCells) {
      status = 'win';
    }
  }

  return status;
};

export const getOpenedCells = (cell: CellType, grid: GridType): GridType => {
  const selectedCell = { ...cell };
  let cellsToOpen: GridType = [];

  if (cell.hasFlag) {
    return grid;
  }

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

const setGrid = (mines: number[]): GridType => {
  return Array.from({ length: NB_CELLS }, (element, index) => ({
    value: 0,
    isMine: mines.includes(index),
    isOpen: false,
    id: index,
    hasFlag: false,
  }));
};

const generateMines = () => {
  const indexes = getRandomMinesIndexes(0, NB_CELLS, MINES_QTY);

  return indexes;
};

const setMinesValues = (grid: GridType): GridType => {
  const updatedGrid: GridType = grid.map((cell) => {
    return { ...cell, value: getMinesAround(cell, grid) };
  });

  return updatedGrid;
};
