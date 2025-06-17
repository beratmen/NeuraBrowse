import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface AnalysisDashboardProps {
  searchHistory?: string[];
  interests?: string[];
}

const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({
  searchHistory = [],
  interests = [],
}) => {
  const chartData: ChartData<'line'> = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Search Activity',
        data: [12, 19, 15, 17, 22, 25, 18],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Browsing Activity
          </Typography>
          <Box sx={{ height: 300 }}>
            <Line data={chartData} options={chartOptions} />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Your Interests
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {interests.map((interest, index) => (
              <Paper
                key={index}
                sx={{
                  p: 1,
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText',
                }}
              >
                {interest}
              </Paper>
            ))}
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Personalized Suggestions
          </Typography>
          <Typography variant="body1">
            Based on your browsing history, we recommend exploring these topics:
          </Typography>
          <Box sx={{ mt: 2 }}>
            <ul>
              <li>Technology Trends</li>
              <li>Web Development</li>
              <li>Data Science</li>
              <li>Artificial Intelligence</li>
            </ul>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AnalysisDashboard; 