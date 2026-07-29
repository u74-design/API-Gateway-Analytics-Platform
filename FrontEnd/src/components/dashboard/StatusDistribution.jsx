import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";



const COLORS = ["#22C55E", "#F59E0B", "#EF4444"];

const StatusDistribution = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#111113] p-6 flex items-center justify-center h-[300px]">
        <p className="text-gray-500">
          No status data available.
        </p>
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111113] p-6">

      <h2 className="text-xl font-semibold text-white">
        Status Code Distribution
      </h2>

      <p className="mt-1 text-sm text-gray-400">
        Breakdown of API responses.
      </p>

      <div className="h-[300px] mt-6">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              cursor={false}
              formatter={(value) => [`${value} Requests`, "Count"]}
              contentStyle={{
                background: "#18181B",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default StatusDistribution;