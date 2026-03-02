import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const rooms = [
  { slug: 'phishing', title: 'Phishing' },
  { slug: 'mitm', title: 'Man-in-the-Middle (MITM)' },
  { slug: 'brute-force', title: 'Brute Force' },
  { slug: 'social-engineering', title: 'Social Engineering' },
  { slug: 'malware', title: 'Malware' },
  { slug: 'vulnerable-webapp', title: 'Vulnerable Web App' },
];

const WalkthroughIndex = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Walkthroughs
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Learn core cybersecurity concepts for each room. Open a walkthrough to read
        explanations and recommended exercises, or jump straight into the simulation.
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {rooms.map((r) => (
          <Grid item xs={12} sm={6} md={4} key={r.slug}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {r.title}
                </Typography>
                <Button component={Link} to={`/walkthrough/${r.slug}`} variant="outlined">
                  Open Walkthrough
                </Button>
                <Button
                  component={Link}
                  to={`/rooms/${r.slug}`}
                  variant="text"
                  sx={{ ml: 1 }}
                >
                  Open Simulation
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                General Topics
              </Typography>
              <Typography variant="body2" gutterBottom>
                Explore broader subjects like networking, Linux, and general cybersecurity concepts.
              </Typography>
              <Button component={Link} to="/walkthrough/topics" variant="outlined">
                Open Topics
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WalkthroughIndex;
