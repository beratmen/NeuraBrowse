import React from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
  LinearProgress,
  Card,
  CardContent,
} from '@mui/material';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartData,
  ChartOptions
} from 'chart.js';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CategoryIcon from '@mui/icons-material/Category';
import TimelineIcon from '@mui/icons-material/Timeline';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { SearchRecord, Interest, BrowsingStats, DailyActivity } from '../types';
import { analytics } from '../utils/analytics';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface AnalysisDashboardProps {
  searchHistory: SearchRecord[];
  interests: Interest[];
  dailyActivity: DailyActivity[];
  stats: BrowsingStats;
}

const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({
  searchHistory,
  interests,
  dailyActivity,
  stats,
}) => {
  // Line chart data for daily activity
  const lineChartData: ChartData<'line'> = {
    labels: dailyActivity.map(d => d.day.substring(0, 3)),
    datasets: [
      {
        label: 'Search Activity',
        data: dailyActivity.map(d => d.searches),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const lineChartOptions: ChartOptions<'line'> = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  // Doughnut chart data for interests
  const doughnutChartData: ChartData<'doughnut'> = {
    labels: interests.slice(0, 5).map(i => i.name),
    datasets: [
      {
        data: interests.slice(0, 5).map(i => i.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const doughnutChartOptions: ChartOptions<'doughnut'> = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      },
    },
  };

  const suggestions = analytics.getSuggestions(interests);

  return (
    <Box>
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingUpIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Total Searches
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold">
                {stats.totalSearches}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CategoryIcon color="secondary" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Topics
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold">
                {stats.uniqueTopics}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TimelineIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Avg/Day
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold">
                {stats.averagePerDay}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LightbulbIcon color="warning" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Top Interest
                </Typography>
              </Box>
              <Typography variant="h6" fontWeight="bold" noWrap>
                {stats.topInterests[0]?.name || 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Weekly Activity Chart */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="600">
              📊 Weekly Activity
            </Typography>
            <Box sx={{ height: 300, mt: 2 }}>
              <Line data={lineChartData} options={lineChartOptions} />
            </Box>
          </Paper>
        </Grid>

        {/* Interest Distribution */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="600">
              🎯 Interest Distribution
            </Typography>
            {interests.length > 0 ? (
              <Box sx={{ height: 300, mt: 2 }}>
                <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
              </Box>
            ) : (
              <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography color="text.secondary">
                  No data yet. Start searching to see your interests!
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Your Interests with Progress Bars */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="600">
              💡 Your Top Interests
            </Typography>
            {interests.length > 0 ? (
              <Box sx={{ mt: 2 }}>
                {interests.slice(0, 5).map((interest, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" fontWeight="500">
                        {interest.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {interest.count} searches ({interest.percentage}%)
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={interest.percentage} 
                      sx={{ height: 8, borderRadius: 1 }}
                    />
                  </Box>
                ))}
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
                <Typography color="text.secondary">
                  Start searching to discover your interests
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Recent Search History */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="600">
              🕐 Recent Searches
            </Typography>
            {searchHistory.length > 0 ? (
              <List sx={{ maxHeight: 300, overflow: 'auto' }}>
                {searchHistory.slice(0, 10).map((record, index) => (
                  <React.Fragment key={record.id}>
                    <ListItem sx={{ px: 1 }}>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body1">
                              {record.query}
                            </Typography>
                            <Chip 
                              label={record.category} 
                              size="small" 
                              color="primary" 
                              variant="outlined"
                            />
                          </Box>
                        }
                        secondary={analytics.formatDate(record.timestamp)}
                      />
                    </ListItem>
                    {index < Math.min(searchHistory.length - 1, 9) && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
                <Typography color="text.secondary">
                  No search history yet
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Personalized Suggestions */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="600">
              ✨ Personalized Suggestions
            </Typography>
            {suggestions.length > 0 ? (
              <>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Based on your browsing patterns, here are some topics you might enjoy:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {suggestions.map((suggestion, index) => (
                    <Chip
                      key={index}
                      label={suggestion}
                      variant="outlined"
                      color="primary"
                      sx={{ 
                        height: 'auto',
                        py: 1,
                        px: 2,
                        '& .MuiChip-label': {
                          whiteSpace: 'normal',
                        },
                      }}
                    />
                  ))}
                </Box>
              </>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Start searching to receive personalized content suggestions!
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalysisDashboard; 