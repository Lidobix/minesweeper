export type CellId = number;

export interface CellType {
  isMine: boolean;
  value: number;
  id: CellId;
  isOpen: boolean;
  hasFlag: boolean;
}

export interface CellProps {
  isMine: boolean;
  value: number;
  isOpen: boolean;
  hasFlag: boolean;
  onClick: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
}

export type GridType = CellType[];

export interface GridGameProps {
  datas: GridType;
  leftClick: (cell: CellType) => void;
  rightClick: (cell: CellType, e: React.MouseEvent) => void;
}

export interface CounterProps {
  value: number;
}

export type StatusType = 'playing' | 'lost' | 'win';
