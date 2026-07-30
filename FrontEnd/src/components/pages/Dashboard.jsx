import { useEffect, useState } from "react";
import DashboardHeader from "../dashboard/DashboardHeader"
import RecentActivityTable from "../dashboard/RecentActivityTable";
import RequestsChart from "../dashboard/RequestsChart";
import StatsGrid from "../dashboard/StatsGrid"
import StatusDistribution from "../dashboard/StatusDistribution";
import TopApisChart from "../dashboard/TopApisChart";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/SideBar";
import { GetDashboardStats, GetRequestsOverTime , GetStatusDistribution, GetTopApis, GetRecentActivity} from "../services/api";

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [requestData, setRequestData] = useState([]);
    const [statusData, setStatusData] = useState([]); 
    const [topApis, setTopApis] = useState([]);
    const [activities, setActivities] = useState([]);
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const data = await GetDashboardStats();
                setStats(data.stats);
                const chart = await GetRequestsOverTime();
                setRequestData(chart.requests);
                const status = await GetStatusDistribution();
                setStatusData(status. statusDistribution);
                const apis = await GetTopApis();
                setTopApis(apis.topApis);
                const activities = await GetRecentActivity();
                console.log(activities);
                setActivities(activities.activities);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        fetchDashboardData();
    }, [])

    return (
        <div className="min-h-screen bg-[#09090B] text-white">

            <Sidebar />

            <main className="ml-72">

                <Navbar />

                <div className="p-6">

                    <DashboardHeader />

                    {
                        loading ?
                            <p className="text-gray-400">
                                Loading...
                            </p>


                            :

                            <StatsGrid stats={stats} />
                    }

                    <RequestsChart data={requestData} />

                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <StatusDistribution  data={statusData}/>
                        <TopApisChart  data={topApis}/>
                    </div>

                    <RecentActivityTable activities={activities} />

                </div>

            </main>

        </div>
    );
};

export default Dashboard;