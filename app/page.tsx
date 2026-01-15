'use client';

import MineSweeper from './src/features/game';
import { BoardProvider } from './src/features/game/context/boardContext';

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
      <BoardProvider>
        <MineSweeper></MineSweeper>
      </BoardProvider>
    </div>
  );
}
