import {
  Bell,
  Moon,
  ChevronDown,
} from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#09090B]/80 px-6 backdrop-blur-md">

      {/* Left */}

      <div>
    
        <p className="text-sm text-gray-400">
          API Gateway & Analytics Platform
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        {/* Theme */}

        <button
          className="
          rounded-xl
          border
          border-white/10
          p-2.5
          text-gray-400
          transition
          hover:border-indigo-500
          hover:text-white
          "
        >
          <Moon size={18} />
        </button>

        {/* Notifications */}

        <button
          className="
          relative
          rounded-xl
          border
          border-white/10
          p-2.5
          text-gray-400
          transition
          hover:border-indigo-500
          hover:text-white
          "
        >
          <Bell size={18} />

          <span
            className="
            absolute
            right-2
            top-2
            h-2
            w-2
            rounded-full
            bg-red-500
            "
          />
        </button>

        {/* User */}

        <button
          className="
          flex
          items-center
          gap-3
          rounded-xl
          border
          border-white/10
          px-3
          py-2
          hover:border-indigo-500
          transition
          "
        >
          <div
            className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-indigo-600
            font-semibold
            "
          >
            U
          </div>

          <div className="text-left">

            <h2 className="text-sm font-medium text-white">
              Udiv
            </h2>

            <p className="text-xs text-gray-400">
              Developer
            </p>

          </div>

          <ChevronDown
            size={16}
            className="text-gray-500"
          />

        </button>

      </div>

    </header>
  );
};

export default Navbar;