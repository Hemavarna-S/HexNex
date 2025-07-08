// src/dashboard/StudentDashboard.jsx
import React from 'react';
import { Typography, Container, Box, Card, CardContent, Grid, Avatar, Button } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const name = localStorage.getItem('name') || 'Student';
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <aside>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Welcome, {name}!
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Explore your personalized dashboard and enhance your learning journey 
          </Typography>
          <Button
            variant="contained"
            color="error"
            sx={{ mt: 2 }}
            onClick={() => {
              localStorage.clear();
              navigate('/');
            }}
          >
            Logout
          </Button>
        </Box>
      </aside>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{ backgroundColor: '#1e90ff', color: '#fff', cursor: 'pointer' }}
            onClick={() => navigate('/rooms')}
          >
            <CardContent>
              <Avatar sx={{ bgcolor: '#fff', color: '#1e90ff', mb: 2 }}>
                <SchoolIcon />
              </Avatar>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Rooms
              </Typography>
              <Typography variant="body2">
                Access and manage your training rooms.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{ backgroundColor: '#ff5722', color: '#fff', cursor: 'pointer' }}
            onClick={() => navigate('/progress')}
          >
            <CardContent>
              <Avatar sx={{ bgcolor: '#fff', color: '#ff5722', mb: 2 }}>
                <SchoolIcon />
              </Avatar>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Progress
              </Typography>
              <Typography variant="body2">
                Track your learning progress and achievements.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{ backgroundColor: '#4caf50', color: '#fff', cursor: 'pointer' }}
            onClick={() => navigate('/hexnexai')}
          >
            <CardContent>
              <Avatar sx={{ bgcolor: '#fff', color: '#4caf50', mb: 2 }}>
                <SchoolIcon />
              </Avatar>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                HexNex AI
              </Typography>
              <Typography variant="body2">
                Get answers to your cybersecurity-related queries.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StudentDashboard;