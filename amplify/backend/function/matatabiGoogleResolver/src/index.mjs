import { getRouteDurations } from "./resolvers/getRouteDurations.mjs";
import { recomendedSpots } from "./resolvers/recomendedSpots.mjs";
const resolvers = {
  Query: {
    getRouteDurations: async (event) => await getRouteDurations(event),
    recomendedSpots: async (event) => await recomendedSpots(event),
  },
};
export const handler = async (event) => {
  const typeHandler = resolvers[event.typeName];
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName];
    if (resolver) {
      return await resolver(event);
    }
  }
  throw new Error("Resolver not found.");
};
