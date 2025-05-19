export default function GridItem({
  rowIndex,
  colIndex,
  gridSize,
  color,
  handleCellClick,
}: {
  rowIndex: number;
  colIndex: number;
  gridSize: number;
  color: string;
  handleCellClick: (rowIndex: number, colIndex: number) => void;
}) {
  return (
    <div
      className="border-[0.4px] border-[#000] flex items-center justify-center text-xs"
      onClick={() => handleCellClick(rowIndex, colIndex)}
      style={{
        width: `${gridSize}px`,
        height: `${gridSize}px`,
        backgroundColor: color,
        cursor: "pointer",
        boxSizing: "border-box",
      }}
    ></div>
  );
}
