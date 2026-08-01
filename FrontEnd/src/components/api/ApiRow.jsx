import ApiMenu from "./ApiMenu";

const ApiRow = ({
  api,
  onView,
  onDelete,
  onRegenerate,
}) => {
  return (
    <tr className="border-b border-white/5 hover:bg-[#17171B] transition-colors">

      {/* Name */}

      <td className="px-6 py-5">

        <div className="font-semibold text-white">
          {api.name}
        </div>

        <p className="mt-1 text-sm text-gray-500 truncate max-w-[250px]">
          {api.originalUrl}
        </p>

      </td>

      {/* Proxy URL */}

      <td className="px-6 py-5">

        <code className="text-xs text-indigo-400">
          /proxy/{api.proxyId}
        </code>

      </td>

      {/* Status */}

      <td className="px-6 py-5">

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${api.status === "active"
              ? "bg-green-500/15 text-green-400 border border-green-500/20"
              : "bg-red-500/15 text-red-400 border border-red-500/20"
            }`}
        >
          Active
        </span>

      </td>

      {/* Requests */}

      <td className="px-6 py-5 text-white font-medium">
        —
      </td>

      {/* Avg Latency */}

      <td className="px-6 py-5 text-white">
        - {api.avgLatency}ms
      </td>

      {/* Menu */}

      <td className="px-6 py-5 text-right">

        <ApiMenu
          api={api}
          onView={onView}
          onDelete={onDelete}
          onRegenerate={onRegenerate}
        />

      </td>

    </tr>
  );
};

export default ApiRow;