import { TrendingUp, TrendingDown } from "lucide-react";

const StatsCard = ({
  title,
  value,
  change,
  positive = true,
  icon,
}) => {
  return (
    <div
      className="
        bg-[#111113]
        border
        border-white/10
        rounded-2xl
        p-5
        hover:border-indigo-500/40
        transition-all
        duration-300
      "
    >
      {/* Header */}
      <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wide">
        {icon}
        <span>{title}</span>
      </div>

      {/* Value */}
      <h2 className="mt-5 text-2xl font-bold text-white">
        {value}
      </h2>

      {/* Change */}
      <div
        className={`mt-4 flex items-center gap-2 text-sm font-medium ${
          positive ? "text-emerald-400" : "text-red-400"
        }`}
      >
        {positive ? (
          <TrendingUp size={16} />
        ) : (
          <TrendingDown size={16} />
        )}

        <span>{change}</span>

        <span className="text-gray-500 font-normal">
          vs prev
        </span>
      </div>
    </div>
  );
};

export default StatsCard;