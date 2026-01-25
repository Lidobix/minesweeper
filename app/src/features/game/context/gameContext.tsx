import { useState, createContext, ReactNode, useCallback } from 'react';
import { GridType, StatusType } from '../types';

interface GameContextProps {
  grid: GridType;
  status: StatusType;
  time: number;
  cols: number;
  rows: number;
  minesQty: number;
  setGrid: React.Dispatch<React.SetStateAction<GridType>>;
  setStatus: React.Dispatch<React.SetStateAction<StatusType>>;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  resetGame: () => void;
}

export const GameContext = createContext<GameContextProps>({
  grid: [],
  status: 'standBy',
  time: 0,
  cols: 0,
  rows: 0,
  minesQty: 0,
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
  const [minesQty, setMinesQty] = useState(25);
  const [grid, setGrid] = useState<GridType>([] as GridType);

  const [status, setStatus] = useState<StatusType>(defaultStatus);
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);

  const getDimensions = (levelConfig: { l: number; r: number }) => {
    const isLandscape = window.innerHeight < window.innerWidth;

    return {
      cols: isLandscape ? levelConfig.l : levelConfig.r,
      rows: isLandscape ? levelConfig.r : levelConfig.l,
    };
  };

  const resetGame = useCallback(() => {
    const { cols: computedCols, rows: computedRows } = getDimensions({
      l: 17,
      r: 10,
    });
    console.log(computedCols, computedRows);

    setCols(computedCols);
    setRows(computedRows);

    setGrid(
      Array.from({ length: computedCols * computedRows }, (_, index) => ({
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
        rows,
        cols,
        minesQty,
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
