import { useState, createContext, ReactNode } from 'react';
import { MINES_QTY } from '../constants';
import { GridType, StatusType } from '../types';

interface GameContextProps {
  grid: GridType;
  flags: number;
  status: StatusType;
  setGrid: React.Dispatch<React.SetStateAction<GridType>>;
  setStatus: React.Dispatch<React.SetStateAction<StatusType>>;
  updateFlags: () => void;
  resetGame: (grid: GridType) => void;
}

export const GameContext = createContext<GameContextProps>({
  grid: [],
  flags: MINES_QTY,
  status: 'playing',
  setGrid: () => {},
  setStatus: () => {},
  updateFlags: () => {},
  resetGame: () => {},
});

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [grid, setGrid] = useState<GridType>([]);
  const [flags, setFlags] = useState<number>(MINES_QTY);
  const [status, setStatus] = useState<StatusType>('playing');

  const updateFlags = () => {
    const flags = MINES_QTY - grid.filter((cell) => cell.hasFlag).length;
    setFlags(flags);
  };

  const resetGame = (grid: GridType) => {
    setGrid(grid);
    setStatus('playing');
  };

  return (
    <GameContext.Provider
      value={{
        grid,
        flags,
        status,
        setGrid,
        setStatus,
        updateFlags,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
