import { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";

import {
    GetDashboardStats,
    GetRequestsOverTime,
    GetStatusDistribution,
    GetTopApis,
    GetRecentActivity,
} from "../services/api";

const Analytics = () => {
    const [stats, setStats] = useState(null);
    const [requestsOverTime, setRequestsOverTime] = useState([]);
    const [statusDistribution, setStatusDistribution] = useState([]);
    const [topApis, setTopApis] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);

            const [
                statsData,
                requestsData,
                statusData,
                topApisData,
                activityData,
            ] = await Promise.all([
                GetDashboardStats(),
                GetRequestsOverTime(),
                GetStatusDistribution(),
                GetTopApis(),
                GetRecentActivity(),
            ]);

            console.log("Stats:", statsData);
            console.log("Requests:", requestsData);
            console.log("Status:", statusData);
            console.log("Top APIs:", topApisData);
            console.log("Recent Activity:", activityData);

            setStats(statsData?.stats || null);

            setRequestsOverTime(
                requestsData?.requests || []
            );

            setStatusDistribution(
                statusData?.statusDistribution || []
            );

            setTopApis(
                topApisData?.topApis || []
            );

            setRecentActivity(
                activityData?.activities || []
            );

        } catch (error) {
            console.error(
                "Error fetching analytics:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalytics();
    }, []);

    // Calculate success rate
    const successRate =
        stats?.totalRequests > 0
            ? Math.round(
                  ((stats.totalRequests - stats.blockedRequests) /
                      stats.totalRequests) *
                      100
              )
            : 0;

    return (
        <div className="min-h-screen bg-[#09090B] text-white">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="ml-72">

                {/* Navbar */}
                <Navbar />

                <div className="p-6">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold">
                            Analytics
                        </h1>

                        <p className="mt-2 text-gray-400">
                            Monitor your API performance and traffic.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <p className="text-gray-400">
                                Loading analytics...
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* ========================= */}
                            {/* OVERVIEW CARDS */}
                            {/* ========================= */}

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

                                {/* Total Requests */}
                                <div className="rounded-2xl border border-white/10 bg-[#111113] p-6">

                                    <p className="text-sm text-gray-400">
                                        Total Requests
                                    </p>

                                    <p className="mt-3 text-3xl font-bold">
                                        {stats?.totalRequests || 0}
                                    </p>

                                    <p className="mt-2 text-sm text-gray-500">
                                        All API requests
                                    </p>

                                </div>

                                {/* Average Latency */}
                                <div className="rounded-2xl border border-white/10 bg-[#111113] p-6">

                                    <p className="text-sm text-gray-400">
                                        Average Latency
                                    </p>

                                    <p className="mt-3 text-3xl font-bold">
                                        {Math.round(
                                            stats?.averageLatency || 0
                                        )}

                                        <span className="ml-1 text-base font-medium text-gray-400">
                                            ms
                                        </span>
                                    </p>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Average response time
                                    </p>

                                </div>

                                {/* Success Rate */}
                                <div className="rounded-2xl border border-white/10 bg-[#111113] p-6">

                                    <p className="text-sm text-gray-400">
                                        Success Rate
                                    </p>

                                    <p className="mt-3 text-3xl font-bold">
                                        {successRate}

                                        <span className="ml-1 text-base font-medium text-gray-400">
                                            %
                                        </span>
                                    </p>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Successful requests
                                    </p>

                                </div>

                                {/* Cache Hit Ratio */}
                                <div className="rounded-2xl border border-white/10 bg-[#111113] p-6">

                                    <p className="text-sm text-gray-400">
                                        Cache Hit Ratio
                                    </p>

                                    <p className="mt-3 text-3xl font-bold">
                                        {Math.round(
                                            stats?.cacheHitRatio || 0
                                        )}

                                        <span className="ml-1 text-base font-medium text-gray-400">
                                            %
                                        </span>
                                    </p>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Requests served from cache
                                    </p>

                                </div>

                            </div>


                            {/* ========================= */}
                            {/* SECONDARY STATS */}
                            {/* ========================= */}

                            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">

                                {/* Total APIs */}
                                <div className="rounded-2xl border border-white/10 bg-[#111113] p-5">

                                    <p className="text-sm text-gray-400">
                                        Total APIs
                                    </p>

                                    <p className="mt-2 text-2xl font-bold">
                                        {stats?.totalApis || 0}
                                    </p>

                                </div>

                                {/* Cache Hits */}
                                <div className="rounded-2xl border border-white/10 bg-[#111113] p-5">

                                    <p className="text-sm text-gray-400">
                                        Cache Hits
                                    </p>

                                    <p className="mt-2 text-2xl font-bold">
                                        {stats?.cacheHits || 0}
                                    </p>

                                </div>

                                {/* Rate Limit Blocks */}
                                <div className="rounded-2xl border border-white/10 bg-[#111113] p-5">

                                    <p className="text-sm text-gray-400">
                                        Rate Limit Blocks
                                    </p>

                                    <p className="mt-2 text-2xl font-bold">
                                        {stats?.rateLimitBlocks || 0}
                                    </p>

                                </div>

                            </div>


                            {/* ========================= */}
                            {/* REQUESTS OVER TIME */}
                            {/* ========================= */}

                            <div className="mt-6 rounded-2xl border border-white/10 bg-[#111113] p-6">

                                <div className="mb-6">
                                    <h2 className="text-lg font-semibold">
                                        Requests Over Time
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Number of API requests by date
                                    </p>
                                </div>

                                {requestsOverTime.length === 0 ? (
                                    <div className="py-10 text-center text-gray-500">
                                        No request data available
                                    </div>
                                ) : (
                                    <div className="space-y-4">

                                        {requestsOverTime.map(
                                            (item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-4"
                                                >

                                                    <div className="w-28 text-sm text-gray-400">
                                                        {item.date}
                                                    </div>

                                                    <div className="flex-1">

                                                        <div className="h-3 overflow-hidden rounded-full bg-white/5">

                                                            <div
                                                                className="h-full rounded-full bg-indigo-500"
                                                                style={{
                                                                    width: `${Math.min(
                                                                        (item.requests /
                                                                            Math.max(
                                                                                ...requestsOverTime.map(
                                                                                    (x) =>
                                                                                        x.requests
                                                                                )
                                                                            )) *
                                                                            100,
                                                                        100
                                                                    )}%`,
                                                                }}
                                                            />

                                                        </div>

                                                    </div>

                                                    <div className="w-12 text-right text-sm font-medium text-white">
                                                        {item.requests}
                                                    </div>

                                                </div>
                                            )
                                        )}

                                    </div>
                                )}

                            </div>


                            {/* ========================= */}
                            {/* STATUS + TOP APIs */}
                            {/* ========================= */}

                            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

                                {/* Status Distribution */}
                                <div className="rounded-2xl border border-white/10 bg-[#111113] p-6">

                                    <h2 className="text-lg font-semibold">
                                        Status Distribution
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Distribution of API response statuses
                                    </p>

                                    <div className="mt-6 space-y-5">

                                        {statusDistribution.map(
                                            (item, index) => {

                                                const total =
                                                    statusDistribution.reduce(
                                                        (sum, current) =>
                                                            sum +
                                                            current.value,
                                                        0
                                                    );

                                                const percentage =
                                                    total > 0
                                                        ? Math.round(
                                                              (item.value /
                                                                  total) *
                                                                  100
                                                          )
                                                        : 0;

                                                return (
                                                    <div key={index}>

                                                        <div className="mb-2 flex items-center justify-between">

                                                            <span className="text-sm text-gray-300">
                                                                {item.name}
                                                            </span>

                                                            <span className="text-sm font-medium">
                                                                {item.value}
                                                            </span>

                                                        </div>

                                                        <div className="h-2 overflow-hidden rounded-full bg-white/5">

                                                            <div
                                                                className="h-full rounded-full bg-indigo-500"
                                                                style={{
                                                                    width: `${percentage}%`,
                                                                }}
                                                            />

                                                        </div>

                                                    </div>
                                                );
                                            }
                                        )}

                                    </div>

                                </div>


                                {/* Top APIs */}
                                <div className="rounded-2xl border border-white/10 bg-[#111113] p-6">

                                    <h2 className="text-lg font-semibold">
                                        Top APIs
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        APIs with the highest traffic
                                    </p>

                                    <div className="mt-6 space-y-4">

                                        {topApis.length === 0 ? (
                                            <p className="py-8 text-center text-gray-500">
                                                No API traffic available
                                            </p>
                                        ) : (
                                            topApis.map(
                                                (item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4"
                                                    >

                                                        <div className="flex items-center gap-4">

                                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-sm font-semibold text-indigo-400">
                                                                {index + 1}
                                                            </div>

                                                            <span className="text-sm font-medium text-white">
                                                                {item.api}
                                                            </span>

                                                        </div>

                                                        <span className="text-sm text-gray-400">
                                                            {item.requests} requests
                                                        </span>

                                                    </div>
                                                )
                                            )
                                        )}

                                    </div>

                                </div>

                            </div>


                            {/* ========================= */}
                            {/* RECENT ACTIVITY */}
                            {/* ========================= */}

                            <div className="mt-6 rounded-2xl border border-white/10 bg-[#111113] p-6">

                                <div className="mb-6">

                                    <h2 className="text-lg font-semibold">
                                        Recent Activity
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Latest API requests
                                    </p>

                                </div>

                                {recentActivity.length === 0 ? (
                                    <div className="py-10 text-center text-gray-500">
                                        No recent activity
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">

                                        <table className="w-full">

                                            <thead>

                                                <tr className="border-b border-white/10 text-left">

                                                    <th className="pb-4 text-sm font-medium text-gray-400">
                                                        API
                                                    </th>

                                                    <th className="pb-4 text-sm font-medium text-gray-400">
                                                        Method
                                                    </th>

                                                    <th className="pb-4 text-sm font-medium text-gray-400">
                                                        Status
                                                    </th>

                                                    <th className="pb-4 text-sm font-medium text-gray-400">
                                                        Latency
                                                    </th>

                                                    <th className="pb-4 text-sm font-medium text-gray-400">
                                                        Cache
                                                    </th>

                                                    <th className="pb-4 text-sm font-medium text-gray-400">
                                                        Time
                                                    </th>

                                                </tr>

                                            </thead>

                                            <tbody>

                                                {recentActivity.map(
                                                    (item, index) => {

                                                        const statusClass =
                                                            item.status >=
                                                                200 &&
                                                            item.status <
                                                                300
                                                                ? "text-green-400 bg-green-400/10"
                                                                : item.status >=
                                                                      400 &&
                                                                  item.status <
                                                                      500
                                                                ? "text-yellow-400 bg-yellow-400/10"
                                                                : "text-red-400 bg-red-400/10";

                                                        return (
                                                            <tr
                                                                key={index}
                                                                className="border-b border-white/5 last:border-0"
                                                            >

                                                                <td className="py-4 text-sm font-medium text-white">
                                                                    {item.api}
                                                                </td>

                                                                <td className="py-4 text-sm text-gray-400">
                                                                    {item.method}
                                                                </td>

                                                                <td className="py-4">

                                                                    <span
                                                                        className={`rounded-lg px-2.5 py-1 text-xs font-medium ${statusClass}`}
                                                                    >
                                                                        {item.status}
                                                                    </span>

                                                                </td>

                                                                <td className="py-4 text-sm text-gray-400">
                                                                    {item.latency}
                                                                </td>

                                                                <td className="py-4">

                                                                    <span
                                                                        className={
                                                                            item.cache ===
                                                                            "HIT"
                                                                                ? "text-green-400"
                                                                                : "text-gray-500"
                                                                        }
                                                                    >
                                                                        {item.cache}
                                                                    </span>

                                                                </td>

                                                                <td className="py-4 text-sm text-gray-500">
                                                                    {new Date(
                                                                        item.time
                                                                    ).toLocaleString()}
                                                                </td>

                                                            </tr>
                                                        );
                                                    }
                                                )}

                                            </tbody>

                                        </table>

                                    </div>
                                )}

                            </div>

                        </>
                    )}

                </div>

            </main>

        </div>
    );
};

export default Analytics;