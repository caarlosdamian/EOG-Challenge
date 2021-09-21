import React from 'react';
import { Box, Grid, LinearProgress, Typography } from '@material-ui/core';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, Tooltip, YAxis } from 'recharts';
import { useQuery, gql } from '@apollo/client';
import { useSelector } from 'react-redux';
import { useStyles } from './Chart.css';

const GET_METRIC = gql`
  query input($globalMetric: String!) {
    getMeasurements(input: { metricName: $globalMetric }) {
      metric
      at
      value
      unit
    }
  }
`;

type Props = {
  globalMetric: string;
};
interface RootState {
  metric: Props;
}

const Chart: React.FC = () => {
  const classes = useStyles();
  const globalMetric = useSelector((state: RootState) => state.metric.globalMetric);
  const { loading, error, data } = useQuery(GET_METRIC, {
    variables: {
      globalMetric,
    },
    pollInterval: 500,
  });

  const slicehaf = Math.round(data?.getMeasurements.length - 500);
  const infoData = data?.getMeasurements.slice(slicehaf, -1);
  const datesInfo = infoData?.map((item: any) => ({
    value: item.value,
    at: new Date(item.at).toLocaleTimeString('en-US'),
  }));
  const lastMesurment = infoData ? infoData[infoData?.length - 1]?.value : '';
  if (loading) return <LinearProgress />;
  if (error) return <Typography>{error}</Typography>;
  return (
    <Grid container spacing={3}>
      {globalMetric ? (
        <Grid item xs={12}>
          <Box
            className={classes.headers}
            sx={{
              boxShadow: 3,
              bgcolor: 'white',
              m: 1,
              p: 1,
              width: '20rem',
              height: '10rem',
            }}
          >
            <h3 className={classes.chartTitle}>{globalMetric.toUpperCase()}</h3>
            <h4 className={classes.messurment}>{lastMesurment}</h4>
          </Box>
        </Grid>
      ) : (
        <></>
      )}
      <Grid item xs={12}>
        <ResponsiveContainer width="100%" aspect={3 / 1} className={classes.chart}>
          <LineChart data={datesInfo}>
            <XAxis dataKey="at" stroke="#5550bd" />
            <YAxis dataKey="value" stroke="#5550bd" />
            <Line activeDot={{ r: 8 }} type="monotone" dataKey="value" stroke="#5550bd" />
            <Tooltip />
            <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </Grid>
    </Grid>
  );
};

export default Chart;
