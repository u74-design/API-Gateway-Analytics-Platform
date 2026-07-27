import { Zap } from "lucide-react";

const AuthHero = () => {
  return (
    <div className="hidden lg:flex flex-col justify-between bg-[#09090B] border-r border-white/10 p-10">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
            <Zap className="text-indigo-500 w-5 h-5" />
          </div>

          <div>
            <h1 className="text-white font-semibold text-lg">
              Gateway
            </h1>

            <p className="text-gray-500 text-xs">
              api.console
            </p>
          </div>
        </div>

        {/* Heading */}

        <div className="mt-20 max-w-xl">
          <h1 className="text-[52px] font-bold leading-tight text-white">
            Ship faster with a
            <span className="text-indigo-500">
              {" "}
              production-grade API Gateway.
            </span>
          </h1>

          <p className="text-gray-400 mt-8 leading-7 text-base">
            Register APIs, generate secure proxy URLs,
            monitor latency, cache performance and
            rate limits from one centralized dashboard.
          </p>

          <ul className="mt-10 space-y-3 text-gray-300">
            <li>• Auto-generated Proxy URLs</li>
            <li>• Per API Rate Limits & Caching</li>
            <li>• Real-time Analytics Dashboard</li>
            <li>• JWT Authentication</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuthHero;