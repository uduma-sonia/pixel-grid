type BasicInputProps = {
  label: string;
  id?: string;
  value: number | string;
  onChange: (value: any) => void;
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
  className = "",
  type = "number",
  inputMode = "numeric",
}: BasicInputProps) {
  const inputId = id ?? label.toLowerCase();

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
        onChange={(e) => {
          if (type === "number") {
            onChange(Number(e.target.value));
          } else {
            onChange(e.target.value);
          }
        }}
        className={`border border-[#9198a0] rounded-md p-1 w-full shadow-sm h-9 text-sm ${className}`}
      />
    </div>
  );
}
