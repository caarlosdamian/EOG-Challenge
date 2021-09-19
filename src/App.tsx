import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import {SelectMetric} from './Features/SelectMetric/SelectMetric';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const App = () => {
  const [globalMetric, setGlobalMetric] = useState('');
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Wrapper>
        <Header />
        <SelectMetric setGlobalMetric={setGlobalMetric} globalMetric={globalMetric} />
        <ToastContainer />
      </Wrapper>
    </MuiThemeProvider>
  );
};

export default App;
