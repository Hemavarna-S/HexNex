import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import { motion } from 'framer-motion';

const RoomCard = ({ title, image, description }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Card
        sx={{
          width: 280,
          height: 320,
          borderRadius: 4,
          background: '#111827',
          color: '#fff',
          boxShadow: '0 0 20px #00e5ff55',
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
          sx={{ objectFit: 'contain', padding: 2 }}
        />
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="gray">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RoomCard;
