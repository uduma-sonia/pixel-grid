import html2canvas from "html2canvas";
import { useState, useRef, useEffect, useCallback } from "react";
import ToolBar from "../components/ToolBar";
import Helpers from "../lib/Helpers";
import {
  GRID_SIZE_KEY,
  // defaultGridSize,
  GRID_KEY,
  GRID_SETTINGS_GENERATOR_KEY,
  FILL_MODE,
  PIXEL_GENERATOR_KEY,
  SELECTED_COLOR_KEY,
  BASE_COLOR_KEY,
  ALPHABET_MAP,
} from "../lib/constants";
import GridItem from "../components/GridItem";
import { Mode } from "../types/toolbar";
import BasicInput from "../components/BasicInput";

type Grid = string[][];

const defaultGridSize = 20;

export default function GenerateText() {
  const gridRef = useRef(null);
  const _baseColor =
    Helpers.getSettingFromLocalStorage(
      BASE_COLOR_KEY,
      GRID_SETTINGS_GENERATOR_KEY
    ) || "#ffffff";
  const _selectedColor =
    Helpers.getSettingFromLocalStorage(
      SELECTED_COLOR_KEY,
      GRID_SETTINGS_GENERATOR_KEY
    ) || "#000000";
  const [mode, setMode] = useState<Mode>(FILL_MODE);
  const [fileTitle, setFileTitle] = useState(() => {
    return Helpers.loadDataFromLocalStorage(PIXEL_GENERATOR_KEY);
  });
  const [gridSize, setGridSize] = useState(() => {
    return (
      Helpers.getSettingFromLocalStorage(
        GRID_SIZE_KEY,
        GRID_SETTINGS_GENERATOR_KEY
      ) || defaultGridSize
    );
  });
  // const [rows, setRows] = useState<any>(() => {
  //   return (
  //     Helpers.getSettingFromLocalStorage(
  //       ROWS_KEY,
  //       GRID_SETTINGS_GENERATOR_KEY
  //     ) || defaultGridNum
  //   );
  // });
  // const [cols, setCols] = useState<any>(() => {
  //   return (
  //     Helpers.getSettingFromLocalStorage(
  //       COLS_KEY,
  //       GRID_SETTINGS_GENERATOR_KEY
  //     ) || defaultGridNum
  //   );
  // });

  const [selectedColor, setSelectedColor] = useState<string>(_selectedColor);
  const [baseColor, setBaseColor] = useState<string>(_baseColor);
  const [text, setText] = useState<string>("");
  const [grid, setGrid] = useState<Grid>([]);
  // const [grid, setGrid] = useState<Grid>(() => {
  //   return Helpers.generatePixelText(
  //     text,
  //     ALPHABET_MAP,
  //     selectedColor,
  //     baseColor
  //   );
  // });
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

  const generateText = useCallback(() => {
    setGrid(() => {
      return Helpers.generatePixelText(
        text,
        ALPHABET_MAP,
        selectedColor,
        baseColor
      );
    });
  }, [baseColor, selectedColor, text]);

  // const createGrid = () => {
  //   const newGrid: Grid = [];

  //   for (let r = 0; r < rows; r++) {
  //     const row: string[] = [];

  //     for (let c = 0; c < cols; c++) {
  //       // Keep existing cell color if it exists, otherwise use default
  //       row.push(grid[r]?.[c] ?? _baseColor);
  //     }

  //     newGrid.push(row);
  //   }

  //   setGrid(newGrid);
  //   Helpers.saveToLocalStorage(GRID_KEY, newGrid);
  //   Helpers.updateSettingsInLocalStorage(
  //     GRID_SETTINGS_GENERATOR_KEY,
  //     COLS_KEY,
  //     cols
  //   );
  //   Helpers.updateSettingsInLocalStorage(
  //     GRID_SETTINGS_GENERATOR_KEY,
  //     ROWS_KEY,
  //     rows
  //   );
  // };

  const resetGrid = () => {
    localStorage.removeItem(GRID_KEY);
    localStorage.removeItem(GRID_SETTINGS_GENERATOR_KEY);

    setGridSize(defaultGridSize);
    // setRows(defaultGridNum);
    // setCols(defaultGridNum);
    // setShowGridNum(false);
    setSelectedColor("#000000");
    setBaseColor("#ffffff");

    setGrid([]);
  };

  // const handleShowGrid = () => {
  //   setShowGridNum(!showGridNum);
  //   Helpers.updateSettingsInLocalStorage(
  //     GRID_SETTINGS_GENERATOR_KEY,
  //     SHOW_GRID_NUM_KEY,
  //     !showGridNum
  //   );
  // };

  const handleSelectColor = useCallback(
    (value: string) => {
      setSelectedColor(value);
      setGrid(() => {
        return Helpers.generatePixelText(text, ALPHABET_MAP, value, baseColor);
      });

      Helpers.updateSettingsInLocalStorage(
        GRID_SETTINGS_GENERATOR_KEY,
        SELECTED_COLOR_KEY,
        value
      );
      setMode(FILL_MODE);
    },
    [baseColor, text]
  );

  const handleSelectBaseColor = useCallback(
    (value: string) => {
      setBaseColor(value);
      Helpers.updateSettingsInLocalStorage(
        GRID_SETTINGS_GENERATOR_KEY,
        BASE_COLOR_KEY,
        value
      );

      setGrid(() => {
        return Helpers.generatePixelText(
          text,
          ALPHABET_MAP,
          selectedColor,
          value
        );
      });
    },
    [selectedColor, text]
  );

  // const activateEraser = () => {
  //   setMode(ERASER_MODE);
  // };

  // const handleColChange = (value: any) => {
  //   if (value <= 100) {
  //     setCols(value);
  //   }
  // };

  // const handleRowChange = (value: any) => {
  //   if (value <= 100) {
  //     setRows(value);
  //   }
  // };

  // const activateFiller = () => {
  //   setMode(FILL_MODE);
  //   setSelectedColor(_selectedColor);
  // };

  useEffect(() => {
    const pixelName = Helpers.loadDataFromLocalStorage(PIXEL_GENERATOR_KEY);
    setFileTitle(pixelName);

    if (!pixelName) {
      const nameGenerated = Helpers.nameGenerator();
      Helpers.saveToLocalStorage(PIXEL_GENERATOR_KEY, nameGenerated);
      setFileTitle(nameGenerated);
    }
  }, []);

  return (
    <div>
      <div>
        <ToolBar
          type="generate"
          title={fileTitle}
          selectedColor={selectedColor}
          setSelectedColor={handleSelectColor}
          downloadArt={downloadArt}
          resetGrid={resetGrid}
          setGridSize={setGridSize}
          gridSize={gridSize}
          mode={mode}
          baseColor={baseColor}
          setBaseColor={handleSelectBaseColor}
        />

        <div className="py-4 flex items-end justify-end gap-2 px-3">
          <div className="w-[200px]">
            <BasicInput
              id="text"
              type="text"
              value={text}
              onChange={setText}
              placeholder="Text to generate"
            />
          </div>

          <div>
            <button
              className="text-white px-3 py-2 w-full rounded-lg text-sm flex items-center gap-1 bg-brand-color"
              onClick={generateText}
            >
              Generate
            </button>
          </div>
        </div>

        <div className="bg-white p-1 md:p-3 overflow-x-auto">
          {grid?.length > 0 && (
            <div className={`relative max-w-fit mx-auto`}>
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
    </div>
  );
}
