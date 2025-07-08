// src/pages/rooms/components/TrafficMonitor.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Paper, Tooltip, Button, LinearProgress } from '@mui/material';

const TrafficMonitor = ({ packets, animationSpeed = 3 }) => {
  const [paused, setPaused] = useState(false);
  const [packetsWithId, setPacketsWithId] = useState([]);
  const containerRef = useRef(null);

  // To give unique key for animations restart (helps when packets change)
  useEffect(() => {
    // Assign a unique animationId per packet for key & animation delay variation
    const withId = packets.map((pkt, i) => ({
      ...pkt,
      animationId: `${pkt.id}-${Date.now()}`,
      size: 12 + Math.random() * 12, // random size 12-24
      speedFactor: 0.5 + Math.random(), // speed multiplier
    }));
    setPacketsWithId(withId);
  }, [packets]);

  // Count intercepted packets for stats
  const interceptedCount = packetsWithId.filter((p) => p.intercepted).length;
  const totalCount = packetsWithId.length;
  const interceptedRatio = totalCount ? (interceptedCount / totalCount) * 100 : 0;

  return (
    <Paper sx={{ p: 3, mt: 3, bgcolor: 'rgba(0,0,0,0.7)', color: 'white' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <Typography variant="h6" color="secondary">
          Traffic Monitor
        </Typography>
        <Button variant="outlined" size="small" onClick={() => setPaused((p) => !p)}>
          {paused ? 'Resume' : 'Pause'}
        </Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="body2" color="gray">
          Total Packets: {totalCount}
        </Typography>
        <Typography variant="body2" color="error">
          Intercepted: {interceptedCount} ({interceptedRatio.toFixed(1)}%)
        </Typography>
      </Box>

      <Box
        ref={containerRef}
        sx={{
          position: 'relative',
          height: 180,
          borderRadius: 2,
          bgcolor: 'rgba(255,255,255,0.05)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          px: 2,
        }}
      >
        {/* Client label */}
        <Box
          sx={{
            width: 100,
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'lime',
            userSelect: 'none',
          }}
        >
          Client
        </Box>

        {/* Animated path container */}
        <Box
          sx={{
            flexGrow: 1,
            height: 100,
            position: 'relative',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
            borderRadius: 2,
            filter: 'drop-shadow(0 0 2px #00ff00)',
          }}
        >
          {/* SVG curved path (for visual reference) */}
          <svg
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
            viewBox="0 0 300 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 10 80 C 100 10, 200 10, 290 80"
              stroke="lime"
              strokeWidth="2"
              fill="none"
              strokeDasharray="8 6"
              strokeLinecap="round"
            />
          </svg>

          {/* Packets moving along curved path */}
          {packetsWithId.map((pkt, idx) => {
            // Animation duration influenced by speedFactor and global speed
            const duration = animationSpeed / pkt.speedFactor;

            // Delay packets staggered by index to avoid clustering
            const delay = idx * 0.6;

            // Intercepted packets have glow + pulse
            const glowColor = pkt.intercepted ? 'rgba(255, 0, 0, 0.7)' : 'rgba(0, 255, 0, 0.6)';

            return (
              <Tooltip
                key={pkt.animationId}
                title={
                  <>
                    <div>
                      <b>Packet #{pkt.id}</b>
                    </div>
                    <div>
                      <b>Source:</b> {pkt.source}
                    </div>
                    <div>
                      <b>Destination:</b> {pkt.destination}
                    </div>
                    <div>
                      <b>Content:</b> {pkt.content}
                    </div>
                    <div>
                      <b>Status:</b>{' '}
                      <span style={{ color: pkt.intercepted ? 'red' : 'lime' }}>
                        {pkt.intercepted ? 'Intercepted' : 'Safe'}
                      </span>
                    </div>
                  </>
                }
                arrow
                placement="top"
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: pkt.size,
                    height: pkt.size,
                    backgroundColor: pkt.intercepted ? '#ff4c4c' : '#7fff00',
                    borderRadius: '50%',
                    boxShadow: `0 0 8px 2px ${glowColor}`,
                    animationName: paused ? 'none' : 'moveCurve',
                    animationTimingFunction: 'linear',
                    animationIterationCount: 'infinite',
                    animationDuration: `${duration}s`,
                    animationDelay: `${delay}s`,
                    filter: pkt.intercepted
                      ? 'drop-shadow(0 0 6px #ff0000) saturate(150%)'
                      : 'drop-shadow(0 0 5px #7fff00)',
                    cursor: 'pointer',
                  }}
                />
              </Tooltip>
            );
          })}
        </Box>

        {/* Server label */}
        <Box
          sx={{
            width: 100,
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'tomato',
            userSelect: 'none',
          }}
        >
          Server
        </Box>
      </Box>

      {/* Progress bar showing intercepted ratio */}
      <Box sx={{ mt: 2 }}>
        <LinearProgress
          variant="determinate"
          value={interceptedRatio}
          sx={{
            height: 8,
            borderRadius: 4,
            bgcolor: 'rgba(255, 0, 0, 0.2)',
            '& .MuiLinearProgress-bar': {
              bgcolor: 'red',
            },
          }}
        />
      </Box>

      {/* Keyframes for curved movement animation */}
      <style>{`
        @keyframes moveCurve {
          0% {
            transform: translate(10px, 80px);
          }
          25% {
            transform: translate(90px, 30px);
          }
          50% {
            transform: translate(160px, 20px);
          }
          75% {
            transform: translate(240px, 40px);
          }
          100% {
            transform: translate(290px, 80px);
          }
        }
      `}</style>
    </Paper>
  );
};

export default TrafficMonitor;
