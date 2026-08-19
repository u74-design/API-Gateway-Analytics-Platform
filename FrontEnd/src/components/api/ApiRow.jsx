import ApiMenu from "./ApiMenu";

const ApiRow = ({
  api,
  onView,
  onDelete,
}) => {
  return (
    <tr className="border-b border-white/5 hover:bg-[#17171B] transition-colors">

      {/* Name */}

      <td className="px-6 py-5">

        <div className="font-semibold text-white">
          {api.name}
        </div>


        <p className="mt-1 text-sm text-gray-500">
          {api.targetUrl}
        </p>

      </td>

      {/* Proxy URL */}

      <td className="px-6 py-5">

        <code className="text-sm text-gray-400">
          {api.proxyUrl}
        </code>

      </td>

      {/* Status */}

      <td className="px-6 py-5">

        <span
          className={`rounded-full whitespace-nowrap px-5 py-1 text-xs font-semibold ${api.status === "Active"
            ? "bg-green-500/15 text-green-400 border border-green-500/20"
            : api.status === "Rate Limited"
              ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20"
              : "bg-red-500/15 text-red-400 border border-red-500/20"
            }`}
        >
          {api.status}
        </span>

      </td>

      {/* Requests */}

      <td className="px-6 py-5 text-white font-medium">
        {api.requests}
      </td>

      {/* Avg Latency */}

      <td className="px-6 py-5 text-white">
        {api.avgLatency} ms
      </td>

      {/* Menu */}

      <td className="px-6 py-5 text-right">

        <ApiMenu
          api={api}
          onView={onView}
          onDelete={onDelete}
        />

      </td>

    </tr>
  );
};

export default ApiRow;
