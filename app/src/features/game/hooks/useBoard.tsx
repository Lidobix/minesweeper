import { useState } from 'react';
import { NB_CELLS } from '../constants';
import { BoardType } from '../types';
import { getCellsAround } from '../utils';

import { useContext } from 'react';
import { BoardContext } from '../context/boardContext';

export const useBoard = () => {
  const context = useContext(BoardContext);

  return context;
};

interface useBoardType {
  generateBoardCells: () => void;
  gameCells: BoardType;
}
const bombsIndexes = [2, 7, 9, 10, 21];
// const bombsIndexes = [2];

// export const useBoard = (): useBoardType => {
//   const board: BoardType = [];

//   const [gameCells, setGameCells] = useState<BoardType>([]);

//   const setBombAroundQty = (): BoardType => {
//     return board.forEach((cell) => {
//       const cellsAround = getCellsAround(cell.id, board);
//       cell.value = cellsAround.filter((cell) => cell.isBomb).length;
//     });
//   };

//   const setBoard = () => {
//     return Array.from({ length: NB_CELLS }, (element, index) => ({
//       value: 0,
//       isBomb: bombsIndexes.includes(index),
//       isOpen: false,
//       id: index,
//       hasFlag: false,
//     }));
//   };

//   const generateBoardCells = () => {
//     const board = setBoard();
//     const fullCells = setBombAroundQty();
//     setGameCells(fullCells);
//     // return board;
//   };

//   return { generateBoardCells, gameCells };
// };
