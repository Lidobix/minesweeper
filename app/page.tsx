'use client';

import MineSweeper from './src/features/game/components/minesweeper/minesweeper';

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
      <MineSweeper></MineSweeper>
    </div>
  );
}
