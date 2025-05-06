import { useState, useMemo } from "react";
import ReactPaginate from "react-paginate";
import { UrlRecord } from "../types";

interface UrlListProps {
  urls: UrlRecord[];
  search: string;
}

function UrlList({ urls, search }: UrlListProps) {
  const [sortField, setSortField] = useState<"createdAt" | "visits">(
    "createdAt"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const filteredUrls = useMemo(() => {
    if (!search) return urls;
    return urls.filter(
      (url) =>
        search.length < 3 ||
        url.longUrl.toLowerCase().includes(search.toLowerCase())
    );
  }, [urls, search]);

  const sortedUrls = useMemo(() => {
    return [...filteredUrls].sort((a, b) => {
      const aValue =
        sortField === "createdAt" ? a.stats.createdAt : a.stats.visits;
      const bValue =
        sortField === "createdAt" ? b.stats.createdAt : b.stats.visits;
      if (sortField === "createdAt") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    });
  }, [filteredUrls, sortField, sortOrder]);

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

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
        URL List
      </h2>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full min-w-[600px] bg-white dark:bg-gray-800 border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <th className="p-4 text-center text-gray-800 dark:text-gray-200 font-semibold uppercase tracking-wide">
                Long URL
              </th>
              <th className="p-4 text-center text-gray-800 dark:text-gray-200 font-semibold uppercase tracking-wide">
                Short URL
              </th>
              <th
                className="p-4 text-center text-gray-800 dark:text-gray-200 font-semibold uppercase tracking-wide cursor-pointer hover:text-blue-500 dark:hover:text-blue-400"
                onClick={() => handleSort("createdAt")}
              >
                Created{" "}
                {sortField === "createdAt" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="p-4 text-center text-gray-800 dark:text-gray-200 font-semibold uppercase tracking-wide cursor-pointer hover:text-blue-500 dark:hover:text-blue-400"
                onClick={() => handleSort("visits")}
              >
                Visits{" "}
                {sortField === "visits" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedUrls.map((url) => (
              <tr
                key={url.shortUrl}
                className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <td className="p-4 text-gray-800 dark:text-gray-200 break-words">
                  {url.longUrl}
                </td>
                <td className="p-4">
                  <a
                    href={url.shortUrl}
                    className="text-blue-500 hover:underline dark:text-blue-400 break-words"
                  >
                    {url.shortUrl}
                  </a>
                </td>
                <td className="p-4 text-gray-800 dark:text-gray-200 text-center">
                  {new Date(url.stats.createdAt).toLocaleString()}
                </td>
                <td className="p-4 text-gray-800 dark:text-gray-200 text-center">
                  {url.stats.visits}
                </td>
              </tr>
            ))}
            {displayedUrls.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="p-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No URLs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName="flex justify-center gap-2 items-center"
          pageClassName="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 transition-colors duration-200"
          activeClassName="bg-blue-500 text-white dark:bg-blue-600"
          previousClassName="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 transition-colors duration-200"
          nextClassName="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 transition-colors duration-200"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>
    </div>
  );
}

export default UrlList;
