import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import RadarIcon from '@mui/icons-material/Radar';
import VerifiedIcon from '@mui/icons-material/Verified';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

import { mockPackets } from '../../utils/mockData';
import ControlPanel from './components/ControlPanel';
import TrafficMonitor from './components/TrafficMonitor';
import PacketSniffer from './components/PacketSniffer';
import CertificateForge from './components/CertificateForge';

const REQUIRED_INTERCEPTED_PACKETS = 6;
const ROOM_FLAG = 'HEXNEX{M1TM_C3RT_1NT3RC3PT}';

const MITMRoom = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [mitmActive, setMitmActive] = useState(false);
  const [packets, setPackets] = useState([]);
  const [packetCursor, setPacketCursor] = useState(0);
  const [nextId, setNextId] = useState(1);
  const [capturedSecret, setCapturedSecret] = useState('');
  const [flagInput, setFlagInput] = useState('');
  const [roomCompleted, setRoomCompleted] = useState(false);
  const [feedback, setFeedback] = useState({ type: 'info', message: '' });
  const [certForged, setCertForged] = useState(false);

  const interceptedPackets = useMemo(
    () => packets.filter((pkt) => pkt.intercepted).length,
    [packets]
  );

  const progress = Math.min(
    (interceptedPackets / REQUIRED_INTERCEPTED_PACKETS) * 100,
    100
  );

  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }

    const timer = setInterval(() => {
      const source = mockPackets[packetCursor % mockPackets.length];
      const hasCredentialsPayload = Math.random() > 0.72;

      const baseContent = hasCredentialsPayload
        ? `POST /auth/login user=student_${nextId}&token=tkn_${nextId.toString(16)}ab`
        : source.content;

      // determine interception and readable state
      let intercepted = mitmActive ? Math.random() > 0.35 : false;
      let readable = false;
      let tampered = false;
      let displayContent = baseContent;

      const protocol = source.protocol || 'HTTP';

      if (protocol === 'HTTPS') {
        // When HTTPS: interception may place MITM but decryption requires forged cert
        if (intercepted) {
          readable = certForged ? Math.random() > 0.2 : false; // even with forge, sometimes can't decrypt
          if (!readable) {
            displayContent = '[TLS Encrypted]';
          } else {
            // possible tampering once decrypted
            if (Math.random() > 0.7) {
              tampered = true;
              displayContent = baseContent.replace(/tkn_[0-9a-f]+/i, (m) => (m ? `${m}_MOD` : m));
            }
          }
        } else {
          displayContent = '[TLS Encrypted]';
        }
      } else {
        // Non-TLS traffic is readable by default when intercepted
        readable = intercepted || !mitmActive;
        if (intercepted && Math.random() > 0.8) {
          tampered = true;
          displayContent = baseContent.replace(/(token=|tkn_)[A-Za-z0-9_]+/i, 'token=MODIFIED');
        }
      }

      const packet = {
        id: nextId,
        protocol: protocol,
        source: source.sourceIP,
        destination: source.destinationIP,
        content: baseContent,
        displayContent,
        intercepted,
        readable,
        tampered,
      };

      setPackets((prev) => {
        const updated = [...prev, packet];
        return updated.slice(-30);
      });

      if (intercepted && readable && hasCredentialsPayload && !capturedSecret) {
        setCapturedSecret(ROOM_FLAG);
        setFeedback({
          type: 'success',
          message: 'Sensitive login payload intercepted and decrypted. Flag fragment recovered.',
        });
      }

      setPacketCursor((prev) => prev + 1);
      setNextId((prev) => prev + 1);
    }, 900);

    return () => clearInterval(timer);
  }, [isRunning, mitmActive, packetCursor, nextId, capturedSecret]);

  useEffect(() => {
    const handleShortcuts = (event) => {
      const key = event.key.toLowerCase();
      if (key === 's') {
        setIsRunning((prev) => !prev);
      }
      if (key === 'm') {
        setMitmActive((prev) => (isRunning ? !prev : prev));
      }
    };

    window.addEventListener('keydown', handleShortcuts);
    return () => window.removeEventListener('keydown', handleShortcuts);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
    if (isRunning) {
      setFeedback({ type: 'info', message: 'Simulation paused.' });
    } else {
      setFeedback({ type: 'info', message: 'Simulation started.' });
    }
  };

  const handleToggleMITM = () => {
    setMitmActive((prev) => !prev);
    setFeedback({
      type: 'warning',
      message: !mitmActive ? 'MITM interception enabled.' : 'MITM interception disabled.',
    });
  };

  const handleFlagSubmit = () => {
    if (!capturedSecret) {
      setFeedback({
        type: 'warning',
        message: 'Capture a sensitive packet first to reveal the room flag.',
      });
      return;
    }

    if (interceptedPackets < REQUIRED_INTERCEPTED_PACKETS) {
      setFeedback({
        type: 'warning',
        message: `Intercept at least ${REQUIRED_INTERCEPTED_PACKETS} packets before submitting.`,
      });
      return;
    }

    if (flagInput.trim() === ROOM_FLAG) {
      setRoomCompleted(true);
      setFeedback({ type: 'success', message: 'Flag accepted. MITM room completed.' });
      return;
    }

    setFeedback({ type: 'error', message: 'Incorrect flag. Check the intercepted credential payload again.' });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 5,
        background: 'radial-gradient(circle at top, #152238 0%, #090d17 45%, #04050a 100%)',
      }}
    >
      <Container maxWidth="lg">
        <Card
          sx={{
            background: 'rgba(13, 18, 29, 0.85)',
            border: '1px solid rgba(104, 172, 255, 0.22)',
            color: '#e8f1ff',
            backdropFilter: 'blur(8px)',
            borderRadius: 3,
            mb: 3,
          }}
        >
          <CardContent>
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" gap={2}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  <RadarIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Man-In-The-Middle Room
                </Typography>
                <Typography variant="body1" sx={{ color: '#b6c6e4' }}>
                  Start the simulation, enable MITM, inspect packets, and submit the recovered flag.
                </Typography>
              </Box>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                  icon={roomCompleted ? <VerifiedIcon /> : <ReportGmailerrorredIcon />}
                  color={roomCompleted ? 'success' : 'primary'}
                  label={roomCompleted ? 'Room Completed' : 'In Progress'}
                />
              </Stack>
            </Stack>

            <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.12)' }} />

            <Typography variant="body2" sx={{ color: '#9db1d8', mb: 1 }}>
              Intercept progress: {interceptedPackets}/{REQUIRED_INTERCEPTED_PACKETS}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progress}
              color={progress === 100 ? 'success' : 'secondary'}
              sx={{ height: 8, borderRadius: 8, bgcolor: 'rgba(255,255,255,0.12)' }}
            />
          </CardContent>
        </Card>

        <ControlPanel
          isRunning={isRunning}
          mitmActive={mitmActive}
          onStartStop={handleStartStop}
          onToggleMITM={handleToggleMITM}
        />

        <TrafficMonitor packets={packets} animationSpeed={2.7} />
        <PacketSniffer packets={packets} />
        <CertificateForge onForgeChange={(val) => setCertForged(val)} />

        <Card
          sx={{
            mt: 3,
            background: 'rgba(11, 17, 30, 0.86)',
            border: '1px solid rgba(136, 192, 255, 0.2)',
            color: '#ecf2ff',
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Flag Submission
            </Typography>
            <Typography variant="body2" sx={{ color: '#b8c7e8', mb: 2 }}>
              Recover the full flag from intercepted traffic and submit it here.
            </Typography>

            {capturedSecret ? (
              <Alert severity="success" sx={{ mb: 2 }}>
                Captured secret payload: <strong>{capturedSecret}</strong>
              </Alert>
            ) : (
              <Alert severity="info" sx={{ mb: 2 }}>
                No secret payload yet. Enable MITM and watch intercepted packets with auth data.
              </Alert>
            )}

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="Enter flag"
                placeholder="HEXNEX{...}"
                value={flagInput}
                onChange={(e) => setFlagInput(e.target.value)}
                sx={{
                  '& .MuiInputBase-root': { color: '#fff' },
                  '& .MuiInputLabel-root': { color: '#b6c6e4' },
                }}
              />
              <Button variant="contained" onClick={handleFlagSubmit} sx={{ minWidth: 170 }}>
                Submit Flag
              </Button>
            </Stack>

            {feedback.message ? (
              <Alert severity={feedback.type} sx={{ mt: 2 }}>
                {feedback.message}
              </Alert>
            ) : null}

            {roomCompleted ? (
              <Button
                sx={{ mt: 2 }}
                variant="outlined"
                color="success"
                onClick={() => {
                  window.location.href = '/rooms';
                }}
              >
                Return To Rooms
              </Button>
            ) : null}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default MITMRoom;
