import { LINES, ROWS } from '../constants';
import { BoardProps, SquareDataProps, LineProps } from '../types';

const bombsCoordinates = [
  { line: 0, row: 2 },
  { line: 1, row: 2 },
  { line: 1, row: 4 },
  { line: 2, row: 0 },
  { line: 4, row: 1 },
];

export const useBoard = (): SquareDataProps[] => {
  const board: BoardProps = [];

  const getCellsAround = (l: number, r: number): SquareDataProps[] => {
    let up: SquareDataProps[] = [] as SquareDataProps[];
    let down: SquareDataProps[] = [] as SquareDataProps[];
    const sides: SquareDataProps[] = [] as SquareDataProps[];

    const startIndex = r - 1 < 0 ? r : r - 1;
    const endIndex = r + 1 < ROWS ? r + 1 : r;

    if (l - 1 >= 0) {
      up = board[l - 1].slice(startIndex, endIndex + 1);
    }

    if (l + 1 < LINES) {
      down = board[l + 1].slice(startIndex, endIndex + 1);
    }

    if (startIndex < r) {
      sides.push(board[l][startIndex]);
    }
    if (endIndex < ROWS) {
      sides.push(board[l][endIndex]);
    }

    const cellsAround = up.concat(down, sides);

    return cellsAround;
  };

  const setBombValues = (): void => {
    for (let l = 0; l < LINES; l++) {
      for (let r = 0; r < ROWS; r++) {
        const cellsAround = getCellsAround(l, r);
        const bombsCount = cellsAround.filter((cell) => cell.isBomb).length;
        board[l][r].value = bombsCount;
      }
    }
  };

  const setBoard = (): void => {
    for (let l = 0; l < LINES; l++) {
      const filterdBombs = bombsCoordinates.filter((bomb) => bomb.line === l);

      const line: LineProps = Array.from(
        { length: ROWS },
        (element, index) => ({
          value: 0,
          isBomb: false,
          isOpen: false,
          id: `${l}_${index % ROWS}`,
        })
      );

      filterdBombs.forEach((bomb) => {
        line[bomb.row].isBomb = true;
      });

      board.push(line);
    }
  };

  const defineBoardCells = (): SquareDataProps[] => {
    setBoard();
    setBombValues();
    return board.flat();
  };

  return defineBoardCells();
};
