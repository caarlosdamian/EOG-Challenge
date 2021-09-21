import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      minWidth: 120,
    },
    grid: {
      marginTop: '10px',
      marginLeft: '10px',
    },
  }),
);
