import { useEffect } from "react";
import debounce from "lodash.debounce";

type BasicInputProps = {
  label?: string;
  placeholder?: string;
  id?: string;
  value?: number | string | undefined;
  onChange?: (value: any) => void | undefined;
  onDebouncedChange?: (value: any) => void; // debounced side-effect
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
  max?: number;
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
  max = 1000,
  placeholder,
}: BasicInputProps) {
  const inputId = id ?? label?.toLowerCase();

  // Debounce side effect when value changes
  useEffect(() => {
    if (!onDebouncedChange) return;

    const debounced = debounce(() => {
      onDebouncedChange(value);
    }, 1000);

    debounced();

    return () => {
      debounced.cancel();
    };
  }, [value, onDebouncedChange]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue =
      type === "number" ? Number(e.target.value) : e.target.value;

    if (rawValue === max) {
      console.log("over the max");
    }

    onChange?.(rawValue);
  };

  return (
    <div className="flex flex-col items-start gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        inputMode={inputMode}
        value={value}
        placeholder={placeholder}
        onChange={handleInput}
        className={`border border-[#9198a0] rounded-md p-1 w-full shadow-sm h-9 text-sm ${className}`}
      />
    </div>
  );
}
