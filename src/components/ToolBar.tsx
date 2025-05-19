import { AiFillSave } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";
import BasicInput from "./BasicInput";
import { LuSettings2 } from "react-icons/lu";
import { useState, useRef, useEffect } from "react";
import Helpers from "../lib/Helpers";
import { GRID_SETTINGS_KEY, GRID_SIZE_KEY } from "../lib/constants";

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
  const [isOpen, setIsOpen] = useState(false);
  const menuRef: any = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex shadow-lg mb-0.5 h-16 rounded-b-xl items-center justify-between px-4 sticky top-0 bg-white z-20">
      <div>
        <p className="font-medium text-sm md:text-lg">{title}</p>
      </div>

      <div className="relative inline-block">
        <button
          className="text-black px-3 py-1 rounded-lg border border-black"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <LuSettings2 fontSize="24px" />
        </button>

        {isOpen && (
          <div
            ref={menuRef}
            className="absolute top-[50px] -right-3 bg-white rounded-xl border z-50 shadow-lg w-[300px] px- py-5"
          >
            <div className="px-4 mb-3">
              <BasicInput
                label="Size"
                value={gridSize}
                onChange={setGridSize}
                onDebouncedChange={(val) => {
                  Helpers.updateSettingsInLocalStorage(
                    GRID_SETTINGS_KEY,
                    GRID_SIZE_KEY,
                    val
                  );
                }}
              />
            </div>

            <hr />
            <div className="my-3 px-4">
              <div className="flex gap-3 mb-2">
                <BasicInput label="Rows" value={rows} onChange={setRows} />
                <BasicInput label="Cols" value={cols} onChange={setCols} />
              </div>

              <button
                className="text-white px-3 py-2 w-full rounded-lg text-sm flex items-center gap-1 bg-[#4b6e01]"
                onClick={createGrid}
              >
                Generate grid
              </button>
            </div>

            <hr />

            <div className="mt-4 px-4">
              <BasicInput
                label="Color"
                type="color"
                value={selectedColor}
                onChange={setSelectedColor}
                className="border border-black rounded-md p-1 w-14 h-7 text-sm bg-white"
              />
            </div>

            <div className="flex mt-10 gap-3 px-4">
              <button
                className="text-white px-3 py-2 rounded-lg text-sm w-full flex justify-center items-center gap-1 bg-[#4b6e01]"
                onClick={resetGrid}
              >
                Reset
                <GrPowerReset fontSize="14px" />
              </button>

              <button
                className="text-white px-3 py-2 rounded-lg text-sm w-full flex justify-center items-center gap-1 bg-[#4b6e01]"
                onClick={downloadArt}
              >
                Save
                <AiFillSave fontSize="16px" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
