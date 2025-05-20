export type ToolBarProps = {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  baseColor: string;
  setBaseColor: (color: string) => void;
  rows: number;
  setRows: (value: number) => void;
  cols: number;
  setCols: (value: number) => void;
  handleShowGrid: () => void;
  setGridSize: (value: number) => void;
  gridSize: number;
  createGrid: () => void;
  downloadArt: () => void;
  resetGrid: () => void;
  title: string;
  mode: string;
  showGridNum: boolean;
  activateEraser: () => void;
  activateFiller: () => void;
};

export enum Modes {
  fill = "fill",
  erase = "erase",
}

export type Mode = keyof typeof Modes;
