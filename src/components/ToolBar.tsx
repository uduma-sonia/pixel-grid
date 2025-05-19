import { AiFillSave } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";
import BasicInput from "./BasicInput";

type ToolBarProps = {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  rows: number;
  setRows: (value: number) => void;
  cols: number;
  setCols: (value: number) => void;
  setGridSize: (value: number) => void;
  gridSize: number;
  createGrid: () => void;
  downloadArt: () => void;
  resetGrid: () => void;
  title: string;
};

export default function ToolBar({
  selectedColor,
  setSelectedColor,
  rows,
  setRows,
  cols,
  setCols,
  createGrid,
  downloadArt,
  title,
  setGridSize,
  gridSize,
  resetGrid,
}: ToolBarProps) {
  return (
    <div className="flex shadow-lg mb-0.5 h-16 rounded-b-lg items-center justify-between px-4 sticky top-0 bg-white z-20">
      <div>
        <p className="font-medium text-sm md:text-lg">{title}</p>
      </div>

      <div className="hidden md:flex items-center gap-4">
        <div className="flex items-center gap-4">
          <BasicInput
            label="Color"
            type="color"
            value={selectedColor}
            onChange={setSelectedColor}
            className="border border-black rounded-md p-1 w-14 h-7 text-sm bg-white"
          />
          <BasicInput label="Size" value={gridSize} onChange={setGridSize} />
          <BasicInput label="Rows" value={rows} onChange={setRows} />
          <BasicInput label="Cols" value={cols} onChange={setCols} />

          <button
            className="text-white px-3 py-2 rounded-lg text-sm flex items-center gap-1 bg-[#4b6e01]"
            onClick={createGrid}
          >
            Generate grid
          </button>
        </div>
        <button
          className="text-white px-3 py-2 rounded-lg text-sm flex items-center gap-1 bg-[#4b6e01]"
          onClick={downloadArt}
        >
          Save
          <AiFillSave fontSize="18px" />
        </button>
        <button
          className="text-white px-3 py-2 rounded-lg text-sm flex items-center gap-1 bg-[#4b6e01]"
          onClick={resetGrid}
        >
          Clear
          <GrPowerReset fontSize="18px" />
        </button>
      </div>
    </div>
  );
}
