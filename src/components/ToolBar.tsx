import { AiFillSave } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";
import BasicInput from "./BasicInput";
import { LuSettings2 } from "react-icons/lu";
import { useState, useRef, useEffect } from "react";
import Helpers from "../lib/Helpers";
import {
  ERASER_MODE,
  FILL_MODE,
  GRID_SETTINGS_KEY,
  GRID_SIZE_KEY,
} from "../lib/constants";
import { FaEraser } from "react-icons/fa";
import { PiPencilSimpleFill } from "react-icons/pi";
import Mode from "./Mode";
import { ToolBarProps } from "../types/toolbar";
import { IoIosArrowDown } from "react-icons/io";

export default function ToolBar({
  selectedColor,
  setSelectedColor,
  setBaseColor,
  baseColor,
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
  showGridNum,
  handleShowGrid,
  activateEraser,
  activateFiller,
  mode,
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
    <div className="flex shadow-lg mb-0.5 h-16 rounded-b-xl items-center justify-between px-4 sticky top-0 bg-white z-50">
      <div className="flex item gap-3">
        <p className="font-medium text-sm md:text-lg">{title}</p>

        <div>
          <button className="text-sm px-2 py-1 rounded-lg border border-black flex gap-3 items-center">
            Generate text
            <IoIosArrowDown />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Mode mode={mode} color={selectedColor} />

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
                  className="text-white px-3 py-2 w-full rounded-lg text-sm flex items-center gap-1 bg-brand-color"
                  onClick={createGrid}
                >
                  Generate grid
                </button>
              </div>

              <hr />

              <div className="mt-4 px-4">
                <BasicInput
                  label="Fill Color"
                  type="color"
                  value={selectedColor}
                  onChange={setSelectedColor}
                  className="border border-black rounded-md p-1 w-14 h-7 text-sm bg-white"
                />
              </div>
              <div className="mt-4 px-4">
                <BasicInput
                  label="Base Color"
                  type="color"
                  id="baseColor"
                  value={baseColor}
                  onChange={setBaseColor}
                  className="border border-black rounded-md p-1 w-14 h-7 text-sm bg-white"
                />
              </div>

              <div className="checkbox-container px-4 pt-8">
                <input
                  type="checkbox"
                  id="html"
                  checked={showGridNum}
                  onChange={handleShowGrid}
                />
                <label htmlFor="html" className="text-sm font-medium">
                  Show grid number
                </label>
              </div>

              <div className="px-4 flex items-center gap-3 pt-2">
                <div className="hover-container" data-text="Fill">
                  <button
                    style={{
                      backgroundColor:
                        mode === FILL_MODE ? "#dcdcdcd4" : "transparent",
                    }}
                    className="text-black px-2 py-1.5 rounded-lg hover:bg-[#dcdcdcd4] cursor-pointer"
                    onClick={activateFiller}
                  >
                    <PiPencilSimpleFill fontSize="24px" />
                  </button>
                </div>
                <div className="hover-container" data-text="Eraser">
                  <button
                    style={{
                      backgroundColor:
                        mode === ERASER_MODE ? "#dcdcdcd4" : "transparent",
                    }}
                    className="text-black px-2 py-1.5 rounded-lg hover:bg-[#dcdcdcd4] cursor-pointer"
                    onClick={activateEraser}
                  >
                    <FaEraser fontSize="20px" />
                  </button>
                </div>
              </div>

              <div className="flex mt-10 gap-3 px-4">
                <button
                  className="text-white px-3 py-2 rounded-lg text-sm w-full flex justify-center items-center gap-1 bg-brand-color"
                  onClick={resetGrid}
                >
                  Reset
                  <GrPowerReset fontSize="14px" />
                </button>

                <button
                  className="text-white px-3 py-2 rounded-lg text-sm w-full flex justify-center items-center gap-1 bg-brand-color"
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
    </div>
  );
}
