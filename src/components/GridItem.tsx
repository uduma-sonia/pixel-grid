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
      key={`${rowIndex}-${colIndex}`}
      className="border-[0.4px] border-[#000] flex items-center justify-center text-xs"
      onClick={() => handleCellClick(rowIndex, colIndex)}
      style={{
        width: `${gridSize}px`,
        height: `${gridSize}px`,
        backgroundColor: color,
        cursor: "pointer",
      }}
    >
      {colIndex + 1 + rowIndex}
    </div>
  );
}
