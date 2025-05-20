import { useMemo } from "react";
import { PiPencilSimpleFill } from "react-icons/pi";

export default function Mode({ mode }: { mode: string }) {
  const getModeIcon = useMemo(() => {
    return <PiPencilSimpleFill fontSize="18px" />;
  }, []);

  return (
    <div>
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium capitalize">{mode}</p>
        {getModeIcon}
      </div>
    </div>
  );
}
