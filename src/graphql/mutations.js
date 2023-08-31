/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createTravel = /* GraphQL */ `
  mutation CreateTravel(
    $input: CreateTravelInput!
    $condition: ModelTravelConditionInput
  ) {
    createTravel(input: $input, condition: $condition) {
      travelId
      travelDate
      travelName
      users {
        items {
          id
          userUserId
          travelTravelId
          traveltravelDate
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      spots {
        items {
          spotId
          location
          departureTime
          arrivalTime
          stayTimeMin
          travelId
          travelDate
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      ownerId
      owner {
        userId
        name
        email
        gender
        age
        travels {
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateTravel = /* GraphQL */ `
  mutation UpdateTravel(
    $input: UpdateTravelInput!
    $condition: ModelTravelConditionInput
  ) {
    updateTravel(input: $input, condition: $condition) {
      travelId
      travelDate
      travelName
      users {
        items {
          id
          userUserId
          travelTravelId
          traveltravelDate
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      spots {
        items {
          spotId
          location
          departureTime
          arrivalTime
          stayTimeMin
          travelId
          travelDate
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      ownerId
      owner {
        userId
        name
        email
        gender
        age
        travels {
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteTravel = /* GraphQL */ `
  mutation DeleteTravel(
    $input: DeleteTravelInput!
    $condition: ModelTravelConditionInput
  ) {
    deleteTravel(input: $input, condition: $condition) {
      travelId
      travelDate
      travelName
      users {
        items {
          id
          userUserId
          travelTravelId
          traveltravelDate
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      spots {
        items {
          spotId
          location
          departureTime
          arrivalTime
          stayTimeMin
          travelId
          travelDate
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      ownerId
      owner {
        userId
        name
        email
        gender
        age
        travels {
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createSpot = /* GraphQL */ `
  mutation CreateSpot(
    $input: CreateSpotInput!
    $condition: ModelSpotConditionInput
  ) {
    createSpot(input: $input, condition: $condition) {
      spotId
      location
      departureTime
      arrivalTime
      stayTimeMin
      travelId
      travelDate
      travel {
        travelId
        travelDate
        travelName
        users {
          nextToken
          startedAt
          __typename
        }
        spots {
          nextToken
          startedAt
          __typename
        }
        ownerId
        owner {
          userId
          name
          email
          gender
          age
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateSpot = /* GraphQL */ `
  mutation UpdateSpot(
    $input: UpdateSpotInput!
    $condition: ModelSpotConditionInput
  ) {
    updateSpot(input: $input, condition: $condition) {
      spotId
      location
      departureTime
      arrivalTime
      stayTimeMin
      travelId
      travelDate
      travel {
        travelId
        travelDate
        travelName
        users {
          nextToken
          startedAt
          __typename
        }
        spots {
          nextToken
          startedAt
          __typename
        }
        ownerId
        owner {
          userId
          name
          email
          gender
          age
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteSpot = /* GraphQL */ `
  mutation DeleteSpot(
    $input: DeleteSpotInput!
    $condition: ModelSpotConditionInput
  ) {
    deleteSpot(input: $input, condition: $condition) {
      spotId
      location
      departureTime
      arrivalTime
      stayTimeMin
      travelId
      travelDate
      travel {
        travelId
        travelDate
        travelName
        users {
          nextToken
          startedAt
          __typename
        }
        spots {
          nextToken
          startedAt
          __typename
        }
        ownerId
        owner {
          userId
          name
          email
          gender
          age
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createTravelUser = /* GraphQL */ `
  mutation CreateTravelUser(
    $input: CreateTravelUserInput!
    $condition: ModelTravelUserConditionInput
  ) {
    createTravelUser(input: $input, condition: $condition) {
      id
      userUserId
      travelTravelId
      traveltravelDate
      user {
        userId
        name
        email
        gender
        age
        travels {
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      travel {
        travelId
        travelDate
        travelName
        users {
          nextToken
          startedAt
          __typename
        }
        spots {
          nextToken
          startedAt
          __typename
        }
        ownerId
        owner {
          userId
          name
          email
          gender
          age
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateTravelUser = /* GraphQL */ `
  mutation UpdateTravelUser(
    $input: UpdateTravelUserInput!
    $condition: ModelTravelUserConditionInput
  ) {
    updateTravelUser(input: $input, condition: $condition) {
      id
      userUserId
      travelTravelId
      traveltravelDate
      user {
        userId
        name
        email
        gender
        age
        travels {
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      travel {
        travelId
        travelDate
        travelName
        users {
          nextToken
          startedAt
          __typename
        }
        spots {
          nextToken
          startedAt
          __typename
        }
        ownerId
        owner {
          userId
          name
          email
          gender
          age
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteTravelUser = /* GraphQL */ `
  mutation DeleteTravelUser(
    $input: DeleteTravelUserInput!
    $condition: ModelTravelUserConditionInput
  ) {
    deleteTravelUser(input: $input, condition: $condition) {
      id
      userUserId
      travelTravelId
      traveltravelDate
      user {
        userId
        name
        email
        gender
        age
        travels {
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      travel {
        travelId
        travelDate
        travelName
        users {
          nextToken
          startedAt
          __typename
        }
        spots {
          nextToken
          startedAt
          __typename
        }
        ownerId
        owner {
          userId
          name
          email
          gender
          age
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
