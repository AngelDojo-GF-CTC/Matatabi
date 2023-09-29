/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $userId: ID
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      userId: $userId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getTravel = /* GraphQL */ `
  query GetTravel($travelId: ID!, $travelDate: AWSDate!) {
    getTravel(travelId: $travelId, travelDate: $travelDate) {
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
export const listTravels = /* GraphQL */ `
  query ListTravels(
    $travelId: ID
    $travelDate: ModelStringKeyConditionInput
    $filter: ModelTravelFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTravels(
      travelId: $travelId
      travelDate: $travelDate
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncTravels = /* GraphQL */ `
  query SyncTravels(
    $filter: ModelTravelFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTravels(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getSpot = /* GraphQL */ `
  query GetSpot($spotId: ID!) {
    getSpot(spotId: $spotId) {
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
export const listSpots = /* GraphQL */ `
  query ListSpots(
    $spotId: ID
    $filter: ModelSpotFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSpots(
      spotId: $spotId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
          ownerId
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncSpots = /* GraphQL */ `
  query SyncSpots(
    $filter: ModelSpotFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSpots(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
          ownerId
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const spotsByTravelIdAndTravelDate = /* GraphQL */ `
  query SpotsByTravelIdAndTravelDate(
    $travelId: ID!
    $travelDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSpotFilterInput
    $limit: Int
    $nextToken: String
  ) {
    spotsByTravelIdAndTravelDate(
      travelId: $travelId
      travelDate: $travelDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          ownerId
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getTravelUser = /* GraphQL */ `
  query GetTravelUser($id: ID!) {
    getTravelUser(id: $id) {
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
export const listTravelUsers = /* GraphQL */ `
  query ListTravelUsers(
    $filter: ModelTravelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTravelUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          ownerId
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncTravelUsers = /* GraphQL */ `
  query SyncTravelUsers(
    $filter: ModelTravelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTravelUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
          ownerId
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const travelUsersByUserUserId = /* GraphQL */ `
  query TravelUsersByUserUserId(
    $userUserId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTravelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    travelUsersByUserUserId(
      userUserId: $userUserId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          ownerId
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const travelUsersByTravelTravelIdAndTraveltravelDate = /* GraphQL */ `
  query TravelUsersByTravelTravelIdAndTraveltravelDate(
    $travelTravelId: ID!
    $traveltravelDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTravelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    travelUsersByTravelTravelIdAndTraveltravelDate(
      travelTravelId: $travelTravelId
      traveltravelDate: $traveltravelDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          ownerId
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getRouteDurations = /* GraphQL */ `
  query GetRouteDurations(
    $currentSpot: SpotsInput!
    $nextSpots: [SpotsInput!]!
  ) {
    getRouteDurations(currentSpot: $currentSpot, nextSpots: $nextSpots) {
      spots {
        spotName
        spotAddress
        drivingDration
        walkingDration
        distance
        lat
        lng
        spotId
        __typename
      }
      __typename
    }
  }
`;
export const recomendedSpots = /* GraphQL */ `
  query RecomendedSpots($currentSpot: SpotsInput!) {
    recomendedSpots(currentSpot: $currentSpot) {
      spots {
        spotName
        spotAddress
        drivingDration
        walkingDration
        distance
        lat
        lng
        spotId
        __typename
      }
      __typename
    }
  }
`;
