// src/pages/rooms/components/ControlPanel.jsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Switch,
  Tooltip,
  Chip,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const ControlPanel = ({ isRunning, mitmActive, onStartStop, onToggleMITM }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [actionType, setActionType] = useState(null);

  // Open confirmation dialog before stopping or disabling MITM
  const handleActionClick = (type) => {
    setActionType(type);
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    if (actionType === 'stop') {
      onStartStop();
    } else if (actionType === 'toggleMITM') {
      onToggleMITM();
    }
    setConfirmOpen(false);
    setActionType(null);
  };

  const handleCancel = () => {
    setConfirmOpen(false);
    setActionType(null);
  };

  return (
    <Paper sx={{ p: 3, mt: 3, bgcolor: 'rgba(0,0,0,0.75)', color: 'white', borderRadius: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" color="secondary" gutterBottom>
          Control Panel
        </Typography>
        <Tooltip title="Simulation Status">
          <Chip
            label={isRunning ? 'Running' : 'Stopped'}
            color={isRunning ? 'success' : 'default'}
            size="small"
            sx={{ fontWeight: 'bold' }}
          />
        </Tooltip>
      </Box>

      {/* Progress bar when running */}
      {isRunning && <LinearProgress sx={{ mb: 2, borderRadius: 1 }} color="success" />}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 3,
          flexWrap: 'wrap',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Tooltip title={isRunning ? 'Stop the current simulation' : 'Start the simulation'}>
          <Button
            variant="contained"
            color={isRunning ? 'error' : 'primary'}
            onClick={() => handleActionClick('stop')}
            size="large"
            sx={{ minWidth: 160 }}
          >
            {isRunning ? 'Stop Simulation' : 'Start Simulation'}
          </Button>
        </Tooltip>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title={mitmActive ? 'Disable MITM attack' : 'Enable MITM attack'}>
            <Typography>MITM Attack</Typography>
          </Tooltip>
          <Switch
            checked={mitmActive}
            onChange={() => handleActionClick('toggleMITM')}
            color="secondary"
            disabled={!isRunning}
            inputProps={{ 'aria-label': 'toggle MITM attack' }}
          />
        </Box>

        <Tooltip title="Keyboard Shortcuts: S = Start/Stop, M = Toggle MITM">
          <IconButton sx={{ color: 'white' }} size="small">
            <InfoOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Recent actions/logs placeholder */}
      <Box
        sx={{
          maxHeight: 100,
          overflowY: 'auto',
          bgcolor: 'rgba(255,255,255,0.1)',
          borderRadius: 1,
          p: 1,
          fontSize: '0.85rem',
          fontFamily: 'monospace',
        }}
      >
        <Typography color="text.secondary" sx={{ fontStyle: 'italic', mb: 0.5 }}>
          Recent Actions:
        </Typography>
        <Typography>- Simulation {isRunning ? 'started' : 'stopped'}.</Typography>
        <Typography>- MITM Attack {mitmActive ? 'enabled' : 'disabled'}.</Typography>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={handleCancel}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to{' '}
            {actionType === 'stop' ? 'stop the simulation' : 'toggle the MITM attack'}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="error" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ControlPanel;
