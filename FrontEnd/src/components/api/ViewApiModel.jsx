import { X, Copy, Eye, EyeOff, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { RegenerateApiKey } from "../services/api";

const ViewApiModal = ({ open, api, onClose }) => {
  const [showKey, setShowKey] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [currentApiKey, setCurrentApiKey] = useState("");

  // Always run hooks before conditional return
  useEffect(() => {
    if (api) {
      setCurrentApiKey(api.apiKey || "");
    } else {
      setCurrentApiKey("");
    }

    setShowKey(false);
  }, [api]);

  if (!open || !api) {
    return null;
  }


  const proxyUrl =
    api.proxyUrl || `http://localhost:5000/proxy/${api.proxyId}`;

  const copyToClipboard = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      console.log("Copied successfully");
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const handleRegenerate = async () => {
    const confirmed = window.confirm(
      "Regenerating the API key will invalidate the current key. Continue?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setRegenerating(true);

      const data = await RegenerateApiKey(api._id);

      console.log("Old API key:", api.apiKey);
      console.log("New API key:", data.apiKey);

      setCurrentApiKey(data.apiKey);
      setShowKey(true);

    } catch (err) {
      console.error("Failed to regenerate API key:", err);
    } finally {
      setRegenerating(false);
    }
  };

  const maskedApiKey = currentApiKey
    ? `${currentApiKey.slice(0, 12)}********${currentApiKey.slice(-6)}`
    : "No API key";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#111113] p-7 shadow-2xl">

        {/* Header */}
        <div className="mb-7 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              API Details
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Configuration and credentials
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-white/5"
          >
            <X size={22} className="text-gray-400" />
          </button>
        </div>

        {/* API Name */}
        <div className="mb-5">
          <p className="mb-2 text-sm text-gray-400">
            API Name
          </p>

          <div className="rounded-xl border border-white/10 bg-[#09090B] px-4 py-3 text-white">
            {api.name}
          </div>
        </div>

        {/* Target URL */}
        <div className="mb-5">
          <p className="mb-2 text-sm text-gray-400">
            Target URL
          </p>

          <div className="break-all rounded-xl border border-white/10 bg-[#09090B] px-4 py-3 font-mono text-sm text-gray-300">
            {api.targetUrl}
          </div>
        </div>

        {/* Proxy URL */}
        <div className="mb-5">
          <p className="mb-2 text-sm text-gray-400">
            Proxy URL
          </p>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#09090B] px-4 py-3">
            <code className="flex-1 break-all text-sm text-indigo-400">
              {proxyUrl}
            </code>

            <button
              onClick={() => copyToClipboard(proxyUrl)}
              className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
              title="Copy proxy URL"
            >
              <Copy size={17} />
            </button>
          </div>
        </div>

        {/* API Key */}
        <div className="mb-5">
          <p className="mb-2 text-sm text-gray-400">
            API Key
          </p>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#09090B] px-4 py-3">

            <code className="flex-1 break-all text-sm text-gray-300">
              {showKey ? currentApiKey : maskedApiKey}
            </code>

            {/* Show / Hide */}
            <button
              onClick={() => setShowKey((prev) => !prev)}
              className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
              title={showKey ? "Hide API key" : "Show API key"}
            >
              {showKey ? (
                <EyeOff size={17} />
              ) : (
                <Eye size={17} />
              )}
            </button>

            {/* Copy */}
            <button
              onClick={() => copyToClipboard(currentApiKey)}
              disabled={!currentApiKey}
              className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white disabled:opacity-40"
              title="Copy API key"
            >
              <Copy size={17} />
            </button>

            {/* Regenerate */}
            <button
              onClick={handleRegenerate}
              disabled={regenerating}
              className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              title="Regenerate API key"
            >
              <RefreshCw
                size={17}
                className={
                  regenerating ? "animate-spin" : ""
                }
              />
            </button>
          </div>
        </div>

        {/* Configuration */}
        <div className="grid grid-cols-2 gap-4">

          {/* Rate Limit */}
          <div className="rounded-xl border border-white/10 bg-[#09090B] p-4">
            <p className="text-sm text-gray-400">
              Rate Limit
            </p>

            <p className="mt-1 text-lg font-semibold text-white">
              {api.rateLimit}
            </p>
          </div>

          {/* Window */}
          <div className="rounded-xl border border-white/10 bg-[#09090B] p-4">
            <p className="text-sm text-gray-400">
              Window
            </p>

            <p className="mt-1 text-lg font-semibold text-white">
              {api.window}
            </p>
          </div>

          {/* Cache */}
          <div className="rounded-xl border border-white/10 bg-[#09090B] p-4">
            <p className="text-sm text-gray-400">
              Cache
            </p>

            <p className="mt-1 text-lg font-semibold text-white">
              {api.cacheEnabled ? "Enabled" : "Disabled"}
            </p>
          </div>

          {/* Cache TTL */}
          <div className="rounded-xl border border-white/10 bg-[#09090B] p-4">
            <p className="text-sm text-gray-400">
              Cache TTL
            </p>

            <p className="mt-1 text-lg font-semibold text-white">
              {api.cacheTTL}s
            </p>
          </div>

          {/* Status */}
          <div className="rounded-xl border border-white/10 bg-[#09090B] p-4">
            <p className="text-sm text-gray-400">
              Status
            </p>

            <p className="mt-1 text-lg font-semibold text-white">
              {api.status || "Inactive"}
            </p>
          </div>

          {/* Requests */}
          <div className="rounded-xl border border-white/10 bg-[#09090B] p-4">
            <p className="text-sm text-gray-400">
              Requests
            </p>

            <p className="mt-1 text-lg font-semibold text-white">
              {api.requests ?? 0}
            </p>
          </div>

          {/* Average Latency */}
          <div className="rounded-xl border border-white/10 bg-[#09090B] p-4">
            <p className="text-sm text-gray-400">
              Avg Latency
            </p>

            <p className="mt-1 text-lg font-semibold text-white">
              {api.avgLatency ?? 0}ms
            </p>
          </div>

          {/* Proxy ID */}
          <div className="rounded-xl border border-white/10 bg-[#09090B] p-4">
            <p className="text-sm text-gray-400">
              Proxy ID
            </p>

            <p className="mt-1 break-all font-mono text-sm text-white">
              {api.proxyId}
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-7 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-500"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default ViewApiModal;