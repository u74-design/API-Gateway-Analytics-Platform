import StatsCard from "./StatsCard";

import {
  Activity,
  Database,
  ShieldAlert,
  Gauge,
} from "lucide-react";


const StatsGrid = () => {
  return (
    <div className="grid grid-cols-4 gap-6 mt-8">

      <StatsCard
        title="Total Requests"
        value="1.8K"
        change="20.4%"
        positive={true}
        icon={<Activity size={16} />}
        chart={<div className="w-full h-full bg-indigo-500/10 rounded-lg" />}
      />

      <StatsCard
        title="Cache Hit Rate"
        value="27.9%"
        change="13.9%"
        positive={true}
        icon={<Database size={16} />}
        chart={<div className="w-full h-full bg-indigo-500/10 rounded-lg" />}
      />

      <StatsCard
        title="Blocked Requests"
        value="70"
        change="42.9%"
        positive={false}
        icon={<ShieldAlert size={16} />}
        chart={<div className="w-full h-full bg-indigo-500/10 rounded-lg" />}
      />

      <StatsCard
        title="Avg Latency"
        value="98ms"
        change="2.8%"
        positive={false}
        icon={<Gauge size={16} />}
        chart={<div className="w-full h-full bg-indigo-500/10 rounded-lg" />}
      />

    </div>
  );
};

export default StatsGrid;