import { Box, Typography } from '@mui/material';

const SocialEngineeringRoom = () => {
  return (
    <Box sx={{ p: 5, color: '#fff', minHeight: '100vh', background: 'linear-gradient(to right, #1c92d2, #f2fcfe)' }}>
      <Typography variant="h4" fontWeight="bold">🎭 Social Engineering Trap Room</Typography>
      <Typography sx={{ mt: 2 }}>
        Explore simulations where users are manipulated into giving away sensitive information via fake phone calls, QR codes, or links.
      </Typography>
    </Box>
  );
};

export default SocialEngineeringRoom;
