import { useContext, useState, createContext, ReactNode } from 'react';
import { BoardType } from '../types';

interface BaordContextProps {
  gameCells: BoardType;
  generateGameCells: () => void;
}

export const BoardContext = createContext<BaordContextProps>({
  gameCells: [],
  generateGameCells: () => {},
});

interface BoardProviderProps {
  children: ReactNode;
}

export const BoardProvider: React.FC<BoardProviderProps> = ({ children }) => {
  const [gameCells, setGameCells] = useState<BoardType>([]);
  const generateGameCells = () => {};

  return (
    <BoardContext.Provider value={{ gameCells, generateGameCells }}>
      {children}
    </BoardContext.Provider>
  );
};
