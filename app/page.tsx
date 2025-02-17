"use client";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [link, setLink] = useState("");
  const [shortenUrl, setShortenUrl] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateUrl = async () => {
    if (!link.trim()) return;

    setLoading(true);
    setError(null);
    
    try {
      const shorten = await axios.post("/api/generate", { url: link });
      const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

      setShortenUrl(`${baseUrl}/${shorten.data.id}`);
    } catch (err) {
      setError("Failed to generate short URL. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (shortenUrl) {
      await navigator.clipboard.writeText(shortenUrl);
      alert("Copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <header className="text-center py-6 text-3xl font-bold text-orange-600">
        URL Shortener 🔗
      </header>
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-lg p-8 bg-white rounded-3xl shadow-xl border border-gray-200">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Shorten your long URLs
          </h2>

          <div className="flex space-x-2">
            <input
              onChange={(e) => setLink(e.target.value)}
              value={link}
              type="text"
              placeholder="Enter your URL..."
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              className="px-5 py-3 bg-orange-500 text-white font-medium rounded-lg shadow-md hover:bg-orange-600 transition disabled:opacity-50"
              onClick={generateUrl}
              disabled={loading}
            >
              {loading ? "..." : "Shorten"}
            </button>
          </div>
          {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
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
