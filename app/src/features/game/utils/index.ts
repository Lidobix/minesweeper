import { GridType, CellId, CellType } from '../types';

interface Indexes {
  upIndexes: CellId[];
  sidesIndexes: CellId[];
  downIndexes: CellId[];
}

const setIndexes = (id: CellId, grid: GridType, rows: number): Indexes => {
  const currentRow = id % rows;

  let startIndex = 0;
  let endIndex = 0;

  let upIndexes = [];
  let sidesIndexes = [];
  let downIndexes = [];

  if (currentRow === 0) {
    startIndex = id - rows;
    endIndex = id + (rows + 1);

    upIndexes = [startIndex, startIndex + 1];
    downIndexes = [startIndex + 2 * rows, endIndex];
    sidesIndexes = [id + 1];
  } else if (currentRow === rows - 1) {
    startIndex = id - (rows + 1);
    endIndex = id + rows;

    upIndexes = [startIndex, startIndex + 1];
    downIndexes = [startIndex + 2 * rows, endIndex];
    sidesIndexes = [id - 1];
  } else {
    startIndex = id - (rows + 1);
    endIndex = id + (rows + 1);

    upIndexes = [startIndex, startIndex + 2];
    downIndexes = [startIndex + 2 * rows, endIndex];
    sidesIndexes = [id - 1, id + 1];
  }

  upIndexes = upIndexes.filter((index) => index >= 0);
  downIndexes = downIndexes.filter((index) => index <= grid.length - 1);

  return { upIndexes, downIndexes, sidesIndexes };
};

export const getCellsAround = (id: CellId, grid: GridType, rows: number) => {
  const { upIndexes, downIndexes, sidesIndexes } = setIndexes(id, grid, rows);

  let upCells: GridType = [];
  let sidesCells: GridType = [];
  let downCells: GridType = [];

  if (upIndexes.length > 0) {
    upCells = grid.slice(upIndexes[0], upIndexes[upIndexes.length - 1] + 1);
  }

  if (sidesIndexes.length > 0) {
    sidesIndexes.forEach((index) => {
      sidesCells.push(grid[index]);
    });
  }

  if (downIndexes.length > 0) {
    downCells = grid.slice(
      downIndexes[0],
      downIndexes[downIndexes.length - 1] + 1,
    );
  }

  return upCells.concat(sidesCells, downCells);
};

export const getMinesAround = (
  cell: CellType,
  grid: GridType,
  rows: number,
): number => {
  const cellsAround = getCellsAround(cell.id, grid, rows);

  return cellsAround.filter((cell) => cell.isMine).length;
};

export const getRandomMinesIndexes = (
  safeId: number,
  minesQty: number,
  grid: GridType,
) => {
  const indexes: number[] = [];

  let i = 0;
  while (i < minesQty) {
    const number = Math.floor(Math.random() * grid.length);

    if (!indexes.includes(number) && number !== safeId) {
      indexes.push(number);
      i++;
    }
  }

  return indexes;
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const formattedMins = mins.toString().padStart(2, '0');
  const formattedSecs = secs.toString().padStart(2, '0');

  return `${formattedMins}:${formattedSecs}`;
};
