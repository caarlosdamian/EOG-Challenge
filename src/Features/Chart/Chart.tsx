import React from 'react';
import { LinearProgress, Typography } from '@material-ui/core';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import { useQuery, gql } from '@apollo/client';
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
interface Props {
  globalMetric: string;
}
const Chart: React.FC<Props> = ({ globalMetric }) => {
  const classes = useStyles();

  const { loading, error, data } = useQuery(query, {
    variables: {
      globalMetric,
    },
  });
  const infoData = data?.getMeasurements;

  if (loading) return <LinearProgress />;
  if (error) return <Typography>{error}</Typography>;
  return (
    <div className={classes.container}>
      <h3 className={classes.chartTitle}>{globalMetric.toUpperCase()}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={infoData}>
          <XAxis dataKey="at" stroke="#5550bd" />
          <Line activeDot={{ r: 8 }} type="monotone" dataKey="value" stroke="#5550bd" />
          <Tooltip />
          <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
