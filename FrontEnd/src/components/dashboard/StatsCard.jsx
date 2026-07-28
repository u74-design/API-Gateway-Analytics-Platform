import { TrendingUp, TrendingDown } from "lucide-react";

const StatsCard = ({
  title,
  value,
  change,
  positive = true,
  icon,
  chart,
}) => {
  return (
    <div
      className="
      bg-[#111113]
      border
      border-white/10
      rounded-2xl
      p-2
      flex
      justify-between
      items-start
      hover:border-indigo-500/40
      transition-all
      duration-300"
    >
      {/* Left Content */}
      <div>
        <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wide">
          {icon}
          <span>{title}</span>
        </div>

        <h2 className="mt-5 text-2xl font-bold text-white px-2">
          {value}
        </h2>

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

      {/* Right Mini Chart */}
      <div className="w-20 h-16 flex items-center justify-center">
        {chart}
      </div>
    </div>
  );
};

export default StatsCard;