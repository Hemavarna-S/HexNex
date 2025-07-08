import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" fontWeight={700} color="primary">
          HexNex
        </Typography>
        <Box>
          <Button component={Link} to="/" color="primary">
            Home
          </Button>

          <Button component={Link} to="/login" color="primary" variant="outlined">
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
