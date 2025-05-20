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
  FILL_MODE,
  PIXEL_NAME_KEY,
  SELECTED_COLOR_KEY,
  ERASER_MODE,
  BASE_COLOR_KEY,
} from "../lib/constants";
import GridItem from "../components/GridItem";
import GridTopMarker from "../components/GridTopMarker";
import GridLeftMarker from "../components/GridLeftMarker";
import { Mode } from "../types/toolbar";

type Grid = string[][];

export default function Home() {
  const gridRef = useRef(null);
  const _baseColor =
    Helpers.getSettingFromLocalStorage(BASE_COLOR_KEY) || "#ffffff";
  const _selectedColor =
    Helpers.getSettingFromLocalStorage(SELECTED_COLOR_KEY) || "#000000";
  const [mode, setMode] = useState<Mode>(FILL_MODE);
  const [fileTitle, setFileTitle] = useState(() => {
    return Helpers.loadDataFromLocalStorage(PIXEL_NAME_KEY);
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
    return saved ?? Helpers.createEmptyGrid(defaultGridNum, defaultGridNum);
  });
  const [selectedColor, setSelectedColor] = useState<string>(_selectedColor);
  const [baseColor, setBaseColor] = useState<string>(_baseColor);
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

  const updateGridCell = ({
    grid,
    rowIndex,
    colIndex,
    mode,
    color,
  }: {
    grid: Grid;
    rowIndex: number;
    colIndex: number;
    mode: Mode;
    color: string;
  }) => {
    const newGrid = grid.map((row) => [...row]);
    newGrid[rowIndex][colIndex] = mode === FILL_MODE ? color : "transparent";
    return newGrid;
  };

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const updated = updateGridCell({
      grid,
      rowIndex,
      colIndex,
      mode,
      color: selectedColor,
    });

    setGrid(updated);
    setLastClicked({ row: rowIndex, col: colIndex });
    Helpers.saveToLocalStorage(GRID_KEY, updated);
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
        row.push(grid[r]?.[c] ?? _baseColor);
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
    setShowGridNum(false);
    setSelectedColor("#000000");
    setBaseColor("#ffffff");

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

  const handleSelectColor = (value: string) => {
    setSelectedColor(value);
    Helpers.updateSettingsInLocalStorage(
      GRID_SETTINGS_KEY,
      SELECTED_COLOR_KEY,
      value
    );
    setMode(FILL_MODE);
  };

  const handleSelectBaseColor = (value: string) => {
    setBaseColor(value);
    Helpers.updateSettingsInLocalStorage(
      GRID_SETTINGS_KEY,
      BASE_COLOR_KEY,
      value
    );
  };

  const activateEraser = () => {
    setMode(ERASER_MODE);
  };

  const handleColChange = (value: any) => {
    if (value <= 100) {
      setCols(value);
    }
  };

  const handleRowChange = (value: any) => {
    if (value <= 100) {
      setRows(value);
    }
  };

  const activateFiller = () => {
    setMode(FILL_MODE);
    setSelectedColor(_selectedColor);
  };

  useEffect(() => {
    const pixelName = Helpers.loadDataFromLocalStorage(PIXEL_NAME_KEY);
    setFileTitle(pixelName);

    if (!pixelName) {
      const nameGenerated = Helpers.nameGenerator();
      Helpers.saveToLocalStorage(PIXEL_NAME_KEY, nameGenerated);
      setFileTitle(nameGenerated);
    }
  }, []);

  return (
    <div>
      <ToolBar
        title={fileTitle}
        selectedColor={selectedColor}
        setSelectedColor={handleSelectColor}
        rows={rows}
        setRows={handleRowChange}
        cols={cols}
        setCols={handleColChange}
        createGrid={createGrid}
        downloadArt={downloadArt}
        resetGrid={resetGrid}
        setGridSize={setGridSize}
        gridSize={gridSize}
        showGridNum={showGridNum}
        handleShowGrid={handleShowGrid}
        activateEraser={activateEraser}
        activateFiller={activateFiller}
        mode={mode}
        baseColor={baseColor}
        setBaseColor={handleSelectBaseColor}
      />

      <div className="bg-white p-1 md:p-3 overflow-x-auto">
        {grid?.length > 0 && (
          <div
            className={`relative max-w-fit mx-auto ${
              showGridNum ? "pl-9 pt-9" : "pl-1 pt-1"
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
              }}
            >
              {grid.map((row, rowIndex) =>
                row.map((color, colIndex) => {
                  return (
                    <GridItem
                      key={`${rowIndex}-${colIndex}`}
                      rowIndex={rowIndex}
                      colIndex={colIndex}
                      gridSize={gridSize}
                      baseColor={baseColor}
                      color={color || baseColor}
                      handleCellClick={handleCellClick}
                      lastClicked={lastClicked}
                    />
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 2. record last 5 selected color
// 3. set divider lines
// 4. drag over squares to fill color
// 5. drag over squares to erase
// 7. save numerous files
// 8. tell users they cannot set more than 100 rows or cols
// 9. Fit screen / fullscreen
// 10. fix top grid marker on overflowing screen
