// src/utils/mockData.js

// Utility to generate timestamps for packets
function randomTimestamp(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Protocol types for packets
const protocols = ['HTTP', 'HTTPS', 'TCP', 'UDP', 'DNS', 'ICMP'];

// Sample HTTP methods & status codes for realism
const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
const httpStatusCodes = [200, 201, 204, 301, 302, 400, 401, 403, 404, 500];

// Generate random IP addresses
function randomIP() {
  return Array(4).fill(0).map(() => Math.floor(Math.random() * 256)).join('.');
}

// Simulate real network packets with richer data
export const mockPackets = Array.from({ length: 20 }).map((_, i) => {
  const protocol = protocols[Math.floor(Math.random() * protocols.length)];
  const isRequest = Math.random() > 0.5;

  const packet = {
    id: i + 1,
    protocol,
    sourceIP: randomIP(),
    destinationIP: randomIP(),
    sourcePort: Math.floor(Math.random() * 65535),
    destinationPort: Math.floor(Math.random() * 65535),
    timestamp: randomTimestamp(new Date(Date.now() - 60000), new Date()), // last 60 sec
    intercepted: Math.random() < 0.15, // 15% chance of interception
  };

  if (protocol === 'HTTP' || protocol === 'HTTPS') {
    if (isRequest) {
      const method = httpMethods[Math.floor(Math.random() * httpMethods.length)];
      packet.content = `${method} /api/data HTTP/1.1`;
      packet.headers = {
        Host: 'api.example.com',
        'User-Agent': 'Mozilla/5.0',
        Accept: '*/*',
      };
      packet.body = method === 'POST' ? JSON.stringify({ username: 'user', password: '****' }) : null;
    } else {
      const status = httpStatusCodes[Math.floor(Math.random() * httpStatusCodes.length)];
      packet.content = `HTTP/1.1 ${status} ${status === 200 ? 'OK' : 'Error'}`;
      packet.headers = {
        'Content-Type': 'application/json',
        'Content-Length': 123,
      };
      packet.body = JSON.stringify({ success: status === 200 });
    }
  } else {
    // For non-HTTP protocols, simple content
    packet.content = `Packet data payload #${i + 1}`;
  }

  return packet;
});

// More detailed legitimate certificate with chain and signature
export const legitCertificate = {
  issuer: 'Trusted Root CA',
  subject: 'www.secure-site.com',
  validFrom: '2024-01-01T00:00:00Z',
  validTo: '2025-01-01T00:00:00Z',
  fingerprint: 'A1:B2:C3:D4:E5:F6',
  serialNumber: '1234567890ABCDEF',
  signatureAlgorithm: 'SHA256withRSA',
  publicKeyAlgorithm: 'RSA',
  publicKeyLength: 2048,
  extensions: {
    keyUsage: ['Digital Signature', 'Key Encipherment'],
    extendedKeyUsage: ['TLS Web Server Authentication', 'TLS Web Client Authentication'],
    subjectAltName: ['DNS:www.secure-site.com', 'DNS:secure-site.com'],
  },
  revoked: false,
  chain: [
    { name: 'Trusted Root CA', fingerprint: '00:11:22:33:44:55' },
    { name: 'Intermediate CA', fingerprint: '66:77:88:99:AA:BB' },
  ],
};

// Function to simulate advanced forging by modifying multiple fields
export function forgeCertificate(legitCert, options = {}) {
  // Default forge options
  const {
    changeSubject = true,
    changeFingerprint = true,
    changeValidity = true,
    revoke = true,
    fakeIssuer = true,
  } = options;

  return {
    ...legitCert,
    subject: changeSubject ? 'attacker.com' : legitCert.subject,
    fingerprint: changeFingerprint ? 'FF:EE:DD:CC:BB:AA' : legitCert.fingerprint,
    validFrom: changeValidity ? '2020-01-01T00:00:00Z' : legitCert.validFrom,
    validTo: changeValidity ? '2021-01-01T00:00:00Z' : legitCert.validTo,
    revoked: revoke ? true : legitCert.revoked,
    issuer: fakeIssuer ? 'Fake CA Inc.' : legitCert.issuer,
    chain: fakeIssuer
      ? [{ name: 'Fake CA Inc.', fingerprint: 'FF:FF:FF:FF:FF:FF' }]
      : legitCert.chain,
    signatureAlgorithm: 'MD5withRSA', // weaker, suspicious algorithm
  };
}

// Simulate real-time packet stream generation with callbacks
export function streamPackets(onPacket, total = 20, interval = 500) {
  let count = 0;
  const intervalId = setInterval(() => {
    if (count >= total) {
      clearInterval(intervalId);
      return;
    }
    const packet = mockPackets[count];
    onPacket(packet);
    count++;
  }, interval);

  return () => clearInterval(intervalId); // return stop function
}
