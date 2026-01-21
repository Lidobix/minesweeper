import { useState, createContext, ReactNode } from 'react';
import { GridType, StatusType } from '../types';
import { NB_CELLS } from '../constants';

interface GameContextProps {
  grid: GridType;
  status: StatusType;
  endGame: boolean;
  setGrid: React.Dispatch<React.SetStateAction<GridType>>;
  setStatus: React.Dispatch<React.SetStateAction<StatusType>>;
  setEndGame: React.Dispatch<React.SetStateAction<boolean>>;
  resetGame: () => void;
}

export const GameContext = createContext<GameContextProps>({
  grid: [],
  status: 'playing',
  endGame: false,
  setGrid: () => {},
  setStatus: () => {},
  setEndGame: () => {},
  resetGame: () => {},
});

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const defaultStatus: StatusType = 'playing';
  const [grid, setGrid] = useState<GridType>(
    Array.from({ length: NB_CELLS }, (_, index) => ({
      id: index,
      value: 0,
      isMine: false,
      isOpen: false,
      hasFlag: false,
    })) as GridType,
  );

  const [status, setStatus] = useState<StatusType>(defaultStatus);
  const [endGame, setEndGame] = useState<boolean>(false);

  const resetGame = () => {
    setGrid(
      Array.from({ length: NB_CELLS }, (_, index) => ({
        id: index,
        value: 0,
        isMine: false,
        isOpen: false,
        hasFlag: false,
      })),
    );
    setEndGame(false);
    setStatus(defaultStatus);
  };

  return (
    <GameContext.Provider
      value={{
        grid,
        status,
        endGame,
        setGrid,
        setStatus,
        setEndGame,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
