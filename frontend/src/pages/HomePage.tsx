import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { encodeUrl, fetchUrls, fetchQRCode } from '../utils/api';
import type { UrlRecord } from '../types';
import UrlList from '../components/UrlList';

function HomePage() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [urls, setUrls] = useState<UrlRecord[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUrls().then(setUrls).catch(() => toast.error('Failed to load URLs'));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newShortUrl = await encodeUrl(longUrl);
      setShortUrl(newShortUrl);
      const urlPath = newShortUrl.split('/').pop()!;
      const qrCodeData = await fetchQRCode(urlPath);
      setQrCode(qrCodeData);
      const updatedUrls = await fetchUrls();
      setUrls(updatedUrls);
      toast.success('Short URL created!');
      setLongUrl('');
    } catch {
      toast.error('Failed to create short URL');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">ZapLink</h1>
      <form onSubmit={handleSubmit} className="mb-8 max-w-lg mx-auto">
        <div className="flex gap-4">
          <input
            type="text"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Enter long URL"
            className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 flex items-center gap-2"
            disabled={loading}
          >
            {loading && (
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z" />
              </svg>
            )}
            {loading ? 'Creating...' : 'Shorten'}
          </button>
        </div>
      </form>
      {shortUrl && (
        <div className="mb-8 max-w-lg mx-auto text-center">
          <p className="text-lg">
            Short URL: <a href={shortUrl} className="text-blue-500 hover:underline">{shortUrl}</a>
          </p>
          <button onClick={handleCopy} className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">
            Copy to Clipboard
          </button>
          {qrCode && <img src={qrCode} alt="QR Code" className="mt-4 mx-auto w-32 h-32" />}
        </div>
      )}
      <div className="max-w-lg mx-auto mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search long URLs (min 3 chars)"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <UrlList urls={urls} search={search} />
    </div>
  );
}

export default HomePage;