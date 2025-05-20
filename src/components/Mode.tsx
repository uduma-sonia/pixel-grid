import { useMemo } from "react";
import { PiPencilSimpleFill } from "react-icons/pi";
import { ERASER_MODE, FILL_MODE } from "../lib/constants";
import { FaEraser } from "react-icons/fa";

export default function Mode({ mode, color }: { mode: string; color: string }) {
  const getModeIcon = useMemo(() => {
    switch (mode) {
      case FILL_MODE:
        return <PiPencilSimpleFill fontSize="18px" />;

      case ERASER_MODE:
        return <FaEraser fontSize="18px" />;

      default:
        return <div></div>;
    }
  }, [mode]);

  return (
    <div>
      <div className="flex items-center gap-1">
        {mode === FILL_MODE && (
          <div
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: color,
            }}
          ></div>
        )}
        <p className="text-sm font-medium capitalize">{mode}</p>
        {getModeIcon}
      </div>
    </div>
  );
}
