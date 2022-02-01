/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMarvelCharacters = /* GraphQL */ `
  query GetMarvelCharacters($id: ID!) {
    getMarvelCharacters(id: $id) {
      id
      comics
      description
      events
      charID
      modified
      name
      resourceURI
      series
      stories
      thumbnail
      urls
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listMarvelCharacters = /* GraphQL */ `
  query ListMarvelCharacters(
    $filter: ModelMarvelCharactersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMarvelCharacters(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        comics
        description
        events
        charID
        modified
        name
        resourceURI
        series
        stories
        thumbnail
        urls
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncMarvelCharacters = /* GraphQL */ `
  query SyncMarvelCharacters(
    $filter: ModelMarvelCharactersFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMarvelCharacters(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        comics
        description
        events
        charID
        modified
        name
        resourceURI
        series
        stories
        thumbnail
        urls
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
