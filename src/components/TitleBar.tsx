import { AiFillSave } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";

type TitleBarProps = {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  rows: number;
  setRows: (value: number) => void;
  cols: number;
  setCols: (value: number) => void;
  createGrid: () => void;
  downloadArt: () => void;
  resetGrid: () => void;
  title: string;
};

export default function TitleBar({
  selectedColor,
  setSelectedColor,
  rows,
  setRows,
  cols,
  setCols,
  createGrid,
  downloadArt,
  title,
  resetGrid,
}: TitleBarProps) {
  return (
    <div className="flex shadow-2xl mb-0.5 h-16 rounded-b-lg items-center justify-between px-4">
      <div>
        <p className="font-medium text-sm md:text-lg">{title}</p>
      </div>

      <div className="hidden md:flex items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <label className="text-sm">Color:</label>
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="border border-black rounded-md p-1 w-14 h-7 text-sm bg-white"
            />
          </div>
          <div className="flex items-center gap-1">
            <label className="text-sm">Rows:</label>
            <input
              type="number"
              inputMode="numeric"
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              className="border border-black rounded-md p-1 w-14 h-7 text-sm"
            />
          </div>
          <div className="flex items-center gap-1">
            <label className="text-sm">Cols:</label>
            <input
              type="number"
              inputMode="numeric"
              value={cols}
              onChange={(e) => setCols(Number(e.target.value))}
              className="border border-black rounded-md p-1 w-14 h-7 text-sm"
            />
          </div>

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
