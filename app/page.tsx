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
      }}
    >
      <GameProvider>
        <MineSweeper></MineSweeper>
      </GameProvider>
    </div>
  );
}
