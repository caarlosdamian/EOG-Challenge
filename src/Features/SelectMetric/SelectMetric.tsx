import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, FormControl, InputLabel, LinearProgress, MenuItem, Select, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setMetric } from '../../redux/metric/metricSlice';
import { useStyles } from './SelectMetric.css';

const query = gql`
  query {
    getMetrics
  }
`;

export const SelectMetric: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { loading, error, data } = useQuery(query);
  if (loading) {
    return <LinearProgress />;
  }
  if (error) {
    <Typography>{error}</Typography>;
  }
  const handlechange = (event: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(setMetric(event.target.value as string));
  };
  return (
    <Container className={classes.container}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Metric</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Metric"
          value=""
          onChange={handlechange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
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
