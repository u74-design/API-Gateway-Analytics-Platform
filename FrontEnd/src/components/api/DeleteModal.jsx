import { useState } from "react";
import { Trash2 } from "lucide-react";
import { DeleteApi } from "../services/api";

const DeleteModal = ({
  open,
  api,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);

  if (!open || !api) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);

      await DeleteApi(api._id);

      onSuccess();

      onClose();

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111113] p-7">

        {/* Icon */}

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/15">

          <Trash2
            className="text-red-500"
            size={30}
          />

        </div>

        {/* Title */}

        <h2 className="mt-6 text-center text-2xl font-semibold text-white">
          Delete API
        </h2>

        {/* Description */}

        <p className="mt-3 text-center text-gray-400">

          Are you sure you want to delete

          <span className="font-semibold text-white">
            {" "}
            {api.name}
          </span>

          ?

        </p>

        <p className="mt-2 text-center text-sm text-red-400">
          This action cannot be undone.
        </p>

        {/* Buttons */}

        <div className="mt-8 flex gap-4">

          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-white/10 py-3 text-gray-300 hover:bg-white/5"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleDelete}
            className="flex-1 rounded-xl bg-red-600 py-3 font-medium text-white hover:bg-red-500 disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteModal;