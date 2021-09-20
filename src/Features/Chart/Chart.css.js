import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    container: {
        margin: "10px 50px",
    },
    chartTitle:{
        fontSize:'25px',
        fontWeight:'bold',
    }
  }),
);
