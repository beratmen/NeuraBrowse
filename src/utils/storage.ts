// Local storage utilities for persisting data

import { SearchRecord, Interest, DailyActivity } from '../types';

const STORAGE_KEYS = {
  SEARCH_HISTORY: 'neurabrowse_search_history',
  INTERESTS: 'neurabrowse_interests',
  DAILY_ACTIVITY: 'neurabrowse_daily_activity',
};

export const storage = {
  // Search History
  getSearchHistory: (): SearchRecord[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading search history:', error);
      return [];
    }
  },

  saveSearchHistory: (history: SearchRecord[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(history));
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  },

  addSearch: (query: string): SearchRecord => {
    const history = storage.getSearchHistory();
    const newSearch: SearchRecord = {
      id: Date.now().toString(),
      query: query.trim(),
      timestamp: Date.now(),
      category: categorizeSearch(query),
    };
    
    history.unshift(newSearch);
    
    // Keep only last 100 searches
    const limitedHistory = history.slice(0, 100);
    storage.saveSearchHistory(limitedHistory);
    
    return newSearch;
  },

  // Interests
  getInterests: (): Interest[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INTERESTS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading interests:', error);
      return [];
    }
  },

  saveInterests: (interests: Interest[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.INTERESTS, JSON.stringify(interests));
    } catch (error) {
      console.error('Error saving interests:', error);
    }
  },

  // Daily Activity
  getDailyActivity: (): DailyActivity[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DAILY_ACTIVITY);
      return data ? JSON.parse(data) : initializeDailyActivity();
    } catch (error) {
      console.error('Error reading daily activity:', error);
      return initializeDailyActivity();
    }
  },

  saveDailyActivity: (activity: DailyActivity[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.DAILY_ACTIVITY, JSON.stringify(activity));
    } catch (error) {
      console.error('Error saving daily activity:', error);
    }
  },

  updateDailyActivity: (): void => {
    const activity = storage.getDailyActivity();
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    
    const todayIndex = activity.findIndex(a => a.day === today);
    if (todayIndex !== -1) {
      activity[todayIndex].searches += 1;
      storage.saveDailyActivity(activity);
    }
  },

  // Clear all data
  clearAll: (): void => {
    localStorage.removeItem(STORAGE_KEYS.SEARCH_HISTORY);
    localStorage.removeItem(STORAGE_KEYS.INTERESTS);
    localStorage.removeItem(STORAGE_KEYS.DAILY_ACTIVITY);
  },
};

// Helper function to categorize searches
function categorizeSearch(query: string): string {
  const lowerQuery = query.toLowerCase();
  
  const categories: Record<string, string[]> = {
    'Technology': ['code', 'programming', 'software', 'developer', 'tech', 'computer', 'ai', 'machine learning', 'data science', 'javascript', 'python', 'react', 'typescript'],
    'Entertainment': ['movie', 'music', 'game', 'video', 'film', 'song', 'netflix', 'youtube', 'spotify', 'gaming'],
    'News': ['news', 'breaking', 'update', 'latest', 'current events', 'politics', 'election'],
    'Education': ['learn', 'tutorial', 'course', 'study', 'education', 'school', 'university', 'how to', 'guide'],
    'Shopping': ['buy', 'shop', 'price', 'deal', 'discount', 'store', 'amazon', 'product', 'review'],
    'Travel': ['travel', 'hotel', 'flight', 'vacation', 'trip', 'destination', 'tour', 'booking'],
    'Health': ['health', 'fitness', 'workout', 'diet', 'nutrition', 'medical', 'doctor', 'exercise'],
    'Food': ['recipe', 'food', 'restaurant', 'cooking', 'cuisine', 'meal', 'dinner', 'lunch'],
    'Sports': ['sports', 'football', 'basketball', 'soccer', 'tennis', 'game', 'match', 'player'],
    'Finance': ['stock', 'investment', 'money', 'finance', 'crypto', 'bitcoin', 'bank', 'trading'],
  };

  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => lowerQuery.includes(keyword))) {
      return category;
    }
  }

  return 'General';
}

// Initialize weekly activity
function initializeDailyActivity(): DailyActivity[] {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return days.map(day => ({ day, searches: 0 }));
}
