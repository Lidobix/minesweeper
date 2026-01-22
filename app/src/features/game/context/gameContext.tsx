import { useState, createContext, ReactNode, useCallback } from 'react';
import { GridType, StatusType } from '../types';
import { NB_CELLS } from '../constants';

interface GameContextProps {
  grid: GridType;
  status: StatusType;
  time: number;
  setGrid: React.Dispatch<React.SetStateAction<GridType>>;
  setStatus: React.Dispatch<React.SetStateAction<StatusType>>;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  resetGame: () => void;
}

export const GameContext = createContext<GameContextProps>({
  grid: [],
  status: 'standBy',
  time: 0,
  setGrid: () => {},
  setStatus: () => {},
  setTime: () => {},
  resetGame: () => {},
});

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const defaultStatus: StatusType = 'standBy';
  const [time, setTime] = useState(0);
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
    setTime(0);
  }, [setGrid, setStatus, setTime]);

  return (
    <GameContext.Provider
      value={{
        grid,
        status,
        time,
        setGrid,
        setStatus,
        setTime,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
