import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  TextField,
  Alert,
  AppBar,
  Toolbar,
  Paper,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import confetti from "canvas-confetti";

/* ================= FLAGS ================= */

const FLAGS = {
  SQLI: "VULNCART{LOGIN_BYPASS_SUCCESS}",
  XSS: "VULNCART{STORED_XSS_REVIEW}",
  CMD: "VULNCART{ADMIN_COMMAND_INJECTION}",
};
const TOTAL_FLAGS = Object.keys(FLAGS).length;

export default function VulnCartCTF() {
  const [page, setPage] = useState("home");

  const [cmdOutput, setCmdOutput] = useState("");

  /* ================= AUTH ================= */

  const [role, setRole] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMsg, setLoginMsg] = useState(null);
  const [sqliSolved, setSqliSolved] = useState(false);

  const handleLogin = () => {
    if (password.toLowerCase().includes("or 1=1")) {
      setRole("admin");
      setSqliSolved(true);
      setLoginMsg({ type: "success", text: "Admin login successful!" });
    } else if (username === "user" && password === "password") {
      setRole("user");
      setLoginMsg({ type: "success", text: "Login successful!" });
    } else {
      setLoginMsg({ type: "error", text: "Invalid credentials." });
    }
  };

  /* ================= XSS ================= */

  const [reviews, setReviews] = useState([]);
  const [reviewInput, setReviewInput] = useState("");
  const [xssSolved, setXssSolved] = useState(false);

  const postReview = () => {
    if (reviewInput.includes("<script")) {
      setXssSolved(true);
    }
    setReviews([...reviews, { id: Date.now(), content: reviewInput }]);
    setReviewInput("");
  };

  /* ================= COMMAND INJECTION ================= */

  const [cmdInput, setCmdInput] = useState("");
  const [cmdSolved, setCmdSolved] = useState(false);

  const runCommand = () => {
    if (cmdInput.includes(";")) {
      setCmdSolved(true);
    }
  };

  /* ================= FLAG ENGINE ================= */

  const [submittedFlags, setSubmittedFlags] = useState([]);
  const [flagInput, setFlagInput] = useState("");
  const [flagMsg, setFlagMsg] = useState(null);

  const availableFlags = [
    sqliSolved && FLAGS.SQLI,
    xssSolved && FLAGS.XSS,
    cmdSolved && FLAGS.CMD,
  ].filter(Boolean);

  const progress = Math.round(
    (submittedFlags.length / TOTAL_FLAGS) * 100
  );

  const submitFlag = () => {
    const flag = flagInput.trim();

    if (!availableFlags.includes(flag)) {
      setFlagMsg({ type: "error", text: "Incorrect or locked flag." });
      setFlagInput("");
      return;
    }

    if (submittedFlags.includes(flag)) {
      setFlagMsg({ type: "warning", text: "Flag already submitted." });
      setFlagInput("");
      return;
    }

    const updated = [...submittedFlags, flag];
    setSubmittedFlags(updated);
    setFlagMsg({ type: "success", text: "Flag accepted!" });
    setFlagInput("");

    // After accepting a flag, navigate back to the corresponding room
    // Small delay so user sees the success message first
    setTimeout(() => {
      if (flag === FLAGS.SQLI) setPage("login");
      else if (flag === FLAGS.XSS) setPage("products");
      else if (flag === FLAGS.CMD) setPage("admin");
    }, 700);

    if (updated.length === TOTAL_FLAGS) {
      confetti({ particleCount: 300, spread: 140 });
    }
  };

  /* ================= UI ================= */

  return (
    <Box sx={{ minHeight: "100vh", background: "#0f172a", color: "white" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }}>VulnCart</Typography>
          <Button color="inherit" onClick={() => setPage("home")}>Home</Button>
          <Button color="inherit" onClick={() => setPage("products")}>Products</Button>
          <Button color="inherit" onClick={() => setPage("login")}>Login</Button>
          {role === "admin" && (
            <Button color="inherit" onClick={() => {
              setPage("admin");
            }}>
              Admin
            </Button>
          )}
          <Button color="inherit" onClick={() => setPage("score")}>Score</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4 }}>

        {page === "home" && (
          <Typography>
            Welcome to VulnCart — Secure Electronics Store.
          </Typography>
        )}

        {page === "login" && (
          <Card>
            <CardContent>
              <Typography variant="h6">Login</Typography>
              <TextField fullWidth sx={{ mt: 2 }} label="Username"
                value={username} onChange={(e) => setUsername(e.target.value)} />
              <TextField fullWidth sx={{ mt: 2 }} label="Password"
                value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button sx={{ mt: 2 }} variant="contained" onClick={handleLogin}>
                Login
              </Button>
              {loginMsg && (
                <Alert severity={loginMsg.type} sx={{ mt: 2 }}>
                  {loginMsg.text}
                </Alert>
              )}
              {sqliSolved && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  Flag: {FLAGS.SQLI}
                </Alert>
              )}
            </CardContent>
          </Card>
        )}

        {/* PRODUCTS */}
{page === "products" && (
  <Box>
    <Typography variant="h6">Gaming Laptop</Typography>
    <Divider sx={{ my: 2 }} />

    <TextField
      fullWidth
      placeholder="Write a review..."
      value={reviewInput}
      onChange={(e) => setReviewInput(e.target.value)}
    />

    <Button
      sx={{ mt: 2 }}
      variant="contained"
      onClick={() => {
        if (reviewInput.includes("<script>")) {
          setXssSolved(true);
        }
        setReviews([
          ...reviews,
          { id: Date.now(), content: reviewInput },
        ]);
        setReviewInput("");
      }}
    >
      POST
    </Button>

    <List>
      {reviews.map((r) => (
        <ListItem key={r.id}>
          <div
            dangerouslySetInnerHTML={{ __html: r.content }}
          />
        </ListItem>
      ))}
    </List>

    {xssSolved && (
      <Alert severity="success" sx={{ mt: 2 }}>
        Flag Unlocked: {FLAGS.XSS}
      </Alert>
    )}
  </Box>
)}

        {/* ADMIN PAGE */}
{page === "admin" && role === "admin" && (
  <Paper sx={{ p: 3 }}>
    <Typography variant="h6">Admin Debug Console</Typography>

    <Typography variant="body2" sx={{ mb: 2 }}>
      Run system diagnostic commands
    </Typography>

    <TextField
      fullWidth
      placeholder="Enter system command..."
      value={cmdInput}
      onChange={(e) => setCmdInput(e.target.value)}
    />

    <Button
      sx={{ mt: 2 }}
      variant="contained"
      onClick={() => {
        if (cmdInput.includes(";")) {
          setCmdSolved(true);
          setCmdOutput("root\nuid=0(root) gid=0(root)");
        } else {
          setCmdOutput("Command executed safely.");
        }
      }}
    >
      Execute
    </Button>

    {cmdOutput && (
      <Paper
        sx={{
          mt: 3,
          p: 2,
          backgroundColor: "#111",
          color: "#00ff00",
          fontFamily: "monospace",
        }}
      >
        {cmdOutput}
      </Paper>
    )}

    {/* Admin flag removed - only three challenge flags remain */}

    {cmdSolved && (
      <Alert severity="success" sx={{ mt: 2 }}>
        Command Injection Flag: {FLAGS.CMD}
      </Alert>
    )}
  </Paper>
)}

        {page === "score" && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Progress</Typography>
            <Typography sx={{ mt: 1 }}>{progress}% Complete</Typography>
            <LinearProgress variant="determinate"
              value={progress}
              sx={{ mt: 1, height: 10, borderRadius: 5 }} />

            {/* Unlocked flags list removed from Score page per request */}

            <TextField fullWidth sx={{ mt: 3 }}
              placeholder="Enter flag..."
              value={flagInput}
              onChange={(e) => setFlagInput(e.target.value)} />
            <Button sx={{ mt: 2 }} variant="contained" onClick={submitFlag}>
              Submit Flag
            </Button>

            {flagMsg && (
              <Alert severity={flagMsg.type} sx={{ mt: 2 }}>
                {flagMsg.text}
              </Alert>
            )}

            {progress === 100 && (
              <Alert severity="success" sx={{ mt: 2 }}>
                🎉 All flags submitted — well done!
              </Alert>
            )}
          </Paper>
        )}

      </Container>
    </Box>
  );
}