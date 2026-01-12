export interface SquareDataProps {
  isBomb: boolean;
  value: number;
  id: string;
  isOpen: boolean;
}

export interface SquareRenderProps {
  isBomb: boolean;
  value: number;
  isOpen: boolean;
  onClick: () => void;
}

export type LineProps = SquareDataProps[];
export type BoardProps = LineProps[];
