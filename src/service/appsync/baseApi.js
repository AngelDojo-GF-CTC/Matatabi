import { API, graphqlOperation } from "aws-amplify";

export const execQuery = (query, variables, reskey) => {
  return new Promise((resolve, reject) => {
    API.graphql(graphqlOperation(query, variables))
      .then((data) => resolve(data.data[reskey]))
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

export const execList = (query, variables, reskey) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = [];
      let nextToken = null;
      do {
        const result = await API.graphql(
          graphqlOperation(query, { ...variables, nextToken })
        );
        data = [...data, ...result.data[reskey].items];
        nextToken = result.data[reskey].nextToken;
      } while (!!nextToken);
      resolve(data);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
