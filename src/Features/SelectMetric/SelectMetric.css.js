import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      minWidth: 120,
    },
    container: {
      marginLeft: '600px',
      padding: '10px',
    },
  }),
);
