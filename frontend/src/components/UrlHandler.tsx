import { useState } from "react";
import { toast } from "react-toastify";
import { encodeUrl, fetchUrls, fetchQRCode } from "../utils/api";
import { UrlRecord } from "../types";

interface UrlHandlerProps {
  onUrlsChange: (urls: UrlRecord[]) => void;
  search: string;
  setSearch: (search: string) => void;
}

function UrlHandler({ onUrlsChange, search, setSearch }: UrlHandlerProps) {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newShortUrl = await encodeUrl(longUrl);
      setShortUrl(newShortUrl);
      const urlPath = newShortUrl.split("/").pop()!;
      const qrCodeData = await fetchQRCode(urlPath);
      setQrCode(qrCodeData);
      const updatedUrls = await fetchUrls();
      onUrlsChange(updatedUrls);
      toast.success("Short URL created!");
      setLongUrl("");
    } catch (error) {
      toast.error("Failed to create short URL");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Copied to clipboard!");
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm p-6 mb-6 animate-slide-up">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Shorten a URL
        </h2>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="https://your-long-url-here"
            className="flex-1 border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-blue-300 flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            disabled={loading}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                />
              </svg>
            )}
            {loading ? "Creating..." : "Shorten Now"}
          </button>
        </form>
      </div>

      {shortUrl && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm p-6 mb-6 animate-slide-up">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            🎉 Your Short URL
          </h2>
          <div className="flex items-center gap-4 mb-4">
            <a
              href={shortUrl}
              className="text-green-500 dark:text-green-400 hover:underline truncate"
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortUrl}
            </a>
            <button
              onClick={handleCopy}
              className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600 px-6 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 shrink-0 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              Copy
            </button>
          </div>
          {qrCode && (
            <img
              src={qrCode}
              alt="QR Code"
              className="w-24 h-24 rounded-lg border border-gray-200 dark:border-gray-600 animate-fade-in"
            />
          )}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm p-6 mb-6 animate-slide-up">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            🔍
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search URLs (min 3 chars)"
            className="flex-1 border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
          />
        </div>
      </div>
    </>
  );
}

export default UrlHandler;

// Utility to add animation keyframes if needed
const styles = `
  @keyframes slide-up {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-slide-up {
    animation: slide-up 0.5s ease-out;
  }
  .animate-fade-in {
    animation: fade-in 0.5s ease-in;
  }
`;
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
