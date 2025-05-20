export type ToolBarProps = {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  baseColor: string;
  setBaseColor: (color: string) => void;
  rows?: number | undefined;
  setRows?: (value: number) => void | undefined;
  cols?: number | undefined;
  setCols?: (value: number) => void | undefined;
  handleShowGrid?: () => void;
  setGridSize: (value: number) => void;
  gridSize: number;
  createGrid?: () => void;
  downloadArt: () => void;
  resetGrid: () => void;
  title: string;
  mode: string;
  showGridNum?: boolean;
  activateEraser?: () => void;
  activateFiller?: () => void;
  type?: string;
};

export enum Modes {
  fill = "fill",
  erase = "erase",
}

export type Mode = keyof typeof Modes;
