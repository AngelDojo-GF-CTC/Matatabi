import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
import distanceMatrixService from "google-distance-matrix";

export const handler = async (event, context) => {
  const ssmClient = new SSMClient();
  const getParameterCommand = new GetParameterCommand({
    Name: process.env["googleApiKey"],
    WithDecryption: true,
  });

  const getParameterCommandResponse = await ssmClient.send(getParameterCommand);
  const apiKey = getParameterCommandResponse.Parameter.Value;
  distanceMatrixService.key(apiKey);
  distanceMatrixService.language("ja");
  const origins = [event.currentSpots.spotAddress];
  const destinations = event.nextSpots.map((spot) => spot.spotAddress);

  const getDistance = (transportation) => {
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
          for (const spot of event.nextSpots) {
            trips.push({
              spotName: spot.spotName,
              spotAddress: spot.spotAddress,
              duration:
                distances.rows[0].elements[event.nextSpots.indexOf(spot)]
                  .duration.text,
              distance:
                distances.rows[0].elements[event.nextSpots.indexOf(spot)]
                  .distance.text,
            });
          }
          resolve(trips);
        }
      );
    });
  };

  const walkingMode = await getDistance("walking");
  console.log(walkingMode);
  const drivingMode = await getDistance("driving");
  console.log(drivingMode);
  return {
    car: drivingMode,
    walk: walkingMode,
  };
};
