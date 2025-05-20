export type ToolBarProps = {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
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
