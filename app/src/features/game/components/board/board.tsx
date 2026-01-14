import Square from '../square/square';
import { ROWS, CELL_SIZE } from '../../constants';
import styles from './board.module.css';
import { BoardGameProps } from '../../types';

const Board = ({ datas, leftClick, rightClick }: BoardGameProps) => {
  return (
    <div
      className={styles.main_container}
      style={{ width: `${ROWS * CELL_SIZE}px` }}
    >
      {datas.length > 0
        ? datas.map((square, index) => (
            <Square
              key={index}
              value={square.value}
              isBomb={square.isBomb}
              isOpen={square.isOpen}
              onClick={() => leftClick(square.id)}
              onContextMenu={(e) => rightClick(square.id, e)}
              hasFlag={square.hasFlag}
            ></Square>
          ))
        : null}
    </div>
  );
};

export default Board;
