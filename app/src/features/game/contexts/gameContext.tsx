import { useState, createContext, ReactNode, useCallback } from 'react';
import { GridType, StatusType, LevelType } from '../types';
import { LEVELS } from '../constants/config';

interface GameContextProps {
  grid: GridType;
  status: StatusType;
  time: number;
  cols: number;
  rows: number;
  minesQty: number;
  levels: LevelType[];
  toggleLevel: (level: LevelType) => void;
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
  levels: [],
  toggleLevel: () => {},
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
  const [levels, setLevels] = useState<LevelType[]>(LEVELS);
  const [minesQty, setMinesQty] = useState(0);
  const [grid, setGrid] = useState<GridType>([] as GridType);

  const [status, setStatus] = useState<StatusType>(defaultStatus);
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);

  const getDimensions = (level: LevelType) => {
    const isLandscape = window.innerHeight < window.innerWidth;
    // console.log('isLandscape: ', isLandscape);

    return {
      cols: isLandscape ? level.c : level.r,
      rows: isLandscape ? level.r : level.c,
      mines: level.mines,
    };
  };

  const resetGame = useCallback(() => {
    const {
      cols: computedCols,
      rows: computedRows,
      mines,
    } = getDimensions(levels.filter((level) => level.selected === true)[0]);

    // console.log('cols: ', computedCols);
    // console.log('rows: ', computedRows);
    setCols(computedCols);
    setRows(computedRows);
    setMinesQty(mines);

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
  }, [setGrid, setStatus, setTime, levels]);

  const toggleLevel = useCallback(
    (level: LevelType) => {
      setLevels((currentLevels) => {
        return currentLevels.map((currentLevel) => {
          return {
            ...currentLevel,
            selected: currentLevel.value === level.value,
          };
        });
      });
    },

    [setLevels],
  );

  return (
    <GameContext.Provider
      value={{
        grid,
        status,
        time,
        rows,
        cols,
        minesQty,
        levels,
        toggleLevel,
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
