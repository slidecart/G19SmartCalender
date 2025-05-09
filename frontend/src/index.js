import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import AuthProvider from "./context/AuthContext";
import {CalendarProvider} from "./context/CalendarContext";

const theme = createTheme({
  palette: {
    primary:{
      main:"#013e87",
    },
    secondary: {
      main: "#0077ffe"
    },
  },
  typography: {
    fontFamily: '"Trebuchet MS", sans-serif',
    h1:{
      fontSize: "34px",
      fontWeight: "bold",
      padding: "10px"
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: "4px 0 4px 0",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          margin: "4px 0 4px 0",
        }
      }
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
