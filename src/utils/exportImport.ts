// Export/Import utilities for data backup and restore

import { SearchRecord, Interest, DailyActivity } from '../types';

export interface ExportData {
  version: string;
  exportDate: string;
  searchHistory: SearchRecord[];
  interests: Interest[];
  dailyActivity: DailyActivity[];
}

export const exportImport = {
  // Export all data as JSON
  exportData: (): string => {
    const searchHistory = JSON.parse(localStorage.getItem('neurabrowse_search_history') || '[]');
    const interests = JSON.parse(localStorage.getItem('neurabrowse_interests') || '[]');
    const dailyActivity = JSON.parse(localStorage.getItem('neurabrowse_daily_activity') || '[]');

    const exportData: ExportData = {
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      searchHistory,
      interests,
      dailyActivity,
    };

    return JSON.stringify(exportData, null, 2);
  },

  // Download data as JSON file
  downloadData: (): void => {
    try {
      const data = exportImport.exportData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const date = new Date().toISOString().split('T')[0];
      
      link.href = url;
      link.download = `neurabrowse-backup-${date}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading data:', error);
      throw new Error('Failed to download data');
    }
  },

  // Import data from JSON
  importData: (jsonString: string): boolean => {
    try {
      const data: ExportData = JSON.parse(jsonString);

      // Validate data structure
      if (!data.version || !data.searchHistory || !Array.isArray(data.searchHistory)) {
        throw new Error('Invalid data format');
      }

      // Import data
      localStorage.setItem('neurabrowse_search_history', JSON.stringify(data.searchHistory));
      
      if (data.interests && Array.isArray(data.interests)) {
        localStorage.setItem('neurabrowse_interests', JSON.stringify(data.interests));
      }
      
      if (data.dailyActivity && Array.isArray(data.dailyActivity)) {
        localStorage.setItem('neurabrowse_daily_activity', JSON.stringify(data.dailyActivity));
      }

      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  },

  // Import data from file
  importFromFile: (file: File): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const success = exportImport.importData(content);
          resolve(success);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsText(file);
    });
  },
};
