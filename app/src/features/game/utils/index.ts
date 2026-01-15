import { ROWS, NB_CELLS } from '../constants';
import { GridType, CellId, CellType } from '../types';

interface Indexes {
  upIndexes: CellId[];
  sidesIndexes: CellId[];
  downIndexes: CellId[];
}

const setIndexes = (id: CellId): Indexes => {
  const currentRow = id % ROWS;

  let startIndex = 0;
  let endIndex = 0;

  let upIndexes = [];
  let sidesIndexes = [];
  let downIndexes = [];

  if (currentRow === 0) {
    startIndex = id - ROWS;
    endIndex = id + (ROWS + 1);

    upIndexes = [startIndex, startIndex + 1];
    downIndexes = [startIndex + 2 * ROWS, endIndex];
    sidesIndexes = [id + 1];
  } else if (currentRow === ROWS - 1) {
    startIndex = id - (ROWS + 1);
    endIndex = id + ROWS;

    upIndexes = [startIndex, startIndex + 1];
    downIndexes = [startIndex + 2 * ROWS, endIndex];
    sidesIndexes = [id - 1];
  } else {
    startIndex = id - (ROWS + 1);
    endIndex = id + (ROWS + 1);

    upIndexes = [startIndex, startIndex + 2];
    downIndexes = [startIndex + 2 * ROWS, endIndex];
    sidesIndexes = [id - 1, id + 1];
  }

  upIndexes = upIndexes.filter((index) => index >= 0);
  downIndexes = downIndexes.filter((index) => index <= NB_CELLS - 1);

  return { upIndexes, downIndexes, sidesIndexes };
};

export const getCellsAround = (id: CellId, grid: GridType) => {
  const { upIndexes, downIndexes, sidesIndexes } = setIndexes(id);

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
      downIndexes[downIndexes.length - 1] + 1
    );
  }

  return upCells.concat(sidesCells, downCells);
};

export const getMinesAround = (cell: CellType, grid: GridType): number => {
  const cellasAround = getCellsAround(cell.id, grid);

  return cellasAround.filter((cell) => cell.isMine).length;
};
