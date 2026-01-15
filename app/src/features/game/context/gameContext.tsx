import { useState, createContext, ReactNode } from 'react';

import { MINES_QTY } from '../constants';
import { GridType } from '../types';

interface GameContextProps {
  grid: GridType;
  flags: number;
  setGrid: React.Dispatch<React.SetStateAction<GridType>>;
  updateFlags: () => void;
}

export const GameContext = createContext<GameContextProps>({
  grid: [],
  flags: MINES_QTY,
  setGrid: () => {},
  updateFlags: () => {},
});

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [grid, setGrid] = useState<GridType>([]);
  const [flags, setFlags] = useState(MINES_QTY);

  const updateFlags = () => {
    console.log('update flags context');
    const flags = MINES_QTY - grid.filter((cell) => cell.hasFlag).length;
    setFlags(flags);
  };

  return (
    <GameContext.Provider
      value={{
        grid,
        flags,
        setGrid,
        updateFlags,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
