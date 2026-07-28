import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "2xx Success", value: 72 },
  { name: "4xx Client", value: 18 },
  { name: "5xx Server", value: 10 },
];

const COLORS = ["#22C55E", "#F59E0B", "#EF4444"];

const StatusDistribution = () => {
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
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                background: "#18181B",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: "12px",
              }}
            />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default StatusDistribution;