import distanceMatrixService from "google-distance-matrix";
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
const ssmClient = new SSMClient();
const getParameterCommand = new GetParameterCommand({
  Name: process.env["GOOGLE_API_KEY"],
  WithDecryption: true,
});

const getParameterCommandResponse = await ssmClient.send(getParameterCommand);
const apiKey = getParameterCommandResponse.Parameter.Value;
distanceMatrixService.key(apiKey);
distanceMatrixService.language("ja");

export const getDistance = (
  transportation,
  origins,
  destinations,
  nextSpots
) => {
  distanceMatrixService.mode(transportation);
  return new Promise((resolve, reject) => {
    distanceMatrixService.matrix(
      origins,
      destinations,
      function (err, distances) {
        if (err) {
          console.log(err);
          reject(err);
        }
        let trips = [];
        for (const spot of nextSpots) {
          trips.push({
            spotName: spot.spotName,
            spotAddress: spot.spotAddress,
            [`${transportation}Dration`]:
              distances.rows[0].elements[nextSpots.indexOf(spot)].duration.text,
            distance:
              distances.rows[0].elements[nextSpots.indexOf(spot)].distance.text,
          });
        }
        resolve(trips);
      }
    );
  });
};
