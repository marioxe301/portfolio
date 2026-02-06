type StatBarProps = {
  label: string;
  current: number;
  max: number;
  color: "hp" | "mp" | "exp";
};

const colorClasses: Record<StatBarProps["color"], string> = {
  hp: "bg-[#f38ba8]",
  mp: "bg-[#89b4fa]",
  exp: "bg-[#f9e2af]",
};

export function StatBar({ label, current, max, color }: StatBarProps) {
  const percentage = (current / max) * 100;

  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1 text-[10px]">
        <span>{label}</span>
        <span>
          {current}/{max}
        </span>
      </div>
      <div className="h-4 bg-[#181825] border-2 border-[#45475a] relative">
        <div
          className={`h-full ${colorClasses[color]} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
