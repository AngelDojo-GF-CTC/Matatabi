import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
const ssmClient = new SSMClient();
const getParameterCommand = new GetParameterCommand({
  Name: process.env["GOOGLE_API_KEY"],
  WithDecryption: true,
});

const getParameterCommandResponse = await ssmClient.send(getParameterCommand);
const apiKey = getParameterCommandResponse.Parameter.Value;

export const getGoogleApiKey = () => {
  return apiKey;
};
