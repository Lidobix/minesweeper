import { StatusColorType, ColorType } from '../types';

export const MINES_QTY = 5;
export const LINES = 5;
export const ROWS = 5;
export const CELL_SIZE = 80;
export const NB_CELLS = LINES * ROWS;

export const CUSTOM_GREY = '#3f4747';
export const CUSTOM_GREEN = '#23ce6b';
const customRed = 'red';

export const STATUS_COLOR: StatusColorType = {
  win: CUSTOM_GREEN,
  playing: CUSTOM_GREY,
  lost: customRed,
};

export const MINES_INDICATOR_COLORS: ColorType = {
  1: '#64B5F6',
  2: '#81C784',
  3: '#E57373',
  4: '#FFD54F',
  5: '#BA68C8',
  6: '#4DD0E1',
  7: '#F5F5F5',
  8: '#B0BEC5',
};
