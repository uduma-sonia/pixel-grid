export default function GridTopMarker({
  arrayNum,
  gridSize,
}: {
  arrayNum: number;
  gridSize: number;
}) {
  return (
    <div className="absolute left-0 w-full h-9 z-30 top-0">
      <div className="flex justify-end h-full">
        {[...new Array(arrayNum)].map((_, index) => {
          return (
            <div
              key={index}
              className="flex items-center justify-center text-sm"
              style={{
                width: `${gridSize}px`,
                height: "36px",
                backgroundColor: "#FFFFFF",
              }}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
}
