import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1e90ff',
    },
    background: {
      default: '#0a0f1c',
      paper: '#1a2238',
    },
    text: {
      primary: '#ffffff',
      secondary: '#cbd5e1',
    },
  },
  typography: {
    fontFamily: 'Outfit, sans-serif',
    h1: {
      fontFamily: 'Orbitron, sans-serif',
      fontWeight: 800,
    },
    h2: {
      fontFamily: 'Orbitron, sans-serif',
      fontWeight: 800,
    },
    h3: {
      fontFamily: 'Orbitron, sans-serif',
      fontWeight: 700,
    },
    h4: {
      fontFamily: 'Orbitron, sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: 'Orbitron, sans-serif',
    },
    h6: {
      fontFamily: 'Orbitron, sans-serif',
    },
    subtitle1: {
      fontFamily: 'Outfit, sans-serif',
    },
    body1: {
      fontFamily: 'Outfit, sans-serif',
    },
    body2: {
      fontFamily: 'Outfit, sans-serif',
    },
    button: {
      fontFamily: 'Outfit, sans-serif',
    },
  },
});

export default darkTheme;