import { BoardType, CellId, CellType } from './types';
import { BOMBS_QTY } from './constants';
import { getCellsAround } from './utils';
// import { useBoard } from './hooks/useBoard';

// let gameCells = [];
// export const generateCells = () => {
//   const cells = useBoard();
// };

export const getOpenedCells = (
  cell: CellType,
  gameCells: BoardType
): BoardType => {
  const selectedCell = { ...cell };
  let cellsToOpen: BoardType = [];

  if (cell.isBomb) {
    const trappedCells = gameCells.filter((cell) => cell.isBomb);
    cellsToOpen = trappedCells;
  } else if (selectedCell.value > 0) {
    cellsToOpen.push({ ...selectedCell, isOpen: true });
  } else {
    let cellsToCheck: BoardType = [selectedCell];
    const checkedIds: CellId[] = [];
    cellsToOpen.push(selectedCell);
    let customId = selectedCell.id;

    const searchAllCells = (customId: CellId) => {
      const cellsAround = getCellsAround(customId, gameCells);

      const cellsAroundToOpen = cellsAround.filter(
        (cell) => !cell.isOpen && !cell.isBomb
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

  const updatedCells = gameCells.map((cell) => {
    if (idsToOpen.includes(cell.id)) {
      cell.isOpen = true;
    }
    return cell;
  });

  return updatedCells;
};

export const updateFlags = (cell: CellType, gameCells: BoardType) => {
  const selectedCell = { ...cell };
  let remainingFlags = getRemainingFlagsCount(gameCells);
  let updatedCells = [...gameCells];

  if (remainingFlags > 0 || (remainingFlags === 0 && selectedCell.hasFlag)) {
    updatedCells = gameCells.map((cell) => {
      if (cell.id === selectedCell.id) {
        cell.hasFlag = !cell.hasFlag;
      }
      return cell;
    });

    remainingFlags = getRemainingFlagsCount(updatedCells);
  }

  return { updatedCells, remainingFlags };
};

const getRemainingFlagsCount = (gameCells: BoardType): number => {
  return BOMBS_QTY - gameCells.filter((cell) => cell.hasFlag).length;
};
