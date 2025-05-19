export default function GridLeftMarker({
  arrayNum,
  gridSize,
}: {
  arrayNum: number;
  gridSize: number;
}) {
  return (
    <div className="absolute left-0 w-9 h-full z-30 top-0 pt-9">
      <div className="grid grid-cols-1 h-full">
        {[...new Array(arrayNum)].map((_, index) => {
          return (
            <div
              key={index}
              className="flex items-center justify-center text-sm"
              style={{
                width: `36px`,
                height: `${gridSize}px`,
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
