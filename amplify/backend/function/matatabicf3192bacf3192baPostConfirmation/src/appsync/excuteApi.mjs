import AWSAppSync from "aws-appsync";
import AWS from "aws-sdk";
import { gql } from "graphql-tag";
import { createUser } from "../graphql/mutations.mjs";

const appsyncClient = new AWSAppSync.default({
  url: process.env.API_MATATABI_GRAPHQLAPIENDPOINTOUTPUT,
  region: process.env.REGION,
  auth: {
    type: AWSAppSync.AUTH_TYPE.AWS_IAM,
    credentials: AWS.config.credentials,
  },
  disableOffline: true,
});

/**
 * 取得
 */
const execQuery = (query, params, resstr) => {
  console.log(`execQuery: ${resstr}`);
  return new Promise(async (resolve, reject) => {
    appsyncClient
      .query({
        query: gql(query),
        variables: params,
        fetchPolicy: "network-only",
      })
      .then((res) => {
        console.log(`execQueryResult: ${JSON.stringify(res)}`);
        resolve(res.data[resstr]);
      })
      .catch((err) => {
        console.log(`execQueryError: ${err}`);
        reject(err);
      });
  });
};

/**
 * 登録/更新
 */
const execMutate = (mutation, params, resstr) => {
  console.log(`execMutate: ${resstr}`);
  return new Promise(async (resolve, reject) => {
    appsyncClient
      .mutate({
        mutation: gql(mutation),
        variables: { input: params },
        fetchPolicy: "no-cache",
      })
      .then((res) => {
        console.log(`execMutateResult: ${JSON.stringify(res)}`);
        resolve(res.data[resstr]);
      })
      .catch((err) => {
        console.log(`execMutateError: ${err}`);
        reject(err);
      });
  });
};

/**
 * agent登錄
 */
export const createUserItem = async (variables) =>
  await execMutate(createUser, variables, "createUser");
