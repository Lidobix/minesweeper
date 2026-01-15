'use client';

import MineSweeper from './src/features/game';
import { GameProvider } from './src/features/game/context/gameContext';

export default function Home() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1B263B',
      }}
    >
      <GameProvider>
        <MineSweeper></MineSweeper>
      </GameProvider>
    </div>
  );
}
