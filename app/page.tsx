'use client';

import MineSweeper from './src/features/game';
import { GameProvider } from './src/features/game/context/gameContext';
import './globals.css';

export default function Home() {
  return (
    <div>
      <div
        style={{
          position: 'sticky',
          top: 0,
        }}
      >
        <p
          className="title"
          style={{
            position: 'sticky',
            margin: 0,
            padding: 5,
            fontSize: '2rem',
            color: '#b2945b',
            textAlign: 'center',
          }}
        >
          MINESWEEPER
        </p>
      </div>

      <div
        className="game_container"
        style={
          {
            // display: 'flex',
            // flexDirection: 'column',
            // background: 'yellow',
            // flex: 1,
            // height: '100vh',
            // justifyContent: 'space-evenly',
            // alignItems: 'center',
            // overflowY: 'hidden',
          }
        }
      >
        {/* <div style={{ background: 'blue', flexGrow: 1, display: 'flex' }}> */}
        <GameProvider>
          <MineSweeper style={{}}></MineSweeper>
        </GameProvider>
        {/* </div> */}
        <div
          style={{
            background: 'black',
          }}
        >
          <p
            style={{
              margin: 0,
              padding: 0,
              fontSize: '0.8rem',
              color: '#b2945b',
              // background: 'green',
            }}
          >
            by Lidobix
          </p>
        </div>
      </div>
    </div>
    // </div>
  );
}
