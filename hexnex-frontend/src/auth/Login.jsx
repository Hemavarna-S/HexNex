import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import RoleSwitch from '../components/RoleSwitch';
import axios from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post('/api/login', { email, password, role });
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('name', data.name); 
      alert(`Welcome back, ${data.name.split(' ')[0]}!`);
      if (data.role === 'student') {
        navigate('/student-dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <Container maxWidth="sm">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Paper
          elevation={10}
          sx={{
            p: 5,
            mt: 10,
            backgroundColor: '#1a2238',
            color: '#fff',
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            gutterBottom
            sx={{ color: '#00bcd4' }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            gutterBottom
            sx={{ color: '#aaa' }}
          >
            Please login to continue
          </Typography>

          <RoleSwitch role={role} setRole={setRole} />

          <TextField
            label="Email Address"
            fullWidth
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ style: { color: '#aaa' } }}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ style: { color: '#aaa' } }}
          />

          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 3, backgroundColor: '#00bcd4', '&:hover': { backgroundColor: '#0097a7' } }}
            onClick={handleLogin}
          >
            Login as {role}
          </Button>

          <Typography align="center" sx={{ mt: 3, color: '#aaa' }}>
            Don&apos;t have an account?{' '}
            <Button
              variant="text"
              sx={{ color: '#1e90ff', textDecoration: 'none', padding: 0, minWidth: 'auto' }}
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
          </Typography>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Login;