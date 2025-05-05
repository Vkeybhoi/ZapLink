export interface UrlRecord {
    shortPath: string;
    longUrl: string;
  }
  
  export interface UrlStats {
    createdAt: string;
    visits: number;
    lastVisited: string | null;
  }
  
  export interface UrlResponse {
    shortUrl: string;
    longUrl: string;
    stats: UrlStats;
  }