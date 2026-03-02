import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const EXPECTED_FLAG = 'HEXNEX{phishing-flag}';

const AmazonLogin = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [flag, setFlag] = useState('');
  const [showFlag, setShowFlag] = useState(false);
  const [remember, setRemember] = useState(true);
  const nav = useNavigate();

  const onSubmit = () => {
    if (!user || !pass) return message.error('Enter credentials');
    setSubmitted(true);
  };

  const onSubmitFlag = () => {
    if (flag.trim() === EXPECTED_FLAG) {
      message.success('Flag accepted — Room completed!');
      const completed = JSON.parse(localStorage.getItem('completedRooms') || '[]');
      if (!completed.includes('phishing')) completed.push('phishing');
      localStorage.setItem('completedRooms', JSON.stringify(completed));
      launchConfetti();
    } else {
      message.error('Incorrect flag');
    }
  };

  const revealFlag = () => {
    setShowFlag(true);
    setFlag(EXPECTED_FLAG);
    if (navigator.clipboard) navigator.clipboard.writeText(EXPECTED_FLAG);
    message.info('Flag revealed and copied');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#071021', py: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card elevation={6} sx={{ width: { xs: '92%', sm: 820 }, borderRadius: 3, overflow: 'hidden', boxShadow: '0 10px 30px rgba(2,6,23,0.7)' }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
          {/* Left column: dark panel */}
          <Box sx={{ flex: 1, p: { xs: 4, sm: 6 }, bgcolor: 'linear-gradient(180deg,#2e3540,#3b4250)', color: '#fff', position: 'relative' }}>
            <Box sx={{ textAlign: 'center', mb: 1 }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.12)', fontWeight: 700, letterSpacing: 1 }}>amazon.com</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" style={{ width: 120, filter: 'brightness(0) invert(1) saturate(0.6)' }} />
            </Box>

            <Typography variant="h5" sx={{ mb: 2, fontWeight: 800, color: '#fff' }}>Sign-In</Typography>

            {!submitted ? (
              <>
                <TextField
                  fullWidth
                  label="Email or mobile phone number"
                  value={user}
                  onChange={e => setUser(e.target.value)}
                  sx={{ mb: 2 }}
                  variant="filled"
                  size="small"
                  autoFocus
                  InputProps={{
                    sx: { bgcolor: '#2f6a93', borderRadius: 1, color: '#fff' },
                  }}
                  InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.85)' } }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={pass}
                  onChange={e => setPass(e.target.value)}
                  sx={{ mb: 1 }}
                  variant="filled"
                  size="small"
                  InputProps={{
                    sx: { bgcolor: '#2f6a93', borderRadius: 1, color: '#fff' },
                  }}
                  InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.85)' } }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <FormControlLabel
                    control={<Checkbox checked={remember} onChange={e => setRemember(e.target.checked)} sx={{ color: '#fff' }} />}
                    label={<Typography variant="body2" sx={{ color: '#fff' }}>Keep me signed in</Typography>}
                  />
                  <Typography variant="body2" sx={{ color: '#7fb0e6', cursor: 'pointer' }}>Need help?</Typography>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={onSubmit}
                  sx={{ backgroundColor: '#FF9900', color: '#111827', fontWeight: 800, height: 48, borderRadius: 1, '&:hover': { backgroundColor: '#e88b00' } }}
                >
                  CONTINUE
                </Button>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.55)', fontSize: 12 }}>By continuing, you agree to Amazon's <span style={{ color: '#82b9ff' }}>Conditions of Use</span> and <span style={{ color: '#82b9ff' }}>Privacy Notice</span>.</Typography>
                </Box>
              </>
            ) : (
              <>
                <Typography variant="body2" sx={{ color: '#dbeafe' }}>Username: <span style={{ fontFamily: 'monospace' }}>{user}</span></Typography>
                <Typography variant="body2" sx={{ color: '#dbeafe' }}>Password: <span style={{ fontFamily: 'monospace' }}>••••••••</span></Typography>

                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 2 }}>
                  <TextField label="Flag" value={flag} onChange={e => setFlag(e.target.value)} size="small" />
                  <Button variant="contained" color="success" onClick={onSubmitFlag} sx={{ ml: 1 }}>Submit Flag</Button>
                </Box>

                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button onClick={revealFlag} sx={{ color: '#fff' }}>Reveal Flag</Button>
                  <Button onClick={() => nav(-1)} sx={{ color: '#fff' }}>Back</Button>
                </Box>
              </>
            )}

            <Box sx={{ position: 'absolute', bottom: 12, left: 24, right: 24, borderTop: '1px solid rgba(255,255,255,0.04)', pt: 2, display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>
              <span>© 2026 Amazon</span>
              <span>English</span>
            </Box>
          </Box>

          {/* Right column: light card */}
          <Box sx={{ width: { xs: '100%', sm: 300 }, bgcolor: '#ffffff', p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 800, color: '#111827' }}>New to Amazon?</Typography>
            <Typography variant="body2" sx={{ color: '#374151', mb: 2 }}>Create an account to start shopping, track orders, and more.</Typography>
            <Button variant="outlined" fullWidth onClick={() => message.info('Create account flow not available')} sx={{ borderColor: '#2b82ff', color: '#0b66d0', fontWeight: 700 }}>CREATE YOUR AMAZON ACCOUNT</Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

function launchConfetti() {
  const colors = ['#ef4444', '#f97316', '#f59e0b', '#10b981', '#06b6d4', '#3b82f6', '#8b5cf6'];
  const root = document.body;
  for (let i = 0; i < 40; i++) {
    const el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.top = '0px';
    el.style.left = Math.random() * window.innerWidth + 'px';
    el.style.width = '10px';
    el.style.height = '14px';
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.zIndex = '9999';
    el.style.opacity = '0.95';
    el.style.transform = `rotate(${Math.random() * 360}deg)`;
    root.appendChild(el);
    requestAnimationFrame(() => {
      el.style.transition = 'transform 1.2s ease-out, opacity 1.2s linear';
      el.style.transform = `translateY(${700 + Math.random() * 300}px) rotate(${720 + Math.random() * 360}deg)`;
      el.style.opacity = '0';
    });
    setTimeout(() => el.remove(), 1600 + Math.random() * 400);
  }
}

export default AmazonLogin;
