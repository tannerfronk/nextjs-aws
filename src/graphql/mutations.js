/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMarvelCharacters = /* GraphQL */ `
  mutation CreateMarvelCharacters(
    $input: CreateMarvelCharactersInput!
    $condition: ModelMarvelCharactersConditionInput
  ) {
    createMarvelCharacters(input: $input, condition: $condition) {
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
export const updateMarvelCharacters = /* GraphQL */ `
  mutation UpdateMarvelCharacters(
    $input: UpdateMarvelCharactersInput!
    $condition: ModelMarvelCharactersConditionInput
  ) {
    updateMarvelCharacters(input: $input, condition: $condition) {
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
export const deleteMarvelCharacters = /* GraphQL */ `
  mutation DeleteMarvelCharacters(
    $input: DeleteMarvelCharactersInput!
    $condition: ModelMarvelCharactersConditionInput
  ) {
    deleteMarvelCharacters(input: $input, condition: $condition) {
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
