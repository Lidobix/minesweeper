import { GridType, CellId, CellType, StatusType } from './types';
import { getCellsAround, getMinesAround, getRandomMinesIndexes } from './utils';

export const fillGrid = (
  safeCell: CellType,
  currentGrid: GridType,
  minesQty: number,
  rows: number,
): GridType => {
  const minesPositions = getRandomMinesIndexes(
    safeCell.id,
    minesQty,
    currentGrid,
  );

  let newGrid = currentGrid.map((c) => ({
    ...c,
    isMine: minesPositions.includes(c.id),
    value: 0,
  }));
  newGrid = setMinesValues(newGrid, rows);

  return newGrid;
};

export const getOpenedCells = (
  cell: CellType,
  grid: GridType,
  minesQty: number,
  rows: number,
): {
  updatedGrid: GridType;
  status: StatusType;
} => {
  const idsToOpen = new Set<CellId>();

  if (cell.isMine) {
    return {
      updatedGrid: grid.map((c) => (c.isMine ? { ...c, isOpen: true } : c)),
      status: 'lost',
    };
  } else {
    const stack = [cell.id];
    while (stack.length > 0) {
      const currentId = stack.pop()!;
      if (idsToOpen.has(currentId)) continue;

      const currentCell = grid.find((c) => c.id === currentId);
      if (!currentCell || currentCell.hasFlag || currentCell.isOpen) continue;

      idsToOpen.add(currentId);

      if (currentCell.value === 0) {
        const neighbors = getCellsAround(currentId, grid, rows);
        neighbors.forEach((n) => {
          if (!idsToOpen.has(n.id)) stack.push(n.id);
        });
      }
    }

    const alreadyOpened = grid.filter((c) => c.isOpen).length;
    const totalOpened = alreadyOpened + idsToOpen.size;
    const isWin = totalOpened === grid.length - minesQty;

    return {
      updatedGrid: grid.map((c) =>
        idsToOpen.has(c.id) ? { ...c, isOpen: true } : c,
      ),
      status: isWin ? 'win' : 'playing',
    };
  }
};

export const placeFlag = (
  cell: CellType,
  grid: GridType,
  flags: number,
  minesQty: number,
) => {
  if (cell.isOpen || (flags === minesQty && !cell.hasFlag)) {
    return grid;
  }
  return grid.map((c) => {
    if (c.id !== cell.id) {
      return c;
    }
    return { ...c, hasFlag: !c.hasFlag };
  });
};

const setMinesValues = (grid: GridType, rows: number): GridType => {
  return grid.map((cell) => {
    if (cell.isMine) return cell;
    return { ...cell, value: getMinesAround(cell, grid, rows) };
  });
};
