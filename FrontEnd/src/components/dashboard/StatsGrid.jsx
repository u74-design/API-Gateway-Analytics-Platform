import StatsCard from "./StatsCard";

import {
  Activity,
  Database,
  ShieldAlert,
  Gauge,
} from "lucide-react";

const StatsGrid = ({ stats }) => {

  if (!stats) return null;

  return (
    <div className="grid grid-cols-4 gap-6 mt-8">

      <StatsCard
        title="Total Requests"
        value={stats.totalRequests.toLocaleString()}
        change="+0%"
        positive={true}
        icon={<Activity size={16} />}
        chart={<div className="w-full h-full bg-indigo-500/10 rounded-lg" />}
      />

      <StatsCard
        title="Cache Hit Rate"
        value={`${stats.cacheHitRatio.toFixed(1)}%`}
        change="+0%"
        positive={true}
        icon={<Database size={16} />}
        chart={<div className="w-full h-full bg-indigo-500/10 rounded-lg" />}
      />

      <StatsCard
        title="Blocked Requests"
        value={stats.blockedRequests.toLocaleString()}
        change="+0%"
        positive={false}
        icon={<ShieldAlert size={16} />}
        chart={<div className="w-full h-full bg-indigo-500/10 rounded-lg" />}
      />

      <StatsCard
        title="Avg Latency"
        value={`${stats.averageLatency.toFixed(1)} ms`}
        change="+0%"
        positive={false}
        icon={<Gauge size={16} />}
        chart={<div className="w-full h-full bg-indigo-500/10 rounded-lg" />}
      />

    </div>
  );
};

export default StatsGrid;