'use client';
import { memo } from 'react';
import { CELL_SIZE } from '../constants';
import { SquareRenderProps } from '../types';
import styles from './square.module.css';

const RawSquare = ({ value, isOpen, isBomb, onClick }: SquareRenderProps) => {
  return (
    <div
      onClick={onClick}
      className={styles.square_container}
      style={{
        height: `${CELL_SIZE}px`,
        width: `${CELL_SIZE}px`,
        backgroundColor: isOpen ? 'grey' : 'transparent',
      }}
    >
      {isOpen ? (
        <p style={{ textAlign: 'center', fontSize: '3rem', color: 'wheat' }}>
          {isBomb ? '💣' : value !== 0 ? value : ''}
        </p>
      ) : null}
    </div>
  );
};

const Square = memo(RawSquare);

export default Square;
