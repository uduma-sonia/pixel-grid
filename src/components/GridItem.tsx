export default function GridItem({
  rowIndex,
  colIndex,
  gridSize,
  color,
  handleCellClick,
  lastClicked,
  baseColor,
}: {
  rowIndex: number;
  colIndex: number;
  gridSize: number;
  color: string;
  baseColor: string;
  handleCellClick: (rowIndex: number, colIndex: number) => void;
  lastClicked: {
    row: number;
    col: number;
  } | null;
}) {
  const isActive =
    lastClicked?.row === rowIndex && lastClicked?.col === colIndex;

  return (
    <div
      style={{
        backgroundColor: baseColor,
      }}
    >
      <div
        className={`cursor-pointer border-[0.4px] border-[#000] flex items-center justify-center text-xs ${
          isActive ? "animate-pop " : ""
        }`}
        onClick={() => handleCellClick(rowIndex, colIndex)}
        style={{
          width: `${gridSize}px`,
          height: `${gridSize}px`,
          backgroundColor: color,
          cursor: "pointer",
        }}
      ></div>
    </div>
  );
}
