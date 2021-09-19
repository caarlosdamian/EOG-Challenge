import React from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  createStyles,
  Container,
  FormControl,
  InputLabel,
  LinearProgress,
  makeStyles,
  MenuItem,
  Select,
  Theme,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    container: {
     marginLeft:"600px",
     padding: "10px",
    },
  }),
);
const query = gql`
  query {
    getMetrics
  }
`;
interface Props {
  setGlobalMetric: (val: string) => void;
  globalMetric: string;
}
export const SelectMetric: React.FC<Props> = ({ setGlobalMetric, globalMetric }) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(query);
  if (loading) {
    return <LinearProgress />;
  }
  if (error) {
    <Typography>{error}</Typography>;
  }
  const handlechange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGlobalMetric(event.target.value as string);
  };
  return (
    <Container className={classes.container}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Metric</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={globalMetric}
          label="Metric"
          onChange={handlechange}
        >
          {data.getMetrics.map((metric: string) => (
            <MenuItem key={metric} value={metric}>
              {metric}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Container>
  );
};
