// Type definitions for the application

export interface SearchRecord {
  id: string;
  query: string;
  timestamp: number;
  category?: string;
}

export interface Interest {
  name: string;
  count: number;
  percentage: number;
}

export interface BrowsingStats {
  totalSearches: number;
  uniqueTopics: number;
  averagePerDay: number;
  topInterests: Interest[];
}

export interface DailyActivity {
  day: string;
  searches: number;
}

export interface AppState {
  searchHistory: SearchRecord[];
  interests: Interest[];
  dailyActivity: DailyActivity[];
  stats: BrowsingStats;
}
