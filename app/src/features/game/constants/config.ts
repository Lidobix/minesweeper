import { StatusColorType, ColorType, LevelType } from '../types';

export const CUSTOM_GREY = '#3f4747';
export const CUSTOM_GREEN = '#23ce6b';
const customRed = 'red';

export const STATUS_COLOR: StatusColorType = {
  win: CUSTOM_GREEN,
  playing: CUSTOM_GREY,
  standBy: CUSTOM_GREY,
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

export const LEVELS: LevelType[] = [
  { value: 'Facile', c: 10, r: 10, mines: 10, selected: false },
  { value: 'Moyen', c: 18, r: 12, mines: 40, selected: true },
  { value: 'Difficile', c: 25, r: 15, mines: 99, selected: false },
];
