import html2canvas from "html2canvas";
import { useState, useRef } from "react";
import ToolBar from "../components/ToolBar";
import Helpers from "../lib/Helpers";

type Grid = string[][];

const GRID_KEY = "pixel-art-grid";
// Convert to a single object settings
const COLS_KEY = "pixel-art-grid-cols";
const ROWS_KEY = "pixel-art-grid-rows";
// const GRID_SIZE = "pixel-art-grid-size";
const defaultGridNum = 10;

export default function Home() {
  const gridRef = useRef(null);

  const [gridSize, setGridSize] = useState(70);
  const [rows, setRows] = useState<any>(() => {
    return Helpers.loadDataFromLocalStorage(ROWS_KEY) || defaultGridNum;
  });
  const [cols, setCols] = useState<any>(() => {
    return Helpers.loadDataFromLocalStorage(COLS_KEY) || defaultGridNum;
  });
  const [grid, setGrid] = useState<Grid>(() => {
    const saved = Helpers.loadDataFromLocalStorage(GRID_KEY);
    return saved ?? Helpers.createEmptyGrid(defaultGridNum, defaultGridNum);
  });
  const [selectedColor, setSelectedColor] = useState<string>("#000000");

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const newGrid = [...grid.map((row) => [...row])];
    newGrid[rowIndex][colIndex] = selectedColor;
    setGrid(newGrid);
    Helpers.saveToLocalStorage(GRID_KEY, newGrid);
  };

  const downloadArt = async () => {
    if (gridRef.current) {
      const canvas = await html2canvas(gridRef.current);
      const link = document.createElement("a");
      link.download = "pixel-art.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  const createGrid = () => {
    const newGrid: Grid = [];

    for (let r = 0; r < rows; r++) {
      const row: string[] = [];

      for (let c = 0; c < cols; c++) {
        // Keep existing cell color if it exists, otherwise use default
        row.push(grid[r]?.[c] ?? "#FFFFFF");
      }

      newGrid.push(row);
    }

    setGrid(newGrid);
    Helpers.saveToLocalStorage(GRID_KEY, newGrid);
    Helpers.saveToLocalStorage(COLS_KEY, cols);
    Helpers.saveToLocalStorage(ROWS_KEY, rows);
  };

  const resetGrid = () => {
    localStorage.removeItem(GRID_KEY);
    localStorage.removeItem(COLS_KEY);
    localStorage.removeItem(ROWS_KEY);

    setRows(defaultGridNum);
    setCols(defaultGridNum);
    setSelectedColor("#000000");
    setGrid(() => {
      return Helpers.createEmptyGrid(defaultGridNum, defaultGridNum);
    });
  };

  return (
    <div>
      <ToolBar
        title="Powerpuff girls pixel art"
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        rows={rows}
        setRows={setRows}
        cols={cols}
        setCols={setCols}
        createGrid={createGrid}
        downloadArt={downloadArt}
        resetGrid={resetGrid}
        setGridSize={setGridSize}
        gridSize={gridSize}
      />

      <div className="bg-white p-3 overflow-x-auto">
        {grid.length > 0 && (
          <div
            ref={gridRef}
            className="grid gap-0 w-fit overflow-x-auto mx-auto"
            style={{
              gridTemplateColumns: `repeat(${
                grid[0]?.length || 0
              }, ${gridSize}px)`,
              background: "#ffffff",
            }}
          >
            {grid.map((row, rowIndex) =>
              row.map((color, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="border-[0.4px] border-[#000]"
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  style={{
                    width: `${gridSize}px`,
                    height: `${gridSize}px`,
                    backgroundColor: color,
                    cursor: "pointer",
                  }}
                ></div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// const gridSettings = {
//   rows: 0,
//   cols: 0,
//   color: 0,
//   size: 0
// }
// 1. show grid number
// 2. Eraser
// 3. Undo
// 4. Improve color picker (save picked colors)
