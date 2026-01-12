'use client';
import { useState } from 'react';
import Square from './square';
import { useBoard } from '../hooks/useBoard';
import { ROWS, CELL_SIZE } from '../constants';
import styles from './board.module.css';

const Board = () => {
  const cells = useBoard();
  const [gameCells, setGameCells] = useState(cells);

  const handleClick = (clickedId: string) => {
    const currentCells = [...gameCells];

    const updatedCells = currentCells.map((cell) => {
      if (cell.id === clickedId) {
        cell.isOpen = true;
      }
      return cell;
    });

    setGameCells(updatedCells);
  };

  return (
    <div>
      <main
        className={styles.main_container}
        style={{ width: `${ROWS * CELL_SIZE}px` }}
      >
        {gameCells.length > 0
          ? gameCells.map((square, index) => (
              <Square
                key={index}
                value={square.value}
                isBomb={square.isBomb}
                isOpen={square.isOpen}
                onClick={() => handleClick(square.id)}
              ></Square>
            ))
          : null}
      </main>
    </div>
  );
};

export default Board;
