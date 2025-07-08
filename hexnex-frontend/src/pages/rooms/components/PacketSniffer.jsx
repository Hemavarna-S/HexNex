import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Paper,
  Box,
  TextField,
  Tooltip,
  IconButton,
  Switch,
  FormControlLabel,
  Chip,
  Snackbar,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const PacketSniffer = ({ packets = [] }) => {
  const [displayPackets, setDisplayPackets] = useState([]);
  const [filterIntercepted, setFilterIntercepted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!Array.isArray(packets)) return;

    setDisplayPackets([]); // reset
    let i = 0;
    let isMounted = true;

    const interval = setInterval(() => {
      if (!isMounted) return;
      if (i < packets.length) {
        setDisplayPackets((prev) => [...prev, packets[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 600);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [packets]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayPackets]);

  const filteredPackets = displayPackets.filter((pkt) => {
    if (!pkt) return false;

    const term = searchTerm.toLowerCase();
    const contentMatch = pkt.content?.toLowerCase().includes(term);
    const sourceMatch = pkt.source?.toLowerCase().includes(term);
    const destMatch = pkt.destination?.toLowerCase().includes(term);

    if (filterIntercepted && !pkt.intercepted) return false;
    return contentMatch || sourceMatch || destMatch;
  });

  const copyToClipboard = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return (
    <Paper
      ref={containerRef}
      sx={{
        p: 2,
        mt: 3,
        bgcolor: 'rgba(0,0,0,0.75)',
        color: 'white',
        maxHeight: 400,
        overflowY: 'auto',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" color="secondary">
          Packet Sniffer (Live Interception Log)
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={filterIntercepted}
              onChange={() => setFilterIntercepted((prev) => !prev)}
              color="secondary"
            />
          }
          label="Show Only Intercepted"
          sx={{ userSelect: 'none' }}
        />
      </Box>

      <TextField
        size="small"
        fullWidth
        variant="outlined"
        placeholder="Search by content, source, or destination..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          mb: 2,
          bgcolor: 'rgba(255,255,255,0.1)',
          borderRadius: 1,
          '& input': { color: 'white' },
        }}
      />

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: 'white' }}>ID</TableCell>
            <TableCell sx={{ color: 'white' }}>Source</TableCell>
            <TableCell sx={{ color: 'white' }}>Destination</TableCell>
            <TableCell sx={{ color: 'white' }}>Content</TableCell>
            <TableCell sx={{ color: 'white', textAlign: 'center' }}>Intercepted?</TableCell>
            <TableCell sx={{ color: 'white', textAlign: 'center' }}>Copy</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredPackets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ color: 'gray', fontStyle: 'italic' }}>
                No packets match your filters.
              </TableCell>
            </TableRow>
          ) : (
            filteredPackets.map((pkt) => (
              <TableRow
                key={pkt?.id || Math.random()}
                sx={{
                  bgcolor: pkt?.intercepted ? 'rgba(255, 69, 58, 0.2)' : 'transparent',
                  transition: 'background-color 0.4s',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                }}
              >
                <TableCell>{pkt?.id}</TableCell>
                <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleIcon color="success" fontSize="small" />
                  {pkt?.source || 'N/A'}
                </TableCell>
                <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WarningAmberIcon color={pkt?.intercepted ? 'error' : 'disabled'} fontSize="small" />
                  {pkt?.destination || 'N/A'}
                </TableCell>
                <TableCell sx={{ fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                  {pkt?.content || 'N/A'}
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={pkt?.intercepted ? 'Yes' : 'No'}
                    color={pkt?.intercepted ? 'error' : 'success'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Copy packet content">
                    <IconButton
                      size="small"
                      onClick={() => copyToClipboard(pkt?.content)}
                      sx={{ color: 'white' }}
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        message="Packet content copied!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Paper>
  );
};

PacketSniffer.propTypes = {
  packets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      source: PropTypes.string,
      destination: PropTypes.string,
      content: PropTypes.string,
      intercepted: PropTypes.bool,
    })
  ),
};

export default PacketSniffer;
