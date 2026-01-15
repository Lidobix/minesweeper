import React, { useState } from 'react';
import Board from '../board/board';
import Counter from '../counter';
import { useBoard } from '../../hooks/useBoard';
import { BoardProps, SquareDataProps } from '../../types';
import { updateFlags, getOpenedCells } from '../../controller';
import { BOMBS_QTY } from '../../constants';

const MineSweeper = () => {
  const dataCells = useBoard();
  const [gameCells, setGameCells] = useState(dataCells);
  const [flagsCount, setFlagsCount] = useState(BOMBS_QTY);

  interface FlagsProps {
    updatedCells: BoardProps;
    remainingFlags: number;
  }

  const openCell = (cell: SquareDataProps) => {
    if (cell.hasFlag) {
      return;
    }

    if (cell.isBomb) {
    }

    const cellsToOpen = getOpenedCells(cell, gameCells);

    setGameCells(cellsToOpen);
  };

  const toggleFlag = (cell: SquareDataProps, e: React.MouseEvent) => {
    e.preventDefault();

    if (cell.isOpen) {
      return;
    }
    const { updatedCells, remainingFlags }: FlagsProps = updateFlags(
      cell,
      gameCells
    );

    setGameCells(updatedCells);
    setFlagsCount(remainingFlags);
  };

  return (
    <div>
      <Counter value={flagsCount}></Counter>
      <Board
        datas={gameCells}
        leftClick={openCell}
        rightClick={toggleFlag}
      ></Board>
    </div>
  );
};

export default MineSweeper;
