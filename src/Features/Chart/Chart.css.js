import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    headers: {
      borderRadius: '10px',
    },
    messurment: {
      fontSize: '30px',
      color: 'black',
      fontWeight: 'bold',
    },
    chartTitle: {
      fontSize: '15px',
      fontWeight: 'bold',
      color: 'black',
    },
    chart: {
      marginRight: '10px',
    },
  }),
);
