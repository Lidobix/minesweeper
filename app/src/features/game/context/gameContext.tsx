import { useState, createContext, ReactNode, useCallback } from 'react';
import { GridType, StatusType } from '../types';
import { NB_CELLS } from '../constants';

interface GameContextProps {
  grid: GridType;
  status: StatusType;
  setGrid: React.Dispatch<React.SetStateAction<GridType>>;
  setStatus: React.Dispatch<React.SetStateAction<StatusType>>;
  resetGame: () => void;
}

export const GameContext = createContext<GameContextProps>({
  grid: [],
  status: 'standBy',
  setGrid: () => {},
  setStatus: () => {},
  resetGame: () => {},
});

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const defaultStatus: StatusType = 'standBy';
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

  const resetGame = useCallback(() => {
    setGrid(
      Array.from({ length: NB_CELLS }, (_, index) => ({
        id: index,
        value: 0,
        isMine: false,
        isOpen: false,
        hasFlag: false,
      })),
    );
    setStatus(defaultStatus);
  }, [setGrid, setStatus]);

  return (
    <GameContext.Provider
      value={{
        grid,
        status,
        setGrid,
        setStatus,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
