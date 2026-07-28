import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Jul 21", requests: 300 },
  { day: "Jul 22", requests: 305 },
  { day: "Jul 23", requests: 280 },
  { day: "Jul 24", requests: 275 },
  { day: "Jul 25", requests: 278 },
  { day: "Jul 26", requests: 270 },
  { day: "Jul 27", requests: 40 },
];

const RequestsChart = () => {
  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-[#111113] p-6">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Requests Over Time
          </h2>
        </div>

        <span className="rounded-lg bg-indigo-600/20 px-2 py-2 text-sm font-medium text-indigo-400">
          Last 7 Days
        </span>
      </div>

      {/* Chart */}

      <div className="h-[250px]">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={data}>

            <defs>
              <linearGradient
                id="requestsGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#6366F1"
                  stopOpacity={0.45}
                />

                <stop
                  offset="95%"
                  stopColor="#6366F1"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#27272A"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              tick={{ fill: "#A1A1AA", fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#A1A1AA", fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#18181B",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Area
              type="monotone"
              dataKey="requests"
              stroke="#6366F1"
              strokeWidth={3}
              fill="url(#requestsGradient)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default RequestsChart;