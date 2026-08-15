import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

const TopApisChart = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="rounded-2xl border border-white/10 bg-[#111113] p-6 flex items-center justify-center h-[250px]">
                <p className="text-gray-500">
                    No API traffic available.
                </p>
            </div>
        );
    }
    return (
        <div className="rounded-2xl border border-white/10 bg-[#111113] p-4">

            <h2 className="text-xl font-semibold text-white">
                Top APIs by Traffic
            </h2>

            <p className="mt-1 text-sm text-gray-400">
                Highest requested endpoints.
            </p>

            <div className="h-[50px] mt-6">

                <ResponsiveContainer width="100%" height="100%">

                    <BarChart
                        layout="vertical"
                        data={data}
                        margin={{
                            left: 30,
                            right: 10,
                            top: 0,
                            bottom: 0,
                        }}
                    >

                        <XAxis
                            type="number"
                            hide
                        />

                        <YAxis
                            dataKey="api"
                            type="category"
                            width={100}
                            tick={{
                                fill: "#A1A1AA",
                                fontSize: 13,
                            }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            cursor={false}
                            contentStyle={{
                                background: "#18181B",
                                border: "1px solid rgba(255,255,255,.08)",
                                borderRadius: "12px",
                            }}
                        />

                        <Bar
                            dataKey="requests"
                            fill="#6366F1"
                            radius={[5, 8, 8, 8]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
};

export default TopApisChart;