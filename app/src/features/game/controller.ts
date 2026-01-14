import { BoardProps, CellId } from './types';
import { BOMBS_QTY } from './constants';
import { getCellsAround } from './utils';

export const getOpenedCells = (
  id: CellId,
  gameCells: BoardProps
): BoardProps => {
  const selectedCell = gameCells.find((cell) => cell.id === id);
  let cellsToOpen: BoardProps = [];

  if (selectedCell && !selectedCell.hasFlag) {
    if (selectedCell.isBomb || selectedCell.value > 0) {
      selectedCell.isOpen = true;
      cellsToOpen.push(selectedCell);
    } else if (selectedCell.value === 0) {
      let cellsToCheck: BoardProps = [selectedCell];
      const checkedIds: CellId[] = [];
      cellsToOpen.push(selectedCell);
      let customId = id;

      const searchAllCells = (customId: CellId) => {
        const cellsAround = getCellsAround(customId, gameCells);

        const cellsAroundToOpen = cellsAround.filter(
          (cell) => !cell.isOpen && !cell.isBomb
        );

        cellsToOpen = cellsToOpen.concat(cellsAroundToOpen);

        const filteredCellsAroundToOpen = cellsAroundToOpen.filter(
          (cell) => cell.value === 0
        );

        cellsToCheck = cellsToCheck.concat(filteredCellsAroundToOpen);

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

      cellsToOpen = [...new Set(cellsToOpen)];
    }
  }

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

export const updateFlags = (
  id: CellId,
  gameCells: BoardProps,
  flagsCount: number
) => {
  const selectedCell = gameCells.find((cell) => cell.id === id);
  let updatedFlagsCount = flagsCount;
  let updatedCells = [...gameCells];

  if (selectedCell) {
    if (
      (flagsCount > 0 && !selectedCell.isOpen) ||
      (flagsCount === 0 && selectedCell.hasFlag)
    ) {
      updatedCells = gameCells.map((cell) => {
        if (cell.id === id) {
          cell.hasFlag = !cell.hasFlag;
        }
        return cell;
      });

      updatedFlagsCount = updateFlagsCount(updatedCells);
    }
  }
  return { updatedCells, updatedFlagsCount };
};

const updateFlagsCount = (gameCells: BoardProps) => {
  const flagsCount =
    BOMBS_QTY - gameCells.filter((cell) => cell.hasFlag).length;

  return flagsCount;
};
