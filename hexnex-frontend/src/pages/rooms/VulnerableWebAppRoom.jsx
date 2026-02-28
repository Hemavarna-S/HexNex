import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  TextField,
  Alert,
  Tabs,
  Tab,
  Paper,
  Grid,
  Chip,
  Stack,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

/* ================= FLAGS ================= */

const FLAGS = {
  WEB: "HEXNEX{SQLI_ADMIN_ACCESS}",
  JWT: "HEXNEX{JWT_ALG_NONE_BYPASS}",
  XSS: "HEXNEX{STORED_XSS_TOKEN_THEFT}",
  ESC1: "HEXNEX{SUID_PRIV_ESC}",
  ESC2: "HEXNEX{SUDO_GTFOBINS_ESC}",
  FINAL: "HEXNEX{FULL_SYSTEM_COMPROMISE}",
};

/* ================= BACKUPS ================= */

const BACKUPS = [
  {
    name: ".env.bak",
    content:
      "DB_USER=root\nDB_PASS=root123\nJWT_SECRET=supersecretkey\nADMIN_PATH=/internal-admin",
  },
  {
    name: "debug.log",
    content:
      "WARN: Input not sanitized\nERROR: SQL syntax near ''\nNOTE: sudo misconfigured for less",
  },
];

export default function VulnerableWebAppRoom() {
  const [tab, setTab] = useState(0);

  /* ================= ENUMERATION ================= */

  const [robotsOpen, setRobotsOpen] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  const [adminPathFound, setAdminPathFound] = useState(false);

  useEffect(() => {
    if (robotsOpen && sourceOpen) {
      setAdminPathFound(true);
    }
  }, [robotsOpen, sourceOpen]);

  /* ================= LOGIN (SQLI) ================= */

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMsg, setLoginMsg] = useState(null);
  const [role, setRole] = useState(null);

  const generateToken = (r) => {
    const header = btoa(JSON.stringify({ alg: "none", typ: "JWT" }));
    const payload = btoa(JSON.stringify({ user: r }));
    return `${header}.${payload}.`;
  };

  const handleLogin = () => {
    if (password.includes("'")) {
      setLoginMsg({ type: "error", text: "SQL syntax error near ''" });
      return;
    }

    if (password.toLowerCase().includes("or 1=1")) {
      setRole("admin");
      localStorage.setItem("token", generateToken("admin"));
      setLoginMsg({ type: "success", text: "Login successful." });
      return;
    }

    if (username === "student" && password === "studentpass") {
      setRole("student");
      localStorage.setItem("token", generateToken("student"));
      setLoginMsg({ type: "success", text: "Login successful." });
      return;
    }

    setLoginMsg({ type: "error", text: "Invalid credentials." });
  };

  /* ================= JWT CHECK ================= */

  const getUserFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.user;
  };

  /* ================= XSS ================= */

  const [posts, setPosts] = useState([]);
  const [xssInput, setXssInput] = useState("");
  const [xssSolved, setXssSolved] = useState(false);

  const handlePost = () => {
    if (!xssInput.trim()) return;
    if (xssInput.includes("localStorage")) {
      setXssSolved(true);
    }
    setPosts([...posts, { id: Date.now(), html: xssInput }]);
    setXssInput("");
  };

  /* ================= PRIV ESC ================= */

  const [esc1, setEsc1] = useState("");
  const [esc2, setEsc2] = useState("");
  const [esc1Solved, setEsc1Solved] = useState(false);
  const [esc2Solved, setEsc2Solved] = useState(false);

  const submitEsc1 = () => {
    if (esc1.trim() === "suid-vuln") {
      setEsc1Solved(true);
    }
  };

  const submitEsc2 = () => {
    if (esc2.includes("!/bin/bash")) {
      setEsc2Solved(true);
    }
  };

  /* ================= SCORE SYSTEM ================= */

  const [score, setScore] = useState(0);
  const [flagInput, setFlagInput] = useState("");
  const [submittedFlags, setSubmittedFlags] = useState([]);

  const submitFlag = () => {
    if (Object.values(FLAGS).includes(flagInput) && !submittedFlags.includes(flagInput)) {
      setScore((s) => s + 100);
      setSubmittedFlags([...submittedFlags, flagInput]);
    }
    setFlagInput("");
  };

  /* ================= FINAL ================= */

  const finalUnlocked = score >= 500;

  return (
    <Box sx={{ minHeight: "100vh", background: "#0b1220", py: 4 }}>
      <Container maxWidth="lg">
        <Card sx={{ bgcolor: "#111827", color: "#eaf2ff", mb: 3 }}>
          <CardContent>
            <Typography variant="h4">HEXNEX Security Lab</Typography>
            <Typography sx={{ color: "#9ca3af" }}>
              Your mission: Compromise the vulnerable training platform and escalate privileges.
            </Typography>
          </CardContent>
        </Card>

        <Tabs value={tab} onChange={(e, v) => setTab(v)} textColor="inherit">
          <Tab label="Briefing" />
          <Tab label="Login" />
          <Tab label="XSS" />
          <Tab label="Backups" />
          <Tab label="PrivEsc" />
          <Tab label="Score" />
        </Tabs>

        {tab === 0 && (
          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6">Enumeration</Typography>
            <Button onClick={() => setRobotsOpen(!robotsOpen)}>robots.txt</Button>
            <Button onClick={() => setSourceOpen(!sourceOpen)}>View Source</Button>

            {robotsOpen && <Alert sx={{ mt: 2 }}>Disallow: /internal-admin</Alert>}
            {sourceOpen && (
              <Paper sx={{ p: 1, mt: 2, fontFamily: "monospace" }}>
                {"<!-- TODO remove before prod -->\n<!-- /internal-admin -->"}
              </Paper>
            )}
            {adminPathFound && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Admin path discovered!
              </Alert>
            )}
          </Paper>
        )}

        {tab === 1 && (
          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6">Login</Typography>
            <TextField fullWidth label="Username" sx={{ mb: 2 }} value={username} onChange={(e) => setUsername(e.target.value)} />
            <TextField fullWidth label="Password" sx={{ mb: 2 }} value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button variant="contained" onClick={handleLogin}>Login</Button>
            {loginMsg && <Alert severity={loginMsg.type} sx={{ mt: 2 }}>{loginMsg.text}</Alert>}
            {role === "admin" && <Alert severity="success" sx={{ mt: 2 }}>{FLAGS.WEB}</Alert>}
          </Paper>
        )}

        {tab === 2 && (
          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6">Stored XSS</Typography>
            <TextField fullWidth value={xssInput} onChange={(e) => setXssInput(e.target.value)} placeholder="Post message..." />
            <Button sx={{ mt: 2 }} onClick={handlePost}>Post</Button>
            <List>
              {posts.map((p) => (
                <ListItem key={p.id}>
                  <ListItemText primary={<span dangerouslySetInnerHTML={{ __html: p.html }} />} />
                </ListItem>
              ))}
            </List>
            {xssSolved && <Alert severity="success">{FLAGS.XSS}</Alert>}
          </Paper>
        )}

        {tab === 3 && (
          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6">Backup Files</Typography>
            <List>
              {BACKUPS.map((b) => (
                <ListItem key={b.name}>
                  <ListItemText primary={b.name} secondary={b.content} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

        {tab === 4 && (
          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6">Privilege Escalation</Typography>
            <Typography>SUID Binary</Typography>
            <TextField fullWidth value={esc1} onChange={(e) => setEsc1(e.target.value)} />
            <Button onClick={submitEsc1}>Submit</Button>
            {esc1Solved && <Alert severity="success">{FLAGS.ESC1}</Alert>}

            <Divider sx={{ my: 2 }} />

            <Typography>sudo -l → less</Typography>
            <TextField fullWidth value={esc2} onChange={(e) => setEsc2(e.target.value)} />
            <Button onClick={submitEsc2}>Submit</Button>
            {esc2Solved && <Alert severity="success">{FLAGS.ESC2}</Alert>}
          </Paper>
        )}

        {tab === 5 && (
          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6">Scoreboard</Typography>
            <Typography>Score: {score}</Typography>
            <TextField fullWidth sx={{ mt: 2 }} value={flagInput} onChange={(e) => setFlagInput(e.target.value)} placeholder="Submit flag..." />
            <Button sx={{ mt: 2 }} onClick={submitFlag}>Submit Flag</Button>

            {finalUnlocked && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Final Flag: {FLAGS.FINAL}
              </Alert>
            )}
          </Paper>
        )}
      </Container>
    </Box>
  );
}