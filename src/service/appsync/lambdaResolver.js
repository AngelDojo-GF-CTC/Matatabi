import { getRouteDurations, recomendedSpots } from "../../graphql/queries";
import { execQuery } from "./baseApi";

export const fetchRouteDurations = (variables) =>
  execQuery(getRouteDurations, variables);
export const fetchRecomendedSpots = (variables) =>
  execQuery(recomendedSpots, variables);
