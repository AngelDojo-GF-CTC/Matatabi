/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateTravel = /* GraphQL */ `
  subscription OnCreateTravel($filter: ModelSubscriptionTravelFilterInput) {
    onCreateTravel(filter: $filter) {
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
export const onUpdateTravel = /* GraphQL */ `
  subscription OnUpdateTravel($filter: ModelSubscriptionTravelFilterInput) {
    onUpdateTravel(filter: $filter) {
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
export const onDeleteTravel = /* GraphQL */ `
  subscription OnDeleteTravel($filter: ModelSubscriptionTravelFilterInput) {
    onDeleteTravel(filter: $filter) {
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
export const onCreateSpot = /* GraphQL */ `
  subscription OnCreateSpot($filter: ModelSubscriptionSpotFilterInput) {
    onCreateSpot(filter: $filter) {
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
export const onUpdateSpot = /* GraphQL */ `
  subscription OnUpdateSpot($filter: ModelSubscriptionSpotFilterInput) {
    onUpdateSpot(filter: $filter) {
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
export const onDeleteSpot = /* GraphQL */ `
  subscription OnDeleteSpot($filter: ModelSubscriptionSpotFilterInput) {
    onDeleteSpot(filter: $filter) {
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
export const onCreateTravelUser = /* GraphQL */ `
  subscription OnCreateTravelUser(
    $filter: ModelSubscriptionTravelUserFilterInput
  ) {
    onCreateTravelUser(filter: $filter) {
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
export const onUpdateTravelUser = /* GraphQL */ `
  subscription OnUpdateTravelUser(
    $filter: ModelSubscriptionTravelUserFilterInput
  ) {
    onUpdateTravelUser(filter: $filter) {
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
export const onDeleteTravelUser = /* GraphQL */ `
  subscription OnDeleteTravelUser(
    $filter: ModelSubscriptionTravelUserFilterInput
  ) {
    onDeleteTravelUser(filter: $filter) {
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
