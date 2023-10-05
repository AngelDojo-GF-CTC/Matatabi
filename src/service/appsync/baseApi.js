import { API, graphqlOperation } from "aws-amplify";

export const execQuery = (query, variables) => {
  return new Promise((resolve, reject) => {
    API.graphql(graphqlOperation(query, variables))
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};
export const execMutate = (mutation, variables) => {
  return new Promise((resolve, reject) => {
    API.graphql(graphqlOperation(mutation, { input: variables }))
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};
