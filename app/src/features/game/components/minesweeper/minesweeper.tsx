import React, { useState } from 'react';
import Board from '../board/board';
import Counter from '../counter';
import { useBoard } from '../../hooks/useBoard';
import { BoardProps, CellId } from '../../types';
import { updateFlags, getOpenedCells } from '../../controller';
import { BOMBS_QTY } from '../../constants';

const MineSweeper = () => {
  const dataCells = useBoard();
  const [gameCells, setGameCells] = useState(dataCells);
  const [flagsCount, setFlagsCount] = useState(BOMBS_QTY);

  interface FlagsProps {
    updatedCells: BoardProps;
    updatedFlagsCount: number;
  }

  const openCell = (id: CellId) => {
    const cellsToOpen = getOpenedCells(id, [...gameCells]);

    setGameCells(cellsToOpen);
  };

  const toggleFlag = (id: CellId, e: React.MouseEvent) => {
    e.preventDefault();

    const { updatedCells, updatedFlagsCount }: FlagsProps = updateFlags(
      id,
      [...gameCells],
      flagsCount
    );

    setGameCells(updatedCells);
    setFlagsCount(updatedFlagsCount);
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
