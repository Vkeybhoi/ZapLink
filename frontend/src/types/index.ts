export interface UrlStats {
    createdAt: string;
    visits: number;
    lastVisited: string | null;
  }
  
  export interface UrlRecord {
    shortUrl: string;
    longUrl: string;
    stats: UrlStats;
  }