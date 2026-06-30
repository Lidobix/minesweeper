import React from 'react';
import { HeaderProps } from '../../types';
import styles from './header.module.css';

const Header = ({ onClick }: HeaderProps) => {
  return (
    <header
      style={{
        //   position: 'sticky',
        display: 'flex',
        flexDirection: 'row',
        //   top: 0,
        // background: 'red',
        // flex: 1,
        // width: '100vw',
      }}
    >
      <h1 className="title">MINESWEEPER</h1>
      <button
        className="modal_button"
        style={{
          fontSize: '1.5rem',

          // position: 'absolute',
          // right: '0',
          // top: 4,
        }}
        onClick={onClick}
      >
        ⚙️
      </button>
    </header>
  );
};

export default Header;
