import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Chip
} from '@mui/material';
import axiosInstance from '../utils/api';
const AIBotChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [tool, setTool] = useState('General');
  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: 'user', text: input }]);
    try {
      const res = await axiosInstance.post('/ai/hexnexai', {
        question: input,
        tool,
      });
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: res.data.answer || 'No response received.' },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Error: Unable to reach server.' },
      ]);
    }
    setInput('');
  };
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        🧠 Cybersecurity AI Chatbot
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        {['General', 'YARA', 'Scapy', 'OpenCTI', 'Metasploit'].map((t) => (
          <Chip
            key={t}
            label={t}
            color={tool === t ? 'primary' : 'default'}
            onClick={() => setTool(t)}
            sx={{ cursor: 'pointer' }}
          />
        ))}
      </Box>
      <Paper elevation={3} sx={{ p: 2, height: 300, overflowY: 'auto', mb: 2 }}>
        {messages.map((msg, idx) => (
          <Typography
            key={idx}
            sx={{
              color: msg.sender === 'user' ? '#1565c0' : '#2e7d32',
              mb: 1,
            }}
          >
            <strong>{msg.sender === 'user' ? 'You' : 'CyberBot'}:</strong>{' '}
            {msg.text}
          </Typography>
        ))}
      </Paper>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          label="Ask about cybersecurity..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button variant="contained" onClick={sendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
};
export default AIBotChat;
