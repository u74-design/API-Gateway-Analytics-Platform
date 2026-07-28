import DashboardHeader from "../dashboard/DashboardHeader"
import RecentActivityTable from "../dashboard/RecentActivityTable";
import RequestsChart from "../dashboard/RequestsChart";
import StatsGrid from "../dashboard/StatsGrid"
import StatusDistribution from "../dashboard/StatusDistribution";
import TopApisChart from "../dashboard/TopApisChart";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/SideBar";

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-[#09090B] text-white">

            <Sidebar />

            <main className="ml-72">

                <Navbar/>

                <div className="p-6">

                    <DashboardHeader />

                    <StatsGrid />

                    <RequestsChart />

                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <StatusDistribution />
                        <TopApisChart />
                    </div>

                    <RecentActivityTable />

                </div>

            </main>

        </div>
    );
};

export default Dashboard;