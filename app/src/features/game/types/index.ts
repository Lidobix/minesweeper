export type CellId = number;

export interface CellType {
  isBomb: boolean;
  value: number;
  id: CellId;
  isOpen: boolean;
  hasFlag: boolean;
}

export interface CellProps {
  isBomb: boolean;
  value: number;
  isOpen: boolean;
  hasFlag: boolean;
  onClick: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
}

export type BoardType = CellType[];

export interface BoardGameProps {
  datas: BoardType;
  leftClick: (cell: CellType) => void;
  rightClick: (cell: CellType, e: React.MouseEvent) => void;
}

export interface CounterProps {
  value: number;
}
