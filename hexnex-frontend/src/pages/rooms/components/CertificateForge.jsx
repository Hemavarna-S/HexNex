// src/pages/rooms/components/CertificateForge.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  IconButton,
  Stack,
  Grow,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { legitCertificate, forgeCertificate } from '../../../utils/mockData';

const CertificateForge = () => {
  const [certificate, setCertificate] = useState(legitCertificate);
  const [isForged, setIsForged] = useState(false);
  const [forgeOptions, setForgeOptions] = useState({
    changeSubject: true,
    revoke: true,
    fakeIssuer: true,
  });
  const [copied, setCopied] = useState(false);

  const handleForge = () => {
    const forgedCert = forgeCertificate(legitCertificate, forgeOptions);
    setCertificate(forgedCert);
    setIsForged(true);
    setCopied(false);
  };

  const handleReset = () => {
    setCertificate(legitCertificate);
    setIsForged(false);
    setCopied(false);
  };

  const copyFingerprint = () => {
    navigator.clipboard.writeText(certificate.fingerprint);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Paper
      sx={{
        p: 3,
        mt: 3,
        bgcolor: 'rgba(0,0,0,0.75)',
        color: 'white',
        borderRadius: 3,
        border: isForged ? '2px solid #ff3e3e' : '2px solid #4caf50',
        boxShadow: isForged
          ? '0 0 20px 3px rgba(255, 62, 62, 0.7)'
          : '0 0 20px 3px rgba(76, 175, 80, 0.7)',
        transition: 'all 0.4s ease',
        position: 'relative',
      }}
    >
      <Grow in timeout={500}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          Certificate Information {isForged ? '⚠️ Forged / Suspicious' : '✔️ Legitimate'}
        </Typography>
      </Grow>

      {isForged && (
        <Box
          sx={{
            bgcolor: '#ff3e3e',
            color: '#fff',
            p: 1,
            mb: 2,
            borderRadius: 1,
            fontWeight: 'bold',
            textAlign: 'center',
            userSelect: 'none',
          }}
        >
          Warning: This certificate is forged or revoked!
        </Box>
      )}

      <Stack spacing={1} sx={{ mb: 2 }}>
        <Typography>
          <strong>Issuer:</strong> {certificate.issuer}
        </Typography>
        <Typography>
          <strong>Subject:</strong> {certificate.subject}
        </Typography>
        <Typography>
          <strong>Valid From:</strong> {new Date(certificate.validFrom).toLocaleString()}
        </Typography>
        <Typography>
          <strong>Valid To:</strong> {new Date(certificate.validTo).toLocaleString()}
        </Typography>
        <Typography sx={{ display: 'flex', alignItems: 'center' }}>
          <strong>Fingerprint:</strong> {certificate.fingerprint}
          <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'}>
            <IconButton
              onClick={copyFingerprint}
              size="small"
              sx={{ ml: 1, color: 'white' }}
              aria-label="copy fingerprint"
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Typography>
      </Stack>

      <Accordion sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
          <Typography>Advanced Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <strong>Serial Number:</strong> {certificate.serialNumber}
          </Typography>
          <Typography>
            <strong>Signature Algorithm:</strong> {certificate.signatureAlgorithm}
          </Typography>
          <Typography>
            <strong>Public Key Algorithm:</strong> {certificate.publicKeyAlgorithm}
          </Typography>
          <Typography>
            <strong>Public Key Length:</strong> {certificate.publicKeyLength} bits
          </Typography>
          <Typography>
            <strong>Revoked:</strong> {certificate.revoked ? 'Yes' : 'No'}
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Extensions:
            </Typography>
            {certificate.extensions ? (
              <>
                <Typography>
                  <strong>Key Usage:</strong> {certificate.extensions.keyUsage.join(', ')}
                </Typography>
                <Typography>
                  <strong>Extended Key Usage:</strong> {certificate.extensions.extendedKeyUsage.join(', ')}
                </Typography>
                <Typography>
                  <strong>Subject Alternative Names:</strong>{' '}
                  {certificate.extensions.subjectAltName.join(', ')}
                </Typography>
              </>
            ) : (
              <Typography>No extensions present.</Typography>
            )}
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Certificate Chain:
            </Typography>
            {certificate.chain && certificate.chain.length > 0 ? (
              certificate.chain.map((cert, idx) => (
                <Box
                  key={idx}
                  sx={{
                    border: '1px solid rgba(255,255,255,0.3)',
                    p: 1,
                    mb: 1,
                    borderRadius: 1,
                  }}
                >
                  <Typography>
                    <strong>Name:</strong> {cert.name}
                  </Typography>
                  <Typography>
                    <strong>Fingerprint:</strong> {cert.fingerprint}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography>No chain information.</Typography>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant={isForged ? 'outlined' : 'contained'}
          color={isForged ? 'success' : 'error'}
          onClick={isForged ? handleReset : handleForge}
          size="large"
          sx={{ fontWeight: 'bold', minWidth: 160 }}
        >
          {isForged ? 'Reset Certificate' : 'Forge Certificate'}
        </Button>
      </Box>
    </Paper>
  );
};

export default CertificateForge;
