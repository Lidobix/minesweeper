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
  status: StatusType;
  style?: React.CSSProperties;
}

export type GridType = CellType[];

export interface GridGameProps {
  datas: GridType;
  leftClick: (cell: CellType) => void;
  rightClick: (cell: CellType, e: React.MouseEvent) => void;
  status: StatusType;
  cols: number;
  rows: number;
  style?: React.CSSProperties;
}

export interface CounterProps {
  value: number;
  style?: React.CSSProperties;
}

export interface TimerProps {
  style?: React.CSSProperties;
}

export type StatusType = 'standBy' | 'playing' | 'lost' | 'win';

export interface GameHeaderProps {
  flags: number;
  buttonClick: () => void;
  status: StatusType;
  style?: React.CSSProperties;
}

export interface ColorType {
  [index: number]: string;
}

export type StatusColorType = Record<StatusType, string>;

export interface LevelSelectorProps {
  style?: React.CSSProperties;
  selectLevel?: (level: LevelType) => void;
  levels?: LevelType[];
  // currentLevel: LevelType;
}

export interface LevelType {
  value: string;
  c: number;
  r: number;
  mines: number;
  selected: boolean;
}
