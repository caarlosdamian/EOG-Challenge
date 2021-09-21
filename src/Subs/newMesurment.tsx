import { gql, useSubscription } from '@apollo/client';

const newMeasurmentSub = gql`
  subscription {
    newMeasurement {
      metric
      at
      value
      unit
    }
  }
`;

export const NewMesurment = () => {
  const { data } = useSubscription(newMeasurmentSub);
  return data;
};
