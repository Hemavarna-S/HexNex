import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const AIBotChat = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 3 }} elevation={6}>
        <Typography variant="h5" gutterBottom>
          HexNex AI
        </Typography>
        <Typography variant="body2" color="textSecondary">
          AI chat component placeholder. Implement chat UI here.
        </Typography>
      </Paper>
    </Box>
  );
};

export default AIBotChat;
