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

export default function Home() {
  const defaultGridNum = 10;
  const gridRef = useRef(null);

  const [rows, setRows] = useState<any>(defaultGridNum);
  const [cols, setCols] = useState<any>(defaultGridNum);
  const [selectedColor, setSelectedColor] = useState<string>("#000000");
  const [grid, setGrid] = useState<Grid>(() =>
    createEmptyGrid(defaultGridNum, defaultGridNum)
  );

  const createGrid = () => {
    const newGrid = Array(rows)
      .fill(null)
      .map(() => Array(cols).fill("#FFFFFF"));
    setGrid(newGrid);
  };

  // const createGrid = () => {
  //   const saved = loadGridFromLocalStorage();
  //   if (saved && saved.length === rows && saved[0]?.length === cols) {
  //     setGrid(saved);
  //   } else {
  //     const newGrid = createEmptyGrid(rows, cols);
  //     setGrid(newGrid);
  //     saveGridToLocalStorage(newGrid);
  //   }
  // };
  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const newGrid = [...grid];
    newGrid[rowIndex][colIndex] = selectedColor;
    setGrid(newGrid);
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
  );
}
