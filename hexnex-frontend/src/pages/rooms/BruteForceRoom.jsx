import React, { useState } from 'react';
import { Box, Paper, Typography, Button, Modal, TextField, Snackbar, Divider, List, ListItem, ListItemText } from '@mui/material';

const PhishingRoom = () => {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [formValues, setFormValues] = useState({ username: '', password: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });

  const handleOpenPhishPage = () => setVisible(true);

  const handleSubmit = () => {
    if (!formValues.username || !formValues.password) {
      setSnackbar({ open: true, message: 'Please enter both username and password.', severity: 'error' });
      return;
    }
    setCredentials(formValues);
    setSubmitted(true);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', background: '#0b1e36' }}>
      {/* Sidebar */}
      <Box sx={{ width: 220, bgcolor: '#112d4e', color: '#dbe2ef', p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>📥 Mailbox</Typography>
        <Divider sx={{ borderColor: '#dbe2ef33', mb: 1 }} />
        <List>
          <ListItem button selected>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Sent" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Spam" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Trash" />
          </ListItem>
        </List>
      </Box>

      {/* Main email content */}
      <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
        <Paper elevation={4} sx={{ maxWidth: 700, mx: 'auto', p: 3, background: '#112d4e', color: '#fff' }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            📧 Amazon Rewards Team
          </Typography>
          <Typography sx={{ color: '#dbe2ef', mb: 1 }}>
            <strong>Subject:</strong> Congratulations! You won a million dollar Amazon gift card.
          </Typography>
          <Divider sx={{ borderColor: '#dbe2ef33', my: 1 }} />
          <Typography sx={{ color: '#dbe2ef', mb: 2, lineHeight: 1.7 }}>
            Dear user,<br />
            We are excited to inform you that you have won an Amazon gift card worth $1,000,000!<br />
            To claim your reward, please click the link below and sign in.
          </Typography>
          <Button
            variant="text"
            sx={{ color: '#26ff00ff', fontWeight: 'bold', textDecoration: 'underline', fontSize: '1.05rem' }}
            onClick={handleOpenPhishPage}
          >
            👉 Click here to claim
          </Button>
        </Paper>
      </Box>

      {/* Modal */}
      <Modal open={visible} onClose={() => setVisible(false)}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0, 4, 255, 0.25)',
          p: 4,
          minWidth: 340,
          maxWidth: 420,
          border: '2px solid #00ff33ff',
          color: '#fff',
          background: 'linear-gradient(135deg, #1a2238 60%, #141236ff 100%)',
        }}>
          {!submitted ? (
            <>
              <Typography variant="h6" sx={{ mb: 2, color: '#f7f7f7ff', fontWeight: 'bold', textAlign: 'center', letterSpacing: 1, textShadow: '0 2px 8px #1a2238' }}>
                Amazon Sign In (Lab Simulation)
              </Typography>
              <TextField
                fullWidth
                label="Username / Email"
                value={formValues.username}
                onChange={e => setFormValues({ ...formValues, username: e.target.value })}
                sx={{ mb: 2, input: { color: '#fff' }, label: { color: '#ffffffff' } }}
                InputLabelProps={{ style: { color: '#ffffffff' } }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={formValues.password}
                onChange={e => setFormValues({ ...formValues, password: e.target.value })}
                sx={{ mb: 2, input: { color: '#fff' }, label: { color: '#ffffffff' } }}
                InputLabelProps={{ style: { color: '#ffffffff' } }}
              />
              <Button variant="contained" fullWidth onClick={handleSubmit} sx={{ background: 'linear-gradient(90deg, #00ff00ff, #1f9412ff)', color: '#fff', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 2px 8px #001aff99' }}>
                Login
              </Button>
            </>
          ) : (
            <>
              <Typography sx={{ mb: 1, color: '#00ff08ff', fontWeight: 'bold', textAlign: 'center', letterSpacing: 1, textShadow: '0 2px 8px #1a2238' }}>
                <strong>You entered:</strong>
              </Typography>
              <Typography sx={{ color: '#fff', fontFamily: 'monospace', mb: 1 }}>Username: {credentials.username}</Typography>
              <Typography sx={{ color: '#fff', fontFamily: 'monospace', mb: 2 }}>Password: {credentials.password}</Typography>
              <Typography color="error" sx={{ mt: 2, mb: 2, fontWeight: 'bold', textAlign: 'center', fontSize: '1.1rem', background: 'rgba(255,69,58,0.12)', borderRadius: 2, p: 1 }}>
                ⚠️ This is a phishing simulation! Never enter your credentials on untrusted sites.
              </Typography>
              <Button variant="outlined" onClick={() => setVisible(false)} sx={{ borderColor: '#00ff26ff', color: '#00ff66ff', fontWeight: 'bold' }}>
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </Box>
  );
};

export default PhishingRoom;
