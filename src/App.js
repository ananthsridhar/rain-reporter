import React from 'react';
import logo from './logo.svg';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import './App.css';
import MasterComponent from './components/MasterComponent';

const theme = createMuiTheme({
  palette: {
      type: 'dark',
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <header className="App-header">
        <p>
          RAIN REPORTER
        </p>
      </header>
      <MasterComponent/>
    </div>
    </ThemeProvider>
  );
}

export default App;
