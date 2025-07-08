import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import RoleSwitch from '../components/RoleSwitch';
import axios from '../utils/api';

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert('❌ Please fill in all fields.');
      return;
    }

    try {
      console.log('Register payload:', { name, email, password, role }); 
      const response = await axios.post('https://hexnex.onrender.com/api/register', { name, email, password, role });

      if (response.status === 201 || response.data.success) { 
        alert('✅ Registration successful! Redirecting to login...');
        navigate('/login');
      } else {
        alert('❌ Registration failed! Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message); 
      alert(err.response?.data?.message || '❌ Registration failed!');
    }
  };

  return (
    <Container maxWidth="sm">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Paper elevation={6} sx={{ p: 4, mt: 8, backgroundColor: '#1a2238', color: '#fff' }}>
          <Typography variant="h3" align="center" gutterBottom sx={{ color: '#00bcd4' }}>
            Register
          </Typography>
          <RoleSwitch role={role} setRole={setRole} />
          <TextField
            label="Full Name"
            fullWidth
            margin="normal"
            variant="outlined"
            value={name}
            onChange={e => setName(e.target.value)}
            InputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ style: { color: '#aaa' } }}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
            onChange={e => setPassword(e.target.value)}
            InputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ style: { color: '#aaa' } }}
          />
          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 3, backgroundColor: '#00bcd4', '&:hover': { backgroundColor: '#0097a7' } }}
            onClick={handleRegister}
          >
            Register as {role}
          </Button>
          <Typography align="center" sx={{ mt: 3, color: '#aaa' }}>
            Already have an account?{' '}
            <Button
              variant="text"
              sx={{ color: '#1e90ff', textDecoration: 'none', padding: 0, minWidth: 'auto' }}
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          </Typography>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Register;