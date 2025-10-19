// Analytics and data processing utilities

import { SearchRecord, Interest, BrowsingStats, DailyActivity } from '../types';

export const analytics = {
  // Calculate interests from search history
  calculateInterests: (searchHistory: SearchRecord[]): Interest[] => {
    const categoryCount: Record<string, number> = {};
    
    searchHistory.forEach(record => {
      const category = record.category || 'General';
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });

    const totalSearches = searchHistory.length || 1; // Avoid division by zero
    
    const interests: Interest[] = Object.entries(categoryCount)
      .map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / totalSearches) * 100),
      }))
      .sort((a, b) => b.count - a.count);

    return interests;
  },

  // Calculate browsing statistics
  calculateStats: (
    searchHistory: SearchRecord[],
    interests: Interest[]
  ): BrowsingStats => {
    const totalSearches = searchHistory.length;
    const uniqueTopics = new Set(searchHistory.map(s => s.category)).size;
    
    // Calculate average searches per day based on first and last search
    let averagePerDay = 0;
    if (searchHistory.length > 0) {
      const oldestSearch = searchHistory[searchHistory.length - 1];
      const newestSearch = searchHistory[0];
      const daysDifference = Math.max(
        1,
        Math.ceil((newestSearch.timestamp - oldestSearch.timestamp) / (1000 * 60 * 60 * 24))
      );
      averagePerDay = Math.round((totalSearches / daysDifference) * 10) / 10;
    }

    const topInterests = interests.slice(0, 5);

    return {
      totalSearches,
      uniqueTopics,
      averagePerDay,
      topInterests,
    };
  },

  // Get personalized suggestions based on interests
  getSuggestions: (interests: Interest[]): string[] => {
    const suggestions: Record<string, string[]> = {
      'Technology': [
        'Latest JavaScript frameworks and libraries',
        'Cloud computing and DevOps best practices',
        'Artificial Intelligence and Machine Learning trends',
        'Cybersecurity fundamentals',
        'Open source projects to contribute to',
      ],
      'Entertainment': [
        'Trending movies and TV series',
        'Best gaming platforms and new releases',
        'Music streaming services comparison',
        'Film festivals and award shows',
        'Behind the scenes content',
      ],
      'News': [
        'Reliable news sources and fact-checking',
        'Global current affairs analysis',
        'Technology and innovation news',
        'Economic and market updates',
        'Environmental and climate news',
      ],
      'Education': [
        'Free online learning platforms',
        'Professional certification programs',
        'Academic research databases',
        'Study techniques and productivity tools',
        'Educational podcasts and webinars',
      ],
      'Shopping': [
        'Price comparison tools and browser extensions',
        'Seasonal sales and deals calendar',
        'Product review aggregators',
        'Sustainable and ethical shopping options',
        'Cashback and reward programs',
      ],
      'Travel': [
        'Budget travel tips and destinations',
        'Digital nomad resources',
        'Travel photography guides',
        'Cultural etiquette for different countries',
        'Eco-friendly travel options',
      ],
      'Health': [
        'Home workout routines and fitness apps',
        'Nutrition planning and meal prep ideas',
        'Mental health resources and mindfulness',
        'Sleep optimization techniques',
        'Preventive healthcare information',
      ],
      'Food': [
        'International cuisine recipes',
        'Meal planning and grocery shopping tips',
        'Food photography and presentation',
        'Dietary restrictions and alternatives',
        'Local restaurant reviews and recommendations',
      ],
      'Sports': [
        'Live sports streaming platforms',
        'Sports analytics and statistics',
        'Training programs for different sports',
        'Sports nutrition and recovery',
        'Fantasy sports strategies',
      ],
      'Finance': [
        'Personal finance management tools',
        'Investment strategies for beginners',
        'Cryptocurrency guides and analysis',
        'Retirement planning resources',
        'Tax optimization tips',
      ],
    };

    const allSuggestions: string[] = [];
    
    interests.slice(0, 3).forEach(interest => {
      const categorySuggestions = suggestions[interest.name];
      if (categorySuggestions) {
        allSuggestions.push(...categorySuggestions);
      }
    });

    // If no specific suggestions, provide general ones
    if (allSuggestions.length === 0) {
      return [
        'Explore trending topics in technology',
        'Discover new educational resources',
        'Find entertainment recommendations',
        'Stay updated with current events',
        'Learn about personal development',
      ];
    }

    return allSuggestions.slice(0, 8);
  },

  // Format date for display
  formatDate: (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
  },
};
