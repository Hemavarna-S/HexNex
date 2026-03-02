import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Card, CardContent, Button, IconButton, Avatar, Box } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import ForwardIcon from '@mui/icons-material/Forward';
import ArchiveIcon from '@mui/icons-material/Archive';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const emails = [
  { id: '1', sender: 'Facebook', subject: 'You have 5 new notifications', date: 'Jul 20', body: 'Your Facebook account has updates. Click links to view.' },
  { id: '2', sender: 'Hexnex Rewards Team', subject: '🎉 Congratulations! You won a million dollar Amazon gift card.', date: 'Jul 19', phishing: true, body: 'Claim your prize by visiting the link below.' },
  { id: '3', sender: 'Netflix', subject: 'Your subscription is about to renew', date: 'Jul 18', body: 'Your plan will renew soon.' },
];

const MailView = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const mail = emails.find(e => e.id === String(id));

  if (!mail) {
    return (
      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Typography variant="h6">Mail not found</Typography>
        <Button onClick={() => nav(-1)} sx={{ mt: 2 }}>Back</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card elevation={1} sx={{ borderRadius: 2 }}>
        <CardContent sx={{ p: 0 }}>
          {/* Toolbar */}
          <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1, borderBottom: '1px solid #eceff1', bgcolor: '#fafafa' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small" aria-label="reply"><ReplyIcon /></IconButton>
              <IconButton size="small" aria-label="forward"><ForwardIcon /></IconButton>
              <IconButton size="small" aria-label="archive"><ArchiveIcon /></IconButton>
            </Box>
            <Box sx={{ ml: 2 }}>
              <Button size="small" onClick={() => nav(-1)}>Back to Inbox</Button>
            </Box>
            <Box sx={{ ml: 'auto' }}>
              <IconButton size="small" aria-label="more"><MoreVertIcon /></IconButton>
            </Box>
          </Box>

          {/* Header */}
          <Box sx={{ p: 3, borderBottom: '1px solid #f1f3f4' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{mail.subject}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: '#c7d2fe', width: 40, height: 40 }}>{mail.sender.charAt(0)}</Avatar>
              <Box>
                <Typography sx={{ fontWeight: 700 }}>{mail.sender}</Typography>
                <Typography variant="body2" color="text.secondary">to me — {mail.date}</Typography>
              </Box>
            </Box>
          </Box>

          {/* Body */}
          <Box sx={{ p: 3 }}>
            <Typography sx={{ whiteSpace: 'pre-line', color: '#202124', mb: 2, lineHeight: 1.6 }}>{mail.body}</Typography>

            {mail.phishing && (
              <Box sx={{ mt: 1 }}>
                <Button variant="text" href="#" onClick={(e) => { e.preventDefault(); nav('/fake/amazon'); }} sx={{ color: '#1a73e8', fontWeight: 600 }}>
                  https://hexnex-rewards.example.com/claim
                </Button>
                <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#5f6368' }}>This link is part of the simulation — do not use real credentials.</Typography>
              </Box>
            )}
          </Box>

          {/* Actions */}
          <Box sx={{ p: 2, borderTop: '1px solid #eceff1', display: 'flex', gap: 1 }}>
            <Button variant="outlined" size="small" onClick={() => nav(-1)}>Back</Button>
            <Button variant="contained" size="small" color="primary" onClick={() => nav('/fake/amazon')}>Open Link</Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default MailView;
