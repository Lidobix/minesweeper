import {
  GridType,
  CellId,
  CellType,
  StatusType,
  GameStatusType,
} from './types';
import { MINES_QTY, NB_CELLS } from './constants';
import { getCellsAround, getMinesAround, getRandomMinesIndexes } from './utils';

export const generateGrid = (): GridType => {
  const mines = getRandomMinesIndexes(0, NB_CELLS, MINES_QTY);
  let grid = createGrid(mines);
  grid = setMinesValues(grid);

  return grid;
};

export const checkGameStatus = (
  cell: CellType,
  grid: GridType,
): GameStatusType => {
  let status: StatusType = 'playing';
  let endGame = false;

  if (cell.isMine && !cell.hasFlag) {
    status = 'lost';
  } else {
    const openedCells = grid.filter((cell) => cell.isOpen).length;
    const targetCells = NB_CELLS - MINES_QTY;

    if (openedCells === targetCells) {
      status = 'win';
    }
  }

  endGame = status === 'lost' || status === 'win';
  return { endGame, status };
};

export const getOpenedCells = (
  cell: CellType,
  grid: GridType,
  status: StatusType,
): GridType => {
  if (cell.hasFlag || cell.isOpen || status !== 'playing') return grid;

  const idsToOpen = new Set<CellId>();

  if (cell.isMine) {
    grid.forEach((c) => {
      if (c.isMine) idsToOpen.add(c.id);
    });
  } else {
    const stack = [cell.id];
    while (stack.length > 0) {
      const currentId = stack.pop()!;
      if (idsToOpen.has(currentId)) continue;

      const currentCell = grid.find((c) => c.id === currentId);
      if (!currentCell || currentCell.hasFlag || currentCell.isOpen) continue;

      idsToOpen.add(currentId);

      if (currentCell.value === 0) {
        const neighbors = getCellsAround(currentId, grid);
        neighbors.forEach((n) => {
          if (!idsToOpen.has(n.id)) stack.push(n.id);
        });
      }
    }
  }

  return grid.map((c) => (idsToOpen.has(c.id) ? { ...c, isOpen: true } : c));
};

export const placeFlag = (cell: CellType, grid: GridType, flags: number) => {
  if (cell.isOpen || (flags === MINES_QTY && !cell.hasFlag)) {
    return grid;
  }
  return grid.map((c) => {
    if (c.id !== cell.id) {
      return c;
    }
    return { ...c, hasFlag: !c.hasFlag };
  });
};

const createGrid = (mines: number[]): GridType => {
  return Array.from({ length: NB_CELLS }, (element, index) => ({
    value: 0,
    isMine: mines.includes(index),
    isOpen: false,
    id: index,
    hasFlag: false,
  }));
};

const setMinesValues = (grid: GridType): GridType => {
  return grid.map((cell) => {
    if (cell.isMine) return cell;
    return { ...cell, value: getMinesAround(cell, grid) };
  });
};
