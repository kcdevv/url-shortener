"use client";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Home() {
  const [link, setLink] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortenUrl, setShortenUrl] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("normal");

  const generateUrl = async () => {
    if (!link.trim()) return;

    setLoading(true);
    setError(null);
    
    try {
      const payload: { url: string; alias?: string } = { url: link };
      if (activeTab === "custom" && customAlias.trim()) {
        payload.alias = customAlias;
      }
      const shorten = await axios.post("/api/generate", payload);
      const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
      setShortenUrl(`${baseUrl}/${shorten.data.id}`);
    } catch { 
      setError("Failed to generate short URL. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (shortenUrl) {
      await navigator.clipboard.writeText(shortenUrl);
      toast.success("Copied to clipboard!", {
        position: "top-right",
        duration: 3000,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <header className="text-center py-6 text-3xl font-bold text-orange-600">
        URL Shortener 🔗
      </header>
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-lg p-8 bg-white rounded-3xl shadow-xl border border-gray-200">
          <div className="flex justify-center space-x-4 mb-6">
            <button 
              className={`px-4 py-2 font-medium rounded-lg transition ${activeTab === "normal" ? "bg-orange-500 text-white" : "bg-gray-200"}`}
              onClick={() => setActiveTab("normal")}
            >
              Normal
            </button>
            <button 
              className={`px-4 py-2 font-medium rounded-lg transition ${activeTab === "custom" ? "bg-orange-500 text-white" : "bg-gray-200"}`}
              onClick={() => setActiveTab("custom")}
            >
              Custom
            </button>
          </div>

          <h2 className="text-2xl font-semibold text-center mb-4">
            {activeTab === "normal" ? "Shorten your long URLs" : "Create a Custom Short URL"}
          </h2>

          <div className="flex flex-col space-y-3">
            <input
              onChange={(e) => setLink(e.target.value)}
              value={link}
              type="text"
              placeholder="Enter your URL..."
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {activeTab === "custom" && (
              <input
                onChange={(e) => setCustomAlias(e.target.value)}
                value={customAlias}
                type="text"
                placeholder="Enter custom alias (optional)"
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            )}
            <button
              className="px-5 py-3 bg-orange-500 text-white font-medium rounded-lg shadow-md hover:bg-orange-600 transition disabled:opacity-50"
              onClick={generateUrl}
              disabled={loading}
            >
              {loading ? "..." : "Shorten"}
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {shortenUrl && (
            <div className="mt-4 p-3 bg-gray-100 rounded-lg flex justify-between items-center">
              <a
                href={shortenUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 font-medium truncate max-w-[80%]"
              >
                {shortenUrl}
              </a>
              <button
                className="ml-2 px-3 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
                onClick={copyToClipboard}
              >
                Copy
              </button>
            </div>
          )}
        </div>
      </div>

      <footer className="text-center py-6 text-gray-600">
        Made with ❤️ by <span className="font-semibold text-orange-600">Krishna Chaitanya</span>
      </footer>
    </div>
  );
}