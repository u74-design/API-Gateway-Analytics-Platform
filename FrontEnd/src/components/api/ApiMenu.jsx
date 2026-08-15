import { useEffect, useRef, useState } from "react";
import {
  MoreHorizontal,
  Eye,
  RefreshCw,
  Trash2,
} from "lucide-react";

const ApiMenu = ({
  api,
  onView,
  onDelete,
}) => {
  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div
      ref={menuRef}
      className="relative inline-block"
    >
      {/* Button */}

      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg p-2 hover:bg-white/5 transition"
      >
        <MoreHorizontal
          size={18}
          className="text-gray-400"
        />
      </button>

      {/* Dropdown */}

      {open && (
        <div className="absolute right-0 bottom-full z-50 mb-2 w-52 overflow-hidden rounded-xl border border-white/10 bg-[#111113] shadow-2xl">

          <button
            onClick={() => {
              setOpen(false);
              onView(api);
            }}
            className="flex w-full items-center gap-3 px-4 py-3 text-white hover:bg-white/5 transition"
          >
            <Eye size={18} />
            View Details
          </button>

          <button
            onClick={() => {
              setOpen(false);
              onDelete(api);
            }}
            className="flex w-full items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 transition"
          >
            <Trash2 size={18} />
            Delete
          </button>

        </div>
      )}
    </div>
  );
};

export default ApiMenu;