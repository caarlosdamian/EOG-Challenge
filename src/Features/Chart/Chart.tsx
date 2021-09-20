import React from 'react';
import { Box, LinearProgress, Typography } from '@material-ui/core';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, Tooltip, YAxis } from 'recharts';
import { useQuery, gql } from '@apollo/client';
import { useSelector } from 'react-redux';
import { useStyles } from './Chart.css';

const query = gql`
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
  const { loading, error, data } = useQuery(query, {
    variables: {
      globalMetric,
    },
    pollInterval: 1300,
  });
  const slicehaf = Math.round(data?.getMeasurements.length - 500);
  const infoData = data?.getMeasurements.slice(slicehaf, -1);
  const lastMesurment = infoData ? infoData[infoData?.length - 1]?.value : '';
  if (loading) return <LinearProgress />;
  if (error) return <Typography>{error}</Typography>;
  return (
    <div className={classes.container}>
      {globalMetric ? (
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
      ) : (
        <></>
      )}
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={infoData}>
          <XAxis dataKey="at" stroke="#5550bd" />
          <YAxis dataKey="value" stroke="#5550bd" />
          <Line activeDot={{ r: 8 }} type="monotone" dataKey="value" stroke="#5550bd" />
          <Tooltip />
          <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
