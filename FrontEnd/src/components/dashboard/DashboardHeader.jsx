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
    </div>
  );
};

export default DashboardHeader;