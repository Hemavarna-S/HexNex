import { Grid, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import RoomCard from '../components/RoomCard';

import phishingImg from '../assets/phishing.png';
import mitmImg from '../assets/mitm.png';
import bruteImg from '../assets/brute.png';
import socialImg from '../assets/social.png';
import malwareImg from '../assets/malware.png';

const rooms = [
  {
    title: 'Phishing Simulation',
    path: 'phishing',
    image: phishingImg,
    description: 'Simulate deceptive emails and login forms to train against phishing attacks.',
  },
  {
    title: 'MITM Simulation',
    path: 'mitm',
    image: mitmImg,
    description: 'Test how data interception occurs in a man-in-the-middle scenario.',
  },
  {
    title: 'Brute Force Attack',
    path: 'brute-force',
    image: bruteImg,
    description: 'Simulate password-guessing techniques and defensive mechanisms.',
  },
  {
    title: 'Social Engineering Traps',
    path: 'social-engineering',
    image: socialImg,
    description: 'Visualize and interact with trick-based attack environments.',
  },
  {
    title: 'Malware File Detonation',
    path: 'malware',
    image: malwareImg,
    description: 'Trigger malware in a secure virtual box and watch detection mechanisms.',
  },
];

const Rooms = () => {
  return (
    <Box sx={{ p: 5, background: 'linear-gradient(to right, #000428,rgb(0, 0, 64))', minHeight: '100vh' }}>
      <Typography variant="h3" fontWeight="bold" color="#fff" gutterBottom textAlign="center">
        🧪 Attack Simulation Labs
      </Typography>

      <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
        {rooms.map((room, index) => (
          <Grid item key={index}>
            <Link to={`/rooms/${room.path}`} style={{ textDecoration: 'none' }}>
              <RoomCard {...room} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Rooms;
