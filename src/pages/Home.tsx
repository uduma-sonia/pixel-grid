import html2canvas from "html2canvas";
import { useState, useRef, useEffect } from "react";
import ToolBar from "../components/ToolBar";
import Helpers from "../lib/Helpers";
import {
  GRID_SIZE_KEY,
  defaultGridSize,
  ROWS_KEY,
  defaultGridNum,
  COLS_KEY,
  GRID_KEY,
  GRID_SETTINGS_KEY,
  SHOW_GRID_NUM_KEY,
} from "../lib/constants";
import GridItem from "../components/GridItem";
import GridTopMarker from "../components/GridTopMarker";
import GridLeftMarker from "../components/GridLeftMarker";

type Grid = string[][];

export default function Home() {
  const gridRef = useRef(null);
  const baseColor = "#ffffff";

  const [fileTitle, setFileTitle] = useState(() => {
    return Helpers.loadDataFromLocalStorage("pixel-name");
  });
  const [gridSize, setGridSize] = useState(() => {
    return Helpers.getSettingFromLocalStorage(GRID_SIZE_KEY) || defaultGridSize;
  });
  const [rows, setRows] = useState<any>(() => {
    return Helpers.getSettingFromLocalStorage(ROWS_KEY) || defaultGridNum;
  });
  const [cols, setCols] = useState<any>(() => {
    return Helpers.getSettingFromLocalStorage(COLS_KEY) || defaultGridNum;
  });
  const [grid, setGrid] = useState<Grid>(() => {
    const saved = Helpers.loadDataFromLocalStorage(GRID_KEY);
    return (
      saved ??
      Helpers.createEmptyGrid(defaultGridNum, defaultGridNum, baseColor)
    );
  });
  const [selectedColor, setSelectedColor] = useState<string>("#000000");
  const [gridNumber, setGridNumber] = useState({
    rows: Helpers.getSettingFromLocalStorage(ROWS_KEY) || defaultGridNum,
    cols: Helpers.getSettingFromLocalStorage(COLS_KEY) || defaultGridNum,
  });

  const [showGridNum, setShowGridNum] = useState(
    Helpers.getSettingFromLocalStorage(SHOW_GRID_NUM_KEY) || false
  );
  const [lastClicked, setLastClicked] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const newGrid = [...grid.map((row) => [...row])];
    newGrid[rowIndex][colIndex] = selectedColor;
    setGrid(newGrid);
    setLastClicked({ row: rowIndex, col: colIndex });
    Helpers.saveToLocalStorage(GRID_KEY, newGrid);
  };

  const downloadArt = async () => {
    if (gridRef.current) {
      const canvas = await html2canvas(gridRef.current);
      const link = document.createElement("a");
      link.download = `${fileTitle}.png`;
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
        row.push(grid[r]?.[c] ?? baseColor);
      }

      newGrid.push(row);
    }

    setGrid(newGrid);
    setGridNumber({
      rows: rows,
      cols: cols,
    });
    Helpers.saveToLocalStorage(GRID_KEY, newGrid);
    Helpers.updateSettingsInLocalStorage(GRID_SETTINGS_KEY, COLS_KEY, cols);
    Helpers.updateSettingsInLocalStorage(GRID_SETTINGS_KEY, ROWS_KEY, rows);
  };

  const resetGrid = () => {
    localStorage.removeItem(GRID_KEY);
    localStorage.removeItem(GRID_SETTINGS_KEY);

    setGridSize(defaultGridSize);
    setRows(defaultGridNum);
    setCols(defaultGridNum);
    setSelectedColor("#000000");
    setShowGridNum(false);

    setGrid(() => {
      return Helpers.createEmptyGrid(defaultGridNum, defaultGridNum);
    });
    setGridNumber({
      rows: Helpers.getSettingFromLocalStorage(ROWS_KEY) || defaultGridNum,
      cols: Helpers.getSettingFromLocalStorage(COLS_KEY) || defaultGridNum,
    });
  };

  const handleShowGrid = () => {
    setShowGridNum(!showGridNum);
    Helpers.updateSettingsInLocalStorage(
      GRID_SETTINGS_KEY,
      SHOW_GRID_NUM_KEY,
      !showGridNum
    );
  };

  const activateEraser = () => {
    setSelectedColor(baseColor);
  };
  const activateFiller = () => {
    setSelectedColor("#000000");
  };

  useEffect(() => {
    const pixelName = Helpers.loadDataFromLocalStorage("pixel-name");
    setFileTitle(pixelName);

    if (!pixelName) {
      const nameGenerated = Helpers.nameGenerator();
      Helpers.saveToLocalStorage("pixel-name", nameGenerated);
      setFileTitle(nameGenerated);
    }
  }, []);

  return (
    <div>
      <ToolBar
        title={fileTitle}
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
        showGridNum={showGridNum}
        handleShowGrid={handleShowGrid}
        activateEraser={activateEraser}
        activateFiller={activateFiller}
      />

      <div className="bg-white p-1 md:p-3 overflow-x-auto">
        {grid?.length > 0 && (
          <div
            className={`relative max-w-fit mx-auto ${
              showGridNum ? "pl-9 pt-9" : "pl-3 pt-3"
            } `}
          >
            {showGridNum && (
              <>
                <GridTopMarker arrayNum={gridNumber.cols} gridSize={gridSize} />
                <GridLeftMarker
                  arrayNum={gridNumber.rows}
                  gridSize={gridSize}
                />
              </>
            )}

            <div
              ref={gridRef}
              className={`grid gap-0 w-fit overflow-x-auto mx-auto`}
              style={{
                gridTemplateColumns: `repeat(${
                  grid[0]?.length || 0
                }, ${gridSize}px)`,
                background: "white",
              }}
            >
              {grid.map((row, rowIndex) =>
                row.map((color, colIndex) => (
                  <GridItem
                    key={`${rowIndex}-${colIndex}`}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    gridSize={gridSize}
                    color={color || baseColor}
                    handleCellClick={handleCellClick}
                    lastClicked={lastClicked}
                  />
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 1. set base style
// 2. record last 5 selected color
// 3. set divider lines
// 4. drag over squares to fill color
// 5. drag iver squares to erase
// 6. indicate mode in title bar
// 7. save numerous files
// 8. set max number for rows and cols
// 9. Fit screen / fullscreen
