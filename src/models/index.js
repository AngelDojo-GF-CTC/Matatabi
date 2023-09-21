// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Gender = {
  "MAN": "MAN",
  "WOMAN": "WOMAN"
};

const { User, Travel, Spot, TravelUser, RouteDurations, RouteDurationsResponse } = initSchema(schema);

export {
  User,
  Travel,
  Spot,
  TravelUser,
  Gender,
  RouteDurations,
  RouteDurationsResponse
};