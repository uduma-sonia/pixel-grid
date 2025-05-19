import html2canvas from "html2canvas";
import { useState, useRef } from "react";
import TitleBar from "../components/TitleBar";

type Grid = string[][];

const createEmptyGrid = (
  rows: number,
  cols: number,
  color: string = "#FFFFFF"
): Grid => {
  return Array.from({ length: rows }, () => Array(cols).fill(color));
};

const GRID_KEY = "pixel-art-grid";
const COLS_KEY = "pixel-art-grid-cols";
const ROWS_KEY = "pixel-art-grid-rows";

const saveToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const loadDataFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }
  return null;
};

export default function Home() {
  const defaultGridNum = 10;
  const gridRef = useRef(null);

  const [rows, setRows] = useState<any>(() => {
    return loadDataFromLocalStorage(ROWS_KEY) || defaultGridNum;
  });
  const [cols, setCols] = useState<any>(() => {
    return loadDataFromLocalStorage(COLS_KEY) || defaultGridNum;
  });
  const [grid, setGrid] = useState<Grid>(() => {
    const saved = loadDataFromLocalStorage(GRID_KEY);
    return saved ?? createEmptyGrid(defaultGridNum, defaultGridNum);
  });
  const [selectedColor, setSelectedColor] = useState<string>("#000000");

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const newGrid = [...grid.map((row) => [...row])];
    newGrid[rowIndex][colIndex] = selectedColor;
    setGrid(newGrid);
    saveToLocalStorage(GRID_KEY, newGrid);
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
    saveToLocalStorage(GRID_KEY, newGrid);
    saveToLocalStorage(COLS_KEY, cols);
    saveToLocalStorage(ROWS_KEY, rows);
  };

  return (
    <div>
      <TitleBar
        title="Powerpuff girls pixel art"
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        rows={rows}
        setRows={setRows}
        cols={cols}
        setCols={setCols}
        createGrid={createGrid}
        downloadArt={downloadArt}
      />

      <div
        className="bg-red-500"
        style={{
          minHeight: "calc(100vh - 64px)",
        }}
      >
        {grid.length > 0 && (
          <div
            ref={gridRef}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${grid[0]?.length || 0}, 50px)`,
              gap: "1px",
              background: "#ccc",
              justifyContent: "center",
            }}
          >
            {grid.map((row, rowIndex) =>
              row.map((color, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: color,
                    cursor: "pointer",
                  }}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
