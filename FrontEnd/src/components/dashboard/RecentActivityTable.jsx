// const activities = [
//   {
//     api: "Users API",
//     method: "GET",
//     status: 200,
//     latency: "52ms",
//     cache: "HIT",
//     time: "2 min ago",
//   },
//   {
//     api: "Orders API",
//     method: "POST",
//     status: 201,
//     latency: "84ms",
//     cache: "MISS",
//     time: "5 min ago",
//   },
//   {
//     api: "Payments API",
//     method: "POST",
//     status: 500,
//     latency: "182ms",
//     cache: "MISS",
//     time: "8 min ago",
//   },
//   {
//     api: "Products API",
//     method: "GET",
//     status: 304,
//     latency: "41ms",
//     cache: "HIT",
//     time: "12 min ago",
//   },
// ];

const getStatusColor = (status) => {
  if (status >= 200 && status < 300)
    return "bg-green-500/15 text-green-400 border border-green-500/20";

  if (status >= 300 && status < 400)
    return "bg-blue-500/15 text-blue-400 border border-blue-500/20";

  if (status >= 400 && status < 500)
    return "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20";

  return "bg-red-500/15 text-red-400 border border-red-500/20";
};

const getMethodColor = (method) => {
  switch (method) {
    case "GET":
      return "bg-blue-500/15 text-blue-400";

    case "POST":
      return "bg-green-500/15 text-green-400";

    case "PUT":
      return "bg-yellow-500/15 text-yellow-400";

    case "DELETE":
      return "bg-red-500/15 text-red-400";

    default:
      return "bg-gray-700 text-gray-300";
  }
};

const RecentActivityTable = ({activities=[]}) => {

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#111113]">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-white/10 px-7 py-6">

        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Latest 12 gateway requests
          </p>
        </div>

        <button className="text-sm font-medium text-indigo-400 transition hover:text-indigo-300">
          View All
        </button>

      </div>

      {/* Table */}

      <table className="w-full">

        <thead className="border-b border-white/10 bg-[#111113] text-xs uppercase tracking-wider text-gray-500">

          <tr>

            <th className="px-6 py-4 text-left">API</th>

            <th className="px-6 py-4 text-left">Method</th>

            <th className="px-6 py-4 text-left">Status</th>

            <th className="px-6 py-4 text-left">Latency</th>

            <th className="px-6 py-4 text-left">Cache</th>

            <th className="px-6 py-4 text-left">Time</th>

          </tr>

        </thead>

        <tbody>

          {activities.map((item, index) => (

            <tr
              key={index}
              className="border-b border-white/5 transition-colors hover:bg-[#17171B]"
            >

              {/* API */}

              <td className="px-6 py-4 font-semibold text-white">
                {item.api}
              </td>

              {/* Method */}

              <td className="px-6 py-4">

                <span
                  className={"rounded-full px-3 py-1 text-xs font-semibold font-mono"}
                >
                  {item.method}
                </span>

              </td>

              {/* Status */}

              <td className="px-6 py-4">

                <span
                  className={`rounded-full px-4 py-1 text-xs font-semibold font-mono ${getStatusColor(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>

              </td>

              {/* Latency */}

              <td className="px-6 py-4 font-medium   text-white text-xs">
                {item.latency}
              </td>

              {/* Cache */}

              <td className="px-6 py-4">

                <span
                  className={"rounded-full px-3 py-1 text-xs font-semibold"}
                >
                  {item.cache}
                </span>

              </td>

              {/* Time */}

              <td className="px-6 py-4 font-mono text-gray-500">
                {item.time}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default RecentActivityTable;