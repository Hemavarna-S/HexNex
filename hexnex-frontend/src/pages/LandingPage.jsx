import { Box, Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import heroImage from '../assets/hero-illustration.svg';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Box
          sx={{
            mt: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 4,
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            style={{ flex: 1, minWidth: 280 }}
          >
            <Typography
              variant="h2"
              gutterBottom
              sx={{ fontWeight: 'bold', color: '#1e90ff' }}
            >
              Welcome to HexNex
            </Typography>
            <Typography
              variant="subtitle1"
              paragraph
              sx={{ color: '#aaa', lineHeight: 1.8 }}
            >
              A futuristic cyberwar training zone. Learn, simulate, and battle real-world cyber attacks in immersive rooms. Train with AI. Master Cybersecurity.
            </Typography>
            <Box mt={4} sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                sx={{ backgroundColor: '#1e90ff', '&:hover': { backgroundColor: '#1c86ee' } }}
                onClick={() => navigate('/login')}
              >
                Explore Rooms
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{ borderColor: '#1e90ff', color: '#1e90ff', '&:hover': { borderColor: '#1c86ee', color: '#1c86ee' } }}
                onClick={() => navigate('/login')}
              >
                Ask AI
              </Button>
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            style={{ flex: 1, textAlign: 'center' }}
          >
            <img
              src={heroImage}
              alt="Cybersecurity Illustration"
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </motion.div>
        </Box>
      </Container>
    </>
  );
};

export default LandingPage;