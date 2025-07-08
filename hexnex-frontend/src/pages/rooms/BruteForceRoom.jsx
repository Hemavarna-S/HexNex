import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  TextField,
  Typography,
  Paper,
  Box,
  Snackbar,
  Alert,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  Stepper,
  Step,
  StepLabel,
  Divider,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyIcon from '@mui/icons-material/VpnKey';
import TerminalIcon from '@mui/icons-material/Terminal';
import CelebrationIcon from '@mui/icons-material/Celebration';
import Confetti from 'react-confetti';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

const BruteForceContainer = Paper;

const LogBox = styled(Box)({
  height: 240,
  overflowY: 'auto',
  background: '#101820',
  padding: '16px',
  borderRadius: '12px',
  fontFamily: "'Courier New', Courier, monospace",
  fontSize: '0.9rem',
  lineHeight: '1.4',
  whiteSpace: 'pre-wrap',
  color: 'white',
  border: '1px solid #333',
  boxShadow: 'inset 0 0 8px #00ffcc33',
});

const usernames = [
  'admin', 'jane.doe@techvault.com', 'john.smith', 'guest', 'root', 'alice', 'bob', 'charlie', 'eve', 'testuser', 'user1', 'user2', 'sysadmin', 'manager', 'support', 'service', 'qa', 'devops', 'intern', 'ceo'
];
const passwords = [
  'admin123', 'Password@123', 'welcome1', 'qwerty', 'letmein', '123456', 'password', 'passw0rd', 'abc123', 'iloveyou', 'monkey', 'dragon', 'sunshine', 'trustno1', 'superman', 'batman', 'spiderman', 'football', 'baseball', 'shadow', 'master', 'killer', 'hacker', 'freedom', 'whatever', 'starwars', 'ninja', 'princess', 'qazwsx', 'zaq12wsx', 'password1'
];
const correctCredentials = { username: 'admin', password: 'Password@123' };
const FLAG = 'HEXNEX{Brut3333___F0rc3d___F0lk5}';
const MAX_ATTEMPTS = 7;
const LOCKOUT_TIME = 10000; // 10 seconds

const BruteForceCTF = () => {
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [flag, setFlag] = useState(null);
  const [userInput, setUserInput] = useState({ username: '', password: '' });
  const [guessResult, setGuessResult] = useState(null);
  const [submittedFlag, setSubmittedFlag] = useState('');
  const [flagVerified, setFlagVerified] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [lockoutTimer, setLockoutTimer] = useState(0);
  const logBoxRef = useRef(null);

  useEffect(() => {
    if (logBoxRef.current) {
      logBoxRef.current.scrollTop = logBoxRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    let timer;
    if (locked && lockoutTimer > 0) {
      timer = setInterval(() => {
        setLockoutTimer((t) => {
          if (t <= 1) {
            setLocked(false);
            clearInterval(timer);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [locked, lockoutTimer]);

  const bruteForce = async () => {
    setIsRunning(true);
    setLogs([]);
    setFlag(null);
    setGuessResult(null);
    setFlagVerified(false);
    setAttempts(0);
    setLocked(false);
    setLockoutTimer(0);

    for (const username of usernames) {
      for (const password of passwords) {
        if (locked) {
          setLogs((prev) => [...prev, '🚫 Account locked due to too many failed attempts. Waiting...']);
          await new Promise((r) => setTimeout(r, LOCKOUT_TIME));
          setLocked(false);
          setLockoutTimer(0);
        }
        const attempt = `🔍 Trying ${username} / ${password}`;
        setLogs((prev) => [...prev, attempt]);
        await new Promise((r) => setTimeout(r, 400 + Math.random() * 600)); // random delay
        setAttempts((prev) => prev + 1);
        if (attempts + 1 >= MAX_ATTEMPTS) {
          setLocked(true);
          setLockoutTimer(LOCKOUT_TIME / 1000);
          setLogs((prev) => [...prev, '🚨 Too many failed attempts! Account temporarily locked.']);
          break;
        }
        if (
          username === correctCredentials.username &&
          password === correctCredentials.password
        ) {
          setLogs((prev) => [...prev, '✅ Success: Logged in!']);
          setFlag(FLAG);
          setIsRunning(false);
          return;
        }
      }
      if (locked) break;
    }
    setLogs((prev) => [...prev, '❌ Attack finished: No valid credentials found.']);
    setIsRunning(false);
  };

  const handleGuessSubmit = () => {
    if (locked) return;
    setGuessResult(null);
    setFlag(null);
    setIsRunning(true);
    setFlagVerified(false);
    setAttempts((prev) => prev + 1);
    if (attempts + 1 >= MAX_ATTEMPTS) {
      setLocked(true);
      setLockoutTimer(LOCKOUT_TIME / 1000);
      setLogs((prev) => [...prev, '🚨 Too many failed attempts! Account temporarily locked.']);
      setIsRunning(false);
      return;
    }
    setTimeout(() => {
      if (
        userInput.username === correctCredentials.username &&
        userInput.password === correctCredentials.password
      ) {
        setGuessResult('success');
        setFlag(FLAG);
      } else {
        setGuessResult('failure');
      }
      setIsRunning(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleFlagSubmit = () => {
    if (submittedFlag.trim() === FLAG) {
      setFlagVerified(true);
    } else {
      setFlagVerified(false);
    }
  };

  const steps = ['Enter credentials', 'Automate or Guess', 'Capture Flag', 'Submit Flag'];

  return (
    <BruteForceContainer
      elevation={10}
      sx={{
        padding: 5,
        marginTop: 6,
        maxWidth: 700,
        margin: 'auto',
        borderRadius: 5,
        background: 'linear-gradient(145deg, #0f2027, #203a43, #2c5364)',
        color: 'white',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        💻 Brute Force Attack Simulator
      </Typography>

      <Stepper activeStep={flag ? 2 : isRunning ? 1 : 0} alternativeLabel sx={{ my: 2 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              sx={{ '.MuiStepLabel-label': { color: 'white', fontWeight: 'bold' } }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Accordion defaultExpanded sx={{ mb: 2, backgroundColor: '#14212e' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
          <Typography sx={{ fontWeight: 'bold' }}>
            Try Your Own Guess <KeyIcon sx={{ ml: 1 }} />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              label="Username"
              variant="filled"
              size="small"
              fullWidth
              disabled={isRunning}
              value={userInput.username}
              onChange={(e) => setUserInput({ ...userInput, username: e.target.value })}
              InputProps={{
                style: { color: 'white' },
              }}
              InputLabelProps={{ sx: { color: 'white' } }}
              sx={{ backgroundColor: '#ffffff1f', borderRadius: 1 }}
            />
            <TextField
              label="Password"
              variant="filled"
              type="password"
              size="small"
              fullWidth
              disabled={isRunning}
              value={userInput.password}
              onChange={(e) => setUserInput({ ...userInput, password: e.target.value })}
              InputProps={{
                style: { color: 'white' },
              }}
              InputLabelProps={{ sx: { color: 'white' } }}
              sx={{ backgroundColor: '#ffffff1f', borderRadius: 1 }}
            />
            <Button
              variant="contained"
              color="success"
              disabled={isRunning || !userInput.username || !userInput.password}
              onClick={handleGuessSubmit}
            >
              {isRunning ? <CircularProgress size={20} color="inherit" /> : 'Try Guess'}
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Button
        fullWidth
        variant="outlined"
        color="warning"
        onClick={bruteForce}
        disabled={isRunning}
        sx={{ mb: 2 }}
      >
        {isRunning ? <CircularProgress size={24} color="inherit" /> : '🚀 Start Automated Attack'}
      </Button>

      <LogBox ref={logBoxRef}>
        {locked && (
          <Typography sx={{ color: 'orange', fontWeight: 'bold' }}>
            🚫 Account is locked. Please wait {lockoutTimer}s before trying again.
          </Typography>
        )}
        {logs.length === 0 && !locked
          ? 'Logs will appear here...'
          : logs.map((log, idx) => (
              <Typography
                key={idx}
                sx={{
                  color: log.includes('Success')
                    ? 'lime'
                    : log.includes('❌')
                    ? 'red'
                    : log.includes('locked')
                    ? 'orange'
                    : 'white',
                }}
              >
                {log}
              </Typography>
            ))}
      </LogBox>

      {guessResult === 'success' && (
        <Alert severity="success" sx={{ mt: 2 }}>
          🎯 Correct Credentials! Flag Captured: <code>{FLAG}</code>
        </Alert>
      )}
      {guessResult === 'failure' && (
        <Alert severity="error" sx={{ mt: 2 }}>
          ❌ Incorrect credentials. Try again.
        </Alert>
      )}

      {flag && (
        <>
          <Divider sx={{ my: 3, backgroundColor: '#fff3' }} />
          <Typography variant="h6" gutterBottom>
            Submit the Flag Below:
          </Typography>

          <TextField
            fullWidth
            label="Enter the Flag"
            variant="outlined"
            value={submittedFlag}
            onChange={(e) => setSubmittedFlag(e.target.value)}
            InputLabelProps={{ sx: { color: 'white' } }}
            inputProps={{ style: { color: 'white' } }}
            sx={{ backgroundColor: '#ffffff1a', borderRadius: 1, mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
              
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleFlagSubmit}
            fullWidth
            disabled={!submittedFlag}
          >
            ✅ Submit Flag
          </Button>
        </>
      )}

      {flagVerified && (
        <Typography variant="h5" sx={{ mt: 4, color: '#f9d923', textAlign: 'center' }}>
          🎉 Correct Flag! <CelebrationIcon fontSize="large" />
        </Typography>
      )}

      {flagVerified && <Confetti width={window.innerWidth} height={window.innerHeight} />}
    </BruteForceContainer>
  );
};

export default BruteForceCTF;
