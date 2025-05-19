import { useEffect, useMemo } from "react";
import debounce from "lodash.debounce";

type BasicInputProps = {
  label: string;
  id?: string;
  value: number | string;
  onChange: (value: any) => void;
  onDebouncedChange?: (value: any) => void; // 👈 optional debounce
  className?: string;
  type?: string;
  inputMode?:
    | "numeric"
    | "search"
    | "email"
    | "tel"
    | "text"
    | "url"
    | "none"
    | "decimal"
    | undefined;
};

export default function BasicInput({
  label,
  id,
  value,
  onChange,
  onDebouncedChange,
  className = "",
  type = "number",
  inputMode = "numeric",
}: BasicInputProps) {
  const inputId = id ?? label.toLowerCase();

  // 👇 Create and memoize debounced function
  const debouncedChange = useMemo(() => {
    if (!onDebouncedChange) return undefined;
    return debounce(onDebouncedChange, 2000); // 2 seconds
  }, [onDebouncedChange]);

  // 🧼 Clean up debounce on unmount
  useEffect(() => {
    return () => {
      debouncedChange?.cancel();
    };
  }, [debouncedChange]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue =
      type === "number" ? Number(e.target.value) : e.target.value;
    onChange(rawValue);
    if (debouncedChange) debouncedChange(rawValue);
  };

  return (
    <div className="flex flex-col items-start gap-1">
      <label htmlFor={inputId} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={handleInput}
        className={`border border-[#9198a0] rounded-md p-1 w-full shadow-sm h-9 text-sm ${className}`}
      />
    </div>
  );
}
