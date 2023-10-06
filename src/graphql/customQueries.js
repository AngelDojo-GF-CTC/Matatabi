export const getUser = /* GraphQL */ `
  query GetUser($userId: ID!) {
    getUser(userId: $userId) {
      userId
      name
      email
      gender
      age
      travels {
        items {
          id
          userUserId
          travelTravelId
          traveltravelDate
          travel {
            travelId
            travelDate
            travelName
            spots {
              items {
                id
                spotId
                spotName
                spotAddress
                arrivalTime
                lat
                lng
                drivingDuration
                walkingDuration
                stayTimeMin
                travelId
                travelDate
              }
            }
            ownerId
            owner {
              userId
              name
            }
          }
        }
      }
    }
  }
`;
