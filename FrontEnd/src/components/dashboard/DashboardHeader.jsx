const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-400">
          Live traffic across all your registered APIs.
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center rounded-xl border border-white/10 bg-[#121216] p-1">
        <button className="px-5 py-2 rounded-lg text-gray-400 hover:text-white transition">
          24h
        </button>

        <button className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-medium">
          7d
        </button>

        <button className="px-5 py-2 rounded-lg text-gray-400 hover:text-white transition">
          30d
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;