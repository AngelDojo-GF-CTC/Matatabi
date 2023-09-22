import { API, graphqlOperation } from "aws-amplify";
import { getRouteDurations } from "../../graphql/queries";

export const fetchRouteDurations = async (variables) =>
  await API.graphql(graphqlOperation(getRouteDurations, variables));
