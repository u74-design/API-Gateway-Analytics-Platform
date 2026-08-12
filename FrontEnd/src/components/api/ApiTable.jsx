import ApiRow from "./ApiRow";

const ApiTable = ({
  apis,
  onView,
  onDelete,
}) => {
  if (!apis || apis.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#111113] p-10 text-center">
        <p className="text-gray-400">
          No APIs registered yet.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111113]">
      <table className="w-full">

        <thead className="border-b border-white/10 text-sm text-gray-500">

          <tr>

            <th className="px-6 py-4 text-left">
              Name
            </th>

            <th className="px-6 py-4 text-left">
              Proxy URL
            </th>

            <th className="px-6 py-4 text-left">
              Status
            </th>

            <th className="px-6 py-4 text-left">
              Requests
            </th>

            <th className="px-6 py-4 text-left">
              Avg Latency
            </th>

            <th className="px-6 py-4"></th>

          </tr>

        </thead>

        <tbody>

          {apis?.map((api) => (
            <ApiRow
              key={api._id}
              api={api}
              onView={onView}
              onDelete={onDelete}
            />
          ))}

        </tbody>

      </table>
    </div>
  );
};

export default ApiTable;