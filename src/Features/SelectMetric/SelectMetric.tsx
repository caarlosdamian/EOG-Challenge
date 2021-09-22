import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { FormControl, Grid, InputLabel, LinearProgress, MenuItem, Select, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setMetric, setUpdate } from '../../redux/metric/metricSlice';
import { useStyles } from './SelectMetric.css';

const query = gql`
  query {
    getMetrics
  }
`;
type Props = {
  globalMetricsSelected: string[];
};
interface RootState {
  metric: Props;
}

export const SelectMetric: React.FC = () => {
  // const [metrics, setMetrics] = useState<string[]>([]);
  const dispatch = useDispatch();
  const metrics = useSelector((state: RootState) => state.metric.globalMetricsSelected);
  const classes = useStyles();
  const { loading, error, data } = useQuery(query);
  if (loading) {
    return <LinearProgress />;
  }
  if (error) {
    <Typography>{error}</Typography>;
  }
  dispatch(setMetric(data.getMetrics as string[]));
  const handlechange = (event: React.ChangeEvent<{ value: string[] | unknown }>) => {
    // setMetrics(event.target.value as string[]);
    dispatch(setUpdate(event.target.value as string[]));
  };

  return (
    <Grid container spacing={3} className={classes.grid}>
      <Grid item lg={4} xs={12}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-mutiple-checkbox-label">Metric</InputLabel>
          <Select
            labelId="demo-mutiple-checkbox-label"
            id="demo-mutiple-checkbox"
            label="Metric"
            value={metrics}
            multiple
            renderValue={(selected) => (selected as string[]).join(', ')}
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
      </Grid>
    </Grid>
  );
};
