import { NB_CELLS } from '../constants';
import { BoardProps } from '../types';
import { getCellsAround } from '../utils';

const bombsIndexes = [2, 7, 9, 10, 21];
// const bombsIndexes = [2];

export const useBoard = (): BoardProps => {
  let board: BoardProps = [];

  const setBombAroundQty = (): void => {
    board.forEach((cell) => {
      const cellsAround = getCellsAround(cell.id, board);
      cell.value = cellsAround.filter((cell) => cell.isBomb).length;
    });
  };

  const setBoard = (): void => {
    board = Array.from({ length: NB_CELLS }, (element, index) => ({
      value: 0,
      isBomb: bombsIndexes.includes(index),
      isOpen: false,
      id: index,
      hasFlag: false,
    }));
  };

  const defineBoardCells = () => {
    setBoard();
    setBombAroundQty();
    return board;
  };

  return defineBoardCells();
};
