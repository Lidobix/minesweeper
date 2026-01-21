export type CellId = number;

export interface CellType {
  isMine: boolean;
  value: number;
  id: CellId;
  isOpen: boolean;
  hasFlag: boolean;
}

export interface CellProps {
  cell: CellType;
  onClick: (cell: CellType) => void;
  onContextMenu: (cell: CellType, e: React.MouseEvent) => void;
}

export type GridType = CellType[];

export interface GridGameProps {
  datas: GridType;
  leftClick: (cell: CellType) => void;
  rightClick: (cell: CellType, e: React.MouseEvent) => void;
  status: StatusType;
}

export interface CounterProps {
  value: number;
}

export type StatusType = 'playing' | 'lost' | 'win';

export interface HeaderProps {
  flags: number;
  buttonClick: () => void;
  gameStatus: StatusType;
}

export interface ButtonProps {
  text: string;
  onClick: () => void;
  style?: React.CSSProperties;
}
