import { useState } from "react";
import NavBar from "../components/NavBar";
import UrlHandler from "../components/UrlHandler";
import UrlList from "../components/UrlList";
import { UrlRecord } from "../types";

function HomePage() {
  const [urls, setUrls] = useState<UrlRecord[]>([]);
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <UrlHandler
          onUrlsChange={setUrls}
          search={search}
          setSearch={setSearch}
        />
        <UrlList urls={urls} search={search} />
      </div>
    </div>
  );
}

export default HomePage;

