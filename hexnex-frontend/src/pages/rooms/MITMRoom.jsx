import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Divider,
  Tooltip,
  Snackbar,
  Alert,
  IconButton,
  TextField,
  Collapse,
  Paper
} from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import TerminalIcon from '@mui/icons-material/Terminal';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CoffeeIcon from '@mui/icons-material/LocalCafe';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import CloudIcon from '@mui/icons-material/Cloud';
import SecurityIcon from '@mui/icons-material/Security';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import CelebrationIcon from '@mui/icons-material/Celebration';

const MITMRoom = () => {
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const [logs, setLogs] = useState([]);
  const [flagInput, setFlagInput] = useState('');
  const [flagSuccess, setFlagSuccess] = useState(false);
  const [livePackets, setLivePackets] = useState([]);
  const [sniffing, setSniffing] = useState(false);

  // Simulate real-time packet capture
  useEffect(() => {
    let interval;
    if (sniffing) {
      interval = setInterval(() => {
        const fakePackets = [
          'TLS Handshake: Client Hello',
          'TLS Handshake: Server Hello',
          'HTTP GET /api/data',
          'HTTP 200 OK',
          'RTSP Stream: Camera Frame',
          'ARP Reply: 192.168.1.1 is at 00:11:22:33:44:55',
          'JS Payload Injected',
          'SSL Downgrade Detected',
          'IoT Device Command: Brew Coffee',
          'Packet: Encrypted Data',
        ];
        const pkt = fakePackets[Math.floor(Math.random() * fakePackets.length)];
        setLivePackets((prev) => [
          { time: new Date().toLocaleTimeString(), pkt },
          ...prev.slice(0, 19),
        ]);
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [sniffing]);

  const handleSimulate = (action) => {
    let message = '';
    let severity = 'info';

    switch (action) {
      case 'arpSpoof':
        message = 'ARP Spoofing initiated between Laptop and Cloud Dashboard...';
        break;
      case 'sslStrip':
        message = 'SSL Stripping in progress. Downgrading HTTPS to HTTP...';
        severity = 'warning';
        break;
      case 'packetCapture':
        message = 'Capturing packets. Monitoring traffic on port 443 and 80...';
        severity = 'success';
        setSniffing(true);
        setNotification({ open: true, message, severity });
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
        // Add the flag to the logs after a short delay to simulate discovery
        setTimeout(() => {
          setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] 🚩 FLAG FOUND: HEXNEX{Man_____In____Th33333___Middl3333___}`]);
        }, 4000);
        return;
      case 'injectPayload':
        message = 'Injecting malicious JavaScript into Cloud Dashboard responses...';
        severity = 'error';
        break;
      case 'iotBreach':
        message = 'Gained control of Smart Coffee Machine and IP Camera...';
        severity = 'success';
        break;
      default:
        break;
    }

    setNotification({ open: true, message, severity });
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const handleClose = () => {
    setNotification({ ...notification, open: false });
  };

  const handleFlagSubmit = () => {
    const correctFlag = 'HEXNEX{Man_____In____Th33333___Middl3333___}';
    if (flagInput.trim() === correctFlag) {
      setFlagSuccess(true);
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] 🎉 FLAG CAPTURED!`]);
      setNotification({ open: true, message: 'Correct flag submitted! Party hat activated!', severity: 'success' });
    } else {
      setNotification({ open: true, message: 'Incorrect flag. Try again.', severity: 'error' });
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#121212', minHeight: '100vh', color: '#fff' }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
        🕵️‍♂️ MITM Attack Simulation Lab
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Simulate a real-world Man-in-the-Middle attack in a controlled smart office environment. Learn how data interception, SSL stripping, and payload injection compromise sensitive systems.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: '#1e1e1e' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom><LaptopMacIcon /> Employee Laptop</Typography>
                  <Typography variant="body2">Connects to internal cloud dashboard over HTTPS</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Tooltip title="Spoof ARP between Laptop and Cloud">
                    <Button variant="outlined" fullWidth onClick={() => handleSimulate('arpSpoof')}>Start ARP Spoof</Button>
                  </Tooltip>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: '#1e1e1e' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom><CloudIcon /> Internal Cloud Dashboard</Typography>
                  <Typography variant="body2">Hosts APIs and web access for internal services</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Tooltip title="Strip SSL and monitor HTTP">
                    <Button variant="outlined" fullWidth onClick={() => handleSimulate('sslStrip')}>Enable SSLStrip</Button>
                  </Tooltip>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: '#1e1e1e' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom><CameraAltIcon /> IP Camera</Typography>
                  <Typography variant="body2">Streams via RTSP protocol with basic auth</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Tooltip title="Simulate IoT Takeover">
                    <Button variant="outlined" fullWidth onClick={() => handleSimulate('iotBreach')}>Breach IoT Devices</Button>
                  </Tooltip>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ backgroundColor: '#1e1e1e' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom><NetworkCheckIcon /> Packet Sniffing</Typography>
                  <Typography variant="body2">Live capture of network traffic between devices</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Tooltip title="Capture Traffic">
                    <Button variant="outlined" fullWidth onClick={() => handleSimulate('packetCapture')} disabled={sniffing}>
                      {sniffing ? 'Capturing...' : 'Capture Packets'}
                    </Button>
                  </Tooltip>
                  {sniffing && (
                    <Box sx={{ mt: 2, maxHeight: 120, overflowY: 'auto', bgcolor: '#181818', borderRadius: 1, p: 1 }}>
                      {livePackets.length === 0 && <Typography color="gray">No packets yet...</Typography>}
                      {livePackets.map((p, i) => (
                        <Typography key={i} sx={{ fontFamily: 'monospace', fontSize: 13, color: '#ffb300' }}>
                          [{p.time}] {p.pkt}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ backgroundColor: '#1e1e1e' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom><TerminalIcon /> Malicious Payload</Typography>
                  <Typography variant="body2">Inject JS Keylogger or reverse shell</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Tooltip title="Inject Payload into Response">
                    <Button variant="outlined" color="error" fullWidth onClick={() => handleSimulate('injectPayload')}>Inject Payload</Button>
                  </Tooltip>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Logs and Flag Panel */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, backgroundColor: '#1a1a1a', height: '100%' }}>
            <Typography variant="h6" gutterBottom>📋 Live Attack Log</Typography>
            <Box sx={{ maxHeight: 300, overflowY: 'auto', mb: 2, fontSize: '0.85rem', whiteSpace: 'pre-line' }}>
              {logs.map((log, i) => <Typography key={i} sx={{ mb: 0.5 }}>{log}</Typography>)}
            </Box>

            <Typography variant="h6" gutterBottom>🚩 Submit the Flag</Typography>
            <TextField
              fullWidth
              placeholder="HEXNEX{...}"
              value={flagInput}
              onChange={(e) => setFlagInput(e.target.value)}
              variant="outlined"
              sx={{ mb: 1 }}
              disabled={flagSuccess}
            />
            <Button variant="contained" color="secondary" fullWidth onClick={handleFlagSubmit} disabled={flagSuccess}>
              Submit Flag
            </Button>

            <Collapse in={flagSuccess}>
              <Box sx={{ mt: 3, textAlign: 'center', animation: 'pop 0.5s ease' }}>
                <CelebrationIcon sx={{ fontSize: 60, color: 'gold' }} />
                <Typography variant="h6" sx={{ color: 'lime' }}>Flag Captured! 🎉</Typography>
              </Box>
            </Collapse>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MITMRoom;
