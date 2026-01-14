export type CellId = number;

export interface SquareDataProps {
  isBomb: boolean;
  value: number;
  id: CellId;
  isOpen: boolean;
  hasFlag: boolean;
}

export interface SquareRenderProps {
  isBomb: boolean;
  value: number;
  isOpen: boolean;
  hasFlag: boolean;
  onClick: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
}

export type BoardProps = SquareDataProps[];

export interface BoardGameProps {
  datas: BoardProps;
  leftClick: (id: CellId) => void;
  rightClick: (id: CellId, e: React.MouseEvent) => void;
}

export interface CounterProps {
  value: number;
}
