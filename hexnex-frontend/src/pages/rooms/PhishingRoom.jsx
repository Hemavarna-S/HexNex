import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Tooltip,
  LinearProgress,
  Modal,
  Fade,
  Backdrop,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import phishingVector from '../../assets/phishing-vector.png';
import quizVector from '../../assets/quiz-vector.png';

// Sample phishing emails with flagged words/links
const phishingEmails = [
  {
    id: 1,
    sender: 'support@paypal-secure.com',
    subject: 'Urgent: Your PayPal account will be suspended!',
    body: `Dear User,

Your PayPal account will be suspended within 24 hours unless you verify your details immediately.

Please click the link below to confirm your account:
http://paypal-secure.com/verify

Thank you,
PayPal Support Team`,
    suspiciousParts: {
      sender: true,
      links: ['http://paypal-secure.com/verify'],
      phrases: ['suspended within 24 hours', 'verify your details immediately'],
    },
  },
  {
    id: 2,
    sender: 'admin@google-secure.com',
    subject: 'Google Account Password Reset Request',
    body: `Hello,

We received a password reset request for your Google account. If this wasn't you, please secure your account immediately.

Reset your password here:
https://google-secure.com/reset-password

Best,
Google Security Team`,
    suspiciousParts: {
      sender: true,
      links: ['https://google-secure.com/reset-password'],
      phrases: ['password reset request', 'secure your account immediately'],
    },
  },
];

// Quiz questions
const quizQuestions = [
  {
    question: 'Is the email sender "support@paypal-secure.com" suspicious?',
    options: ['Yes, it is suspicious', 'No, it looks safe'],
    answer: 0,
    explanation: 'The sender domain "paypal-secure.com" is a fake domain trying to look like "paypal.com".',
  },
  {
    question: 'Is it safe to click links with domains different from the official service?',
    options: ['Yes', 'No'],
    answer: 1,
    explanation: 'Phishing links often use similar but different domains. Always verify domain names.',
  },
  {
    question: 'Should you provide your credentials to login pages accessed via suspicious links?',
    options: ['Yes', 'No'],
    answer: 1,
    explanation: 'Never enter credentials on pages you arrived at from suspicious or unsolicited links.',
  },
];

const highlightStyle = {
  backgroundColor: 'rgba(255, 69, 0, 0.4)', // semi-transparent red highlight
  borderRadius: 2,
  cursor: 'help',
};

const PhishingRoom = () => {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [submittedData, setSubmittedData] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [quizActive, setQuizActive] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [flagRevealed, setFlagRevealed] = useState(false);
  const [submittedFlag, setSubmittedFlag] = useState('');
  const [flagFeedback, setFlagFeedback] = useState('');
  const PHISHING_FLAG = 'HEXNEX{Phishing_Awareness_Mastered}';

  // Helper: Highlight suspicious phrases inline in body text
  const renderEmailBody = (email) => {
    if (!email) return null;

    let bodyText = email.body;
    email.suspiciousParts.phrases.forEach((phrase) => {
      const regex = new RegExp(`(${phrase})`, 'gi');
      bodyText = bodyText.replace(
        regex,
        `<span style="background-color: rgba(255,69,0,0.4); border-radius: 3px; cursor: help;" title="Suspicious phrase">$1</span>`
      );
    });
    email.suspiciousParts.links.forEach((link) => {
      const regex = new RegExp(link.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi'); // escape regex
      bodyText = bodyText.replace(
        regex,
        `<a href="#" class="suspicious-link" style="color:#ff6f61; font-weight:bold; cursor:pointer;" title="Suspicious Link">${link}</a>`
      );
    });

    return <Typography
      variant="body1"
      sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}
      dangerouslySetInnerHTML={{ __html: bodyText }}
      onClick={(e) => {
        if (e.target.classList.contains('suspicious-link')) {
          e.preventDefault();
          alert('⚠️ Warning: This is a suspicious link! Never click unknown links.');
        }
      }}
    />;
  };

  const handleEmailSelect = (email) => {
    setSelectedEmail(email);
    setFeedback('');
    setSubmittedData(null);
    setLoginData({ username: '', password: '' });
    setQuizActive(false);
    setQuizIndex(0);
    setQuizScore(0);
  };

  const handleEmailClick = () => {
    setShowLoginModal(true);
  };

  const handleLoginSubmit = () => {
    if (!loginData.username || !loginData.password) {
      setFeedback('Please fill both fields to continue.');
      return;
    }
    setShowLoginModal(false);
    setSubmittedData(loginData);
    setShowModal(true);
  };

  const handleQuizAnswer = (optionIndex) => {
    if (optionIndex === quizQuestions[quizIndex].answer) {
      setQuizScore((score) => score + 1);
    }
    setQuizIndex((i) => i + 1);
  };

  // Reveal flag if both exercises are completed
  useEffect(() => {
    if (submittedData && quizActive && quizIndex >= quizQuestions.length) {
      setFlagRevealed(true);
    }
  }, [submittedData, quizActive, quizIndex]);

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 4, md: 5 },
        color: '#fff',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a2238 0%, #0f1525 100%)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        userSelect: 'none',
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 6, mt: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
        
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{
              textAlign: 'center',
              background: 'linear-gradient(45deg, #ff453a, #ff6b81)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 2px 10px rgba(255, 69, 58, 0.3)',
              mt: 4,
              mb: 2,
            }}
          >
            🎣 Advanced Phishing Simulation Room
          </Typography>
        </motion.div>
      </Box>

      {/* Email selector with enhanced styling */}
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          mb: 5,
          overflowX: 'auto',
          pb: 2,
          px: 1,
          scrollbarWidth: 'thin',
          scrollbarColor: '#888 transparent',
          '&::-webkit-scrollbar': { height: 8 },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(136, 136, 136, 0.5)',
            borderRadius: 4,
            '&:hover': { backgroundColor: 'rgba(136, 136, 136, 0.7)' },
          },
        }}
      >
        {phishingEmails.map((email) => (
          <motion.div
            key={email.id}
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            onClick={() => handleEmailSelect(email)}
            style={{
              flex: '0 0 300px',
              cursor: 'pointer',
              borderRadius: 12,
              background: selectedEmail?.id === email.id
                ? 'linear-gradient(135deg, #ff453a 0%, #ff6b81 100%)'
                : 'rgba(26, 34, 56, 0.6)',
              padding: 24,
              boxShadow: selectedEmail?.id === email.id
                ? '0 8px 25px rgba(255, 69, 58, 0.4)'
                : '0 4px 15px rgba(0, 0, 0, 0.2)',
              color: selectedEmail?.id === email.id ? '#fff' : '#ddd',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Typography variant="subtitle2" gutterBottom noWrap>
              <Tooltip title={email.suspiciousParts.sender ? 'Suspicious sender email' : 'Sender email'}>
                <span>{email.sender}</span>
              </Tooltip>
            </Typography>
            <Typography variant="body1" fontWeight="bold" noWrap>
              {email.subject}
            </Typography>
          </motion.div>
        ))}
      </Box>

      {/* Selected Email Details */}
      {selectedEmail && (
        <Paper
          elevation={10}
          sx={{
            p: 4,
            background: 'rgba(26, 34, 56, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            mb: 4,
            maxWidth: 720,
            marginX: 'auto',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', textShadow: '0 0 8px #ff453a' }}>
            Subject: {selectedEmail.subject}
          </Typography>

          <Typography
            variant="subtitle2"
            sx={{ mb: 1, fontStyle: 'italic', opacity: 0.7, textAlign: 'center' }}
          >
            From: <span style={selectedEmail.suspiciousParts.sender ? { ...highlightStyle } : {}}>{selectedEmail.sender}</span>
          </Typography>

          {/* Body with highlights and clickable suspicious links */}
          {renderEmailBody(selectedEmail)}

          {/* URL Bar (simulated) */}
          <Box
            sx={{
              mt: 3,
              background: '#1a2238',
              borderRadius: 2,
              p: 1,
              fontFamily: 'monospace',
              color: '#ff453a',
              textAlign: 'center',
              cursor: 'default',
              userSelect: 'text',
            }}
          >
            {selectedEmail.suspiciousParts.links[0]}
          </Box>
        </Paper>
      )}

      {/* Fake Login Form */}
      {selectedEmail && !submittedData && !quizActive && (
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #ff453a, #ff6b81)',
              boxShadow: '0 4px 12px rgba(255, 69, 58, 0.4)',
              fontWeight: 'bold',
              px: 4,
              py: 1.5,
            }}
            onClick={handleEmailClick}
          >
            Verify Account Now
          </Button>
        </Box>
      )}

      <Modal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: { backdropFilter: 'blur(8px)' },
        }}
      >
        <Fade in={showLoginModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: '400px',
              bgcolor: '#1a2238',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(255, 69, 58, 0.2)',
              p: 4,
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: '#fff',
                    textShadow: '0 2px 10px rgba(255, 69, 58, 0.3)',
                    fontWeight: 'bold'
                  }}
                >
                  Account Verification Required
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#aaa',
                    mt: 1 
                  }}
                >
                  Please verify your account to continue
                </Typography>
              </Box>

              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                margin="normal"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 69, 58, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#ff453a',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#aaa',
                  },
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 69, 58, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#ff453a',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#aaa',
                  },
                }}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  background: 'linear-gradient(45deg, #ff453a, #ff6b81)',
                  boxShadow: '0 4px 12px rgba(255, 69, 58, 0.4)',
                  fontWeight: 'bold',
                  py: 1.5,
                  fontSize: '1.1rem',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #ff6b81, #ff453a)',
                    boxShadow: '0 6px 16px rgba(255, 69, 58, 0.6)',
                  },
                }}
                onClick={handleLoginSubmit}
              >
                Verify Account
              </Button>
              {feedback && (
                <Typography 
                  variant="body2" 
                  color="error" 
                  sx={{ 
                    mt: 2, 
                    textAlign: 'center',
                    animation: 'fadeIn 0.3s ease-in'
                  }}
                >
                  {feedback}
                </Typography>
              )}
            </motion.div>
          </Box>
        </Fade>
      </Modal>

      {/* Quiz Section */}
      {quizActive && quizIndex < quizQuestions.length && (
        <Box
          sx={{
            mt: 6,
            maxWidth: 600,
            mx: 'auto',
            p: 4,
            backgroundColor: 'rgba(26, 34, 56, 0.85)',
            borderRadius: 3,
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
            {quizQuestions[quizIndex].question}
          </Typography>
          {quizQuestions[quizIndex].options.map((option, idx) => (
            <Button
              key={idx}
              variant="outlined"
              fullWidth
              sx={{ my: 1, color: '#fff', borderColor: '#ff6f61' }}
              onClick={() => handleQuizAnswer(idx)}
            >
              {option}
            </Button>
          ))}
          <LinearProgress
            variant="determinate"
            value={(quizIndex / quizQuestions.length) * 100}
            sx={{ mt: 3, backgroundColor: '#333', '& .MuiLinearProgress-bar': { backgroundColor: '#ff6f61' } }}
          />
        </Box>
      )}

      {/* Quiz Summary */}
      {quizActive && quizIndex >= quizQuestions.length && (
        <Box
          sx={{
            mt: 6,
            maxWidth: 600,
            mx: 'auto',
            p: 4,
            textAlign: 'center',
            backgroundColor: 'rgba(26, 34, 56, 0.9)',
            borderRadius: 3,
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            Quiz Completed!
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Your Score: {quizScore} / {quizQuestions.length}
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setSelectedEmail(null);
              setQuizActive(false);
            }}
            sx={{
              mt: 2,
              background: 'linear-gradient(45deg,rgb(60, 98, 179),rgb(3, 18, 151))',
              color: '#000',
              fontWeight: 'bold',
            }}
          >
            Try Another Email
          </Button>
          {flagRevealed && (
            <Box sx={{ mt: 5, p: 3, borderRadius: 3, background: 'linear-gradient(90deg,#ff453a,#ffb347)', boxShadow: '0 4px 24px #ff453a44', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold', mb: 1, letterSpacing: 1 }}>
                🎉 Congratulations! You have completed both exercises.
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#fff', mb: 2 }}>
                Here is your flag:
              </Typography>
              <Paper elevation={6} sx={{ p: 2, background: '#222', color: '#ffb347', fontFamily: 'monospace', fontSize: '1.2rem', mb: 2, borderRadius: 2, letterSpacing: 1 }}>
                {PHISHING_FLAG}
              </Paper>
              <Box sx={{ width: '100%', maxWidth: 400, mt: 2 }}>
                <Typography variant="subtitle2" sx={{ color: '#fff', mb: 1 }}>
                  Submit the flag below to claim your achievement:
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Enter the Flag"
                  value={submittedFlag}
                  onChange={e => setSubmittedFlag(e.target.value)}
                  sx={{ background: '#fff1', borderRadius: 1, mb: 2, input: { color: '#fff' } }}
                  InputLabelProps={{ sx: { color: '#ffb347' } }}
                />
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{ fontWeight: 'bold', fontSize: '1.1rem', py: 1.2, background: 'linear-gradient(90deg,#43e97b,#38f9d7)' }}
                  onClick={() => {
                    if (submittedFlag.trim() === PHISHING_FLAG) {
                      setFlagFeedback('✅ Correct! You have mastered phishing awareness.');
                    } else {
                      setFlagFeedback('❌ Incorrect flag. Please try again.');
                    }
                  }}
                >
                  Submit Flag
                </Button>
                {flagFeedback && (
                  <Typography sx={{ mt: 2, color: flagFeedback.startsWith('✅') ? 'lime' : 'orange', fontWeight: 'bold', textAlign: 'center', fontSize: '1.1rem' }}>
                    {flagFeedback}
                  </Typography>
                )}
              </Box>
            </Box>
          )}
        </Box>
      )}

      {/* Modal - Data Captured Warning */}
      <Modal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setQuizActive(true);
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={showModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              borderRadius: 4,
              boxShadow: 24,
              p: 4,
              maxWidth: 400,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" color="error" gutterBottom>
              ⚠️ Your Data Has Been Captured!
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              This demonstrates how attackers can steal your credentials via phishing pages.
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setShowModal(false);
                setQuizActive(true);
              }}
              sx={{ mt: 2, backgroundColor: '#ff453a' }}
            >
              Start Awareness Quiz
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default PhishingRoom;

