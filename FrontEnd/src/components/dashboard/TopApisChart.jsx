import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

const data = [
    {
        api: "Users",
        requests: 980,
    },
    {
        api: "Orders",
        requests: 720,
    },
    {
        api: "Payments",
        requests: 510,
    },
    {
        api: "Products",
        requests: 390,
    },
];

const TopApisChart = () => {
    return (
        <div className="rounded-2xl border border-white/10 bg-[#111113] p-4">

            <h2 className="text-xl font-semibold text-white">
                Top APIs by Traffic
            </h2>

            <p className="mt-1 text-sm text-gray-400">
                Highest requested endpoints.
            </p>

            <div className="h-[250px] mt-6">

                <ResponsiveContainer width="100%" height="100%">

                    <BarChart
                        layout="vertical"
                        data={data}
                    >

                        <XAxis
                            type="number"
                            hide
                        />

                        <YAxis
                            dataKey="api"
                            type="category"
                            width={100}
                            tickMargin={8}
                            tick={{
                                fill: "#A1A1AA",
                                fontSize: 14,
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
                            radius={[8, 8, 8, 8]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
};

export default TopApisChart;