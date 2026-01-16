import { useState, createContext, ReactNode } from 'react';
import { MINES_QTY } from '../constants';
import { GridType, StatusType } from '../types';

interface GameContextProps {
  grid: GridType;
  flags: number;
  status: StatusType;
  endGame: boolean;
  setGrid: React.Dispatch<React.SetStateAction<GridType>>;
  setStatus: React.Dispatch<React.SetStateAction<StatusType>>;
  setEndGame: React.Dispatch<React.SetStateAction<boolean>>;
  updateFlags: () => void;
  resetGame: (grid: GridType) => void;
}

export const GameContext = createContext<GameContextProps>({
  grid: [],
  flags: MINES_QTY,
  status: 'playing',
  endGame: false,
  setGrid: () => {},
  setStatus: () => {},
  setEndGame: () => {},
  updateFlags: () => {},
  resetGame: () => {},
});

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const defaultStatus: StatusType = 'playing';

  const [grid, setGrid] = useState<GridType>([]);
  const [flags, setFlags] = useState<number>(MINES_QTY);
  const [status, setStatus] = useState<StatusType>(defaultStatus);
  const [endGame, setEndGame] = useState<boolean>(false);

  const updateFlags = () => {
    const flags = MINES_QTY - grid.filter((cell) => cell.hasFlag).length;
    setFlags(flags);
  };

  const resetGame = (grid: GridType) => {
    setGrid(grid);
    setEndGame(false);
    updateFlags();
    setStatus(defaultStatus);
  };

  return (
    <GameContext.Provider
      value={{
        grid,
        flags,
        status,
        endGame,
        setGrid,
        setStatus,
        setEndGame,
        updateFlags,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
