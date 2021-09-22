import React from 'react';
import { Box, Grid, LinearProgress, Typography } from '@material-ui/core';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, Tooltip, YAxis } from 'recharts';
import { useQuery, gql } from '@apollo/client';
import { useSelector } from 'react-redux';
import { useStyles } from './Chart.css';

const GET_HEARTBEAT = gql`
  query {
    heartBeat
  }
`;

const GET_MULTIPLE_MEASURMENTS = gql`
  query Measurements($input: [MeasurementQuery]) {
    data: getMultipleMeasurements(input: $input) {
      metric
      measurements {
        metric
        value
        at
        unit
      }
    }
  }
`;
type Props = {
  globalMetricsSelected: string[];
};
interface RootState {
  metric: Props;
}
const Chart: React.FC = () => {
  const classes = useStyles();
  const globalMetrics = useSelector((state: RootState) => state.metric.globalMetricsSelected);
  const result = useQuery(GET_HEARTBEAT, { pollInterval: 1800000 });
  const heart = result?.data?.heartBeat - 1800000;
  const colors = ['#1b615f', '#000C66', '#f14155', '#197a74', '#B68D40', '#868B8E'];

  const input = [{}];
  globalMetrics?.forEach((item) => {
    input.push({ metricName: item, after: heart });
  });
  input.splice(0, 1);

  const { data, loading, error } = useQuery(GET_MULTIPLE_MEASURMENTS, {
    variables: { input },
    pollInterval: 2000,
  });
  const infoTrimp = data?.data?.map((item: any) => item?.measurements);
  const newData = infoTrimp?.map((item: any) => {
    const slicehaf = Math.round(item?.length - 10000);
    const infoData = item?.slice(slicehaf, -1);
    const datesInfo = infoData.map((items: any) => ({
      value: items.value,
      at: new Date(Math.floor(items.at)).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }),
    }));
    return datesInfo;
  });

  const lastMeasurment = newData?.map((element: any) => element[element.length - 1]);
  if (loading) return <LinearProgress />;
  if (error) return <Typography>{error}</Typography>;

  return (
    <Grid container spacing={3}>
      <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={3}>
        {globalMetrics?.map((element, index) => (
          <Grid item xs={3} key={element}>
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
              <h3 className={classes.chartTitle}>{element}</h3>
              <h4 className={classes.messurment}>{lastMeasurment[index].value}</h4>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Grid item xs={12}>
        <ResponsiveContainer width="50%" aspect={2 / 1} className={classes.chart}>
          <LineChart width={500} height={300}>
            {newData?.map((item: any, index: any) => (
              <>
                <Line
                  key={colors[index]}
                  activeDot={{ r: 8 }}
                  data={item}
                  type="monotone"
                  dataKey="value"
                  stroke={colors[index]}
                  yAxisId={index}
                />

                <YAxis yAxisId={index} domain={[Math.min(item.value), Math.max(item.value)]} />
              </>
            ))}
            <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
            <XAxis dataKey="at" />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </Grid>
    </Grid>
  );
};

export default Chart;
