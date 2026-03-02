import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, List, ListItem, ListItemText } from '@mui/material';
import api from '../utils/api';

const ProgressPage = () => {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await api.get('/api/progress/me', { headers: { Authorization: `Bearer ${token}` } });
        setProgress(res.data.progress);
      } catch (err) {
        console.error('Failed to load progress', err);
      }
    };
    load();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Progress</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Points</Typography>
              <Typography variant="h3">{progress ? progress.totalPoints : 0}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Completed Rooms</Typography>
              <List dense>
                {progress?.completedRooms?.length ? (
                  progress.completedRooms.map((r, idx) => (
                    <ListItem key={idx}>
                      <ListItemText primary={r.room} secondary={`${r.points} pts`} />
                    </ListItem>
                  ))
                ) : (
                  <ListItem><ListItemText primary="No completed rooms yet" /></ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Completed Walkthroughs</Typography>
              <List dense>
                {progress?.completedWalkthroughs?.length ? (
                  progress.completedWalkthroughs.map((w, idx) => (
                    <ListItem key={idx}>
                      <ListItemText primary={w.topic} secondary={`${w.points} pts`} />
                    </ListItem>
                  ))
                ) : (
                  <ListItem><ListItemText primary="No completed walkthroughs yet" /></ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProgressPage;
