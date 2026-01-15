import React, { useEffect, useState } from 'react';
import Board from './components/board/board';
import Counter from './components/counter';
import { useBoard } from './hooks/useBoard';
import { BoardType, CellType } from './types';
import { updateFlags, getOpenedCells } from './controller';
import { BOMBS_QTY } from './constants';

interface FlagsProps {
  updatedCells: BoardType;
  remainingFlags: number;
}

const MineSweeper = () => {
  const { gameCells } = useBoard();
  // const [gameCells, setGameCells] = useState(dataCells);
  const [flagsCount, setFlagsCount] = useState(BOMBS_QTY);
  const [endGame, setEndGame] = useState(false);

  // useEffect(() => {
  //   if (endGame) {
  //   }

  //   console.log(endGame ? 'endgame' : 'debut jeu');
  // }, [endGame]);

  const openCell = (cell: CellType) => {
    if (cell.hasFlag || endGame) {
      return;
    }
    setEndGame(cell.isBomb);
    // checkGameState(cell, gameCells);

    const cellsToOpen = getOpenedCells(cell, gameCells);

    // setGameCells(cellsToOpen);
  };

  // const checkGameState = (cell, gameCells) => {
  //   if (cell.isBomb) {
  //   }
  // };

  const toggleFlag = (cell: CellType, e: React.MouseEvent) => {
    e.preventDefault();

    if (cell.isOpen || endGame) {
      return;
    }
    const { updatedCells, remainingFlags }: FlagsProps = updateFlags(
      cell,
      gameCells
    );

    // setGameCells(updatedCells);
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
