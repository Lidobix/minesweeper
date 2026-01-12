'use client';

import Board from './src/features/game/components/board';

export default function Home() {
  return (
    <main
      style={{
        display: 'flex',
        flex: 1,
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#1B263B',
      }}
    >
      <Board></Board>
    </main>
  );
}
