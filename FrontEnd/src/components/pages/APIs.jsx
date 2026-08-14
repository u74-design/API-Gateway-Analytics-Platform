import { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import ApiTable from "../api/ApiTable";
import ApiModal from "../api/ApiModal";
import DeleteModal from "../api/DeleteModal";
import { GetMyApis } from "../services/api";
import ViewApiModal from "../api/ViewApiModel";
const ApiDashboard = () => {
    const [apis, setApis] = useState([]);

    const [loading, setLoading] = useState(true);

    const [createOpen, setCreateOpen] = useState(false);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const [selectedApi, setSelectedApi] = useState(null);

    const [viewOpen, setViewOpen] = useState(false);

    const fetchApis = async () => {
        try {
            setLoading(true);

            const data = await GetMyApis();

            setApis(data.apis);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApis();
    }, []);
    return (
        <div className="min-h-screen bg-[#09090B] text-white">

            <Sidebar />

            <main className="ml-72">

                <Navbar />

                <div className="p-6">

                    <div className="flex items-center justify-between mb-8">

                        <div>

                            <h1 className="text-4xl font-bold">
                                My APIs
                            </h1>

                            <p className="text-gray-400 mt-2">
                                Manage your registered APIs.
                            </p>

                        </div>

                        <button
                            onClick={() => setCreateOpen(true)}
                            className="rounded-xl bg-indigo-600 px-5 py-3 font-medium hover:bg-indigo-500"
                        >
                            Register API
                        </button>

                    </div>

                    {
                        loading ?

                            <p className="text-gray-400">
                                Loading...
                            </p>

                            :

                            <ApiTable
                                apis={apis}

                                onView={(api) => {
                                    setSelectedApi(api);
                                    setViewOpen(true);
                                }}

                                onDelete={(api) => {
                                    setSelectedApi(api);
                                    setDeleteOpen(true);
                                }}

                                onRegenerate={(api) => {
                                    console.log("Regenerate:", api);
                                }}
                            />
                    }

                </div>

            </main>

            <ApiModal
                open={createOpen}
                onClose={() => setCreateOpen(false)}
                onSuccess={fetchApis}
            />

            <ViewApiModal
                open={viewOpen}
                api={selectedApi}
                onClose={() => setViewOpen(false)}
            />

            <DeleteModal
                open={deleteOpen}
                api={selectedApi}
                onClose={() => setDeleteOpen(false)}
                onSuccess={fetchApis}
            />

        </div>
    );
}


export default ApiDashboard;