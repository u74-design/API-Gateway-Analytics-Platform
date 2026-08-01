import { useState } from "react";
import { X } from "lucide-react";
import { CreateApi } from "../services/api";

const initialState = {
  name: "",
  targetUrl: "",
  rateLimit: 100,
  window: 60,
  cacheEnabled: true,
  cacheTTL: 300,
};

const ApiModal = ({
  open,
  onClose,
  onSuccess,
}) => {
  const [form, setForm] = useState(initialState);

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await CreateApi(form);

      setForm(initialState);

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

      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#111113] p-7">

        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-2xl font-semibold text-white">
            Register a new API
          </h2>

          <button onClick={onClose}>
            <X className="text-gray-400" />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Name */}

          <div>

            <label className="mb-2 block text-sm text-gray-300">
              Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-[#09090B] p-3 outline-none focus:border-indigo-500"
            />

          </div>

          {/* URL */}

          <div>

            <label className="mb-2 block text-sm text-gray-300">
              Target Base URL
            </label>

            <input
              name="targetUrl"
              value={form.targetUrl}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-[#09090B] p-3 outline-none focus:border-indigo-500"
            />

          </div>

          {/* Rate Limit */}

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="mb-2 block text-sm text-gray-300">
                Rate Limit
              </label>

              <input
                type="number"
                name="rateLimit"
                value={form.rateLimit}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-[#09090B] p-3"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm text-gray-300">
                Window (sec)
              </label>

              <input
                type="number"
                name="window"
                value={form.window}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-[#09090B] p-3"
              />

            </div>

          </div>

          {/* Cache */}

          <div className="flex items-center justify-between rounded-xl border border-white/10 p-4">

            <div>

              <h3 className="font-medium text-white">
                Enable Caching
              </h3>

              <p className="text-sm text-gray-400">
                Cache GET requests
              </p>

            </div>

            <input
              type="checkbox"
              name="cacheEnabled"
              checked={form.cacheEnabled}
              onChange={handleChange}
            />

          </div>

          {/* TTL */}

          <div>

            <label className="mb-2 block text-sm text-gray-300">
              Cache TTL (sec)
            </label>

            <input
              type="number"
              name="cacheTTL"
              value={form.cacheTTL}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-[#09090B] p-3"
            />

          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 pt-3">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-5 py-3 text-gray-300 hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="rounded-xl bg-indigo-600 px-6 py-3 font-medium hover:bg-indigo-500 disabled:opacity-50"
            >
              {loading
                ? "Registering..."
                : "Register API"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default ApiModal;