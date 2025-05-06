import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { fetchUrls } from "../utils/api";
import type { UrlRecord } from "../types";

function UrlList() {
  const [urls, setUrls] = useState<UrlRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<"createdAt" | "visits">(
    "createdAt"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    async function loadUrls() {
      try {
        const data = await fetchUrls();
        setUrls(data);
      } catch (err) {
        setError("Failed to fetch URLs");
        console.error(err);
      }
    }

    loadUrls();
  }, []);

  const filteredUrls = urls.filter(
    (url) =>
      search.length < 3 ||
      url.longUrl.toLowerCase().includes(search.toLowerCase())
  );

  const sortedUrls = [...filteredUrls].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;
    if (sortField === "createdAt") {
      aValue = a.stats.createdAt;
      bValue = b.stats.createdAt;
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      aValue = a.stats.visits;
      bValue = b.stats.visits;
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }
  });

  const pageCount = Math.ceil(sortedUrls.length / itemsPerPage);
  const displayedUrls = sortedUrls.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handleSort = (field: "createdAt" | "visits") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">URL List</h2>
      <input
        type="text"
        placeholder="Search URLs"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <table className="w-full border border-gray-300 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Long URL</th>
            <th className="p-3 text-left">Short URL</th>
            <th
              className="p-3 text-left cursor-pointer hover:text-blue-500"
              onClick={() => handleSort("createdAt")}
            >
              Created{" "}
              {sortField === "createdAt" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="p-3 text-left cursor-pointer hover:text-blue-500"
              onClick={() => handleSort("visits")}
            >
              Visits{" "}
              {sortField === "visits" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedUrls.map((url) => (
            <tr key={url.shortUrl} className="border-t">
              <td className="p-3 truncate max-w-xs">{url.longUrl}</td>
              <td className="p-3">
                <a
                  href={url.shortUrl}
                  className="text-blue-500 hover:underline"
                >
                  {url.shortUrl}
                </a>
              </td>
              <td className="p-3">
                {new Date(url.stats.createdAt).toLocaleString()}
              </td>
              <td className="p-3">{url.stats.visits}</td>
            </tr>
          ))}
          {displayedUrls.length === 0 && (
            <tr>
              <td colSpan={4} className="p-3 text-center text-gray-500">
                No URLs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName="flex justify-center gap-2 mt-4"
        pageClassName="px-3 py-1 rounded-lg border border-gray-300 hover:bg-blue-500 hover:text-white"
        activeClassName="bg-blue-500 text-white"
        previousClassName="px-3 py-1 rounded-lg border border-gray-300 hover:bg-blue-500 hover:text-white"
        nextClassName="px-3 py-1 rounded-lg border border-gray-300 hover:bg-blue-500 hover:text-white"
        disabledClassName="opacity-50 cursor-not-allowed"
      />
    </div>
  );
}

export default UrlList;
